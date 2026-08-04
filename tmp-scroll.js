const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  await p.goto("http://127.0.0.1:8850/index.html#/read/jadr-2022", { waitUntil: "networkidle" });
  await p.waitForTimeout(1800);
  const xs = [];
  for (const y of [0, 400, 1200, 2400, 4000, 2400, 1200, 600, 200, 0, 3000, 900]) {
    await p.evaluate(v => scrollTo(0, v), y);
    await p.waitForTimeout(520);
    const s = await p.evaluate(() => {
      const a = document.getElementById("article").getBoundingClientRect();
      return { y: Math.round(scrollY), x: Math.round(a.left), w: Math.round(a.width),
               focus: document.documentElement.classList.contains("read-focus"),
               sideOp: +getComputedStyle(document.getElementById("side")).opacity };
    });
    xs.push(s);
  }
  const left = xs.map(s => s.x), wid = xs.map(s => s.w);
  console.log("makale sol kenarı :", left.join(" "));
  console.log("makale genişliği  :", wid.join(" "));
  console.log("read-focus        :", xs.map(s => (s.focus ? "K" : "-")).join(" "));
  console.log("içindekiler opak. :", xs.map(s => s.sideOp.toFixed(1)).join(" "));
  const dx = Math.max(...left) - Math.min(...left);
  const dw = Math.max(...wid) - Math.min(...wid);
  const toggled = new Set(xs.map(s => s.focus)).size > 1;
  console.log("\nyatay kayma:", dx, "px | genişlik oynaması:", dw,
              "px | içindekiler açılıp kapandı:", toggled ? "evet" : "hayır");
  console.log(dx === 0 && dw === 0 && toggled ? "GEÇTİ — metin hiç kaymıyor, yalnızca içindekiler soluyor"
                                             : "SORUN");
  console.log("konsol hatası:", errs.length);
  await b.close();
  process.exit(dx === 0 && dw === 0 && toggled && !errs.length ? 0 : 1);
})();
