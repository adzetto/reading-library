// Geçici: tasarımı gözle denetlemek için bölüm ekran görüntüleri.
const { chromium } = require("playwright");

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1240, height: 900 }, deviceScaleFactor: 2 });
  p.on("pageerror", (e) => console.log("PAGEERROR " + e.message));
  p.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE " + m.text()); });
  await p.goto("http://127.0.0.1:8850/index.html", { waitUntil: "networkidle" });
  await p.waitForTimeout(1000);

  await p.evaluate(async () => {
    const ws = ["fable", "wolf", "shepherd", "crow", "cheese", "lion", "ancient", "remarkable"];
    for (let i = 0; i < ws.length; i++)
      for (let k = 0; k <= i * 2; k++) await window.Store.logLookup(ws[i], "aesop-fables", "dict");
    await window.Store.setProgress("aesop-fables", { pct: 0.65, seconds: 1450 });
    await window.Store.setProgress("jadr-2022", { pct: 0.22, seconds: 640 });
    await window.Store.setProgress("happy-prince", { pct: 1, seconds: 900, finishedAt: Date.now() });
    await window.Store.setProgress("selfish-giant", { pct: 0.08, seconds: 120 });
    await window.Store.saveQuizRun({ docId: "aesop-fables", score: 8, total: 10, answers: [] });
    await window.Store.saveQuizRun({ docId: "happy-prince", score: 9, total: 10, answers: [] });
  });

  const sweep = async () => {
    await p.evaluate(async () => {
      const H = document.documentElement.scrollHeight;
      for (let y = 0; y <= H; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 110)); }
    });
    await p.waitForTimeout(1400);
  };

  const shot = async (sec, file) => {
    const box = await p.evaluate((s) => {
      const e = document.querySelector('[data-sec="' + s + '"]');
      const r = e.getBoundingClientRect();
      return { x: Math.round(r.x + scrollX), y: Math.round(r.y + scrollY),
               width: Math.round(r.width), height: Math.round(r.height) };
    }, sec);
    await p.screenshot({ path: file, clip: box, fullPage: true });
  };

  for (const theme of ["dark", "light"]) {
    await p.evaluate((t) => { document.documentElement.setAttribute("data-theme", t); location.hash = "#/"; }, theme);
    await p.waitForTimeout(500);
    await p.evaluate(() => { location.hash = "#/stats"; });
    await p.waitForTimeout(1400);
    await sweep();
    await shot("docs", "shots/dev-docs-" + theme + ".png");
    await shot("words", "shots/dev-words-" + theme + ".png");
    await shot("summary", "shots/dev-summary-" + theme + ".png");
  }
  await b.close();
  console.log("ok");
})();
