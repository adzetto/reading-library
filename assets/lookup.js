/* ------------------------------------------------------------------
   lookup.js — İngilizce sözcük / seçim → Türkçe karşılık motoru

   Üç katman:
     1. Yerel sözlük (dict-*.js)  — anında, çevrimdışı, alana özgü
     2. Biçimbirim çözümleyici    — çekimli biçimi köke indirger
     3. Canlı çeviri servisi      — sözlükte olmayan sözcük ve tüm
        cümle/öbek seçimleri için (Google gtx → MyMemory yedeği)
   Sonuçlar localStorage'da önbelleğe alınır.
------------------------------------------------------------------ */
(function (global) {
  "use strict";

  /* ---------------- 1. sözlüğü birleştir ---------------- */
  const DICT = Object.create(null);
  (global.__DICT_PARTS__ || []).forEach((part) => {
    for (const k in part) DICT[k] = part[k];
  });

  /* ---- uzun açıklamalar: istek üzerine -------------------------------
     dict-ext.js'teki 2000 madde açılışta yalnızca [tür, karşılık] olarak
     geliyor; uzun Türkçe açıklama gzip'li boyutun %79'uydu ve ancak biri
     bir sözcüğe dokunduğunda okunuyor. Açılır pencere zaten eşzamansız,
     bu yüzden ilk aramada getirmek görünür bir gecikme yaratmıyor.
     fetch değil <script> enjeksiyonu: site file:// ile de açılabilmeli. */
  let DEFS = global.__DICT_DEFS__ || null;
  let defsSoz = DEFS ? Promise.resolve() : null;
  let defsCoz = null;

  /** dict-ext-def.js yüklendiğinde kendisi çağırır. */
  function defsReady() {
    DEFS = global.__DICT_DEFS__ || {};
    if (defsCoz) { defsCoz(); defsCoz = null; }
  }

  /** Açıklamalar gelene kadar bekleyen söz; yüklenemezse yine çözülür. */
  function ensureDefs() {
    if (defsSoz) return defsSoz;
    const d = global.document;
    if (!d || !d.head) { DEFS = DEFS || {}; return (defsSoz = Promise.resolve()); }
    defsSoz = new Promise((cz) => {
      defsCoz = cz;
      const s = d.createElement("script");
      s.src = "assets/dict-ext-def.js";
      /* Ağ hatası ya da eksik dosya aramayı kilitlemesin: karşılık zaten
         elimizde, kaybedilen yalnızca açıklama satırı. */
      s.onerror = function () { DEFS = DEFS || {}; defsReady(); };
      d.head.appendChild(s);
    });
    return defsSoz;
  }

  /* ---------------- 2. biçimbirim çözümleyici ---------------- */
  const IRREG = {
    was: "be", were: "be", been: "be", being: "be", is: "be", are: "be",
    am: "be", "isn't": "be", has: "have", had: "have", having: "have",
    does: "do", did: "do", done: "do", doing: "do",
    men: "man", women: "woman", children: "child", people: "person",
    better: "good", best: "good", worse: "bad", worst: "bad",
    higher: "high", highest: "high", lower: "low", lowest: "low",
    greater: "great", greatest: "great", larger: "large", largest: "large",
    longer: "long", longest: "long", shorter: "short", milder: "mild",
    safer: "safe", wider: "wide", widest: "wide", more: "much", most: "much",
    less: "little", least: "little", further: "far", furthest: "far",
    found: "find", led: "lead", made: "make", met: "meet", sold: "sell",
    left: "leave", lost: "lose", read: "read", shown: "show", showed: "show",
    taken: "take", took: "take", given: "give", gave: "give", known: "know",
    knew: "know", drawn: "draw", drew: "draw", thought: "think",
    sought: "seek", brought: "bring", built: "build", spent: "spend",
    kept: "keep", held: "hold", felt: "feel", fell: "fall", began: "begin",
    begun: "begin", arose: "arise", arisen: "arise", ran: "run",
    came: "come", went: "go", gone: "go", saw: "see", seen: "see",
    said: "say", put: "put", set: "set", cut: "cut", chose: "choose",
    became: "become", become: "become", got: "get", gotten: "get",
    wrote: "write", written: "write", ran: "run", sat: "sit",
    analyses: "analysis", criteria: "criterion", phenomena: "phenomenon",
    indices: "index", hypotheses: "hypothesis", theses: "thesis",
    matrices: "matrix", lives: "life", wives: "wife", selves: "self",
    halves: "half", housewives: "housewife", statuses: "status",
    traumas: "trauma", data: "data", media: "medium", stimuli: "stimulus",
  };

  /** Bir sözcük için olası kök adaylarını üretir (en olasıdan başlayarak). */
  function candidates(w) {
    const c = [w];
    const push = (x) => { if (x && x.length > 1 && !c.includes(x)) c.push(x); };
    if (IRREG[w]) push(IRREG[w]);

    // Amerikan / İngiliz yazım
    push(w.replace(/ise\b/, "ize"));
    push(w.replace(/ize\b/, "ise"));
    push(w.replace(/isation\b/, "ization"));
    push(w.replace(/our\b/, "or"));

    // çoğul / üçüncü tekil
    if (/ies$/.test(w)) push(w.slice(0, -3) + "y");
    if (/(sses|shes|ches|xes|zes|oes)$/.test(w)) push(w.slice(0, -2));
    if (/s$/.test(w) && !/(ss|us|is)$/.test(w)) push(w.slice(0, -1));

    // -ed
    if (/ied$/.test(w)) push(w.slice(0, -3) + "y");
    if (/ed$/.test(w)) {
      const s = w.slice(0, -2);
      push(s); push(s + "e");
      if (/(.)\1$/.test(s)) push(s.slice(0, -1));          // stopped → stop
    }
    // -ing
    if (/ing$/.test(w)) {
      const s = w.slice(0, -3);
      push(s); push(s + "e");
      if (/(.)\1$/.test(s)) push(s.slice(0, -1));          // running → run
      push(s.replace(/y$/, "ie"));
    }
    // -ly / -ally
    if (/ally$/.test(w)) push(w.slice(0, -4) + "al");
    if (/ly$/.test(w)) { push(w.slice(0, -2)); push(w.slice(0, -2) + "e"); }
    // -er / -est
    if (/est$/.test(w)) { push(w.slice(0, -3)); push(w.slice(0, -3) + "e"); }
    if (/er$/.test(w)) { push(w.slice(0, -2)); push(w.slice(0, -1)); }
    // türetimler
    if (/ness$/.test(w)) push(w.slice(0, -4));
    if (/ment$/.test(w)) push(w.slice(0, -4));
    if (/tion$/.test(w)) { push(w.slice(0, -3) + "e"); push(w.slice(0, -4)); }
    if (/ation$/.test(w)) { push(w.slice(0, -5) + "e"); push(w.slice(0, -5)); }
    if (/ity$/.test(w)) push(w.slice(0, -3) + "e");
    // tireli bileşiğin ilk/son parçası
    if (w.includes("-")) w.split("-").forEach(push);
    return c;
  }

  function localLookup(word) {
    const w = word.toLowerCase().replace(/[’']s$/, "").replace(/^[^a-z]+|[^a-z-]+$/g, "");
    if (!w) return null;
    for (const cand of candidates(w)) {
      const e = DICT[cand];
      if (e) {
        /* Açıklama ya maddenin kendisinde (elle yazılan sözlük) ya da
           sonradan gelen DEFS'te (dict-ext). Henüz gelmediyse boş. */
        const def = e[2] || (DEFS && DEFS[cand]) || "";
        return { key: cand, pos: e[0], tr: e[1], def: def,
                 inflected: cand !== w ? w : null, source: "dict" };
      }
    }
    return null;
  }

  /* ---------------- 3. canlı çeviri ---------------- */
  const CACHE_KEY = "jadr_tr_cache_v1";
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch (e) { cache = {}; }
  let cacheDirty = false;
  setInterval(() => {
    if (!cacheDirty) return;
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch (e) {}
    cacheDirty = false;
  }, 4000);

  function withTimeout(p, ms) {
    return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
  }

  async function google(text) {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx" +
      "&sl=en&tl=tr&dt=t&dt=bd&dj=1&q=" + encodeURIComponent(text);
    const r = await withTimeout(fetch(url), 7000);
    if (!r.ok) throw new Error("http " + r.status);
    const j = await r.json();
    const main = (j.sentences || []).map((s) => s.trans || "").join("").trim();
    const alts = [];
    (j.dict || []).forEach((d) => {
      (d.terms || []).slice(0, 5).forEach((t) => { if (!alts.includes(t)) alts.push(t); });
    });
    if (!main) throw new Error("empty");
    return { tr: main, alts, engine: "Google" };
  }

  async function myMemory(text) {
    const url = "https://api.mymemory.translated.net/get?langpair=en|tr&q=" +
      encodeURIComponent(text.slice(0, 480));
    const r = await withTimeout(fetch(url), 8000);
    if (!r.ok) throw new Error("http " + r.status);
    const j = await r.json();
    const main = (j.responseData && j.responseData.translatedText || "").trim();
    if (!main) throw new Error("empty");
    return { tr: main, alts: [], engine: "MyMemory" };
  }

  async function live(text) {
    const key = "t:" + text;
    if (cache[key]) return Object.assign({ cached: true }, cache[key]);
    let res = null, err = null;
    for (const fn of [google, myMemory]) {
      try { res = await fn(text); break; } catch (e) { err = e; }
    }
    if (!res) throw err || new Error("çeviri alınamadı");
    cache[key] = res; cacheDirty = true;
    return res;
  }

  /* ---------------- dışa açılan API ---------------- */
  const API = {
    dict: DICT,
    size: Object.keys(DICT).length,
    candidates,

    ensureDefs,
    defsReady,

    /** Tek sözcük: önce yerel sözlük, yoksa canlı servis. */
    async word(w) {
      let hit = localLookup(w);
      /* Karşılık var ama açıklama yok: dosya henüz gelmemiş olabilir.
         Bekleyip bir kez daha bak — kullanıcı zaten dönen çarkı görüyor. */
      if (hit && !hit.def && !DEFS) { await ensureDefs(); hit = localLookup(w); }
      if (hit) return hit;
      const raw = w.toLowerCase().replace(/[^a-z’'-]/g, "");
      if (!raw) return null;
      try {
        const r = await live(raw);
        return { key: raw, pos: "", tr: r.tr, def: "", alts: r.alts,
                 source: r.engine, cached: r.cached };
      } catch (e) {
        return { key: raw, pos: "", tr: "", def: "", source: "error",
                 error: e.message };
      }
    },

    /** Yerel sözlükte var mı — ağ beklemeden bilmek için. */
    peek: localLookup,

    /** Öbek / cümle: canlı servis + içindeki terimlerin yerel karşılıkları. */
    async phrase(text) {
      const clean = text.replace(/\s+/g, " ").trim();
      const terms = [];
      const seen = new Set();
      (clean.toLowerCase().match(/[a-z][a-z’'-]+/g) || []).forEach((w) => {
        if (seen.has(w)) return;
        seen.add(w);
        const h = localLookup(w);
        if (h && h.tr) terms.push({ w, tr: h.tr, key: h.key });
      });
      let tr = "", engine = "", error = "";
      try {
        const r = await live(clean);
        tr = r.tr; engine = r.engine;
      } catch (e) { error = e.message; }
      return { text: clean, tr, engine, error, terms: terms.slice(0, 14) };
    },
  };

  global.Lookup = API;
})(window);
