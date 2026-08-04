/* ==================================================================
   build_library.js — 275 kitaplık katalogu belge modeline çevirir

     node latex/build_library.js

   Girdi
     source/gutenberg/sec.json        seçilen kitaplar (id, tür, başlık, yazar)
     source/gutenberg/full/<id>.txt   Gutenberg düz metinleri
     source/gutenberg/meta/out-*.json Türkçe başlık, düzey, tanıtım

   Çıktı
     assets/docs/g<id>.js             belge modeli (gövdesiyle)
     assets/docs/manifest-full.js     kütüphane listesi, türe göre gruplu

   Bölüm çözümleme build_fullbooks.js'ten geliyor; mantık tek yerde.
   Türkçe üstverisi olmayan kitap ATLANIR — Türkçe bilmeyen bir okura
   İngilizce başlıkla kitap göstermenin anlamı yok.
   ================================================================== */
const fs = require("fs");
const path = require("path");
const g = require("./gutenberg-extract.js");
const B = require("./build_fullbooks.js");

const KOK = path.join(__dirname, "..");
const GUT = path.join(KOK, "source", "gutenberg");
const DOCS = path.join(KOK, "assets", "docs");

/* Tür kodu → rafta görünen ad ve kapak imgesi */
const TURLER = {
  klasik:     { ad: "Klasik roman",  e: "📗" },
  macera:     { ad: "Macera",        e: "⛵" },
  polisiye:   { ad: "Polisiye",      e: "🔍" },
  bilimkurgu: { ad: "Bilimkurgu",    e: "🪐" },
  korku:      { ad: "Korku",         e: "🕯️" },
  romantik:   { ad: "Romantik",      e: "🌹" },
  cocuk:      { ad: "Çocuk",         e: "🧸" },
  masal:      { ad: "Masal ve efsane", e: "🐉" },
  mizah:      { ad: "Mizah",         e: "🎭" },
  oyku:       { ad: "Öykü",          e: "📑" },
  gezi:       { ad: "Gezi",          e: "🧭" },
  tarihi:     { ad: "Tarihî roman",  e: "🏛️" },
  siir:       { ad: "Şiir",          e: "🪶" }
};

/* Yazar alanı "Melville, Herman, 1819-1891" biçiminde geliyor. */
function yazarDuzelt(s) {
  if (!s) return [];
  return s.split(";").map(function (a) {
    a = a.trim().replace(/\s*\[[^\]]*\]\s*/g, "").replace(/,\s*\d{3,4}\??\s*-\s*\d{0,4}\??\s*$/, "");
    var p = a.split(",");
    return (p.length > 1 ? p[1].trim() + " " + p[0].trim() : a).trim();
  }).filter(Boolean).slice(0, 3);
}

function baslikTemizle(t) {
  return String(t || "").split("\n")[0].replace(/\s+/g, " ").trim();
}

/* ------------------------------------------------------------------ */
const sec = JSON.parse(fs.readFileSync(path.join(GUT, "sec.json"), "utf8"));

/* Türkçe üstveri: 10 ajanın yazdığı parçalar birleştirilir. */
const TR = {};
let parca = 0;
for (const f of fs.readdirSync(path.join(GUT, "meta"))) {
  if (!/^out-\d+\.json$/.test(f)) continue;
  try {
    const a = JSON.parse(fs.readFileSync(path.join(GUT, "meta", f), "utf8"));
    a.forEach(function (x) { if (x && x.id) TR[x.id] = x; });
    parca++;
  } catch (e) { console.warn("okunamadı:", f, e.message); }
}
console.log("Türkçe üstveri:", Object.keys(TR).length, "kitap ·", parca, "parça");

const man = [];
let yazildi = 0, atlandi = 0, toplamKB = 0, toplamSozcuk = 0;
const sorun = [];

for (const s of sec) {
  const tr = TR[s.id];
  if (!tr) { atlandi++; sorun.push(s.id + " üstveri yok"); continue; }
  const L = B.govde(s.id);
  if (!L || L.length < 50) { atlandi++; sorun.push(s.id + " metin yok"); continue; }

  const { bolumler } = B.bolumleriBul(L);
  const html = [], toc = [];
  if (!bolumler.length) {
    const gov = B.paragraflar(L, 0, L.length);
    if (gov.length < 3) { atlandi++; sorun.push(s.id + " paragraf yok"); continue; }
    html.push('<h1 class="chapter" id="metin">' + g.esc(baslikTemizle(s.title)) + "</h1>");
    html.push(...gov);
    toc.push({ level: 0, n: "", t: baslikTemizle(s.title), id: "metin" });
  } else {
    for (let k = 0; k < bolumler.length; k++) {
      const c = bolumler[k];
      const bas = c.i + c.atla;
      const bit = k + 1 < bolumler.length ? bolumler[k + 1].i : L.length;
      const gov = B.paragraflar(L, bas, bit);
      if (!gov.length) continue;
      const ad = ((c.n ? (c.y === 3 ? "" : "Chapter " + c.n + (c.t ? ". " : "")) : "") +
                  (c.t || "")).trim() || ("Chapter " + c.n);
      const id = B.slug(ad, k + 1);
      html.push('<h1 class="chapter" id="' + id + '">' + g.esc(ad) + "</h1>");
      html.push(...gov);
      toc.push({ level: 0, n: "", t: ad, id: id });
    }
  }
  const gövde = html.join("\n");
  const words = g.countWords(gövde);
  if (words < 2000) { atlandi++; sorun.push(s.id + " çok kısa (" + words + ")"); continue; }

  const tip = TURLER[s.tur] || { ad: "Kitaplar", e: "📘" };
  const id = "g" + s.id;
  const doc = {
    id: id, kind: "book",
    title: { en: baslikTemizle(s.title), tr: baslikTemizle(tr.tr) },
    authors: yazarDuzelt(s.authors),
    source: "Project Gutenberg — eBook #" + s.id,
    year: null,
    level: /^(A2|B1|B2|C1|C2)$/.test(tr.level) ? tr.level : "B2",
    words: words,
    minutes: Math.max(1, Math.round(words / 180)),
    blurb: { tr: String(tr.blurb || "").replace(/\s+/g, " ").trim() },
    cover: { emoji: tip.e, hue: 210 },
    toc: toc, html: gövde
  };
  const dst = path.join(DOCS, id + ".js");
  fs.writeFileSync(dst, "window.DOCS = window.DOCS || {};\nwindow.DOCS[" +
    JSON.stringify(id) + "] = " + JSON.stringify(doc) + ";\n", "utf8");
  toplamKB += fs.statSync(dst).size / 1024;
  toplamSozcuk += words;
  man.push({ id: id, file: id + ".js", group: tip.ad });
  yazildi++;
}

/* Rafları okur için anlamlı sıraya koy: kolaydan zora değil, TÜRE göre;
   tür içinde popülerlik sırası sec.json'dan geliyor. */
const SIRA = ["Klasik roman", "Macera", "Polisiye", "Bilimkurgu", "Korku",
              "Romantik", "Çocuk", "Masal ve efsane", "Mizah", "Öykü",
              "Gezi", "Tarihî roman", "Şiir"];
man.sort(function (a, b) {
  const i = SIRA.indexOf(a.group), j = SIRA.indexOf(b.group);
  return (i < 0 ? 99 : i) - (j < 0 ? 99 : j);
});

fs.writeFileSync(path.join(DOCS, "manifest-full.js"),
  "// ÜRETİLMİŞ — node latex/build_library.js\n" +
  "// Kamuya açık tam eserler (Project Gutenberg), türe göre gruplu.\n" +
  "window.MANIFEST_FULL = " + JSON.stringify(man, null, 1) + ";\n", "utf8");

console.log("-".repeat(58));
console.log("yazılan :", yazildi, "kitap ·", toplamSozcuk.toLocaleString("tr"), "sözcük ·",
            (toplamKB / 1024).toFixed(1), "MB");
console.log("atlanan :", atlandi);
if (sorun.length) console.log("  ", sorun.slice(0, 12).join(" | "),
                              sorun.length > 12 ? "…" : "");
const sayim = {};
man.forEach(function (m) { sayim[m.group] = (sayim[m.group] || 0) + 1; });
console.log("raflar  :", Object.entries(sayim).map(function (e) {
  return e[0] + " " + e[1];
}).join(" · "));
