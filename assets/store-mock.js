/* ------------------------------------------------------------------
   store-mock.js — GELİŞTİRME AMAÇLI sahte depolama katmanı

   Gerçek katman `assets/store.js` içindedir ve BAŞKA bir görevin
   sorumluluğundadır. Bu dosya yalnızca:
     • `stats-demo.html` gibi tek başına açılan sınama sayfalarında,
     • gerçek `store.js` henüz yüklenmemişken
   ARCHITECTURE.md §4'teki arayüzü bellekte taklit eder.

   KURAL: gerçek `Store` varsa ona DOKUNULMAZ. Bu dosya `store.js`'ten
   ÖNCE yüklenmelidir (ya da üretimde hiç yüklenmemelidir); böylece
   gerçek katman yüklendiğinde sahtenin üzerine yazar.

   Ek olarak `dailyMinutes(n)` sunar — §4'te olmayan, günlük ısı haritası
   için gereken isteğe bağlı bir yardımcıdır. `stats.js` bu metodu yoksa
   `exportAll()` çıktısından türetir, yani gerçek store.js'in bunu
   sağlama zorunluluğu yoktur.
------------------------------------------------------------------ */
(function (global) {
  "use strict";

  /* ------------------------- yardımcılar ------------------------- */

  var DAY = 86400000;

  /** Yerel saate göre YYYY-AA-GG (toISOString UTC'ye kaydırdığı için kullanılmaz). */
  function ymd(d) {
    d = (d instanceof Date) ? d : new Date(d);
    var m = d.getMonth() + 1, g = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (g < 10 ? "0" + g : g);
  }

  /** Günün başlangıcı (yerel gece yarısı). */
  function dayStart(d) {
    d = (d instanceof Date) ? new Date(d.getTime()) : new Date(d);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }

  function uid(p) {
    return (p || "id") + "-" + Date.now().toString(36) + "-" +
           Math.random().toString(36).slice(2, 8);
  }

  function clone(x) { return JSON.parse(JSON.stringify(x)); }

  /* SRS aralıkları (gün) — kutu numarası dizinin indeksidir. */
  var SRS_DAYS = [0, 1, 3, 7, 16, 35];

  /* --------------------------- veri tabanı --------------------------- */

  function emptyDB() {
    return {
      progress: {},   // docId → {docId, pct, sectionId, seconds, finishedAt}
      lookups: {},    // word  → {word, count, lastAt, docIds:[]}
      vocab: {},      // key   → {key, tr, def, pos, docId, srsBox, dueAt, addedAt}
      notes: [],      // [{id, docId, quote, note, at}]
      quizRuns: [],   // [{id, docId, score, total, answers, at}]
      sessions: [],   // [{id, docId, startedAt, endedAt, seconds, words}]
    };
  }

  var DB = emptyDB();

  function P(v) { return Promise.resolve(v); }

  /* ----------------------------- API ----------------------------- */

  var Mock = {

    __mock: true,

    ready: function () { return P(); },

    /* ---------------- okuma ilerlemesi ---------------- */

    getProgress: function (docId) {
      return P(DB.progress[docId] ? clone(DB.progress[docId]) : null);
    },

    setProgress: function (docId, patch) {
      var cur = DB.progress[docId] ||
                { docId: docId, pct: 0, sectionId: null, seconds: 0, finishedAt: null };
      for (var k in (patch || {})) cur[k] = patch[k];
      cur.docId = docId;
      DB.progress[docId] = cur;
      return P(clone(cur));
    },

    allProgress: function () {
      return P(Object.keys(DB.progress).map(function (k) { return clone(DB.progress[k]); }));
    },

    /* ---------------- sözcük arama telemetrisi ---------------- */

    logLookup: function (word, docId, source) {
      var w = String(word || "").toLowerCase().trim();
      if (!w) return P(null);
      var rec = DB.lookups[w] || { word: w, count: 0, lastAt: 0, docIds: [], source: source };
      rec.count += 1;
      rec.lastAt = Date.now();
      if (docId && rec.docIds.indexOf(docId) < 0) rec.docIds.push(docId);
      if (source) rec.source = source;
      DB.lookups[w] = rec;
      return P(clone(rec));
    },

    topLookups: function (limit) {
      var arr = Object.keys(DB.lookups).map(function (k) { return clone(DB.lookups[k]); });
      arr.sort(function (a, b) { return b.count - a.count || b.lastAt - a.lastAt; });
      return P(limit ? arr.slice(0, limit) : arr);
    },

    lookupTotal: function () {
      var keys = Object.keys(DB.lookups), total = 0;
      keys.forEach(function (k) { total += DB.lookups[k].count; });
      return P({ distinct: keys.length, total: total });
    },

    /* ---------------- sözcük defteri (SRS) ---------------- */

    addVocab: function (entry) {
      entry = entry || {};
      var key = String(entry.key || "").toLowerCase().trim();
      if (!key) return P(null);
      var old = DB.vocab[key];
      var rec = {
        key: key,
        tr: entry.tr || (old && old.tr) || "",
        def: entry.def || (old && old.def) || "",
        pos: entry.pos || (old && old.pos) || "",
        docId: entry.docId || (old && old.docId) || null,
        srsBox: old ? old.srsBox : 0,
        dueAt: old ? old.dueAt : Date.now(),
        addedAt: old ? old.addedAt : Date.now(),
      };
      DB.vocab[key] = rec;
      return P(clone(rec));
    },

    removeVocab: function (key) {
      delete DB.vocab[String(key || "").toLowerCase()];
      return P(true);
    },

    listVocab: function () {
      var arr = Object.keys(DB.vocab).map(function (k) { return clone(DB.vocab[k]); });
      arr.sort(function (a, b) { return (a.dueAt || 0) - (b.dueAt || 0); });
      return P(arr);
    },

    reviewVocab: function (key, correct) {
      var rec = DB.vocab[String(key || "").toLowerCase()];
      if (!rec) return P(null);
      rec.srsBox = correct ? Math.min(SRS_DAYS.length - 1, (rec.srsBox || 0) + 1)
                           : 0;
      rec.dueAt = Date.now() + SRS_DAYS[rec.srsBox] * DAY;
      rec.lastReviewAt = Date.now();
      return P(clone(rec));
    },

    /* ---------------- serbest notlar ---------------- */

    addNote: function (n) {
      n = n || {};
      var rec = { id: uid("note"), docId: n.docId || null, quote: n.quote || "",
                  note: n.note || "", at: n.at || Date.now() };
      DB.notes.push(rec);
      return P(clone(rec));
    },

    listNotes: function (docId) {
      var arr = DB.notes.filter(function (n) { return !docId || n.docId === docId; });
      arr.sort(function (a, b) { return b.at - a.at; });
      return P(clone(arr));
    },

    removeNote: function (id) {
      DB.notes = DB.notes.filter(function (n) { return n.id !== id; });
      return P(true);
    },

    /* ---------------- sınav ---------------- */

    saveQuizRun: function (run) {
      run = run || {};
      var rec = { id: uid("run"), docId: run.docId || null, score: run.score | 0,
                  total: run.total | 0, answers: run.answers || [],
                  at: run.at || Date.now() };
      DB.quizRuns.push(rec);
      return P(clone(rec));
    },

    quizRuns: function (docId) {
      var arr = DB.quizRuns.filter(function (r) { return !docId || r.docId === docId; });
      arr.sort(function (a, b) { return b.at - a.at; });
      return P(clone(arr));
    },

    /* ---------------- okuma oturumu ---------------- */

    beginSession: function (docId) {
      var s = { id: uid("ses"), docId: docId || null, startedAt: Date.now(),
                endedAt: null, seconds: 0, words: 0 };
      DB.sessions.push(s);
      return P(s.id);
    },

    endSession: function (sessionId, words) {
      var s = null;
      for (var i = 0; i < DB.sessions.length; i++) {
        if (DB.sessions[i].id === sessionId) { s = DB.sessions[i]; break; }
      }
      if (!s) return P(null);
      s.endedAt = Date.now();
      s.seconds = Math.max(0, Math.round((s.endedAt - s.startedAt) / 1000));
      s.words = words || 0;
      return P(clone(s));
    },

    sessionsTotal: function () {
      var sec = 0, dayset = {};
      DB.sessions.forEach(function (s) {
        sec += s.seconds || 0;
        dayset[ymd(s.startedAt)] = true;
      });
      /* seri: bugünden (ya da dünden) geriye kesintisiz gün sayısı */
      var streak = 0, t = dayStart(Date.now());
      if (!dayset[ymd(t)] && dayset[ymd(t - DAY)]) t -= DAY;
      while (dayset[ymd(t)]) { streak++; t -= DAY; }
      return P({ minutes: Math.round(sec / 60), days: Object.keys(dayset).length,
                 streak: streak });
    },

    /* --- §4 dışı, isteğe bağlı: ısı haritası için günlük dakika --- */
    dailyMinutes: function (n) {
      n = n || 84;
      var acc = {};
      DB.sessions.forEach(function (s) {
        var k = ymd(s.startedAt);
        acc[k] = (acc[k] || 0) + (s.seconds || 0);
      });
      var out = [], t = dayStart(Date.now()) - (n - 1) * DAY;
      for (var i = 0; i < n; i++) {
        var k = ymd(t + i * DAY);
        out.push({ date: k, minutes: Math.round((acc[k] || 0) / 60) });
      }
      return P(out);
    },

    /* ---------------- taşınabilirlik ---------------- */

    exportAll: function () {
      return P(JSON.stringify({ v: 1, at: Date.now(), app: "reading-library",
                                data: DB }, null, 2));
    },

    importAll: function (json) {
      var incoming;
      try {
        incoming = (typeof json === "string") ? JSON.parse(json) : json;
      } catch (e) {
        return Promise.reject(new Error("Yedek dosyası okunamadı (geçersiz JSON)."));
      }
      var d = (incoming && incoming.data) ? incoming.data : incoming;
      if (!d || typeof d !== "object") {
        return Promise.reject(new Error("Yedek dosyası tanınmadı."));
      }
      /* çakışmada yenisi kazanır */
      ["progress", "lookups", "vocab"].forEach(function (bucket) {
        var src = d[bucket] || {};
        for (var k in src) DB[bucket][k] = src[k];
      });
      ["notes", "quizRuns", "sessions"].forEach(function (bucket) {
        var src = d[bucket] || [];
        var have = {};
        DB[bucket].forEach(function (x) { have[x.id] = true; });
        src.forEach(function (x) { if (!have[x.id]) DB[bucket].push(x); });
      });
      return P(true);
    },

    clearAll: function () { DB = emptyDB(); return P(true); },
  };

  /* --------------------- sınama verisi ekleme --------------------- */

  var Ctl = {
    /** Ham veri tabanını doğrudan doldurur (demo/sınama içindir). */
    seed: function (partial) {
      var d = partial || {};
      ["progress", "lookups", "vocab"].forEach(function (b) {
        if (d[b]) for (var k in d[b]) DB[b][k] = d[b][k];
      });
      ["notes", "quizRuns", "sessions"].forEach(function (b) {
        if (d[b]) DB[b] = DB[b].concat(d[b]);
      });
      return DB;
    },
    raw: function () { return DB; },
    reset: function () { DB = emptyDB(); },
    ymd: ymd,
    /** Gerçek Store yoksa sahteyi kurar; varsa hiçbir şey yapmaz. */
    install: function () {
      if (global.Store) return false;
      global.Store = Mock;
      return true;
    },
  };

  global.StoreMock = Ctl;
  Ctl.install();
})(window);
