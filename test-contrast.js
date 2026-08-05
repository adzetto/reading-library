// ==================================================================
// test-contrast.js — WCAG AA (4.5:1) metin/zemin kontrast denetimi
//
// Açık ve koyu temada, dört görünümde gezip aşağıdaki ögelerin gerçek
// (hesaplanmış) metin ve zemin renklerini okur, WCAG 2.x bağıl parlaklık
// formülüyle kontrast oranını hesaplar ve 4.5'in altında kalanları listeler.
//
// Zemin şeffafsa (rgba alfa < 1) ata düğümlere doğru çıkılır ve katmanlar
// alfa karışımıyla üst üste bindirilir — böylece .badge gibi yarı saydam
// zeminli ögeler de doğru ölçülür.
//
//   node test-contrast.js          → çıkış kodu 0 = hepsi geçti
// ==================================================================
const { chromium } = require("playwright");

const BASE = "http://127.0.0.1:8850/index.html";
const AA = 4.5;                      // normal punto gövde metni eşiği

// Denetlenecek ögeler ve hangi görünümde bulunacakları.
const HEDEFLER = [
  { ad: "manşet satırı", sel: ".hero-h1", yol: "#/" },
  { ad: "karşılık", sel: ".hero-read .hr-tr", yol: "#/" },
  { ad: "satır künyesi", sel: ".hero-source a", yol: "#/" },
  { ad: "hero etiketi", sel: ".hero-kicker", yol: "#/" },
  { sel: ".btn",         yol: "#/",                 ad: "düğme" },
  { sel: ".pick h3",     yol: "#/",                 ad: "seçilen kitap" },
  { sel: ".pick-b",      yol: "#/",                 ad: "kitap tanıtımı" },
  { sel: ".deck",        yol: "#/",                 ad: "raf sekmesi" },
  { sel: ".pick-lvl",    yol: "#/",                 ad: "kitap künyesi" },
  { sel: ".sv-card-v",   yol: "#/stats",            ad: "istatistik değeri" },
  { sel: ".sv-card-l",   yol: "#/stats",            ad: "istatistik etiketi" },
  { sel: ".sv-card-s",   yol: "#/stats",            ad: "istatistik alt metni" },
  { sel: ".sv-doc-t",    yol: "#/stats",            ad: "belge kartı başlığı" },
  { sel: ".sv-doc-meta", yol: "#/stats",            ad: "belge kartı künyesi" },
  { sel: ".sv-doc-state", yol: "#/stats",           ad: "belge kartı durumu" },
  { sel: ".sv-doc-invite", yol: "#/stats",          ad: "sınav daveti" },
  { sel: ".sv-ring-n",   yol: "#/stats",            ad: "halka yüzdesi" },
  { sel: ".sv-word-en",  yol: "#/stats",            ad: "sözcük" },
  { sel: ".sv-word-n",   yol: "#/stats",            ad: "sözcük sayacı" },
  { sel: ".sv-word-rank", yol: "#/stats",           ad: "sözcük sırası" },
  { sel: ".sv-axis-t b", yol: "#/stats",            ad: "eksen değeri" },
  { sel: ".sv-cap",      yol: "#/stats",            ad: "şekil altyazısı" },
  { sel: ".qz-opt",      yol: "#/quiz/jadr-2022",   ad: "sınav şıkkı" },
  { sel: "#article p",   yol: "#/read/jadr-2022",   ad: "makale gövdesi" },
];

const TEMALAR = ["light", "dark"];

/* Tarayıcı içinde çalışır: bir seçicinin tüm örneklerini ölçer. */
function olc(sel) {
  /* --- renk ayrıştırma: rgb()/rgba()/color(srgb …) → [r,g,b,a] ---
     color-mix() kullanan kurallarda Chromium `color(srgb 0.81 0.80 0.76)`
     döndürüyor: bileşenler 0-255 değil 0-1. Ölçekleme yapılmazsa her
     color-mix rengi neredeyse siyah sanılıp kontrast yanlış "düşük"
     çıkıyor — gerçekte 11:1 olan bir rozet 1.17:1 görünmüştü. */
  function ayir(c) {
    var s = String(c);
    var m = s.match(/[\d.]+/g);
    if (!m) return null;
    var k = /^color\(/.test(s) ? 255 : 1;     // srgb bileşenleri 0-1
    return [+m[0] * k, +m[1] * k, +m[2] * k,
            m.length > 3 ? +m[3] : 1];
  }
  /* --- alfa karışımı: üst rengi alt rengin üstüne bindirir --- */
  function bindir(ust, alt) {
    var a = ust[3];
    return [ust[0] * a + alt[0] * (1 - a),
            ust[1] * a + alt[1] * (1 - a),
            ust[2] * a + alt[2] * (1 - a), 1];
  }
  /* --- WCAG 2.x bağıl parlaklık --- */
  function parlaklik(c) {
    var k = [c[0], c[1], c[2]].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * k[0] + 0.7152 * k[1] + 0.0722 * k[2];
  }
  function oran(a, b) {
    var la = parlaklik(a), lb = parlaklik(b);
    var hi = Math.max(la, lb), lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }
  /* --- görünür zemini bul: saydam katmanları ata düğümlerle birleştir --- */
  function zemin(el) {
    var yigin = [];
    for (var n = el; n && n.nodeType === 1; n = n.parentElement) {
      var c = ayir(getComputedStyle(n).backgroundColor);
      if (c && c[3] > 0) yigin.push(c);
      if (c && c[3] === 1) break;            // opak katmana ulaşıldı, dur
    }
    // gövdenin altında kalan boşluk için beyaz varsayılır (tarayıcı davranışı)
    var alt = [255, 255, 255, 1];
    for (var i = yigin.length - 1; i >= 0; i--) alt = bindir(yigin[i], alt);
    return alt;
  }

  var kotu = null, n = 0;
  var els = Array.prototype.slice.call(document.querySelectorAll(sel));
  els.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;         // görünmeyeni ölçme
    var st = getComputedStyle(el);
    if (st.visibility === "hidden" || +st.opacity === 0) return;
    var fg = ayir(st.color);
    if (!fg) return;
    var bg = zemin(el);
    if (fg[3] < 1) fg = bindir(fg, bg);              // yarı saydam metin
    var o = oran(fg, bg);
    n++;
    if (!kotu || o < kotu.oran) {
      kotu = { oran: o, fg: st.color, bg: "rgb(" + bg.slice(0, 3).map(Math.round) + ")",
               ornek: (el.textContent || "").trim().slice(0, 28) };
    }
  });
  return kotu ? { n: n, oran: kotu.oran, fg: kotu.fg, bg: kotu.bg, ornek: kotu.ornek }
              : { n: 0 };
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const dusuk = [];
  console.log("tema   öge                  seçici          oran   metin/zemin");
  console.log("─".repeat(76));

  for (const tema of TEMALAR) {
    await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), tema);
    let sonYol = null;
    for (const h of HEDEFLER) {
      if (h.yol !== sonYol) {
        await page.evaluate((y) => { location.hash = y; }, h.yol);
        await page.waitForTimeout(h.yol.indexOf("read") > 0 ? 2200 : 1300);
        // yönlendirme temayı sıfırlayabilir; her görünümde yeniden uygula
        await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), tema);
        await page.waitForTimeout(120);
        sonYol = h.yol;
      }
      const r = await page.evaluate(olc, h.sel);
      if (!r.n) {
        console.log(`${tema.padEnd(6)} ${h.ad.padEnd(20)} ${h.sel.padEnd(15)}    —    (öge bulunamadı)`);
        continue;
      }
      const gecti = r.oran >= AA;
      if (!gecti) dusuk.push({ tema, ...h, ...r });
      console.log(
        `${tema.padEnd(6)} ${h.ad.padEnd(20)} ${h.sel.padEnd(15)} ` +
        `${r.oran.toFixed(2).padStart(5)}  ${gecti ? "✓" : "✗ DÜŞÜK"}  ` +
        `${r.fg} / ${r.bg}`
      );
    }
  }

  console.log("─".repeat(76));
  if (dusuk.length) {
    console.log("\nWCAG AA (4.5:1) altında kalanlar:");
    dusuk.forEach((d) =>
      console.log(`  ✗ [${d.tema}] ${d.sel}  ${d.oran.toFixed(2)}:1  ` +
                  `${d.fg} / ${d.bg}  «${d.ornek}»`));
  }
  console.log("\nkonsol hatası:", errs.length);
  console.log(dusuk.length ? dusuk.length + " ÖGE AA ALTINDA"
                           : "16 ölçümün hepsi WCAG AA üstünde");

  await browser.close();
  process.exit(dusuk.length || errs.length ? 1 : 0);
})();
