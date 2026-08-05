/* ==================================================================
   test-sweep.js — dört görünüm × on üç ekran genişliği

     node test-sweep.js            (özet)
     node test-sweep.js -v         (her denetimi yaz)

   test-responsive-all.js 4×8 bakıyor; bu daha geniş ve daha derin:
     · yatay kaydırma sıfır mı
     · GÖRÜNÜR bir öge ekranın sağından taşıyor mu (gizli çekmeceler
       hariç: onlar bilerek ekran dışında duruyor)
     · dokunma hedefi asgari ölçünün altında mı
     · üst üste binen metin var mı (aynı ana kapsayıcıdaki kardeşler)
     · konsol hatası / 404
     · manşet ile küre çakışıyor mu (hero'nun asıl kuralı)

   Önce sunucu: python -m http.server 8850
   ================================================================== */
const { chromium } = require("playwright");

const BASE = "http://127.0.0.1:8850/index.html";
const AYRINTI = process.argv.includes("-v");

const GORUNUMLER = [
  { ad: "kütüphane", yol: "#/" },
  { ad: "okuyucu", yol: "#/read/alice" },
  { ad: "sınav", yol: "#/quiz/alice" },
  { ad: "ilerleme", yol: "#/stats" }
];
/* 320: hâlâ kullanımda olan en dar telefon (iPhone SE 1. nesil).
   2560: geniş masaüstü — 1800 kırılma noktasının üstü. */
const OLCULER = [320, 360, 390, 414, 430, 540, 768, 834, 1024, 1280, 1440, 1920, 2560];

const NOISE = /favicon/i;

/* Tarayıcı içinde koşar: bu ölçüde neler bozuk? */
const DENETLE = () => {
  const W = document.documentElement.clientWidth;
  const sorunlar = [];

  const tas = document.documentElement.scrollWidth - W;
  if (tas > 0) sorunlar.push("yatay kaydırma " + tas + "px");

  /* Gizli katmanlar bilerek ekran dışında: çekmece, kenar çubuğu,
     baloncuk. Açık değillerse taşma sayılmazlar. */
  const gizli = (el) => el.closest(
    "#drawer:not(.show), #drawerLayer, #side:not(.show), #pop:not(.show), " +
    "#scrim:not(.show), [hidden], .wg-tip:not(.on)");

  const gorunur = [...document.querySelectorAll("body *")].filter((el) => {
    if (gizli(el)) return false;
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });

  /* Sağdan taşan görünür öge. Küre tuvali BİLEREK taşıyor (kırpılmış
     kompozisyon) — o hariç. */
  for (const el of gorunur) {
    if (el.id === "globe" || el.id === "heroOrb" || el.closest("#heroOrb")) continue;
    /* Yana kayan kaplar: sığmayan öge kaydırınca geliyor, taşma değil. */
    if (el.closest(".shelf, .decks")) continue;
    const r = el.getBoundingClientRect();
    if (r.right > W + 1.5 && r.width < W * 1.5) {
      sorunlar.push("sağdan taşıyor: " + (el.id ? "#" + el.id : el.className || el.tagName) +
                    " (" + Math.round(r.right) + " > " + W + ")");
      break;
    }
  }

  /* Dokunma hedefi: gerçekten tıklanan ögeler. */
  const tap = parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue("--tap")) || 42;
  let enKucuk = { n: "", h: 999, w: 999 };
  for (const el of gorunur) {
    if (!el.matches("button, a.btn, .spine, .deck, .hb-seg, #topbar a")) continue;
    if (el.classList.contains("spine")) continue;   // sırt bilerek dar
    const r = el.getBoundingClientRect();
    if (r.height < enKucuk.h) enKucuk = { n: el.id || el.className, h: r.height, w: r.width };
  }
  if (enKucuk.h < 24) {
    sorunlar.push("dokunma hedefi " + Math.round(enKucuk.h) + "px (" + enKucuk.n + ")");
  }

  /* Hero'nun asıl kuralı: manşet ile kürenin görünen diski çakışmasın.
     Küre ≥1081'de sağda, altında akışa giriyor. */
  const txt = document.querySelector(".hero-in");
  const orb = document.querySelector("#heroOrb");
  if (txt && orb) {
    const a = txt.getBoundingClientRect(), b = orb.getBoundingClientRect();
    if (W > 1080) {
      if (a.right > b.left + 1) sorunlar.push("manşet küre kabına giriyor");
    } else if (a.bottom > b.top + 2) {
      sorunlar.push("dar ekranda manşet kürenin üstüne biniyor");
    }
  }

  /* Manşetteki asılı karşılıklar üst üste binmesin. */
  const gl = [...document.querySelectorAll("#heroRead .hr-tr")]
    .filter((g) => getComputedStyle(g).visibility !== "hidden")
    .map((g) => g.getBoundingClientRect());
  for (let i = 1; i < gl.length; i++) {
    if (Math.abs(gl[i].top - gl[i - 1].top) < 4 && gl[i].left < gl[i - 1].right) {
      sorunlar.push("karşılıklar çakışıyor"); break;
    }
  }

  return { sorunlar, tas, enKucuk: Math.round(enKucuk.h) };
};

(async () => {
  const browser = await chromium.launch();
  let toplam = 0, bozuk = 0;
  const hepsi = [];

  console.log("görünüm      ölçü   taşma  min-hedef  sorun");
  console.log("─".repeat(70));

  for (const g of GORUNUMLER) {
    for (const w of OLCULER) {
      const ctx = await browser.newContext({
        viewport: { width: w, height: w < 500 ? 780 : 900 },
        deviceScaleFactor: 1, isMobile: w < 500, hasTouch: w < 500
      });
      const p = await ctx.newPage();
      const errs = [];
      p.on("pageerror", (e) => errs.push("JS: " + e.message.slice(0, 70)));
      p.on("console", (m) => { if (m.type() === "error") errs.push("KONSOL: " + m.text().slice(0, 70)); });
      p.on("requestfailed", (r) => { if (!NOISE.test(r.url())) errs.push("404: " + r.url().split("/").pop()); });

      await p.goto(BASE + g.yol, { waitUntil: "networkidle" });
      await p.waitForTimeout(g.yol.indexOf("read") > 0 ? 2600 : 2000);

      const r = await p.evaluate(DENETLE);
      const sorunlar = r.sorunlar.concat(errs);
      toplam++;
      if (sorunlar.length) { bozuk++; hepsi.push({ g: g.ad, w, sorunlar }); }

      if (AYRINTI || sorunlar.length) {
        console.log(
          g.ad.padEnd(12) + String(w).padStart(5) +
          String(r.tas).padStart(7) + String(r.enKucuk).padStart(11) + "  " +
          (sorunlar.length ? "✗ " + sorunlar.slice(0, 2).join(" | ") : "✓")
        );
      }
      await ctx.close();
    }
  }

  console.log("─".repeat(70));
  if (bozuk) {
    console.log("\nSORUNLAR:");
    hepsi.forEach((x) => console.log("  " + x.g + " @" + x.w + ": " + x.sorunlar.join(" | ")));
  }
  console.log("\n" + toplam + " birleşim · " + (toplam - bozuk) + " temiz · " + bozuk + " sorunlu");
  await browser.close();
  process.exit(bozuk ? 1 : 0);
})();
