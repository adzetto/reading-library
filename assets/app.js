/* ==================================================================
   app.js — yönlendirme, kütüphane, okuyucu
   ================================================================== */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };
  var REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MOBILE = function () { return matchMedia("(max-width:1080px)").matches; };

  /* --- anlık arayüz tercihleri: küçük ve senkron olmalı (Store değil) --- */
  var pref = {
    get: function (k, d) {
      try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  var S = {
    dictOn: pref.get("rl_dict", true),
    markKnown: pref.get("rl_mark", false),
    measure: pref.get("rl_measure", 29),
    theme: pref.get("rl_theme", null)
  };

  var DB = window.Store || window.StoreMock;   // sözleşme §4
  var ic = function (n, s) { return window.icon ? window.icon(n, s || 16) : ""; };

  /* ---- kalıcı arayüz ikonları (bir kez) ---- */
  function paintChrome() {
    var set = function (sel, html) { var e = $(sel); if (e) e.innerHTML = html; };
    set("#brandMark", ic("layers", 18));
    set("#navLib", ic("library", 15) + '<span class="lbl-full">Kütüphane</span>');
    set("#navStats", ic("stats", 15) + '<span class="lbl-full">İlerleme</span>');
    set("#dwClose", ic("close", 16));
  }
  paintChrome();

  /* ============================ TEMA ============================ */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    S.theme = t; pref.set("rl_theme", t);
    var b = $("#themeBtn");
    if (b) { b.innerHTML = ic(t === "dark" ? "sun" : "moon", 16);
             b.title = t === "dark" ? "Açık temaya geç" : "Koyu temaya geç"; }
    if (window.__hero__) window.__hero__.theme(t);
  }
  // Varsayılan açık tema: okuma kâğıdı beyaz başlasın, kullanıcı isterse
  // koyuya geçsin ve tercihi hatırlansın.
  applyTheme(S.theme || "light");
  $("#themeBtn").onclick = function () {
    applyTheme(S.theme === "dark" ? "light" : "dark");
  };

  /* ============================ TOAST ============================ */
  var toastT;
  function toast(msg) {
    var el = $("#toast"); if (!el) return;
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.classList.remove("show"); }, 2400);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ========================= YÖNLENDİRME ========================= */
  var view = $("#view");
  var current = null;          // {name, doc}

  function parseHash() {
    var h = (location.hash || "#/").replace(/^#/, "");
    var p = h.split("/").filter(Boolean);
    if (!p.length) return { name: "library" };
    if (p[0] === "read") return { name: "reader", id: decodeURIComponent(p[1] || "") };
    if (p[0] === "quiz") return { name: "quiz", id: decodeURIComponent(p[1] || "") };
    if (p[0] === "stats") return { name: "stats" };
    return { name: "library" };
  }

  /* ---------------- belge gövdesini istendiğinde yükle ----------------
     Açılışta yalnızca üstveri dizini (docs/meta.js) var; gövdeler
     ağırdır ve ancak o belge açılınca gelir. Yükleme <script> ETİKETİ
     ENJEKTE EDEREK yapılıyor, fetch ile değil: sözleşme §0 file://
     altında da çalışmayı şart koşuyor ve orada fetch bloklanır, script
     etiketi çalışır.
     Gövde dosyası window.DOCS[id]'yi tamamen ezdiği için __stub kalkar. */
  /* --------- belge gövdelerinin nereden geleceği ---------
     Kitap dosyaları `window.DOCS[id] = {...}` yazan klasik betikler.
     Klasik <script> CORS'a TABİ DEĞİLDİR: aynı dosya herhangi bir
     kaynaktan, sunucuda hiçbir ayar yapmadan yüklenebilir. Bu yüzden
     depoyu şişirmek istemeyen biri tek satırla bir CDN'e geçebilir:

       <script>window.DOC_BASE =
         "https://cdn.jsdelivr.net/gh/KULLANICI/DEPO@main/assets/docs/";</script>

     Varsayılan YEREL: sözleşme §0 sitenin file:// altında da tam
     çalışmasını istiyor, orada ağ yok. */
  var YEREL = "assets/docs/";
  function docBase() {
    var b = window.DOC_BASE;
    if (!b || location.protocol === "file:") return YEREL;
    return String(b).replace(/\/?$/, "/");
  }

  var yukleniyor = {};
  function ensureDoc(id, cb) {
    var d = window.DOCS && window.DOCS[id];
    if (!d) return cb(null);                       // böyle bir belge yok
    if (!d.__stub) return cb(d);                   // gövde zaten burada
    if (yukleniyor[id]) { yukleniyor[id].push(cb); return; }
    yukleniyor[id] = [cb];
    var bitir = function () {
      var list = yukleniyor[id]; yukleniyor[id] = null;
      var doc = window.DOCS[id];
      list.forEach(function (f) { f(doc && !doc.__stub ? doc : null); });
    };
    var dosya = d.__file || (id + ".js");
    var s = document.createElement("script");
    s.src = docBase() + dosya;
    /* Uzak kaynak yanıt vermezse sessizce yerel kopyaya dön: kitap
       açılmıyor olmaktansa biraz geç açılsın. */
    var yedek = false;
    s.onerror = function () {
      if (!yedek && docBase() !== YEREL) {
        yedek = true;
        var s2 = document.createElement("script");
        s2.src = YEREL + dosya;
        s2.onload = bitir; s2.onerror = bitir;
        document.head.appendChild(s2);
        return;
      }
      bitir();
    };
    s.onload = bitir;
    document.head.appendChild(s);
  }

  function yuklemeEkrani(meta) {
    var ad = (meta && meta.title && meta.title.tr) || "Metin";
    var alt = meta && meta.words
      ? meta.words.toLocaleString("tr") + " sözcük · " +
        (meta.minutes || 0) + " dakikalık okuma"
      : "";
    view.innerHTML =
      '<div class="doc-loading">' +
        '<span class="spin"></span>' +
        '<p class="dl-name">' + esc(ad) + '</p>' +
        (alt ? '<p class="dl-sub">' + esc(alt) + "</p>" : "") +
        '<p class="dl-hint">Kitap ilk açılışta indiriliyor; sonraki ' +
        "açılışlarda tarayıcı önbelleğinden gelir.</p>" +
      "</div>";
  }

  function route() {
    var r = parseHash();
    teardown();
    view.innerHTML = "";
    document.body.classList.toggle("reading", r.name === "reader");
    if (r.name === "reader" || r.name === "quiz") {
      var meta = window.DOCS && window.DOCS[r.id];
      if (!meta) { renderLibrary(); scrollTo(0, 0); return; }
      var tur = r.name;
      if (meta.__stub) yuklemeEkrani(meta);
      ensureDoc(r.id, function (doc) {
        // Yükleme sürerken kullanıcı başka yere gitmiş olabilir.
        if (parseHash().id !== r.id) return;
        view.innerHTML = "";
        if (!doc) { renderLibrary(); return; }
        if (tur === "reader") renderReader(doc); else renderQuiz(doc);
        scrollTo(0, 0);
      });
      return;
    }
    if (r.name === "stats") renderStats();
    else renderLibrary();
    scrollTo(0, 0);
  }
  addEventListener("hashchange", route);

  var cleanups = [];
  function teardown() {
    cleanups.forEach(function (f) { try { f(); } catch (e) {} });
    cleanups = [];
    if (window.TTS && TTS.stop) TTS.stop();
    // Görünüm değişince baloncuğun içeriği de sıfırlanmalı; yalnızca
    // gizlemek yetmez, eski HTML'i görünürde kalabiliyor.
    var pop = $("#pop");
    if (pop) pop.innerHTML = '<div class="arrow"></div>';
    hidePop();
    $("#drawer").classList.remove("show");
    $("#scrim").classList.remove("show");
  }

  /* ====================== KÜTÜPHANE GÖRÜNÜMÜ ====================== */
  function docList() {
    var man = window.MANIFEST || [];
    var out = man.map(function (m) { return window.DOCS && window.DOCS[m.id]; })
      .filter(Boolean)
      .map(function (d, i) { d.__group = (man[i] || {}).group || "Metinler"; return d; });
    /* Kullanıcının kendi yüklediği PDF'ler manifestte yok; Store'dan
       gelip window.DOCS'a yerleşiyorlar (pdf-import.js yukle()). */
    Object.keys(window.DOCS || {}).forEach(function (id) {
      var d = window.DOCS[id];
      if (d && d.user && out.indexOf(d) < 0) {
        d.__group = "Yüklediklerim";
        out.push(d);
      }
    });
    return out;
  }

  function renderLibrary() {
    view.appendChild($("#tpl-library").content.cloneNode(true));
    var docs = docList();

    var totalWords = docs.reduce(function (a, d) { return a + (d.words || 0); }, 0);
    var totalMin = docs.reduce(function (a, d) { return a + (d.minutes || 0); }, 0);
    $("#heroStats").innerHTML =
      '<span><b>' + docs.length + "</b> metin</span>" +
      '<span><b>' + totalWords.toLocaleString("tr") + "</b> sözcük</span>" +
      '<span><b>' + Math.round(totalMin / 60).toLocaleString("tr") + "</b> saatlik okuma</span>" +
      '<span><b>' + (window.Lookup ? Lookup.size : 0).toLocaleString("tr") +
      "</b> sözlük maddesi</span>";

    /* ---------------- raflar ----------------
       Kütüphanede HER ZAMAN tam bir raf açık. Önce "hepsi" diye bir
       durum vardı ve 278 sırt tek satıra dizilince on bir bin piksellik
       bir şerit çıkıyordu — kimsenin sonuna kadar kaydırmayacağı bir
       şey. Raf sekmeleri zaten gezinmenin kendisi; "Tüm raflar"
       düğmesi fazlalıktı, kaldırıldı. */
    var gruplar = [];
    docs.forEach(function (d) {
      var g = gruplar.filter(function (x) { return x.ad === d.__group; })[0];
      if (!g) { g = { ad: d.__group, n: 0, docs: [] }; gruplar.push(g); }
      g.n++; g.docs.push(d);
    });

    /* Sekme sırası: önce kitap rafları, sonra makaleler ve kısa metinler.
       Manifest sırasında "Makaleler" başta geliyordu ve kütüphanenin
       yüzü dört akademik makale oluyordu. */
    var SON = { "Makaleler": 1, "Kısa metinler": 2, "Yüklediklerim": 3 };
    gruplar.sort(function (x, y) {
      return (SON[x.ad] || 0) - (SON[y.ad] || 0);
    });

    var destelerEl = $("#libDecks");
    var secili = gruplar.length ? gruplar[0].ad : null;

    function desteCiz() {
      destelerEl.innerHTML = gruplar.map(function (g) {
        return '<button type="button" class="deck" data-deck="' + esc(g.ad) + '"' +
          ' aria-pressed="false">' +
          '<span class="deck-name">' + esc(g.ad) + "</span>" +
          '<span class="deck-n"><b>' + g.n + "</b></span></button>";
      }).join("");
    }

    function uygula() {
      $$(".spine", $("#cards")).forEach(function (c) {
        if (c.classList.contains("spine-add")) return;
        c.hidden = c.dataset.group !== secili;
      });
      $$("[data-deck]", destelerEl).forEach(function (b) {
        var on = b.dataset.deck === secili;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      var kutu = $("#cards");
      if (kutu && kutu.__tazele) kutu.__tazele();
      var bas = $(".lib-head h2");
      if (bas) bas.textContent = secili || "Kütüphane";
      var shelf = $("#shelf");
      if (shelf) {
        shelf.scrollLeft = 0;
        /* Kenar yumuşaması yalnızca gerçekten kayan rafta. */
        requestAnimationFrame(function () {
          shelf.classList.toggle("kayar",
            shelf.scrollWidth > shelf.clientWidth + 4);
        });
      }
    }

    desteCiz();
    destelerEl.addEventListener("click", function (e) {
      var b = e.target.closest("[data-deck]"); if (!b) return;
      secili = b.dataset.deck;
      uygula();
    });

    drawCards(docs);
    uygula();
    heroRead();
    heroGlobe();
    heroMotion();
  }

  /* Belge tonları sitenin kendi vurgu ailesine dağıtılır: mürekkep mavisi
     (209°) → sıcak kahve (30°). Ham cover.hue değerleri gökkuşağı
     veriyordu; sıraya göre dağıtınca her metnin ayrı ama akraba bir tonu
     oluyor. Küredeki bandHue() ile aynı aralık. */
  function docHue(i, total) {
    var n = Math.max(1, (total || 1) - 1);
    var t = Math.max(0, Math.min(1, i / n));
    return Math.round(209 + (30 - 209) * t);
  }

  /* ====================== RAF =========================================
     278 kitap kart ızgarasında "özellik listesi" gibi duruyordu. Kitabın
     kendi biçimi SIRT: rafta yan yana duran, kalınlığı uzunluğunu ele
     veren nesneler. Sırtın genişliği sözcük sayısından geliyor —
     süs değil, doğru bir bilgi: Sherlock 104 bin sözcük, Amontillado
     Fıçısı 2.300. Rafta ikisi apayrı kalınlıkta.
     Genişlik karekökle sıkıştırılıyor: ham oranda (45×) ince kitaplar
     bir çizgiye iniyor, adları okunmuyordu. */
  /* Sırt rengi DÜZEYDEN geliyor: A2 mürekkep mavisi → C2 sıcak kahve.
     Önce sıra numarasından geliyordu ve tek bir rafta bütün kitaplar aynı
     tonu alıyordu (raf üyeleri manifestte yan yana) — yani renk hiçbir şey
     anlatmıyordu. Düzey, bu okurun kitap seçerken sorduğu ilk soru;
     rafa bakınca hangi kitabın kolay olduğu görünüyor. */
  var LVL_T = { A2: 0, B1: 0.25, B2: 0.5, C1: 0.75, C2: 1 };
  function lvlT(l) {
    var t = LVL_T[l];
    return (t == null ? 0.5 : t).toFixed(3);
  }

  function spineW(words, enAz, enCok) {
    var k = Math.sqrt(Math.max(1, words || 1));
    var t = enCok > enAz ? (k - enAz) / (enCok - enAz) : 0.5;
    return Math.round(26 + 40 * Math.max(0, Math.min(1, t)));
  }

  function drawCards(docs) {
    var wrap = $("#cards");
    var N = docs.length;
    var kokler = docs.map(function (d) { return Math.sqrt(Math.max(1, d.words || 1)); });
    var enAz = Math.min.apply(null, kokler), enCok = Math.max.apply(null, kokler);

    var raf = docs.map(function (d, di) {
      var w = spineW(d.words, enAz, enCok);
      /* Kalın sırtta yazar adı da sığıyor; incede yalnız başlık. Gerçek
         rafta da öyle: ince kitabın sırtına yazar sığmaz. */
      var yazar = (d.authors && d.authors[0]) || "";
      return '<button type="button" class="spine" data-id="' + esc(d.id) + '" ' +
        'data-group="' + esc(d.__group) + '" data-lvl="' + esc(d.level || "") + '" ' +
        'style="--w:' + w + 'px;--t:' + lvlT(d.level) + '" ' +
        'aria-label="' + esc(d.title.tr || d.title.en) + ", " +
        esc(d.level || "") + ", " + (d.minutes || 0) + ' dakika">' +
        '<span class="sp-t">' + esc(d.title.en) + "</span>" +
        (w >= 44 && yazar ? '<span class="sp-a">' + esc(yazar) + "</span>" : "") +
        '<i class="sp-p" data-prog="' + esc(d.id) + '"></i></button>';
    }).join("");

    var anahtar = '<p class="lvl-key"><span>KOLAY</span><span class="k">' +
      ["A2", "B1", "B2", "C1", "C2"].map(function (l) {
        return '<i style="--t:' + lvlT(l) + '" title="' + l + '"></i>';
      }).join("") + "</span><span>ZOR</span>" +
      '<span class="lk-n">· sırtın kalınlığı kitabın uzunluğu</span></p>';

    /* Künye rafın SOLUNDA duruyor. Önce rafın ALTINDAYDI: sırta değince
       açıklama ekranın dışında kalıyor, kullanıcı hiç görmüyordu. Yan
       yana durunca elini gezdirdikçe kitap değişiyor — vitrin gibi. */
    wrap.innerHTML =
      '<div class="lib-view">' +
        '<div class="pick" id="pick" aria-live="polite"></div>' +
        '<div class="shelf-wrap">' +
          '<div class="shelf" id="shelf" role="listbox" tabindex="0" ' +
            'aria-label="Raftaki kitaplar">' + raf + "</div>" +
          anahtar +
        "</div>" +
      "</div>";

    /* Rafın önündeki künye: sırta değince kitap "çekilip" bakılıyor. */
    var pick = $("#pick");
    var byId = {};
    docs.forEach(function (d) { byId[d.id] = d; });

    function goster(id) {
      var d = byId[id];
      if (!d) { pick.innerHTML = ""; return; }
      pick.innerHTML =
        '<div class="pick-in">' +
          '<p class="pick-lvl"><b>' + esc(d.level || "—") + "</b> · " +
            (d.words || 0).toLocaleString("tr") + " sözcük · " +
            (d.minutes || 0) + " dk</p>" +
          "<h3>" + esc(d.title.en) + "</h3>" +
          '<p class="pick-tr">' + esc(d.title.tr) + "</p>" +
          '<p class="pick-b">' + esc((d.blurb && d.blurb.tr) || "") + "</p>" +
          '<a class="btn primary" href="#/read/' + encodeURIComponent(d.id) + '">' +
            "Bu kitabı oku</a>" +
        "</div>";
    }

    /* Varsayılan seçim: rafın İLK GÖRÜNEN kitabı. Önce docs[0] idi ve
       hangi raf açık olursa olsun listenin başındaki makaleyi
       gösteriyordu. */
    function ilkGorunen() {
      var sp = shelfEl().querySelector(".spine:not([hidden]):not(.spine-add)");
      return sp ? sp.dataset.id : (docs[0] && docs[0].id);
    }

    function shelfEl() { return $("#shelf"); }
    var shelf = shelfEl();
    function isaretle(el) {
      if (!el) return;
      $$(".spine", shelf).forEach(function (x) { x.classList.toggle("on", x === el); });
      goster(el.dataset.id);
    }
    shelf.addEventListener("pointerover", function (e) {
      var b = e.target.closest(".spine"); if (b) isaretle(b);
    });
    shelf.addEventListener("focusin", function (e) {
      var b = e.target.closest(".spine"); if (b) isaretle(b);
    });
    shelf.addEventListener("click", function (e) {
      var b = e.target.closest(".spine"); if (!b) return;
      location.hash = "#/read/" + encodeURIComponent(b.dataset.id);
    });
    /* Dışarıdan (raf sekmesi) çağrılabilsin: raf değişince seçim de değişmeli. */
    /* ---- rafı elle sürükleme ----
       Kaydırma çubuğu tek yol olamaz: raf bir nesne, tutup itebilmelisin.
       Sürükleme sırasında tıklama iptal ediliyor (8 px eşiği), yoksa her
       itme bir kitap açıyordu — küredeki çevirmeyle aynı sorun. */
    var suruk = false, sBas = 0, sSol = 0, sYol = 0, sId = -1;
    shelf.addEventListener("pointerdown", function (e) {
      if (e.button != null && e.button > 0) return;
      suruk = true; sId = e.pointerId;
      sBas = e.clientX; sSol = shelf.scrollLeft; sYol = 0;
      shelf.classList.add("suruklinuyor");
      try { shelf.setPointerCapture(e.pointerId); } catch (err) {}
    });
    shelf.addEventListener("pointermove", function (e) {
      if (!suruk || e.pointerId !== sId) return;
      var d = e.clientX - sBas;
      sYol = Math.max(sYol, Math.abs(d));
      shelf.scrollLeft = sSol - d;
      if (sYol > 4) durdur();          // elle dokunan sürüklemeyi durdurur
    });
    function surukBitir(e) {
      if (!suruk) return;
      suruk = false;
      try { shelf.releasePointerCapture(sId); } catch (err) {}
      sId = -1;
      shelf.classList.remove("suruklinuyor");
    }
    shelf.addEventListener("pointerup", surukBitir);
    shelf.addEventListener("pointercancel", surukBitir);
    shelf.addEventListener("click", function (e) {
      if (sYol > 8) { e.stopPropagation(); sYol = 0; }
    }, true);

    /* ---- kendiliğinden süzülme ----
       Rafta ekrana sığandan fazlası varsa yavaşça akıyor: okur elini
       sürmeden de nelerin durduğunu görüyor. Fareyle değince, odak
       girince, sürüklerken ve hareket azaltıldığında duruyor; sona
       varınca başa dönmüyor, sadece duruyor — geri sarmak baş döndürür. */
    var akis = 0, akisDur = false, akisArtik = 0;
    function durdur() { akisDur = true; }
    function akisBasla() {
      if (REDUCED) return;
      cancelAnimationFrame(akis);
      var son = performance.now();
      (function adim(t) {
        akis = requestAnimationFrame(adim);
        var dt = Math.min(50, t - son); son = t;
        if (akisDur || document.hidden) return;
        var enCok = shelf.scrollWidth - shelf.clientWidth;
        if (enCok < 8) return;
        if (shelf.scrollLeft >= enCok - 1) return;
        /* scrollLeft TAM SAYIYA yuvarlanıyor: kare başına 0.3 px eklemek
           her seferinde aynı değere geri dönüyor ve raf hiç kımıldamıyordu.
           Kesir ayrı biriktirilip tam piksel olunca uygulanıyor. */
        akisArtik += dt * 0.026;             // ~26 px/sn
        var adimPx = Math.floor(akisArtik);
        if (adimPx >= 1) {
          akisArtik -= adimPx;
          shelf.scrollLeft = Math.min(enCok, shelf.scrollLeft + adimPx);
        }
      })(son);
    }
    ["pointerenter", "pointerdown", "focusin", "wheel", "touchstart"]
      .forEach(function (t) { shelf.addEventListener(t, durdur, { passive: true }); });
    akisBasla();
    cleanups.push(function () { cancelAnimationFrame(akis); });

    /* Ok tuşlarıyla raf boyunca gezinme: raf tek bir durak, içinde
       oklarla dolaşılıyor (ARIA listbox kalıbı). */
    shelf.addEventListener("keydown", function (e) {
      var yon = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1
              : e.key === "Home" ? -9999 : e.key === "End" ? 9999 : 0;
      if (!yon) return;
      e.preventDefault();
      var acik = $$(".spine:not([hidden])", shelf).filter(function (x) {
        return !x.classList.contains("spine-add");
      });
      if (!acik.length) return;
      var su = acik.indexOf(shelf.querySelector(".spine.on"));
      if (su < 0) su = 0;
      var yeni = Math.max(0, Math.min(acik.length - 1, su + yon));
      isaretle(acik[yeni]);
      acik[yeni].scrollIntoView({ block: "nearest", inline: "center",
                                 behavior: REDUCED ? "auto" : "smooth" });
    });

    wrap.__tazele = function () {
      var id = ilkGorunen();
      var sp = id && shelfEl().querySelector('.spine[data-id="' + id + '"]');
      $$(".spine", shelfEl()).forEach(function (x) { x.classList.remove("on"); });
      if (sp) sp.classList.add("on");
      goster(id);
    };
    wrap.__tazele();

    /* "Kendi PDF'ini ekle": rafın sonunda boş bir yer — kütüphaneye bir
       şey EKLEMEK, kütüphanenin içinde anlatılır. */
    shelf.insertAdjacentHTML("beforeend",
      '<button type="button" class="spine spine-add" id="addPdfCard" ' +
      'aria-label="Kendi PDF dosyanızı yükleyin"><span class="sp-t">PDF yükle</span>' +
      '<span class="sp-plus">+</span></button>');
    var addBtn = document.getElementById("addPdfCard");
    if (addBtn) {
      addBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (window.PdfImport) PdfImport.ac();
      });
    }

    if (!DB) return;
    DB.allProgress().then(function (rows) {
      var byId = {};
      (rows || []).forEach(function (r) { byId[r.docId] = r; });
      docs.forEach(function (d) {
        var p = byId[d.id]; if (!p) return;
        var pct = Math.round((p.pct || 0) * 100);
        var bar = wrap.querySelector('[data-prog="' + d.id + '"]');
        var lab = wrap.querySelector('[data-pct="' + d.id + '"]');
        if (bar) bar.style.width = Math.min(100, pct) + "%";
        if (lab && pct > 0) lab.textContent = "%" + pct;
        if (p.finishedAt) {
          var c = wrap.querySelector('.card[href$="' + encodeURIComponent(d.id) + '"]');
          if (c) c.classList.add("done");
        }
      });
      // "kaldığın yerden devam"
      var last = (rows || []).slice().sort(function (a, b) {
        return (b.updatedAt || 0) - (a.updatedAt || 0);
      })[0];
      if (last && window.DOCS[last.docId] && (last.pct || 0) > 0.01 && !last.finishedAt) {
        var btn = $("#continueBtn");
        if (btn) {
          btn.hidden = false;
          btn.textContent = "Kaldığım yerden devam: " +
            window.DOCS[last.docId].title.tr.slice(0, 42) +
            " (%" + Math.round(last.pct * 100) + ")";
          btn.onclick = function () { location.hash = "#/read/" + last.docId; };
        }
      }
    }).catch(function () {});
  }

  /* ======================= OKUYUCU GÖRÜNÜMÜ ======================= */
  var reader = null;

  function renderReader(doc) {
    view.appendChild($("#tpl-reader").content.cloneNode(true));
    var article = $("#article");

    // başlık bloğu + gövde
    article.innerHTML =
      '<header class="doc-head">' +
      '<p class="kicker">' + esc(doc.source) + "</p>" +
      "<h1>" + esc(doc.title.en) + "</h1>" +
      '<p class="tr">' + esc(doc.title.tr) + "</p>" +
      '<p class="who">' + esc((doc.authors || []).join(" · ")) + "</p>" +
      "</header>" + doc.html;

    renderTables(article, doc);
    renderFigures(article, doc);
    renderMath(article);
    var count = wordize(article);
    addParaButtons(article);
    buildToc(doc);
    bindReaderControls(doc);
    setupLookupUI(doc);
    setupProgress(doc, count);
    setupTTS(doc);
    revealAnims();
    refreshVocabUI();
  }

  /* ---- tablolar ---- */
  function renderTables(root, doc) {
    var T = doc.tables || window.__TABLES__;
    if (!T) return;
    $$(".tbl-slot", root).forEach(function (slot) {
      var n = slot.dataset.table, t = T[n];
      if (!t) { slot.remove(); return; }
      var w = document.createElement("div");
      w.className = "tbl-wrap"; w.id = slot.id || "";
      w.innerHTML = '<p class="tbl-cap"><b>Table ' + n + ".</b> " +
        (slot.dataset.caption || t.caption || "") + "</p>" +
        buildTable(t) + (t.note ? '<p class="tbl-note">' + t.note + "</p>" : "");
      slot.replaceWith(w);
    });
  }

  function buildTable(t) {
    var h = '<div class="tbl-scroll"><table class="data"><thead><tr>';
    var head = t.head || [];
    if (!head.length && t.rows && t.rows.length) head = t.rows[0].map(function (_, i) { return "#" + i; });
    head.forEach(function (c) { h += "<th>" + c + "</th>"; });
    h += "</tr></thead><tbody>";
    (t.rows || []).forEach(function (r) {
      h += "<tr>" + r.map(function (c, i) {
        var tag = i === 0 ? "th" : "td";
        var v = (c === null || c === undefined || c === "")
          ? '<span class="muted">—</span>'
          : (typeof c === "object" ? JSON.stringify(c) : c);
        return "<" + tag + ">" + v + "</" + tag + ">";
      }).join("") + "</tr>";
    });
    return h + "</tbody></table></div>";
  }

  /* ---- şekiller ---- */
  function renderFigures(root, doc) {
    var F = doc.figures || window.__FIGS__ || {};
    $$(".fig-frame", root).forEach(function (f) {
      var key = (f.dataset.svg || "").split("/").pop().replace(".svg", "");
      if (F[key]) f.innerHTML = F[key];
      var tools = document.createElement("div");
      tools.className = "fig-tools";
      tools.innerHTML = '<button class="btn mini" data-zoom="1">⤢ Büyüt</button>';
      f.appendChild(tools);
    });
  }

  /* ---- matematik ---- */
  var KM = {
    "\\OR": "\\operatorname{OR}", "\\AOR": "\\operatorname{AOR}",
    "\\CI": "\\operatorname{CI}", "\\SE": "\\operatorname{SE}",
    "\\Med": "\\operatorname{Med}", "\\pct": "#1\\,\\%"
  };
  function renderMath(root) {
    if (!window.katex) return;
    $$(".math", root).forEach(function (el) {
      try { katex.render(el.textContent, el, { throwOnError: false, macros: KM }); }
      catch (e) {}
    });
    $$(".eq-body", root).forEach(function (el) {
      try {
        katex.render(el.textContent, el,
          { throwOnError: false, displayMode: true, macros: KM });
      } catch (e) {}
    });
  }

  /* ---- sözcükleri sar ---- */
  var peekCache = new Map();
  function peek(w) {
    var k = w.toLowerCase();
    if (!peekCache.has(k)) peekCache.set(k, window.Lookup ? Lookup.peek(k) : null);
    return peekCache.get(k);
  }

  function wordize(root) {
    var SKIP = /^(SCRIPT|STYLE|CODE|SVG|BUTTON)$/;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!/[A-Za-z]/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        while (p && p !== root) {
          if (SKIP.test(p.tagName.toUpperCase())) return NodeFilter.FILTER_REJECT;
          var c = p.classList;
          if (c && (c.contains("math") || c.contains("eq-body") ||
                    c.contains("katex") || c.contains("p-tr") ||
                    c.contains("tbl-note") || c.contains("kicker") ||
                    c.contains("tr") || c.contains("who")))
            return NodeFilter.FILTER_REJECT;
          p = p.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    var RE = /[A-Za-z][A-Za-z’'-]*/g, count = 0;
    nodes.forEach(function (node) {
      var t = node.nodeValue;
      RE.lastIndex = 0;
      if (!RE.test(t)) return;
      RE.lastIndex = 0;
      var frag = document.createDocumentFragment(), last = 0, m;
      while ((m = RE.exec(t))) {
        if (m.index > last) frag.appendChild(document.createTextNode(t.slice(last, m.index)));
        var s = document.createElement("span");
        s.className = peek(m[0]) ? "w known" : "w";
        s.textContent = m[0];
        frag.appendChild(s);
        last = m.index + m[0].length; count++;
      }
      if (last < t.length) frag.appendChild(document.createTextNode(t.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
    return count;
  }

  /* ---- paragraf çeviri düğmeleri ---- */
  function addParaButtons(root) {
    $$("#article > p, .box > p", root).forEach(function (p) {
      if (p.classList.contains("box-head") || p.classList.contains("keywords")) return;
      if (p.textContent.trim().length < 60) return;
      p.classList.add("p-wrap");
      var b = document.createElement("button");
      b.className = "p-tr-btn"; b.type = "button";
      b.title = "Bu paragrafı Türkçeye çevir"; b.textContent = "tr";
      p.appendChild(b);
    });
  }

  /* ---- içindekiler ---- */
  var tocLinks = [], heads = [], TOC = [];
  function buildToc(doc) {
    TOC = doc.toc || [];
    var ul = $("#toc");
    ul.innerHTML = TOC.map(function (t) {
      return '<li class="l' + t.level + '"><a href="#' + t.id + '">' +
        '<span class="n">' + esc(t.n || "") + "</span><span>" + esc(t.t) + "</span></a></li>";
    }).join("");
    tocLinks = $$("#toc a");
    heads = TOC.map(function (t) { return document.getElementById(t.id); }).filter(Boolean);
    tocLinks.forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        var el = document.getElementById(id.slice(1));
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
        if (MOBILE()) { $("#side").classList.remove("show"); $("#scrim").classList.remove("show"); }
      });
    });
  }

  /* ---- kumanda düğmeleri ---- */
  function bindReaderControls(doc) {
    // sabit ikonlar
    $("#menuBtn").innerHTML = ic("menu", 16);
    $("#narrowBtn").innerHTML = ic("shrink", 15);
    $("#widerBtn").innerHTML = ic("expand", 15);
    $("#ttsBtn").innerHTML = ic("headphones", 16);
    $("#markBtn").innerHTML = ic("underline", 15);
    $("#quizBtn").innerHTML = ic("quiz", 15) + '<span class="lbl-full">Sınav</span>';

    function syncDict() {
      document.documentElement.classList.toggle("dict-off", !S.dictOn);
      var b = $("#dictBtn");
      b.classList.toggle("on", S.dictOn);
      b.innerHTML = ic(S.dictOn ? "languages" : "eye", 15) +
        '<span class="lbl-full">Sözlük</span>';
    }
    $("#dictBtn").onclick = function () {
      S.dictOn = !S.dictOn; pref.set("rl_dict", S.dictOn); syncDict(); hidePop();
    };
    syncDict();

    function syncMark() {
      document.documentElement.classList.toggle("mark-known", S.markKnown);
      $("#markBtn").classList.toggle("on", S.markKnown);
    }
    $("#markBtn").onclick = function () {
      S.markKnown = !S.markKnown; pref.set("rl_mark", S.markKnown); syncMark();
    };
    syncMark();

    function syncMeasure() {
      document.documentElement.style.setProperty("--measure", S.measure + "em");
    }
    syncMeasure();
    $("#widerBtn").onclick = function () {
      S.measure = Math.min(46, S.measure + 3); pref.set("rl_measure", S.measure); syncMeasure();
    };
    $("#narrowBtn").onclick = function () {
      S.measure = Math.max(23, S.measure - 3); pref.set("rl_measure", S.measure); syncMeasure();
    };

    $("#menuBtn").onclick = function () {
      if (MOBILE()) {
        var on = $("#side").classList.toggle("show");
        $("#scrim").classList.toggle("show", on);
        $("#menuBtn").classList.toggle("on", on);
      } else {
        var c = document.documentElement.classList.toggle("side-collapsed");
        pref.set("rl_side", c);
        $("#menuBtn").classList.toggle("on", !c);
      }
    };
    if (pref.get("rl_side", false)) document.documentElement.classList.add("side-collapsed");
    $("#menuBtn").classList.toggle("on",
      !MOBILE() && !document.documentElement.classList.contains("side-collapsed"));

    $("#quizBtn").onclick = function () { location.hash = "#/quiz/" + doc.id; };
    $("#vocabBtn").onclick = openDrawer;
  }

  /* ---- şekil büyütme (tek sefer bağlanır) ---- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-zoom]"); if (!b) return;
    var fr = b.closest(".fig-frame");
    var cur = fr.style.getPropertyValue("--z") || "1";
    var next = cur === "1" ? "1.75" : "1";
    fr.style.setProperty("--z", next);
    var s = fr.querySelector("svg");
    if (s) { s.style.width = next === "1" ? "100%" : next * 100 + "%"; s.style.maxWidth = "none"; }
    b.textContent = next === "1" ? "⤢ Büyüt" : "⤡ Küçült";
  });

  /* ====================== SÖZLÜK BALONCUĞU ====================== */
  var popOpen = false, popCleanup = null;
  var global_showWordPop = null;
  function hidePop() {
    var pop = $("#pop"); if (!pop) return;
    pop.classList.remove("show"); popOpen = false;
    if (popCleanup) { popCleanup(); popCleanup = null; }
    pop.style.left = "0px"; pop.style.top = "0px";
  }

  function placePop(ref) {
    var pop = $("#pop"), F = window.FUI;
    var arrow = $(".arrow", pop);
    if (popCleanup) { popCleanup(); popCleanup = null; }
    function run() {
      return F.computePosition(ref, pop, {
        placement: "top",
        middleware: [F.offset(10), F.flip({ padding: 12 }), F.shift({ padding: 12 }),
                     F.arrow({ element: arrow, padding: 8 })]
      }).then(function (r) {
        Object.assign(pop.style, { left: r.x + "px", top: r.y + "px" });
        var a = r.middlewareData.arrow || {};
        var side = r.placement.split("-")[0];
        var opp = { top: "bottom", bottom: "top", left: "right", right: "left" }[side];
        var st = { left: a.x != null ? a.x + "px" : "", top: a.y != null ? a.y + "px" : "",
                   right: "", bottom: "" };
        st[opp] = "-5px";
        st.transform = side === "bottom" ? "rotate(225deg)"
          : side === "top" ? "rotate(45deg)"
          : side === "left" ? "rotate(135deg)" : "rotate(315deg)";
        Object.assign(arrow.style, st);
      });
    }
    run();
    if (ref.nodeType) popCleanup = F.autoUpdate(ref, pop, run);
    pop.classList.add("show"); popOpen = true;
  }

  function srcTag(s) {
    return s === "dict" ? "yerel sözlük" : s === "error" ? "bağlantı yok" : s;
  }

  /* Sözcük baloncuğu okuyucuya değil SİTEYE ait: hero'daki manşet de
     aynı baloncuğu açıyor (assets/hero-read.js). Bu yüzden setupLookupUI
     içinden çıkarıldı — iki ayrı kopya iki ayrı davranış demekti. */
  function showWordPop(el, docId) {
      var pop = $("#pop");
      var raw = el.textContent;
      pop.innerHTML = '<div class="arrow"></div><div class="pop-hd">' +
        '<span class="pop-word">' + esc(raw) + "</span></div>" +
        '<p class="pop-def"><span class="spin"></span> aranıyor…</p>';
      placePop(el);
      Lookup.word(raw).then(function (r) {
        if (!popOpen) return;
        if (!r) { pop.innerHTML = '<div class="arrow"></div><p class="pop-def">Karşılık bulunamadı.</p>'; return; }
        if (DB && DB.logLookup) DB.logLookup(r.key || raw, docId, r.source);
        var saved = vocabKeys.has(r.key);
        var h = '<div class="arrow"></div><div class="pop-hd">' +
          '<span class="pop-word">' + esc(r.key) + "</span>" +
          (r.pos ? '<span class="pop-pos">' + esc(r.pos) + "</span>" : "") +
          (r.inflected ? '<span class="pop-from">← ' + esc(r.inflected) + "</span>" : "") +
          "</div>";
        if (r.source === "error") {
          h += '<p class="pop-def">Bu sözcük yerel sözlükte yok ve çeviri servisine ulaşılamadı.</p>';
        } else {
          h += '<p class="pop-tr">' + esc(r.tr) + "</p>";
          if (r.def) h += '<p class="pop-def">' + esc(r.def) + "</p>";
          if (r.alts && r.alts.length)
            h += '<div class="pop-alts">' + r.alts.map(function (a) {
              return "<b>" + esc(a) + "</b>"; }).join("") + "</div>";
        }
        h += '<div class="pop-src"><span class="tag">' + srcTag(r.source) +
          (r.cached ? " · önbellek" : "") + "</span>" +
          '<button class="btn mini" data-save=\'' +
          esc(JSON.stringify({ key: r.key, tr: r.tr, def: r.def || "",
                               pos: r.pos || "", docId: docId })) + "'>" +
          (saved ? "✓ kayıtlı" : "+ deftere ekle") + "</button></div>";
        pop.innerHTML = h;
        placePop(el);
      });
  }
  global_showWordPop = showWordPop;

  function setupLookupUI(doc) {
    var article = $("#article"), pop = $("#pop");
    function showWord(el) { showWordPop(el, doc.id); }

    function showPhrase(sel) {
      var txt = sel.toString().replace(/\s+/g, " ").replace(/\s*\btr\b\s*$/, "").trim();
      var rect = sel.getRangeAt(0).getBoundingClientRect();
      var vref = { getBoundingClientRect: function () { return rect; } };
      pop.innerHTML = '<div class="arrow"></div><p class="pop-orig">' +
        esc(txt.slice(0, 400)) + "</p>" +
        '<p class="pop-def"><span class="spin"></span> çevriliyor…</p>';
      placePop(vref);
      Lookup.phrase(txt).then(function (r) {
        if (!popOpen) return;
        var h = '<div class="arrow"></div><p class="pop-orig">' +
          esc(r.text.slice(0, 400)) + "</p>";
        h += r.tr ? '<p class="pop-tr">' + esc(r.tr) + "</p>"
          : '<p class="pop-def"><em>Çeviri servisine ulaşılamadı — aşağıdaki terimler yerel sözlükten.</em></p>';
        if (r.terms.length) {
          h += '<div class="pop-terms">' + r.terms.map(function (t) {
            return '<div class="t"><b>' + esc(t.w) + "</b><span>" + esc(t.tr) + "</span></div>";
          }).join("") + "</div>";
        }
        h += '<div class="pop-src"><span class="tag">' + (r.engine || "yerel sözlük") +
          "</span><span>" + r.text.split(/\s+/).length + " sözcük</span></div>";
        pop.innerHTML = h;
        placePop(vref);
      });
    }

    function onUp(e) {
      if (e.target.closest(".p-tr-btn, .fig-tools, th.sortable")) return;
      setTimeout(function () {
        var sel = getSelection();
        var txt = sel && !sel.isCollapsed ? sel.toString().trim() : "";
        if (txt && /\s/.test(txt) && txt.length > 1) { showPhrase(sel); return; }
        if (!S.dictOn) return;
        var w = e.target.closest(".w");
        if (w) showWord(w); else hidePop();
      }, 10);
    }
    article.addEventListener("mouseup", onUp);
    cleanups.push(function () { article.removeEventListener("mouseup", onUp); });

    // paragraf çevirisi
    function onParaTr(e) {
      var b = e.target.closest(".p-tr-btn"); if (!b) return;
      e.stopPropagation();
      var p = b.closest("p"), nx = p.nextElementSibling;
      if (nx && nx.classList.contains("p-tr")) { nx.remove(); b.classList.remove("on"); return; }
      var box = document.createElement("div");
      box.className = "p-tr";
      box.innerHTML = '<span class="lbl">Türkçe</span><span class="spin"></span> çevriliyor…';
      p.after(box); b.classList.add("on");
      var txt = p.textContent.replace(/\s*tr\s*$/, "").replace(/\s+/g, " ").trim();
      Lookup.phrase(txt).then(function (r) {
        box.innerHTML = '<span class="lbl">Türkçe' + (r.engine ? " · " + r.engine : "") +
          "</span>" + (r.tr ? esc(r.tr)
            : "<em>Çeviri servisine ulaşılamadı. Tek tek sözcüklere tıklamak çevrimdışı da çalışır.</em>");
      });
    }
    article.addEventListener("click", onParaTr);
    cleanups.push(function () { article.removeEventListener("click", onParaTr); });
  }

  document.addEventListener("mousedown", function (e) {
    if (popOpen && !e.target.closest("#pop") && !e.target.closest(".w")) hidePop();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { hidePop(); closeDrawer(); $("#side") && $("#side").classList.remove("show"); }
  });

  /* ======================== SÖZCÜK DEFTERİ ======================== */
  var vocabKeys = new Set();

  function refreshVocabUI() {
    if (!DB) return;
    DB.listVocab().then(function (list) {
      vocabKeys = new Set((list || []).map(function (v) { return v.key; }));
      var vb = $("#vocabBtn");
      if (vb) vb.innerHTML = ic("notebook", 15) +
        '<span class="lbl-full">Defter</span><span id="vocabCount">' +
        (list ? list.length : 0) + "</span>";
      var body = $("#vocabList");
      if (body) {
        body.innerHTML = (!list || !list.length)
          ? '<div class="dw-empty">Defter boş.<br>Metindeki bir sözcüğe tıklayıp <b>+ deftere ekle</b> ile buraya kaydedebilirsiniz.</div>'
          : list.map(function (v) {
              return '<div class="vocab-item"><div class="txt"><b>' + esc(v.key) + "</b>" +
                '<div class="tr">' + esc(v.tr) + "</div>" +
                (v.def ? '<div class="df">' + esc(v.def) + "</div>" : "") +
                '</div><button class="x" data-del="' + esc(v.key) + '" title="Sil">×</button></div>';
            }).join("");
      }
      $$(".w.saved").forEach(function (el) { el.classList.remove("saved"); });
      if (vocabKeys.size) {
        $$("#article .w").forEach(function (el) {
          var h = peek(el.textContent);
          if (h && vocabKeys.has(h.key)) el.classList.add("saved");
        });
      }
    }).catch(function () {});
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-save]");
    if (b && DB) {
      var d = JSON.parse(b.dataset.save);
      if (vocabKeys.has(d.key)) {
        DB.removeVocab(d.key).then(function () {
          b.textContent = "+ deftere ekle"; toast("Defterden çıkarıldı"); refreshVocabUI();
        });
      } else {
        DB.addVocab(d).then(function () {
          b.textContent = "✓ kayıtlı"; toast("Deftere eklendi: " + d.key); refreshVocabUI();
        });
      }
      return;
    }
    var x = e.target.closest("[data-del]");
    if (x && DB) DB.removeVocab(x.dataset.del).then(refreshVocabUI);
  });

  function openDrawer() { $("#drawer").classList.add("show"); $("#scrim").classList.add("show"); }
  function closeDrawer() { $("#drawer").classList.remove("show"); $("#scrim").classList.remove("show"); }
  $("#dwClose").onclick = closeDrawer;
  $("#scrim").onclick = function () {
    closeDrawer(); var s = $("#side"); if (s) s.classList.remove("show");
  };
  $("#dwExport").onclick = function () {
    if (!DB) return;
    DB.listVocab().then(function (list) {
      if (!list || !list.length) return toast("Defter boş");
      var csv = "﻿sözcük;türkçe;tanım\n" + list.map(function (v) {
        return [v.key, v.tr, v.def].map(function (x) {
          return '"' + String(x == null ? "" : x).replace(/"/g, '""') + '"';
        }).join(";");
      }).join("\n");
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      a.download = "sozcuk-defteri.csv"; a.click();
      toast("CSV indirildi");
    });
  };
  $("#dwClear").onclick = function () {
    if (!DB) return;
    DB.listVocab().then(function (list) {
      if (!list || !list.length) return;
      if (!confirm("Defterdeki " + list.length + " sözcük silinsin mi?")) return;
      Promise.all(list.map(function (v) { return DB.removeVocab(v.key); })).then(refreshVocabUI);
    });
  };

  /* ==================== İLERLEME VE OTURUM ==================== */
  function setupProgress(doc, wordCount) {
    var bar = $("#bar"), prog = $("#prog"), posEl = $("#pos");
    var sessionId = null;
    if (DB && DB.beginSession) {
      DB.beginSession(doc.id).then(function (id) { sessionId = id; });
    }
    var maxPct = 0, ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var shell = $("#shell"); if (!shell) return;
        var total = shell.offsetHeight - innerHeight;
        var p = Math.max(0, Math.min(1, (scrollY - shell.offsetTop) / Math.max(1, total)));
        prog.style.width = (p * 100).toFixed(2) + "%";
        bar.classList.add("show");
        if (p > maxPct) maxPct = p;
        var cur = null;
        for (var i = 0; i < heads.length; i++)
          if (heads[i].getBoundingClientRect().top <= innerHeight * 0.32) cur = heads[i];
        if (cur) {
          tocLinks.forEach(function (a) {
            a.classList.toggle("on", a.getAttribute("href") === "#" + cur.id);
          });
          var t = TOC.filter(function (x) { return x.id === cur.id; })[0];
          if (t) posEl.innerHTML = (t.n ? "<b>§" + esc(t.n) + "</b> " : "") + esc(t.t.slice(0, 34));
        }
        if (DB && DB.setProgress) {
          DB.setProgress(doc.id, {
            pct: maxPct, sectionId: cur ? cur.id : null,
            finishedAt: maxPct > 0.93 ? Date.now() : undefined
          });
        }
      });
    }
    /* --- okuma odağı ---------------------------------------------------
       Başlık bloğu geçilince içindekiler kapanır, metin ortalanır.

       Karar YALNIZCA konuma bakar, yöne değil. Yön duyarlı olduğunda her
       yukarı kaydırmada panel açılıp kapanıyor ve sayfa sağa-sola salınıyordu.
       İki eşik arasında histerezis var: kapanma ve açılma noktaları farklı,
       böylece sınırda titremez. ☰ ile elle katlandıysa hiç karışılmaz.     */
    var focusOn = false, focusLock = false;
    function autoFocus() {
      if (MOBILE() || focusLock || pref.get("rl_side", false)) return;
      var head = $(".doc-head");
      var kapat = head ? head.offsetTop + head.offsetHeight : innerHeight * 0.6;
      var ac = kapat * 0.55;                 // açılma eşiği daha yukarıda
      var y = scrollY;
      if (!focusOn && y > kapat) {
        focusOn = true;
        document.documentElement.classList.add("read-focus");
      } else if (focusOn && y < ac) {
        focusOn = false;
        document.documentElement.classList.remove("read-focus");
      }
    }
    // ☰'ye basılırsa otomatik davranış bir daha devreye girmesin
    var mb = $("#menuBtn");
    if (mb) mb.addEventListener("click", function () {
      focusLock = true;
      focusOn = false;
      document.documentElement.classList.remove("read-focus");
    });

    function onScrollAll() { onScroll(); autoFocus(); }
    addEventListener("scroll", onScrollAll, { passive: true });
    addEventListener("resize", onScroll);
    onScroll();
    cleanups.push(function () {
      removeEventListener("scroll", onScrollAll);
      document.documentElement.classList.remove("read-focus");
    });

    function end() {
      if (DB && DB.endSession && sessionId != null) DB.endSession(sessionId, wordCount);
    }
    addEventListener("pagehide", end);
    cleanups.push(function () {
      removeEventListener("resize", onScroll);
      removeEventListener("pagehide", end);
      end();
    });

    // kaldığı yere dön
    if (DB && DB.getProgress) {
      DB.getProgress(doc.id).then(function (p) {
        if (!p || !p.sectionId) return;
        var el = document.getElementById(p.sectionId);
        if (el && (p.pct || 0) > 0.02) {
          setTimeout(function () { el.scrollIntoView({ block: "start" }); }, 60);
          toast("Kaldığınız yere dönüldü");
        }
      }).catch(function () {});
    }
  }

  /* ========================= SESLENDİRME ========================= */
  function setupTTS(doc) {
    var btn = $("#ttsBtn");
    if (!btn || !window.TTSPanel) return;
    var hasAny = (window.TTS && TTS.available && TTS.available()) ||
      (window.AudioTTS && AudioTTS.has(doc.id));
    if (!hasAny) {
      btn.disabled = true; btn.title = "Bu tarayıcı seslendirmeyi desteklemiyor";
      return;
    }

    TTSPanel.mount(document.body, {
      docId: doc.id,
      getNodes: function () {
        return $$("#article h1, #article h2, #article h3, #article p")
          .filter(function (n) {
            return !n.classList.contains("p-tr") &&
                   !n.closest(".doc-head") &&
                   n.textContent.trim().length > 2;
          });
      },
      translate: function (text) {
        return window.Lookup
          ? Lookup.phrase(text).then(function (r) { return r.tr || ""; })
          : Promise.resolve("");
      }
    });

    btn.onclick = function () {
      TTSPanel.toggleVisible();
      btn.classList.toggle("on", TTSPanel.visible());
      if (TTSPanel.visible()) TTSPanel.playPause();
    };
    cleanups.push(function () { try { TTSPanel.destroy(); } catch (e) {} });
  }

  /* ======================= SINAV GÖRÜNÜMÜ ======================= */
  function renderQuiz(doc) {
    var wrap = document.createElement("div");
    wrap.className = "quiz-page";
    wrap.innerHTML = '<div class="qp-head"><h1>Sınav</h1><p>' +
      esc(doc.title.tr) + "</p></div><div id=\"quizHost\"></div>" +
      '<p style="margin-top:1.5rem"><a class="btn" href="#/read/' +
      encodeURIComponent(doc.id) + '">← Metne dön</a></p>';
    view.appendChild(wrap);
    if (window.Quiz && Quiz.render) {
      Quiz.render($("#quizHost"), doc, function (res) {
        if (DB && DB.saveQuizRun) {
          DB.saveQuizRun({ docId: doc.id, score: res.score, total: res.total,
                           answers: res.answers || [] });
        }
      });
    } else {
      $("#quizHost").textContent = "Sınav modülü yüklenemedi.";
    }
  }

  /* ====================== İSTATİSTİK GÖRÜNÜMÜ ====================== */
  function renderStats() {
    var wrap = document.createElement("div");
    wrap.className = "stats-page";
    view.appendChild(wrap);
    if (window.StatsView && StatsView.render) StatsView.render(wrap);
    else wrap.textContent = "İstatistik modülü yüklenemedi.";
  }

  /* ========================= ANİMASYONLAR ========================= */
  function revealAnims() {
    if (!window.gsap || !window.ScrollTrigger || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);
    $$("figure.fig, .tbl-wrap, .box").forEach(function (el) {
      el.classList.add("reveal");
      gsap.to(el, { opacity: 1, y: 0, duration: .7, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });
  }

  /* ================= HERO — kelime takımyıldızı küresi =================
     Küreyi assets/globe.js çizer; buradaki iş yalnızca bağlamak ve
     görünüm kapanırken temizletmek. */
  /* Manşet: kütüphaneden gerçek bir satır (assets/hero-read.js). */
  function heroRead() {
    if (!window.HeroRead) return;
    try { HeroRead.mount({ reduced: REDUCED }); } catch (e) { return; }
    cleanups.push(function () { try { HeroRead.destroy(); } catch (e) {} });
  }

  function heroGlobe() {
    var cv = $("#globe");
    if (!cv) return;
    if (!window.WordGlobe || !window.THREE || !window.WORDGRAPH) {
      cv.style.display = "none";
      return;
    }
    var ok = false;
    try {
      // fill<1: küre kabını doldurur ve sağ kenardan taşar (bkz. hero.css).
      // Dar ekranda küre akışa dönüyor, orada kırpılmamalı.
      var dar = matchMedia("(max-width:1080px)").matches;
      ok = WordGlobe.mount(cv, { theme: S.theme, reduced: REDUCED,
                                 fill: dar ? 1 : 0.72 });
    } catch (e) { ok = false; }
    if (!ok) { cv.style.display = "none"; return; }
    // tema düğmesi bunu çağırıyor
    window.__hero__ = { theme: WordGlobe.setTheme };
    cleanups.push(function () {
      try { WordGlobe.destroy(); } catch (e) {}
      window.__hero__ = null;
    });
  }

  /* Hero'nun hareketi (renk şeridi, giriş, sayaçlar, ışık) assets/hero-motion.js'te. */
  function heroMotion() {
    if (!window.HeroMotion) return;
    try { HeroMotion.mount(); } catch (e) { return; }
    cleanups.push(function () { try { HeroMotion.destroy(); } catch (e) {} });
  }

  /* Hero manşeti aynı sözcük baloncuğunu kullanıyor. */
  window.__wordPop = function (el, docId) {
    if (global_showWordPop) global_showWordPop(el, docId || null);
  };
  window.__hidePop = function () { hidePop(); };

  /* ============================ AÇILIŞ ============================ */
  function boot() {
    refreshVocabUI();
    route();
    console.log("[kütüphane] " + (window.MANIFEST || []).length + " belge · " +
      (window.Lookup ? Lookup.size : 0) + " sözlük maddesi · depo: " +
      (DB && DB.engine ? DB.engine : "yok"));
    document.body.classList.add("ready");
  }
  /* Kullanıcının yüklediği belgeler kütüphanede görünsün diye açılıştan
     ÖNCE Store'dan okunur; gövdeleri de orada durduğu için ensureDoc
     onlar için ek yükleme yapmaz. */
  function acilis() {
    if (window.PdfImport && PdfImport.yukle) {
      PdfImport.yukle().then(boot, boot);
    } else { boot(); }
  }
  if (DB && DB.ready) DB.ready().then(acilis, acilis); else acilis();
})();
