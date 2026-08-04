// Project Gutenberg kamuya açık metinlerinden kitap belge modelleri üretir.
//   node latex/build_books.js
// Çıktı: assets/docs/<id>.js  +  assets/docs/manifest-books.js
//
// Eser metnine dokunulmaz. Yalnızca Gutenberg lisans başlığı/altbilgisi,
// resim yer tutucuları ve yıldızlı sahne ayraçları ayıklanır; satır
// kaydırması açılır ve _vurgu_ işaretleri <em> etiketine çevrilir.

const fs = require("fs");
const path = require("path");
const g = require("./gutenberg-extract.js");

const DOCS = path.join(__dirname, "..", "assets", "docs");
const AESOP = "aesop.txt";

/* ---------- Ezop: başlığı verilen masalı bir sonraki masala kadar al ---- */
const aesopLines = g.lines(AESOP);

function aesopRange(title) {
  const t = aesopLines.findIndex(
    (l, i) => l.trim() === title && i > 870 && aesopLines[i + 1].trim() === ""
  );
  if (t < 0) throw new Error("Ezop masalı bulunamadı: " + title);
  // sonraki başlık: 3+ boş satırdan sonra gelen ilk dolu satır
  let blanks = 0;
  for (let i = t + 3; i < aesopLines.length; i++) {
    if (aesopLines[i].trim() === "") { blanks++; continue; }
    if (blanks >= 3) return { from: t + 2, to: i - 1 };
    blanks = 0;
  }
  throw new Error("Masal sonu bulunamadı: " + title);
}

function slug(s) {
  return s.toLowerCase()
    .replace(/[’'".,]/g, "")
    .replace(/æ/g, "ae")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const AESOP_TITLES = [
  "The Lion And The Mouse",
  "The Wolf and the Crane",
  "The Father And His Sons",
  "The Ants and the Grasshopper",
  "The Hare and the Tortoise",
  "The Dog and the Shadow",
  "The Fox and the Crow",
  "The Milk-Woman and Her Pail",
  "The Hen and the Golden Eggs",
  "The Crow and the Pitcher",
  "The Fox and the Grapes",
  "The North Wind and the Sun",
];

function buildAesopBody() {
  const html = [];
  const toc = [];
  AESOP_TITLES.forEach((t, i) => {
    const r = aesopRange(t);
    const id = slug(t);
    toc.push({ level: 0, n: String(i + 1), t: t, id: id });
    html.push('<h1 class="chapter" id="' + id + '">' + g.esc(t) + "</h1>");
    html.push(g.paras(AESOP, r.from, r.to).join("\n"));
  });
  return { html: html.join("\n"), toc: toc };
}

/* ---------- tek öykü / tek bölüm gövdesi ---------- */
function single(file, from, to, heading, id) {
  const html = '<h1 class="chapter" id="' + id + '">' + g.esc(heading) + "</h1>\n" +
    g.paras(file, from, to).join("\n");
  return { html: html, toc: [{ level: 0, n: "", t: heading, id: id }] };
}

/* ====================================================================== */
/*  ÜSTVERİ + SINAVLAR                                                     */
/* ====================================================================== */

const T = { en: "True", tr: "Doğru" };
const F = { en: "False", tr: "Yanlış" };
const TF = [T, F];

const BOOKS = [

/* ---------------------------------------------------------------- 1 A2 */
{
  id: "aesop-fables",
  body: buildAesopBody,
  kind: "book",
  title: {
    en: "Aesop's Fables — Twelve Fables",
    tr: "Ezop Masalları — On İki Masal",
  },
  authors: ["Aesop", "George Fyler Townsend (translator)"],
  source: "Project Gutenberg — Three hundred Æsop's Fables, çev. George Fyler Townsend (eBook #21)",
  year: 1867,
  level: "A2",
  blurb: {
    tr: "İki bin yıllık on iki kısa masal: aslan ile fare, tavşan ile kaplumbağa, karga ile testi. Her masal birkaç yüz sözcük sürer ve sonunda kısa bir ders verir.",
  },
  cover: { emoji: "🦊", hue: 35 },
  quiz: [
    { type: "mc", ref: "the-lion-and-the-mouse",
      q: { en: "In “The Lion and the Mouse”, how does the Mouse save the Lion?",
           tr: "“Aslan ile Fare”de fare aslanı nasıl kurtarır?" },
      opts: [
        { en: "He gnaws the ropes with his teeth", tr: "İpleri dişleriyle kemirir" },
        { en: "He leads the hunters away", tr: "Avcıları başka yöne çeker" },
        { en: "He brings other animals to help", tr: "Yardım için başka hayvanlar getirir" },
        { en: "He digs a hole under the ropes", tr: "İplerin altına çukur kazar" },
      ], a: 0,
      why: { tr: "Fare, aslanın kükremesini tanır, gelip ipi dişleriyle kemirir ve onu serbest bırakır. Aslan daha önce fareyle alay etmişti." } },

    { type: "mc", ref: "the-hare-and-the-tortoise",
      q: { en: "Why does the Hare lose the race to the Tortoise?",
           tr: "Tavşan kaplumbağaya karşı yarışı neden kaybeder?" },
      opts: [
        { en: "He lies down by the wayside and falls asleep", tr: "Yol kenarına uzanıp uyuyakalır" },
        { en: "He runs in the wrong direction", tr: "Yanlış yöne koşar" },
        { en: "The Fox stops him", tr: "Tilki onu durdurur" },
        { en: "He hurts his foot", tr: "Ayağını incitir" },
      ], a: 0,
      why: { tr: "Kaplumbağa hiç durmadan yavaş ama düzenli ilerlerken tavşan yol kenarına uzanıp derin uykuya dalar. Uyandığında iş işten geçmiştir." } },

    { type: "tf", ref: "the-ants-and-the-grasshopper",
      q: { en: "In “The Ants and the Grasshopper”, the Grasshopper stored food during the summer.",
           tr: "“Karıncalar ile Ağustosböceği”nde ağustosböceği yaz boyunca yiyecek biriktirmiştir." },
      opts: TF, a: 1,
      why: { tr: "Ağustosböceği “vaktim yoktu, günlerimi şarkı söyleyerek geçirdim” der. Karıncalar da ona kışın aç yatması gerektiğini söyler." } },

    { type: "mc", ref: "the-dog-and-the-shadow",
      q: { en: "What does the Dog on the bridge end up with?",
           tr: "Köprüdeki köpeğin elinde sonunda ne kalır?" },
      opts: [
        { en: "Nothing — he loses his own meat too", tr: "Hiçbir şey — kendi etini de kaybeder" },
        { en: "Two pieces of meat", tr: "İki parça et" },
        { en: "A bigger piece of meat", tr: "Daha büyük bir et parçası" },
        { en: "A new friend", tr: "Yeni bir arkadaş" },
      ], a: 0,
      why: { tr: "Suda gördüğü gölgeyi başka bir köpek sanır ve saldırmak için ağzındaki eti bırakır. Gölge zaten yoktur, kendi eti de akıntıya kapılır." } },

    { type: "mc", ref: "the-crow-and-the-pitcher",
      q: { en: "How does the thirsty Crow reach the water in the pitcher?",
           tr: "Susuz karga testideki suya nasıl ulaşır?" },
      opts: [
        { en: "He drops stones into it one by one", tr: "İçine tek tek taş atar" },
        { en: "He breaks the pitcher", tr: "Testiyi kırar" },
        { en: "He knocks the pitcher over", tr: "Testiyi devirir" },
        { en: "He waits for the rain", tr: "Yağmuru bekler" },
      ], a: 0,
      why: { tr: "Karga taşıyabildiği kadar taş toplar ve gagasıyla tek tek testiye atar; su yükselince içebilir. Masalın dersi: ihtiyaç, buluşun anasıdır." } },

    { type: "mc", ref: "the-fox-and-the-crow",
      q: { en: "Why does the Crow drop the meat in “The Fox and the Crow”?",
           tr: "“Tilki ile Karga”da karga eti neden düşürür?" },
      opts: [
        { en: "She opens her beak to prove she has a fine voice", tr: "Güzel bir sesi olduğunu kanıtlamak için gagasını açar" },
        { en: "The Fox frightens her", tr: "Tilki onu korkutur" },
        { en: "The meat is too heavy for her", tr: "Et onun için çok ağırdır" },
        { en: "She wants to share it with the Fox", tr: "Eti tilkiyle paylaşmak ister" },
      ], a: 0,
      why: { tr: "Tilki, karganın güzelliğini över ama sesinin buna denk olmadığını ima eder. Karga bunu çürütmek için yüksek sesle öter ve et düşer." } },

    { type: "mc", ref: "the-hen-and-the-golden-eggs",
      q: { en: "Why do the cottager and his wife kill their hen?",
           tr: "Köylü ile karısı tavuklarını neden öldürür?" },
      opts: [
        { en: "They think there is a lump of gold inside it", tr: "İçinde bir külçe altın olduğunu sanırlar" },
        { en: "It has stopped laying eggs", tr: "Yumurtlamayı bırakmıştır" },
        { en: "They are hungry", tr: "Açlardır" },
        { en: "It is old and ill", tr: "Yaşlı ve hastadır" },
      ], a: 0,
      why: { tr: "Her gün bir altın yumurta veren tavuğun içinde büyük bir altın parçası olduğunu düşünürler. Tavuk ötekilerden farksız çıkar ve günlük kazançlarını da yitirirler." } },

    { type: "tf", ref: "the-north-wind-and-the-sun",
      q: { en: "In “The North Wind and the Sun”, the North Wind makes the traveller take off his cloak.",
           tr: "“Poyraz ile Güneş”te yolcuya pelerinini çıkartan poyrazdır." },
      opts: TF, a: 1,
      why: { tr: "Rüzgâr ne kadar sert eserse yolcu pelerinine o kadar sıkı sarılır. Yarışı, sıcaklığıyla yolcuya giysilerini birer birer çıkarttıran güneş kazanır." } },

    { type: "gap", ref: "the-hare-and-the-tortoise",
      q: { en: "The moral of “The Hare and the Tortoise” is: Slow but ___ wins the race.",
           tr: "“Tavşan ile Kaplumbağa”nın dersi: Yavaş ama ___ yarışı kazanır." },
      opts: [
        { en: "steady", tr: "istikrarlı" },
        { en: "clever", tr: "kurnaz" },
        { en: "lucky", tr: "şanslı" },
        { en: "angry", tr: "öfkeli" },
      ], a: 0,
      why: { tr: "Masalın son satırı “Slow but steady wins the race” — yavaş ama istikrarlı olan kazanır." } },

    { type: "mc", ref: "the-wolf-and-the-crane",
      q: { en: "What payment does the Crane actually receive from the Wolf?",
           tr: "Turna kurttan gerçekte hangi ödemeyi alır?" },
      opts: [
        { en: "None — the Wolf says escaping alive is reward enough", tr: "Hiçbiri — kurt, canlı kurtulmasını yeterli ödül sayar" },
        { en: "A large sum of money", tr: "Büyük bir para" },
        { en: "Half of the bone", tr: "Kemiğin yarısı" },
        { en: "A place in the Wolf's pack", tr: "Kurdun sürüsünde bir yer" },
      ], a: 0,
      why: { tr: "Turna kemiği çıkarıp sözü edilen ücreti isteyince kurt, başını kurdun ağzından sağ salim çekebilmiş olmasının yeterli karşılık olduğunu söyler." } },

    { type: "mc", ref: "the-milk-woman-and-her-pail",
      q: { en: "What happens to the milk-woman's plans?",
           tr: "Sütçü kızın planlarına ne olur?" },
      opts: [
        { en: "She tosses her head, the pail falls, and everything is lost", tr: "Başını savurur, kova düşer ve her şey yok olur" },
        { en: "She sells the milk and buys a new gown", tr: "Sütü satıp yeni bir elbise alır" },
        { en: "A thief takes the milk from her", tr: "Bir hırsız sütünü alır" },
        { en: "She marries a young farmer", tr: "Genç bir çiftçiyle evlenir" },
      ], a: 0,
      why: { tr: "Sütü yumurtaya, yumurtayı civcive, civcivi elbiseye çevirdiğini hayal ederken, hayalindeki gibi başını savurur; kova yere düşer ve bütün kurgular bir anda yok olur." } },

    { type: "match",
      q: { en: "Match each English word from the fables with its Turkish meaning.",
           tr: "Masallardaki İngilizce sözcükleri Türkçe karşılıklarıyla eşleştirin." },
      pairs: [["reward", "ödül"], ["thirst", "susuzluk"], ["famine", "kıtlık"],
              ["pitcher", "testi"], ["beak", "gaga"], ["cloak", "pelerin"]],
      why: { tr: "Altı sözcük de masallarda geçer: reward (Kurt ile Turna), thirst ve pitcher (Karga ile Testi), famine (Karıncalar ile Ağustosböceği), beak (Tilki ile Karga), cloak (Poyraz ile Güneş)." } },
  ],
},

/* ---------------------------------------------------------------- 2 A2 */
{
  id: "ugly-duckling",
  body: () => single("and-27200.txt", 34589, 34946, "The Ugly Duckling", "the-ugly-duckling"),
  kind: "book",
  title: { en: "The Ugly Duckling", tr: "Çirkin Ördek Yavrusu" },
  authors: ["Hans Christian Andersen"],
  source: "Project Gutenberg — Fairy Tales of Hans Christian Andersen (eBook #27200)",
  year: 1843,
  level: "A2",
  blurb: {
    tr: "Ördek yuvasından herkesten farklı, iri ve çirkin bir yavru çıkar; kümeste de bataklıkta da hor görülür. Bir kış boyu tek başına dayanır ve bahar geldiğinde suda kendi yansımasını görür.",
  },
  cover: { emoji: "🦢", hue: 205 },
  quiz: [
    { type: "mc",
      q: { en: "What does the mother duck first think the big egg is?",
           tr: "Ördek anne, geç açılan büyük yumurtanın ne olduğunu düşünür?" },
      opts: [
        { en: "A turkey's egg", tr: "Bir hindi yumurtası" },
        { en: "A swan's egg", tr: "Bir kuğu yumurtası" },
        { en: "A goose's egg", tr: "Bir kaz yumurtası" },
        { en: "A stone", tr: "Bir taş" },
      ], a: 0,
      why: { tr: "Yaşlı ördek yumurtaya bakıp “şüphesiz bir hindi yumurtası” der ve onu bırakmasını öğütler. Ördek anne yine de kuluçkaya devam eder." } },

    { type: "mc",
      q: { en: "How does the mother duck decide the big duckling is not a turkey?",
           tr: "Ördek anne iri yavrunun hindi olmadığına nasıl karar verir?" },
      opts: [
        { en: "He swims well and holds himself upright", tr: "İyi yüzer ve kendini dik tutar" },
        { en: "He has a red beak", tr: "Kırmızı bir gagası vardır" },
        { en: "He is the smallest of all", tr: "Hepsinin en küçüğüdür" },
        { en: "He can already fly", tr: "Şimdiden uçabilir" },
      ], a: 0,
      why: { tr: "Suya girdiklerinde iri yavru rahatça yüzer. Anne, “bu bir hindi değil; bacaklarını ne güzel kullanıyor, kendini ne dik tutuyor” der." } },

    { type: "mc",
      q: { en: "Why does the duckling run away from the farmyard?",
           tr: "Yavru ördek kümesten neden kaçar?" },
      opts: [
        { en: "Everyone bites, pushes and mocks him for being ugly", tr: "Çirkin diye herkes onu ısırır, iter ve alay eder" },
        { en: "He wants to see Egypt", tr: "Mısır'ı görmek ister" },
        { en: "The farmer sells him", tr: "Çiftçi onu satar" },
        { en: "He is looking for his father", tr: "Babasını arar" },
      ], a: 0,
      why: { tr: "Kardeşleri, tavuklar, hindi horozu ve kızlar bile ona eziyet eder; annesi bile keşke hiç doğmasaydı der. Dayanamayınca çitin üzerinden uçup gider." } },

    { type: "mc",
      q: { en: "What happens to the two young wild geese who talk to him on the moor?",
           tr: "Kırda onunla konuşan iki genç yaban kazına ne olur?" },
      opts: [
        { en: "Sportsmen shoot them", tr: "Avcılar onları vurur" },
        { en: "They take him to the sea", tr: "Onu denize götürürler" },
        { en: "They teach him to fly", tr: "Ona uçmayı öğretirler" },
        { en: "They drive him away", tr: "Onu kovarlar" },
      ], a: 0,
      why: { tr: "Kazlar ona evlenecek kaz bulabileceği bir bataklıktan söz ederken avcılar kırı sarar; iki kaz da vurulup sazların arasına düşer." } },

    { type: "tf",
      q: { en: "The great dog on the moor bites the duckling.",
           tr: "Kırdaki iri köpek yavru ördeği ısırır." },
      opts: TF, a: 1,
      why: { tr: "Köpek dişlerini gösterip ona bakar, sonra dokunmadan çekip gider. Yavru, “o kadar çirkinim ki köpek bile beni ısırmıyor” diye düşünür." } },

    { type: "mc",
      q: { en: "Who lives in the poor little cottage that the duckling finds?",
           tr: "Yavru ördeğin bulduğu küçük kulübede kim yaşar?" },
      opts: [
        { en: "An old woman with a tom cat and a hen", tr: "Bir kedi ve bir tavukla yaşayan yaşlı bir kadın" },
        { en: "A hunter and his dog", tr: "Bir avcı ile köpeği" },
        { en: "A family of swans", tr: "Bir kuğu ailesi" },
        { en: "Nobody at all", tr: "Hiç kimse" },
      ], a: 0,
      why: { tr: "Kulübede yaşlı bir kadın, kıvılcım çıkarabilen bir erkek kedi ve kısa bacaklı bir tavuk yaşar. Kedi ile tavuk kendilerini dünyanın yarısı sayar." } },

    { type: "mc",
      q: { en: "How does the duckling survive after he freezes fast in the ice?",
           tr: "Buza yapışıp kaldıktan sonra yavru ördek nasıl kurtulur?" },
      opts: [
        { en: "A peasant breaks the ice and carries him home", tr: "Bir köylü buzu kırıp onu evine götürür" },
        { en: "The swans lift him out", tr: "Kuğular onu kaldırıp çıkarır" },
        { en: "The old woman finds him", tr: "Yaşlı kadın onu bulur" },
        { en: "The ice melts in the night", tr: "Buz gece erir" },
      ], a: 0,
      why: { tr: "Sabah oradan geçen bir köylü buzu tahta pabucuyla kırar ve yavruyu karısına götürür; yavru orada da korkup kaçmak zorunda kalır." } },

    { type: "mc",
      q: { en: "What does the duckling decide when he sees the swans in the spring?",
           tr: "Baharda kuğuları gören yavru ördek neye karar verir?" },
      opts: [
        { en: "To fly to them, even if they kill him", tr: "Onu öldürseler bile yanlarına uçmaya" },
        { en: "To hide in the reeds", tr: "Sazların arasına saklanmaya" },
        { en: "To go back to the farmyard", tr: "Kümese geri dönmeye" },
        { en: "To follow the wild geese", tr: "Yaban kazlarının peşine düşmeye" },
      ], a: 0,
      why: { tr: "Bu görkemli kuşlara yaklaşmanın onu ölüme götürebileceğini bilir, ama böyle yaşamaktansa onlar tarafından öldürülmeyi yeğler." } },

    { type: "mc",
      q: { en: "What does the duckling finally see in the water?",
           tr: "Yavru ördek sonunda suda ne görür?" },
      opts: [
        { en: "His own reflection: he has become a swan", tr: "Kendi yansımasını: artık bir kuğudur" },
        { en: "The old woman's cat", tr: "Yaşlı kadının kedisini" },
        { en: "The two wild geese", tr: "İki yaban kazını" },
        { en: "A great fish", tr: "İri bir balığı" },
      ], a: 0,
      why: { tr: "Başını eğdiğinde suda beceriksiz gri kuşu değil güzel bir kuğuyu görür; artık kuğuların arasındadır." } },

    { type: "gap",
      q: { en: "At the end he cries: “I never dreamed of such happiness as this, while I was an ___ duckling.”",
           tr: "Sonda şöyle haykırır: “I never dreamed of such happiness as this, while I was an ___ duckling.”" },
      opts: [
        { en: "ugly", tr: "çirkin" },
        { en: "angry", tr: "öfkeli" },
        { en: "hungry", tr: "aç" },
        { en: "little", tr: "küçük" },
      ], a: 0,
      why: { tr: "Öykünün son cümlesidir: “Çirkin bir ördek yavrusuyken böyle bir mutluluğu düşlememiştim bile.”" } },

    { type: "match",
      q: { en: "Match each English word from the story with its Turkish meaning.",
           tr: "Öyküdeki İngilizce sözcükleri Türkçe karşılıklarıyla eşleştirin." },
      pairs: [["duckling", "ördek yavrusu"], ["shell", "kabuk"], ["swan", "kuğu"],
              ["despised", "hor görülen"], ["winter", "kış"], ["feathers", "tüyler"]],
      why: { tr: "Bu altı sözcük öykünün omurgasıdır: yumurta kabuğundan (shell) çıkan yavru (duckling) hor görülür (despised), kışı (winter) atlatır ve tüyleri (feathers) değişip kuğu (swan) olur." } },
  ],
},

/* ---------------------------------------------------------------- 3 B1 */
{
  id: "selfish-giant",
  body: () => single("wilde-happy-prince.txt", 755, 933, "The Selfish Giant", "the-selfish-giant"),
  kind: "book",
  title: { en: "The Selfish Giant", tr: "Bencil Dev" },
  authors: ["Oscar Wilde"],
  source: "Project Gutenberg — The Happy Prince, and Other Tales (eBook #902)",
  year: 1888,
  level: "B1",
  blurb: {
    tr: "Yedi yıl sonra kalesine dönen dev, bahçesinde oynayan çocukları kovar ve çevresine yüksek bir duvar örer. O günden sonra bahçesine bahar hiç uğramaz.",
  },
  cover: { emoji: "🌳", hue: 130 },
  quiz: [
    { type: "mc",
      q: { en: "Where had the Giant been for seven years?",
           tr: "Dev yedi yıl boyunca neredeydi?" },
      opts: [
        { en: "Visiting his friend the Cornish ogre", tr: "Dostu Cornwall'lı devi ziyaret ediyordu" },
        { en: "Fighting in a war", tr: "Bir savaşta çarpışıyordu" },
        { en: "Asleep in his castle", tr: "Kalesinde uyuyordu" },
        { en: "Travelling to Egypt", tr: "Mısır'a gidiyordu" },
      ], a: 0,
      why: { tr: "Dev, Cornwall'lı dev dostunu ziyarete gitmiş ve yedi yıl kalmıştı; söyleyecek her şeyi bitince kalesine dönmeye karar verdi." } },

    { type: "mc",
      q: { en: "What does the Giant do when he finds the children in his garden?",
           tr: "Dev, çocukları bahçesinde bulunca ne yapar?" },
      opts: [
        { en: "He builds a high wall and puts up a notice-board", tr: "Yüksek bir duvar örer ve bir uyarı levhası asar" },
        { en: "He invites them to stay", tr: "Onları kalmaya davet eder" },
        { en: "He gives them peaches", tr: "Onlara şeftali verir" },
        { en: "He locks himself in the castle", tr: "Kendini kaleye kilitler" },
      ], a: 0,
      why: { tr: "“Kendi bahçem kendi bahçemdir” diyerek bahçeyi yüksek bir duvarla çevirir ve “Girenler hakkında kovuşturma açılacaktır” levhasını asar." } },

    { type: "tf",
      q: { en: "After the wall is built, Spring comes to the Giant's garden as usual.",
           tr: "Duvar örüldükten sonra devin bahçesine bahar her zamanki gibi gelir." },
      opts: TF, a: 1,
      why: { tr: "Bütün ülkede bahar açarken devin bahçesinde kış sürer; kuşlar ötmez, ağaçlar çiçek açmayı unutur. Sonbahar bile ona meyve vermez." } },

    { type: "mc",
      q: { en: "Who are the only ones pleased with the Giant's garden?",
           tr: "Devin bahçesinden memnun olan tek varlıklar kimlerdir?" },
      opts: [
        { en: "The Snow and the Frost", tr: "Kar ile Ayaz" },
        { en: "The birds", tr: "Kuşlar" },
        { en: "The children", tr: "Çocuklar" },
        { en: "The peach-trees", tr: "Şeftali ağaçları" },
      ], a: 0,
      why: { tr: "“Bahar bu bahçeyi unuttu” diyen Kar ile Ayaz oraya yerleşir; sonra Poyraz'ı, ardından Dolu'yu da davet ederler." } },

    { type: "mc",
      q: { en: "What sound wakes the Giant on the morning the children come back?",
           tr: "Çocukların döndüğü sabah devi hangi ses uyandırır?" },
      opts: [
        { en: "A little linnet singing outside his window", tr: "Penceresinin dışında öten küçük bir ketenkuşu" },
        { en: "The King's musicians in the street", tr: "Sokaktaki kral müzisyenleri" },
        { en: "The children shouting", tr: "Çocukların bağırışları" },
        { en: "The North Wind roaring", tr: "Poyrazın uğultusu" },
      ], a: 0,
      why: { tr: "Önce kralın müzisyenleri sandığı ses, aslında penceresinin dışında öten küçük bir ketenkuşudur; bahçesinde uzun zamandır kuş sesi duymamıştır." } },

    { type: "mc",
      q: { en: "How have the children got into the garden again?",
           tr: "Çocuklar bahçeye yeniden nasıl girmiştir?" },
      opts: [
        { en: "Through a little hole in the wall", tr: "Duvardaki küçük bir delikten" },
        { en: "The Giant opened the gate", tr: "Dev kapıyı açmıştır" },
        { en: "They climbed over the wall", tr: "Duvara tırmanmışlardır" },
        { en: "The North Wind blew the wall down", tr: "Poyraz duvarı devirmiştir" },
      ], a: 0,
      why: { tr: "Çocuklar duvardaki küçük bir delikten süzülüp içeri girmiş ve ağaçların dallarına oturmuştur; ağaçlar sevinçten çiçek açmıştır." } },

    { type: "mc",
      q: { en: "Why is one corner of the garden still winter?",
           tr: "Bahçenin bir köşesi neden hâlâ kıştır?" },
      opts: [
        { en: "A little boy there is too small to climb the tree", tr: "Oradaki küçük çocuk ağaca tırmanamayacak kadar ufaktır" },
        { en: "The Giant still stands there", tr: "Dev hâlâ orada durmaktadır" },
        { en: "The wall has not been broken there", tr: "Duvar orada yıkılmamıştır" },
        { en: "The Hail lives in that corner", tr: "Dolu o köşede yaşamaktadır" },
      ], a: 0,
      why: { tr: "En uzak köşede duran küçük çocuk dallara uzanamaz; ağaç dallarını indirse de yetişemez ve acı acı ağlar. Orası hâlâ karla kaplıdır." } },

    { type: "mc",
      q: { en: "What does the Giant do after his heart melts?",
           tr: "Devin yüreği eridikten sonra ne yapar?" },
      opts: [
        { en: "He lifts the boy into the tree and knocks the wall down with an axe", tr: "Çocuğu ağaca kaldırır ve duvarı baltayla yıkar" },
        { en: "He gives the garden to the Mayor", tr: "Bahçeyi belediye başkanına verir" },
        { en: "He builds a bigger wall", tr: "Daha yüksek bir duvar örer" },
        { en: "He goes back to the Cornish ogre", tr: "Cornwall'lı devin yanına döner" },
      ], a: 0,
      why: { tr: "“Ne kadar bencilmişim” der; çocuğu usulca ağaca koyar, ağaç anında çiçeğe durur, sonra büyük bir baltayla duvarı yıkar ve bahçeyi çocuklara verir." } },

    { type: "mc",
      q: { en: "What does the Giant see on the child's hands and feet at the end?",
           tr: "Dev, sonda çocuğun ellerinde ve ayaklarında ne görür?" },
      opts: [
        { en: "The prints of two nails", tr: "İki çivinin izini" },
        { en: "Golden rings", tr: "Altın yüzükler" },
        { en: "White blossoms", tr: "Beyaz çiçekler" },
        { en: "Silver fruit", tr: "Gümüş meyveler" },
      ], a: 0,
      why: { tr: "Avuçlarında ve ayaklarında iki çivi izi vardır. Çocuk bunların “sevginin yaraları” olduğunu söyler ve devi cennet bahçesine çağırır." } },

    { type: "gap",
      q: { en: "The old Giant says: “I have many beautiful flowers, but the children are the most beautiful ___ of all.”",
           tr: "Yaşlı dev şöyle der: “I have many beautiful flowers, but the children are the most beautiful ___ of all.”" },
      opts: [
        { en: "flowers", tr: "çiçekler" },
        { en: "trees", tr: "ağaçlar" },
        { en: "gardens", tr: "bahçeler" },
        { en: "friends", tr: "dostlar" },
      ], a: 0,
      why: { tr: "Yaşlanan dev koltuğundan çocukları izlerken bahçesindeki çiçeklerin en güzelinin çocuklar olduğunu söyler." } },

    { type: "match",
      q: { en: "Match each English word from the story with its Turkish meaning.",
           tr: "Öyküdeki İngilizce sözcükleri Türkçe karşılıklarıyla eşleştirin." },
      pairs: [["garden", "bahçe"], ["wall", "duvar"], ["blossom", "çiçek"],
              ["frost", "ayaz"], ["selfish", "bencil"], ["axe", "balta"]],
      why: { tr: "Öykünün anahtar sözcükleri: bencil (selfish) dev bahçesini (garden) duvarla (wall) çevirir, ayaz (frost) yerleşir; duvarı baltayla (axe) yıkınca ağaçlar çiçek (blossom) açar." } },
  ],
},

/* ---------------------------------------------------------------- 4 B1 */
{
  id: "happy-prince",
  body: () => single("wilde-happy-prince.txt", 92, 483, "The Happy Prince", "the-happy-prince"),
  kind: "book",
  title: { en: "The Happy Prince", tr: "Mutlu Prens" },
  authors: ["Oscar Wilde"],
  source: "Project Gutenberg — The Happy Prince, and Other Tales (eBook #902)",
  year: 1888,
  level: "B1",
  blurb: {
    tr: "Şehrin üstünde yükselen yaldızlı bir heykel, sütununun tepesinden yoksulların acısını görür ve ağlar. Mısır'a giden yolunu erteleyen küçük bir kırlangıç, heykelin mücevherlerini muhtaçlara taşımayı üstlenir.",
  },
  cover: { emoji: "🕊️", hue: 265 },
  quiz: [
    { type: "mc",
      q: { en: "What is the statue of the Happy Prince covered with?",
           tr: "Mutlu Prens heykeli neyle kaplıdır?" },
      opts: [
        { en: "Thin leaves of fine gold", tr: "İnce altın yapraklarla" },
        { en: "White marble", tr: "Beyaz mermerle" },
        { en: "Silver plates", tr: "Gümüş levhalarla" },
        { en: "Painted wood", tr: "Boyalı ahşapla" },
      ], a: 0,
      why: { tr: "Heykel baştan aşağı ince altın yapraklarla kaplıdır; gözleri iki parlak safir, kılıcının kabzasında iri bir yakut vardır." } },

    { type: "mc",
      q: { en: "Why did the Swallow not fly to Egypt with his friends?",
           tr: "Kırlangıç neden arkadaşlarıyla Mısır'a uçmadı?" },
      opts: [
        { en: "He had fallen in love with a Reed", tr: "Bir sazlığa âşık olmuştu" },
        { en: "His wing was broken", tr: "Kanadı kırılmıştı" },
        { en: "The Prince had asked him to stay", tr: "Prens kalmasını istemişti" },
        { en: "He was too young to fly so far", tr: "O kadar uzağa uçamayacak kadar gençti" },
      ], a: 0,
      why: { tr: "İlkbaharda tanıştığı güzel bir sazlığa vurulup geride kalmıştı; sazlık onunla gelmeyi reddedince sonunda tek başına yola çıktı." } },

    { type: "mc",
      q: { en: "Who receives the ruby from the Prince's sword?",
           tr: "Prensin kılıcındaki yakut kime gider?" },
      opts: [
        { en: "A seamstress whose little boy is ill with fever", tr: "Küçük oğlu ateşler içinde yatan bir terziye" },
        { en: "The Mayor of the town", tr: "Şehrin belediye başkanına" },
        { en: "A young man writing a play", tr: "Oyun yazan genç bir adama" },
        { en: "A little match-girl", tr: "Küçük bir kibritçi kıza" },
      ], a: 0,
      why: { tr: "Saten bir elbiseye çiçek işleyen yorgun terzinin oğlu ateşlenmiş, portakal istemektedir; kırlangıç yakutu kadının yüksüğünün yanına bırakır." } },

    { type: "mc",
      q: { en: "What does the Prince send to the young man in the garret?",
           tr: "Prens, çatı katındaki genç adama ne gönderir?" },
      opts: [
        { en: "One of his sapphire eyes", tr: "Safir gözlerinden birini" },
        { en: "The ruby from his sword", tr: "Kılıcındaki yakutu" },
        { en: "A bundle of firewood", tr: "Bir deste odun" },
        { en: "A loaf of bread", tr: "Bir somun ekmek" },
      ], a: 0,
      why: { tr: "Genç oyun yazarı soğuktan ve açlıktan işini bitiremez; prens artık yakutu kalmadığı için gözlerinden birini gönderir." } },

    { type: "mc",
      q: { en: "Who is given the second sapphire?",
           tr: "İkinci safir kime verilir?" },
      opts: [
        { en: "A little match-girl", tr: "Küçük bir kibritçi kıza" },
        { en: "The seamstress", tr: "Terziye" },
        { en: "The Town Councillors", tr: "Belediye meclis üyelerine" },
        { en: "The Charity Children", tr: "Yetimhane çocuklarına" },
      ], a: 0,
      why: { tr: "Kibritleri oluğa düşüp bozulan kız eve eli boş dönerse dayak yiyecektir; kırlangıç safiri avucuna bırakır." } },

    { type: "tf",
      q: { en: "After giving away both sapphires, the Prince can still see the city.",
           tr: "İki safiri de verdikten sonra prens şehri hâlâ görebilir." },
      opts: TF, a: 1,
      why: { tr: "İkinci safiri de verince prens kör olur. Bundan sonra şehirde gördüklerini ona kırlangıç anlatır." } },

    { type: "mc",
      q: { en: "What does the Swallow do with the gold leaves of the statue?",
           tr: "Kırlangıç, heykelin altın yapraklarını ne yapar?" },
      opts: [
        { en: "He carries them, leaf by leaf, to the poor", tr: "Yaprak yaprak yoksullara taşır" },
        { en: "He sells them at the market", tr: "Pazarda satar" },
        { en: "He hides them in the Reed-bed", tr: "Sazlıkta saklar" },
        { en: "He takes them to Egypt", tr: "Mısır'a götürür" },
      ], a: 0,
      why: { tr: "Prensin buyruğuyla kırlangıç altın yaprakları tek tek söküp yoksullara götürür; çocukların yüzü kızarır, sokakta gülerek oynarlar." } },

    { type: "mc",
      q: { en: "Why do the Mayor and the Town Councillors pull the statue down?",
           tr: "Belediye başkanı ile meclis üyeleri heykeli neden yıktırır?" },
      opts: [
        { en: "Because it looks shabby and is no longer beautiful", tr: "Perişan göründüğü ve artık güzel olmadığı için" },
        { en: "Because it is too heavy for the column", tr: "Sütun için fazla ağır olduğu için" },
        { en: "Because the Swallow died on it", tr: "Kırlangıç üzerinde öldüğü için" },
        { en: "Because they need the gold", tr: "Altına ihtiyaçları olduğu için" },
      ], a: 0,
      why: { tr: "Yakutu ve gözleri gidince heykel dilenciden farksız görünür; “güzel olmadığına göre artık yararlı da değildir” diyerek onu indirtirler." } },

    { type: "mc",
      q: { en: "What two things does God call the most precious in the city?",
           tr: "Tanrı şehirdeki en değerli iki şey olarak neyi ister?" },
      opts: [
        { en: "The leaden heart and the dead bird", tr: "Kurşun kalbi ve ölü kuşu" },
        { en: "The ruby and the two sapphires", tr: "Yakutu ve iki safiri" },
        { en: "The gold leaves and the column", tr: "Altın yaprakları ve sütunu" },
        { en: "The Mayor's chain and the furnace", tr: "Başkanın zincirini ve ocağı" },
      ], a: 0,
      why: { tr: "Melek, çöplükteki çatlamış kurşun kalbi ile ölü kırlangıcı getirir; Tanrı bu seçimi onaylar ve ikisini cennetine alır." } },

    { type: "gap",
      q: { en: "“It is not to ___ that I am going,” said the Swallow. “I am going to the House of Death.”",
           tr: "“It is not to ___ that I am going,” dedi kırlangıç. “I am going to the House of Death.”" },
      opts: [
        { en: "Egypt", tr: "Mısır" },
        { en: "Norway", tr: "Norveç" },
        { en: "the Reeds", tr: "sazlığa" },
        { en: "the garret", tr: "çatı katına" },
      ], a: 0,
      why: { tr: "Prens onun sonunda Mısır'a gittiğini sanır; oysa kırlangıç ölmek üzeredir ve gittiği yer Ölüm Evi'dir." } },

    { type: "match",
      q: { en: "Match each English word from the story with its Turkish meaning.",
           tr: "Öyküdeki İngilizce sözcükleri Türkçe karşılıklarıyla eşleştirin." },
      pairs: [["statue", "heykel"], ["swallow", "kırlangıç"], ["sapphire", "safir"],
              ["gilded", "yaldızlı"], ["ruby", "yakut"], ["snow", "kar"]],
      why: { tr: "Öykünün nesneleri: yaldızlı (gilded) heykel (statue), gözlerindeki safirler (sapphire), kılıcındaki yakut (ruby), onları taşıyan kırlangıç (swallow) ve sonunda yağan kar (snow)." } },
  ],
},

/* ---------------------------------------------------------------- 5 B2 */
{
  id: "alice-rabbit-hole",
  body: () => single("alice.txt", 60, 266,
    "Chapter I. Down the Rabbit-Hole", "chapter-i-down-the-rabbit-hole"),
  kind: "book",
  title: {
    en: "Alice's Adventures in Wonderland — Chapter I: Down the Rabbit-Hole",
    tr: "Alice Harikalar Diyarında — Birinci Bölüm: Tavşan Deliğinden Aşağı",
  },
  authors: ["Lewis Carroll"],
  source: "Project Gutenberg — Alice's Adventures in Wonderland (eBook #11), Chapter I",
  year: 1865,
  level: "B2",
  blurb: {
    tr: "Canı sıkılan Alice, yelek cebinden saat çıkaran bir tavşanın peşinden koşup çok derin bir kuyuya düşer. Aşağıda kilitli kapılarla dolu bir salon, minik bir altın anahtar ve “BENİ İÇ” yazılı bir şişe bulur.",
  },
  cover: { emoji: "🐇", hue: 320 },
  quiz: [
    { type: "mc",
      q: { en: "What was Alice doing when she first saw the White Rabbit?",
           tr: "Alice, Beyaz Tavşan'ı ilk gördüğünde ne yapıyordu?" },
      opts: [
        { en: "Sitting by her sister on the bank, feeling bored", tr: "Kıyıda ablasının yanında oturmuş, sıkılıyordu" },
        { en: "Reading a book with pictures", tr: "Resimli bir kitap okuyordu" },
        { en: "Making a daisy-chain", tr: "Papatyalardan zincir örüyordu" },
        { en: "Looking for her cat Dinah", tr: "Kedisi Dinah'ı arıyordu" },
      ], a: 0,
      why: { tr: "Ablasının resimsiz, konuşmasız kitabından sıkılmış, sıcak günde papatya zinciri örmeye değer mi diye düşünürken tavşan yanından geçti." } },

    { type: "mc",
      q: { en: "What finally made Alice jump to her feet and run after the Rabbit?",
           tr: "Alice'i ayağa fırlatıp tavşanın peşine düşüren şey neydi?" },
      opts: [
        { en: "It took a watch out of its waistcoat-pocket", tr: "Yelek cebinden bir saat çıkarması" },
        { en: "It spoke to her directly", tr: "Doğrudan onunla konuşması" },
        { en: "It had pink eyes", tr: "Pembe gözleri olması" },
        { en: "It stole her book", tr: "Kitabını çalması" },
      ], a: 0,
      why: { tr: "Tavşanın konuşması ona o an tuhaf gelmedi; ama yelek cebinden saat çıkarıp bakması onu yerinden fırlattı." } },

    { type: "mc",
      q: { en: "What was written on the jar Alice took from a shelf as she fell?",
           tr: "Alice düşerken raftan aldığı kavanozun üzerinde ne yazıyordu?" },
      opts: [
        { en: "ORANGE MARMALADE", tr: "PORTAKAL REÇELİ" },
        { en: "DRINK ME", tr: "BENİ İÇ" },
        { en: "EAT ME", tr: "BENİ YE" },
        { en: "POISON", tr: "ZEHİR" },
      ], a: 0,
      why: { tr: "Kavanozda “ORANGE MARMALADE” yazıyordu ama boştu; Alice aşağıda birinin başına düşmesin diye onu bir dolaba koydu." } },

    { type: "mc",
      q: { en: "Who is Dinah?",
           tr: "Dinah kimdir?" },
      opts: [
        { en: "Alice's cat", tr: "Alice'in kedisi" },
        { en: "Alice's sister", tr: "Alice'in ablası" },
        { en: "A white rabbit", tr: "Bir beyaz tavşan" },
        { en: "Alice's doll", tr: "Alice'in oyuncak bebeği" },
      ], a: 0,
      why: { tr: "Düşerken “Dinah bu gece beni çok arayacak” der; metin parantez içinde açıklar: Dinah kedidir. Alice onun sütünü unutmalarından endişelenir." } },

    { type: "mc",
      q: { en: "What does Alice find on the little three-legged glass table?",
           tr: "Alice, üç ayaklı küçük cam masanın üstünde ne bulur?" },
      opts: [
        { en: "A tiny golden key", tr: "Minicik altın bir anahtar" },
        { en: "A glass box with a cake", tr: "İçinde kek olan cam bir kutu" },
        { en: "A book of rules", tr: "Kurallar kitabı" },
        { en: "A candle", tr: "Bir mum" },
      ], a: 0,
      why: { tr: "Masanın üstünde minicik altın bir anahtardan başka bir şey yoktur; salondaki kapıların hiçbirini açmaz, sonunda perdenin ardındaki küçük kapıya uyar." } },

    { type: "mc",
      q: { en: "How high is the little door behind the curtain?",
           tr: "Perdenin arkasındaki küçük kapı ne kadar yüksektir?" },
      opts: [
        { en: "About fifteen inches", tr: "Yaklaşık on beş inç" },
        { en: "About ten inches", tr: "Yaklaşık on inç" },
        { en: "About four feet", tr: "Yaklaşık dört fit" },
        { en: "Exactly one metre", tr: "Tam bir metre" },
      ], a: 0,
      why: { tr: "Kapı yaklaşık on beş inç yüksekliğindedir; içindeki dar geçit, Alice'in başını bile geçiremediği o güzel bahçeye açılır." } },

    { type: "tf",
      q: { en: "Alice drinks from the bottle at once, without looking at the label.",
           tr: "Alice şişeden hemen, etiketine bakmadan içer." },
      opts: TF, a: 1,
      why: { tr: "“Hayır, önce bakacağım” der ve şişede “zehir” yazıp yazmadığını denetler; okuduğu ders verici hikâyeleri hatırlar." } },

    { type: "mc",
      q: { en: "How tall is Alice after she drinks from the bottle?",
           tr: "Alice şişeden içtikten sonra ne kadar boydadır?" },
      opts: [
        { en: "Ten inches high", tr: "On inç" },
        { en: "Fifteen inches high", tr: "On beş inç" },
        { en: "Three inches high", tr: "Üç inç" },
        { en: "The same as before", tr: "Öncekiyle aynı" },
      ], a: 0,
      why: { tr: "İçtikten sonra teleskop gibi katlanır ve yalnızca on inç boyunda kalır; artık küçük kapıdan geçebilecek ölçüdedir." } },

    { type: "mc",
      q: { en: "Why can Alice not get into the garden after she shrinks?",
           tr: "Alice küçüldükten sonra bahçeye neden giremez?" },
      opts: [
        { en: "She left the key on the table and can no longer reach it", tr: "Anahtarı masada bıraktı ve artık uzanamıyor" },
        { en: "The door has locked itself", tr: "Kapı kendiliğinden kilitlendi" },
        { en: "The passage is full of water", tr: "Geçit suyla dolu" },
        { en: "The White Rabbit shut the door", tr: "Beyaz Tavşan kapıyı kapattı" },
      ], a: 0,
      why: { tr: "Altın anahtar cam masanın üstünde kalmıştır; onu camdan görebilir ama masanın kaygan ayağına tırmanamaz ve oturup ağlar." } },

    { type: "gap",
      q: { en: "In the glass box under the table there is a very small cake with the words “___ ME” marked in currants.",
           tr: "Masanın altındaki cam kutuda, üstünde kuş üzümüyle “___ ME” yazan çok küçük bir kek vardır." },
      opts: [
        { en: "EAT", tr: "YE" },
        { en: "DRINK", tr: "İÇ" },
        { en: "TAKE", tr: "AL" },
        { en: "OPEN", tr: "AÇ" },
      ], a: 0,
      why: { tr: "Kekin üstünde kuş üzümüyle “EAT ME” yazılıdır. Alice, büyürse anahtara uzanacağını, küçülürse kapının altından geçeceğini düşünür." } },

    { type: "match",
      q: { en: "Match each English word from the chapter with its Turkish meaning.",
           tr: "Bölümdeki İngilizce sözcükleri Türkçe karşılıklarıyla eşleştirin." },
      pairs: [["rabbit", "tavşan"], ["curtain", "perde"], ["key", "anahtar"],
              ["telescope", "teleskop"], ["bottle", "şişe"], ["garden", "bahçe"]],
      why: { tr: "Bölümün nesneleri sırayla: tavşan (rabbit), anahtar (key), perde (curtain) ardındaki kapı, şişe (bottle), teleskop (telescope) benzetmesi ve ulaşılamayan bahçe (garden)." } },
  ],
},

/* ---------------------------------------------------------------- 6 C1 */
{
  id: "tell-tale-heart",
  body: () => single("poe-vol2.txt", 9280, 9487, "The Tell-Tale Heart", "the-tell-tale-heart"),
  kind: "book",
  title: { en: "The Tell-Tale Heart", tr: "Geveze Yürek" },
  authors: ["Edgar Allan Poe"],
  source: "Project Gutenberg — The Works of Edgar Allan Poe, Volume 2 (eBook #2148)",
  year: 1843,
  level: "C1",
  blurb: {
    tr: "Anlatıcı deli olmadığını kanıtlamak için bir cinayeti soğukkanlılıkla anlatır: yaşlı adamı değil, onun akbaba gözünü çekemediğini söyler. Ceset döşeme tahtalarının altına gizlenir, ama bir ses susmak bilmez.",
  },
  cover: { emoji: "🫀", hue: 0 },
  quiz: [
    { type: "mc",
      q: { en: "Why does the narrator decide to kill the old man?",
           tr: "Anlatıcı yaşlı adamı öldürmeye neden karar verir?" },
      opts: [
        { en: "Because of the old man's pale blue eye with a film over it", tr: "Yaşlı adamın üzerinde perde olan soluk mavi gözü yüzünden" },
        { en: "Because the old man had insulted him", tr: "Yaşlı adam ona hakaret ettiği için" },
        { en: "Because he wants the old man's house", tr: "Yaşlı adamın evini istediği için" },
        { en: "Because the old man knew his secret", tr: "Yaşlı adam sırrını bildiği için" },
      ], a: 0,
      why: { tr: "Anlatıcı, adamı sevdiğini ve ondan hiçbir kötülük görmediğini söyler; katlanamadığı tek şey akbabanınkine benzeyen, üzerinde perde bulunan soluk mavi gözdür." } },

    { type: "tf",
      q: { en: "The narrator wanted the old man's gold.",
           tr: "Anlatıcı yaşlı adamın altınını istiyordu." },
      opts: TF, a: 1,
      why: { tr: "Metin açıkça der: “For his gold I had no desire.” Ortada ne bir çıkar ne de bir tutku vardır; sebep yalnızca gözdür." } },

    { type: "mc",
      q: { en: "For how many nights does the narrator look in on the old man before the murder?",
           tr: "Anlatıcı cinayetten önce yaşlı adamı kaç gece gözetler?" },
      opts: [
        { en: "Seven nights", tr: "Yedi gece" },
        { en: "Three nights", tr: "Üç gece" },
        { en: "Twelve nights", tr: "On iki gece" },
        { en: "One night", tr: "Bir gece" },
      ], a: 0,
      why: { tr: "Yedi gece boyunca her gece tam gece yarısı içeri bakar, ama göz hep kapalıdır; cinayet sekizinci gece işlenir." } },

    { type: "mc",
      q: { en: "What does the narrator use to throw a single thin ray on the eye?",
           tr: "Anlatıcı göze tek bir ince ışık huzmesi düşürmek için ne kullanır?" },
      opts: [
        { en: "A dark lantern", tr: "Kapaklı bir el feneri" },
        { en: "A candle", tr: "Bir mum" },
        { en: "A pocket mirror", tr: "Bir cep aynası" },
        { en: "The light of the moon", tr: "Ay ışığını" },
      ], a: 0,
      why: { tr: "Tamamen kapatılmış bir “dark lantern” kullanır; menteşeleri gıcırdadığı için onu çok yavaş aralar ve yalnızca ince bir huzme göze düşer." } },

    { type: "mc",
      q: { en: "What wakes the old man on the eighth night?",
           tr: "Sekizinci gece yaşlı adamı ne uyandırır?" },
      opts: [
        { en: "The narrator's thumb slips on the tin fastening", tr: "Anlatıcının başparmağının teneke mandaldan kayması" },
        { en: "The door creaks loudly", tr: "Kapının yüksek sesle gıcırdaması" },
        { en: "A mouse crosses the floor", tr: "Bir farenin yerden geçmesi" },
        { en: "The clock strikes twelve", tr: "Saatin on ikiyi vurması" },
      ], a: 0,
      why: { tr: "Anlatıcı feneri açmak üzereyken başparmağı teneke mandalın üzerinde kayar; yaşlı adam yatakta doğrulup “Kim var orada?” diye bağırır." } },

    { type: "mc",
      q: { en: "What does the narrator compare to a watch wrapped in cotton?",
           tr: "Anlatıcı neyi pamuğa sarılmış bir saate benzetir?" },
      opts: [
        { en: "The beating of the old man's heart", tr: "Yaşlı adamın kalp atışını" },
        { en: "The ticking of the death watches in the wall", tr: "Duvardaki tahta kurtlarının tıkırtısını" },
        { en: "His own breathing", tr: "Kendi soluğunu" },
        { en: "The officers' voices", tr: "Polislerin seslerini" },
      ], a: 0,
      why: { tr: "Alçak, boğuk ve hızlı sesi “pamuğa sarılmış bir saatin çıkardığı ses” diye tarif eder; bunun yaşlı adamın kalbi olduğunu söyler. Aynı benzetme finalde yeniden döner." } },

    { type: "mc",
      q: { en: "Where does the narrator hide the body?",
           tr: "Anlatıcı cesedi nereye gizler?" },
      opts: [
        { en: "Under three planks of the chamber floor", tr: "Odanın döşemesindeki üç tahtanın altına" },
        { en: "In the cellar wall", tr: "Kilerin duvarına" },
        { en: "In the garden", tr: "Bahçeye" },
        { en: "In a tub in the yard", tr: "Avludaki bir fıçıya" },
      ], a: 0,
      why: { tr: "Cesedi parçalayıp odanın döşemesinden söktüğü üç tahtanın altına yerleştirir, sonra tahtaları hiçbir gözün fark edemeyeceği kadar ustaca yerine koyar." } },

    { type: "mc",
      q: { en: "Why do the three police officers come to the house?",
           tr: "Üç polis memuru eve neden gelir?" },
      opts: [
        { en: "A neighbour had heard a shriek in the night", tr: "Bir komşu gece bir çığlık duymuştur" },
        { en: "The old man had not been seen for a week", tr: "Yaşlı adam bir haftadır görülmemiştir" },
        { en: "They are searching for stolen gold", tr: "Çalınan altını aramaktadırlar" },
        { en: "The narrator had called them himself", tr: "Anlatıcı onları kendisi çağırmıştır" },
      ], a: 0,
      why: { tr: "Gece bir komşu çığlık duymuş, karakola ihbarda bulunulmuş ve memurlar evi aramakla görevlendirilmiştir. Saat dörttür." } },

    { type: "mc",
      q: { en: "What finally makes the narrator confess?",
           tr: "Anlatıcıyı sonunda itirafa iten şey nedir?" },
      opts: [
        { en: "He believes he hears the dead man's heart growing louder", tr: "Ölü adamın kalbinin gitgide daha yüksek attığını duyduğuna inanır" },
        { en: "The officers find a blood-spot", tr: "Memurlar bir kan lekesi bulur" },
        { en: "One of the planks moves", tr: "Tahtalardan biri oynar" },
        { en: "He wants to be famous", tr: "Ünlü olmak ister" },
      ], a: 0,
      why: { tr: "Kulaklarındaki uğultu giderek belirginleşir; memurlar gülüp sohbet ederken sesi duymadıklarına inanamaz, onların kendisiyle alay ettiğini sanır ve dayanamayıp bağırır." } },

    { type: "gap",
      q: { en: "“Villains!” I shrieked, “dissemble no more! I admit the ___!”",
           tr: "“Villains!” diye haykırdım, “dissemble no more! I admit the ___!”" },
      opts: [
        { en: "deed", tr: "eylemi / cinayeti" },
        { en: "truth", tr: "gerçeği" },
        { en: "crime", tr: "suçu" },
        { en: "sound", tr: "sesi" },
      ], a: 0,
      why: { tr: "Öykünün son cümlesidir: “I admit the deed!—tear up the planks!—here, here!” Poe burada “crime” değil “deed” sözcüğünü kullanır." } },

    { type: "match",
      q: { en: "Match each English word from the story with its Turkish meaning.",
           tr: "Öyküdeki İngilizce sözcükleri Türkçe karşılıklarıyla eşleştirin." },
      pairs: [["nervous", "gergin"], ["vulture", "akbaba"], ["lantern", "fener"],
              ["corpse", "ceset"], ["shriek", "çığlık"], ["planks", "döşeme tahtaları"]],
      why: { tr: "Öykünün altı anahtar sözcüğü: gergin (nervous) anlatıcı, akbaba (vulture) gözü, fener (lantern), ceset (corpse), çığlık (shriek) ve tahtalar (planks)." } },
  ],
},

];

/* ====================================================================== */
/*  ÜRETİM                                                                 */
/* ====================================================================== */

// eşleştirme sorularını çalışma zamanı biçimine çevir (bkz. build_docs.py)
function normalizeQuiz(quiz) {
  return quiz.map((q) => {
    if (q.type !== "match" || !q.pairs) return q;
    const src = q.pairs;
    const out = Object.assign({}, q);
    out.pairs = src.map(([en, tr]) => ({ en: en, tr: tr }));
    out.left = src.map(([en]) => ({ en: en, tr: "" }));
    out.right = src.map(([, tr]) => ({ en: "", tr: tr }));
    out.opts = [];
    return out;
  });
}

function main() {
  const entries = [];
  console.log("kitap belge modelleri:");
  for (const b of BOOKS) {
    const base = b.body();
    const words = g.countWords(base.html);
    const doc = {
      id: b.id,
      kind: b.kind,
      title: b.title,
      authors: b.authors,
      source: b.source,
      year: b.year,
      level: b.level,
      words: words,
      minutes: Math.max(1, Math.ceil(words / 200)),
      blurb: b.blurb,
      cover: b.cover,
      toc: base.toc,
      html: base.html,
      quiz: normalizeQuiz(b.quiz),
    };
    const out = path.join(DOCS, b.id + ".js");
    fs.writeFileSync(out,
      "window.DOCS = window.DOCS || {};\n" +
      'window.DOCS["' + b.id + '"] = ' + JSON.stringify(doc) + ";\n",
      "utf8");
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log("  " + b.id.padEnd(20) + String(words).padStart(6) + " sözcük  " +
      String(doc.minutes).padStart(3) + " dk  " + String(doc.toc.length).padStart(3) +
      " başlık  " + doc.quiz.length + " soru  " + b.level + "  " + kb + " KB");
    entries.push({ id: b.id, file: b.id + ".js", group: "Kısa metinler" });
  }

  fs.writeFileSync(path.join(DOCS, "manifest-books.js"),
    "// Kamuya açık kitap metinleri. Sıra = kolaydan zora.\n" +
    "window.MANIFEST_BOOKS = " + JSON.stringify(entries, null, 1) + ";\n",
    "utf8");
  console.log("manifest-books.js yazıldı: " + entries.length + " belge");
}

main();
