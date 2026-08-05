/* ==================================================================
   build_wordgraph.js — kütüphanedeki tüm metinlerin ortak sözcük ağı

   Ne yapar:
     1. assets/docs/*.js dosyalarını sahte bir `window` içinde çalıştırıp
        window.DOCS ve window.MANIFEST'i toplar.
     2. assets/dict-*.js + assets/lookup.js'i aynı biçimde yükleyip
        Lookup.peek ile Türkçe karşılıkları ve sözcük köklerini alır.
     3. Her belgenin gövdesini sözcüklere ayırır, işlev sözcüklerini ve
        özel adları eler, en az iki belgede geçen içerik sözcüklerini seçer.
     4. Belge kümeleri örtüşen sözcükler arasında bağ kurar.
     5. assets/wordgraph.js dosyasına window.WORDGRAPH = {...} yazar.

   Çalıştırma:  node latex/build_wordgraph.js
   ================================================================== */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const OUT = path.join(ASSETS, "wordgraph.js");

/* ---- ayarlar ---------------------------------------------------- */
const MAX_NODES = 180;      // 120-200 arası
const MAX_DEGREE = 4;       // bir düğümün en çok bağ sayısı
const TARGET_LINKS = 300;   // 200-350 arası
const MIN_LEN = 4;          // en kısa sözcük
const MIN_COUNT = 4;        // korpustaki en az geçiş
const MAX_PER_DOC = 26;     // bir belgeye ait olabilecek en çok düğüm

/* ================================================================
   1. tarayıcı taklidi — dosyalar klasik <script> gibi çalışsın
   ================================================================ */
function makeSandbox() {
  const sb = {
    console,
    setInterval: () => 0,
    clearInterval: () => {},
    setTimeout: () => 0,
    clearTimeout: () => {},
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    fetch: () => Promise.reject(new Error("ağ yok")),
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    document: { createElement: () => ({ style: {} }) },
  };
  sb.window = sb;
  sb.self = sb;
  sb.globalThis = sb;
  vm.createContext(sb);
  return sb;
}

function run(sb, file) {
  vm.runInContext(fs.readFileSync(file, "utf8"), sb, { filename: path.basename(file) });
}

const SB = makeSandbox();
["dict-core.js", "dict-a-c.js", "dict-d-h.js", "dict-i-p.js", "dict-q-z.js", "lookup.js"]
  .forEach((f) => run(SB, path.join(ASSETS, f)));

const DOCDIR = path.join(ASSETS, "docs");
/* meta.js DIŞARIDA: üstveri dizini window.DOCS[id]'ye gövdesiz bir taslak
   yazıyor. Alfabetik sırada çalıştırılırsa kendinden önce gelen belgelerin
   (alice, doc-*, jadr-…) tam gövdesini eziyor ve o belgeler sözcük
   grafiğine sıfır katkıyla giriyordu. */
fs.readdirSync(DOCDIR)
  .filter((f) => f.endsWith(".js") && !/^manifest/.test(f) && f !== "meta.js")
  .forEach((f) => run(SB, path.join(DOCDIR, f)));
["manifest-notes.js", "manifest-full.js", "manifest-books.js", "manifest.js"]
  .filter((f) => fs.existsSync(path.join(DOCDIR, f)))
  .forEach((f) => run(SB, path.join(DOCDIR, f)));

const Lookup = SB.Lookup;
const DOCS = SB.window.DOCS || {};
const MANIFEST = SB.window.MANIFEST || [];
const CORE = Object.keys(SB.window.__DICT_PARTS__[0]);   // dict-core = işlev sözcükleri

/* ================================================================
   2. eleme listeleri
   ================================================================ */
/* dict-core'un tamamı + sözlükte olmayan yüksek sıklıklı işlev sözcükleri */
const EXTRA_STOP = `
i me my mine myself you your yours yourself he him his himself she her hers herself
it its itself we us our ours ourselves they them their theirs themselves
am is are was were been being be do does did done doing have has had having
shall will would should could may might must can cain ought need dare
who whom whose which what when where why how whoever whatever whenever wherever
here there thence hence hither thither yes yea nay yet ere thou thee thy thine ye
oh ah aha alas well now just too also only ever never always again once twice
said says say saying tell told telling asked ask asks answer answered replied
made make makes making made got get gets getting go goes going gone went come
came comes coming take takes taking took taken put puts putting let lets
than then thus therefore hence however moreover nevertheless whilst upon unto
into onto over under about above below after before beneath beside besides
because though although while whereas whether either neither nor
one two three four five six seven eight nine ten first second third
etc via per cent al eds vol pp doi https http www org com net
one's two's o'clock don't didn't doesn't isn't aren't wasn't weren't can't won't
sir madam mrs mister miss lady lord dear little great good bad big small
very much many more most less least such same other another each every both all
any some none nothing something anything everything nobody somebody anybody everybody
part parts kind sort thing things way ways time times day days year years
`.trim().split(/\s+/);

/* Sözlükte olsa da hero'da anlam taşımayan renksiz sözcükler. */
const BLAND = `
down back away last quite else next really cannot whole half course right
past close long high full hard clear later early likely able sure true real
main own several various certain given order form point state fact thing kind
sort side top end begin above below thereby whereby hereby wherein herein
onto amongst likewise namely indeed perhaps maybe rather quite somewhat
higher highest lower lowest greater greatest larger largest smaller
inde gene inte diffe rese pres expe cont
`.trim().split(/\s+/);

const STOP = new Set(CORE.concat(EXTRA_STOP).concat(BLAND));

/* Sözlüğün çözemediği düzensiz biçimler. */
const IRR2 = {
  flew: "fly", flown: "fly", hung: "hang", wept: "weep", slept: "sleep",
  crept: "creep", swept: "sweep", sang: "sing", sung: "sing",
  rang: "ring", rung: "ring", sprang: "spring", flung: "fling", clung: "cling",
  stung: "sting", swung: "swing", struck: "strike", stuck: "stick",
  shone: "shine", shook: "shake", shaken: "shake", threw: "throw",
  thrown: "throw", grew: "grow", grown: "grow", blew: "blow", blown: "blow",
  knelt: "kneel", leapt: "leap", dwelt: "dwell", bore: "bear",
  borne: "bear", broke: "break", broken: "break", spoke: "speak",
  spoken: "speak", stole: "steal", stolen: "steal", froze: "freeze",
  frozen: "freeze", woke: "wake", woken: "wake", wore: "wear", worn: "wear",
  tore: "tear", torn: "tear", drank: "drink", drunk: "drink", sank: "sink",
  sunk: "sink", lain: "lie", fed: "feed",
  bled: "bleed", bred: "breed", dug: "dig", hid: "hide",
  hidden: "hide", rode: "ride", ridden: "ride", rose: "rise", risen: "rise",
  drove: "drive", driven: "drive", ate: "eat", eaten: "eat",
  fought: "fight", caught: "catch", taught: "teach", bought: "buy",
  sent: "send", bent: "bend", lent: "lend",
};

/* Sözlükteki tanıma göre işlev sözcüğü olanları da at. */
const FUNC_POS = /^(det|pron|prep|conj|aux|art|num|interj)/;

/* ================================================================
   3. HTML → sözcük dizisi
   ================================================================ */
const ENT = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "—", ndash: "–", hellip: "…", rsquo: "’",
  lsquo: "‘", ldquo: "“", rdquo: "”", eacute: "e",
  deg: " ", times: " ", minus: "-", pound: " ", laquo: '"', raquo: '"',
};
function unent(s) {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, k) => {
    if (k[0] === "#") {
      const n = k[1] === "x" || k[1] === "X" ? parseInt(k.slice(2), 16) : parseInt(k.slice(1), 10);
      return isFinite(n) ? String.fromCharCode(n) : " ";
    }
    return ENT[k] !== undefined ? ENT[k] : " ";
  });
}

/* Blok düzeyindeki etiketleri satır sınırına çevirir, kalan etiketleri atar. */
const BLOCK = /<\/?(p|h1|h2|h3|h4|li|ul|ol|div|figure|figcaption|tr|td|th|table|thead|tbody|tfoot|aside|blockquote|br)\b[^>]*>/gi;
function blocks(html) {
  return unent(String(html || "").replace(BLOCK, "\n").replace(/<[^>]*>/g, " "))
    .split("\n").map((s) => s.replace(/\s+/g, " ").trim()).filter(Boolean);
}

/* doc-net-tr iki dilli: Türkçe gövde İngilizce sözcük ağına karışmamalı. */
const TR_STOP = new Set(("ve bir bu için ile olarak daha gibi olan ancak ise " +
  "ya da de ki ama çok her ne kadar sonra göre üzerine olduğu bunun şekilde " +
  "tarafından değil var yok en o şu bu bir çünkü yani ayrıca")
  .split(/\s+/));
const TRCH = /[çğıöşüÇĞİÖŞÜ]/;
function isTurkish(line) {
  const toks = line.match(/[A-Za-zçğıöşüÇĞİÖŞÜ]{2,}/g);
  if (!toks || toks.length < 3) return false;
  let hit = 0;
  toks.forEach((t) => { if (TRCH.test(t) || TR_STOP.has(t.toLowerCase())) hit++; });
  return hit / toks.length > 0.12;
}

/* Cümle başı mı? — özel ad sezgisi için gerekli. */
function sentenceStart(text, i) {
  for (let k = i - 1; k >= 0 && k >= i - 4; k--) {
    const c = text[k];
    if (c === " " || c === '"' || c === "“" || c === "‘" ||
        c === "(" || c === "'" || c === "’") continue;
    return ".!?:;—–".indexOf(c) >= 0;
  }
  return true;
}

/* ================================================================
   4. sayım
   ================================================================ */
const D = MANIFEST.map((m) => DOCS[m.id]).filter(Boolean);
const NDOC = D.length;

/* --- birinci geçiş: ham yüzey biçimlerini topla --- */
/** yüzey → {n, per:[], capMid, midTotal, allCaps} */
const RAW = new Map();
const docTokens = new Array(NDOC).fill(0);
const TOK = /[A-Za-z][A-Za-z'’-]*/g;

let trDropped = 0;
D.forEach((doc, di) => {
  blocks(doc.html).forEach((text) => {
    if (isTurkish(text)) { trDropped++; return; }
    TOK.lastIndex = 0;
    let m;
    while ((m = TOK.exec(text))) {
      // sahiplik eki ve baştaki/sondaki kesme, tire
      const raw = m[0].replace(/['’]s$/i, "").replace(/^[-'’]+|[-'’]+$/g, "");
      if (raw.length < 2) continue;
      const low = raw.toLowerCase();

      docTokens[di]++;
      let e = RAW.get(low);
      if (!e) {
        e = { n: 0, per: new Array(NDOC).fill(0), capMid: 0, midTotal: 0, allCaps: 0 };
        RAW.set(low, e);
      }
      e.n++; e.per[di]++;

      if (raw.length > 1 && raw === raw.toUpperCase()) { e.allCaps++; continue; }
      if (sentenceStart(text, m.index)) continue;      // cümle başı kanıt sayılmaz
      e.midTotal++;
      if (raw[0] === raw[0].toUpperCase()) e.capMid++;
    }
  });
});

/* --- kök çözümü ---
   1. yerel sözlük (Lookup.peek)  → sözlük anahtarı + Türkçesi
   2. düzensiz biçim çizelgesi
   3. Lookup.candidates: korpusta gerçekten geçen bir taban varsa ona indir
      (words→word, eyes→eye, waited→wait) */
const lemCache = new Map();
function lemma(w) {
  if (lemCache.has(w)) return lemCache.get(w);
  let out = { key: w, tr: "", pos: "" };
  let hit = null;
  try { hit = Lookup.peek(w); } catch (e) { hit = null; }
  if (hit && hit.key) {
    out = { key: hit.key, tr: hit.tr || "", pos: hit.pos || "" };
  } else if (IRR2[w] && RAW.has(IRR2[w])) {
    out = { key: IRR2[w], tr: "", pos: "" };
  } else {
    let cands = [];
    try { cands = Lookup.candidates(w) || []; } catch (e) { cands = []; }
    const self = RAW.get(w);
    for (const c of cands) {
      if (c === w || c.length < 3) continue;
      const other = RAW.get(c);
      // taban biçim korpusta yeterince geçiyorsa birleştir
      if (other && other.n >= Math.max(2, self.n * 0.18)) { out.key = c; break; }
    }
  }
  lemCache.set(w, out);
  return out;
}

/* --- ikinci geçiş: kök altında topla --- */
/** lemma → {n, per:[], capMid, midTotal, tr, pos, allCaps} */
const W = new Map();
for (const [low, r] of RAW) {
  const lm = lemma(low);
  let e = W.get(lm.key);
  if (!e) {
    e = { n: 0, per: new Array(NDOC).fill(0), capMid: 0, midTotal: 0,
          tr: "", pos: "", allCaps: 0 };
    W.set(lm.key, e);
  }
  if (!e.tr && lm.tr) { e.tr = lm.tr; e.pos = lm.pos; }
  e.n += r.n;
  e.capMid += r.capMid; e.midTotal += r.midTotal; e.allCaps += r.allCaps;
  for (let i = 0; i < NDOC; i++) e.per[i] += r.per[i];
}
/* kökün kendisi metinde hiç geçmemişse (eyes→eye) Türkçesini yine de ara */
for (const [key, e] of W) {
  if (e.tr) continue;
  let hit = null;
  try { hit = Lookup.peek(key); } catch (x) { hit = null; }
  if (hit && hit.tr) { e.tr = hit.tr; e.pos = hit.pos || ""; }
}

/* ================================================================
   5. düğüm seçimi
   ================================================================ */
function isProper(e) {
  return e.midTotal >= 3 && e.capMid / e.midTotal > 0.55;
}

const cand = [];
for (const [w, e] of W) {
  if (w.length < MIN_LEN) continue;
  if (STOP.has(w)) continue;
  if (e.n < MIN_COUNT) continue;
  if (/[^a-z-]/.test(w)) continue;
  if (isProper(e)) continue;
  if (e.pos && FUNC_POS.test(e.pos)) continue;
  if (e.allCaps > e.n * 0.6 && e.n < 12) continue;     // kısaltma gürültüsü

  const docIdx = [];
  for (let i = 0; i < NDOC; i++) if (e.per[i] > 0) docIdx.push(i);
  if (docIdx.length < 2) continue;                     // bağ kurulamayan sözcük işe yaramaz

  // birincil belge: belgeye göre normalleştirilmiş sıklık (küçük metinler
  // kendi karakteristik sözcüklerini alsın)
  let best = docIdx[0], bestV = -1;
  docIdx.forEach((i) => {
    const v = e.per[i] / Math.sqrt(Math.max(1, docTokens[i]));
    if (v > bestV) { bestV = v; best = i; }
  });

  const kinds = new Set(docIdx.map((i) => D[i].kind));
  const crossKind = kinds.size > 1 ? 1 : 0;

  docIdx.sort((a, b) => e.per[b] - e.per[a]);

  // Puan: bağ kurabilirlik (kaç belge) + makale⇄kitap köprüsü + sıklık +
  // Türkçe karşılığı olması + belgesine özgülük.
  cand.push({
    w, n: e.n, docs: docIdx, p: best,
    tr: shortTr(e.tr),
    score: docIdx.length * 2.2 + crossKind * 4.5 + Math.log2(e.n) * 2 +
           (e.tr ? 2.5 : 0) + Math.min(3, bestV * 12),
  });
}

function shortTr(tr) {
  if (!tr) return "";
  const parts = String(tr).split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  let out = parts.slice(0, 2).join(", ");
  if (out.length > 34) out = parts[0].slice(0, 34);
  return out;
}

cand.sort((a, b) => b.score - a.score);

/* Aynı sözcüğün çekimi zaten seçildiyse ikincisini alma (experience /
   experienced, flower / flowers). */
const SUFF = ["s", "es", "d", "ed", "ing", "ings", "ly", "er", "ers"];
function inflectionOf(w, taken) {
  for (const s of SUFF) {
    if (!w.endsWith(s)) continue;
    const base = w.slice(0, -s.length);
    if (base.length >= 3 && taken.has(base)) return true;
    if (s === "ed" || s === "ing") {
      if (taken.has(base + "e")) return true;                    // loved → love
      if (/(.)\1$/.test(base) && taken.has(base.slice(0, -1))) return true;
    }
    if (s === "es" && taken.has(base + "y")) return true;
  }
  if (w.endsWith("ies") && taken.has(w.slice(0, -3) + "y")) return true;
  return false;
}

/* Belge başına kota — takımyıldız tek bir metne yığılmasın. */
const perDoc = new Array(NDOC).fill(0);
const nodes = [];
const taken = new Set();
function add(c) { taken.add(c.w); perDoc[c.p]++; nodes.push(c); }

for (const c of cand) {
  if (nodes.length >= MAX_NODES) break;
  if (perDoc[c.p] >= MAX_PER_DOC) continue;
  if (taken.has(c.w) || inflectionOf(c.w, taken)) continue;
  add(c);
}
// kota yüzünden yer kaldıysa sırayla doldur
if (nodes.length < MAX_NODES) {
  for (const c of cand) {
    if (nodes.length >= MAX_NODES) break;
    if (taken.has(c.w) || inflectionOf(c.w, taken)) continue;
    add(c);
  }
}

/* ================================================================
   6. bağlar — belge kümesi örtüşmesi
   ================================================================ */
/* Belge ağırlığı: az düğümü olan belge daha "ayırt edici" sayılır. */
const nodesPerDoc = new Array(NDOC).fill(0);
nodes.forEach((n) => n.docs.forEach((d) => nodesPerDoc[d]++));
const docW = nodesPerDoc.map((c) => 1 / Math.log2(4 + c));

const sets = nodes.map((n) => new Set(n.docs));
const pairs = [];
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    let shared = [], wsum = 0;
    for (const d of nodes[i].docs) if (sets[j].has(d)) { shared.push(d); wsum += docW[d]; }
    if (!shared.length) continue;
    const uni = nodes[i].docs.length + nodes[j].docs.length - shared.length;
    // Örtüşme oranı × ayırt edicilik. Farklı "kıtalarda" duran sözcükler
    // ödüllendirilir: kürede uzun yaylar çizilsin, okur "bu sözcük hem şu
    // makalede hem şu öyküde geçiyor" bağını görsün.
    const sim = (wsum * shared.length) / uni +
                (nodes[i].p !== nodes[j].p ? 0.40 : 0) +
                (D[nodes[i].p].kind !== D[nodes[j].p].kind ? 0.30 : 0);
    // bağ rengi: paylaşılan belgelerin en ayırt edici olanı
    shared.sort((a, b) => docW[b] - docW[a]);
    pairs.push({ a: i, b: j, d: shared[0], sim });
  }
}
pairs.sort((x, y) => y.sim - x.sim);

const deg = new Array(nodes.length).fill(0);
const links = [];
// iki geçiş: önce herkes 3 bağa kadar, sonra kalanlar 4'e kadar
for (const cap of [3, MAX_DEGREE]) {
  for (const p of pairs) {
    if (links.length >= TARGET_LINKS) break;
    if (p.used) continue;
    if (deg[p.a] >= cap || deg[p.b] >= cap) continue;
    p.used = true;
    deg[p.a]++; deg[p.b]++;
    links.push([p.a, p.b, p.d]);
  }
  if (links.length >= TARGET_LINKS) break;
}

/* ================================================================
   7. yazım
   ================================================================ */
const docsOut = D.map((d) => ({
  id: d.id,
  title_tr: d.title.tr,
  hue: (d.cover && d.cover.hue) || 210,
  kind: d.kind || "article",
}));

const json = {
  nodes: nodes.map((n) => ({ w: n.w, n: n.n, docs: n.docs, p: n.p, tr: n.tr })),
  links: links.map((l) => ({ a: l[0], b: l[1], d: l[2] })),
  docs: docsOut,
};

const body =
  "/* wordgraph.js — latex/build_wordgraph.js tarafından üretildi, elle düzenlemeyin.\n" +
  "   " + json.nodes.length + " sözcük · " + json.links.length + " bağ · " +
  json.docs.length + " belge */\n" +
  "window.WORDGRAPH = {\n" +
  '"docs":' + JSON.stringify(json.docs) + ",\n" +
  '"nodes":[\n' + json.nodes.map((n) => JSON.stringify(n)).join(",\n") + "\n],\n" +
  '"links":[\n' + json.links.map((l) => JSON.stringify(l)).join(",\n") + "\n]\n};\n";

fs.writeFileSync(OUT, body, "utf8");

/* ---- özet ---- */
const kb = (Buffer.byteLength(body, "utf8") / 1024).toFixed(1);
const withTr = json.nodes.filter((n) => n.tr).length;
const multi = json.nodes.filter((n) => n.docs.length >= 3).length;
const cross = json.nodes.filter((n) => new Set(n.docs.map((i) => D[i].kind)).size > 1).length;
console.log("wordgraph.js yazıldı → " + path.relative(ROOT, OUT));
console.log("  düğüm      : " + json.nodes.length + " (aday " + cand.length + ")");
console.log("  bağ        : " + json.links.length);
console.log("  Türkçesi   : " + withTr + " / " + json.nodes.length);
console.log("  3+ belgede : " + multi + " · makale⇄kitap köprüsü: " + cross);
console.log("  boyut      : " + kb + " KB");
console.log("  belge başına düğüm: " +
  docsOut.map((d, i) => d.id + "=" + perDoc[i]).join(", "));
console.log("  atılan Türkçe blok: " + trDropped);
const degs = deg.slice().sort((a, b) => a - b);
console.log("  derece     : min " + degs[0] + " · ortanca " +
  degs[Math.floor(degs.length / 2)] + " · azami " + degs[degs.length - 1] +
  " · bağsız " + deg.filter((x) => x === 0).length);
console.log("  ilk 24     : " + json.nodes.slice(0, 24).map((n) => n.w).join(" "));
