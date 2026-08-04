/* ------------------------------------------------------------------
   quiz.js — sınav motoru  (ARCHITECTURE.md §5)

   API:  Quiz.render(containerEl, doc, onFinish)

   Soru tipleri
     mc     çoktan seçmeli        opts[] + a
     tf     doğru / yanlış        opts[] + a  (opts yoksa Doğru/Yanlış üretilir)
     gap    boşluk doldurma       q.en içinde "___" boşluğu, opts[] + a
     match  eşleştirme            pairs[] (ya da opts[]) — her öğe {en, tr}

   TASARIM NOTU — şık karıştırmanın klasik hatası
     Şıklar karıştırılıp "doğru cevabın indeksi" ayrı bir sayıda tutulursa
     indeks kaymaları yüzünden yanlış şık doğru sayılır. Bu motorda doğruluk
     bilgisi İNDEKSTE DEĞİL, şık nesnesinin kendisinde (`o.ok`) taşınır.
     Karıştırma nesneleri yer değiştirir, `ok` bayrağı onlarla birlikte gider;
     indeks aritmetiği hiçbir yerde yapılmaz. Depolamaya yazılan indeks
     karıştırmadan SONRA `findIndex` ile hesaplanır, tersi değil.

   Kod Türkçe yorumludur; arayüz metinleri Türkçedir (okur İngilizce bilmez).
------------------------------------------------------------------ */
(function (global) {
  "use strict";

  /* ============================ yardımcılar ============================ */

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  /** Fisher–Yates — diziyi yerinde karıştırır ve döndürür. */
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function hasStore() { return global.Store && typeof global.Store.saveQuizRun === "function"; }

  var TYPE_TR = { mc: "Çoktan seçmeli", tf: "Doğru / Yanlış",
                  gap: "Boşluk doldurma", match: "Eşleştirme" };

  /* ====================== soruların hazırlanması ====================== */

  /**
   * Belge modelindeki ham soruyu, doğruluğu nesne üzerinde taşıyan
   * bir şablona çevirir. Geçersizse null döner (sınav onu atlar).
   */
  function prepare(raw, n) {
    if (!raw || typeof raw !== "object") return null;
    var type = String(raw.type || "mc").toLowerCase();
    if (!TYPE_TR[type]) type = "mc";

    var q = raw.q || {};
    var base = {
      n: n,                                   // belgedeki özgün sıra (kayıt için)
      type: type,
      q: { en: q.en || "", tr: q.tr || "" },
      why: (raw.why && raw.why.tr) || "",
      ref: raw.ref || null,
    };

    /* --- eşleştirme --- */
    if (type === "match") {
      var src = raw.pairs || raw.opts || [];
      var pairs = [];
      for (var i = 0; i < src.length; i++) {
        var p = src[i];
        if (!p) continue;
        var en = (p.en != null) ? String(p.en) : "";
        var tr = (p.tr != null) ? String(p.tr) : "";
        if (en && tr) pairs.push({ en: en, tr: tr });
      }
      if (pairs.length < 2) return null;
      base.pairs = pairs;
      return base;
    }

    /* --- şıklı tipler --- */
    var opts = raw.opts;
    if ((!opts || !opts.length) && type === "tf") {
      opts = [{ en: "True", tr: "Doğru" }, { en: "False", tr: "Yanlış" }];
    }
    if (!opts || opts.length < 2) return null;

    var a = (typeof raw.a === "number" && raw.a >= 0 && raw.a < opts.length) ? raw.a : 0;
    base.opts = opts.map(function (o, i) {
      var isObj = o && typeof o === "object";
      return {
        en: isObj ? String(o.en != null ? o.en : "") : String(o),
        tr: isObj ? String(o.tr != null ? o.tr : "") : "",
        ok: (i === a),          // <<< doğruluk şıkkın kendisine yapışır
      };
    });
    /* güvenlik ağı: hiç doğru işaretlenmemişse ilkini doğru say */
    var any = false;
    base.opts.forEach(function (o) { if (o.ok) any = true; });
    if (!any) base.opts[0].ok = true;
    return base;
  }

  /**
   * Bir deneme (attempt) üretir: soru sırası ve şık sırası karıştırılmış,
   * şablondan tamamen bağımsız KOPYALAR. Şablon asla değiştirilmez, bu
   * yüzden "Tekrar dene" her seferinde temiz ve yeniden karışık başlar.
   */
  function buildAttempt(tpl) {
    var qs = tpl.map(function (p) {
      var c = { n: p.n, type: p.type, q: p.q, why: p.why, ref: p.ref };
      if (p.type === "match") {
        c.left = shuffle(p.pairs.map(function (x, i) {
          return { pid: i, en: x.en, tr: x.tr };
        }));
        c.right = shuffle(p.pairs.map(function (x, i) {
          return { pid: i, en: x.en, tr: x.tr };
        }));
      } else {
        /* nesneler kopyalanır; `ok` bayrağı kopyayla birlikte taşınır */
        c.opts = shuffle(p.opts.map(function (o) {
          return { en: o.en, tr: o.tr, ok: o.ok };
        }));
      }
      return c;
    });
    return shuffle(qs);
  }

  /* ========================== ana çizim ========================== */

  function render(containerEl, doc, onFinish) {
    if (!containerEl) throw new Error("Quiz.render: kap öğesi gerekli.");
    doc = doc || {};

    /* önceki sınavın klavye dinleyicisini bırak */
    if (typeof containerEl.__quizCleanup === "function") {
      try { containerEl.__quizCleanup(); } catch (e) { /* yoksay */ }
    }
    containerEl.textContent = "";

    var tpl = [];
    (doc.quiz || []).forEach(function (raw, i) {
      var p = prepare(raw, i);
      if (p) tpl.push(p);
    });

    var root = el("div", "qz");
    root.setAttribute("tabindex", "-1");
    containerEl.appendChild(root);

    if (!tpl.length) {
      var empty = el("div", "qz-empty");
      empty.appendChild(el("p", "qz-empty-t", "Bu metin için henüz sınav hazırlanmadı."));
      empty.appendChild(el("p", "qz-empty-s",
        "Metni okumaya devam edebilirsin; sınav eklendiğinde burada görünecek."));
      root.appendChild(empty);
      return { destroy: function () { containerEl.textContent = ""; } };
    }

    /* ---------------- deneme durumu ---------------- */
    var qs, idx, answers, answered, live;

    function startAttempt() {
      qs = buildAttempt(tpl);
      idx = 0;
      answers = [];
      answered = false;
      drawQuestion();
    }

    /* ---------------- klavye ---------------- */
    function onKey(ev) {
      if (!root.isConnected) { cleanup(); return; }
      var t = ev.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;

      if (ev.key === "Enter") {
        var nx = root.querySelector(".qz-next, .qz-again");
        if (nx) { ev.preventDefault(); nx.click(); }
        return;
      }
      if (/^[1-9]$/.test(ev.key)) {
        var i = parseInt(ev.key, 10) - 1;
        if (live && typeof live.pick === "function") {
          ev.preventDefault();
          live.pick(i);
        }
      }
    }
    document.addEventListener("keydown", onKey);

    function cleanup() {
      document.removeEventListener("keydown", onKey);
      if (containerEl.__quizCleanup === cleanup) containerEl.__quizCleanup = null;
    }
    containerEl.__quizCleanup = cleanup;

    /* ---------------- başlık şeridi ---------------- */

    function header() {
      var h = el("div", "qz-head");
      var c = el("div", "qz-count", "Soru " + (idx + 1) + " / " + qs.length);
      var barw = el("div", "qz-bar");
      var fill = el("i");
      fill.style.width = Math.round((idx / qs.length) * 100) + "%";
      barw.appendChild(fill);
      var right = 0;
      answers.forEach(function (a) { if (a.correct) right++; });
      var sc = el("div", "qz-hscore", right + " doğru");
      h.appendChild(c); h.appendChild(barw); h.appendChild(sc);
      return h;
    }

    /* ---------------- soru gövdesi ---------------- */

    function drawQuestion() {
      root.textContent = "";
      answered = false;
      live = null;
      var q = qs[idx];

      root.appendChild(header());

      var body = el("div", "qz-body");
      body.appendChild(el("div", "qz-type", TYPE_TR[q.type]));

      /* soru metni: İngilizce üstte, Türkçesi hemen altında */
      if (q.type === "gap") {
        body.appendChild(gapSentence(q));
      } else if (q.q.en) {
        body.appendChild(el("p", "qz-q-en", q.q.en));
      }
      if (q.q.tr) body.appendChild(el("p", "qz-q-tr", q.q.tr));

      root.appendChild(body);

      if (q.type === "match") drawMatch(q, body);
      else drawOptions(q, body);

      root.focus({ preventScroll: true });
    }

    /* --- boşluklu cümle: "___" yerine görsel bir yuva --- */
    function gapSentence(q) {
      var p = el("p", "qz-q-en qz-q-gap");
      var parts = String(q.q.en || "").split(/_{2,}|\{\s*\}|\[\s*\.{3}\s*\]/);
      if (parts.length < 2) { p.textContent = q.q.en || ""; q.__gapSlot = null; return p; }
      p.appendChild(document.createTextNode(parts[0]));
      var slot = el("span", "qz-gap", "?");
      p.appendChild(slot);
      p.appendChild(document.createTextNode(parts.slice(1).join(" ")));
      q.__gapSlot = slot;
      return p;
    }

    /* --------- mc / tf / gap: şık listesi --------- */

    function drawOptions(q, body) {
      var wrap = el("div", "qz-opts");
      wrap.setAttribute("role", "group");
      var btns = [];

      q.opts.forEach(function (o, i) {
        var b = el("button", "qz-opt");
        b.type = "button";
        b.appendChild(el("span", "qz-key", String(i + 1)));
        var txt = el("span", "qz-opt-txt");
        txt.appendChild(el("span", "qz-en", o.en));
        if (o.tr) txt.appendChild(el("span", "qz-tr", o.tr));
        b.appendChild(txt);
        b.appendChild(el("span", "qz-mark"));
        b.addEventListener("click", function () { choose(i); });
        wrap.appendChild(b);
        btns.push(b);
      });
      body.appendChild(wrap);

      live = { pick: function (i) { if (i >= 0 && i < btns.length) btns[i].click(); } };

      function choose(i) {
        if (answered) return;
        answered = true;
        var picked = q.opts[i];
        var correct = !!picked.ok;                 /* <<< indeks yok, bayrak var */

        btns.forEach(function (b, j) {
          b.disabled = true;
          if (q.opts[j].ok) b.classList.add("is-ok");
          if (j === i && !correct) b.classList.add("is-no");
          if (j === i) b.classList.add("is-picked");
        });

        if (q.__gapSlot) {
          q.__gapSlot.textContent = picked.en;
          q.__gapSlot.classList.add(correct ? "is-ok" : "is-no");
        }

        var right = null;
        q.opts.forEach(function (o) { if (o.ok) right = o; });

        answers.push({
          n: q.n, type: q.type, correct: correct,
          q: { en: q.q.en, tr: q.q.tr },
          picked: { en: picked.en, tr: picked.tr },
          answer: { en: right.en, tr: right.tr },
          /* kaydedilen indeksler KARIŞTIRMADAN SONRAKİ listeye göredir */
          pickedIndex: i,
          answerIndex: q.opts.findIndex(function (o) { return o.ok; }),
          why: q.why, ref: q.ref,
        });

        showFeedback(q, correct);
      }
    }

    /* --------- match: iki sütun eşleştirme --------- */

    function drawMatch(q, body) {
      var hint = el("p", "qz-hint",
        "Önce soldaki İngilizce sözcüğe, sonra sağdaki Türkçe karşılığına dokun.");
      body.appendChild(hint);

      var grid = el("div", "qz-match");
      var colL = el("div", "qz-col");
      var colR = el("div", "qz-col");
      colL.appendChild(el("div", "qz-col-h", "İngilizce"));
      colR.appendChild(el("div", "qz-col-h", "Türkçe"));

      var sel = null, done = 0, mistakes = 0, lock = false;
      var lBtns = [], rBtns = [];

      q.left.forEach(function (item, i) {
        var b = el("button", "qz-m qz-m-en");
        b.type = "button";
        b.appendChild(el("span", "qz-key", String(i + 1)));
        b.appendChild(el("span", "qz-m-t", item.en));
        b.addEventListener("click", function () { pickLeft(i); });
        colL.appendChild(b); lBtns.push(b);
      });
      q.right.forEach(function (item, i) {
        var b = el("button", "qz-m qz-m-tr");
        b.type = "button";
        b.appendChild(el("span", "qz-m-t", item.tr));
        b.addEventListener("click", function () { pickRight(i); });
        colR.appendChild(b); rBtns.push(b);
      });

      grid.appendChild(colL); grid.appendChild(colR);
      body.appendChild(grid);

      live = {
        pick: function (i) {
          if (sel == null) { if (lBtns[i]) lBtns[i].click(); }
          else { if (rBtns[i]) rBtns[i].click(); }
        },
      };

      function pickLeft(i) {
        if (lock || answered || lBtns[i].classList.contains("is-done")) return;
        lBtns.forEach(function (b) { b.classList.remove("is-sel"); });
        sel = i;
        lBtns[i].classList.add("is-sel");
      }

      function pickRight(j) {
        if (lock || answered || sel == null) return;
        if (rBtns[j].classList.contains("is-done")) return;
        var L = lBtns[sel], R = rBtns[j];
        if (q.left[sel].pid === q.right[j].pid) {
          L.classList.remove("is-sel");
          L.classList.add("is-done"); R.classList.add("is-done");
          L.disabled = true; R.disabled = true;
          done++;
          sel = null;
          if (done === q.left.length) finishMatch();
        } else {
          mistakes++;
          lock = true;
          L.classList.add("is-bad"); R.classList.add("is-bad");
          setTimeout(function () {
            L.classList.remove("is-bad", "is-sel"); R.classList.remove("is-bad");
            sel = null; lock = false;
          }, 480);
        }
      }

      function finishMatch() {
        if (answered) return;
        answered = true;
        var correct = (mistakes === 0);
        answers.push({
          n: q.n, type: q.type, correct: correct,
          q: { en: q.q.en, tr: q.q.tr },
          picked: { en: "", tr: mistakes + " hatalı eşleme" },
          answer: { en: "", tr: q.left.map(function (x) { return x.en + " → " + x.tr; }).join(", ") },
          mistakes: mistakes, why: q.why, ref: q.ref,
        });
        showFeedback(q, correct, mistakes);
      }
    }

    /* ---------------- anında geri bildirim ---------------- */

    function showFeedback(q, correct, mistakes) {
      var fb = el("div", "qz-fb " + (correct ? "is-ok" : "is-no"));
      fb.setAttribute("role", "status");

      var head = el("div", "qz-fb-h");
      head.appendChild(el("span", "qz-fb-i", correct ? "✓" : "✗"));
      var title = correct ? "Doğru" : "Yanlış";
      if (q.type === "match" && !correct) title = "Yanlış — " + mistakes + " hatalı eşleme";
      head.appendChild(el("span", "qz-fb-t", title));
      fb.appendChild(head);

      if (!correct && q.type !== "match") {
        var right = null;
        q.opts.forEach(function (o) { if (o.ok) right = o; });
        var cor = el("p", "qz-fb-cor");
        cor.appendChild(el("span", "qz-fb-lbl", "Doğrusu: "));
        cor.appendChild(el("span", "qz-fb-en", right.en));
        if (right.tr) cor.appendChild(el("span", "qz-fb-tr", " — " + right.tr));
        fb.appendChild(cor);
      }

      if (q.why) fb.appendChild(el("p", "qz-fb-why", q.why));

      if (q.ref) fb.appendChild(refLink(q.ref));

      root.appendChild(fb);

      var foot = el("div", "qz-foot");
      var last = (idx === qs.length - 1);
      var next = el("button", "qz-btn qz-next" + (last ? " is-primary" : ""),
                    last ? "Sonucu gör →" : "Devam →");
      next.type = "button";
      next.addEventListener("click", function () {
        if (last) drawResult(); else { idx++; drawQuestion(); }
      });
      foot.appendChild(next);
      foot.appendChild(el("span", "qz-kbd", "Enter"));
      root.appendChild(foot);
      next.focus({ preventScroll: true });
    }

    /** Metindeki dayanak bölüme bağlantı. Okuyucu açıksa yerinde kaydırır. */
    function refLink(ref) {
      var a = el("a", "qz-ref", "Metinde gör →");
      a.href = "#/read/" + (doc.id || "") + "?sec=" + encodeURIComponent(ref);
      a.setAttribute("data-ref", ref);
      a.addEventListener("click", function (ev) {
        var target = document.getElementById(ref);
        if (target) {
          ev.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      return a;
    }

    /* ---------------- sonuç ekranı ---------------- */

    function drawResult() {
      var score = 0;
      answers.forEach(function (a) { if (a.correct) score++; });
      var total = qs.length;
      var pct = total ? Math.round((score / total) * 100) : 0;

      root.textContent = "";
      var res = el("div", "qz-result");

      var ring = el("div", "qz-pct" + (pct === 100 ? " is-perfect" : pct >= 60 ? " is-good" : " is-low"));
      ring.appendChild(el("span", "qz-pct-n", pct + "%"));
      res.appendChild(ring);

      res.appendChild(el("p", "qz-res-line",
        total + " sorudan " + score + " tanesini doğru yanıtladın."));
      var tally = el("div", "qz-tally");
      tally.appendChild(el("span", "qz-tally-ok", "✓ " + score + " doğru"));
      tally.appendChild(el("span", "qz-tally-no", "✗ " + (total - score) + " yanlış"));
      res.appendChild(tally);

      if (pct === 100) {
        res.appendChild(el("p", "qz-res-note", "Hepsi doğru — metni iyi anlamışsın."));
      } else if (pct >= 60) {
        res.appendChild(el("p", "qz-res-note",
          "Fena değil. Aşağıdaki soruların geçtiği bölümleri bir daha okumak iyi gelir."));
      } else {
        res.appendChild(el("p", "qz-res-note",
          "Metni bir kez daha okuyup sınavı tekrarlamak en iyisi."));
      }

      var wrongs = answers.filter(function (a) { return !a.correct; });
      if (wrongs.length) {
        res.appendChild(el("h4", "qz-res-h", "Yanlış yanıtladıkların"));
        var ol = el("ol", "qz-wrongs");
        wrongs.forEach(function (a) {
          var li = el("li", "qz-wrong");
          li.appendChild(el("div", "qz-wrong-q", a.q.tr || a.q.en));
          var row = el("div", "qz-wrong-row");
          if (a.type !== "match") {
            var mine = el("div", "qz-wrong-mine");
            mine.appendChild(el("span", "qz-fb-lbl", "Senin yanıtın: "));
            mine.appendChild(el("span", "", a.picked.en + (a.picked.tr ? " (" + a.picked.tr + ")" : "")));
            row.appendChild(mine);
          }
          var cor = el("div", "qz-wrong-cor");
          cor.appendChild(el("span", "qz-fb-lbl", "Doğrusu: "));
          cor.appendChild(el("span", "", a.answer.en
            ? a.answer.en + (a.answer.tr ? " (" + a.answer.tr + ")" : "")
            : a.answer.tr));
          row.appendChild(cor);
          li.appendChild(row);
          if (a.why) li.appendChild(el("div", "qz-wrong-why", a.why));
          if (a.ref) li.appendChild(refLink(a.ref));
          ol.appendChild(li);
        });
        res.appendChild(ol);
      }

      var acts = el("div", "qz-actions");
      var again = el("button", "qz-btn qz-again is-primary", "Tekrar dene");
      again.type = "button";
      again.addEventListener("click", startAttempt);
      acts.appendChild(again);

      var back = el("a", "qz-btn qz-back", "Metne dön");
      back.href = "#/read/" + (doc.id || "");
      acts.appendChild(back);
      res.appendChild(acts);

      root.appendChild(res);
      again.focus({ preventScroll: true });

      /* --- kayıt + geri çağrı --- */
      var result = {
        docId: doc.id || null, score: score, total: total, pct: pct,
        answers: answers.slice(), at: Date.now(),
      };
      if (hasStore()) {
        try {
          Promise.resolve(global.Store.saveQuizRun({
            docId: result.docId, score: score, total: total, answers: result.answers,
          })).catch(function (e) { console.warn("[quiz] saveQuizRun başarısız:", e); });
        } catch (e) { console.warn("[quiz] saveQuizRun başarısız:", e); }
      }
      if (typeof onFinish === "function") {
        try { onFinish(result); } catch (e) { console.warn("[quiz] onFinish hatası:", e); }
      }
    }

    startAttempt();

    return {
      destroy: function () { cleanup(); containerEl.textContent = ""; },
      restart: startAttempt,
    };
  }

  global.Quiz = { render: render };
})(window);
