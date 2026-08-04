/* ==================================================================
   pdf-import.js — kullanıcının kendi PDF'ini kütüphaneye alır (BETA)

   window.PdfImport = { ac(), hazirMi() }

   Nasıl çalışır
     1. Kullanıcı bir PDF seçer. Dosya HİÇBİR YERE GÖNDERİLMEZ —
        okuma, çözümleme ve saklama tamamen tarayıcıda olur.
     2. pdf.js (assets/vendor/pdf.min.js) istendiğinde yüklenir; 2.5 MB
        olduğu için açılışta yüklemek anlamsız.
     3. Sayfa sayfa metin kutuları alınır, satırlara ve paragraflara
        toparlanır, başlıklar punto/kalınlık/numaralandırmadan bulunur.
        Bu sezgiseller latex/pdf2doc.py'den taşındı — sitedeki dört
        makale de aynı mantıkla üretilmişti.
     4. Sonuç site belge modeline çevrilip Store.putUserDoc ile
        IndexedDB'ye yazılır ve kütüphanede görünür.

   file:// altında da çalışır: pdf.js'in "sahte işçi" (fake worker)
   yolu kullanılıyor — pdf.worker.min.js ana bağlama yüklenince
   pdf.js ayrı bir Worker açmaya çalışmıyor. Ayrı Worker file://
   altında engelleniyor; bu yüzden bilerek böyle.

   BETA sınırları (kullanıcıya da söyleniyor):
     · Yalnızca METİN katmanı olan PDF'ler. Taranmış (resim) PDF'lerde
       metin yoktur; OCR burada yapılmıyor.
     · Sütunlu dizgi, tablo ve dipnotlar bozuk çıkabilir.
     · Çeviri/sözlük sitenin 1.134 maddelik sözlüğüyle sınırlı.
   ================================================================== */
(function (global) {
  "use strict";

  var VENDOR = ["assets/vendor/pdf.min.js", "assets/vendor/pdf.worker.min.js"];
  var yuklendi = false, yukleniyor = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* Klasik <script> enjeksiyonu: fetch file:// altında bloklanır. */
  function betikYukle(src) {
    return new Promise(function (ok, hata) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = function () { ok(); };
      s.onerror = function () { hata(new Error(src + " yüklenemedi")); };
      document.head.appendChild(s);
    });
  }

  function pdfHazirla() {
    if (yuklendi) return Promise.resolve(global.pdfjsLib);
    if (yukleniyor) return yukleniyor;
    yukleniyor = VENDOR.reduce(function (z, src) {
      return z.then(function () { return betikYukle(src); });
    }, Promise.resolve()).then(function () {
      if (!global.pdfjsLib) throw new Error("pdf.js yüklenemedi");
      // Ayrı Worker açma: file:// altında engelli. İşçi betiği ana
      // bağlamda duruyor, pdf.js onu kullanıyor.
      global.pdfjsLib.GlobalWorkerOptions.workerSrc = "";
      yuklendi = true;
      return global.pdfjsLib;
    });
    return yukleniyor;
  }

  /* ============================ ÇÖZÜMLEME ============================ */

  /** Sayfadaki metin kutularını SATIRLARA toplar.
      pdf.js her parçayı ayrı verir; aynı satırdakiler aynı y'de olur. */
  function satirlar(tc, yuk, sayfa) {
    var ham = [];
    tc.items.forEach(function (it) {
      var s = it.str;
      if (!s || !s.trim()) return;
      var tr = it.transform;                       // [a,b,c,d,e,f]
      ham.push({
        x: tr[4], y: tr[5],
        h: Math.abs(it.height || tr[3]) || 10,
        w: it.width || 0,
        font: it.fontName || "",
        t: s
      });
    });
    ham.sort(function (a, b) { return (b.y - a.y) || (a.x - b.x); });

    var out = [], cur = null;
    ham.forEach(function (p) {
      // aynı satır: y farkı harf yüksekliğinin yarısından az
      if (cur && Math.abs(cur.y - p.y) < Math.max(2, p.h * 0.5)) {
        // aradaki boşluk genişse sözcük arası boşluk koy
        var bosluk = p.x - (cur.x1 || cur.x);
        cur.t += (bosluk > p.h * 0.22 && !/\s$/.test(cur.t) ? " " : "") + p.t;
        cur.x1 = p.x + p.w;
        cur.h = Math.max(cur.h, p.h);
        if (/bold|black|heavy/i.test(p.font)) cur.bold = true;
      } else {
        if (cur) out.push(cur);
        cur = { x: p.x, x1: p.x + p.w, y: p.y, h: p.h, t: p.t,
                bold: /bold|black|heavy/i.test(p.font),
                sayfa: sayfa, ust: 1 - (p.y / yuk) };
      }
    });
    if (cur) out.push(cur);
    out.forEach(function (l) { l.t = l.t.replace(/\s+/g, " ").trim(); });
    return out.filter(function (l) { return l.t; });
  }

  /* Sayfa başı/sonu tekrarları (üstbilgi, altbilgi, sayfa numarası).
     pdf2doc.py ile aynı ölçü: kenar bölgesinde ve sayfaların en az
     %30'unda yinelenen satır eser metni değildir. */
  var EDGE_TOP = 0.11, EDGE_BOT = 0.89;
  function tekrarlariAt(L, sayfaSayisi) {
    var frek = {};
    L.forEach(function (l) {
      if (l.ust < EDGE_TOP || l.ust > EDGE_BOT) {
        var k = l.t.replace(/\d+/g, "#");
        frek[k] = (frek[k] || 0) + 1;
      }
    });
    var esik = Math.max(3, sayfaSayisi * 0.30);
    return L.filter(function (l) {
      if (l.ust >= EDGE_TOP && l.ust <= EDGE_BOT) return true;
      var k = l.t.replace(/\d+/g, "#");
      if (frek[k] >= esik) return false;
      return !/^\s*\d{1,4}\s*$/.test(l.t);        // yalnız sayfa numarası
    });
  }

  /** Gövde puntosu: en çok KARAKTER taşıyan punto. */
  function govdePuntosu(L) {
    var c = {};
    L.forEach(function (l) {
      var k = Math.round(l.h * 2) / 2;
      c[k] = (c[k] || 0) + l.t.length;
    });
    var en = 0, val = 11;
    for (var k in c) if (c[k] > en) { en = c[k]; val = +k; }
    return val;
  }

  var NUMARALI = /^(\d+(?:\.\d+)*)[.)]?\s+(.{2,90})$/;
  function baslikMi(l, govde) {
    var t = l.t.trim();
    if (t.length > 90 || t.length < 2) return null;
    var buyuk = l.h >= govde + 0.6;
    var m = NUMARALI.exec(t);
    if (m && (buyuk || l.bold) && t.length < 70 &&
        !/[.,;:]$/.test(t) && m[2].split(/\s+/).length <= 10) {
      return { derinlik: Math.min(2, m[1].split(".").length), n: m[1], t: m[2].trim() };
    }
    if ((buyuk || l.bold || (t === t.toUpperCase() && /[A-Z]/.test(t))) &&
        t.split(/\s+/).length <= 12 && !/[.,;]$/.test(t) &&
        (buyuk || l.bold)) {
      return { derinlik: 1, n: "", t: t.replace(/[:.]\s*$/, "") };
    }
    return null;
  }

  /** Satırları paragraflara toparlar; başlıkları ayırır. */
  function belgeKur(L, govde) {
    var sol = L.map(function (l) { return l.x; }).sort(function (a, b) { return a - b; });
    var solKenar = sol[Math.floor(sol.length * 0.15)] || 0;
    var sag = L.map(function (l) { return l.x1; }).sort(function (a, b) { return b - a; });
    var sagKenar = sag[Math.floor(sag.length * 0.15)] || 1e9;

    var blok = [], cur = null, toc = [], n = 0;
    function kapat() {
      if (cur && cur.t.trim()) blok.push(cur);
      cur = null;
    }
    L.forEach(function (l) {
      var b = baslikMi(l, govde);
      if (b) {
        kapat();
        n++;
        var id = "b" + n;
        blok.push({ basl: true, derinlik: b.derinlik, n: b.n, t: b.t, id: id });
        toc.push({ level: b.derinlik - 1, n: b.n, t: b.t, id: id });
        return;
      }
      if (!cur) { cur = { t: l.t, x1: l.x1 }; return; }
      /* Yeni paragraf mı: önceki satır sağ kenara VARMADAN bitmişse ve
         cümle bitmişse, ya da bu satır girintiliyse. */
      var kisaBitis = cur.x1 < sagKenar - govde * 1.6;
      var cumleBitti = /[.!?»”"']\s*$/.test(cur.t);
      var girintili = l.x > solKenar + govde * 0.8;
      if ((kisaBitis && cumleBitti) || girintili) {
        kapat(); cur = { t: l.t, x1: l.x1 }; return;
      }
      // tireli bölünmüş sözcüğü birleştir
      if (/[a-zçğıöşü]-$/.test(cur.t)) cur.t = cur.t.slice(0, -1) + l.t;
      else cur.t += " " + l.t;
      cur.x1 = l.x1;
    });
    kapat();

    var html = blok.map(function (b) {
      if (b.basl) {
        var etiket = b.derinlik <= 1 ? "h1" : "h2";
        var ad = (b.n ? b.n + ". " : "") + b.t;
        return "<" + etiket + ' class="chapter" id="' + esc(b.id) + '">' +
               esc(ad) + "</" + etiket + ">";
      }
      return "<p>" + esc(b.t) + "</p>";
    }).join("\n");
    return { html: html, toc: toc };
  }

  function sozcukSay(html) {
    var d = html.replace(/<[^>]+>/g, " ");
    return (d.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length;
  }

  function kimlik(ad) {
    var s = ad.toLowerCase().replace(/\.pdf$/, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
    return "user-" + (s || "belge") + "-" + Date.now().toString(36);
  }

  /** PDF dosyasını belge modeline çevirir. ilerle(oran, metin) çağrılır. */
  function cevir(file, ilerle) {
    return pdfHazirla().then(function (lib) {
      ilerle(0.05, "PDF açılıyor");
      return file.arrayBuffer().then(function (buf) {
        return lib.getDocument({ data: buf, useWorkerFetch: false,
                                 isEvalSupported: false }).promise;
      });
    }).then(function (pdf) {
      var hepsi = [], zincir = Promise.resolve();
      var N = pdf.numPages;
      for (var i = 1; i <= N; i++) {
        (function (s) {
          zincir = zincir.then(function () {
            return pdf.getPage(s).then(function (page) {
              return page.getTextContent().then(function (tc) {
                var vp = page.getViewport({ scale: 1 });
                hepsi = hepsi.concat(satirlar(tc, vp.height, s));
                ilerle(0.05 + 0.8 * (s / N), s + " / " + N + " sayfa");
              });
            });
          });
        })(i);
      }
      return zincir.then(function () { return { L: hepsi, N: N, pdf: pdf }; });
    }).then(function (r) {
      ilerle(0.9, "Metin düzenleniyor");
      if (!r.L.length) {
        throw new Error("Bu PDF'te metin katmanı yok. Taranmış (fotoğraf) " +
          "bir belge olabilir; o durumda önce OCR gerekir.");
      }
      var L = tekrarlariAt(r.L, r.N);
      var govde = govdePuntosu(L);
      var kur = belgeKur(L, govde);
      var kelime = sozcukSay(kur.html);
      if (kelime < 40) {
        throw new Error("PDF'ten yalnızca " + kelime + " sözcük çıkarılabildi. " +
          "Metin katmanı eksik ya da korumalı olabilir.");
      }
      var ad = (file.name || "Belge").replace(/\.pdf$/i, "");
      return {
        id: kimlik(file.name || "belge"),
        kind: "user",
        title: { en: ad, tr: ad },
        authors: [],
        source: "Kullanıcı yüklemesi — " + (file.name || "") +
                " (" + r.N + " sayfa)",
        year: new Date().getFullYear(),
        level: "—",
        words: kelime,
        minutes: Math.max(1, Math.round(kelime / 180)),
        blurb: { tr: "Sizin yüklediğiniz belge · " + r.N + " sayfa · " +
                     kelime.toLocaleString("tr") + " sözcük. Bu dosya " +
                     "yalnızca bu tarayıcıda saklanıyor." },
        cover: { emoji: "📄", hue: 210 },
        toc: kur.toc,
        html: kur.html,
        user: true
      };
    });
  }

  /* ============================== ARAYÜZ ============================== */

  function panel() {
    var eski = document.getElementById("pdfWrap");
    if (eski) eski.remove();
    var w = document.createElement("div");
    w.id = "pdfWrap";
    w.innerHTML =
      '<div class="pdf-scrim"></div>' +
      '<div class="pdf-box" role="dialog" aria-modal="true" aria-labelledby="pdfH">' +
        '<div class="pdf-hd"><h3 id="pdfH">PDF yükle <span class="beta">beta</span></h3>' +
          '<button class="btn mini icon" id="pdfClose" aria-label="Kapat">✕</button></div>' +
        '<div class="pdf-body">' +
          '<p class="pdf-lead">Kendi PDF\'inizi kütüphaneye ekleyin; ' +
            'sözcüklere tıklayarak Türkçe destekle okuyun.</p>' +
          '<label class="pdf-drop" id="pdfDrop">' +
            '<input type="file" id="pdfFile" accept="application/pdf,.pdf" hidden>' +
            '<b>Dosya seçin</b><span>ya da buraya sürükleyin</span></label>' +
          '<div class="pdf-prog" id="pdfProg" hidden>' +
            '<div class="pdf-bar"><i></i></div><span id="pdfMsg"></span></div>' +
          '<p class="pdf-err" id="pdfErr" hidden></p>' +
          '<ul class="pdf-note">' +
            '<li>Dosyanız <b>hiçbir yere gönderilmez</b>; çözümleme ve ' +
              'saklama tamamen bu tarayıcıda olur.</li>' +
            '<li>Yalnızca <b>metin katmanı olan</b> PDF\'ler. Taranmış ' +
              '(fotoğraf) belgelerde metin bulunmaz.</li>' +
            '<li>Sütunlu dizgi, tablo ve dipnotlar bozuk çıkabilir.</li>' +
          '</ul>' +
        '</div>' +
      '</div>';
    document.body.appendChild(w);

    var kapat = function () { w.remove(); document.removeEventListener("keydown", esctus); };
    var esctus = function (e) { if (e.key === "Escape") kapat(); };
    document.addEventListener("keydown", esctus);
    w.querySelector("#pdfClose").addEventListener("click", kapat);
    w.querySelector(".pdf-scrim").addEventListener("click", kapat);

    var inp = w.querySelector("#pdfFile");
    var drop = w.querySelector("#pdfDrop");
    var prog = w.querySelector("#pdfProg");
    var bar = w.querySelector(".pdf-bar i");
    var msg = w.querySelector("#pdfMsg");
    var err = w.querySelector("#pdfErr");

    function ilerle(o, t) {
      prog.hidden = false;
      bar.style.width = Math.round(o * 100) + "%";
      msg.textContent = t;
    }
    function hata(e) {
      prog.hidden = true;
      err.hidden = false;
      err.textContent = (e && e.message) || String(e);
    }
    function basla(file) {
      if (!file) return;
      if (!/pdf$/i.test(file.name) && file.type !== "application/pdf") {
        return hata(new Error("Yalnızca PDF dosyası yükleyebilirsiniz."));
      }
      err.hidden = true;
      drop.classList.add("busy");
      ilerle(0.02, "Hazırlanıyor");
      cevir(file, ilerle).then(function (doc) {
        ilerle(0.96, "Kaydediliyor");
        var DB = global.Store || global.StoreMock;
        if (!DB || !DB.putUserDoc) throw new Error("Depolama kullanılamıyor.");
        return DB.putUserDoc(doc).then(function () { return doc; });
      }).then(function (doc) {
        global.DOCS = global.DOCS || {};
        global.DOCS[doc.id] = doc;
        ilerle(1, "Bitti");
        kapat();
        global.location.hash = "#/read/" + encodeURIComponent(doc.id);
      }).catch(function (e) {
        drop.classList.remove("busy");
        hata(e);
      });
    }

    inp.addEventListener("change", function () { basla(inp.files[0]); });
    ["dragenter", "dragover"].forEach(function (t) {
      drop.addEventListener(t, function (e) {
        e.preventDefault(); drop.classList.add("over");
      });
    });
    ["dragleave", "drop"].forEach(function (t) {
      drop.addEventListener(t, function (e) {
        e.preventDefault(); drop.classList.remove("over");
      });
    });
    drop.addEventListener("drop", function (e) {
      basla(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]);
    });
  }

  global.PdfImport = {
    ac: panel,
    /** Kayıtlı kullanıcı belgelerini window.DOCS'a taşır (açılışta). */
    yukle: function () {
      var DB = global.Store || global.StoreMock;
      if (!DB || !DB.listUserDocs) return Promise.resolve([]);
      return DB.listUserDocs().then(function (rows) {
        global.DOCS = global.DOCS || {};
        (rows || []).forEach(function (d) { if (d && d.id) global.DOCS[d.id] = d; });
        return rows || [];
      }).catch(function () { return []; });
    }
  };
})(window);
