// Kelime takımyıldızı küresinin (assets/globe.js + assets/wordgraph.js) sınaması.
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
const NOISE = /favicon|ERR_ABORTED.*favicon/i;

function watch(page, errs) {
  page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE: " + m.text()); });
  page.on("requestfailed", (r) => {
    const u = r.url();
    if (!NOISE.test(u)) errs.push("404: " + u.split("/").pop());
  });
}

/** Sayfanın küre durumu: canvas, WebGL bağlamı, sprite sayısı, taşma. */
const PROBE = () => {
  const cv = document.querySelector("#globe");
  // getContext aynı canvas'ta aynı bağlamı döndürür; renderer'ınkini alırız.
  let gl = null;
  try { gl = cv && (cv.getContext("webgl2") || cv.getContext("webgl")); } catch (e) {}
  const inf = window.WordGlobe && window.WordGlobe.info ? window.WordGlobe.info() : null;
  return {
    canvas: !!cv,
    hidden: cv ? cv.style.display === "none" : true,
    webgl: !!gl && !gl.isContextLost(),
    drawW: cv ? cv.width : 0,
    drawH: cv ? cv.height : 0,
    sprites: inf ? inf.sprites : -1,
    built: inf ? inf.built : false,
    reduced: inf ? inf.reduced : null,
    theme: inf ? inf.theme : null,
    nodes: (window.WORDGRAPH && window.WORDGRAPH.nodes || []).length,
    links: (window.WORDGRAPH && window.WORDGRAPH.links || []).length,
    docs: (window.WORDGRAPH && window.WORDGRAPH.docs || []).length,
    hero: !!window.__hero__,
    hScroll: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
};

(async () => {
  const browser = await chromium.launch();

  /* ==================== 1440 px ==================== */
  console.log("\n=== 1440 px ===");
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 },
                                         deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errs = [];
  watch(page, errs);
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);

  const a = await page.evaluate(PROBE);
  check("(a) konsol hatasız açıldı", errs.length === 0, errs.slice(0, 3).join(" | "));
  check("(b) WORDGRAPH.nodes >= 100", a.nodes >= 100,
    a.nodes + " düğüm, " + a.links + " bağ, " + a.docs + " belge");
  check("(c) WebGL bağlamı var", a.webgl && !a.hidden,
    a.drawW + "×" + a.drawH + " çizim tamponu");
  check("(c) en az 100 sprite", a.sprites >= 100, a.sprites + " sprite");
  check("(d) 1440 px yatay taşma 0", a.hScroll === 0, "taşma " + a.hScroll);
  check("__hero__.theme bağlı", a.hero);
  await page.screenshot({ path: path.join(SHOT, "globe-1440.png") });

  /* ---- fare ile sözcüğün üstüne gel: etiket ve Türkçesi ---- */
  const hov = await page.evaluate(async () => {
    const cv = document.querySelector("#globe");
    const r = cv.getBoundingClientRect();
    const fire = (x, y) => cv.ownerDocument.defaultView.dispatchEvent(
      new PointerEvent("pointermove", { clientX: x, clientY: y, bubbles: true,
                                        pointerType: "mouse" }));
    // kürenin üstünde bir ızgara tara, etiket görünene kadar
    for (let dy = -0.32; dy <= 0.32; dy += 0.035) {
      for (let dx = -0.32; dx <= 0.32; dx += 0.035) {
        fire(r.left + r.width * (0.5 + dx), r.top + r.height * (0.5 + dy));
        await new Promise((s) => requestAnimationFrame(() => requestAnimationFrame(s)));
        const t = document.querySelector(".wg-tip.on");
        if (t) return { ok: true, text: t.innerText.replace(/\n+/g, " · ").slice(0, 120) };
      }
    }
    return { ok: false, text: "" };
  });
  check("sözcük etiketi açılıyor", hov.ok, hov.text);
  await page.screenshot({ path: path.join(SHOT, "globe-1440-hover.png") });

  /* ---- sözcüğe tıklayınca ilgili metne gitmeli ---- */
  const nav = await page.evaluate(async () => {
    const cv = document.querySelector("#globe");
    const r = cv.getBoundingClientRect();
    const move = (x, y) => window.dispatchEvent(new PointerEvent("pointermove",
      { clientX: x, clientY: y, bubbles: true, pointerType: "mouse" }));
    for (let dy = -0.3; dy <= 0.3; dy += 0.035) {
      for (let dx = -0.3; dx <= 0.3; dx += 0.035) {
        const x = r.left + r.width * (0.5 + dx), y = r.top + r.height * (0.5 + dy);
        move(x, y);
        await new Promise((s) => requestAnimationFrame(() => requestAnimationFrame(s)));
        if (!document.querySelector(".wg-tip.on")) continue;
        const w = document.querySelector(".wg-tip .wg-w").textContent;
        cv.dispatchEvent(new PointerEvent("click",
          { clientX: x, clientY: y, bubbles: true, pointerType: "mouse" }));
        await new Promise((s) => setTimeout(s, 500));
        return { word: w, hash: location.hash };
      }
    }
    return { word: "", hash: location.hash };
  });
  check("sözcüğe tıklayınca metne gidiyor", /^#\/read\/.+/.test(nav.hash),
    nav.word + " → " + nav.hash);
  await page.evaluate(() => { location.hash = "#/"; });
  await page.waitForTimeout(1600);

  /* ---- (f) tema değişimi ---- */
  console.log("\n=== tema ===");
  errs.length = 0;
  await page.click("#themeBtn");
  await page.waitForTimeout(900);
  await page.click("#themeBtn");
  await page.waitForTimeout(900);
  const th = await page.evaluate(PROBE);
  check("(f) tema değişince hata yok", errs.length === 0, errs.slice(0, 3).join(" | "));
  check("(f) küre ayakta kaldı", th.webgl && th.hero);
  await page.click("#themeBtn");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(SHOT, "globe-1440-dark.png") });
  await page.click("#themeBtn");
  await page.waitForTimeout(800);

  /* ---- (e) okuyucuya git ve geri dön: destroy/mount döngüsü ---- */
  console.log("\n=== destroy / mount döngüsü ===");
  errs.length = 0;
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => { location.hash = "#/read/jadr-2022"; });
    await page.waitForTimeout(1300);
    await page.evaluate(() => { location.hash = "#/"; });
    await page.waitForTimeout(1500);
  }
  const b = await page.evaluate(PROBE);
  check("(e) 3 tur sonrası konsol hatasız", errs.length === 0, errs.slice(0, 4).join(" | "));
  check("(e) küre yeniden kuruldu", b.webgl && b.hero && !b.hidden);
  check("(e) taşma yok", b.hScroll === 0, "taşma " + b.hScroll);
  await ctx.close();

  /* ==================== 390 px ==================== */
  console.log("\n=== 390 px ===");
  const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 },
                                          deviceScaleFactor: 3, isMobile: true,
                                          hasTouch: true });
  const p2 = await ctx2.newPage();
  const errs2 = [];
  watch(p2, errs2);
  await p2.goto(BASE, { waitUntil: "networkidle" });
  await p2.waitForTimeout(2500);
  const m = await p2.evaluate(PROBE);
  check("(a) konsol hatasız açıldı", errs2.length === 0, errs2.slice(0, 3).join(" | "));
  check("(c) WebGL bağlamı var", m.webgl && !m.hidden, m.drawW + "×" + m.drawH);
  check("(c) sprite oluştu", m.sprites >= 100, m.sprites + " sprite");
  check("(d) 390 px yatay taşma 0", m.hScroll === 0, "taşma " + m.hScroll);
  await p2.screenshot({ path: path.join(SHOT, "globe-390.png") });
  await ctx2.close();

  /* ==================== hareket azaltma ==================== */
  console.log("\n=== prefers-reduced-motion ===");
  const ctx3 = await browser.newContext({ viewport: { width: 1280, height: 800 },
                                          reducedMotion: "reduce" });
  const p3 = await ctx3.newPage();
  const errs3 = [];
  watch(p3, errs3);
  await p3.goto(BASE, { waitUntil: "networkidle" });
  await p3.waitForTimeout(2200);
  const r3 = await p3.evaluate(PROBE);
  check("azaltılmış harekette küre duruyor ama görünüyor",
    r3.webgl && !r3.hidden && r3.sprites >= 100 && errs3.length === 0,
    r3.sprites + " sprite, " + errs3.length + " hata");
  await ctx3.close();

  console.log("\n" + (fails ? fails + " SORUN" : "HEPSİ GEÇTİ"));
  await browser.close();
  process.exit(fails ? 1 : 0);
})();
