# Reading Library — mimari sözleşme

Bu dosya **bağlayıcıdır**. Tüm alt görevler bu arayüzlere birebir uymalıdır.
Uymayan çıktı entegre edilemez.

Hedef kitle: **İngilizce bilmeyen bir Türkçe okur.** Her karar bu okuru
gözeterek alınır.

---

## 0. Çalışma ortamı

* Uygulama `file://` üzerinden de açılabilmelidir. Bu yüzden:
  * **ES modülü yok** (`import`/`export` yok) — hepsi klasik `<script>`.
  * **`fetch()` ile yerel dosya okunmaz** — tüm veri `window.__X__ = …`
    biçiminde `.js` dosyalarına gömülür.
  * Dış CDN yok; her bağımlılık `assets/vendor/` altında yereldir.
* Hedef tarayıcılar: güncel Chrome/Edge/Safari/Firefox, masaüstü ve mobil.
* Kod ve yorumlar **Türkçe**; değişken/fonksiyon adları İngilizce olabilir.

---

## 1. Klasör düzeni

```
Reading-Library/
  index.html                tek sayfa uygulama
  assets/
    style.css               tasarım dizgesi (tek dosya)
    store.js                kalıcı depolama katmanı
    lookup.js               sözlük motoru
    dict-*.js               sözlük parçaları
    docs/manifest.js        belge listesi
    docs/<id>.js            belge modeli (her belge bir dosya)
    tts.js                  seslendirme
    quiz.js                 sınav motoru
    stats.js                istatistik + not defteri görünümü
    app.js                  yönlendirme + kütüphane + okuyucu
    vendor/  fonts/  figures/
  source/  extract/  latex/
```

---

## 2. Belge modeli — `window.DOCS["<id>"]`

Her `assets/docs/<id>.js` **tam olarak** şunu yapar:

```js
window.DOCS = window.DOCS || {};
window.DOCS["jadr-2022"] = {
  id:      "jadr-2022",              // dosya adıyla aynı, kebab-case
  kind:    "article",                // "article" | "book"
  title:   { en: "...", tr: "..." }, // tr zorunlu
  authors: ["Fatma Aysazci-Cakar", "Thomas Schroder", "Nigel Hunt"],
  source:  "Journal of Affective Disorders Reports 10 (2022) 100397",
  year:    2022,
  level:   "C1",                     // CEFR: A1 A2 B1 B2 C1 C2
  words:   8268,                     // gövdedeki sözcük sayısı
  minutes: 41,                       // words / 200, yukarı yuvarlanmış
  blurb:   { tr: "İki cümlelik Türkçe tanıtım." },
  cover:   { emoji: "🧠", hue: 210 },// hue 0-360, kapak rengi
  toc:     [ { level:0|1|2, n:"3.1", t:"Başlık", id:"sec-3-1" } ],
  html:    "<h1 …>…</h1><p>…</p>",   // aşağıdaki kurallara uyar
  figures: { "fig-prisma": "<svg …>" },   // opsiyonel
  tables:  { 1: { kind, caption, … } },   // opsiyonel
  quiz:    [ … ]                          // §5
};
```

### `html` kuralları

* İzin verilen etiketler: `h1 h2 h3 p ol ul li em strong span div figure
  figcaption aside table thead tbody tfoot tr th td code sup sub br a`.
* Başlıklarda `id` **zorunlu** ve `toc[].id` ile aynı olmalı.
* Küçük kapital kısaltmalar: `<span class="sc">ptsd</span>`.
* Matematik: `<span class="math">…</span>` (KaTeX istemcide işler).
* Şekil yuvası: `<figure class="fig" id="fig-x" data-fig="1">
  <div class="fig-frame" data-svg="fig-x"></div><figcaption>…</figcaption></figure>`
  — `data-svg` değeri `figures` sözlüğündeki anahtardır.
* Tablo yuvası: `<div class="tbl-slot" data-table="3" data-caption="…"></div>`
* **Metin, kaynağın birebir aynısı olmalıdır.** Yazım hataları dahil
  düzeltilmez. Doğrulama: `latex/verify_verbatim.py`.

---

## 3. Belge listesi — `assets/docs/manifest.js`

```js
window.MANIFEST = [
  { id:"jadr-2022", file:"jadr-2022.js", group:"Makaleler" },
  { id:"little-women-a2", file:"little-women-a2.js", group:"Kitaplar" },
];
```
Sıra = kütüphanede görünme sırası. `group` başlık olarak kullanılır.

---

## 4. Depolama — `window.Store` (`assets/store.js`)

IndexedDB (`reading-library`, sürüm 1) + `localStorage` yedeği.
Tüm metotlar `Promise` döner.

```js
Store.ready()                        // → Promise<void>

// okuma ilerlemesi
Store.getProgress(docId)             // → {pct, sectionId, seconds, finishedAt}|null
Store.setProgress(docId, patch)      // birleştirir
Store.allProgress()                  // → [{docId, …}]

// sözcük arama telemetrisi
Store.logLookup(word, docId, source) // sayaç artırır  source:"dict"|"live"
Store.topLookups(limit)              // → [{word, count, lastAt, docIds}]
Store.lookupTotal()                  // → {distinct, total}

// sözcük defteri (SRS kutulu)
Store.addVocab(entry)                // {key,tr,def,pos,docId}
Store.removeVocab(key)
Store.listVocab()                    // → [{…, srsBox, dueAt, addedAt}]
Store.reviewVocab(key, correct)      // SRS kutusunu günceller

// serbest notlar
Store.addNote({docId, quote, note})
Store.listNotes(docId?)
Store.removeNote(id)

// sınav
Store.saveQuizRun({docId, score, total, answers})
Store.quizRuns(docId?)

// okuma oturumu (süre ölçümü)
Store.beginSession(docId)            // → sessionId
Store.endSession(sessionId, words)
Store.sessionsTotal()                // → {minutes, days, streak}

// taşınabilirlik
Store.exportAll()                    // → JSON string
Store.importAll(json)                // birleştirir, çakışmada yenisi kazanır
Store.clearAll()
```

**Kural:** hiçbir modül `localStorage`'a doğrudan yazmaz; her şey `Store`
üzerinden geçer. Tek istisna: tema/ölçü gibi anlık arayüz tercihleri.

---

## 5. Sınav — `window.Quiz` (`assets/quiz.js`)

Belge modelindeki `quiz` dizisi:

```js
{
  type: "mc",                    // "mc" | "gap" | "match" | "tf"
  q:    { en:"…", tr:"…" },      // soru iki dilde
  opts: [ {en:"…", tr:"…"}, … ], // mc/tf için 2-4 şık
  a:    0,                       // doğru şıkkın indeksi
  why:  { tr:"Neden doğru olduğunun Türkçe açıklaması." },
  ref:  "sec-3-1"                // metindeki dayanak bölüm (opsiyonel)
}
```

Her belge için **en az 8 soru**. Sorular metnin *anlaşılmasını* ölçmeli,
ezber değil. Sözcük soruları belgede gerçekten geçen sözcüklerden seçilir.

API: `Quiz.render(containerEl, doc, onFinish)`.

---

## 6. Seslendirme — `window.TTS` (`assets/tts.js`)

`speechSynthesis` tabanlı; ağ gerekmez, telefon ve masaüstünde çalışır.

```js
TTS.available()                  // → bool
TTS.voices()                     // → [{name, lang, default}]
TTS.speak(nodes, opts)           // nodes: okunacak <p>/<h*> dizisi
TTS.pause() / resume() / stop()
TTS.setRate(r)                   // 0.5 – 1.5
TTS.on("word",  cb)              // {nodeIndex, charIndex, word}
TTS.on("para",  cb)              // {nodeIndex}
TTS.on("end",   cb)
```

Okunan paragraf `.tts-active`, okunan sözcük `.tts-word` sınıfı alır
(stilleri `style.css`'te tanımlıdır). Transkript paneli okunan paragrafın
İngilizcesini ve Türkçesini yan yana gösterir.

---

## 7. Yönlendirme

Hash tabanlı (sunucu gerekmez):

| Yol | Görünüm |
|---|---|
| `#/`            | kütüphane (hero + belge seçimi) |
| `#/read/<id>`   | okuyucu |
| `#/quiz/<id>`   | sınav |
| `#/stats`       | istatistik + not defteri |

`app.js` bir `route(name, params)` olayı yayar; görünümler kendini çizer.

---

## 8. Tasarım dizgesi

`style.css`'teki değişkenler **tek doğruluk kaynağıdır**; hiçbir modül
kendi renk/ölçü sabitini tanımlamaz.

* Makale metni: `--fs` (17pt), `--measure`, Latin Modern.
* **Arayüz metni `rem` tabanlıdır** (`--ui`, `--ui-sm`, `--ui-lg`), makale
  puntosundan bağımsızdır. `em` kullanmak düğmeleri 9 px'e düşürür.
* Dokunma hedefi asgari `--tap` (masaüstü 42 px, telefon 46 px).
* Kırılma noktaları: 1080 / 760 / 560 / 380 px.
* Her ölçüde **yatay kaydırma sıfır olmalıdır**. Geniş tablolar yalnızca
  kendi `overflow-x:auto` kabında kayar.
* Açık ve koyu tema; `data-theme` kök nitelikte.

---

## 9. Kabul ölçütleri

Bir iş ancak şunların hepsi sağlanırsa tamamdır:

1. `node test-responsive.js` — 8 ölçünün hepsinde yatay taşma 0, en küçük
   düğme ≥ 36×36, konsol hatası yok.
2. `node test.js` — konsol hatası 0; şekil, tablo, içindekiler sayıları
   beklenenle aynı.
3. `python latex/verify_verbatim.py <id>` — metin kaynağıyla ≥ %99 aynı.
4. Sayfa `file://` ile açıldığında da tam çalışır.
5. Veriler tarayıcı kapanıp açıldığında durur (IndexedDB).
