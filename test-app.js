// Kütüphane uygulamasının uçtan uca sınaması.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const SHOT = path.join(__dirname, "shots");
fs.mkdirSync(SHOT, { recursive: true });
const BASE = "http://127.0.0.1:8850/index.html";

let fails = 0;
function check(name, ok, detail) {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail ? "  — " + detail : ""}`);
  if (!ok) fails++;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 },
                                       deviceScaleFactor: 2 });
  const errs = [];
  page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE: " + m.text()); });
  page.on("requestfailed", (r) => errs.push("404: " + r.url().split("/").pop()));

  /* ---------------------------- kütüphane ---------------------------- */
  console.log("\n=== kütüphane ===");
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);

  const lib = await page.evaluate(() => ({
    cards: document.querySelectorAll(".card").length,
    docs: Object.keys(window.DOCS || {}).length,
    manifest: (window.MANIFEST || []).length,
    engine: window.Store ? window.Store.engine : "yok",
    heroStats: (document.getElementById("heroStats") || {}).textContent || "",
    globe: !!document.querySelector("#globe"),
    hScroll: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  check("belgeler yüklendi", lib.docs >= 4, lib.docs + " belge");
  check("kartlar çizildi", lib.cards === lib.manifest, lib.cards + " kart");
  check("depo motoru", lib.engine === "idb" || lib.engine === "ls", lib.engine);
  check("hero sayıları", /metin/.test(lib.heroStats));
  check("yatay taşma yok", lib.hScroll === 0);
  await page.screenshot({ path: path.join(SHOT, "L1-library.png") });

  /* ----------------------------- okuyucu ----------------------------- */
  console.log("\n=== okuyucu ===");
  await page.evaluate(() => { location.hash = "#/read/jadr-2022"; });
  await page.waitForTimeout(2200);
  const rd = await page.evaluate(() => ({
    words: document.querySelectorAll(".w").length,
    figs: document.querySelectorAll("figure.fig svg").length,
    tables: document.querySelectorAll(".tbl-wrap table").length,
    toc: document.querySelectorAll("#toc a").length,
    katex: document.querySelectorAll(".katex").length,
    trBtns: document.querySelectorAll(".p-tr-btn").length,
    head: !!document.querySelector(".doc-head h1"),
    hScroll: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  check("sözcükler sarıldı", rd.words > 8000, rd.words + " sözcük");
  check("şekiller çizildi", rd.figs === 7, rd.figs + " şekil");
  check("tablolar çizildi", rd.tables === 4, rd.tables + " tablo");
  check("içindekiler", rd.toc >= 20, rd.toc + " başlık");
  check("matematik işlendi", rd.katex > 50, rd.katex);
  check("paragraf tr düğmeleri", rd.trBtns > 20, rd.trBtns);
  check("belge başlığı", rd.head);
  check("yatay taşma yok", rd.hScroll === 0);

  // sözcüğe tıkla
  const w = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll(".w.known"));
    const t = els.find((e) => e.textContent.toLowerCase() === "prevalence") || els[10];
    t.scrollIntoView({ block: "center" });
    const r = t.getBoundingClientRect();
    return { text: t.textContent, x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  await page.waitForTimeout(400);
  await page.mouse.click(w.x, w.y);
  await page.waitForTimeout(900);
  const pop = await page.evaluate(() => {
    const p = document.getElementById("pop");
    return { shown: p.classList.contains("show"), text: p.innerText.slice(0, 120) };
  });
  check("sözcük baloncuğu", pop.shown, w.text + " → " + pop.text.split("\n")[2]);
  await page.screenshot({ path: path.join(SHOT, "L2-reader.png") });

  // deftere ekle → kalıcılık
  const saved = await page.evaluate(async () => {
    const b = document.querySelector("#pop [data-save]");
    if (!b) return "düğme yok";
    b.click();
    await new Promise((r) => setTimeout(r, 700));
    return document.getElementById("vocabCount").textContent;
  });
  check("deftere eklendi", saved === "1", "defter=" + saved);

  /* --------------------------- ilerleme ---------------------------- */
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight * 0.4));
  await page.waitForTimeout(1400);
  const prog = await page.evaluate(async () => {
    const p = await window.Store.getProgress("jadr-2022");
    return p ? Math.round((p.pct || 0) * 100) : -1;
  });
  check("ilerleme kaydedildi", prog > 5, "%" + prog);

  /* ------------------------------ sınav ------------------------------ */
  console.log("\n=== sınav ===");
  await page.evaluate(() => { location.hash = "#/quiz/jadr-2022"; });
  await page.waitForTimeout(1200);
  const qz = await page.evaluate(() => ({
    opts: document.querySelectorAll(".qz-opt, .qz-m").length,
    q: !!document.querySelector(".qz-q-en, .qz-en, .qz-q-gap"),
    hScroll: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  check("sınav çizildi", qz.q && qz.opts > 0, qz.opts + " şık");
  check("yatay taşma yok", qz.hScroll === 0);
  await page.screenshot({ path: path.join(SHOT, "L3-quiz.png") });

  /* --------------------------- istatistik --------------------------- */
  console.log("\n=== istatistik ===");
  await page.evaluate(() => { location.hash = "#/stats"; });
  await page.waitForTimeout(1500);
  const st = await page.evaluate(() => ({
    cards: document.querySelectorAll(".sv-card").length,
    heat: document.querySelectorAll(".hm-day").length,
    secs: document.querySelectorAll(".sv-sec").length,
    hScroll: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  check("özet kartları", st.cards >= 4, st.cards + " kart");
  check("ısı haritası", st.heat === 84, st.heat + " hücre");
  check("bölümler", st.secs >= 5, st.secs + " bölüm");
  check("yatay taşma yok", st.hScroll === 0);
  await page.screenshot({ path: path.join(SHOT, "L4-stats.png") });

  /* --------------------- kalıcılık: sayfayı yenile --------------------- */
  console.log("\n=== kalıcılık ===");
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const after = await page.evaluate(async () => {
    const v = await window.Store.listVocab();
    const p = await window.Store.getProgress("jadr-2022");
    return { vocab: (v || []).length, pct: p ? Math.round((p.pct || 0) * 100) : -1 };
  });
  check("defter kalıcı", after.vocab === 1, after.vocab + " sözcük");
  check("ilerleme kalıcı", after.pct > 5, "%" + after.pct);

  /* ------------------------------ diğer belgeler ------------------------------ */
  console.log("\n=== diğer belgeler ===");
  for (const id of ["net-feasibility", "doc-net-tr", "doc-b89f"]) {
    await page.evaluate((i) => { location.hash = "#/read/" + i; }, id);
    await page.waitForTimeout(1600);
    const r = await page.evaluate(() => ({
      words: document.querySelectorAll(".w").length,
      toc: document.querySelectorAll("#toc a").length,
      hScroll: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    check(id, r.words > 1000 && r.hScroll === 0,
      r.words + " sözcük, " + r.toc + " başlık, taşma " + r.hScroll);
  }

  console.log("\n=== hatalar (" + errs.length + ") ===");
  errs.slice(0, 12).forEach((e) => console.log("  ! " + e));
  if (errs.length) fails += errs.length;

  console.log("\n" + (fails ? fails + " SORUN" : "HEPSİ GEÇTİ"));
  await browser.close();
  process.exit(fails ? 1 : 0);
})();
