/* ==================================================================
   build_fullbooks.js — Project Gutenberg TAM eserlerini belge modeline
   çevirir.

     node latex/build_fullbooks.js            (hepsi)
     node latex/build_fullbooks.js alice oz   (yalnız seçilenler)

   Girdi : source/gutenberg/full/<gid>.txt   (düz metin, UTF-8)
   Çıktı : assets/docs/<id>.js  +  assets/docs/manifest-full.js

   Eser metnine DOKUNULMAZ. Yalnızca:
     · Gutenberg lisans başlığı/altbilgisi,
     · resim yer tutucuları ve yıldızlı sahne ayraçları
   ayıklanır; satır kaydırması açılır, _vurgu_ → <em>.

   Bölüm başlığı yakalama tek bir kalıpla olmuyor — Gutenberg metinleri
   otuz yılda farklı elden geçmiş. Üç ayrı yöntem sırayla denenir ve
   ÇIKAN SONUÇ DOĞRULANIR (bölüm sayısı ve başlık uzunluğu makul mü).
   Hiçbiri tutmazsa kitap tek bölüm olarak kurulur; okunur kalır ama
   içindekiler listesi olmaz.
   ================================================================== */
const fs = require("fs");
const path = require("path");
const g = require("./gutenberg-extract.js");

const SRC = path.join(__dirname, "..", "source", "gutenberg", "full");
const DOCS = path.join(__dirname, "..", "assets", "docs");

/* ------------------------------------------------------------------ */
/*  KİTAPLIK — sıra kolaydan zora                                      */
/*  minutes: 180 sözcük/dk (yabancı dilde okuma, sözlüğe bakarak)      */
/* ------------------------------------------------------------------ */
const BOOKS = [
  { id: "oz", gid: 55, level: "B1", emoji: "🌪️",
    en: "The Wonderful Wizard of Oz", tr: "Oz Büyücüsü",
    author: "L. Frank Baum", year: 1900,
    blurb: "Kansas'tan bir kasırgayla savrulan Dorothy, evine dönmek için sarı tuğlalı yolu izler. Yolda beyni olmayan bir korkuluk, kalbi olmayan bir teneke adam ve cesareti olmayan bir aslan katılır ona. Kısa cümleler ve tekrar eden kalıplar; ilk tam roman için en uygunu." },
  { id: "grimm", gid: 2591, level: "B1", emoji: "🐺",
    en: "Grimms' Fairy Tales", tr: "Grimm Masalları",
    author: "Jacob Grimm, Wilhelm Grimm", year: 1812,
    blurb: "Kurbağa Prens, Hansel ile Gretel, Külkedisi, Rapunzel… Her masal birkaç sayfa; istediğiniz yerde bırakıp başka birine geçebilirsiniz. Masal dili yalın ve döngüseldir, aynı kalıplar tekrarlandığı için sözcükler kendiliğinden yerleşir." },
  { id: "black-beauty", gid: 271, level: "B1", emoji: "🐴",
    en: "Black Beauty", tr: "Siyah İnci",
    author: "Anna Sewell", year: 1877,
    blurb: "Bir atın kendi ağzından yaşam öyküsü: huzurlu bir çiftlikten Londra'nın taş sokaklarına. Bölümler kısa, anlatım birinci ağızdan ve sakin; hayvanlara merhamet üzerine yazılmış ilk romanlardan." },
  { id: "secret-garden", gid: 113, level: "B1", emoji: "🌱",
    en: "The Secret Garden", tr: "Gizli Bahçe",
    author: "Frances Hodgson Burnett", year: 1911,
    blurb: "Öksüz kalan aksi Mary, Yorkshire'daki devasa bir konağa gönderilir ve on yıldır kilitli duran bir bahçenin anahtarını bulur. Bahçe canlandıkça çocuklar da canlanır. Yorkshire ağzıyla konuşan karakterler var; onların repliklerini atlayarak da okuyabilirsiniz." },
  { id: "alice", gid: 11, level: "B2", emoji: "🐇",
    en: "Alice's Adventures in Wonderland", tr: "Alice Harikalar Diyarında",
    author: "Lewis Carroll", year: 1865,
    blurb: "Alice bir tavşan deliğinden düşer ve mantığın kurallarının işlemediği bir dünyaya varır. Kelime oyunları ve saçmalık şiirleri yüzünden sözlükten öteye geçen bir metin; tam da bu yüzden dilin nasıl esnediğini gösterir." },
  { id: "jungle-book", gid: 236, level: "B2", emoji: "🐯",
    en: "The Jungle Book", tr: "Orman Kitabı",
    author: "Rudyard Kipling", year: 1894,
    blurb: "Kurtlar tarafından büyütülen Mowgli'nin ormandaki yaşamı, kaplan Shere Khan'la hesaplaşması ve ayrı öyküler hâlinde başka hayvan masalları. Her bölüm kendi içinde tamamlanır." },
  { id: "christmas-carol", gid: 46, level: "B2", emoji: "🕯️",
    en: "A Christmas Carol", tr: "Bir Noel Şarkısı",
    author: "Charles Dickens", year: 1843,
    blurb: "Cimri Scrooge'a Noel gecesi üç hayalet uğrar: geçmiş, bugün ve gelecek. Beş bölümlük kısa bir roman — Dickens'ın uzun cümlelerine bir tam kitabı bitirmeden alışmak için en kısa yol." },
  { id: "call-of-the-wild", gid: 215, level: "B2", emoji: "🐺",
    en: "The Call of the Wild", tr: "Vahşetin Çağrısı",
    author: "Jack London", year: 1903,
    blurb: "Çalınıp Klondike'a kızak köpeği olarak satılan Buck'ın yeniden yabanileşmesi. Kısa, sert, somut cümleler; doğa betimlemeleri sözlük çalışmak için verimli." },
  { id: "time-machine", gid: 35, level: "B2", emoji: "⏳",
    en: "The Time Machine", tr: "Zaman Makinesi",
    author: "H. G. Wells", year: 1895,
    blurb: "Bir mucit 802.701 yılına gider ve insanlığın ikiye ayrılmış hâlini bulur. Bilimkurgunun kurucu metinlerinden; kısa ve fikir yoğun." },
  { id: "treasure-island", gid: 120, level: "B2", emoji: "🏴‍☠️",
    en: "Treasure Island", tr: "Define Adası",
    author: "Robert Louis Stevenson", year: 1883,
    blurb: "Bir handa bulunan define haritası, Jim Hawkins'i Long John Silver'ın yanında bir yolculuğa çıkarır. Denizci argosu yoğun; macera hızlı aktığı için bilinmeyen sözcükler okumayı durdurmuyor." },
  { id: "tom-sawyer", gid: 74, level: "B2", emoji: "🪝",
    en: "The Adventures of Tom Sawyer", tr: "Tom Sawyer'ın Maceraları",
    author: "Mark Twain", year: 1876,
    blurb: "Mississippi kıyısında bir kasabada Tom'un çit boyamaktan mezarlıkta cinayete tanıklığa uzanan yazı. Diyaloglar ağız taklidiyle yazılmış; anlatı bölümleri düz İngilizcedir." },
  { id: "peter-pan", gid: 16, level: "B2", emoji: "🧚",
    en: "Peter Pan", tr: "Peter Pan",
    author: "J. M. Barrie", year: 1911,
    blurb: "Büyümeyi reddeden çocuk, Darling kardeşleri Neverland'e götürür. Anlatıcının okura doğrudan seslendiği, şakacı ve bazen hüzünlü bir üslup." },
  { id: "sherlock", gid: 1661, level: "C1", emoji: "🔍",
    en: "The Adventures of Sherlock Holmes", tr: "Sherlock Holmes'un Maceraları",
    author: "Arthur Conan Doyle", year: 1892,
    blurb: "On iki bağımsız vaka; her biri bir oturuşta biter. Watson'ın anlatımı düzenli ve resmîdir — Viktorya dönemi İngilizcesine alışmak için ideal, çünkü olay örgüsü sizi çeker." },
  { id: "jekyll-hyde", gid: 43, level: "C1", emoji: "⚗️",
    en: "The Strange Case of Dr. Jekyll and Mr. Hyde", tr: "Dr. Jekyll ile Bay Hyde'ın Tuhaf Hikâyesi",
    author: "Robert Louis Stevenson", year: 1886,
    blurb: "Saygın bir hekimin içindeki başka adam. Kısa bir roman ama sözcük dağarcığı yoğun; hukukçu Utterson'ın gözünden ağır ağır açılan bir gerilim." },
  { id: "frankenstein", gid: 84, level: "C1", emoji: "⚡",
    en: "Frankenstein", tr: "Frankenstein",
    author: "Mary Shelley", year: 1818,
    blurb: "Victor Frankenstein'ın yarattığı canlı, yaratıcısından bir yaşam hakkı ister. Mektuplarla açılan, iç içe geçmiş anlatılar; cümleler uzun ve Latince kökenli sözcükler ağır basıyor." },
  { id: "metamorphosis", gid: 5200, level: "C1", emoji: "🪲",
    en: "Metamorphosis", tr: "Dönüşüm",
    author: "Franz Kafka", year: 1915,
    blurb: "Gregor Samsa bir sabah dev bir böcek olarak uyanır ve asıl mesele ailenin tepkisidir. Üç bölüm, tek mekân; İngilizce çevirisi sade, düşünce akışı ağır." }
];

/* ------------------------------------------------------------------ */
/*  Gutenberg zarfını soy                                              */
/* ------------------------------------------------------------------ */
function govde(gid) {
  const p = path.join(SRC, gid + ".txt");
  if (!fs.existsSync(p)) return null;
  let L = fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n").split("\n");
  const bas = L.findIndex((l) => /\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG/i.test(l));
  const son = L.findIndex((l) => /\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG/i.test(l));
  if (bas >= 0) L = L.slice(bas + 1, son > bas ? son : undefined);
  // Çeviren/hazırlayan notları ve "Contents" listesi eser metni değil.
  return L;
}

/* Bir satır başlık olabilir mi: kısa, noktalama ile bitmiyor, çevresi boş */
function kisa(l) { return l.trim().length > 0 && l.trim().length <= 72; }

const ROMEN = "[IVXLCDM]+";
const RE_BOLUM = new RegExp(
  "^\\s*(CHAPTER|Chapter|LETTER|Letter|PART|Part|BOOK|Book|ACT|Act|STAVE|Stave)" +
  "\\s+(" + ROMEN + "|\\d+)\\s*[.:—-]?\\s*(.*)$");
const RE_ROMEN = new RegExp("^\\s*(" + ROMEN + ")\\s*\\.?\\s*$");
const RE_SAYI  = /^\s*(\d{1,3})\s*\.?\s*$/;
const RE_KAPS  = /^[A-Z0-9][A-Z0-9 .,'’;:!?()—-]{2,60}$/;   // TAMAMI BÜYÜK

/* Bir aday başlığın ARDINDAKİ metin ne kadar dolu?
   İçindekiler listesindeki satırlar birbirini kovalar (aralarında 3-5
   sözcük); gerçek bölüm başlığını yüzlerce sözcük izler. Ayrı bir
   "içindekiler ayıklayıcı" yazmak yerine bu ölçüt kullanılıyor —
   biçimden bağımsız ve her kitapta aynı şekilde çalışıyor. */
function ardindakiSozcuk(L, bas, bit) {
  let n = 0;
  for (let i = bas; i < Math.min(bit, bas + 60); i++) {
    const m = (L[i] || "").match(/[A-Za-z][A-Za-z'’-]*/g);
    if (m) n += m.length;
    if (n > 120) break;
  }
  return n;
}

/* Eser metnine ait olmayan ön/arka bölüm adları. Bunlar bölüm değil. */
const ON_ARKA = /^(CONTENTS?|ILLUSTRATIONS?|PREFACE|INTRODUCTION|FOREWORD|DEDICATION|TRANSCRIBER.?S? NOTE|PREPARER.?S? NOTE|LIST OF|APPENDIX|INDEX|FOOTNOTES?|ADVERTISEMENT|THE END|FINIS|GLOSSARY|NOTES?)/i;

/** İçindekiler artıklarını ve ön/arka bölümleri at: ardında doğru dürüst
    metin olmayan ya da adı "CONTENTS" olan aday başlık değildir.
    Ayrıca arka arkaya yinelenen aynı başlık teke indirilir. */
function icindekileriEle(L, aday) {
  const t1 = aday.filter((c, k) => {
    if (c.t && ON_ARKA.test(c.t.trim())) return false;
    const bit = k + 1 < aday.length ? aday[k + 1].i : L.length;
    return ardindakiSozcuk(L, c.i + c.atla, bit) >= 60;
  });
  // Alice'te ilk bölüm başlığı iki kez geçiyor (bir kez yarım başlıkla)
  const out = [];
  for (const c of t1) {
    const onc = out[out.length - 1];
    const ad = (c.n + " " + c.t).trim().toLowerCase();
    if (onc && (onc.n + " " + onc.t).trim().toLowerCase() === ad) continue;
    out.push(c);
  }
  return out;
}

/** Başlık adaylarını dört yöntemle arar; en makul olanı döndürür. */
function bolumleriBul(L) {
  const bos = (i) => !L[i] || L[i].trim() === "";
  /* Başlık satırının ardından gelen kısa satır alt başlık olabilir
     ("CHAPTER I." / "Down the Rabbit-Hole"). Cümle noktalamasıyla
     bitiyorsa düz metindir, başlık değil. */
  const altBaslik = (j) =>
    kisa(L[j] || "") && !bos(j) && !/[.!?,;:]$/.test((L[j] || "").trim()) &&
    /^[A-Z0-9“"]/.test((L[j] || "").trim());

  const dene = [];

  // --- 1. yöntem: "CHAPTER I. Başlık" / "STAVE ONE" ---
  const a1 = [];
  for (let i = 0; i < L.length; i++) {
    const m = RE_BOLUM.exec(L[i]);
    if (!m || !bos(i - 1)) continue;
    let t = (m[3] || "").trim(), atla = 1;
    if (!t && altBaslik(i + 1)) { t = L[i + 1].trim(); atla = 2; }
    a1.push({ i, n: m[2], t, atla, y: 1 });
  }
  dene.push({ a: a1, ad: "CHAPTER/PART" });

  // --- 2. yöntem: tek başına romen rakamı ya da sayı ---
  //  Ardında boş satır ŞART DEĞİL: Treasure Island'da "II" satırını
  //  doğrudan bölüm adı izliyor, Zaman Makinesi'nde başında boşluk var.
  const a2 = [];
  for (let i = 0; i < L.length; i++) {
    const m = RE_ROMEN.exec(L[i]) || RE_SAYI.exec(L[i]);
    if (!m || !bos(i - 1)) continue;
    let j = i + 1, atla = 1, t = "";
    while (bos(j)) j++;
    if (altBaslik(j)) { t = L[j].trim(); atla = j - i + 1; }
    a2.push({ i, n: m[1], t, atla, y: 2 });
  }
  dene.push({ a: a2, ad: "romen/sayı" });

  // --- 3. yöntem: "03 My Breaking In" (numara + başlık aynı satırda) ---
  const a3 = [];
  for (let i = 0; i < L.length; i++) {
    const m = /^\s*(\d{1,3})\s{1,6}([A-Z][^.!?]{2,60})\s*$/.exec(L[i] || "");
    if (!m || !bos(i - 1)) continue;
    a3.push({ i, n: String(+m[1]), t: m[2].trim(), atla: 1, y: 1 });
  }
  dene.push({ a: a3, ad: "numara + başlık" });

  // --- 4. yöntem: tamamı büyük harf başlıklar (masal derlemeleri) ---
  const a4 = [];
  for (let i = 0; i < L.length; i++) {
    const s = (L[i] || "").trim();
    if (!bos(i - 1) || !bos(i + 1) || !RE_KAPS.test(s) || s.length < 3) continue;
    a4.push({ i, n: "", t: s, atla: 1, y: 3 });
  }
  dene.push({ a: a4, ad: "BÜYÜK HARF" });

  /* Yöntemler GÜVENİLİRLİK sırasına göre denenir; ilk makul sonuç
     kazanır. "En çok bölüm bulan kazansın" denendi ve bırakıldı:
     gürültülü yöntemi ödüllendiriyordu — Tom Sawyer'da adsız
     "CHAPTER I" başlıklarını, Orman Kitabı'nda şiir kıtası adlarını
     gerçek bölümlerin önüne geçiriyordu.
     Yine de açık ara daha zengin bir sonuç varsa (iki katından fazla)
     ona geçilir: Treasure Island'da 1. yöntem yalnız "PART ONE"u
     görüyor, 34 bölümü 2. yöntem buluyor. */
  const sonuc = dene.map((d) => ({ ad: d.ad, t: icindekileriEle(L, d.a) }))
                    .filter((s) => s.t.length >= 3);
  if (!sonuc.length) return { bolumler: [], yontem: "yok" };
  let en = sonuc[0];
  for (const s of sonuc) if (s.t.length > en.t.length * 2) en = s;
  return { bolumler: en.t, yontem: en.ad };
}

function slug(s, n) {
  return (s || "bolum").toLowerCase()
    .replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "").slice(0, 48) || ("bolum-" + n);
}

/* Satır dizisini <p> bloklarına çevirir (gutenberg-extract mantığı). */
const DROP = /^\s*\[(Picture|Illustration)\b[^\]]*\]\s*$|^[\s*]*\*[\s*]*$/i;
function paragraflar(L, from, to) {
  const out = []; let cur = [];
  const bitir = () => {
    if (!cur.length) return;
    const dizeli = cur.length > 1 &&
      cur.filter((l) => /^\s{2,}\S/.test(l)).length >= cur.length - 1;
    out.push(dizeli
      ? "<p>" + cur.map((l) => g.em(g.esc(l.trim()))).join("<br>") + "</p>"
      : "<p>" + g.em(g.esc(cur.map((l) => l.trim()).join(" "))) + "</p>");
    cur = [];
  };
  for (let i = from; i < to; i++) {
    const l = (L[i] || "").replace(/\s+$/, "");
    if (DROP.test(l)) continue;
    if (l.trim() === "") bitir(); else cur.push(l);
  }
  bitir();
  return out;
}

/* ------------------------------------------------------------------ */
function kur(b) {
  const L = govde(b.gid);
  if (!L) return { hata: "kaynak yok: " + b.gid + ".txt" };
  const { bolumler, yontem } = bolumleriBul(L);

  const html = [], toc = [];
  if (!bolumler.length) {
    html.push('<h1 class="chapter" id="metin">' + g.esc(b.en) + "</h1>");
    html.push(...paragraflar(L, 0, L.length));
    toc.push({ level: 0, n: "", t: b.en, id: "metin" });
  } else {
    // ilk bölümden önceki kısım (ithaf, önsöz) atılır: eser metni değil
    for (let k = 0; k < bolumler.length; k++) {
      const c = bolumler[k];
      const bas = c.i + c.atla;
      const bit = k + 1 < bolumler.length ? bolumler[k + 1].i : L.length;
      const gov = paragraflar(L, bas, bit);
      if (!gov.length) continue;                       // boş başlık, atla
      const baslik = (c.n ? (c.y === 3 ? "" : "Chapter " + c.n +
                     (c.t ? ". " : "")) : "") + (c.t || "");
      const ad = baslik.trim() || ("Chapter " + c.n);
      const id = slug(ad, k + 1);
      html.push('<h1 class="chapter" id="' + id + '">' + g.esc(ad) + "</h1>");
      html.push(...gov);
      toc.push({ level: 0, n: "", t: ad, id: id });
    }
  }
  const gövde = html.join("\n");
  const words = g.countWords(gövde);
  return {
    yontem, bolum: toc.length, words,
    doc: {
      id: b.id, kind: "book",
      title: { en: b.en, tr: b.tr },
      authors: [b.author],
      source: "Project Gutenberg — " + b.en + " (eBook #" + b.gid + ")",
      year: b.year, level: b.level,
      words: words,
      minutes: Math.max(1, Math.round(words / 180)),
      blurb: { tr: b.blurb },
      cover: { emoji: b.emoji, hue: 210 },
      toc: toc, html: gövde
    }
  };
}

/* ------------------------------------------------------------------ */
function main() {
  const sec = process.argv.slice(2);
  const liste = sec.length ? BOOKS.filter((b) => sec.includes(b.id)) : BOOKS;
  const man = [];
  let toplam = 0;
  console.log("kitap            yöntem        bölüm   sözcük    dosya");
  console.log("-".repeat(62));
  for (const b of liste) {
    const r = kur(b);
    if (r.hata) { console.log(b.id.padEnd(16), "✗", r.hata); continue; }
    const js = "window.DOCS = window.DOCS || {};\n" +
      "window.DOCS[" + JSON.stringify(b.id) + "] = " +
      JSON.stringify(r.doc) + ";\n";
    const dst = path.join(DOCS, b.id + ".js");
    fs.writeFileSync(dst, js, "utf8");
    const kb = fs.statSync(dst).size / 1024;
    toplam += kb;
    man.push({ id: b.id, file: b.id + ".js", group: "Kitaplar" });
    console.log(b.id.padEnd(16), String(r.yontem).padEnd(13),
                String(r.bolum).padStart(4),
                String(r.words).padStart(9),
                (kb.toFixed(0) + " KB").padStart(9),
                r.bolum < 2 ? "  ← tek bölüm!" : "");
  }
  if (!sec.length) {
    fs.writeFileSync(path.join(DOCS, "manifest-full.js"),
      "// Kamuya açık TAM eserler (Project Gutenberg). Sıra = kolaydan zora.\n" +
      "window.MANIFEST_FULL = " + JSON.stringify(man, null, 1) + ";\n", "utf8");
    console.log("-".repeat(62));
    console.log("manifest-full.js yazıldı ·", man.length, "kitap ·",
                (toplam / 1024).toFixed(1), "MB (istendiğinde yüklenir)");
  }
}
main();
