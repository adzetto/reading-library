/* ==================================================================
   build_dict_ext.js — ajanların yazdığı maddeleri sözlüğe katar

     node latex/build_dict_ext.js

   Girdi : source/dict/out-*.json   ({ sözcük: [tür, tr, tanım] })
   Çıktı : assets/dict-ext.js

   NEDEN AYRI DOSYA
   Mevcut dict-* dosyaları elle yazıldı; onlara dokunmak hem çakışma
   riski hem de gözden geçirilmiş maddeleri kaybetme riski. Ayrı dosya
   ikisini de ortadan kaldırıyor.

   YÜKLEME SIRASI: dict-ext.js dict-* dosyalarının EN SONUNA, lookup.js'ten
   hemen önce girer. Çakışma sorun değil, çünkü aşağıdaki VAR[w] denetimi
   elle yazılmış maddeleri baştan eliyor. Sıranın önemi başka: üç derleme
   betiği (build_wordgraph, build_bookquiz, dict_gap) işlev sözcüğü listesi
   olarak __DICT_PARTS__[0]'ı okuyor ve orada dict-core durmalı.

   Denetimler (bozuk madde sessizce girmesin):
     · üç elemanlı dizi mi
     · Türkçe karşılık boş mu
     · İngilizce sızıntısı var mı (tanım Türkçe olmalı)
     · mevcut sözlükte zaten var mı (varsa atlanır)
   ================================================================== */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const GIRDI = path.join(ROOT, "source", "dict");

/* ---- mevcut sözlüğü yükle: üzerine yazmayalım ---- */
const sb = { console, setInterval: () => 0, clearInterval() {},
             setTimeout: () => 0, clearTimeout() {} };
sb.window = sb; sb.self = sb; sb.globalThis = sb;
vm.createContext(sb);
["dict-core.js", "dict-a-c.js", "dict-d-h.js", "dict-i-p.js",
 "dict-q-z.js", "lookup.js"].forEach((f) =>
  vm.runInContext(fs.readFileSync(path.join(ASSETS, f), "utf8"), sb, { filename: f }));
const VAR = sb.Lookup.dict;

/* Tanımda İngilizce cümle kalıntısı: tırnak içindeki örnekler serbest,
   ama tırnak dışında İngilizce sözcük dizisi olmamalı. */
const ING = /\b(the|and|that|with|which|from|this|there|would|about|these)\b/i;

const maddeler = {};
let okunan = 0, atlanan = 0;
const sorun = [];

for (const f of fs.readdirSync(GIRDI).sort()) {
  if (!/^out-\d+\.json$/.test(f)) continue;
  let veri;
  try {
    veri = JSON.parse(fs.readFileSync(path.join(GIRDI, f), "utf8"));
  } catch (e) {
    sorun.push(f + " okunamadı: " + e.message);
    continue;
  }
  let n = 0;
  for (const [w, kayit] of Object.entries(veri)) {
    okunan++;
    if (!Array.isArray(kayit) || kayit.length !== 3) {
      sorun.push(f + " · " + w + ": biçim bozuk"); atlanan++; continue;
    }
    const [pos, tr, def] = kayit.map((x) => String(x == null ? "" : x).trim());
    if (!tr || tr.length < 2) { sorun.push(f + " · " + w + ": karşılık boş"); atlanan++; continue; }
    if (!/^[a-z][a-z'’-]*$/.test(w)) { atlanan++; continue; }
    if (VAR[w]) { atlanan++; continue; }             // elle yazılan kazanır
    /* Tırnak içi örnekleri çıkarıp İngilizce sızıntısına bak.
       Örnekler "'shake one's head' = başını sallamak" biçiminde ve içlerinde
       kesme işareti geçiyor; basit /'[^']*'/ kalıbı bu yüzden erken kapanıp
       İngilizceyi dışarıda bırakıyordu. Önce "… ' =" ile biten örnekleri
       ayıklıyoruz, sonra kalan sade tırnakları. */
    const cip = def
      .replace(/['’][^=]{0,80}?['’](?=\s*=)/g, " ")
      .replace(/['’][^'’]*['’]/g, " ")
      .replace(/"[^"]*"/g, " ");
    if (ING.test(cip)) sorun.push(f + " · " + w + ": tanımda İngilizce olabilir");
    maddeler[w] = [pos, tr, def];
    n++;
  }
  console.log("  " + f + ": " + n + " madde");
}

const anahtarlar = Object.keys(maddeler).sort();

/* ---- iki dosyaya bölünüyor ----------------------------------------
   Ölçtük: uzun açıklama (def) gzip'li boyutun %79'u. Oysa açılışta
   gereken yalnızca "sözcük → karşılık": vurgulama, sözlük sayacı ve
   peek() bunu kullanıyor. Uzun açıklama ancak biri bir sözcüğe
   dokunduğunda okunuyor ve açılır pencere zaten eşzamansız. O yüzden
   karşılıklar peşin, açıklamalar ilk dokunuşta yükleniyor.
     dict-ext.js      [tür, karşılık]      ~37 KB gzip  · index.html
     dict-ext-def.js  açıklama metinleri  ~113 KB gzip  · istek üzerine
   ------------------------------------------------------------------ */
const govdeKisa = anahtarlar
  .map((w) => JSON.stringify(w) + ":" + JSON.stringify([maddeler[w][0], maddeler[w][1]]))
  .join(",\n");
const govdeDef = anahtarlar
  .filter((w) => maddeler[w][2])
  .map((w) => JSON.stringify(w) + ":" + JSON.stringify(maddeler[w][2]))
  .join(",\n");

const js =
`/* ÜRETİLMİŞ DOSYA — elle düzenlemeyin.  node latex/build_dict_ext.js
   Kütüphanenin kendi metinlerinden çıkarılan, sözlükte eksik olan en sık
   ${anahtarlar.length} sözcük. Kapsam ölçümü: node latex/dict_gap.js

   Yalnızca [tür, karşılık]. Uzun açıklamalar dict-ext-def.js'te ve
   lookup.js onları ilk sözcük aramasında yüklüyor.

   index.html'de dict-* dosyalarının SONUNA, lookup.js'ten önce yüklenir.
   Elle yazılmış maddelerle çakışmaz: üretici onları zaten atlıyor. */
window.__DICT_PARTS__ = window.__DICT_PARTS__ || [];
window.__DICT_PARTS__.push({
${govdeKisa}
});
`;

const jsDef =
`/* ÜRETİLMİŞ DOSYA — elle düzenlemeyin.  node latex/build_dict_ext.js
   dict-ext.js maddelerinin uzun Türkçe açıklamaları. index.html'de YOK:
   lookup.js ensureDefs() ile ilk sözcük aramasında <script> enjekte
   ederek getiriyor (file:// altında da çalışsın diye fetch değil). */
window.__DICT_DEFS__ = {
${govdeDef}
};
if (window.Lookup && window.Lookup.defsReady) window.Lookup.defsReady();
`;

const hedef = path.join(ASSETS, "dict-ext.js");
const hedefDef = path.join(ASSETS, "dict-ext-def.js");
fs.writeFileSync(hedef, js, "utf8");
fs.writeFileSync(hedefDef, jsDef, "utf8");
console.log("-".repeat(50));
console.log("dict-ext.js    :", anahtarlar.length, "madde ·",
            (fs.statSync(hedef).size / 1024).toFixed(0), "KB  (açılışta)");
console.log("dict-ext-def.js:", (fs.statSync(hedefDef).size / 1024).toFixed(0),
            "KB  (istek üzerine)");
console.log("okunan:", okunan, "· atlanan:", atlanan,
            "(zaten var olan ya da bozuk)");
if (sorun.length) {
  console.log("\nuyarılar (" + sorun.length + "):");
  sorun.slice(0, 15).forEach((s) => console.log("  " + s));
}
