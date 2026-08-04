/* ==================================================================
   app.js — yönlendirme, kütüphane, okuyucu
   ================================================================== */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };
  var REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MOBILE = function () { return matchMedia("(max-width:1080px)").matches; };

  /* --- anlık arayüz tercihleri: küçük ve senkron olmalı (Store değil) --- */
  var pref = {
    get: function (k, d) {
      try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  var S = {
    dictOn: pref.get("rl_dict", true),
    markKnown: pref.get("rl_mark", false),
    measure: pref.get("rl_measure", 29),
    theme: pref.get("rl_theme", null)
  };

  var DB = window.Store || window.StoreMock;   // sözleşme §4
  var ic = function (n, s) { return window.icon ? window.icon(n, s || 16) : ""; };

  /* ---- kalıcı arayüz ikonları (bir kez) ---- */
  function paintChrome() {
    var set = function (sel, html) { var e = $(sel); if (e) e.innerHTML = html; };
    set("#brandMark", ic("layers", 18));
    set("#navLib", ic("library", 15) + '<span class="lbl-full">Kütüphane</span>');
    set("#navStats", ic("stats", 15) + '<span class="lbl-full">İlerleme</span>');
    set("#dwClose", ic("close", 16));
  }
  paintChrome();

  /* ============================ TEMA ============================ */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    S.theme = t; pref.set("rl_theme", t);
    var b = $("#themeBtn");
    if (b) { b.innerHTML = ic(t === "dark" ? "sun" : "moon", 16);
             b.title = t === "dark" ? "Açık temaya geç" : "Koyu temaya geç"; }
    if (window.__hero__) window.__hero__.theme(t);
  }
  // Varsayılan açık tema: okuma kâğıdı beyaz başlasın, kullanıcı isterse
  // koyuya geçsin ve tercihi hatırlansın.
  applyTheme(S.theme || "light");
  $("#themeBtn").onclick = function () {
    applyTheme(S.theme === "dark" ? "light" : "dark");
  };

  /* ============================ TOAST ============================ */
  var toastT;
  function toast(msg) {
    var el = $("#toast"); if (!el) return;
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.classList.remove("show"); }, 2400);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ========================= YÖNLENDİRME ========================= */
  var view = $("#view");
  var current = null;          // {name, doc}

  function parseHash() {
    var h = (location.hash || "#/").replace(/^#/, "");
    var p = h.split("/").filter(Boolean);
    if (!p.length) return { name: "library" };
    if (p[0] === "read") return { name: "reader", id: decodeURIComponent(p[1] || "") };
    if (p[0] === "quiz") return { name: "quiz", id: decodeURIComponent(p[1] || "") };
    if (p[0] === "stats") return { name: "stats" };
    return { name: "library" };
  }

  function route() {
    var r = parseHash();
    teardown();
    view.innerHTML = "";
    document.body.classList.toggle("reading", r.name === "reader");
    if (r.name === "reader" && window.DOCS && window.DOCS[r.id]) renderReader(window.DOCS[r.id]);
    else if (r.name === "quiz" && window.DOCS && window.DOCS[r.id]) renderQuiz(window.DOCS[r.id]);
    else if (r.name === "stats") renderStats();
    else renderLibrary();
    scrollTo(0, 0);
  }
  addEventListener("hashchange", route);

  var cleanups = [];
  function teardown() {
    cleanups.forEach(function (f) { try { f(); } catch (e) {} });
    cleanups = [];
    if (window.TTS && TTS.stop) TTS.stop();
    // Görünüm değişince baloncuğun içeriği de sıfırlanmalı; yalnızca
    // gizlemek yetmez, eski HTML'i görünürde kalabiliyor.
    var pop = $("#pop");
    if (pop) pop.innerHTML = '<div class="arrow"></div>';
    hidePop();
    $("#drawer").classList.remove("show");
    $("#scrim").classList.remove("show");
  }

  /* ====================== KÜTÜPHANE GÖRÜNÜMÜ ====================== */
  function docList() {
    var man = window.MANIFEST || [];
    return man.map(function (m) { return window.DOCS && window.DOCS[m.id]; })
      .filter(Boolean)
      .map(function (d, i) { d.__group = (man[i] || {}).group || "Metinler"; return d; });
  }

  function renderLibrary() {
    view.appendChild($("#tpl-library").content.cloneNode(true));
    var docs = docList();

    var totalWords = docs.reduce(function (a, d) { return a + (d.words || 0); }, 0);
    var totalMin = docs.reduce(function (a, d) { return a + (d.minutes || 0); }, 0);
    $("#heroStats").innerHTML =
      '<span><b>' + docs.length + "</b> metin</span>" +
      '<span><b>' + totalWords.toLocaleString("tr") + "</b> sözcük</span>" +
      '<span><b>' + Math.round(totalMin / 60) + "</b> saatlik okuma</span>" +
      '<span><b>' + (window.Lookup ? Lookup.size : 0).toLocaleString("tr") +
      "</b> sözlük maddesi</span>";

    // süzgeçler
    var groups = [];
    docs.forEach(function (d) {
      if (groups.indexOf(d.__group) < 0) groups.push(d.__group);
    });
    var filt = $("#libFilters");
    var chips = ["Tümü"].concat(groups);
    filt.innerHTML = chips.map(function (g, i) {
      return '<button class="btn mini' + (i === 0 ? " on" : "") +
        '" data-filter="' + esc(g) + '">' + esc(g) + "</button>";
    }).join("");
    filt.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filter]"); if (!b) return;
      $$("[data-filter]", filt).forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      var g = b.dataset.filter;
      $$(".card", $("#cards")).forEach(function (c) {
        c.hidden = g !== "Tümü" && c.dataset.group !== g;
      });
    });

    drawCards(docs);
    heroGlobe();
    heroMotion();
  }

  /* Belge tonları sitenin kendi vurgu ailesine dağıtılır: mürekkep mavisi
     (209°) → sıcak kahve (30°). Ham cover.hue değerleri gökkuşağı
     veriyordu; sıraya göre dağıtınca her metnin ayrı ama akraba bir tonu
     oluyor. Küredeki bandHue() ile aynı aralık. */
  function docHue(i, total) {
    var n = Math.max(1, (total || 1) - 1);
    var t = Math.max(0, Math.min(1, i / n));
    return Math.round(209 + (30 - 209) * t);
  }

  function drawCards(docs) {
    var wrap = $("#cards");
    var N = docs.length;
    wrap.innerHTML = docs.map(function (d, di) {
      return '<a class="card" data-group="' + esc(d.__group) + '" ' +
        'href="#/read/' + encodeURIComponent(d.id) + '" ' +
        'style="--hue:' + docHue(di, N) +
        ';--t:' + (N > 1 ? (di / (N - 1)).toFixed(4) : "0") + '">' +
        '<div class="card-top"><span class="card-ic">' +
        ic(d.kind === "book" ? "book" : "article", 20) + "</span>" +
        '<span class="card-badges">' +
        '<span class="badge lvl">' + esc(d.level || "") + "</span>" +
        '<span class="badge">' + esc(d.__group) + "</span></span></div>" +
        "<h3>" + esc(d.title.en) + "</h3>" +
        '<p class="tr-title">' + esc(d.title.tr) + "</p>" +
        '<p class="blurb">' + esc(d.blurb && d.blurb.tr || "") + "</p>" +
        '<div class="meta">' + ic("scroll", 13) + "<b>" +
        (d.words || 0).toLocaleString("tr") + "</b> sözcük" +
        ic("clock", 13) + "<b>" + (d.minutes || 0) + "</b> dk" +
        '<div class="card-prog" data-prog="' + esc(d.id) + '"><i style="width:0"></i></div>' +
        '<span class="pct" data-pct="' + esc(d.id) + '"></span></div></a>';
    }).join("");

    if (!DB) return;
    DB.allProgress().then(function (rows) {
      var byId = {};
      (rows || []).forEach(function (r) { byId[r.docId] = r; });
      docs.forEach(function (d) {
        var p = byId[d.id]; if (!p) return;
        var pct = Math.round((p.pct || 0) * 100);
        var bar = wrap.querySelector('[data-prog="' + d.id + '"] i');
        var lab = wrap.querySelector('[data-pct="' + d.id + '"]');
        if (bar) bar.style.width = Math.min(100, pct) + "%";
        if (lab && pct > 0) lab.textContent = "%" + pct;
        if (p.finishedAt) {
          var c = wrap.querySelector('.card[href$="' + encodeURIComponent(d.id) + '"]');
          if (c) c.classList.add("done");
        }
      });
      // "kaldığın yerden devam"
      var last = (rows || []).slice().sort(function (a, b) {
        return (b.updatedAt || 0) - (a.updatedAt || 0);
      })[0];
      if (last && window.DOCS[last.docId] && (last.pct || 0) > 0.01 && !last.finishedAt) {
        var btn = $("#continueBtn");
        if (btn) {
          btn.hidden = false;
          btn.textContent = "Kaldığım yerden devam: " +
            window.DOCS[last.docId].title.tr.slice(0, 42) +
            " (%" + Math.round(last.pct * 100) + ")";
          btn.onclick = function () { location.hash = "#/read/" + last.docId; };
        }
      }
    }).catch(function () {});
  }

  /* ======================= OKUYUCU GÖRÜNÜMÜ ======================= */
  var reader = null;

  function renderReader(doc) {
    view.appendChild($("#tpl-reader").content.cloneNode(true));
    var article = $("#article");

    // başlık bloğu + gövde
    article.innerHTML =
      '<header class="doc-head">' +
      '<p class="kicker">' + esc(doc.source) + "</p>" +
      "<h1>" + esc(doc.title.en) + "</h1>" +
      '<p class="tr">' + esc(doc.title.tr) + "</p>" +
      '<p class="who">' + esc((doc.authors || []).join(" · ")) + "</p>" +
      "</header>" + doc.html;

    renderTables(article, doc);
    renderFigures(article, doc);
    renderMath(article);
    var count = wordize(article);
    addParaButtons(article);
    buildToc(doc);
    bindReaderControls(doc);
    setupLookupUI(doc);
    setupProgress(doc, count);
    setupTTS(doc);
    revealAnims();
    refreshVocabUI();
  }

  /* ---- tablolar ---- */
  function renderTables(root, doc) {
    var T = doc.tables || window.__TABLES__;
    if (!T) return;
    $$(".tbl-slot", root).forEach(function (slot) {
      var n = slot.dataset.table, t = T[n];
      if (!t) { slot.remove(); return; }
      var w = document.createElement("div");
      w.className = "tbl-wrap"; w.id = slot.id || "";
      w.innerHTML = '<p class="tbl-cap"><b>Table ' + n + ".</b> " +
        (slot.dataset.caption || t.caption || "") + "</p>" +
        buildTable(t) + (t.note ? '<p class="tbl-note">' + t.note + "</p>" : "");
      slot.replaceWith(w);
    });
  }

  function buildTable(t) {
    var h = '<div class="tbl-scroll"><table class="data"><thead><tr>';
    var head = t.head || [];
    if (!head.length && t.rows && t.rows.length) head = t.rows[0].map(function (_, i) { return "#" + i; });
    head.forEach(function (c) { h += "<th>" + c + "</th>"; });
    h += "</tr></thead><tbody>";
    (t.rows || []).forEach(function (r) {
      h += "<tr>" + r.map(function (c, i) {
        var tag = i === 0 ? "th" : "td";
        var v = (c === null || c === undefined || c === "")
          ? '<span class="muted">—</span>'
          : (typeof c === "object" ? JSON.stringify(c) : c);
        return "<" + tag + ">" + v + "</" + tag + ">";
      }).join("") + "</tr>";
    });
    return h + "</tbody></table></div>";
  }

  /* ---- şekiller ---- */
  function renderFigures(root, doc) {
    var F = doc.figures || window.__FIGS__ || {};
    $$(".fig-frame", root).forEach(function (f) {
      var key = (f.dataset.svg || "").split("/").pop().replace(".svg", "");
      if (F[key]) f.innerHTML = F[key];
      var tools = document.createElement("div");
      tools.className = "fig-tools";
      tools.innerHTML = '<button class="btn mini" data-zoom="1">⤢ Büyüt</button>';
      f.appendChild(tools);
    });
  }

  /* ---- matematik ---- */
  var KM = {
    "\\OR": "\\operatorname{OR}", "\\AOR": "\\operatorname{AOR}",
    "\\CI": "\\operatorname{CI}", "\\SE": "\\operatorname{SE}",
    "\\Med": "\\operatorname{Med}", "\\pct": "#1\\,\\%"
  };
  function renderMath(root) {
    if (!window.katex) return;
    $$(".math", root).forEach(function (el) {
      try { katex.render(el.textContent, el, { throwOnError: false, macros: KM }); }
      catch (e) {}
    });
    $$(".eq-body", root).forEach(function (el) {
      try {
        katex.render(el.textContent, el,
          { throwOnError: false, displayMode: true, macros: KM });
      } catch (e) {}
    });
  }

  /* ---- sözcükleri sar ---- */
  var peekCache = new Map();
  function peek(w) {
    var k = w.toLowerCase();
    if (!peekCache.has(k)) peekCache.set(k, window.Lookup ? Lookup.peek(k) : null);
    return peekCache.get(k);
  }

  function wordize(root) {
    var SKIP = /^(SCRIPT|STYLE|CODE|SVG|BUTTON)$/;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!/[A-Za-z]/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        while (p && p !== root) {
          if (SKIP.test(p.tagName.toUpperCase())) return NodeFilter.FILTER_REJECT;
          var c = p.classList;
          if (c && (c.contains("math") || c.contains("eq-body") ||
                    c.contains("katex") || c.contains("p-tr") ||
                    c.contains("tbl-note") || c.contains("kicker") ||
                    c.contains("tr") || c.contains("who")))
            return NodeFilter.FILTER_REJECT;
          p = p.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    var RE = /[A-Za-z][A-Za-z’'-]*/g, count = 0;
    nodes.forEach(function (node) {
      var t = node.nodeValue;
      RE.lastIndex = 0;
      if (!RE.test(t)) return;
      RE.lastIndex = 0;
      var frag = document.createDocumentFragment(), last = 0, m;
      while ((m = RE.exec(t))) {
        if (m.index > last) frag.appendChild(document.createTextNode(t.slice(last, m.index)));
        var s = document.createElement("span");
        s.className = peek(m[0]) ? "w known" : "w";
        s.textContent = m[0];
        frag.appendChild(s);
        last = m.index + m[0].length; count++;
      }
      if (last < t.length) frag.appendChild(document.createTextNode(t.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
    return count;
  }

  /* ---- paragraf çeviri düğmeleri ---- */
  function addParaButtons(root) {
    $$("#article > p, .box > p", root).forEach(function (p) {
      if (p.classList.contains("box-head") || p.classList.contains("keywords")) return;
      if (p.textContent.trim().length < 60) return;
      p.classList.add("p-wrap");
      var b = document.createElement("button");
      b.className = "p-tr-btn"; b.type = "button";
      b.title = "Bu paragrafı Türkçeye çevir"; b.textContent = "tr";
      p.appendChild(b);
    });
  }

  /* ---- içindekiler ---- */
  var tocLinks = [], heads = [], TOC = [];
  function buildToc(doc) {
    TOC = doc.toc || [];
    var ul = $("#toc");
    ul.innerHTML = TOC.map(function (t) {
      return '<li class="l' + t.level + '"><a href="#' + t.id + '">' +
        '<span class="n">' + esc(t.n || "") + "</span><span>" + esc(t.t) + "</span></a></li>";
    }).join("");
    tocLinks = $$("#toc a");
    heads = TOC.map(function (t) { return document.getElementById(t.id); }).filter(Boolean);
    tocLinks.forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        var el = document.getElementById(id.slice(1));
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
        if (MOBILE()) { $("#side").classList.remove("show"); $("#scrim").classList.remove("show"); }
      });
    });
  }

  /* ---- kumanda düğmeleri ---- */
  function bindReaderControls(doc) {
    // sabit ikonlar
    $("#menuBtn").innerHTML = ic("menu", 16);
    $("#narrowBtn").innerHTML = ic("shrink", 15);
    $("#widerBtn").innerHTML = ic("expand", 15);
    $("#ttsBtn").innerHTML = ic("headphones", 16);
    $("#markBtn").innerHTML = ic("underline", 15);
    $("#quizBtn").innerHTML = ic("quiz", 15) + '<span class="lbl-full">Sınav</span>';

    function syncDict() {
      document.documentElement.classList.toggle("dict-off", !S.dictOn);
      var b = $("#dictBtn");
      b.classList.toggle("on", S.dictOn);
      b.innerHTML = ic(S.dictOn ? "languages" : "eye", 15) +
        '<span class="lbl-full">Sözlük</span>';
    }
    $("#dictBtn").onclick = function () {
      S.dictOn = !S.dictOn; pref.set("rl_dict", S.dictOn); syncDict(); hidePop();
    };
    syncDict();

    function syncMark() {
      document.documentElement.classList.toggle("mark-known", S.markKnown);
      $("#markBtn").classList.toggle("on", S.markKnown);
    }
    $("#markBtn").onclick = function () {
      S.markKnown = !S.markKnown; pref.set("rl_mark", S.markKnown); syncMark();
    };
    syncMark();

    function syncMeasure() {
      document.documentElement.style.setProperty("--measure", S.measure + "em");
    }
    syncMeasure();
    $("#widerBtn").onclick = function () {
      S.measure = Math.min(46, S.measure + 3); pref.set("rl_measure", S.measure); syncMeasure();
    };
    $("#narrowBtn").onclick = function () {
      S.measure = Math.max(23, S.measure - 3); pref.set("rl_measure", S.measure); syncMeasure();
    };

    $("#menuBtn").onclick = function () {
      if (MOBILE()) {
        var on = $("#side").classList.toggle("show");
        $("#scrim").classList.toggle("show", on);
        $("#menuBtn").classList.toggle("on", on);
      } else {
        var c = document.documentElement.classList.toggle("side-collapsed");
        pref.set("rl_side", c);
        $("#menuBtn").classList.toggle("on", !c);
      }
    };
    if (pref.get("rl_side", false)) document.documentElement.classList.add("side-collapsed");
    $("#menuBtn").classList.toggle("on",
      !MOBILE() && !document.documentElement.classList.contains("side-collapsed"));

    $("#quizBtn").onclick = function () { location.hash = "#/quiz/" + doc.id; };
    $("#vocabBtn").onclick = openDrawer;
  }

  /* ---- şekil büyütme (tek sefer bağlanır) ---- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-zoom]"); if (!b) return;
    var fr = b.closest(".fig-frame");
    var cur = fr.style.getPropertyValue("--z") || "1";
    var next = cur === "1" ? "1.75" : "1";
    fr.style.setProperty("--z", next);
    var s = fr.querySelector("svg");
    if (s) { s.style.width = next === "1" ? "100%" : next * 100 + "%"; s.style.maxWidth = "none"; }
    b.textContent = next === "1" ? "⤢ Büyüt" : "⤡ Küçült";
  });

  /* ====================== SÖZLÜK BALONCUĞU ====================== */
  var popOpen = false, popCleanup = null;
  function hidePop() {
    var pop = $("#pop"); if (!pop) return;
    pop.classList.remove("show"); popOpen = false;
    if (popCleanup) { popCleanup(); popCleanup = null; }
    pop.style.left = "0px"; pop.style.top = "0px";
  }

  function placePop(ref) {
    var pop = $("#pop"), F = window.FUI;
    var arrow = $(".arrow", pop);
    if (popCleanup) { popCleanup(); popCleanup = null; }
    function run() {
      return F.computePosition(ref, pop, {
        placement: "top",
        middleware: [F.offset(10), F.flip({ padding: 12 }), F.shift({ padding: 12 }),
                     F.arrow({ element: arrow, padding: 8 })]
      }).then(function (r) {
        Object.assign(pop.style, { left: r.x + "px", top: r.y + "px" });
        var a = r.middlewareData.arrow || {};
        var side = r.placement.split("-")[0];
        var opp = { top: "bottom", bottom: "top", left: "right", right: "left" }[side];
        var st = { left: a.x != null ? a.x + "px" : "", top: a.y != null ? a.y + "px" : "",
                   right: "", bottom: "" };
        st[opp] = "-5px";
        st.transform = side === "bottom" ? "rotate(225deg)"
          : side === "top" ? "rotate(45deg)"
          : side === "left" ? "rotate(135deg)" : "rotate(315deg)";
        Object.assign(arrow.style, st);
      });
    }
    run();
    if (ref.nodeType) popCleanup = F.autoUpdate(ref, pop, run);
    pop.classList.add("show"); popOpen = true;
  }

  function srcTag(s) {
    return s === "dict" ? "yerel sözlük" : s === "error" ? "bağlantı yok" : s;
  }

  function setupLookupUI(doc) {
    var article = $("#article"), pop = $("#pop");

    function showWord(el) {
      var raw = el.textContent;
      pop.innerHTML = '<div class="arrow"></div><div class="pop-hd">' +
        '<span class="pop-word">' + esc(raw) + "</span></div>" +
        '<p class="pop-def"><span class="spin"></span> aranıyor…</p>';
      placePop(el);
      Lookup.word(raw).then(function (r) {
        if (!popOpen) return;
        if (!r) { pop.innerHTML = '<div class="arrow"></div><p class="pop-def">Karşılık bulunamadı.</p>'; return; }
        if (DB && DB.logLookup) DB.logLookup(r.key || raw, doc.id, r.source);
        var saved = vocabKeys.has(r.key);
        var h = '<div class="arrow"></div><div class="pop-hd">' +
          '<span class="pop-word">' + esc(r.key) + "</span>" +
          (r.pos ? '<span class="pop-pos">' + esc(r.pos) + "</span>" : "") +
          (r.inflected ? '<span class="pop-from">← ' + esc(r.inflected) + "</span>" : "") +
          "</div>";
        if (r.source === "error") {
          h += '<p class="pop-def">Bu sözcük yerel sözlükte yok ve çeviri servisine ulaşılamadı.</p>';
        } else {
          h += '<p class="pop-tr">' + esc(r.tr) + "</p>";
          if (r.def) h += '<p class="pop-def">' + esc(r.def) + "</p>";
          if (r.alts && r.alts.length)
            h += '<div class="pop-alts">' + r.alts.map(function (a) {
              return "<b>" + esc(a) + "</b>"; }).join("") + "</div>";
        }
        h += '<div class="pop-src"><span class="tag">' + srcTag(r.source) +
          (r.cached ? " · önbellek" : "") + "</span>" +
          '<button class="btn mini" data-save=\'' +
          esc(JSON.stringify({ key: r.key, tr: r.tr, def: r.def || "",
                               pos: r.pos || "", docId: doc.id })) + "'>" +
          (saved ? "✓ kayıtlı" : "+ deftere ekle") + "</button></div>";
        pop.innerHTML = h;
        placePop(el);
      });
    }

    function showPhrase(sel) {
      var txt = sel.toString().replace(/\s+/g, " ").replace(/\s*\btr\b\s*$/, "").trim();
      var rect = sel.getRangeAt(0).getBoundingClientRect();
      var vref = { getBoundingClientRect: function () { return rect; } };
      pop.innerHTML = '<div class="arrow"></div><p class="pop-orig">' +
        esc(txt.slice(0, 400)) + "</p>" +
        '<p class="pop-def"><span class="spin"></span> çevriliyor…</p>';
      placePop(vref);
      Lookup.phrase(txt).then(function (r) {
        if (!popOpen) return;
        var h = '<div class="arrow"></div><p class="pop-orig">' +
          esc(r.text.slice(0, 400)) + "</p>";
        h += r.tr ? '<p class="pop-tr">' + esc(r.tr) + "</p>"
          : '<p class="pop-def"><em>Çeviri servisine ulaşılamadı — aşağıdaki terimler yerel sözlükten.</em></p>';
        if (r.terms.length) {
          h += '<div class="pop-terms">' + r.terms.map(function (t) {
            return '<div class="t"><b>' + esc(t.w) + "</b><span>" + esc(t.tr) + "</span></div>";
          }).join("") + "</div>";
        }
        h += '<div class="pop-src"><span class="tag">' + (r.engine || "yerel sözlük") +
          "</span><span>" + r.text.split(/\s+/).length + " sözcük</span></div>";
        pop.innerHTML = h;
        placePop(vref);
      });
    }

    function onUp(e) {
      if (e.target.closest(".p-tr-btn, .fig-tools, th.sortable")) return;
      setTimeout(function () {
        var sel = getSelection();
        var txt = sel && !sel.isCollapsed ? sel.toString().trim() : "";
        if (txt && /\s/.test(txt) && txt.length > 1) { showPhrase(sel); return; }
        if (!S.dictOn) return;
        var w = e.target.closest(".w");
        if (w) showWord(w); else hidePop();
      }, 10);
    }
    article.addEventListener("mouseup", onUp);
    cleanups.push(function () { article.removeEventListener("mouseup", onUp); });

    // paragraf çevirisi
    function onParaTr(e) {
      var b = e.target.closest(".p-tr-btn"); if (!b) return;
      e.stopPropagation();
      var p = b.closest("p"), nx = p.nextElementSibling;
      if (nx && nx.classList.contains("p-tr")) { nx.remove(); b.classList.remove("on"); return; }
      var box = document.createElement("div");
      box.className = "p-tr";
      box.innerHTML = '<span class="lbl">Türkçe</span><span class="spin"></span> çevriliyor…';
      p.after(box); b.classList.add("on");
      var txt = p.textContent.replace(/\s*tr\s*$/, "").replace(/\s+/g, " ").trim();
      Lookup.phrase(txt).then(function (r) {
        box.innerHTML = '<span class="lbl">Türkçe' + (r.engine ? " · " + r.engine : "") +
          "</span>" + (r.tr ? esc(r.tr)
            : "<em>Çeviri servisine ulaşılamadı. Tek tek sözcüklere tıklamak çevrimdışı da çalışır.</em>");
      });
    }
    article.addEventListener("click", onParaTr);
    cleanups.push(function () { article.removeEventListener("click", onParaTr); });
  }

  document.addEventListener("mousedown", function (e) {
    if (popOpen && !e.target.closest("#pop") && !e.target.closest(".w")) hidePop();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { hidePop(); closeDrawer(); $("#side") && $("#side").classList.remove("show"); }
  });

  /* ======================== SÖZCÜK DEFTERİ ======================== */
  var vocabKeys = new Set();

  function refreshVocabUI() {
    if (!DB) return;
    DB.listVocab().then(function (list) {
      vocabKeys = new Set((list || []).map(function (v) { return v.key; }));
      var vb = $("#vocabBtn");
      if (vb) vb.innerHTML = ic("notebook", 15) +
        '<span class="lbl-full">Defter</span><span id="vocabCount">' +
        (list ? list.length : 0) + "</span>";
      var body = $("#vocabList");
      if (body) {
        body.innerHTML = (!list || !list.length)
          ? '<div class="dw-empty">Defter boş.<br>Metindeki bir sözcüğe tıklayıp <b>+ deftere ekle</b> ile buraya kaydedebilirsiniz.</div>'
          : list.map(function (v) {
              return '<div class="vocab-item"><div class="txt"><b>' + esc(v.key) + "</b>" +
                '<div class="tr">' + esc(v.tr) + "</div>" +
                (v.def ? '<div class="df">' + esc(v.def) + "</div>" : "") +
                '</div><button class="x" data-del="' + esc(v.key) + '" title="Sil">×</button></div>';
            }).join("");
      }
      $$(".w.saved").forEach(function (el) { el.classList.remove("saved"); });
      if (vocabKeys.size) {
        $$("#article .w").forEach(function (el) {
          var h = peek(el.textContent);
          if (h && vocabKeys.has(h.key)) el.classList.add("saved");
        });
      }
    }).catch(function () {});
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-save]");
    if (b && DB) {
      var d = JSON.parse(b.dataset.save);
      if (vocabKeys.has(d.key)) {
        DB.removeVocab(d.key).then(function () {
          b.textContent = "+ deftere ekle"; toast("Defterden çıkarıldı"); refreshVocabUI();
        });
      } else {
        DB.addVocab(d).then(function () {
          b.textContent = "✓ kayıtlı"; toast("Deftere eklendi: " + d.key); refreshVocabUI();
        });
      }
      return;
    }
    var x = e.target.closest("[data-del]");
    if (x && DB) DB.removeVocab(x.dataset.del).then(refreshVocabUI);
  });

  function openDrawer() { $("#drawer").classList.add("show"); $("#scrim").classList.add("show"); }
  function closeDrawer() { $("#drawer").classList.remove("show"); $("#scrim").classList.remove("show"); }
  $("#dwClose").onclick = closeDrawer;
  $("#scrim").onclick = function () {
    closeDrawer(); var s = $("#side"); if (s) s.classList.remove("show");
  };
  $("#dwExport").onclick = function () {
    if (!DB) return;
    DB.listVocab().then(function (list) {
      if (!list || !list.length) return toast("Defter boş");
      var csv = "﻿sözcük;türkçe;tanım\n" + list.map(function (v) {
        return [v.key, v.tr, v.def].map(function (x) {
          return '"' + String(x == null ? "" : x).replace(/"/g, '""') + '"';
        }).join(";");
      }).join("\n");
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      a.download = "sozcuk-defteri.csv"; a.click();
      toast("CSV indirildi");
    });
  };
  $("#dwClear").onclick = function () {
    if (!DB) return;
    DB.listVocab().then(function (list) {
      if (!list || !list.length) return;
      if (!confirm("Defterdeki " + list.length + " sözcük silinsin mi?")) return;
      Promise.all(list.map(function (v) { return DB.removeVocab(v.key); })).then(refreshVocabUI);
    });
  };

  /* ==================== İLERLEME VE OTURUM ==================== */
  function setupProgress(doc, wordCount) {
    var bar = $("#bar"), prog = $("#prog"), posEl = $("#pos");
    var sessionId = null;
    if (DB && DB.beginSession) {
      DB.beginSession(doc.id).then(function (id) { sessionId = id; });
    }
    var maxPct = 0, ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var shell = $("#shell"); if (!shell) return;
        var total = shell.offsetHeight - innerHeight;
        var p = Math.max(0, Math.min(1, (scrollY - shell.offsetTop) / Math.max(1, total)));
        prog.style.width = (p * 100).toFixed(2) + "%";
        bar.classList.add("show");
        if (p > maxPct) maxPct = p;
        var cur = null;
        for (var i = 0; i < heads.length; i++)
          if (heads[i].getBoundingClientRect().top <= innerHeight * 0.32) cur = heads[i];
        if (cur) {
          tocLinks.forEach(function (a) {
            a.classList.toggle("on", a.getAttribute("href") === "#" + cur.id);
          });
          var t = TOC.filter(function (x) { return x.id === cur.id; })[0];
          if (t) posEl.innerHTML = (t.n ? "<b>§" + esc(t.n) + "</b> " : "") + esc(t.t.slice(0, 34));
        }
        if (DB && DB.setProgress) {
          DB.setProgress(doc.id, {
            pct: maxPct, sectionId: cur ? cur.id : null,
            finishedAt: maxPct > 0.93 ? Date.now() : undefined
          });
        }
      });
    }
    /* --- okuma odağı ---------------------------------------------------
       Başlık bloğu geçilince içindekiler kapanır, metin ortalanır.

       Karar YALNIZCA konuma bakar, yöne değil. Yön duyarlı olduğunda her
       yukarı kaydırmada panel açılıp kapanıyor ve sayfa sağa-sola salınıyordu.
       İki eşik arasında histerezis var: kapanma ve açılma noktaları farklı,
       böylece sınırda titremez. ☰ ile elle katlandıysa hiç karışılmaz.     */
    var focusOn = false, focusLock = false;
    function autoFocus() {
      if (MOBILE() || focusLock || pref.get("rl_side", false)) return;
      var head = $(".doc-head");
      var kapat = head ? head.offsetTop + head.offsetHeight : innerHeight * 0.6;
      var ac = kapat * 0.55;                 // açılma eşiği daha yukarıda
      var y = scrollY;
      if (!focusOn && y > kapat) {
        focusOn = true;
        document.documentElement.classList.add("read-focus");
      } else if (focusOn && y < ac) {
        focusOn = false;
        document.documentElement.classList.remove("read-focus");
      }
    }
    // ☰'ye basılırsa otomatik davranış bir daha devreye girmesin
    var mb = $("#menuBtn");
    if (mb) mb.addEventListener("click", function () {
      focusLock = true;
      focusOn = false;
      document.documentElement.classList.remove("read-focus");
    });

    function onScrollAll() { onScroll(); autoFocus(); }
    addEventListener("scroll", onScrollAll, { passive: true });
    addEventListener("resize", onScroll);
    onScroll();
    cleanups.push(function () {
      removeEventListener("scroll", onScrollAll);
      document.documentElement.classList.remove("read-focus");
    });

    function end() {
      if (DB && DB.endSession && sessionId != null) DB.endSession(sessionId, wordCount);
    }
    addEventListener("pagehide", end);
    cleanups.push(function () {
      removeEventListener("resize", onScroll);
      removeEventListener("pagehide", end);
      end();
    });

    // kaldığı yere dön
    if (DB && DB.getProgress) {
      DB.getProgress(doc.id).then(function (p) {
        if (!p || !p.sectionId) return;
        var el = document.getElementById(p.sectionId);
        if (el && (p.pct || 0) > 0.02) {
          setTimeout(function () { el.scrollIntoView({ block: "start" }); }, 60);
          toast("Kaldığınız yere dönüldü");
        }
      }).catch(function () {});
    }
  }

  /* ========================= SESLENDİRME ========================= */
  function setupTTS(doc) {
    var btn = $("#ttsBtn");
    if (!btn || !window.TTSPanel) return;
    var hasAny = (window.TTS && TTS.available && TTS.available()) ||
      (window.AudioTTS && AudioTTS.has(doc.id));
    if (!hasAny) {
      btn.disabled = true; btn.title = "Bu tarayıcı seslendirmeyi desteklemiyor";
      return;
    }

    TTSPanel.mount(document.body, {
      docId: doc.id,
      getNodes: function () {
        return $$("#article h1, #article h2, #article h3, #article p")
          .filter(function (n) {
            return !n.classList.contains("p-tr") &&
                   !n.closest(".doc-head") &&
                   n.textContent.trim().length > 2;
          });
      },
      translate: function (text) {
        return window.Lookup
          ? Lookup.phrase(text).then(function (r) { return r.tr || ""; })
          : Promise.resolve("");
      }
    });

    btn.onclick = function () {
      TTSPanel.toggleVisible();
      btn.classList.toggle("on", TTSPanel.visible());
      if (TTSPanel.visible()) TTSPanel.playPause();
    };
    cleanups.push(function () { try { TTSPanel.destroy(); } catch (e) {} });
  }

  /* ======================= SINAV GÖRÜNÜMÜ ======================= */
  function renderQuiz(doc) {
    var wrap = document.createElement("div");
    wrap.className = "quiz-page";
    wrap.innerHTML = '<div class="qp-head"><h1>Sınav</h1><p>' +
      esc(doc.title.tr) + "</p></div><div id=\"quizHost\"></div>" +
      '<p style="margin-top:1.5rem"><a class="btn" href="#/read/' +
      encodeURIComponent(doc.id) + '">← Metne dön</a></p>';
    view.appendChild(wrap);
    if (window.Quiz && Quiz.render) {
      Quiz.render($("#quizHost"), doc, function (res) {
        if (DB && DB.saveQuizRun) {
          DB.saveQuizRun({ docId: doc.id, score: res.score, total: res.total,
                           answers: res.answers || [] });
        }
      });
    } else {
      $("#quizHost").textContent = "Sınav modülü yüklenemedi.";
    }
  }

  /* ====================== İSTATİSTİK GÖRÜNÜMÜ ====================== */
  function renderStats() {
    var wrap = document.createElement("div");
    wrap.className = "stats-page";
    view.appendChild(wrap);
    if (window.StatsView && StatsView.render) StatsView.render(wrap);
    else wrap.textContent = "İstatistik modülü yüklenemedi.";
  }

  /* ========================= ANİMASYONLAR ========================= */
  function revealAnims() {
    if (!window.gsap || !window.ScrollTrigger || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);
    $$("figure.fig, .tbl-wrap, .box").forEach(function (el) {
      el.classList.add("reveal");
      gsap.to(el, { opacity: 1, y: 0, duration: .7, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });
  }

  /* ================= HERO — kelime takımyıldızı küresi =================
     Küreyi assets/globe.js çizer; buradaki iş yalnızca bağlamak ve
     görünüm kapanırken temizletmek. */
  function heroGlobe() {
    var cv = $("#globe");
    if (!cv) return;
    if (!window.WordGlobe || !window.THREE || !window.WORDGRAPH) {
      cv.style.display = "none";
      return;
    }
    var ok = false;
    try {
      ok = WordGlobe.mount(cv, { theme: S.theme, reduced: REDUCED });
    } catch (e) { ok = false; }
    if (!ok) { cv.style.display = "none"; return; }
    // tema düğmesi bunu çağırıyor
    window.__hero__ = { theme: WordGlobe.setTheme };
    cleanups.push(function () {
      try { WordGlobe.destroy(); } catch (e) {}
      window.__hero__ = null;
    });
  }

  /* Hero'nun hareketi (renk şeridi, giriş, sayaçlar, ışık) assets/hero-motion.js'te. */
  function heroMotion() {
    if (!window.HeroMotion) return;
    try { HeroMotion.mount(); } catch (e) { return; }
    cleanups.push(function () { try { HeroMotion.destroy(); } catch (e) {} });
  }

  /* ============================ AÇILIŞ ============================ */
  function boot() {
    refreshVocabUI();
    route();
    console.log("[kütüphane] " + (window.MANIFEST || []).length + " belge · " +
      (window.Lookup ? Lookup.size : 0) + " sözlük maddesi · depo: " +
      (DB && DB.engine ? DB.engine : "yok"));
    document.body.classList.add("ready");
  }
  if (DB && DB.ready) DB.ready().then(boot, boot); else boot();
})();
