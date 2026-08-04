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

  function docCover(id) {
    var D = global.DOCS && global.DOCS[id];
    if (D && D.cover) return D.cover;
    return { emoji: "📄", hue: 210 };
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

  function card(label, value, sub, tone) {
    var c = el("div", "sv-card" + (tone ? " is-" + tone : ""));
    c.appendChild(el("div", "sv-card-l", label));
    c.appendChild(el("div", "sv-card-v", value));
    c.appendChild(el("div", "sv-card-s", sub || ""));
    return c;
  }

  function buildSummary(ctx) {
    var t = ctx.totals, prog = ctx.progress, lk = ctx.lookupTotal;
    var read = prog.length;
    var done = prog.filter(function (p) { return p.finishedAt || (p.pct || 0) >= 99; }).length;

    var g = el("div", "sv-cards");
    g.appendChild(card("Toplam okuma süresi", dk(t.minutes),
      t.days ? plural(t.days, "gün okudun") : "henüz okuma yok"));
    g.appendChild(card("Okuduğun metin", String(read),
      done ? plural(done, "tanesi bitti") : "henüz bitirilen yok"));
    g.appendChild(card("Farklı sözcük", String(lk.distinct || 0),
      "anlamına baktığın ayrı sözcük"));
    g.appendChild(card("Toplam arama", String(lk.total || 0),
      "sözcüğe bakma sayısı"));
    g.appendChild(card("Güncel seri", plural(t.streak || 0, "gün"),
      (t.streak > 0) ? "kesintisiz okuma" : "bugün okursan seri başlar",
      (t.streak > 0) ? "warm" : ""));

    if (!read && !lk.total && !t.minutes) {
      var f = frag();
      f.appendChild(g);
      f.appendChild(empty("Henüz okuma yok — kütüphaneden bir metin seçin."));
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
        var txt = trDate(key) + " — " + (future ? "henüz gelmedi" : dk(min));
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
      f.appendChild(empty("Son 12 haftada kayıtlı okuma yok — bir metin açtığında burası dolmaya başlar."));
    }
    return f;
  }

  /* ================== bölüm: c) en çok bakılan sözcükler ================== */

  function buildWords(ctx) {
    var top = ctx.top, vocab = ctx.vocabMap;
    if (!top.length) {
      return empty("Henüz sözcüğe bakmadın — okurken bir sözcüğe dokununca anlamı burada birikir.");
    }
    var max = top[0].count || 1;
    var list = el("ol", "sv-words");

    top.forEach(function (w) {
      var li = el("li", "sv-word");
      var btn = el("button", "sv-word-b");
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");

      var head = el("span", "sv-word-head");
      head.appendChild(el("span", "sv-word-en", w.word));
      var hit = vocab[w.word] || peekTr(w.word);
      head.appendChild(el("span", "sv-word-tr", (hit && hit.tr) ? hit.tr : "—"));
      head.appendChild(el("span", "sv-word-n", String(w.count)));
      btn.appendChild(head);

      var barw = el("span", "sv-word-bar");
      var fill = el("i");
      fill.style.width = Math.max(3, Math.round((w.count / max) * 100)) + "%";
      barw.appendChild(fill);
      btn.appendChild(barw);
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
    return list;
  }

  /** Sözcük ayrıntısı: defterdeki kayıt varsa o, yoksa sözlük karşılığı. */
  function wordDetail(w, ctx) {
    var box = frag();
    var v = ctx.vocabMap[w.word];
    var d = v || peekTr(w.word);

    if (d) {
      var line = el("p", "sv-wd-tr");
      if (d.pos) line.appendChild(el("span", "sv-wd-pos", d.pos));
      line.appendChild(el("span", "", d.tr || "—"));
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

  /* ==================== bölüm: d) belge ilerlemesi ==================== */

  function buildDocs(ctx) {
    var byId = {};
    ctx.progress.forEach(function (p) { byId[p.docId] = p; });

    /* manifest sırası esas; manifestte olmayıp ilerlemesi olanlar sona eklenir */
    var ids = (global.MANIFEST || []).map(function (m) { return m.id; });
    Object.keys(byId).forEach(function (id) { if (ids.indexOf(id) < 0) ids.push(id); });
    if (!ids.length) {
      return empty("Henüz okuma yok — kütüphaneden bir metin seçin.");
    }

    var best = {};
    ctx.runs.forEach(function (r) {
      var p = r.total ? Math.round((r.score / r.total) * 100) : 0;
      if (best[r.docId] == null || p > best[r.docId]) best[r.docId] = p;
    });

    var list = el("div", "sv-docs");
    ids.forEach(function (id) {
      var p = byId[id] || { pct: 0, seconds: 0, finishedAt: null };
      var pct = Math.max(0, Math.min(100, Math.round(p.pct || 0)));
      var fin = !!p.finishedAt || pct >= 99;

      var row = el("div", "sv-doc" + (fin ? " is-done" : ""));

      var cov = docCover(id);
      var badge = el("div", "sv-doc-cov", cov.emoji || "📄");
      badge.style.setProperty("--h", String(cov.hue == null ? 210 : cov.hue));
      row.appendChild(badge);

      var mid = el("div", "sv-doc-mid");
      var ttl = el("div", "sv-doc-t", docTitle(id));
      mid.appendChild(ttl);

      var bar = el("div", "sv-bar");
      var fill = el("i");
      fill.style.width = pct + "%";
      bar.appendChild(fill);
      mid.appendChild(bar);

      var meta = el("div", "sv-doc-meta");
      meta.appendChild(el("span", "sv-doc-pct", "%" + pct));
      meta.appendChild(el("span", "", dk((p.seconds || 0) / 60)));
      if (fin) meta.appendChild(el("span", "sv-tag is-done", "bitti"));
      meta.appendChild(el("span", best[id] != null ? "sv-tag is-quiz" : "sv-muted",
        best[id] != null ? "sınav en iyi %" + best[id] : "sınav yapılmadı"));
      mid.appendChild(meta);
      row.appendChild(mid);

      var act = el("div", "sv-doc-act");
      var b = el("button", "sv-btn" + (pct > 0 && !fin ? " is-primary" : ""),
                 pct > 0 ? (fin ? "Yeniden oku" : "Kaldığın yerden devam et") : "Okumaya başla");
      b.type = "button";
      b.addEventListener("click", function () { global.location.hash = "#/read/" + id; });
      act.appendChild(b);
      if (best[id] != null || pct > 0) {
        var q = el("button", "sv-btn sv-mini", "Sınav");
        q.type = "button";
        q.addEventListener("click", function () { global.location.hash = "#/quiz/" + id; });
        act.appendChild(q);
      }
      row.appendChild(act);
      list.appendChild(row);
    });
    return list;
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
      box.appendChild(empty("Defter boş — okurken bir sözcüğün anlamına bakıp \u201eDeftere ekle\u201c dediğinde burada birikir."));
      return box;
    }

    var list = el("ul", "sv-vocab");
    vocab.forEach(function (v) {
      var li = el("li", "sv-v" + (isDue(v) ? " is-due" : ""));
      li.setAttribute("data-key", v.key);

      var main = el("div", "sv-v-main");
      main.appendChild(el("span", "sv-v-en", v.key));
      if (v.pos) main.appendChild(el("span", "sv-v-pos", v.pos));
      main.appendChild(el("span", "sv-v-tr", v.tr || "—"));
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
        ans.appendChild(el("div", "sv-rev-tr", v.tr || "—"));
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
      return empty("Not yok — okurken bir cümleyi seçip not ekleyebilirsin.");
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
      "başka bir cihaza geçersen kaybolur — bu yüzden ara sıra yedek indirmek iyi olur."));

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
    ["docs", "Belge ilerlemesi", buildDocs, ""],
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
      root.appendChild(empty("Veri katmanı yüklenemedi — sayfayı yenilemeyi dene."));
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
