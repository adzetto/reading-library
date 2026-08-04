/* ==================================================================
   tts-audio.js — önceden üretilmiş anlatım sesini çalar

   Ses, Colab'da Higgs-Audio v2 (3B) gibi büyük bir modelle üretilir ve
   `assets/audio/<docid>/` altına konur. Tarayıcıda model çalıştırmaya
   gerek kalmaz: kalite stüdyo düzeyinde, başlangıç anında olur.

   Beklenen düzen:
     assets/audio/<docid>/manifest.js   → window.AUDIO["<docid>"] = {...}
     assets/audio/<docid>/<id>.opus     → parça sesleri

   manifest biçimi:
     { id, voice, model, format, sr,
       items: [ {id, node, part, dur} , … ] }

   window.AudioTTS:
     has(docId)                  → bu belge için ses var mı
     load(docId)                 → Promise<manifest|null>
     speak(nodes, {docId,start}) → sıradan çalmaya başlar
     pause() resume() stop()
     setRate(r) / getRate()
     seekTo(nodeIndex)
     on(ev, cb)   ev: para|end|error|buffering
================================================================== */
(function (global) {
  "use strict";

  var manifests = {};        // docId → manifest
  var listeners = {};
  var audio = null;          // <audio> ögesi
  var queue = [];            // {node, item, src}
  var qi = 0;
  var playing = false;
  var stopped = true;
  var rate = 1;
  var curDoc = null;

  function emit(ev, d) {
    (listeners[ev] || []).forEach(function (f) { try { f(d); } catch (e) {} });
  }

  function el() {
    if (!audio) {
      audio = new Audio();
      audio.preload = "auto";
      audio.addEventListener("ended", next);
      audio.addEventListener("waiting", function () { emit("buffering", true); });
      audio.addEventListener("playing", function () { emit("buffering", false); });
      audio.addEventListener("error", function () {
        // tek parça bozuksa tüm anlatım durmasın
        if (!stopped) next();
      });
    }
    return audio;
  }

  /* ---------------------------- manifest ---------------------------- */
  function has(docId) {
    return !!(global.AUDIO && global.AUDIO[docId]);
  }

  function load(docId) {
    if (docId in manifests) return Promise.resolve(manifests[docId]);
    if (has(docId)) {
      manifests[docId] = global.AUDIO[docId];
      return Promise.resolve(manifests[docId]);
    }
    // Ses üretilmiş belgelerin manifesti `assets/audio/index.js` içinde
    // listelenir. Liste yoksa ya da belge listede değilse ağ isteği hiç
    // yapılmaz — yoksa her belgede 404 konsolu kirletir.
    var idx = global.AUDIO_INDEX;
    if (!idx || idx.indexOf(docId) < 0) {
      manifests[docId] = null;
      return Promise.resolve(null);
    }
    return new Promise(function (res) {
      var s = document.createElement("script");
      s.src = "assets/audio/" + docId + "/manifest.js";
      s.async = true;
      s.onload = function () {
        manifests[docId] = (global.AUDIO || {})[docId] || null;
        res(manifests[docId]);
      };
      s.onerror = function () { manifests[docId] = null; res(null); };
      document.head.appendChild(s);
    });
  }

  /* ------------------------------ çalma ------------------------------ */
  function srcFor(docId, item, man) {
    return "assets/audio/" + docId + "/" + item.id + "." + (man.format || "opus");
  }

  function playAt(i) {
    if (stopped || i >= queue.length) {
      if (!stopped) { playing = false; stopped = true; emit("end", {}); }
      return;
    }
    qi = i;
    var q = queue[i];
    var a = el();
    a.src = q.src;
    a.playbackRate = rate;
    emit("para", { index: q.nodeIndex, node: q.node, item: q.item, part: q.item.part });
    var p = a.play();
    if (p && p.catch) p.catch(function (e) {
      // otomatik oynatma engeli: kullanıcı etkileşimi gerekiyor
      playing = false;
      emit("error", e);
    });
    playing = true;
  }

  function next() {
    if (stopped) return;
    playAt(qi + 1);
  }

  var API = {
    has: has,
    load: load,
    manifest: function (d) { return manifests[d] || null; },

    /**
     * nodes: sitedeki okunabilir DOM ögeleri (sırası manifest ile aynı).
     * opts: {docId, start}  start = başlanacak düğüm sırası
     */
    speak: function (nodes, opts) {
      opts = opts || {};
      var docId = opts.docId;
      var self = this;
      return load(docId).then(function (man) {
        if (!man) { emit("error", new Error("ses yok")); return false; }
        self.stop();
        stopped = false;
        curDoc = docId;
        queue = [];
        man.items.forEach(function (it) {
          var n = nodes[it.node];
          if (!n) return;
          queue.push({ node: n, nodeIndex: it.node, item: it,
                       src: srcFor(docId, it, man) });
        });
        if (!queue.length) return false;
        var start = 0;
        if (opts.start != null) {
          for (var k = 0; k < queue.length; k++)
            if (queue[k].nodeIndex >= opts.start) { start = k; break; }
        }
        playAt(start);
        return true;
      });
    },

    pause: function () {
      if (audio && playing) { audio.pause(); playing = false; }
    },
    resume: function () {
      if (audio && !playing && !stopped) {
        var p = audio.play();
        if (p && p.catch) p.catch(function () {});
        playing = true;
      }
    },
    stop: function () {
      stopped = true; playing = false;
      if (audio) { try { audio.pause(); } catch (e) {} audio.removeAttribute("src"); }
      qi = 0;
    },

    /** Belirli bir düğümden itibaren çal. */
    seekTo: function (nodeIndex) {
      for (var k = 0; k < queue.length; k++) {
        if (queue[k].nodeIndex >= nodeIndex) { stopped = false; playAt(k); return; }
      }
    },

    isPlaying: function () { return playing; },
    nodeIndex: function () { return queue[qi] ? queue[qi].nodeIndex : -1; },
    setRate: function (r) {
      rate = Math.max(0.5, Math.min(2, r));
      if (audio) audio.playbackRate = rate;
    },
    getRate: function () { return rate; },

    on: function (ev, cb) { (listeners[ev] = listeners[ev] || []).push(cb); return this; },
    off: function (ev, cb) {
      if (listeners[ev])
        listeners[ev] = listeners[ev].filter(function (f) { return f !== cb; });
      return this;
    }
  };

  global.AudioTTS = API;
  global.addEventListener("pagehide", function () { API.stop(); });
})(window);
