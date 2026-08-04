/* ==================================================================
   dedupe_manifest.js — kütüphane listesindeki yinelenen eserleri ayıklar

     node latex/dedupe_manifest.js

   İki sorun:
   1) build_library.js manifest-full.js'i baştan yazınca ELLE HAZIRLANMIŞ
      16 kitap (alice, oz, sherlock…) listeden düştü. Onların Türkçe
      tanıtımları tek tek yazılmıştı; otomatik üretilenlerden iyiler.
   2) Gutenberg'de aynı eser birden çok kayıtla duruyor: Dracula g345 ve
      g45839; "Journey to the Centre of the Earth" ile "A Journey to the
      Interior of the Earth" aynı roman. Okur aynı kitabı iki kez
      görüyordu.

   TASARIM — iki kural, ikisi de acı deneyimden:
   · Bu betik YALNIZCA manifest-full.js'i yazar, gövde dosyalarına
     DOKUNMAZ. İlk sürümü siliyordu; iki kez çalıştırılınca elle
     hazırlanan kitapların kendilerini de sildi, çünkü liste onları
     zaten içerdiği için ikinci turda "yinelenen" sanıldılar. Silmek
     geri alınamaz, listeden çıkarmak alınabilir.
   · Girdisini her zaman TÜM belge dosyalarından kurar, bir önceki
     çıktısından değil. Böylece kaç kez çalıştırılırsa aynı sonucu verir.
   ================================================================== */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DOCS = path.join(__dirname, "..", "assets", "docs");

/* Tüm belgeleri diskten oku (meta.js hariç: o gövdesiz taslak yazıyor
   ve alfabetik sırada kendinden öncekileri ezer). */
const sb = { console }; sb.window = sb; sb.globalThis = sb;
vm.createContext(sb);
for (const f of fs.readdirSync(DOCS)) {
  if (!f.endsWith(".js") || /^manifest/.test(f) || f === "meta.js") continue;
  vm.runInContext(fs.readFileSync(path.join(DOCS, f), "utf8"), sb, { filename: f });
}
const D = sb.DOCS || {};

/* Raf (tür) bilgisi KATALOGDAN gelir, eski manifestten değil.
   Manifestten okumak kararsızdı: elle hazırlanan kitabın türünü g<id>
   ikizinin rafından alıyordu, ama betik o ikizi listeden çıkarınca
   ikinci çalıştırmada tür kayboluyor ve on altı kitap "Kitaplar"
   rafına düşüyordu. sec.json her Gutenberg numarasının türünü tutuyor;
   tek doğruluk kaynağı o. */
const TURAD = { klasik: "Klasik roman", macera: "Macera", polisiye: "Polisiye",
  bilimkurgu: "Bilimkurgu", korku: "Korku", romantik: "Romantik",
  cocuk: "Çocuk", masal: "Masal ve efsane", mizah: "Mizah", oyku: "Öykü",
  gezi: "Gezi", tarihi: "Tarihî roman", siir: "Şiir" };
const turOf = {};
{
  const sec = JSON.parse(fs.readFileSync(
    path.join(__dirname, "..", "source", "gutenberg", "sec.json"), "utf8"));
  sec.forEach((x) => { turOf["g" + x.id] = TURAD[x.tur] || "Kitaplar"; });
}
const eski = {};
{
  const s2 = {}; s2.window = s2; s2.globalThis = s2; vm.createContext(s2);
  vm.runInContext(fs.readFileSync(path.join(DOCS, "manifest-full.js"), "utf8"), s2);
  (s2.MANIFEST_FULL || []).forEach((m) => { eski[m.id] = m.group; });
}
function raf(gid) { return turOf["g" + gid] || eski["g" + gid] || "Kitaplar"; }

/* Elle hazırlanan kitap → aynı eserin Gutenberg numarası. */
const ELLE = { oz: 55, grimm: 2591, "black-beauty": 271, "secret-garden": 113,
  alice: 11, "jungle-book": 236, "christmas-carol": 46, "call-of-the-wild": 215,
  "time-machine": 35, "treasure-island": 120, "tom-sawyer": 74, "peter-pan": 16,
  sherlock: 1661, "jekyll-hyde": 43, frankenstein: 84, metamorphosis: 5200 };

/* Aday liste: elle hazırlananlar + katalogdan gelen g<id>'ler. */
const aday = [];
const gorulen = new Set();
function ekle(id, grup) {
  if (!D[id] || gorulen.has(id)) return;
  gorulen.add(id);
  aday.push({ id: id, file: id + ".js", group: grup });
}
for (const id of Object.keys(ELLE)) ekle(id, raf(ELLE[id]));
/* Katalogdaki her kitap: türü sec.json'dan, yoksa eski manifestten. */
for (const id of Object.keys(D)) {
  if (/^g\d+$/.test(id)) ekle(id, turOf[id] || eski[id] || "Kitaplar");
}

/* Eş eser ayıklama. İngilizce başlık tek başına yetmiyor (aynı roman
   farklı çeviri adlarıyla duruyor); Türkçe başlık onları buluşturuyor —
   ajanların ikisine de aynı yerleşik Türkçe adı vermesi burada işe
   yarıyor. Elle hazırlanan sürüm her zaman kazanır. */
const norm = (s, tr) => String(s || "")
  .toLocaleLowerCase(tr ? "tr" : "en")
  .replace(tr ? /[^a-zçğıiöşü0-9]/g : /[^a-z0-9]/g, "").slice(0, 40);

const at = new Set();
function ayikla(anahtar, tr, etiket) {
  const grup = {};
  for (const m of aday) {
    if (at.has(m.id)) continue;
    const d = D[m.id]; if (!d) continue;
    const k = norm(anahtar(d), tr);
    if (k.length < 4) continue;
    (grup[k] = grup[k] || []).push(m.id);
  }
  let n = 0;
  for (const ids of Object.values(grup)) {
    if (ids.length < 2) continue;
    ids.sort((a, b) => {                    // elle hazırlanan önce
      const ea = a[0] !== "g", eb = b[0] !== "g";
      if (ea !== eb) return ea ? -1 : 1;
      return (+a.slice(1)) - (+b.slice(1)); // sonra küçük Gutenberg no
    });
    ids.slice(1).forEach((x) => { at.add(x); n++; });
  }
  console.log("  " + etiket + ":", n, "kayıt listeden çıkarıldı");
}
console.log("eş eser ayıklama");
ayikla((d) => d.title.en, false, "İngilizce başlığa göre");
ayikla((d) => d.title.tr, true, "Türkçe başlığa göre ");

const SIRA = ["Klasik roman", "Macera", "Polisiye", "Bilimkurgu", "Korku",
  "Romantik", "Çocuk", "Masal ve efsane", "Mizah", "Öykü", "Gezi",
  "Tarihî roman", "Şiir", "Kitaplar"];
const yeni = aday.filter((m) => !at.has(m.id));
yeni.sort((a, b) => {
  const i = SIRA.indexOf(a.group), j = SIRA.indexOf(b.group);
  return (i < 0 ? 99 : i) - (j < 0 ? 99 : j);
});

fs.writeFileSync(path.join(DOCS, "manifest-full.js"),
  "// ÜRETİLMİŞ — node latex/build_library.js + node latex/dedupe_manifest.js\n" +
  "// Kamuya açık tam eserler (Project Gutenberg), türe göre gruplu.\n" +
  "window.MANIFEST_FULL = " + JSON.stringify(yeni, null, 1) + ";\n", "utf8");

const sayim = {};
yeni.forEach((m) => { sayim[m.group] = (sayim[m.group] || 0) + 1; });
console.log("listede kalan:", yeni.length, "kitap");
console.log("raflar:", Object.entries(sayim).map((e) => e[0] + " " + e[1]).join(" · "));
console.log("NOT: gövde dosyaları silinmedi; listeden çıkanlar diskte duruyor.");
