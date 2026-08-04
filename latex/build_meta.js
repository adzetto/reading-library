/* ==================================================================
   build_meta.js — belge üstverisi dizini üretir

     node latex/build_meta.js       →  assets/docs/meta.js

   Neden: index.html bugüne kadar HER belge dosyasını açılışta klasik
   <script> ile yüklüyordu. Dört makale + altı kısa öykü ile bu 730 KB
   idi; tam romanlar eklenince 6 MB'ı geçiyor ve telefonda kütüphane
   sayfası tek satır okumadan önce her kitabın tamamını indiriyor.

   Çözüm: kart listesi için gereken alanlar (başlık, düzey, sözcük
   sayısı, tanıtım) küçük bir dizinde toplanır; ağır olan `html` gövdesi
   yalnızca o belge açılınca yüklenir (app.js ensureDoc).

   Dizin, gövde dosyasıyla AYNI biçimi kullanır: window.DOCS[id] = {...}.
   Böylece başlık okuyan her yer (kartlar, istatistik, "devam" düğmesi)
   değişmeden çalışır. Fark tek alanda: __stub true ise gövde henüz
   gelmemiştir. Gövde dosyası yüklendiğinde nesnenin tamamını ezer.
   ================================================================== */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ASSETS = path.join(__dirname, "..", "assets");
const DOCDIR = path.join(ASSETS, "docs");

/* Belge dosyaları tarayıcı için yazıldı; sahte bir window'da çalıştırıp
   nesneyi okuyoruz (build_wordgraph.js ile aynı yöntem). */
function sandbox() {
  const sb = { console, setTimeout, clearTimeout };
  sb.window = sb; sb.self = sb; sb.globalThis = sb;
  vm.createContext(sb);
  return sb;
}

/* Kart listesinin ve istatistik sayfasının okuduğu alanlar. `html`,
   `toc` ve `quiz` bilerek DIŞARIDA: dizini şişiren onlar. */
const KEEP = ["id", "kind", "title", "authors", "source", "year",
              "level", "words", "minutes", "blurb", "cover"];

const sb = sandbox();
const files = fs.readdirSync(DOCDIR)
  .filter((f) => f.endsWith(".js") && !f.startsWith("manifest") && f !== "meta.js")
  .sort();

const out = {};
let tam = 0;
for (const f of files) {
  vm.runInContext(fs.readFileSync(path.join(DOCDIR, f), "utf8"), sb,
                  { filename: f });
  tam += fs.statSync(path.join(DOCDIR, f)).size;
}
for (const [id, d] of Object.entries(sb.DOCS || {})) {
  const m = {};
  for (const k of KEEP) if (d[k] !== undefined) m[k] = d[k];
  // gövde dosyasının adı: yükleyici bunu kullanır
  const file = files.find((f) => {
    const s = fs.readFileSync(path.join(DOCDIR, f), "utf8");
    return s.includes('DOCS["' + id + '"]');
  });
  if (!file) { console.warn("dosya bulunamadı:", id); continue; }
  m.__file = file;
  m.__stub = true;
  out[id] = m;
}

const body = Object.keys(out).sort().map(
  (id) => 'D[' + JSON.stringify(id) + ']=' + JSON.stringify(out[id]) + ';'
).join("\n");

const js =
`/* ÜRETİLMİŞ DOSYA — elle düzenlemeyin.  node latex/build_meta.js
   ${Object.keys(out).length} belge · gövdeler istendiğinde yüklenir (app.js ensureDoc).
   __stub:true → gövde henüz yok; gövde dosyası yüklenince nesne tamamen değişir. */
window.DOCS = window.DOCS || {};
(function (D) {
${body}
})(window.DOCS);
`;

const dst = path.join(DOCDIR, "meta.js");
fs.writeFileSync(dst, js, "utf8");
console.log("meta.js yazıldı:", Object.keys(out).length, "belge,",
            (fs.statSync(dst).size / 1024).toFixed(1), "KB");
console.log("gövdelerin toplamı:", (tam / 1024 / 1024).toFixed(2),
            "MB — artık açılışta yüklenmiyor");
