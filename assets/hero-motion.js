/* ==================================================================
   hero-motion.js — açılış bölümünün hareketi

   Dört iş yapar:
     1) belge renk şeridi (#heroBar) — her metin için bir düğme, sürekli
        soldan sağa akan bir parlama; üstüne gelince küre o metne odaklanır
     2) sol sütunun giriş sıralaması (anime.js zaman çizelgesi)
     3) #heroStats sayılarının 0'dan sayılması
     4) imleci izleyen yumuşak ışık: aynı değer küreye de gider

   TASARIM KURALI — "SONA DEĞİL BAŞA ANİMASYON":
   Son (görünür) durum daima CSS'te ve HTML'de durur. JS yalnızca
   başlangıç kaymasını yazar ve onu geri siler. Bu dosya hiç yüklenmezse,
   ortasında hata verirse ya da kullanıcı hareketi azalttıysa hero yine
   eksiksiz okunur. Görünmez kalmış tek bir öğe bile kabul edilemez.

   Bağımlılık: window.A (anime.js v4, assets/vendor/bundle.js)
               window.Motion (motion.dev v12) — yoksa yedeklere düşer
               window.WORDGRAPH — şeridin verisi
               window.WordGlobe — varsa odak/imleç bağlanır (WebGL'siz
               makinede küre hiç kurulmuyor; her çağrı korumalı)

   API:
     HeroMotion.mount()   → true | false
     HeroMotion.destroy()
     HeroMotion.info()    → tanılama | null

   ES modülü yok, fetch yok — file:// altında da çalışır (sözleşme §0).
   ================================================================== */
(function (global) {
  "use strict";

  var st = null;                       // etkin örnek (aynı anda tek hero)

  /* Ev ivmesi ve süreleri: sitenin geri kalanıyla aynı olmalı, yoksa
     hero "tanıtım sayfası", gövde "uygulama" gibi duruyor. */
  var EASE = "cubicBezier(.22,1,.36,1)";
  var RISE = 14;                       // giriş kayması (px)

  /* Parlamanın tam dönemi 6.25 s = 1 / 0.16 sn⁻¹ — globe.js'teki yay
     darbesinin (`pulse += dt * 0.16`) periyodunun aynısı. İki modül
     birbirine hiç bakmadan aynı nefesi paylaşsın diye seçildi; birini
     değiştiren ötekini de değiştirmeli. */
  var SHEEN_PERIOD = 6250;
  var SHEEN_SWEEP = 1600;              // tek bir bölmenin parlama süresi

  /* Belge tonları: mürekkep mavisi (209°) → sıcak kahve (30°).
     app.js'teki docHue() ve globe.js'teki bandHue() ile BİREBİR aynı
     olmak zorunda — şeridin i. bölmesi, kartın i. sol şeridiyle aynı
     rengi vermezse şerit/küre/kart üçlüsü tek aile gibi okunmuyor. */
  function bandHue(i, total) {
    var n = Math.max(1, (total || 1) - 1);
    var t = Math.max(0, Math.min(1, i / n));
    return Math.round(209 + (30 - 209) * t);
  }

  /* --------------------------- yardımcılar --------------------------- */
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function slice(l) { return Array.prototype.slice.call(l); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function shortTitle(s, n) {
    s = String(s || "");
    return s.length > n ? s.slice(0, n - 1).replace(/[\s,:;–—-]+$/, "") + "…" : s;
  }
  /** Animasyonun bıraktığı satır içi izleri siler: son durum yine CSS'in. */
  function bare(el) {
    if (!el || !el.style) return;
    el.style.opacity = "";
    el.style.transform = "";
    el.style.transformOrigin = "";
  }
  /** motion.dev'in ortak kare kuyruğu varsa ona bin, yoksa düz rAF.
      keepAlive kullanılmıyor: geri dönüş her karede kendini yeniden
      sıraya sokuyor, böylece paketten dışa açılmayan cancelFrame'e
      gerek kalmadan durdurulabiliyor. */
  function tickNext(fn) {
    var M = global.Motion;
    if (M && M.frame && M.frame.update) { M.frame.update(fn); return 0; }
    return requestAnimationFrame(fn);
  }

  /* ================================================================
     mount
     ================================================================ */
  function mount(opts) {
    opts = opts || {};
    var A = global.A;
    var M = global.Motion;
    var heroIn = document.querySelector(".hero-in");
    if (!heroIn || !A || !A.animate) return false;
    if (st) destroy();

    var hero = heroIn.closest(".hero") || heroIn;
    var bar = document.getElementById("heroBar");
    var G = global.WORDGRAPH;
    var docs = (G && G.docs) || [];

    /* ---- şerit artık BELGE değil RAF gösteriyor ----
       Kütüphane 300 kitaba çıkınca belge başına bir bölme 300 bölme
       demekti: her biri bir pikselden ince, ne okunur ne tıklanır.
       Şerit raflara (türlere) indirildi; bir rafın üstüne gelince
       küredeki o rafın bütün kitapları öne çıkıyor. */
    function raflariCikar() {
      var man = global.MANIFEST || [];
      var grupOf = {};
      man.forEach(function (m) { grupOf[m.id] = m.group || "Metinler"; });
      var sira = [], harita = {};
      docs.forEach(function (d, i) {
        var gr = grupOf[d.id] || "Metinler";
        if (!harita[gr]) { harita[gr] = { ad: gr, idx: [] }; sira.push(harita[gr]); }
        harita[gr].idx.push(i);
      });
      return sira;
    }
    var raflar = raflariCikar();

    var reduced = opts.reduced != null ? !!opts.reduced
      : (global.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)").matches : false);
    /* Dokunmatikte "imleci izleyen ışık" diye bir şey yok; parmak kalkınca
       ışık son dokunduğu yerde donup kalıyordu. */
    var touch = global.matchMedia ? matchMedia("(hover: none)").matches : false;

    var inst = null;
    var offs = [];                     // sökülecek dinleyiciler
    var segs = [], label = null;
    var split = null, tl = null, sheen = null, mo = null, io = null;
    var counters = [];                 // {el, final} — güvenlik ağı için
    var safeT = 0, started = false, finished = false;

    /* ============================================================
       1 — belge renk şeridi
       ============================================================ */
    function buildBar() {
      if (!bar || !raflar.length) return;
      var n = raflar.length, h = "";
      /* role="toolbar" + gezici tabindex: her raf ayrı sekme durağı
         olsaydı hero'da klavye onlarca kez takılırdı. Şerit tek durak,
         içinde ok tuşlarıyla gezilir — ARIA'nın standart kalıbı. */
      h += '<div class="hb-track" role="toolbar" aria-orientation="horizontal"' +
           ' aria-label="Kütüphane rafları, renk sırasıyla">';
      raflar.forEach(function (r, i) {
        h += '<button type="button" class="hb-seg" data-i="' + i + '"' +
             ' data-id="' + esc(r.ad) + '" tabindex="' + (i ? "-1" : "0") + '"' +
             ' style="--hue:' + bandHue(i, n) +
             ';--t:' + (n > 1 ? (i / (n - 1)).toFixed(4) : "0") + '"' +
             ' aria-label="' + esc(r.ad) + ", " + r.idx.length + ' metin"></button>';
      });
      /* Etiket <div>: <p>'nin tarayıcı payı şeridi aşağı itiyor. */
      h += '</div><div class="hb-label" aria-live="polite"></div>';
      bar.innerHTML = h;
      bar.hidden = false;
      segs = slice(bar.querySelectorAll(".hb-seg"));
      label = bar.querySelector(".hb-label");
    }

    /** Küreye odak ver + etiketi yaz. Küre WebGL'siz makinede hiç
        kurulmuyor, Ajan 2 focusDoc'u eklemeden önce de burası çalışmalı:
        her çağrı iki kat korumalı. */
    function focusDoc(i) {
      var W = global.WordGlobe;
      var raf = i == null ? null : raflar[i];
      // Raf birden çok belge tutuyor; küre bir dizi de kabul ediyor.
      if (W && W.focusDoc) {
        try { W.focusDoc(raf ? raf.idx : null); } catch (e) {}
      }
      if (!label) return;
      label.textContent = raf
        ? shortTitle(raf.ad, 40) + " · " + raf.idx.length + " metin" : "";
    }

    /** Rafa tıklayınca kütüphanede o rafın destesini aç. */
    function gotoDoc(i) {
      var raf = raflar[i];
      if (!raf) return;
      var d = document.querySelector('[data-deck="' + raf.ad.replace(/"/g, '\\"') + '"]');
      if (d) { d.click(); d.scrollIntoView({ behavior: reduced ? "auto" : "smooth",
                                             block: "center" }); return; }
      var lib = document.querySelector(".lib-head");
      if (lib) lib.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }

    function bindBar() {
      if (!segs.length) return;
      var track = bar.querySelector(".hb-track");

      /* Üstüne gelme: motion.dev'in hover'ı dokunmatikte tetiklenmiyor —
         parmakla kaydırırken kürenin odağının atlamasını istemiyoruz. */
      if (M && M.hover) {
        segs.forEach(function (s, i) {
          offs.push(M.hover(s, function () {
            focusDoc(i);
            return function () { focusDoc(null); };
          }));
        });
      } else {
        segs.forEach(function (s, i) {
          var on = function () { focusDoc(i); }, off = function () { focusDoc(null); };
          s.addEventListener("pointerenter", on);
          s.addEventListener("pointerleave", off);
          offs.push(function () {
            s.removeEventListener("pointerenter", on);
            s.removeEventListener("pointerleave", off);
          });
        });
      }

      /* Klavye odağı da aynı şeyi yapsın: şerit yalnız fareyle çalışmaz. */
      function onIn(e) {
        var b = e.target.closest && e.target.closest(".hb-seg");
        if (b) focusDoc(+b.dataset.i);
      }
      function onOut(e) {
        if (!e.relatedTarget || !track.contains(e.relatedTarget)) focusDoc(null);
      }
      track.addEventListener("focusin", onIn);
      track.addEventListener("focusout", onOut);
      offs.push(function () {
        track.removeEventListener("focusin", onIn);
        track.removeEventListener("focusout", onOut);
      });

      /* Basma geri bildirimi: hero.css bölmenin transform ve filter'ını
         :hover'da kendisi kullanıyor, o yüzden JS yalnızca opaklığa
         dokunuyor — iki taraf aynı özelliği çekiştirmesin. */
      if (M && M.press && !reduced) {
        offs.push(M.press(track, function (el, e) {
          var b = e.target.closest && e.target.closest(".hb-seg");
          if (!b) return;
          A.animate(b, { opacity: 0.72, duration: 90, ease: "linear" });
          return function () {
            A.animate(b, { opacity: 1, duration: 180, ease: EASE,
                           onComplete: function () { b.style.opacity = ""; } });
          };
        }));
      }

      function onClick(e) {
        var b = e.target.closest && e.target.closest(".hb-seg");
        if (!b) return;
        gotoDoc(+b.dataset.i);
      }
      function onKey(e) {
        var b = e.target.closest && e.target.closest(".hb-seg");
        if (!b) return;
        var n = segs.length, i = +b.dataset.i, to = -1;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") to = (i + 1) % n;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") to = (i - 1 + n) % n;
        else if (e.key === "Home") to = 0;
        else if (e.key === "End") to = n - 1;
        else return;
        e.preventDefault();
        rove(to);
        segs[to].focus();
      }
      track.addEventListener("click", onClick);
      track.addEventListener("keydown", onKey);
      offs.push(function () {
        track.removeEventListener("click", onClick);
        track.removeEventListener("keydown", onKey);
      });
    }

    function rove(i) {
      segs.forEach(function (s, k) { s.tabIndex = k === i ? 0 : -1; });
    }

    /** "Okumaya başla": kütüphane bölümüne yumuşak kaydırır.
        Bağlantı değil düğme — <a href="#cards"> hash'i değiştirip
        yönlendiriciyi tetikliyordu. */
    function bindStart() {
      var b = document.getElementById("heroStartBtn");
      if (!b) return;
      function go() {
        var lib = document.querySelector(".lib-head") ||
                  document.getElementById("cards");
        if (lib) lib.scrollIntoView({ behavior: reduced ? "auto" : "smooth",
                                      block: "start" });
      }
      b.addEventListener("click", go);
      offs.push(function () { b.removeEventListener("click", go); });
    }


    /* Vurgu için outline seçildi: .card'ın kendi geçişleri border-color,
       transform ve box-shadow üzerinde — onlara dokunmak :hover ile
       çakışıyor. outline'ın geçişi yok, her kare tam yazdığımız değer. */
    function flashCard(card, hue) {
      card.style.outlineStyle = "solid";
      card.style.outlineColor = "hsl(" + hue + " 55% 48%)";
      card.style.outlineOffset = "0.1875rem";
      var clear = function () {
        card.style.outlineStyle = "";
        card.style.outlineColor = "";
        card.style.outlineOffset = "";
        card.style.outlineWidth = "";
      };
      if (reduced) {
        card.style.outlineWidth = "0.125rem";
        var t = setTimeout(clear, 1200);
        offs.push(function () { clearTimeout(t); clear(); });
        return;
      }
      var an = A.animate(card, {
        outlineWidth: [
          { to: "0.125rem", duration: 220, ease: EASE },
          { to: "0.125rem", duration: 820 },
          { to: "0rem", duration: 300, ease: "linear" }
        ],
        onComplete: clear
      });
      offs.push(function () { try { an.pause(); } catch (e) {} clear(); });
    }

    /* Sürekli akan parlama: tek bir ışık 6.25 sn'de şeridi soldan sağa
       geçsin diye bölmeler arası gecikme dönemden hesaplanıyor. Son
       bölme tam dönem sonunda bitiyor, ilki hemen başlıyor: dikişsiz
       döngü. --sheen'in 0 ve 1 uçlarında ışık zaten şeridin dışında, bu
       yüzden döngü başında sıçrama görünmüyor. */
    function startSheen() {
      if (reduced || !segs.length) return;
      var step = segs.length > 1
        ? (SHEEN_PERIOD - SHEEN_SWEEP) / (segs.length - 1) : 0;
      sheen = A.animate(segs, {
        "--sheen": [0, 1],
        duration: SHEEN_SWEEP,
        delay: A.stagger(step),
        ease: "linear",
        loop: true
      });
      pauseCheck();
    }

    /* Görünmezken ve sekme arkadayken dönmesin (globe.js:546-555 ile aynı
       mantık); ekranda değilken pil yakmak anlamsız. */
    var visOK = true, inViewOK = true;
    function pauseCheck() {
      if (!sheen) return;
      try {
        if (visOK && inViewOK && !document.hidden) sheen.play();
        else sheen.pause();
      } catch (e) {}
    }
    function onVis() { visOK = !document.hidden; pauseCheck(); }

    /* ============================================================
       2 — sol sütunun giriş sıralaması
       ============================================================ */
    var kicker = heroIn.querySelector(".hero-kicker");
    var h1 = heroIn.querySelector(".hero-h1");
    var sub = heroIn.querySelector(".hero-sub");
    var stats = heroIn.querySelector(".hero-stats");
    var cta = heroIn.querySelector(".hero-cta");
    var btn = document.getElementById("continueBtn");

    /** Başlığı sözcüklere böl — ama yalnızca yazı tipi yerine oturduysa.
        Yedek yazı tipiyle ölçmek satır bölümlerini yanlış hesaplıyor.
        Kütüphaneye her dönüşte fontlar hazır olduğundan bu, ilk açılış
        dışında hep çalışır; ilk açılışta başlık tek parça yükselir. */
    function splitH1() {
      if (reduced || !h1 || !A.text || !A.text.split) return null;
      if (!document.fonts || document.fonts.status !== "loaded") return null;
      var s;
      try { s = A.text.split(h1, { words: { wrap: "clip" }, chars: false }); }
      catch (e) { return null; }
      if (!s || !s.words || !s.words.length) return null;
      /* Bölünen parçalar ekran okuyucuya tek tek okunmasın: erişilebilir ad
         h1'in kendisinde, içerideki her şey gizli. */
      h1.setAttribute("aria-label", h1.textContent.trim());
      slice(h1.children).forEach(function (c) { c.setAttribute("aria-hidden", "true"); });
      return s;
    }

    /** Başlangıç kaymasını yaz. mount() ile aynı görevde çalışır: araya
        boyama girmediği için "önce görünür, sonra kaybolur" titremesi
        olmaz. Buradan sonraki tek çıkış yolu finishAll(). */
    function setFrom() {
      var rise = [kicker, sub, stats, cta].filter(Boolean);
      if (split) rise = rise.concat(split.words); else if (h1) rise.push(h1);
      A.utils.set(rise, { opacity: 0, translateY: RISE });
      if (segs.length) {
        A.utils.set(segs, { opacity: 0, scaleX: 0.34, transformOrigin: "left center" });
      }
    }

    /** Her şeyi son, görünür durumuna getirir ve satır içi izleri siler.
        Üç yerden çağrılır: zaman çizelgesi bitince, güvenlik sayacı
        dolunca, destroy()'da. Tekrar çağrılması zararsız. */
    function finishAll() {
      finished = true;
      var els = [kicker, h1, sub, stats, cta, btn].filter(Boolean);
      if (split) els = els.concat(split.words);
      els = els.concat(segs);
      try { A.utils.remove(els); } catch (e) {}
      els.forEach(bare);
      counters.forEach(function (c) { c.el.textContent = c.final; });
    }

    function entrance() {
      if (started) return;
      started = true;
      if (reduced) { finishAll(); return; }

      tl = A.createTimeline({
        defaults: { duration: 300, ease: EASE },
        onComplete: finishAll
      });
      if (kicker) tl.add(kicker, { opacity: [0, 1], translateY: [RISE, 0], duration: 260 }, 0);
      if (split) {
        tl.add(split.words, { opacity: [0, 1], translateY: [RISE + 8, 0],
                              duration: 340, delay: A.stagger(28) }, 90);
      } else if (h1) {
        tl.add(h1, { opacity: [0, 1], translateY: [RISE, 0], duration: 340 }, 90);
      }
      if (sub) tl.add(sub, { opacity: [0, 1], translateY: [RISE, 0] }, 200);
      if (stats) {
        tl.add(stats, { opacity: [0, 1], translateY: [RISE, 0], onBegin: countUp }, 270);
      } else {
        countUp();
      }
      if (cta) tl.add(cta, { opacity: [0, 1], translateY: [RISE, 0] }, 340);
      /* Bölmeler soldan doğrulur: rafa kitap dizilir gibi. */
      if (segs.length) {
        tl.add(segs, { opacity: [0, 1], scaleX: [0.34, 1],
                       duration: 380, delay: A.stagger(26) }, 400);
      }

      /* Güvenlik ağı: çizelge herhangi bir sebeple bitmezse hero yine
         görünür olsun. Sona değil başa animasyon kuralının bekçisi. */
      safeT = setTimeout(function () { if (!finished) finishAll(); }, 2600);
    }

    /* ============================================================
       3 — #heroStats sayaçları
       ============================================================ */
    function countUp() {
      var bs = slice(heroIn.querySelectorAll(".hero-stats b"));
      bs.forEach(function (b, k) {
        var final = b.textContent;
        var target = parseInt(final.replace(/\D/g, ""), 10);
        if (!isFinite(target) || target <= 0) return;
        counters.push({ el: b, final: final });
        /* Genişlik baştan kilitlenir: rakam büyürken yanındaki etiket
           kaymasın. Öğe zaten tabular-nums, ch tam oturuyor. */
        b.style.minWidth = final.length + "ch";
        if (reduced) return;
        var s = { v: 0 };
        b.textContent = "0";
        A.animate(s, {
          v: target, duration: 620, delay: k * 60, ease: EASE,
          onUpdate: function () {
            b.textContent = Math.round(s.v).toLocaleString("tr");
          },
          /* Son değer son kareye bırakılmaz: metin birebir eski hâline
             döner (test-app.js #heroStats.textContent'e bakıyor). */
          onComplete: function () { b.textContent = final; }
        });
      });
    }

    /* ============================================================
       4 — imleci izleyen ışık (.hero-in üzerinde --mx / --my)
       ============================================================ */
    var px = 0, py = 0, curX = 0.5, curY = 0.5, tgX = 0.5, tgY = 0.5;
    var following = false, rafId = 0, queued = false;

    function publish() {
      heroIn.style.setProperty("--mx", (curX * 100).toFixed(2) + "%");
      heroIn.style.setProperty("--my", (curY * 100).toFixed(2) + "%");
      var W = global.WordGlobe;
      if (W && W.pointer) {
        /* Küreye -1..1 aralığı gider: metnin arkasındaki ışıkla kürenin
           gölgesi aynı kaynaktan beslenmeli, yoksa ikisi ayrı ayrı
           kıpırdayan iki numara gibi duruyor. */
        try { W.pointer(curX * 2 - 1, curY * 2 - 1); } catch (e) {}
      }
    }

    function tick() {
      queued = false;
      if (!inst || inst.dead) return;
      var r = hero.getBoundingClientRect();     // ölçüm karede, pointermove'da değil
      if (r.width && r.height) {
        tgX = clamp((px - r.left) / r.width, 0, 1);
        tgY = clamp((py - r.top) / r.height, 0, 1);
      }
      if (!following) { tgX = 0.5; tgY = 0.5; }
      var k = 0.12;                              // yay sertliği: ağır ve sakin
      curX += (tgX - curX) * k;
      curY += (tgY - curY) * k;
      publish();
      if (Math.abs(tgX - curX) > 0.0015 || Math.abs(tgY - curY) > 0.0015) schedule();
      else if (!following) { curX = tgX; curY = tgY; publish(); resetGlobe(); }
    }
    function schedule() {
      if (queued || !inst || inst.dead) return;
      queued = true;
      rafId = tickNext(tick);
    }
    function resetGlobe() {
      var W = global.WordGlobe;
      if (W && W.pointer) { try { W.pointer(null); } catch (e) {} }
    }

    function bindPointer() {
      /* Işık her hâlükârda ortada başlasın: hero.css var(--mx)'i yedeksiz
         kullanırsa bile geçerli bir değer bulsun. */
      heroIn.style.setProperty("--mx", "50%");
      heroIn.style.setProperty("--my", "50%");
      if (reduced || touch) return;
      function onMove(e) { px = e.clientX; py = e.clientY; following = true; schedule(); }
      function onLeave() { following = false; schedule(); }
      hero.addEventListener("pointermove", onMove, { passive: true });
      hero.addEventListener("pointerleave", onLeave, { passive: true });
      offs.push(function () {
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
      });
    }

    /* ============================================================
       5 — "kaldığım yerden devam" düğmesi
       app.js onu depo çözüldükten SONRA gösteriyor; o an giriş çizelgesi
       çoktan bitmiş oluyor. Düğme birden belirmesin diye [hidden]
       niteliğini gözlüyoruz — app.js'e ek bir çağrı borcu doğmuyor.
       ============================================================ */
    function watchContinue() {
      if (!btn || !global.MutationObserver) return;
      mo = new MutationObserver(function () {
        if (btn.hidden) return;
        mo.disconnect(); mo = null;
        if (reduced) return;
        /* Aynı görevde yazılıyor: arada boyama yok, sıçrama da yok. */
        btn.style.opacity = "0";
        A.animate(btn, {
          opacity: [0, 1], translateY: [8, 0], duration: 380, ease: EASE,
          onComplete: function () { bare(btn); }
        });
      });
      mo.observe(btn, { attributes: true, attributeFilter: ["hidden"] });
    }

    /* ============================================================
       kurulum
       ============================================================ */
    buildBar();
    bindBar();
    bindStart();
    bindPointer();
    watchContinue();
    split = splitH1();
    setFrom();

    if (global.IntersectionObserver) {
      io = new IntersectionObserver(function (es) {
        inViewOK = es[0].isIntersecting;
        pauseCheck();
      }, { threshold: 0 });
      io.observe(hero);
    }
    document.addEventListener("visibilitychange", onVis);

    /* Tetik: görünür olunca. Zaten ekrandaysa inView hemen ateşler. */
    var stopView = null;
    if (M && M.inView) {
      stopView = M.inView(heroIn, function () {
        if (stopView) { stopView(); stopView = null; }
        entrance();
      }, { amount: 0.1 });
    } else {
      entrance();
    }
    /* inView hiç ateşlemezse (gözlemci yoksa, hero ekran dışındaysa)
       metin görünmez kalmasın. */
    var kickT = setTimeout(function () { if (!started) entrance(); }, 700);

    startSheen();

    /* ---------------------------- durum ---------------------------- */
    inst = {
      dead: false,
      info: function () {
        return {
          segs: segs.length, docs: docs.length, reduced: reduced, touch: touch,
          split: !!(split && split.words && split.words.length),
          started: started, finished: finished, sheen: !!sheen,
          counters: counters.length
        };
      },
      destroy: function () {
        inst.dead = true;
        clearTimeout(safeT);
        clearTimeout(kickT);
        if (stopView) { try { stopView(); } catch (e) {} stopView = null; }
        if (tl) { try { tl.pause(); } catch (e) {} tl = null; }
        if (sheen) {
          try { sheen.pause(); } catch (e) {}
          try { A.utils.remove(segs); } catch (e) {}
          segs.forEach(function (s) { s.style.removeProperty("--sheen"); });
          sheen = null;
        }
        if (mo) { mo.disconnect(); mo = null; }
        if (io) { io.disconnect(); io = null; }
        document.removeEventListener("visibilitychange", onVis);
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
        queued = false;
        following = false;
        resetGlobe();
        focusDoc(null);
        offs.forEach(function (f) { try { f(); } catch (e) {} });
        offs = [];
        finishAll();
        /* Bölünen başlık geri birleştirilir: anime'nin ResizeObserver'ı
           da onunla sökülüyor (üç tur mount/destroy sızıntı bırakmasın). */
        if (split) {
          try { split.revert(); } catch (e) {}
          if (h1) h1.removeAttribute("aria-label");
          split = null;
        }
        heroIn.style.removeProperty("--mx");
        heroIn.style.removeProperty("--my");
        segs = []; counters = [];
      }
    };
    st = inst;
    return true;
  }

  /* ------------------------ dışa açılan API ------------------------ */
  function destroy() {
    if (!st) return;
    try { st.destroy(); } catch (e) {}
    st = null;
  }
  /** Tanılama (sınama betikleri kullanıyor); hero yoksa null. */
  function info() { return st && !st.dead ? st.info() : null; }

  global.HeroMotion = { mount: mount, destroy: destroy, info: info };
})(window);
