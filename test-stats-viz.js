// İstatistik görselleştirmelerinin sınaması:
//   belge halkaları, özet sayaçları, sözcük çubukları, taşma, koyu tema.
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

/** stats.js'teki dk() ile aynı — beklenen kart metnini üretmek için. */
function dk(mins) {
  mins = Math.max(0, Math.round(mins || 0));
  if (mins < 60) return mins + " dk";
  const h = Math.floor(mins / 60), m = mins % 60;
  return m ? h + " sa " + m + " dk" : h + " sa";
}

/** Sayfayı yukarıdan aşağı gezerek IntersectionObserver'ları tetikler. */
async function sweep(page) {
  await page.evaluate(async () => {
    const H = document.documentElement.scrollHeight;
    for (let y = 0; y <= H; y += Math.round(innerHeight * 0.6)) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await page.waitForTimeout(1400);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE: " + m.text()); });

  /* ======================= (a) veri üret + sayfayı aç ======================= */
  console.log("\n=== veri üretimi ===");
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  await page.evaluate(() => { location.hash = "#/read/aesop-fables"; });
  await page.waitForTimeout(2200);

  // birkaç sözcüğe tıkla → arama telemetrisi
  const clicked = [];
  for (let i = 0; i < 5; i++) {
    const hit = await page.evaluate((k) => {
      const els = Array.from(document.querySelectorAll(".w"));
      const seen = new Set();
      const uniq = els.filter((e) => {
        const t = e.textContent.toLowerCase();
        if (t.length < 4 || seen.has(t)) return false;
        seen.add(t); return true;
      });
      const t = uniq[k * 7 + 3];
      if (!t) return null;
      t.scrollIntoView({ block: "center" });
      const r = t.getBoundingClientRect();
      return { text: t.textContent, x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }, i);
    if (!hit) continue;
    await page.waitForTimeout(250);
    await page.mouse.click(hit.x, hit.y);
    await page.waitForTimeout(450);
    clicked.push(hit.text);
  }
  // okuma ilerlemesi biriksin
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight * 0.55));
  await page.waitForTimeout(1600);

  // sınav skoru olan/olmayan iki durum da görünsün
  await page.evaluate(async () => {
    await window.Store.saveQuizRun({ docId: "aesop-fables", score: 8, total: 10, answers: [] });
    await window.Store.saveQuizRun({ docId: "jadr-2022", score: 5, total: 10, answers: [] });
  });

  // Çubukların orantısı ölçülebilsin diye sayaçları farklılaştır:
  // gerçek tıklamalar hep 1 kalıyor, ölçek tek değerli olurdu.
  const seeded = await page.evaluate(async () => {
    const ws = ["fable", "wolf", "shepherd", "crow", "cheese", "lion"];
    for (let i = 0; i < ws.length; i++) {
      for (let k = 0; k <= i * 2; k++) await window.Store.logLookup(ws[i], "aesop-fables", "dict");
    }
    return (await window.Store.lookupTotal()).total;
  });
  console.log("  tıklanan sözcükler: " + (clicked.join(", ") || "yok") +
              "  · toplam arama " + seeded);

  console.log("\n=== istatistik sayfası ===");
  await page.evaluate(() => { location.hash = "#/stats"; });

  /* --- (c) sayaçlar: ara kareleri örnekle --- */
  const samples = await page.evaluate(() => new Promise((res) => {
    const out = [];
    (function tick() {
      const els = document.querySelectorAll(".sv-card-v");
      if (els.length) out.push(Array.from(els).map((e) => e.textContent));
      if (out.length >= 26) return res(out);
      setTimeout(tick, 50);
    })();
  }));
  await sweep(page);

  const base = await page.evaluate(async () => {
    const t = await window.Store.sessionsTotal();
    const p = await window.Store.allProgress();
    const l = await window.Store.lookupTotal();
    return { minutes: t.minutes || 0, streak: t.streak || 0, docs: (p || []).length,
             distinct: l.distinct || 0, total: l.total || 0 };
  });
  const want = [dk(base.minutes), String(base.docs), String(base.distinct),
                String(base.total), base.streak + " gün"];
  const got = samples[samples.length - 1];

  check("(a) istatistik sayfası konsol hatasız açıldı", errs.length === 0,
    errs.length ? errs[0].slice(0, 90) : "hata yok");
  check("(c) özet sayıları son değerde", JSON.stringify(got) === JSON.stringify(want),
    got.join(" | "));
  check("(c) sayaç 0'dan yükseldi",
    JSON.stringify(samples[0]) !== JSON.stringify(got),
    "ilk kare: " + samples[0].join(" | "));

  /* --- (b) halka göstergeleri --- */
  const rings = await page.evaluate(() => {
    const C = 2 * Math.PI * 26;
    const docs = Array.from(document.querySelectorAll(".sv-doc"));
    return {
      docs: docs.length,
      rings: document.querySelectorAll(".sv-ring").length,
      emoji: /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(
        (document.querySelector('[data-sec="docs"]') || {}).textContent || ""),
      rows: docs.map((d) => {
        const pct = Number(d.getAttribute("data-pct"));
        const arc = d.querySelector(".sv-ring-arc");
        const da = arc ? arc.getAttribute("stroke-dasharray") : "";
        return {
          pct: pct,
          len: parseFloat(String(da).split(/[\s,]+/)[0]),
          want: C * pct / 100,
          off: arc ? arc.style.strokeDashoffset : null,
          href: (d.querySelector(".sv-doc-t") || {}).getAttribute
                ? d.querySelector(".sv-doc-t").getAttribute("href") : null,
        };
      }),
    };
  });
  const badLen = rings.rows.filter((r) => !(Math.abs(r.len - r.want) < 0.5));
  const notRevealed = rings.rows.filter((r) => r.off !== "0px" && r.off !== "0");
  const badHref = rings.rows.filter((r) => !/^#\/read\//.test(r.href || ""));
  check("(b) her belge için bir halka", rings.rings === rings.docs && rings.docs > 0,
    rings.docs + " belge / " + rings.rings + " halka");
  check("(b) stroke-dasharray yüzdeyle tutarlı", badLen.length === 0,
    badLen.length ? JSON.stringify(badLen[0]) :
      rings.rows.map((r) => "%" + r.pct).join(" "));
  check("(b) halkalar görünürlükte doldu", notRevealed.length === 0,
    notRevealed.length + " tanesi kapalı");
  check("(b) kart #/read/<id>'ye gidiyor", badHref.length === 0);
  check("(b) belge bölümünde emoji yok", rings.emoji === false);

  /* --- (d) sözcük çubukları --- */
  const words = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll(".sv-word")).map((li) => ({
      n: Number((li.querySelector(".sv-word-n") || {}).textContent),
      w: (li.querySelector(".sv-word-bar") || { getBoundingClientRect: () => ({ width: -1 }) })
           .getBoundingClientRect().width,
    }));
    return {
      rows: rows,
      grid: !!document.querySelector(".sv-fig-grid"),
      ticks: document.querySelectorAll(".sv-axis-t").length,
      mono: getComputedStyle(document.querySelector(".sv-word-n") || document.body).fontFamily,
    };
  });
  let ratioOk = words.rows.length > 1;
  if (ratioOk) {
    const k = words.rows.map((r) => r.w / r.n);
    const lo = Math.min(...k), hi = Math.max(...k);
    ratioOk = lo > 0 && (hi - lo) / hi < 0.02;
  }
  check("(d) çubuk genişliği sayaçla orantılı", ratioOk,
    words.rows.slice(0, 4).map((r) => r.n + "→" + Math.round(r.w) + "px").join(" "));
  check("(d) ölçek ızgarası + eksen çentikleri var",
    words.grid && words.ticks >= 2, words.ticks + " çentik");
  check("(d) sayılar monospace", /JetBrains|Mono|mono/i.test(words.mono),
    words.mono.split(",")[0]);

  await page.screenshot({ path: path.join(SHOT, "viz-1440.png"), fullPage: true });

  /* --- (e) yatay kaydırma --- */
  console.log("\n=== ölçüler ===");
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(700);
    await sweep(page);
    const over = await page.evaluate(() => {
      const de = document.documentElement;
      const before = scrollX; scrollTo(9999, scrollY);
      const can = scrollX; scrollTo(before, scrollY);
      return { can: can, diff: de.scrollWidth - de.clientWidth };
    });
    check("(e) " + w + "px yatay kaydırma yok", over.can === 0 && over.diff <= 0,
      "kaydırılabilir " + over.can + ", fark " + over.diff);
    if (w === 390) await page.screenshot({ path: path.join(SHOT, "viz-390.png"), fullPage: true });
  }

  /* --- (f) koyu tema --- */
  console.log("\n=== koyu tema ===");
  await page.setViewportSize({ width: 1440, height: 900 });
  const before = errs.length;
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    try { localStorage.setItem("theme", "dark"); } catch (e) {}
    location.hash = "#/";
  });
  await page.waitForTimeout(600);
  await page.evaluate(() => { location.hash = "#/stats"; });
  await page.waitForTimeout(1200);
  await sweep(page);
  const dark = await page.evaluate(() => {
    const d = document.querySelector(".sv-doc");
    const de = document.documentElement;
    return {
      theme: de.getAttribute("data-theme"),
      rings: document.querySelectorAll(".sv-ring").length,
      arc: d ? getComputedStyle(d.querySelector(".sv-ring-arc")).stroke : "",
      bg: getComputedStyle(document.body).backgroundColor,
      can: (function () { const b = scrollX; scrollTo(9999, scrollY);
                          const c = scrollX; scrollTo(b, scrollY); return c; })(),
    };
  });
  check("(f) koyu temada hata yok", errs.length === before,
    errs.length > before ? errs[before].slice(0, 90) : "hata yok");
  check("(f) koyu temada halkalar çizili", dark.rings > 0 && dark.theme === "dark",
    dark.rings + " halka, yay " + dark.arc);
  check("(f) koyu temada taşma yok", dark.can === 0);
  await page.screenshot({ path: path.join(SHOT, "viz-dark.png"), fullPage: true });

  console.log("\n=== konsol (" + errs.length + ") ===");
  errs.slice(0, 10).forEach((e) => console.log("  ! " + e));
  if (errs.length) fails += errs.length;

  console.log("\n" + (fails ? fails + " SORUN" : "HEPSİ GEÇTİ"));
  await browser.close();
  process.exit(fails ? 1 : 0);
})();
