/* ==================================================================
   hero-read.js — hero'nun manşeti: kitaptan gerçek bir satır

   FİKİR
   Bu site "İngilizce okumayı Türkçe destekle söküyorsun" diyor. Bir
   manşet bunu İDDİA edebilir ("Ne okumak istersiniz?") ya da GÖSTEREBİLİR.
   Manşet artık kütüphanedeki gerçek bir kitaptan gerçek bir cümle:
   kitapların dizildiği yazı tipiyle (Latin Modern), altında bilinmeyen
   sözcüklerin Türkçesi asılı. Okuma başlığı okuyor.

   Cümleler ELLE seçildi ve karşılıklar ELLE denetlendi. Sözlük bağlamsız
   olduğu için otomatik seçim yanlış karşılık gösteriyordu: "the present
   moment"taki `present` sözlükte "sunmak" (fiil), "he thought"taki
   `thought` "düşünce" (isim). Manşette yanlış bir karşılık göstermek,
   ürünün tek vaadini baltalar. Bu yüzden yalnızca bağlamda DOĞRU olan
   sözcükler işaretli; gerisi işaretsiz kalıyor — zaten ürünün gerçeği de
   bu: her sözcüğün karşılığı yok.

   ES modülü yok, fetch yok — file:// altında da çalışır (sözleşme §0).
   ================================================================== */
(function (global) {
  "use strict";

  /* Her satır kütüphanede DURAN bir kitaptan. `gloss` yalnızca bağlamda
     doğrulanmış karşılıkları taşır. */
  var SATIRLAR = [
    { doc: "call-of-the-wild",
      t: "They were not half living, or quarter living.",
      gloss: { half: "yarım", quarter: "çeyrek" } },
    { doc: "black-beauty",
      t: "This is not the first time, nor the second, but it shall be the last.",
      gloss: { second: "ikinci", last: "son" } },
    { doc: "secret-garden",
      t: "He thought that the whole world belonged to him.",
      gloss: { world: "dünya" } },
    { doc: "time-machine",
      t: "We are always getting away from the present moment.",
      gloss: { away: "uzağa", moment: "an" } }
  ];

  var st = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function mount(opts) {
    opts = opts || {};
    var el = document.getElementById("heroRead");
    if (!el) return false;
    if (st) destroy();

    var reduced = opts.reduced != null ? !!opts.reduced
      : (global.matchMedia
         ? matchMedia("(prefers-reduced-motion: reduce)").matches : false);

    /* Kütüphanede gerçekten duran bir satır seç. Belge yoksa (liste
       değişmiş olabilir) o satırı atla — manşet asla boş kalmamalı. */
    var D = global.DOCS || {};
    var uygun = SATIRLAR.filter(function (s) { return D[s.doc]; });
    if (!uygun.length) uygun = SATIRLAR;
    var s = uygun[Math.floor(Math.random() * uygun.length)];
    var kitap = D[s.doc];

    /* Cümleyi sözcüklere böl; noktalama sözcüğe yapışık kalsın ki
       satır kırılınca ", " tek başına aşağı düşmesin. */
    var parcalar = s.t.split(/(\s+)/);
    var html = "", i = 0;
    parcalar.forEach(function (p) {
      if (/^\s+$/.test(p)) { html += " "; return; }
      var kok = p.toLowerCase().replace(/[^a-z']/g, "");
      var tr = s.gloss[kok];
      if (tr) {
        html += '<span class="hr-w has-gloss" data-i="' + (i++) + '" tabindex="0">' +
          '<span class="hr-en">' + esc(p) + "</span>" +
          '<span class="hr-tr" aria-hidden="true">' + esc(tr) + "</span>" +
          '<span class="sr-only"> (' + esc(tr) + ")</span></span>";
      } else {
        html += '<span class="hr-w">' + esc(p) + "</span>";
      }
    });

    el.innerHTML = html;
    el.classList.add("hero-read");

    /* Künye: satırın geldiği kitap. Süs değil — okurun tıklayıp o kitabı
       açabildiği gerçek bir bağlantı. */
    var kunye = document.getElementById("heroSource");
    if (kunye && kitap) {
      kunye.innerHTML = '<a href="#/read/' + encodeURIComponent(s.doc) + '">' +
        esc(kitap.title.tr || kitap.title.en) + "</a>";
      kunye.hidden = false;
    }

    var kelimeler = [].slice.call(el.querySelectorAll(".has-gloss"));
    var tumSozcukler = [].slice.call(el.querySelectorAll(".hr-w"));
    var timer = 0, offs = [];

    /* Asılı karşılıklar sözcükten geniş olabiliyor; yan yana iki işaretli
       sözcükte üst üste biniyorlardı. Cümleler bitişik işaretlenmeyecek
       biçimde seçildi, ama satır kırılımı ölçüye göre değişiyor —
       ÖLÇEREK de bakıyoruz ve çakışanı gizliyoruz. Gizlenen sözcük
       tıklanabilir kalıyor, yalnızca asılı karşılığı gitmiş oluyor. */
    function cakismalariAyikla() {
      var son = null;
      kelimeler.forEach(function (w) {
        var g = w.querySelector(".hr-tr");
        if (!g) return;
        g.style.visibility = "";
        var r = g.getBoundingClientRect();
        if (son && r.left < son.right + 8 && Math.abs(r.top - son.top) < 4) {
          g.style.visibility = "hidden";
          return;
        }
        son = r;
      });
    }

    /* Karşılıklar sırayla belirir: gözü soldan sağa, okuma yönünde
       götürür. Hepsi birden açılırsa satır bir sözlük sayfasına dönüyor. */
    function sirala() {
      kelimeler.forEach(function (w, k) {
        w.style.setProperty("--d", (k * 260 + 700) + "ms");
        w.classList.add("on");
      });
    }
    if (reduced) {
      kelimeler.forEach(function (w) { w.style.setProperty("--d", "0ms"); w.classList.add("on"); });
      cakismalariAyikla();
    } else {
      timer = setTimeout(function () { sirala(); cakismalariAyikla(); }, 260);
    }
    /* Yazı tipi geç gelirse satır yeniden kırılıyor; ölçüm tazelenmeli. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(cakismalariAyikla, function () {});
    }
    var olcTimer = 0;
    function yenidenOlc() {
      clearTimeout(olcTimer);
      olcTimer = setTimeout(cakismalariAyikla, 160);
    }
    global.addEventListener("resize", yenidenOlc);
    offs.push(function () { global.removeEventListener("resize", yenidenOlc); clearTimeout(olcTimer); });

    /* Üstüne gelince o sözcük öne çıkar; dokunmatikte de çalışsın diye
       odak olayları da bağlı. */
    function isaret(e) {
      var w = e.target.closest && e.target.closest(".has-gloss");
      kelimeler.forEach(function (x) { x.classList.toggle("hot", x === w); });
    }
    function birak() { kelimeler.forEach(function (x) { x.classList.remove("hot"); }); }
    /* Manşetteki HER sözcük, kitap sayfasındakiyle aynı sözlük
       baloncuğunu açar — hero sadece anlatmıyor, ürünün kendisini
       çalıştırıyor. Baloncuk app.js'te; iki ayrı kopya iki ayrı
       davranış demekti. */
    function dokun(e) {
      var w = e.target.closest && e.target.closest(".hr-w");
      if (!w) return;
      var kelime = (w.querySelector(".hr-en") || w).textContent
        .replace(/[^A-Za-z'’]/g, "");
      if (!kelime || !global.__wordPop) return;
      e.preventDefault();
      e.stopPropagation();
      /* Baloncuk ögenin metnini okuyor; noktalamasız bir vekil veriyoruz. */
      var vekil = { textContent: kelime,
                    nodeType: 1,
                    getBoundingClientRect: function () {
                      return w.getBoundingClientRect();
                    } };
      global.__wordPop(vekil, s.doc);
    }
    el.addEventListener("click", dokun);
    offs.push(function () { el.removeEventListener("click", dokun); });
    tumSozcukler.forEach(function (w) {
      w.tabIndex = 0;
      w.setAttribute("role", "button");
      w.setAttribute("aria-label",
        (w.querySelector(".hr-en") || w).textContent.trim() + " — Türkçesi");
    });
    function tus(e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var w = e.target.closest && e.target.closest(".hr-w");
      if (!w) return;
      e.preventDefault();
      dokun({ target: w, preventDefault: function () {},
              stopPropagation: function () {} });
    }
    el.addEventListener("keydown", tus);
    offs.push(function () { el.removeEventListener("keydown", tus); });

    el.addEventListener("pointerover", isaret);
    el.addEventListener("pointerleave", birak);
    el.addEventListener("focusin", isaret);
    el.addEventListener("focusout", birak);
    offs.push(function () {
      el.removeEventListener("pointerover", isaret);
      el.removeEventListener("pointerleave", birak);
      el.removeEventListener("focusin", isaret);
      el.removeEventListener("focusout", birak);
    });

    st = {
      dead: false,
      destroy: function () {
        st.dead = true;
        clearTimeout(timer);
        offs.forEach(function (f) { try { f(); } catch (e) {} });
        /* Son durum görünür bırakılır: bu modül hiç çalışmasa da manşet
           okunur olmalı (bkz. hero-motion.js'teki aynı kural). */
        kelimeler.forEach(function (w) { w.classList.add("on"); w.classList.remove("hot"); });
      },
      info: function () {
        return { doc: s.doc, kelime: kelimeler.length, reduced: reduced };
      }
    };
    return true;
  }

  function destroy() {
    if (!st) return;
    try { st.destroy(); } catch (e) {}
    st = null;
  }

  global.HeroRead = {
    mount: mount,
    destroy: destroy,
    info: function () { return st && !st.dead ? st.info() : null; }
  };
})(window);
