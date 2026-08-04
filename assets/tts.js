/* =====================================================================
   assets/tts.js — seslendirme motoru  (window.TTS)

   Web Speech API (speechSynthesis) tabanlıdır: ağ bağlantısı gerekmez,
   ses işletim sisteminin yerel motorundan gelir. ES modülü YOKTUR;
   klasik <script> ile yüklenir, file:// altında da çalışır.

   Tasarım kararları
   -----------------
   * Her paragraf AYRI bir SpeechSynthesisUtterance'tır. Tek dev utterance
     kurulduğunda tarayıcılar uzun metni ortadan kesiyor.
   * Çok uzun paragraflar ayrıca ~700 karakterlik parçalara bölünür; bölme
     noktası önce cümle sonu, sonra virgül, en sonunda boşluktur.
   * BİLİNEN HATA (Chrome/Edge, masaüstü): yaklaşık 15 saniyeden uzun
     konuşmalarda motor sessizce susar. 10 saniyede bir pause()+resume()
     yapan bir "keep-alive" zamanlayıcısı bunu canlandırır; stop() bu
     zamanlayıcıyı temizler.
   * BİLİNEN EKSİK (Safari): "boundary" olayı hiç tetiklenmez. Sözcük
     vurgusu sessizce atlanır, paragraf vurgusu çalışmaya devam eder.
   ===================================================================== */

(function (global, doc) {
  "use strict";

  var SYN = global.speechSynthesis;
  var UTT = global.SpeechSynthesisUtterance;

  /* ------------------------- sabitler ------------------------- */
  var RATE_MIN = 0.5, RATE_MAX = 1.5;
  var CHUNK_MAX = 700;        // tek utterance'a verilecek azami karakter
  var KEEPALIVE_MS = 10000;   // Chrome 15 sn hatası için canlandırma aralığı
  var USER_SCROLL_MS = 4000;  // elle kaydırdıktan sonra oto-kaydırma molası
  var PROG_SCROLL_MS = 1400;  // kendi yumuşak kaydırmamızın tahmini süresi
  var CANCEL_GAP_MS = 90;     // cancel() hemen ardından speak() yutuluyor
  var DEFAULT_SKIP =
    ".tts-skip,[data-tts-skip],button,.p-tr-btn,[aria-hidden='true']";

  /* Keep-alive yalnız masaüstü Chromium'da gerekli. Firefox ve Android'de
     pause()/resume() konuşmayı bozabildiği için oralarda kapalıdır. */
  var UA = (global.navigator && navigator.userAgent) || "";
  var IS_CHROMIUM = /Chrome|Chromium|Edg\//.test(UA) && !/OPR\//.test(UA);
  var IS_MOBILE = /Android|iPhone|iPad|iPod/.test(UA);
  var NEEDS_KEEPALIVE = IS_CHROMIUM && !IS_MOBILE;

  /* --------------------------- durum --------------------------- */
  var nodes = [];             // okunacak DOM ögeleri
  var nodeIdx = -1;           // o an okunan öge
  var nodeText = "";          // etkin ögenin düz metni
  var nodeChunks = [];        // [{text, offset}]
  var chunkIdx = 0;
  var session = 0;            // her iptalde artar; eski geri çağrılar susar
  var playing = false, paused = false;
  var rate = 1, pitch = 1, volume = 1;
  var voice = null;           // SpeechSynthesisVoice
  var lang = "en-US";
  var activeNode = null;      // .tts-active taşıyan öge
  var wordSpan = null;        // .tts-word sarmalayıcısı
  var segs = null;            // etkin ögenin metin düğümü haritası
  var opt = {};               // speak() seçenekleri
  var boundarySeen = false;   // Safari'de hiç true olmaz
  var startedOnce = false;    // en az bir utterance gerçekten başladı mı
  var failCount = 0;
  var kaTimer = null;
  var voicesCache = [];
  var voicesSig = "";
  var listeners = {};
  var userScrollUntil = 0, progScrollUntil = 0;
  var bound = false;

  /* ======================= küçük yardımcılar ======================= */

  function clamp(n, lo, hi) {
    n = parseFloat(n);
    if (!isFinite(n)) return lo;
    return n < lo ? lo : (n > hi ? hi : n);
  }

  function emit(ev, data) {
    var ls = listeners[ev];
    if (!ls) return;
    for (var i = 0; i < ls.length; i++) {
      try { ls[i](data || {}); } catch (e) { /* dinleyici hatası motoru durdurmasın */ }
    }
  }

  function stateSnapshot() {
    return {
      playing: playing, paused: paused,
      nodeIndex: nodeIdx, total: nodes.length,
      rate: rate, voice: voice ? voice.name : null
    };
  }

  function pushState() { emit("state", stateSnapshot()); }

  function reduceMotion() {
    try {
      return global.matchMedia &&
             global.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) { return false; }
  }

  /* ======================= ses (voice) yönetimi ======================= */

  /* en-US / en-GB sesleri en öne, diğer İngilizce sesler arkalarına gelir;
     eşitlikte çevrimdışı (localService) ses tercih edilir. */
  function voiceRank(v) {
    var l = (v.lang || "").replace("_", "-").toLowerCase();
    var prime = (l === "en-us" || l === "en-gb");
    var en = l.indexOf("en") === 0;
    var local = v.localService ? 0 : 1;   // çevrimdışı ses önce
    if (prime) return 0 + local;
    if (en) return 2 + local;
    return 4 + local;
  }

  function sortedVoices(all) {
    var list = voicesCache.slice();
    if (!all) {
      var en = list.filter(function (v) {
        return ((v.lang || "").toLowerCase().indexOf("en") === 0);
      });
      /* Sistemde hiç İngilizce ses yoksa liste boş kalmasın diye
         tümünü döndürürüz. */
      if (en.length) list = en;
    }
    return list.sort(function (a, b) {
      var d = voiceRank(a) - voiceRank(b);
      if (d) return d;
      return (a.name || "").localeCompare(b.name || "");
    });
  }

  function toPublic(v) {
    return {
      name: v.name, lang: v.lang, "default": !!v["default"],
      voiceURI: v.voiceURI, local: !!v.localService
    };
  }

  function pickDefaultVoice() {
    if (voice && voicesCache.indexOf(voice) !== -1) return;
    var list = sortedVoices(false);
    voice = list.length ? list[0] : null;
  }

  /* Chrome'da getVoices() ilk çağrıda boş döner; "voiceschanged" olayını
     beklemek ve ayrıca birkaç kez yoklamak gerekir. */
  function refreshVoices() {
    var v = [];
    try { v = SYN ? (SYN.getVoices() || []) : []; } catch (e) { v = []; }
    var sig = v.length + "|" + (v[0] ? v[0].name : "");
    if (sig === voicesSig) return v.length;
    voicesSig = sig;
    voicesCache = v;
    pickDefaultVoice();
    if (v.length) emit("voices", { list: sortedVoices(false).map(toPublic) });
    return v.length;
  }

  function watchVoices() {
    if (!SYN) return;
    try {
      if ("onvoiceschanged" in SYN) SYN.onvoiceschanged = refreshVoices;
      SYN.addEventListener && SYN.addEventListener("voiceschanged", refreshVoices);
    } catch (e) { /* yoksay */ }
    var tries = [0, 120, 300, 600, 1200, 2400, 4000];
    tries.forEach(function (ms) { global.setTimeout(refreshVoices, ms); });
  }

  /* ==================== metin çıkarma + konum haritası ==================== */

  /* Ögenin okunacak düz metnini ve her metin düğümünün metin içindeki
     aralığını çıkarır. charIndex → metin düğümü eşlemesi buna dayanır. */
  function extract(el, skipSel) {
    var text = "", list = [];
    (function walk(n) {
      for (var ch = n.firstChild; ch; ch = ch.nextSibling) {
        if (ch.nodeType === 3) {                 // metin düğümü
          if (!ch.data) continue;
          list.push({ node: ch, start: text.length, end: text.length + ch.data.length });
          text += ch.data;
        } else if (ch.nodeType === 1) {          // öge
          if (ch.hidden) continue;
          if (skipSel) {
            try { if (ch.matches(skipSel)) continue; } catch (e) { /* seçici hatası */ }
          }
          walk(ch);
        }
      }
    })(el);
    return { text: text, segs: list };
  }

  function segAt(pos) {
    if (!segs) return null;
    for (var i = 0; i < segs.length; i++) {
      if (pos >= segs[i].start && pos < segs[i].end) return segs[i];
    }
    return null;
  }

  /* Uzun paragrafı cümle → virgül → boşluk önceliğiyle böler. */
  function splitChunks(text) {
    var out = [], pos = 0;
    if (text.length <= CHUNK_MAX) return [{ text: text, offset: 0 }];
    while (pos < text.length) {
      if (text.length - pos <= CHUNK_MAX) {
        out.push({ text: text.slice(pos), offset: pos });
        break;
      }
      var win = text.slice(pos, pos + CHUNK_MAX);
      var cut = -1, m;
      var sent = /[.!?…][)"'”’]?\s/g;
      while ((m = sent.exec(win))) cut = m.index + m[0].length;
      if (cut < CHUNK_MAX * 0.4) {
        var comma = win.lastIndexOf(", ");
        if (comma > CHUNK_MAX * 0.4) cut = comma + 2;
      }
      if (cut < CHUNK_MAX * 0.4) {
        var sp = win.lastIndexOf(" ");
        cut = sp > 0 ? sp + 1 : CHUNK_MAX;
      }
      out.push({ text: text.slice(pos, pos + cut), offset: pos });
      pos += cut;
    }
    return out;
  }

  /* ========================= vurgulama ========================= */

  function unwrapWord() {
    if (!wordSpan) return;
    var p = wordSpan.parentNode;
    if (p) {
      while (wordSpan.firstChild) p.insertBefore(wordSpan.firstChild, wordSpan);
      p.removeChild(wordSpan);
      try { p.normalize(); } catch (e) { /* yoksay */ }
    }
    wordSpan = null;
    /* Sarmalama DOM'u böldüğü için harita her seferinde yenilenir. */
    if (activeNode) segs = extract(activeNode, opt.skip).segs;
  }

  /* charIndex/charLength → <span class="tts-word"> sarmalaması.
     Sözcük düğüm sınırını aşarsa (nadir) vurgu sessizce atlanır. */
  function wrapWord(charIndex, charLength) {
    unwrapWord();
    if (opt.highlight === false) return;
    var seg = segAt(charIndex);
    if (!seg) return;
    var data = seg.node.data;
    var s = charIndex - seg.start;
    var e;
    if (charLength > 0) {
      e = s + charLength;
    } else {
      /* Firefox charLength vermez: sonraki sınırlayıcıya kadar tara. */
      e = s;
      while (e < data.length && !/[\s.,;:!?()"'’“”]/.test(data.charAt(e))) e++;
      if (e === s) e = s + 1;
    }
    if (e > data.length) e = data.length;
    if (s < 0 || e <= s) return;
    if (!/\S/.test(data.slice(s, e))) return;    // salt boşluk vurgulanmasın
    var r = doc.createRange();
    try {
      r.setStart(seg.node, s);
      r.setEnd(seg.node, e);
      var span = doc.createElement("span");
      span.className = "tts-word";
      r.surroundContents(span);
      wordSpan = span;
    } catch (err) {
      wordSpan = null;                            // sarmalanamadı, sorun değil
    }
  }

  function setActive(el) {
    clearActive();
    activeNode = el;
    if (el && el.classList) el.classList.add("tts-active");
  }

  function clearActive() {
    unwrapWord();
    if (activeNode && activeNode.classList) activeNode.classList.remove("tts-active");
    activeNode = null;
    segs = null;
  }

  /* Sayfada kalmış artık vurgu varsa (beklenmedik kesinti) temizler. */
  function sweep() {
    var i, list;
    list = doc.querySelectorAll(".tts-word");
    for (i = 0; i < list.length; i++) {
      var w = list[i], p = w.parentNode;
      if (!p) continue;
      while (w.firstChild) p.insertBefore(w.firstChild, w);
      p.removeChild(w);
      try { p.normalize(); } catch (e) { /* yoksay */ }
    }
    list = doc.querySelectorAll(".tts-active");
    for (i = 0; i < list.length; i++) list[i].classList.remove("tts-active");
  }

  /* ======================= otomatik kaydırma ======================= */

  function noteUserScroll() { userScrollUntil = Date.now() + USER_SCROLL_MS; }

  function bindScrollWatch() {
    if (bound || !global.addEventListener) return;
    bound = true;
    var o = { passive: true, capture: true };
    global.addEventListener("wheel", noteUserScroll, o);
    global.addEventListener("touchmove", noteUserScroll, o);
    global.addEventListener("keydown", function (e) {
      var k = e.key;
      if (k === "ArrowUp" || k === "ArrowDown" || k === "PageUp" ||
          k === "PageDown" || k === "Home" || k === "End" || k === " ") noteUserScroll();
    }, o);
    /* Kaydırma çubuğu sürüklemesi de sayılsın; ama kendi yumuşak
       kaydırmamızın doğurduğu scroll olayları yok sayılır. */
    global.addEventListener("scroll", function () {
      if (Date.now() < progScrollUntil) return;
      noteUserScroll();
    }, o);
    global.addEventListener("pagehide", function () { stop(); });
  }

  function inComfortZone(el) {
    var r = el.getBoundingClientRect();
    var vh = global.innerHeight || doc.documentElement.clientHeight;
    if (r.height >= vh * 0.8) return r.top <= vh * 0.4 && r.bottom >= vh * 0.2;
    return r.top >= vh * 0.12 && r.bottom <= vh * 0.88;
  }

  /* Aktif paragraf görünmüyorsa ortaya kaydırır. Kullanıcı son 4 saniye
     içinde elle kaydırdıysa hiç karışmaz. */
  function maybeScroll(el) {
    if (!el || opt.scroll === false) return;
    if (Date.now() < userScrollUntil) return;
    try {
      if (inComfortZone(el)) return;
      progScrollUntil = Date.now() + PROG_SCROLL_MS;
      el.scrollIntoView({
        block: "center",
        behavior: reduceMotion() ? "auto" : "smooth"
      });
    } catch (e) {
      try { el.scrollIntoView(); } catch (e2) { /* yoksay */ }
    }
  }

  /* ========================== keep-alive ========================== */

  /* Chrome ~15 sn sonra susuyor; pause()+resume() motoru canlandırır. */
  function startKeepAlive() {
    stopKeepAlive();
    if (opt.keepAlive === false) return;
    if (!(opt.keepAlive === true || NEEDS_KEEPALIVE)) return;
    kaTimer = global.setInterval(function () {
      if (!playing || paused) return;            // kullanıcı duraklattıysa dokunma
      if (!SYN || !SYN.speaking || SYN.paused) return;
      try { SYN.pause(); SYN.resume(); } catch (e) { /* yoksay */ }
    }, KEEPALIVE_MS);
  }

  function stopKeepAlive() {
    if (kaTimer) { global.clearInterval(kaTimer); kaTimer = null; }
  }

  /* ========================= konuşma akışı ========================= */

  /* Devam eden her şeyi iptal eder ve eski geri çağrıları geçersiz kılar. */
  function hardCancel() {
    session++;
    stopKeepAlive();
    if (!SYN) return;
    try { if (SYN.paused) SYN.resume(); } catch (e) { /* yoksay */ }
    try { SYN.cancel(); } catch (e) { /* yoksay */ }
  }

  /* i. ögeyi hazırlar; metni boşsa false döner (öge atlanır). */
  function prepare(i) {
    var el = nodes[i];
    if (!el || !el.nodeType) return false;
    var ex = extract(el, opt.skip);
    if (!/\S/.test(ex.text)) return false;
    nodeText = ex.text;
    segs = ex.segs;
    nodeChunks = splitChunks(ex.text);
    chunkIdx = 0;
    return true;
  }

  function speakNode(i, delay) {
    var my = session;
    clearActive();
    while (i < nodes.length && !prepare(i)) i++;
    if (i >= nodes.length) { finish("done"); return; }
    nodeIdx = i;
    setActive(nodes[i]);
    emit("para", { nodeIndex: i, node: nodes[i], text: nodeText });
    pushState();
    maybeScroll(nodes[i]);
    if (delay) {
      global.setTimeout(function () { if (my === session) speakChunk(); }, delay);
    } else {
      speakChunk();
    }
  }

  function speakChunk() {
    if (chunkIdx >= nodeChunks.length) { speakNode(nodeIdx + 1, 0); return; }
    var my = session;
    var chunk = nodeChunks[chunkIdx];
    var u = new UTT(chunk.text);
    u.rate = rate; u.pitch = pitch; u.volume = volume;
    u.lang = (voice && voice.lang) || lang;
    if (voice) u.voice = voice;

    u.onstart = function () {
      if (my !== session) return;
      startedOnce = true;
      failCount = 0;
      startKeepAlive();
    };

    u.onboundary = function (e) {
      if (my !== session) return;
      if (e.name && e.name !== "word") return;   // cümle sınırları ilgilendirmiyor
      boundarySeen = true;
      var ci = (e.charIndex || 0) + chunk.offset;
      wrapWord(ci, e.charLength || 0);
      emit("word", {
        nodeIndex: nodeIdx, charIndex: ci,
        word: wordSpan ? wordSpan.textContent : "",
        node: nodes[nodeIdx]
      });
    };

    u.onend = function () {
      if (my !== session) return;
      unwrapWord();
      chunkIdx++;
      speakChunk();
    };

    u.onerror = function (e) {
      if (my !== session) return;
      var why = (e && e.error) || "";
      /* Kendi iptalimizden doğan hatalar sessizce yutulur. */
      if (why === "interrupted" || why === "canceled") return;
      if (why === "not-allowed") {
        emit("error", { error: why, message:
          "Tarayıcı sesi engelledi: seslendirmeyi bir düğmeye basarak başlatın." });
        finish("error");
        return;
      }
      failCount++;
      emit("error", { error: why || "synthesis-failed", nodeIndex: nodeIdx,
        message: "Bu paragraf seslendirilemedi." });
      /* Hiç ses üretilemiyorsa (motor yok) sonsuz döngüye girmeyelim. */
      if (!startedOnce && failCount >= 3) { finish("error"); return; }
      chunkIdx++;
      speakChunk();
    };

    try {
      SYN.speak(u);
    } catch (err) {
      emit("error", { error: "speak-failed", message: String(err && err.message || err) });
      finish("error");
    }
  }

  function finish(reason) {
    stopKeepAlive();
    clearActive();
    playing = false; paused = false;
    nodeChunks = []; chunkIdx = 0;
    pushState();
    emit("end", { reason: reason || "done", nodeIndex: nodeIdx, total: nodes.length });
  }

  /* ============================ genel API ============================ */

  /* Tarayıcı seslendirmeyi destekliyor mu? Ses listesi boş olsa bile
     API varsa true döner (sesler geç yüklenebilir). */
  function available() {
    return !!(SYN && typeof UTT === "function");
  }

  /* Kullanılabilir sesler; en-US/en-GB önde, çevrimdışı sesler öncelikli.
     all=true verilirse sistemdeki tüm diller döner. */
  function voices(all) {
    refreshVoices();
    return sortedVoices(!!all).map(toPublic);
  }

  /* Verilen DOM ögelerini sırayla seslendirir; her öge ayrı utterance olur.
     opts: {rate, pitch, volume, voice, lang, startIndex, scroll, highlight,
            skip, keepAlive} */
  function speak(list, opts) {
    if (!available()) {
      emit("error", { error: "unsupported",
        message: "Bu tarayıcı seslendirmeyi desteklemiyor." });
      return false;
    }
    opts = opts || {};
    hardCancel();
    sweep();

    nodes = normalizeNodes(list);
    if (!nodes.length) {
      emit("error", { error: "empty", message: "Seslendirilecek metin bulunamadı." });
      return false;
    }

    opt = {
      skip: opts.skip === undefined ? DEFAULT_SKIP : opts.skip,
      scroll: opts.scroll !== false,
      highlight: opts.highlight !== false,
      keepAlive: opts.keepAlive
    };
    if (opts.rate !== undefined) rate = clamp(opts.rate, RATE_MIN, RATE_MAX);
    if (opts.pitch !== undefined) pitch = clamp(opts.pitch, 0, 2);
    if (opts.volume !== undefined) volume = clamp(opts.volume, 0, 1);
    if (opts.lang) lang = opts.lang;
    if (opts.voice) setVoice(opts.voice);
    if (!voice) { refreshVoices(); pickDefaultVoice(); }

    playing = true; paused = false;
    startedOnce = false; failCount = 0;
    var start = Math.max(0, Math.min(nodes.length - 1, opts.startIndex | 0));
    /* Chrome'da cancel()'ın hemen ardından gelen speak() yutulabiliyor;
       ilk utterance küçük bir gecikmeyle kuyruğa girer. */
    speakNode(start, CANCEL_GAP_MS);
    return true;
  }

  function normalizeNodes(list) {
    if (!list) return [];
    if (list.nodeType === 1) list = [list];
    var out = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].nodeType === 1) out.push(list[i]);
    }
    return out;
  }

  /* Konuşmayı duraklatır. Bazı Android sürümlerinde pause() çalışmaz;
     o durumda paragraf iptal edilir, resume() paragrafı baştan okur. */
  function pause() {
    if (!playing || paused) return;
    paused = true;
    stopKeepAlive();
    try { SYN.pause(); } catch (e) { /* yoksay */ }
    var my = session;
    global.setTimeout(function () {
      if (my !== session || !paused) return;
      if (SYN.speaking && !SYN.paused) {
        hardCancel();          // duraklatılamadı: kes, resume() baştan alsın
        chunkIdx = Math.max(0, chunkIdx);
      }
    }, 250);
    pushState();
  }

  /* Duraklatılmış konuşmayı sürdürür. */
  function resume() {
    if (!playing || !paused) return;
    paused = false;
    if (SYN.paused) {
      try { SYN.resume(); } catch (e) { /* yoksay */ }
    } else if (!SYN.speaking) {
      session++;               // pause() kesintiye dönmüştü: paragrafı yenile
      speakNode(Math.max(0, nodeIdx), CANCEL_GAP_MS);
      return;
    }
    startKeepAlive();
    pushState();
  }

  /* Konuşmayı tamamen durdurur, vurguları ve keep-alive'ı temizler. */
  function stop() {
    var wasOn = playing;
    hardCancel();
    clearActive();
    sweep();
    playing = false; paused = false;
    nodeChunks = []; chunkIdx = 0;
    pushState();
    if (wasOn) emit("end", { reason: "stop", nodeIndex: nodeIdx, total: nodes.length });
  }

  /* Okuma hızını ayarlar (0.5–1.5). Konuşma sürüyorsa yeni hız hemen
     duyulsun diye o paragraf baştan okunur (API akışta hız değiştirmiyor). */
  function setRate(r) {
    var v = clamp(r, RATE_MIN, RATE_MAX);
    if (v === rate) return rate;
    rate = v;
    if (playing) {
      var i = Math.max(0, nodeIdx);
      hardCancel();
      paused = false;
      speakNode(i, CANCEL_GAP_MS);
    } else {
      pushState();
    }
    return rate;
  }

  /* Sesi seçer; ad, voiceURI ya da SpeechSynthesisVoice kabul eder.
     Konuşma sürüyorsa geçerli paragraf yeni sesle baştan okunur. */
  function setVoice(v) {
    refreshVoices();
    var found = null;
    if (v && typeof v === "object" && v.voiceURI !== undefined && v.speak === undefined) {
      /* Public nesne ya da gerçek voice: ada göre eşle. */
      v = v.name || v.voiceURI;
    }
    if (typeof v === "string") {
      for (var i = 0; i < voicesCache.length; i++) {
        if (voicesCache[i].name === v || voicesCache[i].voiceURI === v) {
          found = voicesCache[i]; break;
        }
      }
    } else if (v && v.name) {
      found = v;
    }
    if (!found) return false;
    if (found === voice) return true;
    voice = found;
    if (playing) {
      var idx = Math.max(0, nodeIdx);
      hardCancel();
      paused = false;
      speakNode(idx, CANCEL_GAP_MS);
    } else {
      pushState();
    }
    return true;
  }

  /* Sonraki paragrafa atlar. */
  function next() {
    if (!playing) return;
    var i = nodeIdx + 1;
    hardCancel();
    paused = false;
    if (i >= nodes.length) { finish("done"); return; }
    speakNode(i, CANCEL_GAP_MS);
  }

  /* Önceki paragrafa döner; paragrafın ortasındaysak onu baştan alır. */
  function prev() {
    if (!playing) return;
    var i = (chunkIdx > 0) ? nodeIdx : nodeIdx - 1;
    if (i < 0) i = 0;
    hardCancel();
    paused = false;
    speakNode(i, CANCEL_GAP_MS);
  }

  /* Olay dinleyicisi ekler: "word" | "para" | "end" | "state" | "voices" |
     "error". Dinleyiciyi kaldıran bir fonksiyon döner. */
  function on(ev, cb) {
    if (typeof cb !== "function") return function () {};
    (listeners[ev] = listeners[ev] || []).push(cb);
    return function () { off(ev, cb); };
  }

  /* Daha önce eklenmiş bir dinleyiciyi kaldırır. */
  function off(ev, cb) {
    var ls = listeners[ev];
    if (!ls) return;
    var i = ls.indexOf(cb);
    if (i !== -1) ls.splice(i, 1);
  }

  /* O anki durumu döner: {playing, paused, nodeIndex, total, rate, voice}. */
  function state() { return stateSnapshot(); }

  /* Tarayıcı sözcük vurgusunu (boundary olayı) veriyor mu?
     Safari vermez; henüz konuşulmadıysa null döner. */
  function wordHighlightSupported() {
    if (boundarySeen) return true;
    return startedOnce ? false : null;
  }

  /* --------------------------- kurulum --------------------------- */
  bindScrollWatch();
  if (available()) watchVoices();

  global.TTS = {
    available: available,
    voices: voices,
    speak: speak,
    pause: pause,
    resume: resume,
    stop: stop,
    setRate: setRate,
    on: on,
    /* --- sözleşme dışı, panelin kullandığı yardımcılar --- */
    off: off,
    setVoice: setVoice,
    next: next,
    prev: prev,
    state: state,
    wordHighlightSupported: wordHighlightSupported,
    RATE_MIN: RATE_MIN,
    RATE_MAX: RATE_MAX
  };
})(window, document);
