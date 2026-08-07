/* ==================================================================
   dict_gap.js — sözlüğün gerçek kapsamını ölçer ve eksikleri sıralar

     node latex/dict_gap.js            (özet)
     node latex/dict_gap.js --yaz      (eksik listesini dosyaya yazar)

   NEDEN BELİRTEÇ AĞIRLIKLI ÖLÇÜM
   "Sözlükte 1.134 madde var" bir şey anlatmıyor. Okurun yaşadığı şey
   şudur: bir sözcüğe dokunduğunda karşılık geliyor mu? Bu yüzden ölçü
   TÜR (farklı sözcük) değil BELİRTEÇ (her geçiş) ağırlıklı: metinde yüz
   kez geçen bir sözcüğün eksikliği, bir kez geçenden yüz kat ağırdır.

   Lookup.peek() çekim eklerini de çözüyor (walked → walk), o yüzden
   ölçüm doğrudan onun üzerinden yapılır; ham sözlük anahtarına bakmak
   kapsamı olduğundan düşük gösterirdi.
   ================================================================== */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const DOCDIR = path.join(ASSETS, "docs");

/* ---------------- tarayıcı taklidi ---------------- */
function sandbox() {
  const sb = {
    console,
    setInterval: () => 0, clearInterval: () => {},
    setTimeout: () => 0, clearTimeout: () => {},
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    fetch: () => Promise.reject(new Error("ağ yok")),
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    document: { createElement: () => ({ style: {} }) },
  };
  sb.window = sb; sb.self = sb; sb.globalThis = sb;
  vm.createContext(sb);
  return sb;
}
const SB = sandbox();
const oku = (f) => vm.runInContext(fs.readFileSync(f, "utf8"), SB,
                                   { filename: path.basename(f) });

["dict-core.js", "dict-a-c.js", "dict-d-h.js", "dict-i-p.js",
 "dict-q-z.js", "dict-ext.js", "lookup.js"].forEach((f) => oku(path.join(ASSETS, f)));

const belgeler = fs.readdirSync(DOCDIR)
  .filter((f) => f.endsWith(".js") && !/^manifest/.test(f) && f !== "meta.js");
belgeler.forEach((f) => oku(path.join(DOCDIR, f)));
["manifest-notes.js", "manifest-full.js", "manifest-books.js", "manifest.js"]
  .filter((f) => fs.existsSync(path.join(DOCDIR, f)))
  .forEach((f) => oku(path.join(DOCDIR, f)));

const L = SB.Lookup;
const DOCS = SB.window.DOCS || {};
const MAN = SB.window.MANIFEST || [];
const CORE = new Set(Object.keys(SB.window.__DICT_PARTS__[0]));

/* ---------------- ölçüm ---------------- */
const sayac = new Map();          // kök → toplam geçiş
const belgeSayisi = new Map();    // kök → kaç belgede
let toplamBelirtec = 0, kapsanan = 0;
const belgeKapsam = [];

function duz(html) {
  return html.replace(/<span class="math">[\s\S]*?<\/span>/g, " ")
             .replace(/<div class="eq"[\s\S]*?<\/div>\s*<\/div>/g, " ")
             .replace(/<[^>]+>/g, " ");
}

for (const m of MAN) {
  const d = DOCS[m.id];
  if (!d || !d.html) continue;
  const kelimeler = duz(d.html).toLowerCase().match(/[a-z][a-z'’-]{1,}/g) || [];
  let bt = 0, bk = 0;
  const gorulen = new Set();
  for (const ham of kelimeler) {
    const w = ham.replace(/[’']s$/, "").replace(/^[-']+|[-']+$/g, "");
    if (w.length < 2) continue;
    bt++;
    const r = L.peek(w);
    if (r && r.tr) { bk++; continue; }
    /* Eksik: işlev sözcüğü değilse kaydet. */
    if (CORE.has(w)) continue;
    sayac.set(w, (sayac.get(w) || 0) + 1);
    if (!gorulen.has(w)) { gorulen.add(w); belgeSayisi.set(w, (belgeSayisi.get(w) || 0) + 1); }
  }
  toplamBelirtec += bt; kapsanan += bk;
  if (bt > 500) belgeKapsam.push({ id: m.id, oran: bk / bt, n: bt });
}

const yuzde = (x) => (x * 100).toFixed(1) + "%";
console.log("KAPSAM (belirteç ağırlıklı)");
console.log("  toplam sözcük geçişi :", toplamBelirtec.toLocaleString("tr"));
console.log("  karşılığı olan       :", kapsanan.toLocaleString("tr"), "·", yuzde(kapsanan / toplamBelirtec));
console.log("  sözlük madde sayısı  :", L.size);

belgeKapsam.sort((a, b) => a.oran - b.oran);
console.log("\nEN DÜŞÜK KAPSAMLI BEŞ BELGE");
belgeKapsam.slice(0, 5).forEach((x) =>
  console.log("  " + yuzde(x.oran).padStart(6) + "  " + x.id));
console.log("EN YÜKSEK");
belgeKapsam.slice(-3).forEach((x) =>
  console.log("  " + yuzde(x.oran).padStart(6) + "  " + x.id));

/* En çok kazandıracak eksikler: geçiş sayısına göre. */
const eksik = [...sayac.entries()]
  .map(([w, n]) => ({ w, n, d: belgeSayisi.get(w) || 0 }))
  .filter((x) => x.d >= 3 && x.n >= 12 && /^[a-z]+$/.test(x.w) && x.w.length >= 3)
  .sort((a, b) => b.n - a.n);

const ilk2000 = eksik.slice(0, 2000).reduce((s, x) => s + x.n, 0);
console.log("\nEKSİK SÖZCÜKLER (≥3 belgede, ≥12 geçiş):", eksik.length.toLocaleString("tr"));
console.log("  ilk 2000'i eklemek kapsamı", yuzde(kapsanan / toplamBelirtec),
            "→", yuzde((kapsanan + ilk2000) / toplamBelirtec), "yapar");
console.log("\nEN SIK 30 EKSİK");
console.log("  " + eksik.slice(0, 30).map((x) => x.w + "(" + x.n + ")").join(", "));

if (process.argv.includes("--yaz")) {
  const hedef = path.join(ROOT, "source", "dict-gap.json");
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  fs.writeFileSync(hedef, JSON.stringify(eksik.slice(0, 2000), null, 1), "utf8");
  console.log("\nsource/dict-gap.json yazıldı:", Math.min(2000, eksik.length), "sözcük");
}
