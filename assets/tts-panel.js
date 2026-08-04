/* ==================================================================
   tts-panel.js — seslendirme kumandası + iki dilli transkript

   İki motor:
     • Nöral (Kokoro-82M)  — doğal ses, ilk kullanımda ~90 MB indirir
     • Tarayıcı (speechSynthesis) — anında başlar, robotik

   Panel okunan paragrafın İngilizcesini ve Türkçesini yan yana gösterir.
   window.TTSPanel.mount(host, {getNodes, translate})
================================================================== */
(function (global) {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var ic = function (n, s) { return global.icon ? global.icon(n, s || 16) : ""; };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var P = null;          // panel kökü
  var cfg = null;
  var engine = "browser";
  var nodes = [];
  var curIdx = -1;
  var trCache = {};
  var playing = false;

  /* --------------------------- görünüm --------------------------- */
  function html() {
    return '' +
      '<div class="ttsp-head">' +
        '<span class="ttsp-badge" id="ttspEngine"></span>' +
        '<b>Seslendirme</b>' +
        '<button class="ttsp-x" id="ttspClose" aria-label="Kapat">' + ic("close", 15) + '</button>' +
      '</div>' +
      '<div class="ttsp-ctrls">' +
        '<button id="ttspPrev" title="Önceki paragraf" aria-label="Önceki">' + ic("prev") + '</button>' +
        '<button id="ttspPlay" class="ttsp-main" title="Oynat / duraklat" aria-label="Oynat">' + ic("play") + '</button>' +
        '<button id="ttspNext" title="Sonraki paragraf" aria-label="Sonraki">' + ic("next") + '</button>' +
        '<button id="ttspStop" title="Durdur" aria-label="Durdur">' + ic("stop") + '</button>' +
        '<label class="ttsp-rate" title="Hız">' +
          '<span id="ttspRateV">1.0×</span>' +
          '<input type="range" id="ttspRate" min="0.6" max="1.6" step="0.1" value="1">' +
        '</label>' +
        '<select id="ttspVoice" title="Ses" aria-label="Ses"></select>' +
      '</div>' +
      '<div class="ttsp-load" id="ttspLoad" hidden>' +
        '<div class="ttsp-load-t"></div><div class="ttsp-load-bar"><i></i></div>' +
      '</div>' +
      '<div class="ttsp-tx" id="ttspTx">' +
        '<p class="ttsp-hint">Oynata basınca okunan paragraf burada İngilizce ve ' +
        'Türkçe görünür.</p>' +
      '</div>' +
      '<div class="ttsp-foot">' +
        '<button class="ttsp-sw" id="ttspSwitch"></button>' +
      '</div>';
  }

  /* ------------------------- motor seçimi -------------------------
     "studio" : Colab'da büyük bir modelle (Higgs-Audio v2 3B vb.) önceden
                üretilmiş ses. Kalite yüksek, anında başlar.
     "browser": tarayıcının kendi sesi. Her metin için çalışır ama robotik. */
  function studioOK() {
    return global.AudioTTS && cfg && cfg.docId && global.AudioTTS.has(cfg.docId);
  }
  function browserOK() {
    return global.TTS && global.TTS.available && global.TTS.available();
  }

  function setEngine(e) {
    stop();
    engine = e;
    var b = $("#ttspEngine", P), sw = $("#ttspSwitch", P);
    if (e === "studio") {
      var man = global.AudioTTS.manifest(cfg.docId) || {};
      b.innerHTML = ic("sparkles", 13) + " Stüdyo ses";
      b.className = "ttsp-badge is-neural";
      b.title = man.model ? man.model + " · " + (man.voice || "") : "";
      sw.innerHTML = ic("refresh", 13) + " Tarayıcı sesine geç";
    } else {
      b.innerHTML = ic("volume", 13) + " Tarayıcı sesi";
      b.className = "ttsp-badge";
      b.title = "Tarayıcının kendi sesi";
      sw.innerHTML = ic("sparkles", 13) + " Stüdyo sese geç";
    }
    sw.hidden = !(studioOK() && browserOK());
    fillVoices();
    try { localStorage.setItem("rl_tts_engine", JSON.stringify(e)); } catch (err) {}
  }

  function fillVoices() {
    var sel = $("#ttspVoice", P);
    sel.innerHTML = "";
    if (engine === "studio") {
      var man = global.AudioTTS.manifest(cfg.docId) || {};
      var o = document.createElement("option");
      o.textContent = man.voice || "stüdyo ses";
      sel.appendChild(o);
      sel.disabled = true;
      return;
    }
    sel.disabled = false;
    var vs = (global.TTS.voices && global.TTS.voices()) || [];
    if (!vs.length) { sel.innerHTML = "<option>varsayılan</option>"; return; }
    vs.forEach(function (v, i) {
      var op = document.createElement("option");
      op.value = v.name || i; op.textContent = v.name || "ses " + i;
      sel.appendChild(op);
    });
  }

  /* ------------------------- transkript ------------------------- */
  function showPara(i) {
    curIdx = i;
    var n = nodes[i];
    if (!n) return;
    var en = (n.textContent || "").replace(/\s+/g, " ").replace(/\s*\btr\b\s*$/, "").trim();
    var box = $("#ttspTx", P);
    box.innerHTML =
      '<p class="ttsp-en">' + esc(en) + "</p>" +
      '<p class="ttsp-tr ttsp-wait">Türkçesi çevriliyor…</p>';

    if (trCache[en]) {
      var el = $(".ttsp-tr", box);
      el.textContent = trCache[en]; el.classList.remove("ttsp-wait");
      return;
    }
    if (!cfg.translate) return;
    cfg.translate(en).then(function (tr) {
      if (curIdx !== i) return;               // arada paragraf değiştiyse
      var el = $(".ttsp-tr", $("#ttspTx", P));
      if (!el) return;
      if (tr) { trCache[en] = tr; el.textContent = tr; el.classList.remove("ttsp-wait"); }
      else { el.textContent = "Çeviri servisine ulaşılamadı."; }
    }).catch(function () {
      var el = $(".ttsp-tr", $("#ttspTx", P));
      if (el) el.textContent = "Çeviri servisine ulaşılamadı.";
    });
  }

  function markActive(i) {
    nodes.forEach(function (n) { n.classList.remove("tts-active"); });
    if (nodes[i]) {
      nodes[i].classList.add("tts-active");
      var r = nodes[i].getBoundingClientRect();
      if (r.top < 60 || r.bottom > innerHeight - 180)
        nodes[i].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function setPlayIcon(on) {
    playing = on;
    var b = $("#ttspPlay", P);
    if (b) { b.innerHTML = ic(on ? "pause" : "play"); b.classList.toggle("is-on", on); }
    document.documentElement.classList.toggle("tts-playing", on);
  }

  /* --------------------------- oynatma --------------------------- */
  function loadBar(pct, txt) {
    var w = $("#ttspLoad", P);
    if (!w) return;
    w.hidden = pct >= 1;
    $(".ttsp-load-t", w).textContent = txt || "";
    $(".ttsp-load-bar i", w).style.width = Math.round(pct * 100) + "%";
  }

  function play(startAt) {
    nodes = cfg.getNodes();
    if (!nodes.length) return;
    var i = startAt != null ? startAt : (curIdx >= 0 ? curIdx : firstVisible());

    if (engine === "studio") {
      var A = global.AudioTTS;
      A.on("para", function (e) { markActive(e.index); showPara(e.index); });
      A.on("end", function () { setPlayIcon(false); markActive(-1); });
      A.on("buffering", function (on) { loadBar(on ? 0.5 : 1, on ? "yükleniyor…" : ""); });
      A.on("error", function (err) {
        setPlayIcon(false); loadBar(1, "");
        $("#ttspTx", P).innerHTML =
          '<p class="ttsp-err">Ses çalınamadı: ' + esc(err && err.message || err) +
          "<br>Tarayıcı sesine geçebilirsiniz.</p>";
      });
      setPlayIcon(true);
      A.speak(nodes, { docId: cfg.docId, start: i }).then(function (ok) {
        if (!ok) { setPlayIcon(false); setEngine("browser"); }
      });
    } else {
      var T = global.TTS;
      T.on && T.on("para", function (e) {
        var k = e.nodeIndex != null ? e.nodeIndex : e.index;
        markActive(k); showPara(k);
      });
      T.on && T.on("end", function () { setPlayIcon(false); markActive(-1); });
      setPlayIcon(true);
      T.speak(nodes.slice(i), {});
      markActive(i); showPara(i);
    }
  }

  function firstVisible() {
    for (var i = 0; i < nodes.length; i++)
      if (nodes[i].getBoundingClientRect().bottom > 80) return i;
    return 0;
  }

  function stop() {
    if (global.AudioTTS) global.AudioTTS.stop();
    if (global.TTS && global.TTS.stop) global.TTS.stop();
    setPlayIcon(false);
    markActive(-1);
    loadBar(1, "");
  }

  function toggle() {
    var A = global.AudioTTS;
    if (engine === "studio") {
      if (playing) { A.pause(); setPlayIcon(false); }
      else if (curIdx >= 0 && A.nodeIndex() >= 0) { A.resume(); setPlayIcon(true); }
      else play();
    } else {
      if (playing) { global.TTS.pause(); setPlayIcon(false); }
      else if (curIdx >= 0 && global.TTS.resume) { global.TTS.resume(); setPlayIcon(true); }
      else play();
    }
  }

  function step(d) {
    nodes = cfg.getNodes();
    var i = Math.max(0, Math.min(nodes.length - 1, (curIdx < 0 ? firstVisible() : curIdx) + d));
    stop();
    curIdx = i;
    play(i);
  }

  /* ---------------------------- montaj ---------------------------- */
  var API = {
    mount: function (host, options) {
      cfg = options || {};
      if (P) P.remove();
      P = document.createElement("div");
      P.id = "ttsPanel";
      P.hidden = true;
      P.innerHTML = html();
      (host || document.body).appendChild(P);

      $("#ttspPlay", P).onclick = toggle;
      $("#ttspStop", P).onclick = function () { stop(); curIdx = -1; };
      $("#ttspPrev", P).onclick = function () { step(-1); };
      $("#ttspNext", P).onclick = function () { step(1); };
      $("#ttspClose", P).onclick = function () { stop(); API.hide(); };
      $("#ttspSwitch", P).onclick = function () {
        setEngine(engine === "neural" ? "browser" : "neural");
      };
      $("#ttspRate", P).oninput = function () {
        var r = parseFloat(this.value);
        $("#ttspRateV", P).textContent = r.toFixed(1) + "×";
        if (global.AudioTTS) global.AudioTTS.setRate(r);
        if (global.TTS && global.TTS.setRate) global.TTS.setRate(r);
      };
      $("#ttspVoice", P).onchange = function () {
        if (engine !== "studio" && global.TTS && global.TTS.setVoice)
          global.TTS.setVoice(this.value);
        if (playing) { var i = curIdx; stop(); play(i); }
      };

      // Stüdyo ses varsa varsayılan odur; yoksa tarayıcı sesine düşülür.
      var saved = "browser";
      try { saved = JSON.parse(localStorage.getItem("rl_tts_engine")) || "browser"; }
      catch (e) {}
      var ready = function () {
        if (saved === "studio" && !studioOK()) saved = "browser";
        if (studioOK() && saved !== "browser") saved = "studio";
        if (!browserOK() && studioOK()) saved = "studio";
        setEngine(saved);
      };
      if (global.AudioTTS && cfg.docId) global.AudioTTS.load(cfg.docId).then(ready, ready);
      else ready();
      return API;
    },

    show: function () { if (P) { P.hidden = false; nodes = cfg.getNodes(); } },
    hide: function () { if (P) P.hidden = true; },
    visible: function () { return P && !P.hidden; },
    toggleVisible: function () { this.visible() ? this.hide() : this.show(); },
    playPause: toggle,
    stop: stop,
    destroy: function () { stop(); if (P) { P.remove(); P = null; } }
  };

  global.TTSPanel = API;
})(window);
