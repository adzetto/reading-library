/* ------------------------------------------------------------------
   stats.js — istatistik + not defteri görünümü

   API:  StatsView.render(containerEl)   → Promise<void>

   Bölümler
     a) özet kartları        toplam süre / metin / sözcük / arama / seri
     b) ısı haritası         son 12 hafta (84 gün), günlük okuma dakikası
     c) en çok bakılan 25 sözcük, Türkçesi ve çubuk göstergesiyle
     d) belge ilerlemesi     yüzde, süre, bitti mi, sınav en iyi skoru
     e) sözcük defteri       SRS kutusu, tekrar tarihi, "Tekrar et" modu
     f) notlar               belgeye göre gruplu alıntı + not
     g) veri yönetimi        yedek indir / yükle / tümünü sil

   Tüm veri ARCHITECTURE.md §4'teki `window.Store` üzerinden okunur;
   bu dosya localStorage'a ne yazar ne de okur.

   Not: §4'te günlük kırılım veren bir metot yok. Isı haritası önce
   `Store.dailyMinutes()` / `Store.sessions()` varsa onu kullanır, yoksa
   `Store.exportAll()` çıktısındaki oturum kayıtlarından türetir. Böylece
   store.js'in fazladan bir şey sunma zorunluluğu yoktur.
------------------------------------------------------------------ */
(function (global) {
  "use strict";

  /* ============================ sabitler ============================ */

  var DAY = 86400000;
  var AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
               "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  var AY_KISA = ["Oca", "Şub", "Mar", "Nis", "May", "Haz",
                 "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
  var GUN_KISA = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  var WEEKS = 12;                 /* ısı haritası: 12 hafta × 7 gün = 84 hücre */
  var SRS_MAX = 5;

  /* ============================ yardımcılar ============================ */

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  function frag() { return document.createDocumentFragment(); }

  function dayStart(t) {
    var d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime();
  }

  function ymd(t) {
    var d = new Date(t), m = d.getMonth() + 1, g = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (g < 10 ? "0" + g : g);
  }

  /** "2026-03-04" → 4 Mart 2026 */
  function trDate(key) {
    var p = String(key).split("-");
    if (p.length !== 3) return String(key);
    return parseInt(p[2], 10) + " " + AYLAR[parseInt(p[1], 10) - 1] + " " + p[0];
  }

  /** 134 → "2 sa 14 dk" */
  function dk(mins) {
    mins = Math.max(0, Math.round(mins || 0));
    if (mins < 60) return mins + " dk";
    var h = Math.floor(mins / 60), m = mins % 60;
    return m ? h + " sa " + m + " dk" : h + " sa";
  }

  function plural(n, tekil) { return n + " " + tekil; }

  function dueText(ts) {
    if (!ts) return "bugün";
    var d = Math.round((dayStart(ts) - dayStart(Date.now())) / DAY);
    if (d < 0) return Math.abs(d) + " gün gecikti";
    if (d === 0) return "bugün";
    if (d === 1) return "yarın";
    return d + " gün sonra";
  }

  function isDue(v) { return !v.dueAt || v.dueAt <= Date.now(); }

  /* --------------------- Store'a güvenli erişim --------------------- */

  function S() { return global.Store; }

  /**
   * Store metodunu çağırır; metot yoksa veya hata verirse `fallback` döner.
   * Böylece store.js'in bir bölümü eksik olsa da görünüm çökmez.
   */
  function ask(name, args, fallback) {
    var st = S();
    if (!st || typeof st[name] !== "function") return Promise.resolve(fallback);
    try {
      return Promise.resolve(st[name].apply(st, args || []))
        .then(function (v) { return (v == null) ? fallback : v; })
        .catch(function (e) {
          console.warn("[stats] Store." + name + " hatası:", e);
          return fallback;
        });
    } catch (e) {
      console.warn("[stats] Store." + name + " hatası:", e);
      return Promise.resolve(fallback);
    }
  }

  /* --------------------- belge adı çözümleme --------------------- */

  function manifestEntry(id) {
    var M = global.MANIFEST || [];
    for (var i = 0; i < M.length; i++) if (M[i].id === id) return M[i];
    return null;
  }

  function docTitle(id) {
    var D = global.DOCS && global.DOCS[id];
    if (D && D.title) return D.title.tr || D.title.en || id;
    var m = manifestEntry(id);
    if (m) {
      if (m.title) return (typeof m.title === "string") ? m.title : (m.title.tr || m.title.en || id);
      return m.id;
    }
    return id || "Bilinmeyen belge";
  }

  /**
   * Belge tonu. Kapaklardaki ham `cover.hue` değerleri 0-320 arasına
   * saçılmış; on bir belge yan yana dizilince palet dağılıyor ve teal→ember
   * dizgesiyle çakışıyordu. Onun yerine belgeler sıraya göre teal → ember
   * bandına yayılır — globe.js'teki bandHue() ile aynı uçlar, aynı yaklaşım.
   * Doygunluk ve açıklık stats.css'te tek formülle sabitlenir.
   */
  var HUE0 = 172, HUE1 = 26;                    // teal → ember
  function bandHue(i, total) {
    var n = Math.max(1, (total || 1) - 1);
    var t = Math.max(0, Math.min(1, (i || 0) / n));
    return Math.round(HUE0 + (HUE1 - HUE0) * t);
  }

  /** Sözlükten Türkçe karşılık — yalnızca yerel, ağa çıkılmaz. */
  function peekTr(word) {
    try {
      if (global.Lookup && typeof global.Lookup.peek === "function") {
        var h = global.Lookup.peek(word);
        if (h && h.tr) return h;
      }
    } catch (e) { /* yoksay */ }
    return null;
  }

  /* ================= ısı haritası için günlük dakika ================= */

  function secondsOf(s) {
    if (typeof s.seconds === "number") return s.seconds;
    if (typeof s.sec === "number") return s.sec;
    if (typeof s.ms === "number") return s.ms / 1000;
    if (typeof s.minutes === "number") return s.minutes * 60;
    if (s.startedAt && s.endedAt) return (s.endedAt - s.startedAt) / 1000;
    return 0;
  }

  function timeOf(s) {
    return s.startedAt || s.beganAt || s.at || s.date || s.endedAt || 0;
  }

  /** → { "2026-03-04": 23, … }  (dakika) */
  function dailyMinutes(days) {
    var st = S();
    var out = {};

    function fromSessions(list) {
      (list || []).forEach(function (s) {
        if (!s) return;
        var t = timeOf(s);
        if (!t) return;
        var key = (typeof t === "string" && /^\d{4}-\d{2}-\d{2}/.test(t))
                  ? t.slice(0, 10) : ymd(t);
        out[key] = (out[key] || 0) + secondsOf(s) / 60;
      });
      return out;
    }

    function normalizeDaily(v) {
      if (Array.isArray(v)) {
        v.forEach(function (d) {
          if (!d) return;
          var key = d.date || d.day || d.d;
          if (!key) return;
          out[String(key).slice(0, 10)] = d.minutes != null ? d.minutes
                                        : (d.seconds != null ? d.seconds / 60 : 0);
        });
      } else if (v && typeof v === "object") {
        for (var k in v) out[k] = v[k];
      }
      return out;
    }

    if (st && typeof st.dailyMinutes === "function") {
      return ask("dailyMinutes", [days], []).then(normalizeDaily);
    }
    if (st && typeof st.sessions === "function") {
      return ask("sessions", [], []).then(fromSessions);
    }
    /* son çare: yedek çıktısındaki oturum kayıtlarından türet */
    return ask("exportAll", [], null).then(function (raw) {
      if (!raw) return out;
      var obj;
      try { obj = (typeof raw === "string") ? JSON.parse(raw) : raw; }
      catch (e) { return out; }
      var d = (obj && obj.data) ? obj.data : obj;
      return fromSessions((d && (d.sessions || d.readingSessions)) || []);
    });
  }

  /* ====================== bölüm: a) özet kartları ====================== */

  var REDUCED = global.matchMedia
    ? matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  /**
   * Ögeyi ekrana girdiğinde bir kez tetikler. Hareket azaltma açıksa ya da
   * IntersectionObserver yoksa anında çağrılır — o durumda çizim işlevi son
   * değeri doğrudan yazar, hiçbir şey canlanmaz.
   */
  function onVisible(node, fn) {
    if (REDUCED || typeof global.IntersectionObserver !== "function") { fn(); return; }
    var fired = false, io;
    function go() {
      if (fired) return;
      fired = true;
      try { io.disconnect(); } catch (e) { /* yoksay */ }
      fn();
    }
    io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) if (entries[i].isIntersecting) return go();
    }, { rootMargin: "0px 0px -6% 0px" });
    io.observe(node);
  }

  /** Lucide ikonu (assets/icons.js). Modül yoksa boş dizge döner. */
  function ico(name, size) {
    return (typeof global.icon === "function") ? global.icon(name, size || 14) : "";
  }

  /**
   * Metindeki her sayı öbeğini 0'dan hedefe saydırır; harfler yerinde kalır
   * ("2 sa 14 dk" → "0 sa 0 dk" … → "2 sa 14 dk"). Bitişte hedef metin
   * birebir yazılır, yuvarlama artığı kalmaz.
   */
  function countUp(node, text, order) {
    var parts = String(text).split(/(\d+)/);      /* tek indisler = sayılar */
    var nums = [], i;
    for (i = 1; i < parts.length; i += 2) nums.push(parseInt(parts[i], 10));
    if (!nums.length || REDUCED) { node.textContent = text; return; }

    function draw(k) {
      var e = 1 - Math.pow(1 - k, 3);             /* easeOutCubic */
      var out = "", j = 0;
      for (var q = 0; q < parts.length; q++) {
        out += (q % 2) ? String(Math.round(nums[j++] * e)) : parts[q];
      }
      node.textContent = out;
    }
    draw(0);

    onVisible(node, function () {
      var t0 = 0, dur = 700, delay = Math.min(order || 0, 6) * 55;
      setTimeout(function () {
        requestAnimationFrame(function step(now) {
          if (!t0) t0 = now;
          var k = Math.min(1, (now - t0) / dur);
          if (k < 1) { draw(k); requestAnimationFrame(step); }
          else node.textContent = text;
        });
      }, delay);
    });
  }

  var cardOrder = 0;
  function card(label, value, sub, iconName, tone) {
    var c = el("div", "sv-card" + (tone ? " is-" + tone : ""));
    var l = el("div", "sv-card-l");
    if (iconName) l.insertAdjacentHTML("afterbegin", ico(iconName, 13));
    l.appendChild(el("span", null, label));
    c.appendChild(l);
    var v = el("div", "sv-card-v");
    c.appendChild(v);
    c.appendChild(el("div", "sv-card-s", sub || ""));
    c.style.setProperty("--i", String(cardOrder));
    countUp(v, value, cardOrder);
    cardOrder++;
    return c;
  }

  function buildSummary(ctx) {
    cardOrder = 0;
    var t = ctx.totals, prog = ctx.progress, lk = ctx.lookupTotal;
    var read = prog.length;
    var done = prog.filter(function (p) { return p.finishedAt || (p.pct || 0) >= 99; }).length;

    var g = el("div", "sv-cards");
    g.appendChild(card("Toplam okuma süresi", dk(t.minutes),
      t.days ? plural(t.days, "gün okudun") : "henüz okuma yok", "clock"));
    g.appendChild(card("Okuduğun metin", String(read),
      done ? plural(done, "tanesi bitti") : "henüz bitirilen yok", "layers"));
    g.appendChild(card("Farklı sözcük", String(lk.distinct || 0),
      "anlamına baktığın ayrı sözcük", "eye"));
    g.appendChild(card("Toplam arama", String(lk.total || 0),
      "sözcüğe bakma sayısı", "target"));
    g.appendChild(card("Güncel seri", plural(t.streak || 0, "gün"),
      (t.streak > 0) ? "kesintisiz okuma" : "bugün okursan seri başlar",
      "flame", (t.streak > 0) ? "warm" : ""));

    if (!read && !lk.total && !t.minutes) {
      var f = frag();
      f.appendChild(g);
      f.appendChild(empty("Henüz okuma yok. Kütüphaneden bir metin seçin."));
      return f;
    }
    return g;
  }

  /* ====================== bölüm: b) ısı haritası ====================== */

  function level(min) {
    if (!min) return 0;
    if (min < 10) return 1;
    if (min < 25) return 2;
    if (min < 45) return 3;
    return 4;
  }

  function buildHeat(ctx) {
    var daily = ctx.daily;

    /* Pazartesi başlangıçlı hafta hizası: bu haftanın pazartesisi… */
    var today = dayStart(Date.now());
    var dow = (new Date(today).getDay() + 6) % 7;        /* 0=Pzt … 6=Paz */
    var thisMonday = today - dow * DAY;
    var start = thisMonday - (WEEKS - 1) * 7 * DAY;      /* tam 84 gün */

    var wrap = el("div", "hm-wrap");
    var scroll = el("div", "hm-scroll");
    var grid = el("div", "hm-grid");

    /* ---- ay etiketleri ---- */
    var months = el("div", "hm-months");
    months.appendChild(el("div", "hm-corner"));
    var lastMonth = -1;
    for (var w = 0; w < WEEKS; w++) {
      var d0 = new Date(start + w * 7 * DAY);
      var lab = "";
      if (d0.getMonth() !== lastMonth) { lab = AY_KISA[d0.getMonth()]; lastMonth = d0.getMonth(); }
      months.appendChild(el("div", "hm-month", lab));
    }
    grid.appendChild(months);

    /* ---- gün satırları ---- */
    var total84 = 0, best = { min: -1, key: "" };
    for (var r = 0; r < 7; r++) {
      var row = el("div", "hm-row");
      var lbl = el("div", "hm-dow", (r % 2 === 0) ? GUN_KISA[r] : "");
      lbl.setAttribute("aria-hidden", "true");
      row.appendChild(lbl);
      for (var c = 0; c < WEEKS; c++) {
        var t = start + (c * 7 + r) * DAY;
        var key = ymd(t);
        var min = Math.round(daily[key] || 0);
        var future = t > today;
        var cell = el("div", "hm-day l" + (future ? 0 : level(min)) + (future ? " is-future" : ""));
        cell.setAttribute("data-date", key);
        cell.setAttribute("data-min", String(min));
        cell.setAttribute("role", "img");
        var txt = trDate(key) + ": " + (future ? "henüz gelmedi" : dk(min));
        cell.setAttribute("title", txt);
        cell.setAttribute("aria-label", txt);
        if (!future) { total84 += min; if (min > best.min) best = { min: min, key: key }; }
        row.appendChild(cell);
      }
      grid.appendChild(row);
    }

    scroll.appendChild(grid);
    wrap.appendChild(scroll);

    /* ---- imleç baloncuğu ---- */
    var tip = el("div", "hm-tip");
    tip.setAttribute("hidden", "");
    wrap.appendChild(tip);

    function show(cellEl) {
      var d = cellEl.getAttribute("data-date");
      var m = parseInt(cellEl.getAttribute("data-min"), 10) || 0;
      tip.textContent = trDate(d) + " · " +
        (cellEl.classList.contains("is-future") ? "henüz gelmedi" : dk(m));
      tip.removeAttribute("hidden");
      var wr = wrap.getBoundingClientRect(), cr = cellEl.getBoundingClientRect();
      var x = cr.left - wr.left + cr.width / 2;
      tip.style.left = "0px";                     /* ölçmeden önce sıfırla */
      var tw = tip.offsetWidth;
      x = Math.max(2, Math.min(wr.width - tw - 2, x - tw / 2));
      tip.style.left = x + "px";
      tip.style.top = (cr.top - wr.top - tip.offsetHeight - 6) + "px";
    }
    function hide() { tip.setAttribute("hidden", ""); }

    wrap.addEventListener("mouseover", function (ev) {
      var c = ev.target.closest && ev.target.closest(".hm-day");
      if (c) show(c);
    });
    wrap.addEventListener("mouseleave", hide);
    scroll.addEventListener("scroll", hide);

    /* ---- alt şerit: efsane + özet ---- */
    var foot = el("div", "hm-foot");
    var sum = el("div", "hm-sum",
      "Son 12 haftada " + dk(total84) +
      (best.min > 0 ? " · en yoğun gün " + trDate(best.key) + " (" + dk(best.min) + ")" : ""));
    var leg = el("div", "hm-legend");
    leg.appendChild(el("span", "hm-legend-t", "az"));
    for (var i = 0; i < 5; i++) leg.appendChild(el("i", "hm-key l" + i));
    leg.appendChild(el("span", "hm-legend-t", "çok"));
    foot.appendChild(sum); foot.appendChild(leg);

    var f = frag();
    f.appendChild(wrap);
    f.appendChild(foot);
    if (total84 === 0) {
      f.appendChild(empty("Son 12 haftada kayıtlı okuma yok. Bir metin açtığında burası dolmaya başlar."));
    }
    return f;
  }

  /* ================== bölüm: c) en çok bakılan sözcükler ================== */

  function buildWords(ctx) {
    var top = ctx.top, vocab = ctx.vocabMap;
    if (!top.length) {
      return empty("Henüz sözcüğe bakmadın. Okurken bir sözcüğe dokununca anlamı burada birikir.");
    }
    /* --------------------------------------------------------------
       LaTeX/TikZ figür üslubu (örnek: latex figürlerindeki fig-bystudy):
         · ince ve keskin çubuk, dolgu yok, gölge yok
         · arkada 1 px'lik silik dikey ölçek ızgarası
         · altta çentikli x ekseni, monospace değerler
         · ortalamayı gösteren kesikli dikey çizgi
       Ölçek "yuvarlak" bir üst sınıra çıkarılır (1/2/5/10… adımları) ve
       çentik sayısı 6'yı geçmez; ızgara ile eksen birebir aynı yerdedir.  */
    var raw = top[0].count || 1;
    var NICE = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];
    var step = NICE[NICE.length - 1];
    for (var s = 0; s < NICE.length; s++) {
      if (Math.ceil(raw / NICE[s]) <= 5) { step = NICE[s]; break; }
    }
    var max = Math.max(step, Math.ceil(raw / step) * step);
    var ticks = [];
    for (var tv = 0; tv <= max; tv += step) ticks.push(tv);

    var sum = 0;
    top.forEach(function (w) { sum += (w.count || 0); });
    var mean = sum / top.length;

    var fig = el("div", "sv-fig");
    fig.style.setProperty("--gridn", String(ticks.length - 1));

    /* Izgara, satırların arkasında tek parça durur: satırlar arasında
       kesilmesin diye listeyle aynı kutuya mutlak konumlanır. */
    var body = el("div", "sv-fig-body");
    var bg = el("div", "sv-fig-grid");
    bg.setAttribute("aria-hidden", "true");
    var meanLine = el("div", "sv-fig-mean");
    meanLine.style.setProperty("--p", ((mean / max) * 100).toFixed(3) + "%");
    bg.appendChild(meanLine);
    body.appendChild(bg);

    var list = el("ol", "sv-words");

    top.forEach(function (w, idx) {
      var li = el("li", "sv-word" + (idx === 0 ? " is-top" : ""));
      var btn = el("button", "sv-word-b");
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");

      btn.appendChild(el("span", "sv-word-rank", String(idx + 1)));

      var lab = el("span", "sv-word-lab");
      lab.appendChild(el("span", "sv-word-en", w.word));
      var hit = vocab[w.word] || peekTr(w.word);
      lab.appendChild(el("span", "sv-word-tr" + ((hit && hit.tr) ? "" : " yok"),
        (hit && hit.tr) ? hit.tr : "sözlükte yok"));
      btn.appendChild(lab);

      /* Genişlik sayaçla tam orantılı; asgari genişlik uygulanmaz ki
         çubuklar birbiriyle karşılaştırılabilir kalsın. */
      var plot = el("span", "sv-word-plot");
      var bar = el("i", "sv-word-bar");
      bar.style.setProperty("--w", ((w.count / max) * 100).toFixed(3) + "%");
      bar.style.transitionDelay = Math.min(idx, 16) * 32 + "ms";
      plot.appendChild(bar);
      btn.appendChild(plot);

      btn.appendChild(el("span", "sv-word-n", String(w.count)));
      li.appendChild(btn);

      var det = el("div", "sv-worddet");
      det.setAttribute("hidden", "");
      li.appendChild(det);

      btn.addEventListener("click", function () {
        var open = !det.hasAttribute("hidden");
        if (open) { det.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false"); return; }
        det.textContent = "";
        det.appendChild(wordDetail(w, ctx));
        det.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      });

      list.appendChild(li);
    });

    body.appendChild(list);
    fig.appendChild(body);

    /* x ekseni: çentikler + değerler. Uçtaki etiketler hizadan taşmasın
       diye ilk sola, son sağa yaslanır (yatay kaydırma doğurmaz). */
    var axis = el("div", "sv-axis");
    axis.setAttribute("aria-hidden", "true");
    ticks.forEach(function (v, i) {
      var t = el("span", "sv-axis-t" +
        (i === 0 ? " is-first" : (i === ticks.length - 1 ? " is-last" : "")));
      t.style.setProperty("--p", ((v / max) * 100).toFixed(3) + "%");
      t.appendChild(el("i"));
      t.appendChild(el("b", null, String(v)));
      axis.appendChild(t);
    });
    fig.appendChild(axis);

    var cap = el("p", "sv-cap");
    cap.appendChild(el("b", null, "Şekil."));
    cap.appendChild(document.createTextNode(
      " Sözcük başına arama sayısı (n = " + top.length + ", en yüksek " + raw +
      "). Kesikli çizgi ortalamayı gösterir: " +
      (Math.round(mean * 10) / 10).toFixed(1).replace(".", ",") + "."));
    fig.appendChild(cap);

    onVisible(fig, function () { fig.classList.add("is-in"); });
    return fig;
  }

  /** Sözcük ayrıntısı: defterdeki kayıt varsa o, yoksa sözlük karşılığı. */
  function wordDetail(w, ctx) {
    var box = frag();
    var v = ctx.vocabMap[w.word];
    var d = v || peekTr(w.word);

    if (d) {
      var line = el("p", "sv-wd-tr");
      if (d.pos) line.appendChild(el("span", "sv-wd-pos", d.pos));
      line.appendChild(el("span", "", d.tr || "sözlükte yok"));
      box.appendChild(line);
      if (d.def) box.appendChild(el("p", "sv-wd-def", d.def));
    } else {
      box.appendChild(el("p", "sv-wd-tr", "Bu sözcük için kayıtlı bir karşılık yok."));
    }

    var meta = el("p", "sv-wd-meta");
    meta.appendChild(el("span", "", plural(w.count, "kez") + " baktın"));
    if (w.lastAt) meta.appendChild(el("span", "", "son: " + trDate(ymd(w.lastAt))));
    if (v) meta.appendChild(el("span", "", "defterde · kutu " + ((v.srsBox || 0) + 1) + "/" + (SRS_MAX + 1) +
      " · tekrar " + dueText(v.dueAt)));
    (w.docIds || []).forEach(function (id) { meta.appendChild(el("span", "", docTitle(id))); });
    box.appendChild(meta);

    var acts = el("div", "sv-wd-acts");
    if (!v) {
      var add = el("button", "sv-btn sv-mini", "Deftere ekle");
      add.type = "button";
      add.addEventListener("click", function () {
        add.disabled = true;
        ask("addVocab", [{ key: w.word, tr: (d && d.tr) || "", def: (d && d.def) || "",
                           pos: (d && d.pos) || "", docId: (w.docIds || [])[0] || null }], null)
          .then(function () { return refresh(ctx, ["words", "vocab"]); });
      });
      acts.appendChild(add);
    } else {
      var go = el("button", "sv-btn sv-mini", "Defterde göster");
      go.type = "button";
      go.addEventListener("click", function () {
        var row = document.querySelector('.sv-vocab [data-key="' + cssEsc(w.word) + '"]');
        if (row) {
          row.scrollIntoView({ behavior: "smooth", block: "center" });
          row.classList.add("is-flash");
          setTimeout(function () { row.classList.remove("is-flash"); }, 1400);
        }
      });
      acts.appendChild(go);
    }
    box.appendChild(acts);
    return box;
  }

  function cssEsc(s) { return String(s).replace(/["\\]/g, "\\$&"); }

  /* ==================== bölüm: d) belge ilerlemesi ====================
     Emoji + satır listesi + ince yüzde çubuğu kaldırıldı. Yerine kart
     ızgarası ve her belge için çizilen bir halka gösterge geldi.

     Neden halka: okuma ilerlemesi 0-100 arası kapalı bir orandır; kapalı
     oranlar için yay, doğrusal çubuktan daha okunaklıdır (uçları bellidir,
     "ne kadar kaldı" boşluk olarak görünür) ve kartın köşesinde yer kaplamaz.

     Yayın uzunluğu doğrudan `stroke-dasharray`de durur:
        dasharray = "<yüzdenin yay karşılığı> <çevre+1>"
     Böylece değer DOM'dan doğrulanabilir. Dolum `stroke-dashoffset`
     geçişiyle canlanır ve IntersectionObserver ile görünürlükte başlar.  */

  var RING_R = 26;
  var RING_C = 2 * Math.PI * RING_R;            // ≈ 163.363

  function svg(tag, attrs) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  /**
   * Halka gösterge. → { node, reveal }
   * `reveal()` çağrılana kadar yay kapalıdır; çağıran onu görünürlüğe bağlar.
   */
  function ring(pct, done, order) {
    var L = RING_C * (Math.max(0, Math.min(100, pct)) / 100);
    var wrap = el("div", "sv-ring");

    var s = svg("svg", { viewBox: "0 0 64 64", "aria-hidden": "true", focusable: "false" });

    /* Ölçek çentikleri: 12 adet, her üçüncüsü uzun — TikZ figürlerindeki
       tick'lerin karşılığı. Halka boşken bile "bu bir ölçek" der. */
    var g = svg("g", { "class": "sv-ring-ticks" });
    for (var i = 0; i < 12; i++) {
      var a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      var r2 = (i % 3 === 0) ? 27.2 : 28.8;
      g.appendChild(svg("line", {
        x1: (32 + Math.cos(a) * 30.6).toFixed(2), y1: (32 + Math.sin(a) * 30.6).toFixed(2),
        x2: (32 + Math.cos(a) * r2).toFixed(2),   y2: (32 + Math.sin(a) * r2).toFixed(2)
      }));
    }
    s.appendChild(g);

    /* Yay saat 12'den başlasın: dönüşü CSS yerine SVG özniteliğiyle veriyoruz
       ki çentikler yerinde kalsın ve tarayıcı farkı olmasın. */
    var rot = svg("g", { transform: "rotate(-90 32 32)" });
    rot.appendChild(svg("circle", { "class": "sv-ring-track", cx: 32, cy: 32, r: RING_R }));
    var arc = svg("circle", { "class": "sv-ring-arc", cx: 32, cy: 32, r: RING_R });
    arc.setAttribute("stroke-dasharray", L.toFixed(2) + " " + (RING_C + 1).toFixed(2));
    arc.style.strokeDashoffset = L.toFixed(2);          /* kapalı başla */
    arc.style.transitionDelay = Math.min(order || 0, 9) * 60 + "ms";
    rot.appendChild(arc);
    s.appendChild(rot);
    wrap.appendChild(s);

    var num = el("b", "sv-ring-n" + (done ? " is-check" : ""));
    if (done) {
      num.innerHTML = ico("check", 20);
      if (!num.innerHTML) num.textContent = "✓";
    } else {
      /* Türkçe yazımda yüzde işareti sayının önünde durur: %34 */
      num.appendChild(el("span", "sv-ring-u", "%"));
      num.appendChild(el("span", "sv-ring-v", String(pct)));
    }
    wrap.appendChild(num);

    return {
      node: wrap,
      reveal: function () { arc.style.strokeDashoffset = "0"; }
    };
  }

  function buildDocs(ctx) {
    var byId = {};
    ctx.progress.forEach(function (p) { byId[p.docId] = p; });

    /* Yalnızca AÇILMIŞ belgeler. Önce manifestin tamamı diziliyordu:
       278 kitapla bölüm sayfanın metrelerce aşağısına iniyor ve okurun
       hiç açmadığı kitaplar "ilerleme" başlığı altında yer kaplıyordu.
       İlerleme, ilerlediğin şeydir. Sıra da en son okunandan başlar. */
    var ids = Object.keys(byId).filter(function (id) {
      var p = byId[id] || {};
      return (p.pct || 0) > 0 || (p.seconds || 0) > 0 || p.finishedAt;
    }).sort(function (a, b) {
      return (byId[b].updatedAt || 0) - (byId[a].updatedAt || 0);
    });
    if (!ids.length) {
      return empty("Henüz bir metin açmadın. Kütüphaneden birini seçtiğinde ilerlemen burada birikir.");
    }
    /* Uzun listede ilk on iki yeter; gerisi istenirse açılır. */
    var LIMIT = 12;
    var fazlasi = Math.max(0, ids.length - LIMIT);
    var gosterilen = ids.slice(0, LIMIT);

    var best = {};
    ctx.runs.forEach(function (r) {
      var p = r.total ? Math.round((r.score / r.total) * 100) : 0;
      if (best[r.docId] == null || p > best[r.docId]) best[r.docId] = p;
    });

    var grid = el("div", "sv-docs");

    function docCard(id, i, toplam) {
      var p = byId[id] || { pct: 0, seconds: 0, finishedAt: null };
      var rawPct = p.pct || 0;
      // Store ilerlemeyi 0-1 arası tutar; eski kayıtlar 0-100 olabilir.
      var pct = Math.max(0, Math.min(100,
        Math.round(rawPct <= 1 ? rawPct * 100 : rawPct)));
      var fin = !!p.finishedAt || pct >= 99;
      var D = global.DOCS && global.DOCS[id];
      var kind = (D && D.kind) === "book" ? "book" : "article";

      var cardEl = el("article", "sv-doc" +
        (fin ? " is-done" : (pct > 0 ? " is-open" : " is-new")));
      /* Ton, belgenin kütüphanedeki sırasına göre teal→ember bandından
         gelir; doygunluk ve açıklık tek formülle sabitlendiği için on bir
         belge yan yana dizildiğinde ton karmaşası olmuyor
         (bkz. stats.css → .sv-doc --tint). */
      cardEl.style.setProperty("--hue", String(bandHue(i, toplam)));
      cardEl.setAttribute("data-pct", String(pct));

      var r = ring(pct, fin, i);
      cardEl.appendChild(r.node);

      var body = el("div", "sv-doc-body");

      /* Başlık bağlantısı kartın tamamını kaplar (::after ile). Sınav
         bağlantısı onun üstünde kalır; iç içe <a> kurulmaz. */
      var a = el("a", "sv-doc-t");
      a.href = "#/read/" + id;
      a.appendChild(el("span", "sv-doc-tt", docTitle(id)));
      body.appendChild(a);

      var meta = el("div", "sv-doc-meta");
      var kindEl = el("span", "sv-doc-kind");
      kindEl.insertAdjacentHTML("afterbegin", ico(kind, 12));
      kindEl.appendChild(el("span", null, kind === "book" ? "Kitap" : "Makale"));
      meta.appendChild(kindEl);
      var timeEl = el("span", "sv-doc-time");
      timeEl.insertAdjacentHTML("afterbegin", ico("clock", 12));
      timeEl.appendChild(el("span", null, dk((p.seconds || 0) / 60)));
      meta.appendChild(timeEl);
      body.appendChild(meta);

      body.appendChild(el("p", "sv-doc-state",
        fin ? "Bitirdin" : (pct > 0 ? "Kaldığın yerden sürebilirsin"
                                    : "Henüz başlamadın")));
      cardEl.appendChild(body);

      /* --- sınav ayağı: skor varsa ölçek, yoksa davet --- */
      var foot = el("div", "sv-doc-quiz");
      if (best[id] != null) {
        foot.appendChild(el("span", "sv-doc-qlbl", "Sınav"));
        var qbar = el("span", "sv-doc-qbar");
        var qfill = el("i", null);
        qfill.style.setProperty("--w", best[id] + "%");
        qbar.appendChild(qfill);
        foot.appendChild(qbar);
        foot.appendChild(el("b", "sv-doc-qn", "%" + best[id]));
        var again = el("a", "sv-doc-qa", "yenile");
        again.href = "#/quiz/" + id;
        again.setAttribute("aria-label", docTitle(id) + " sınavını yeniden çöz");
        foot.appendChild(again);
      } else {
        var inv = el("a", "sv-doc-invite");
        inv.href = "#/quiz/" + id;
        inv.insertAdjacentHTML("afterbegin", ico("quiz", 13));
        inv.appendChild(el("span", null,
          pct > 0 ? "Ne kadarını anladın? Sınavı dene" : "Sınavı dene"));
        foot.appendChild(inv);
      }
      cardEl.appendChild(foot);

      /* Görünürlükte: yay dolar, sınav ölçeği uzar. */
      onVisible(cardEl, function () { cardEl.classList.add("is-in"); r.reveal(); });

      return cardEl;
    }

    gosterilen.forEach(function (id, i) {
      grid.appendChild(docCard(id, i, gosterilen.length));
    });
    if (fazlasi) {
      var sar = el("div", "sv-more-wrap");
      sar.appendChild(grid);
      var b = el("button", "sv-btn sv-more",
        fazlasi + " kitap daha göster");
      b.type = "button";
      b.addEventListener("click", function () {
        /* Kalanlar istendiğinde ekleniyor: baştan çizmek 278 halkayı
           boşuna canlandırıyordu. */
        ids.slice(LIMIT).forEach(function (id, k) {
          grid.appendChild(docCard(id, LIMIT + k, ids.length));
        });
        b.remove();
      });
      sar.appendChild(b);
      return sar;
    }
    return grid;
  }

  /* ==================== bölüm: e) sözcük defteri ==================== */

  function buildVocab(ctx) {
    var vocab = ctx.vocab;
    var box = frag();

    var due = vocab.filter(isDue);

    var bar = el("div", "sv-toolbar");
    var info = el("div", "sv-toolbar-t",
      vocab.length ? plural(vocab.length, "sözcük") +
        (due.length ? " · " + plural(due.length, "tanesi") + " tekrarı bekliyor" : " · bugün tekrar yok")
        : "");
    bar.appendChild(info);
    if (due.length) {
      var rev = el("button", "sv-btn is-primary sv-review-start",
                   "Tekrar et (" + due.length + ")");
      rev.type = "button";
      rev.addEventListener("click", function () { startReview(ctx, due); });
      bar.appendChild(rev);
    }
    box.appendChild(bar);

    var host = el("div", "sv-review-host");
    box.appendChild(host);

    if (!vocab.length) {
      box.appendChild(empty("Defter boş. Okurken bir sözcüğün anlamına bakıp \u201eDeftere ekle\u201c dediğinde burada birikir."));
      return box;
    }

    var list = el("ul", "sv-vocab");
    vocab.forEach(function (v) {
      var li = el("li", "sv-v" + (isDue(v) ? " is-due" : ""));
      li.setAttribute("data-key", v.key);

      var main = el("div", "sv-v-main");
      main.appendChild(el("span", "sv-v-en", v.key));
      if (v.pos) main.appendChild(el("span", "sv-v-pos", v.pos));
      main.appendChild(el("span", "sv-v-tr", v.tr || "sözlükte yok"));
      li.appendChild(main);

      if (v.def) li.appendChild(el("div", "sv-v-def", v.def));

      var meta = el("div", "sv-v-meta");
      var boxes = el("span", "sv-srs");
      boxes.setAttribute("title", "SRS kutusu " + ((v.srsBox || 0) + 1) + " / " + (SRS_MAX + 1));
      for (var i = 0; i <= SRS_MAX; i++) {
        boxes.appendChild(el("i", "sv-srs-i" + (i <= (v.srsBox || 0) ? " is-on" : "")));
      }
      meta.appendChild(boxes);
      meta.appendChild(el("span", "sv-v-due" + (isDue(v) ? " is-due" : ""), "tekrar: " + dueText(v.dueAt)));
      if (v.docId) meta.appendChild(el("span", "sv-muted", docTitle(v.docId)));
      li.appendChild(meta);

      var del = el("button", "sv-x", "×");
      del.type = "button";
      del.title = "Bu sözcüğü defterden sil";
      del.setAttribute("aria-label", v.key + " sözcüğünü sil");
      del.addEventListener("click", function () {
        del.disabled = true;
        ask("removeVocab", [v.key], null).then(function () { refresh(ctx, ["vocab", "words"]); });
      });
      li.appendChild(del);

      list.appendChild(li);
    });
    box.appendChild(list);
    return box;
  }

  /* --- "Tekrar et" modu: kart kart soru --- */

  function startReview(ctx, due) {
    var host = ctx.root.querySelector(".sv-review-host");
    if (!host) return;
    var queue = due.slice();
    var i = 0, right = 0;

    function drawCard() {
      host.textContent = "";
      if (i >= queue.length) return drawDone();
      var v = queue[i];

      var card = el("div", "sv-rev");
      card.appendChild(el("div", "sv-rev-n", (i + 1) + " / " + queue.length));
      card.appendChild(el("div", "sv-rev-en", v.key));
      if (v.pos) card.appendChild(el("div", "sv-rev-pos", v.pos));
      card.appendChild(el("p", "sv-rev-hint", "Türkçesini hatırla, sonra çevir."));

      var acts = el("div", "sv-rev-acts");
      var flip = el("button", "sv-btn is-primary", "Çevir");
      flip.type = "button";
      flip.addEventListener("click", reveal);
      acts.appendChild(flip);
      var quit = el("button", "sv-btn sv-mini", "Bitir");
      quit.type = "button";
      quit.addEventListener("click", function () { host.textContent = ""; refresh(ctx, ["vocab"]); });
      acts.appendChild(quit);
      card.appendChild(acts);
      host.appendChild(card);
      flip.focus({ preventScroll: true });

      function reveal() {
        acts.textContent = "";
        var ans = el("div", "sv-rev-ans");
        ans.appendChild(el("div", "sv-rev-tr", v.tr || "sözlükte yok"));
        if (v.def) ans.appendChild(el("div", "sv-rev-def", v.def));
        card.insertBefore(ans, card.querySelector(".sv-rev-hint"));
        card.querySelector(".sv-rev-hint").textContent = "Hatırladın mı?";

        var ok = el("button", "sv-btn is-primary", "Bildim");
        ok.type = "button";
        ok.addEventListener("click", function () { grade(true); });
        var no = el("button", "sv-btn is-warn", "Bilemedim");
        no.type = "button";
        no.addEventListener("click", function () { grade(false); });
        acts.appendChild(ok); acts.appendChild(no);
        ok.focus({ preventScroll: true });
      }

      function grade(correct) {
        if (correct) right++;
        ask("reviewVocab", [v.key, correct], null).then(function () { i++; drawCard(); });
      }
    }

    function drawDone() {
      host.textContent = "";
      var d = el("div", "sv-rev sv-rev-done");
      d.appendChild(el("div", "sv-rev-en", "Tekrar bitti"));
      d.appendChild(el("p", "sv-rev-hint",
        plural(queue.length, "sözcük") + " gözden geçirdin · " + right + " tanesini bildin."));
      var b = el("button", "sv-btn is-primary", "Deftere dön");
      b.type = "button";
      b.addEventListener("click", function () { host.textContent = ""; refresh(ctx, ["vocab"]); });
      d.appendChild(b);
      host.appendChild(d);
      b.focus({ preventScroll: true });
    }

    drawCard();
    host.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ======================== bölüm: f) notlar ======================== */

  function buildNotes(ctx) {
    var notes = ctx.notes;
    if (!notes.length) {
      return empty("Not yok. Okurken bir cümleyi seçip not ekleyebilirsin.");
    }
    var groups = {}, order = [];
    notes.forEach(function (n) {
      var k = n.docId || "__yok__";
      if (!groups[k]) { groups[k] = []; order.push(k); }
      groups[k].push(n);
    });

    var box = frag();
    order.forEach(function (k) {
      var g = el("div", "sv-notegroup");
      g.appendChild(el("h3", "sv-notegroup-t",
        k === "__yok__" ? "Belgesiz notlar" : docTitle(k)));
      var ul = el("ul", "sv-notes");
      groups[k].forEach(function (n) {
        var li = el("li", "sv-note");
        if (n.quote) li.appendChild(el("blockquote", "sv-note-q", n.quote));
        if (n.note) li.appendChild(el("p", "sv-note-n", n.note));
        var m = el("div", "sv-note-m");
        m.appendChild(el("span", "sv-muted", trDate(ymd(n.at || Date.now()))));
        li.appendChild(m);
        var x = el("button", "sv-x", "×");
        x.type = "button";
        x.title = "Bu notu sil";
        x.setAttribute("aria-label", "Notu sil");
        x.addEventListener("click", function () {
          x.disabled = true;
          ask("removeNote", [n.id], null).then(function () { refresh(ctx, ["notes"]); });
        });
        li.appendChild(x);
        ul.appendChild(li);
      });
      g.appendChild(ul);
      box.appendChild(g);
    });
    return box;
  }

  /* ===================== bölüm: g) veri yönetimi ===================== */

  function buildData(ctx) {
    var box = frag();
    box.appendChild(el("p", "sv-note-info",
      "Okuma geçmişin, sözcük defterin ve notların yalnızca bu cihazın tarayıcısında " +
      "saklanır; hiçbir sunucuya gönderilmez. Tarayıcı verilerini temizlersen ya da " +
      "başka bir cihaza geçersen kaybolur. Bu yüzden ara sıra yedek indirmek iyi olur."));

    var acts = el("div", "sv-data-acts");

    /* --- indir --- */
    var out = el("button", "sv-btn is-primary", "Yedeği indir");
    out.type = "button";
    out.addEventListener("click", function () {
      ask("exportAll", [], null).then(function (raw) {
        if (raw == null) { flash(msg, "Dışa aktarılacak veri bulunamadı.", false); return; }
        var text = (typeof raw === "string") ? raw : JSON.stringify(raw, null, 2);
        var blob = new Blob([text], { type: "application/json" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "okuma-yedek-" + ymd(Date.now()) + ".json";
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
        flash(msg, "Yedek indirildi.", true);
      });
    });
    acts.appendChild(out);

    /* --- yükle --- */
    var file = el("input");
    file.type = "file";
    file.accept = "application/json,.json";
    file.className = "sv-file";
    file.addEventListener("change", function () {
      var f = file.files && file.files[0];
      if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        ask("importAll", [String(rd.result)], null)
          .then(function () {
            flash(msg, "Yedek yüklendi.", true);
            return refresh(ctx, null);
          });
      };
      rd.onerror = function () { flash(msg, "Dosya okunamadı.", false); };
      rd.readAsText(f);
      file.value = "";
    });
    var inBtn = el("button", "sv-btn", "Yedeği yükle");
    inBtn.type = "button";
    inBtn.addEventListener("click", function () { file.click(); });
    acts.appendChild(inBtn);
    acts.appendChild(file);

    /* --- tümünü sil (iki adımlı onay) --- */
    var wipeWrap = el("span", "sv-wipe");
    var wipe = el("button", "sv-btn is-danger", "Tümünü sil");
    wipe.type = "button";
    wipe.addEventListener("click", function () {
      wipeWrap.textContent = "";
      wipeWrap.appendChild(el("span", "sv-confirm-t", "Tüm veriler silinsin mi?"));
      var yes = el("button", "sv-btn is-danger", "Evet, sil");
      yes.type = "button";
      yes.addEventListener("click", function () {
        ask("clearAll", [], null).then(function () {
          flash(msg, "Tüm veriler silindi.", true);
          return refresh(ctx, null);
        });
      });
      var no = el("button", "sv-btn sv-mini", "Vazgeç");
      no.type = "button";
      no.addEventListener("click", function () {
        wipeWrap.textContent = ""; wipeWrap.appendChild(wipe);
      });
      wipeWrap.appendChild(yes); wipeWrap.appendChild(no);
    });
    wipeWrap.appendChild(wipe);
    acts.appendChild(wipeWrap);

    box.appendChild(acts);
    var msg = el("p", "sv-msg");
    msg.setAttribute("role", "status");
    box.appendChild(msg);
    return box;
  }

  function flash(node, text, ok) {
    node.textContent = text;
    node.className = "sv-msg " + (ok ? "is-ok" : "is-no");
    setTimeout(function () {
      if (node.textContent === text) { node.textContent = ""; node.className = "sv-msg"; }
    }, 4000);
  }

  /* ========================= ortak parçalar ========================= */

  function empty(text) {
    var e = el("div", "sv-empty");
    e.appendChild(el("span", "sv-empty-i", "◌"));
    e.appendChild(el("span", "sv-empty-t", text));
    return e;
  }

  var SECTIONS = [
    ["summary", "Özet", buildSummary, ""],
    ["heat", "Son 12 hafta", buildHeat, "Her kare bir gün; koyulaştıkça o gün daha çok okumuşsun."],
    ["words", "En çok baktığın sözcükler", buildWords, "Sözcüğe dokununca anlamı ve defterdeki kaydı açılır."],
    ["docs", "Belge ilerlemesi", buildDocs,
     "Halka okunan bölümü gösterir; ortadaki sayı yüzdedir. Karta dokununca metin açılır."],
    ["vocab", "Sözcük defteri", buildVocab, "Aralıklı tekrar: bildiğin sözcük daha seyrek, bilemediğin daha sık sorulur."],
    ["notes", "Notlar", buildNotes, ""],
    ["data", "Verilerin", buildData, ""],
  ];

  /* ====================== veri toplama + çizim ====================== */

  function collect() {
    return Promise.all([
      ask("sessionsTotal", [], { minutes: 0, days: 0, streak: 0 }),
      ask("allProgress", [], []),
      ask("lookupTotal", [], { distinct: 0, total: 0 }),
      ask("topLookups", [25], []),
      ask("listVocab", [], []),
      ask("listNotes", [], []),
      ask("quizRuns", [], []),
      dailyMinutes(WEEKS * 7),
    ]).then(function (r) {
      var vocabMap = {};
      (r[4] || []).forEach(function (v) { vocabMap[v.key] = v; });
      return {
        totals: r[0] || { minutes: 0, days: 0, streak: 0 },
        progress: r[1] || [],
        lookupTotal: r[2] || { distinct: 0, total: 0 },
        top: r[3] || [],
        vocab: r[4] || [],
        vocabMap: vocabMap,
        notes: r[5] || [],
        runs: r[6] || [],
        daily: r[7] || {},
      };
    });
  }

  /** Bölümleri yeniden çizer. `names` null ise hepsini. */
  function refresh(ctx, names) {
    return collect().then(function (data) {
      for (var k in data) ctx[k] = data[k];
      SECTIONS.forEach(function (s) {
        if (names && names.indexOf(s[0]) < 0) return;
        var host = ctx.root.querySelector('[data-sec="' + s[0] + '"] .sv-body');
        if (!host) return;
        host.textContent = "";
        host.appendChild(s[2](ctx));
      });
    });
  }

  function render(containerEl) {
    if (!containerEl) throw new Error("StatsView.render: kap öğesi gerekli.");
    containerEl.textContent = "";

    var root = el("div", "sv");
    containerEl.appendChild(root);

    var head = el("header", "sv-head");
    head.appendChild(el("h1", "sv-title", "Okuma defterin"));
    head.appendChild(el("p", "sv-sub",
      "Ne kadar okuduğun, hangi sözcüklere kaç kez baktığın ve aldığın notlar."));
    root.appendChild(head);

    /* Store yoksa hiç değilse anlaşılır bir uyarı göster */
    if (!S()) {
      root.appendChild(empty("Veri katmanı yüklenemedi. Sayfayı yenilemeyi dene."));
      return Promise.resolve();
    }

    var ctx = { root: root, container: containerEl };

    return Promise.resolve(ask("ready", [], null)).then(collect).then(function (data) {
      for (var k in data) ctx[k] = data[k];

      SECTIONS.forEach(function (s) {
        var sec = el("section", "sv-sec");
        sec.setAttribute("data-sec", s[0]);
        var h = el("div", "sv-sec-h");
        h.appendChild(el("h2", "sv-h", s[1]));
        if (s[3]) h.appendChild(el("p", "sv-hint", s[3]));
        sec.appendChild(h);
        var body = el("div", "sv-body");
        try {
          body.appendChild(s[2](ctx));
        } catch (e) {
          console.error("[stats] '" + s[0] + "' bölümü çizilemedi:", e);
          body.appendChild(empty("Bu bölüm gösterilemedi."));
        }
        sec.appendChild(body);
        root.appendChild(sec);
      });
    }).catch(function (e) {
      console.error("[stats] çizim hatası:", e);
      root.appendChild(empty("İstatistikler yüklenemedi."));
    });
  }

  global.StatsView = { render: render, refresh: refresh };
})(window);
