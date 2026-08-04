// Arayüzü gerçek cihaz ölçülerinde denetler: yatay taşma, dokunma hedefi
// boyutu, okunabilir yazı boyutu, alt barın sığması, ☰ düğmesinin işlevi.
const { chromium, devices } = require("playwright");
const path = require("path");
const fs = require("fs");

const SHOT = path.join(__dirname, "shots", "responsive");
fs.mkdirSync(SHOT, { recursive: true });
const URL = "http://127.0.0.1:8850/index.html#/read/jadr-2022";

const SIZES = [
  ["telefon-kucuk", 360, 740],
  ["telefon", 414, 896],
  ["telefon-buyuk", 430, 932],
  ["tablet-dikey", 768, 1024],
  ["tablet-yatay", 1024, 768],
  ["dizustu", 1440, 900],
  ["masaustu", 1920, 1080],
  ["genis", 2560, 1440],
];

(async () => {
  const browser = await chromium.launch();
  let fail = 0;
  console.log("ölçü            gen. taşma  min-buton  bar-yük  gövde-px  ☰");
  console.log("─".repeat(66));

  for (const [name, w, h] of SIZES) {
    const page = await browser.newPage({ viewport: { width: w, height: h },
                                         deviceScaleFactor: 2 });
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message));
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    // makaleye in ki alt bar görünsün
    await page.evaluate(() => document.getElementById("shell").scrollIntoView());
    await page.waitForTimeout(1100);

    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const before = scrollX; scrollTo(9999, scrollY);
      const canScroll = scrollX; scrollTo(before, scrollY);
      const btns = Array.from(document.querySelectorAll("#bar .btn"))
        .filter(function (b) { var r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
      const rects = btns.map((b) => b.getBoundingClientRect());
      const minH = Math.min(...rects.map((x) => x.height));
      const minW = Math.min(...rects.map((x) => x.width));
      const bar = document.getElementById("bar").getBoundingClientRect();
      const barFits = rects.every((x) => x.left >= -1 && x.right <= de.clientWidth + 1);
      var bodyP = Array.prototype.filter.call(document.querySelectorAll("#article > p"), function(x){return x.textContent.length > 200;})[0] || document.querySelector("#article p");
      const body = parseFloat(getComputedStyle(bodyP).fontSize);
      const uiFs = Math.min(...btns.map((b) => parseFloat(getComputedStyle(b).fontSize)));
      return {
        hScroll: de.scrollWidth - de.clientWidth, canScroll,
        minH: Math.round(minH), minW: Math.round(minW), barH: Math.round(bar.height),
        barFits, body: Math.round(body), uiFs: Math.round(uiFs * 10) / 10,
      };
    });

    // ☰ düğmesi bir şey yapıyor mu?
    // ☰ dar ekranda paneli kaydırarak açar (left değişir), geniş ekranda
    // kolonu katlar (width değişir) — ikisini birden ölç
    const menuWorks = await page.evaluate(async () => {
      const snap = () => {
        const r = document.getElementById("side").getBoundingClientRect();
        return Math.round(r.left) + "/" + Math.round(r.width);
      };
      const before = snap();
      document.getElementById("menuBtn").click();
      await new Promise((r) => setTimeout(r, 500));
      const after = snap();
      document.getElementById("menuBtn").click();
      await new Promise((r) => setTimeout(r, 500));
      return before !== after;
    });

    const ok = r.canScroll === 0 && r.minH >= 34 && r.barFits && r.uiFs >= 12 && menuWorks;
    if (!ok || errs.length) fail++;
    console.log(
      `${name.padEnd(15)} ${String(r.canScroll).padStart(4)}  ` +
      `${String(r.minH + "×" + r.minW).padStart(9)}  ${String(r.barH).padStart(6)}  ` +
      `${String(r.body).padStart(7)}  ${menuWorks ? "✓" : "✗"}  ` +
      `${ok ? "" : "  ← SORUN"}${errs.length ? " HATA:" + errs[0].slice(0, 40) : ""}`
    );
    await page.screenshot({ path: path.join(SHOT, name + ".png") });
    await page.close();
  }
  console.log("─".repeat(66));
  console.log(fail ? `${fail} ölçüde sorun var` : "tüm ölçüler temiz");
  await browser.close();
  process.exit(fail ? 1 : 0);
})();



