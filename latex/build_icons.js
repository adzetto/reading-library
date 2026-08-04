// Lucide'dan yalnızca kullandığımız ikonları çıkarıp tek bir küçük
// modüle yazar. Tüm kütüphaneyi paketlemek file:// için gereksiz ağır.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "node_modules", "lucide", "dist", "esm", "icons");
const OUT = path.join(ROOT, "assets", "icons.js");

// arayüzde geçen adlar → lucide dosya adı
const WANT = {
  library: "library",
  book: "book-open",
  article: "file-text",
  stats: "chart-no-axes-column",
  moon: "moon",
  sun: "sun",
  menu: "menu",
  close: "x",
  play: "play",
  pause: "pause",
  stop: "square",
  prev: "skip-back",
  next: "skip-forward",
  volume: "volume-2",
  sparkles: "sparkles",
  notebook: "notebook-pen",
  quiz: "graduation-cap",
  check: "circle-check-big",
  clock: "clock",
  flame: "flame",
  target: "target",
  search: "search",
  minus: "minus",
  plus: "plus",
  arrowUp: "arrow-up",
  arrowLeft: "arrow-left",
  arrowRight: "arrow-right",
  download: "download",
  upload: "upload",
  trash: "trash-2",
  underline: "underline",
  expand: "maximize-2",
  shrink: "minimize-2",
  languages: "languages",
  headphones: "headphones",
  brain: "brain",
  scroll: "scroll-text",
  feather: "feather",
  compass: "compass",
  layers: "layers",
  bookmark: "bookmark",
  gauge: "gauge",
  chevronDown: "chevron-down",
  chevronRight: "chevron-right",
  settings: "settings-2",
  refresh: "rotate-ccw",
  eye: "eye",
  zap: "zap",
};

function readIcon(file) {
  const p = path.join(SRC, file + ".mjs");   // lucide 1.x .mjs kullanıyor
  if (!fs.existsSync(p)) return null;
  const src = fs.readFileSync(p, "utf8");
  // lucide her ikonu [ ["path", {d:"…"}], … ] dizisi olarak dışa verir.
  // Tek ögeli ikonlar tek satıra sığar, çok ögeliler satırlara yayılır.
  const m = src.match(/=\s*(\[[\s\S]*?\]);\s*\n\s*export/);
  if (!m) return null;
  let arr;
  try { arr = eval(m[1]); } catch (e) { return null; }
  return arr.map(([tag, attrs]) => {
    const a = Object.entries(attrs)
      .filter(([k]) => k !== "key")
      .map(([k, v]) => `${k}="${v}"`).join(" ");
    return `<${tag} ${a}/>`;
  }).join("");
}

const out = {};
const missing = [];
for (const [name, file] of Object.entries(WANT)) {
  const body = readIcon(file);
  if (body) out[name] = body; else missing.push(name + " (" + file + ")");
}

const js = `/* Lucide ikonları (ISC). build_icons.js ile üretildi — elle düzenlemeyin. */
window.ICONS = ${JSON.stringify(out)};
/* icon("play", 18) → <svg …>  */
window.icon = function (name, size, cls) {
  var b = window.ICONS[name];
  if (!b) return "";
  return '<svg class="ic' + (cls ? " " + cls : "") + '" width="' + (size || 18) +
    '" height="' + (size || 18) + '" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="1.75" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true">' + b + "</svg>";
};
`;
fs.writeFileSync(OUT, js, "utf8");
console.log(`${Object.keys(out).length} ikon yazıldı → assets/icons.js ` +
  `(${Math.round(fs.statSync(OUT).size / 1024)} KB)`);
if (missing.length) console.log("BULUNAMADI: " + missing.join(", "));
