/* =========================================================================
   Reading Library — kalıcı depolama katmanı            (window.Store)
   -------------------------------------------------------------------------
   Sözleşme: ARCHITECTURE.md §4. Tüm metotlar Promise döner.

   * Birincil depo : IndexedDB  ("reading-library", sürüm 1)
   * Yedek depo    : localStorage  — IndexedDB açılamazsa (özel sekme,
     file:// kısıtı, eski tarayıcı) sessizce buna düşülür; API aynıdır.
     Hangi motorun kullanıldığı `Store.engine` ile okunur: "idb" | "ls".
   * ES modülü yok, dış bağımlılık yok; klasik <script> ile yüklenir.
   ========================================================================= */
(function (global) {
  "use strict";

  /* ---------------------------------------------------------------- sabitler */

  var DB_NAME = "reading-library";
  var DB_VERSION = 2;              // 2: userDocs (kullanıcının yüklediği PDF'ler)
  var LS_PREFIX = "rl:";          // localStorage anahtar öneki
  var SCHEMA_VERSION = 1;         // dışa aktarım şema sürümü
  var WRITE_DELAY = 400;          // ms — sık yazmalar için bekletme süresi
  var OPEN_TIMEOUT = 3000;        // ms — IndexedDB açılışı bu kadar sürerse yedeğe düş
  var DAY = 86400000;             // bir gün, ms
  var MAX_SESSION_MIN = 240;      // açık unutulan sekme istatistiği bozmasın

  // Object store tanımları. autoInc olanlarda anahtar tarayıcı/seq tarafından üretilir.
  var STORES = [
    { name: "progress", keyPath: "docId", autoInc: false, indexes: [] },
    { name: "lookups",  keyPath: "word",  autoInc: false, indexes: [] },
    { name: "vocab",    keyPath: "key",   autoInc: false, indexes: ["dueAt"] },
    { name: "notes",    keyPath: "id",    autoInc: true,  indexes: ["docId"] },
    { name: "quizRuns", keyPath: "id",    autoInc: true,  indexes: ["docId"] },
    { name: "sessions", keyPath: "id",    autoInc: true,  indexes: ["docId"] },
    /* Kullanıcının kendi yüklediği belgeler (PDF içe aktarma, beta).
       Gövde de burada durur: dosya kullanıcının kendi diskinde kalır,
       hiçbir yere gönderilmez. */
    { name: "userDocs", keyPath: "id",    autoInc: false, indexes: [] }
  ];

  // SRS (Leitner) — kutu numarasına karşılık gelen gecikme, gün cinsinden.
  var SRS_DAYS = [0, 1, 3, 7, 16, 35];   // 0. eleman kullanılmaz; kutular 1..5
  var SRS_MAX_BOX = 5;

  /* ---------------------------------------------------------------- yardımcılar */

  function now() { return Date.now(); }

  function clone(v) { return v == null ? v : JSON.parse(JSON.stringify(v)); }

  function isObj(v) { return v !== null && typeof v === "object"; }

  function storeDef(name) {
    for (var i = 0; i < STORES.length; i++) if (STORES[i].name === name) return STORES[i];
    throw new Error("Bilinmeyen store: " + name);
  }

  // Kayıtların "yenilik" damgası — içe aktarımda çakışma çözümünde kullanılır.
  function stampOf(rec) {
    if (!isObj(rec)) return 0;
    return Number(rec.updatedAt || rec.lastAt || rec.createdAt || rec.addedAt || rec.startedAt || 0) || 0;
  }

  // "En yeni başta" sıralaması. Aynı milisaniyede oluşan kayıtlarda id ayırt eder.
  function newestFirst(a, b) {
    return (stampOf(b) - stampOf(a)) || ((Number(b.id) || 0) - (Number(a.id) || 0));
  }

  function pad2(n) { return n < 10 ? "0" + n : String(n); }

  // Yerel saat dilimine göre "YYYY-MM-DD" gün anahtarı.
  function dayKey(ts) {
    var d = new Date(ts);
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function warn(msg, err) {
    if (global.console && global.console.warn) global.console.warn("[Store] " + msg, err || "");
  }

  /* ================================================================= yedek depo
     localStorage arka ucu. Her object store tek bir JSON nesnesi olarak tutulur:
     rl:<store>  →  { "<anahtar>": kayıt, ... }        rl:seq:<store> → sayaç
     localStorage hiç yoksa (çok kısıtlı bağlam) bellek içi eşdeğeri kullanılır.
     ========================================================================= */

  function memoryShim() {
    var m = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null; },
      setItem: function (k, v) { m[k] = String(v); },
      removeItem: function (k) { delete m[k]; }
    };
  }

  function pickWebStorage() {
    try {
      var ls = global.localStorage;
      if (!ls) return memoryShim();
      var probe = LS_PREFIX + "__probe";
      ls.setItem(probe, "1");
      ls.removeItem(probe);
      return ls;
    } catch (e) {
      warn("localStorage kullanılamıyor, bellek içi yedeğe düşülüyor.", e);
      return memoryShim();
    }
  }

  function makeLsBackend() {
    var web = pickWebStorage();

    function readMap(name) {
      try {
        var raw = web.getItem(LS_PREFIX + name);
        if (!raw) return {};
        var o = JSON.parse(raw);
        return isObj(o) ? o : {};
      } catch (e) { warn("bozuk yerel kayıt sıfırlanıyor: " + name, e); return {}; }
    }

    function writeMap(name, map) {
      try { web.setItem(LS_PREFIX + name, JSON.stringify(map)); }
      catch (e) { warn("yerel depoya yazılamadı (kota?): " + name, e); }
    }

    function nextId(name) {
      var k = LS_PREFIX + "seq:" + name;
      var n = (parseInt(web.getItem(k), 10) || 0) + 1;
      web.setItem(k, String(n));
      return n;
    }

    function bumpSeq(name, id) {
      var k = LS_PREFIX + "seq:" + name;
      var cur = parseInt(web.getItem(k), 10) || 0;
      if (id > cur) web.setItem(k, String(id));
    }

    function putInto(name, map, rec) {
      var def = storeDef(name);
      if (def.autoInc && (rec[def.keyPath] === undefined || rec[def.keyPath] === null)) {
        rec[def.keyPath] = nextId(name);
      } else if (def.autoInc) {
        bumpSeq(name, Number(rec[def.keyPath]) || 0);
      }
      map[String(rec[def.keyPath])] = rec;
      return rec[def.keyPath];
    }

    return {
      engine: "ls",
      get: function (name, key) {
        var map = readMap(name);
        var rec = map[String(key)];
        return Promise.resolve(rec === undefined ? null : rec);
      },
      getAll: function (name) {
        var map = readMap(name), out = [], k;
        for (k in map) if (Object.prototype.hasOwnProperty.call(map, k)) out.push(map[k]);
        return Promise.resolve(out);
      },
      byIndex: function (name, field, value) {
        return this.getAll(name).then(function (rows) {
          return rows.filter(function (r) { return r && r[field] === value; });
        });
      },
      put: function (name, rec) {
        var map = readMap(name);
        var key = putInto(name, map, rec);
        writeMap(name, map);
        return Promise.resolve(key);
      },
      putMany: function (name, recs) {
        if (!recs.length) return Promise.resolve();
        var map = readMap(name);
        for (var i = 0; i < recs.length; i++) putInto(name, map, recs[i]);
        writeMap(name, map);
        return Promise.resolve();
      },
      del: function (name, key) {
        var map = readMap(name);
        delete map[String(key)];
        writeMap(name, map);
        return Promise.resolve();
      },
      clear: function (name) {
        writeMap(name, {});
        try { web.removeItem(LS_PREFIX + "seq:" + name); } catch (e) { /* önemsiz */ }
        return Promise.resolve();
      }
    };
  }

  /* ============================================================ birincil depo
     IndexedDB arka ucu.
     ========================================================================= */

  function reqPromise(req) {
    return new Promise(function (resolve, reject) {
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error || new Error("IndexedDB isteği başarısız")); };
    });
  }

  function openIdb() {
    return new Promise(function (resolve, reject) {
      var idb = null;
      try { idb = global.indexedDB || global.mozIndexedDB || global.webkitIndexedDB || null; }
      catch (e) { idb = null; }
      if (!idb) { reject(new Error("IndexedDB bu ortamda yok")); return; }

      var req, settled = false;
      try { req = idb.open(DB_NAME, DB_VERSION); }
      catch (e) { reject(e); return; }

      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        reject(new Error("IndexedDB açılışı zaman aşımına uğradı"));
      }, OPEN_TIMEOUT);

      req.onupgradeneeded = function () {
        var db = req.result;
        STORES.forEach(function (d) {
          var os = db.objectStoreNames.contains(d.name)
            ? req.transaction.objectStore(d.name)
            : db.createObjectStore(d.name, { keyPath: d.keyPath, autoIncrement: d.autoInc });
          d.indexes.forEach(function (f) {
            if (!os.indexNames.contains("by_" + f)) os.createIndex("by_" + f, f, { unique: false });
          });
        });
      };
      req.onsuccess = function () {
        clearTimeout(timer);
        if (settled) { try { req.result.close(); } catch (e) { /* önemsiz */ } return; }
        settled = true;
        resolve(req.result);
      };
      req.onerror = function () {
        clearTimeout(timer);
        if (settled) return;
        settled = true;
        reject(req.error || new Error("IndexedDB açılamadı"));
      };
      req.onblocked = function () {
        clearTimeout(timer);
        if (settled) return;
        settled = true;
        reject(new Error("IndexedDB başka sekme tarafından engellendi"));
      };
    });
  }

  function makeIdbBackend(db) {
    // Başka bir sekme sürüm yükseltirse bağlantıyı bırak.
    db.onversionchange = function () { try { db.close(); } catch (e) { /* önemsiz */ } };

    function tx(name, mode) { return db.transaction(name, mode).objectStore(name); }

    function writeTx(name, fn) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(name, "readwrite");
        try { fn(t.objectStore(name)); }
        catch (e) { reject(e); return; }
        t.oncomplete = function () { resolve(); };
        t.onerror = function () { reject(t.error || new Error("yazma işlemi başarısız")); };
        t.onabort = function () { reject(t.error || new Error("yazma işlemi iptal edildi")); };
      });
    }

    return {
      engine: "idb",
      get: function (name, key) {
        return reqPromise(tx(name, "readonly").get(key)).then(function (r) {
          return r === undefined ? null : r;
        });
      },
      getAll: function (name) {
        return reqPromise(tx(name, "readonly").getAll());
      },
      byIndex: function (name, field, value) {
        return reqPromise(tx(name, "readonly").index("by_" + field).getAll(value));
      },
      put: function (name, rec) {
        var def = storeDef(name);
        var key;
        return writeTx(name, function (os) {
          var r;
          if (def.autoInc && (rec[def.keyPath] === undefined || rec[def.keyPath] === null)) {
            delete rec[def.keyPath];          // anahtar üreticisi kendi id'sini versin
            r = os.add(rec);
          } else {
            r = os.put(rec);
          }
          r.onsuccess = function () { key = r.result; rec[def.keyPath] = r.result; };
        }).then(function () { return key; });
      },
      putMany: function (name, recs) {
        if (!recs.length) return Promise.resolve();
        return writeTx(name, function (os) {
          for (var i = 0; i < recs.length; i++) os.put(recs[i]);
        });
      },
      del: function (name, key) {
        return writeTx(name, function (os) { os.delete(key); });
      },
      clear: function (name) {
        return writeTx(name, function (os) { os.clear(); });
      }
    };
  }

  /* ---------------------------------------------------------------- başlatma */

  var backend = null;
  var engine = null;
  var readyPromise = null;

  function init() {
    return openIdb().then(function (db) {
      var b = makeIdbBackend(db);
      // Açılış başarılı olsa bile ilk işlem patlayabilir (bazı özel sekmeler);
      // küçük bir deneme okumasıyla doğrula.
      return b.getAll("progress").then(function () { return b; });
    }).then(function (b) {
      backend = b; engine = "idb";
    }).catch(function (e) {
      warn("IndexedDB kullanılamıyor, localStorage yedeğine düşülüyor —", (e && e.message) || e);
      backend = makeLsBackend(); engine = "ls";
    }).then(function () {
      api.engine = engine;
    });
  }

  // Depo hazır olana kadar bekler; tüm genel metotlar bunu bir kez çağırır.
  function ready() {
    if (!readyPromise) readyPromise = init();
    return readyPromise;
  }

  // Depo hazır + sıradaki birleştirmeler bitmiş: okuma metotları bunu bekler ki
  // henüz diske inmemiş (bekletilen) yazmalar da sonuçlara yansısın.
  function settled() {
    return ready().then(function () { return writeChain; });
  }

  /* ------------------------------------------------------- yazma kuyruğu (debounce)
     setProgress / logLookup her kaydırmada, her sözcük tıklamasında
     çağrılabilir. Kayıtlar bellekte birleştirilir, 400 ms sonra tek seferde
     yazılır. Okuma metotları bekleyen kayıtları da hesaba katar. */

  var pendingProgress = {};   // docId → kayıt
  var pendingLookups = {};    // word  → kayıt
  var flushTimer = null;
  var flushWaiters = [];
  var writeChain = Promise.resolve();

  // Birleştirme işlemlerini sıraya sokar ki iki hızlı çağrı birbirini ezmesin.
  function enqueue(fn) {
    var run = writeChain.then(function () { return fn(); });
    writeChain = run.catch(function () { /* zincir kırılmasın */ });
    return run;
  }

  function scheduleFlush() {
    return new Promise(function (resolve, reject) {
      flushWaiters.push({ resolve: resolve, reject: reject });
      if (flushTimer === null) {
        flushTimer = setTimeout(function () { flushNow(); }, WRITE_DELAY);
      }
    });
  }

  function flushNow() {
    if (flushTimer !== null) { clearTimeout(flushTimer); flushTimer = null; }

    var waiters = flushWaiters; flushWaiters = [];
    var prog = [], look = [], k;
    for (k in pendingProgress) if (Object.prototype.hasOwnProperty.call(pendingProgress, k)) prog.push(pendingProgress[k]);
    for (k in pendingLookups) if (Object.prototype.hasOwnProperty.call(pendingLookups, k)) look.push(pendingLookups[k]);
    pendingProgress = {}; pendingLookups = {};

    if (!waiters.length && !prog.length && !look.length) return Promise.resolve();

    var job = ready().then(function () {
      return backend.putMany("progress", prog);
    }).then(function () {
      return backend.putMany("lookups", look);
    });

    job.then(
      function () { waiters.forEach(function (w) { w.resolve(); }); },
      function (e) { waiters.forEach(function (w) { w.reject(e); }); }
    );
    return job.catch(function () { /* bekleyenlere zaten iletildi */ });
  }

  // Bekleyen tüm yazmaları hemen diske indirir (sayfa kapanışı, dışa aktarım).
  function flush() {
    return ready()
      .then(function () { return writeChain; })
      .then(function () { return flushNow(); });
  }

  /* =================================================================== API */

  var api = {};

  api.engine = null;

  // Depolama katmanı hazır olduğunda çözülür; her metot içeride de çağırır.
  api.ready = function () { return ready(); };

  api.flush = flush;

  /* ------------------------------------------------------- okuma ilerlemesi */

  // Bir belgenin kayıtlı ilerlemesini döndürür; hiç okunmadıysa null.
  api.getProgress = function (docId) {
    return settled().then(function () {
      if (Object.prototype.hasOwnProperty.call(pendingProgress, docId)) return clone(pendingProgress[docId]);
      return backend.get("progress", docId);
    });
  };

  // İlerlemeyi birleştirerek yazar (400 ms bekletmeli); yalnız verilen alanlar değişir.
  api.setProgress = function (docId, patch) {
    if (!docId) return Promise.reject(new Error("setProgress: docId gerekli"));
    var p = isObj(patch) ? patch : {};
    return ready().then(function () {
      return enqueue(function () {
        var cur = Object.prototype.hasOwnProperty.call(pendingProgress, docId)
          ? Promise.resolve(pendingProgress[docId])
          : backend.get("progress", docId);
        return Promise.resolve(cur).then(function (rec) {
          var next = rec ? clone(rec) : { docId: docId, pct: 0, sectionId: null, seconds: 0, finishedAt: null };
          for (var f in p) if (Object.prototype.hasOwnProperty.call(p, f)) next[f] = p[f];
          next.docId = docId;
          // Sona gelindiyse bitiş anını bir kez işaretle.
          if (!next.finishedAt && Number(next.pct) >= 99) next.finishedAt = now();
          next.updatedAt = now();
          pendingProgress[docId] = next;
        });
      });
    }).then(scheduleFlush);
  };

  // Tüm belgelerin ilerlemesi; en son güncellenen başta.
  api.allProgress = function () {
    return settled().then(function () { return backend.getAll("progress"); }).then(function (rows) {
      var byId = {}, i;
      for (i = 0; i < rows.length; i++) byId[rows[i].docId] = rows[i];
      for (var k in pendingProgress) if (Object.prototype.hasOwnProperty.call(pendingProgress, k)) byId[k] = pendingProgress[k];
      var out = [];
      for (var d in byId) if (Object.prototype.hasOwnProperty.call(byId, d)) out.push(clone(byId[d]));
      out.sort(function (a, b) { return stampOf(b) - stampOf(a); });
      return out;
    });
  };

  /* --------------------------------------------------- sözcük arama telemetrisi */

  function normWord(w) { return String(w == null ? "" : w).trim().toLowerCase(); }

  // Bir sözcüğün arandığını kaydeder; sayacı artırır (400 ms bekletmeli).
  api.logLookup = function (word, docId, source) {
    var w = normWord(word);
    if (!w) return Promise.resolve();
    var src = source === "live" ? "live" : "dict";
    return ready().then(function () {
      return enqueue(function () {
        var cur = Object.prototype.hasOwnProperty.call(pendingLookups, w)
          ? Promise.resolve(pendingLookups[w])
          : backend.get("lookups", w);
        return Promise.resolve(cur).then(function (rec) {
          var next = rec ? clone(rec) : { word: w, count: 0, lastAt: 0, docIds: [], sources: { dict: 0, live: 0 } };
          if (!next.sources) next.sources = { dict: 0, live: 0 };
          if (!Array.isArray(next.docIds)) next.docIds = [];
          next.count = (Number(next.count) || 0) + 1;
          next.sources[src] = (Number(next.sources[src]) || 0) + 1;
          if (docId && next.docIds.indexOf(docId) === -1) next.docIds.push(docId);
          next.lastAt = now();
          next.updatedAt = next.lastAt;
          pendingLookups[w] = next;
        });
      });
    }).then(scheduleFlush);
  };

  function mergedLookups() {
    return settled().then(function () { return backend.getAll("lookups"); }).then(function (rows) {
      var byWord = {}, i;
      for (i = 0; i < rows.length; i++) byWord[rows[i].word] = rows[i];
      for (var k in pendingLookups) if (Object.prototype.hasOwnProperty.call(pendingLookups, k)) byWord[k] = pendingLookups[k];
      var out = [];
      for (var w in byWord) if (Object.prototype.hasOwnProperty.call(byWord, w)) out.push(byWord[w]);
      return out;
    });
  }

  // En çok aranan sözcükler; sayısı çok olan başta. limit yoksa hepsi döner.
  api.topLookups = function (limit) {
    return mergedLookups().then(function (rows) {
      rows.sort(function (a, b) {
        return (b.count - a.count) || (b.lastAt - a.lastAt) || (a.word < b.word ? -1 : 1);
      });
      var n = (typeof limit === "number" && limit > 0) ? limit : rows.length;
      return rows.slice(0, n).map(function (r) {
        return { word: r.word, count: r.count, lastAt: r.lastAt, docIds: (r.docIds || []).slice() };
      });
    });
  };

  // Kaç farklı sözcük arandı ve toplam kaç arama yapıldı.
  api.lookupTotal = function () {
    return mergedLookups().then(function (rows) {
      var total = 0;
      for (var i = 0; i < rows.length; i++) total += Number(rows[i].count) || 0;
      return { distinct: rows.length, total: total };
    });
  };

  /* -------------------------------------------------- sözcük defteri (SRS kutulu) */

  function dueAtFor(box, from) {
    var b = Math.min(Math.max(Math.round(box) || 1, 1), SRS_MAX_BOX);
    return from + SRS_DAYS[b] * DAY;
  }

  // Sözcüğü deftere ekler; zaten varsa çeviri/tanım güncellenir, kutusu korunur.
  api.addVocab = function (entry) {
    var e = isObj(entry) ? entry : {};
    var key = normWord(e.key);
    if (!key) return Promise.reject(new Error("addVocab: key gerekli"));
    return ready().then(function () {
      return backend.get("vocab", key);
    }).then(function (old) {
      var t = now();
      var rec = old ? clone(old) : {
        key: key, srsBox: 1, dueAt: dueAtFor(1, t), addedAt: t, reviews: 0, correct: 0
      };
      if (e.tr !== undefined) rec.tr = e.tr;
      if (e.def !== undefined) rec.def = e.def;
      if (e.pos !== undefined) rec.pos = e.pos;
      if (e.docId !== undefined) rec.docId = e.docId;
      rec.updatedAt = t;
      return backend.put("vocab", rec).then(function () { return clone(rec); });
    });
  };

  // Sözcüğü defterden siler.
  api.removeVocab = function (key) {
    var k = normWord(key);
    return ready().then(function () { return backend.del("vocab", k); }).then(function () { return true; });
  };

  // Defterdeki sözcükler; tekrar zamanı (dueAt) yaklaşan başta olacak şekilde sıralı.
  api.listVocab = function () {
    return ready().then(function () { return backend.getAll("vocab"); }).then(function (rows) {
      rows.sort(function (a, b) {
        return ((a.dueAt || 0) - (b.dueAt || 0)) || ((a.addedAt || 0) - (b.addedAt || 0));
      });
      return rows;
    });
  };

  // Tekrar sonucunu işler: doğruysa kutu +1 (en çok 5), yanlışsa kutu 1'e döner.
  // Gecikmeler: 1→1 gün, 2→3, 3→7, 4→16, 5→35 gün.
  api.reviewVocab = function (key, correct) {
    var k = normWord(key);
    return ready().then(function () { return backend.get("vocab", k); }).then(function (rec) {
      if (!rec) { warn("reviewVocab: defterde yok → " + k); return null; }
      var t = now();
      var box = Math.min(Math.max(Number(rec.srsBox) || 1, 1), SRS_MAX_BOX);
      rec.srsBox = correct ? Math.min(box + 1, SRS_MAX_BOX) : 1;
      rec.dueAt = dueAtFor(rec.srsBox, t);
      rec.reviews = (Number(rec.reviews) || 0) + 1;
      if (correct) rec.correct = (Number(rec.correct) || 0) + 1;
      rec.lastReviewAt = t;
      rec.updatedAt = t;
      return backend.put("vocab", rec).then(function () { return clone(rec); });
    });
  };

  /* ------------------------------------------------------------ serbest notlar */

  // Alıntı + not kaydeder; oluşturulan kaydı (id ile birlikte) döndürür.
  api.addNote = function (n) {
    var o = isObj(n) ? n : {};
    var t = now();
    var rec = {
      docId: o.docId || null,
      quote: o.quote || "",
      note: o.note || "",
      sectionId: o.sectionId || null,
      createdAt: t,
      updatedAt: t
    };
    return ready().then(function () { return backend.put("notes", rec); })
      .then(function (id) { rec.id = rec.id || id; return clone(rec); });
  };

  // Notlar; docId verilirse yalnız o belgeninkiler, en yeni başta.
  api.listNotes = function (docId) {
    return ready().then(function () {
      return docId ? backend.byIndex("notes", "docId", docId) : backend.getAll("notes");
    }).then(function (rows) {
      rows.sort(newestFirst);
      return rows;
    });
  };

  // Notu siler.
  api.removeNote = function (id) {
    var nid = Number(id);
    return ready().then(function () { return backend.del("notes", nid); }).then(function () { return true; });
  };

  /* ------------------------------------------------------------------- sınav */

  // Bir sınav denemesinin sonucunu kaydeder.
  /* --------------------------------------------------- kullanıcı belgeleri */

  /** Yüklenen belgeyi (üstveri + gövde) saklar. Belge modeli site
      belgeleriyle aynı biçimde; `user:true` ile işaretlenir. */
  api.putUserDoc = function (doc) {
    if (!isObj(doc) || !doc.id) return Promise.reject(new Error("putUserDoc: id gerekli"));
    var rec = clone(doc);
    rec.user = true;
    rec.updatedAt = now();
    rec.createdAt = rec.createdAt || rec.updatedAt;
    return ready().then(function () { return backend.put("userDocs", rec); })
      .then(function () { return clone(rec); });
  };

  api.getUserDoc = function (id) {
    return ready().then(function () { return backend.get("userDocs", id); });
  };

  api.listUserDocs = function () {
    return ready().then(function () { return backend.getAll("userDocs"); })
      .then(function (rows) { return (rows || []).slice().sort(newestFirst); });
  };

  api.removeUserDoc = function (id) {
    return ready().then(function () { return backend.del("userDocs", id); });
  };

  api.saveQuizRun = function (run) {
    var o = isObj(run) ? run : {};
    var t = now();
    var rec = {
      docId: o.docId || null,
      score: Number(o.score) || 0,
      total: Number(o.total) || 0,
      answers: Array.isArray(o.answers) ? o.answers : [],
      at: t,
      createdAt: t,
      updatedAt: t
    };
    return ready().then(function () { return backend.put("quizRuns", rec); })
      .then(function (id) { rec.id = rec.id || id; return clone(rec); });
  };

  // Sınav denemeleri; docId verilirse yalnız o belgeninkiler, en yeni başta.
  api.quizRuns = function (docId) {
    return ready().then(function () {
      return docId ? backend.byIndex("quizRuns", "docId", docId) : backend.getAll("quizRuns");
    }).then(function (rows) {
      rows.sort(newestFirst);
      return rows;
    });
  };

  /* -------------------------------------------------- okuma oturumu (süre ölçümü) */

  // Okuma oturumunu başlatır; bitirmek için gereken sessionId'yi döndürür.
  api.beginSession = function (docId) {
    var t = now();
    var rec = { docId: docId || null, startedAt: t, endedAt: null, words: 0, minutes: 0, updatedAt: t };
    return ready().then(function () { return backend.put("sessions", rec); })
      .then(function (id) { return rec.id || id; });
  };

  // Oturumu kapatır ve süresini dakikaya çevirir (okunan sözcük sayısıyla birlikte).
  api.endSession = function (sessionId, words) {
    var sid = Number(sessionId);
    return ready().then(function () { return backend.get("sessions", sid); }).then(function (rec) {
      if (!rec) { warn("endSession: oturum bulunamadı → " + sid); return null; }
      var t = now();
      rec.endedAt = t;
      rec.words = Number(words) || 0;
      rec.minutes = Math.min(MAX_SESSION_MIN, Math.max(0, Math.round((t - rec.startedAt) / 600) / 100));
      rec.updatedAt = t;
      return backend.put("sessions", rec).then(function () { return clone(rec); });
    });
  };

  // Toplam okuma dakikası, okuma yapılan farklı gün sayısı ve güncel seri (streak).
  api.sessionsTotal = function () {
    return ready().then(function () { return backend.getAll("sessions"); }).then(function (rows) {
      var minutes = 0, days = {};
      for (var i = 0; i < rows.length; i++) {
        minutes += Number(rows[i].minutes) || 0;
        if (rows[i].startedAt) days[dayKey(rows[i].startedAt)] = true;
      }
      // Seri: bugün (yoksa dün) başlangıç alınır, geriye doğru kesintisiz günler sayılır.
      var d = new Date(); d.setHours(0, 0, 0, 0);
      if (!days[dayKey(d.getTime())]) d.setDate(d.getDate() - 1);
      var streak = 0;
      while (days[dayKey(d.getTime())]) { streak++; d.setDate(d.getDate() - 1); }
      return { minutes: Math.round(minutes), days: Object.keys(days).length, streak: streak };
    });
  };

  /* ------------------------------------------------------------ taşınabilirlik */

  // Tüm depoları tek bir JSON metnine alır (şema sürümü ve tarih dahil).
  api.exportAll = function () {
    return flush().then(function () {
      return Promise.all(STORES.map(function (d) { return backend.getAll(d.name); }));
    }).then(function (all) {
      var data = {};
      STORES.forEach(function (d, i) { data[d.name] = all[i]; });
      return JSON.stringify({
        app: "reading-library",
        schema: SCHEMA_VERSION,
        engine: engine,
        exportedAt: new Date().toISOString(),
        data: data
      }, null, 2);
    });
  };

  // Otomatik id'li store'larda aynı kaydı mı yoksa farklı bir kaydı mı işaret
  // ettiğini anlamak için basit parmak izi.
  function sigOf(name, rec) {
    if (name === "sessions") return String(rec.docId) + "|" + String(rec.startedAt);
    if (name === "quizRuns") return String(rec.docId) + "|" + String(rec.at || rec.createdAt);
    return String(rec.docId) + "|" + String(rec.createdAt) + "|" + String(rec.quote || "");
  }

  // Dışa aktarılmış JSON'u mevcut veriyle birleştirir; çakışmada yeni tarihli kazanır.
  api.importAll = function (json) {
    var parsed;
    try {
      parsed = (typeof json === "string") ? JSON.parse(json) : json;
    } catch (e) {
      return Promise.reject(new Error("İçe aktarma başarısız: dosya geçerli bir JSON değil (" + e.message + ")"));
    }
    if (!isObj(parsed)) return Promise.reject(new Error("İçe aktarma başarısız: beklenen biçim bir JSON nesnesi."));

    var data = isObj(parsed.data) ? parsed.data : parsed;
    var known = STORES.some(function (d) { return Array.isArray(data[d.name]); });
    if (!known) return Promise.reject(new Error("İçe aktarma başarısız: dosyada tanınan hiçbir bölüm yok (progress, vocab, notes…)."));

    var report = { added: 0, updated: 0, skipped: 0 };

    return flush().then(function () {
      // Store'lar sırayla işlenir; her biri kendi içinde tek geçişte yazılır.
      return STORES.reduce(function (chain, d) {
        return chain.then(function () {
          var rows = Array.isArray(data[d.name]) ? data[d.name] : [];
          if (!rows.length) return null;
          return backend.getAll(d.name).then(function (existing) {
            var byKey = {}, bySig = {}, i;
            for (i = 0; i < existing.length; i++) {
              byKey[String(existing[i][d.keyPath])] = existing[i];
              if (d.autoInc) bySig[sigOf(d.name, existing[i])] = existing[i];
            }
            var writes = [];
            for (i = 0; i < rows.length; i++) {
              var inc = rows[i];
              if (!isObj(inc)) { report.skipped++; continue; }
              var old;
              if (d.autoInc) {
                // Aynı parmak izi varsa o kaydın üstüne yaz, yoksa yeni id ile ekle.
                old = bySig[sigOf(d.name, inc)];
                if (old) {
                  if (stampOf(inc) > stampOf(old)) {
                    inc[d.keyPath] = old[d.keyPath]; writes.push(inc); report.updated++;
                  } else report.skipped++;
                } else if (byKey[String(inc[d.keyPath])]) {
                  inc[d.keyPath] = null; writes.push(inc); report.added++;   // id çakıştı → yeni id ver
                } else {
                  writes.push(inc); report.added++;
                }
              } else {
                if (inc[d.keyPath] === undefined || inc[d.keyPath] === null) { report.skipped++; continue; }
                old = byKey[String(inc[d.keyPath])];
                if (!old) { writes.push(inc); report.added++; }
                else if (stampOf(inc) > stampOf(old)) { writes.push(inc); report.updated++; }
                else report.skipped++;
              }
            }
            // autoInc store'larda id ataması gerekebildiği için tek tek yazılır.
            if (!d.autoInc) return backend.putMany(d.name, writes);
            return writes.reduce(function (c, rec) {
              return c.then(function () { return backend.put(d.name, rec); });
            }, Promise.resolve());
          });
        });
      }, Promise.resolve());
    }).then(function () { return report; });
  };

  // Tüm kalıcı veriyi siler (bekleyen yazmalar dahil).
  api.clearAll = function () {
    if (flushTimer !== null) { clearTimeout(flushTimer); flushTimer = null; }
    pendingProgress = {}; pendingLookups = {};
    var waiters = flushWaiters; flushWaiters = [];
    waiters.forEach(function (w) { w.resolve(); });
    return ready().then(function () {
      return STORES.reduce(function (chain, d) {
        return chain.then(function () { return backend.clear(d.name); });
      }, Promise.resolve());
    }).then(function () { return true; });
  };

  /* ------------------------------------------------- sayfa kapanışında boşaltma */

  if (typeof global.addEventListener === "function") {
    global.addEventListener("pagehide", function () { flushNow(); });
    global.addEventListener("visibilitychange", function () {
      if (global.document && global.document.visibilityState === "hidden") flushNow();
    });
  }

  global.Store = api;

})(typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : this));
