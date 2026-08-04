// Project Gutenberg düz metinlerinden bölüm çıkarma yardımcıları.
// Eser metnine dokunulmaz; yalnızca satır kaydırması açılır, lisans
// başlık/altbilgisi ile resim yer tutucuları ayıklanır ve _vurgu_ işaretleri
// <em> etiketine çevrilir.

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "source", "gutenberg");

function lines(file) {
  return fs.readFileSync(path.join(SRC, file), "utf8")
    .replace(/\r\n/g, "\n")
    .split("\n");
}

// [Picture: …] / [Illustration] gibi yer tutucular ve yalnızca yıldızdan
// oluşan sahne ayracı satırları eser metni değildir; atılır.
const DROP = /^\s*\[(Picture|Illustration)\b[^\]]*\]\s*$|^[\s*]*\*[\s*]*$/i;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// _italik_ → <em>italik</em>  (Gutenberg düz metin sözleşmesi)
function em(s) {
  return s.replace(/_([^_\n]+)_/g, "<em>$1</em>");
}

// Satır dizisini boş satırlarla ayrılmış bloklara böler.
function blocks(arr) {
  const out = [];
  let cur = [];
  for (const raw of arr) {
    const line = raw.replace(/\s+$/, "");
    if (DROP.test(line)) continue;
    if (line.trim() === "") {
      if (cur.length) { out.push(cur); cur = []; }
    } else {
      cur.push(line);
    }
  }
  if (cur.length) out.push(cur);
  return out;
}

// Bir blok düz paragraf mı yoksa dize (şiir) mi? Girintili ve kısa
// satırlardan oluşan bloklar dize sayılır; satır sonları korunur.
function isVerse(b) {
  if (b.length < 2) return false;
  const indented = b.filter((l) => /^\s{4,}/.test(l)).length;
  const shortish = b.filter((l) => l.trim().length < 62).length;
  return indented === b.length && shortish >= b.length - 1;
}

// Satır aralığını (1 tabanlı, uçlar dahil) <p> dizisine çevirir.
function paras(file, from, to, opts) {
  opts = opts || {};
  const arr = lines(file).slice(from - 1, to);
  const bs = blocks(arr);
  const skip = opts.skipBlocks || 0;
  const out = [];
  bs.slice(skip).forEach((b) => {
    if (opts.dropRe && b.every((l) => opts.dropRe.test(l.trim()))) return;
    if (isVerse(b)) {
      out.push("<p>" + b.map((l) => em(esc(l.trim()))).join("<br>") + "</p>");
    } else {
      out.push("<p>" + em(esc(b.map((l) => l.trim()).join(" "))) + "</p>");
    }
  });
  return out;
}

function countWords(html) {
  const plain = html.replace(/<[^>]+>/g, " ");
  return (plain.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length;
}

module.exports = { lines, paras, countWords, esc, em };
