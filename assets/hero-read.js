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
      gloss: { half: "yarım", quarter: "çeyrek", living: "yaşam" } },
    { doc: "black-beauty",
      t: "This is not the first time, nor the second, but it shall be the last.",
      gloss: { second: "ikinci", last: "son" } },
    { doc: "secret-garden",
      t: "He thought that the whole world belonged to him.",
      gloss: { whole: "bütün", world: "dünya" } }
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
    var timer = 0, offs = [];

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
    } else {
      timer = setTimeout(sirala, 260);
    }

    /* Üstüne gelince o sözcük öne çıkar; dokunmatikte de çalışsın diye
       odak olayları da bağlı. */
    function isaret(e) {
      var w = e.target.closest && e.target.closest(".has-gloss");
      kelimeler.forEach(function (x) { x.classList.toggle("hot", x === w); });
    }
    function birak() { kelimeler.forEach(function (x) { x.classList.remove("hot"); }); }
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
