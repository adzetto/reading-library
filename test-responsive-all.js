// Dört görünümü de sekiz ekran ölçüsünde sınar: yatay taşma, dokunma hedefi,
// düğmelerin ekrana sığması ve konsol hatası.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const SHOT = path.join(__dirname, "shots", "responsive");
fs.mkdirSync(SHOT, { recursive: true });
const BASE = "http://127.0.0.1:8850/index.html";

const SIZES = [
  ["360", 360, 740], ["414", 414, 896], ["430", 430, 932],
  ["768", 768, 1024], ["1024", 1024, 768], ["1440", 1440, 900],
  ["1920", 1920, 1080], ["2560", 2560, 1440],
];
const VIEWS = [
  ["kütüphane", "#/"],
  ["okuyucu", "#/read/jadr-2022"],
  ["sınav", "#/quiz/jadr-2022"],
  ["istatistik", "#/stats"],
];

(async () => {
  const browser = await chromium.launch();
  let fail = 0;
  console.log("görünüm     ölçü   taşma  min-buton  hata");
  console.log("─".repeat(48));

  for (const [vn, hash] of VIEWS) {
    for (const [sn, w, h] of SIZES) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      const errs = [];
      page.on("pageerror", (e) => errs.push(e.message));
      page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
      await page.goto(BASE + hash, { waitUntil: "networkidle" });
      await page.waitForTimeout(1400);
      if (vn === "okuyucu") {
        await page.evaluate(() => document.getElementById("shell").scrollIntoView());
        await page.waitForTimeout(900);
      }
      const r = await page.evaluate(() => {
        const de = document.documentElement;
        const before = scrollX; scrollTo(9999, scrollY);
        const can = scrollX; scrollTo(before, scrollY);
        // Kapalı çekmece ve kenar çubuğu kasıtlı olarak ekran dışındadır;
        // içlerindeki düğmeler "dışarıda" sayılmamalı.
        const OFFSCREEN = "#drawer, #side, #pop, #drawerLayer";
        const btns = Array.from(document.querySelectorAll("button, .btn, .qz-opt, .sv-btn"))
          .filter((b) => {
            const q = b.getBoundingClientRect();
            if (q.width <= 0 || q.height <= 0) return false;
            const host = b.closest(OFFSCREEN);
            if (host && !host.classList.contains("show")) return false;
            return true;
          });
        const rs = btns.map((b) => b.getBoundingClientRect());
        const minH = rs.length ? Math.round(Math.min(...rs.map((x) => x.height))) : 99;
        const minW = rs.length ? Math.round(Math.min(...rs.map((x) => x.width))) : 99;
        const off = rs.filter((x) => x.right > de.clientWidth + 1 || x.left < -1).length;
        return { can, minH, minW, off };
      });
      const ok = r.can === 0 && r.minH >= 30 && r.off === 0 && errs.length === 0;
      if (!ok) fail++;
      console.log(
        `${vn.padEnd(11)} ${sn.padStart(4)}  ${String(r.can).padStart(5)}  ` +
        `${(r.minH + "×" + r.minW).padStart(9)}  ${errs.length}` +
        (ok ? "" : "   ← SORUN" + (r.off ? " (" + r.off + " düğme dışarıda)" : "") +
                    (errs.length ? " " + errs[0].slice(0, 40) : ""))
      );
      if (sn === "414" || sn === "1440")
        await page.screenshot({ path: path.join(SHOT, vn + "-" + sn + ".png") });
      await page.close();
    }
  }
  console.log("─".repeat(48));
  console.log(fail ? fail + " birleşimde sorun" : "32 birleşimin hepsi temiz");
  await browser.close();
  process.exit(fail ? 1 : 0);
})();
