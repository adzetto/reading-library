// Tüm belge modellerini denetler: alan bütünlüğü, toc↔başlık eşleşmesi,
// sınav geçerliliği, sözcük sayısı doğruluğu, tehlikeli içerik.
global.window = global;
const fs = require("fs");
const path = require("path");

const DOCS = path.join(__dirname, "..", "assets", "docs");
/* meta.js atlanır: gövdesiz taslak yazıyor ve alfabetik sırada
   kendinden önceki belgelerin tam hâlini ezerdi (bkz. build_wordgraph). */
for (const f of fs.readdirSync(DOCS)) {
  if (f.endsWith(".js") && f !== "meta.js") {
    eval(fs.readFileSync(path.join(DOCS, f), "utf8"));
  }
}

// manifest.js sonunda MANIFEST_BOOKS'u kendisi ekliyor; ikinci kez
// birleştirmek her kitabı iki kez sayar.
const raw = (window.MANIFEST || []).concat(window.MANIFEST_BOOKS || [])
  .concat(window.MANIFEST_NOTES || []);
const man = raw.filter((m, i) => raw.findIndex((x) => x.id === m.id) === i);
let fails = 0, totalWords = 0;
const seen = new Set();

console.log("belge                 sözcük  sev  soru  toc  durum");
console.log("─".repeat(62));

for (const m of man) {
  const d = window.DOCS[m.id];
  const problems = [];
  if (!d) { console.log(`  ${m.id}  ! DOSYA YOK`); fails++; continue; }
  if (seen.has(m.id)) problems.push("yinelenen id");
  seen.add(m.id);

  for (const k of ["id", "kind", "title", "authors", "source", "level", "html", "toc"]) {
    if (d[k] == null) problems.push("eksik alan: " + k);
  }
  if (d.title && (!d.title.en || !d.title.tr)) problems.push("başlık eksik (en/tr)");
  if (!d.blurb || !d.blurb.tr) problems.push("blurb.tr yok");

  const plain = d.html.replace(/<[^>]+>/g, " ");
  const words = (plain.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length;
  totalWords += words;
  if (d.words && Math.abs(d.words - words) / words > 0.05)
    problems.push(`words ${d.words} ≠ gerçek ${words}`);

  // toc ↔ başlık id eşleşmesi
  const heads = [...d.html.matchAll(/<h[123][^>]*\sid="([^"]+)"/g)].map((x) => x[1]);
  const toc = (d.toc || []).map((t) => t.id);
  const onlyHead = heads.filter((h) => !toc.includes(h));
  const onlyToc = toc.filter((t) => !heads.includes(t));
  if (onlyHead.length) problems.push("toc'ta yok: " + onlyHead.slice(0, 2));
  if (onlyToc.length) problems.push("başlıkta yok: " + onlyToc.slice(0, 2));

  // sınav
  const q = d.quiz || [];
  if (q.length < 8) problems.push("soru < 8 (" + q.length + ")");
  q.forEach((x, i) => {
    if (!x.q || !x.q.en || !x.q.tr) problems.push(`s${i + 1}: soru iki dilde değil`);
    if (x.type === "match") {
      const n = (x.left || x.pairs || []).length;
      if (n < 3) problems.push(`s${i + 1}: eşleştirme < 3`);
    } else {
      const o = x.opts || [];
      if (o.length < 2) problems.push(`s${i + 1}: şık < 2`);
      if (!(x.a >= 0 && x.a < o.length)) problems.push(`s${i + 1}: a indeksi geçersiz`);
      o.forEach((y, j) => {
        if (!y || (!y.en && !y.tr)) problems.push(`s${i + 1}.${j + 1}: boş şık`);
      });
    }
    if (!x.why || !x.why.tr) problems.push(`s${i + 1}: why.tr yok`);
  });

  // güvenlik
  if (/<script|onerror=|onload=|javascript:/i.test(d.html))
    problems.push("html'de tehlikeli içerik");

  const ok = problems.length === 0;
  if (!ok) fails++;
  console.log(
    `${m.id.padEnd(20)} ${String(words).padStart(6)}  ${String(d.level || "?").padEnd(3)} ` +
    ` ${String(q.length).padStart(4)}  ${String(toc.length).padStart(3)}  ` +
    (ok ? "✓" : "✗ " + problems.slice(0, 2).join("; "))
  );
}

console.log("─".repeat(62));
console.log(`${man.length} belge · ${totalWords.toLocaleString("tr")} sözcük · ` +
  (fails ? `${fails} belgede sorun` : "hepsi geçerli"));
process.exit(fails ? 1 : 0);
