/* ==================================================================
   build_bookquiz.js — tam kitaplar için sözcük sınavı üretir

     node latex/build_bookquiz.js

   Neden konu sınavı değil de SÖZCÜK sınavı:
   Yüz bin sözcüklük bir romana sekiz "olay örgüsü" sorusu yazmak hem
   okurun ne kadarını okuduğuna bağlı hem de doğruluğu kaynaktan
   denetlenemez. Buradaki her soru veriden türüyor:
     · sözcük gerçekten o kitapta geçiyor,
     · karşılığı sitenin kendi sözlüğünden geliyor,
     · açıklamada kitaptan GERÇEK bir cümle gösteriliyor.
   Uydurma payı yok ve okurun asıl ihtiyacı da bu: 500 sayfa boyunca
   karşılaştığı sözcükler.

   Kısa metinlerin elle yazılmış konu sınavları korunur; bu betik
   yalnızca sınavı olmayan belgelere dokunur.
   ================================================================== */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ASSETS = path.join(__dirname, "..", "assets");
const DOCS = path.join(ASSETS, "docs");
const SORU = 12;                    // belge başına soru

/* --------------------------- sözlük --------------------------- */
const sb = { console, setInterval() {}, clearInterval() {},
             setTimeout() {}, clearTimeout() {} };
sb.window = sb; sb.self = sb; sb.globalThis = sb;
vm.createContext(sb);
for (const f of ["dict-core.js", "dict-a-c.js", "dict-d-h.js",
                 "dict-i-p.js", "dict-q-z.js", "lookup.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ASSETS, f), "utf8"), sb);
}
const DICT = sb.Lookup.dict;
const CORE = new Set(Object.keys(sb.__DICT_PARTS__[0]));   // işlev sözcükleri

/* Yinelenebilir seçim: her çalıştırmada aynı sınav çıksın. */
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

/* Sözcüğün geçtiği GERÇEK bir cümleyi kitaptan çıkarır. */
function ornekCumle(duz, kelime) {
  const re = new RegExp("[^.!?]*\\b" + kelime + "\\b[^.!?]*[.!?]", "i");
  const m = re.exec(duz);
  if (!m) return "";
  let c = m[0].replace(/\s+/g, " ").trim();
  if (c.length > 190) {                       // uzun cümleyi sözcüğün çevresinden kırp
    const i = c.toLowerCase().indexOf(kelime.toLowerCase());
    c = (i > 70 ? "… " : "") + c.slice(Math.max(0, i - 70), i + 120).trim() + " …";
  }
  return c;
}

function quizYap(doc) {
  const duz = doc.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const low = duz.toLowerCase();
  const sayac = {};
  for (const w of low.match(/[a-z][a-z'-]{2,}/g) || []) sayac[w] = (sayac[w] || 0) + 1;

  /* Aday: sözlükte var, işlev sözcüğü değil, kitapta en az üç kez geçiyor,
     Türkçe karşılığı dolu. En sık 40 sözcük atlanır — "man, time, day"
     zaten bilinir, sınavı değersizleştirir. */
  let aday = Object.keys(sayac)
    .filter((w) => DICT[w] && !CORE.has(w) && sayac[w] >= 3 &&
                   DICT[w][1] && DICT[w][1].length > 1)
    .sort((a, b) => sayac[b] - sayac[a]);
  /* Sabit 40 atlamak yüz bin sözcüklük romanda doğruydu (aday havuzu 150-500),
     ama 2-6 bin sözcüklük kısa metinde havuz zaten 16-47 sözcük; 40 atlayınca
     geriye hiç aday kalmıyor ve metin sınavsız kalıyordu. Atlama sayısı artık
     havuzla orantılı ve havuzu asla soru sayısının altına düşürmüyor.
     267+ adayı olan her kitapta sonuç eskisiyle birebir aynı kalır. */
  const atla = Math.min(40, Math.floor(aday.length * 0.15),
                        Math.max(0, aday.length - (SORU + 3)));
  aday = aday.slice(atla, atla + 360);
  if (aday.length < SORU + 3) return null;

  const r = rng(doc.id.split("").reduce((a, c) => a + c.charCodeAt(0), 7));
  const secili = [];
  const kullanilan = new Set();
  while (secili.length < SORU && aday.length) {
    const k = Math.floor(r() * aday.length);
    const w = aday.splice(k, 1)[0];
    const tr = DICT[w][1];
    // Aynı Türkçe karşılık iki kez sorulmasın (şıklar çakışır)
    if (kullanilan.has(tr)) continue;
    kullanilan.add(tr);
    secili.push(w);
  }
  if (secili.length < 8) return null;

  return secili.map((w) => {
    const [pos, tr, not] = DICT[w];
    // çeldiriciler: aynı sınavdaki başka sözcüklerin karşılıkları
    const digerleri = secili.filter((x) => x !== w && DICT[x][1] !== tr);
    const celd = [];
    const rr = rng(w.split("").reduce((a, c) => a + c.charCodeAt(0), 13));
    const havuz = digerleri.slice();
    while (celd.length < 3 && havuz.length) {
      celd.push(DICT[havuz.splice(Math.floor(rr() * havuz.length), 1)[0]][1]);
    }
    const opts = [tr].concat(celd);
    // doğru şıkkı sabit yere koymayalım
    const yer = Math.floor(rr() * opts.length);
    const dogru = opts[0];
    opts[0] = opts[yer]; opts[yer] = dogru;

    const cumle = ornekCumle(duz, w);
    return {
      type: "mc",
      q: { en: "What does “" + w + "” mean here?",
           tr: "Bu kitapta geçen “" + w + "” ne demek?" },
      opts: opts.map((o) => ({ en: "", tr: o })),
      a: opts.indexOf(dogru),
      why: { tr: (pos ? "(" + pos + ") " : "") + tr +
                 (not ? " — " + not : "") +
                 (cumle ? "  Kitaptan: “" + cumle + "”" : "") }
    };
  });
}

/* ------------------------------------------------------------------ */
let yazilan = 0, atlanan = 0;
console.log("belge                soru  durum");
console.log("-".repeat(46));
for (const f of fs.readdirSync(DOCS)) {
  if (!f.endsWith(".js") || /^manifest/.test(f) || f === "meta.js") continue;
  const p = path.join(DOCS, f);
  const box = { console }; box.window = box; box.globalThis = box;
  vm.createContext(box);
  vm.runInContext(fs.readFileSync(p, "utf8"), box);
  const id = Object.keys(box.DOCS || {})[0];
  const doc = box.DOCS[id];
  if (doc.quiz && doc.quiz.length >= 8) {
    console.log(id.padEnd(20), String(doc.quiz.length).padStart(4), "  elle yazılmış, dokunulmadı");
    atlanan++; continue;
  }
  const q = quizYap(doc);
  if (!q) { console.log(id.padEnd(20), "   -", "  yeterli sözcük yok"); continue; }
  doc.quiz = q;
  fs.writeFileSync(p, "window.DOCS = window.DOCS || {};\n" +
    "window.DOCS[" + JSON.stringify(id) + "] = " + JSON.stringify(doc) + ";\n", "utf8");
  console.log(id.padEnd(20), String(q.length).padStart(4), "  sözcük sınavı üretildi");
  yazilan++;
}
console.log("-".repeat(46));
console.log(yazilan, "belgeye sınav yazıldı ·", atlanan, "belge zaten elle yazılmıştı");
