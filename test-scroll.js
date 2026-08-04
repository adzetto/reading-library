// Okuma sırasında metnin yatay olarak yerinden oynayıp oynamadığını ölçer.
// Kullanıcı şikâyeti: "roll up roll down yaparken site bir sağa bir sola gidiyor".
const { chromium } = require("playwright");

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto("http://127.0.0.1:8850/index.html#/read/jadr-2022", { waitUntil: "networkidle" });
  await p.waitForTimeout(1800);

  // aşağı-yukarı gezinirken makale sütununun sol kenarını izle
  const r = await p.evaluate(async () => {
    const art = document.getElementById("article");
    const left = () => Math.round(art.getBoundingClientRect().left);
    const seen = [];
    const steps = [0, 600, 1200, 1800, 1200, 600, 1400, 2200, 900, 300, 0];
    for (const y of steps) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 520));   // geçiş bitsin
      seen.push({ y, left: left(),
                  focus: document.documentElement.classList.contains("read-focus") });
    }
    const xs = seen.map((s) => s.left);
    return { seen, spread: Math.max(...xs) - Math.min(...xs) };
  });

  console.log("kaydırma   sol kenar   odak");
  console.log("─".repeat(34));
  r.seen.forEach((s) =>
    console.log(String(s.y).padStart(8) + String(s.left).padStart(12) +
                "   " + (s.focus ? "kapalı" : "açık")));
  console.log("─".repeat(34));
  console.log("yatay oynama:", r.spread, "px", r.spread <= 2 ? "✓ sabit" : "✗ SALINIYOR");

  // içindekiler gerçekten kapanıyor mu?
  const kapandi = r.seen.some((s) => s.focus) && r.seen.some((s) => !s.focus);
  console.log("içindekiler başlıktan sonra kapanıyor:", kapandi ? "✓" : "✗");
  console.log("konsol hatası:", errs.length);

  await b.close();
  process.exit(r.spread <= 2 && kapandi && !errs.length ? 0 : 1);
})();
