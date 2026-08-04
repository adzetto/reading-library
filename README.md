# Okuma Kütüphanesi

<!-- badges -->
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white)

![last commit](https://img.shields.io/github/last-commit/adzetto/reading-library?style=flat-square&color=informational) ![repo size](https://img.shields.io/github/repo-size/adzetto/reading-library?style=flat-square&color=informational) ![top language](https://img.shields.io/github/languages/top/adzetto/reading-library?style=flat-square)


İngilizce bilmeyen bir okurun İngilizce akademik makale ve edebi metin
okuyabilmesi için hazırlanmış tek sayfalık uygulama.

**Açmak için:** `index.html` dosyasına çift tıklayın. Sunucu, kurulum, hesap
gerekmez.

---

## Ne yapar

| | |
|---|---|
| **Sözcüğe tıklayın** | Türkçe karşılığı, sözcük türü ve alan tanımı çıkar. Çevrimdışı çalışır. |
| **Cümle seçin** | Seçtiğiniz bölümün tamamı çevrilir; içindeki terimler ayrıca listelenir. |
| **Paragrafın yanındaki `tr`** | O paragrafın tam çevirisi metnin altına eklenir. |
| **Kulaklık düğmesi** | Metni sesli okur; okunan paragrafın İngilizcesi ve Türkçesi panelde yan yana görünür. |
| **Deftere ekle** | Sözcük aralıklı tekrar (SRS) kutusuna girer, zamanı gelince sorulur. |
| **Sınav** | Her metnin sonunda 8–12 soruluk anlama sınavı, anında geri bildirim. |
| **İlerleme** | Okuma süresi, ısı haritası, en çok bakılan sözcükler, notlar. |

Her şey cihazın kendi belleğinde (IndexedDB) saklanır; tarayıcı kapansa da
durur. İstatistik sayfasından JSON yedeği alıp başka cihaza taşıyabilirsiniz.

---

## Kütüphane

**10 metin · 65.121 sözcük**

### Makaleler

| Metin | Seviye | Sözcük |
|---|---|---|
| A Systematic Review of Prevalence and Correlates of PTSD, Depression and Anxiety… | C1 | 9.897 |
| Practical Feasibility of Narrative Exposure Therapy in Syrian Refugee Population… | C1 | 7.479 |
| A New and Holistic Approach to the Treatment of PTSD: Narrative Exposure Therapy | C1 | 22.615 |
| An Autoethnographic Study of Experiencing Secondary Trauma… | B2 | 10.535 |

Dördü de Dr. Fatma Aysazcı Çakar'ın çalışmaları.

### Kitaplar — kolaydan zora

| Metin | Seviye | Sözcük |
|---|---|---|
| Aesop's Fables — seçme masallar | A2 | 1.392 |
| The Ugly Duckling (Andersen) | A2 | 3.776 |
| The Selfish Giant (Wilde) | B1 | 1.655 |
| The Happy Prince (Wilde) | B1 | 3.475 |
| Alice — Down the Rabbit-Hole (Carroll) | B2 | 2.148 |
| The Tell-Tale Heart (Poe) | C1 | 2.149 |

Hepsi **Project Gutenberg**'den, kamuya açık. Kaynak ve telif gerekçeleri:
`assets/docs/BOOKS-SOURCES.md`.

> Penguin Readers ve *Le Petit Prince* telif korumalıdır; dağıtılamaz.
> Yerlerine aynı seviyedeki kamuya açık metinler seçilmiştir.

### Metin sadakati

Gövde metni kaynağın **birebir aynısıdır** — yazarların ifadeleri, yazım
tercihleri ve tutarsızlıkları dahil hiçbir yerde düzeltilmemiştir.
`latex/verify_doc.py` her belgeyi PDF'ten bağımsız yolla çıkarılan metinle
sözcük sözcük karşılaştırır:

```
net-feasibility  99.92 %      doc-b89f    99.86 %
doc-net-tr       99.79 %      jadr-2022   99.48 %
```

Kalan farklar PDF çıkarım kusurudur (Tinghög → `tingho g` gibi birleşik aksan
ayrışması), gerçek metin farkı değildir.

---

## Seslendirme

İki motor:

- **Tarayıcı sesi** — her metinde çalışır, anında başlar, robotik.
- **Stüdyo ses** — Colab'da **Higgs-Audio v2 (3B)** ya da **Step-Audio-EditX**
  ile önceden üretilip `assets/audio/` altına konur. Kalite kıyaslanamaz,
  okurun cihazında hiçbir model çalışmaz.

Ses üretimi için: [`colab/README.md`](colab/README.md)

```
python latex/export_narration.py      # narration/*.json üretir
# → colab/higgs_audio_v2.ipynb defterini Colab'da çalıştır
# → çıkan zip'i assets/audio/<docid>/ altına aç
# → assets/audio/index.js içine docid ekle
```

---

## Klasörler

```
index.html              uygulama
assets/
  app.js                yönlendirme, kütüphane, okuyucu, telemetri
  store.js              IndexedDB + localStorage kalıcılık
  lookup.js             sözlük motoru (kök bulma + canlı çeviri)
  dict-*.js             1.134 maddelik Türkçe sözlük
  quiz.js  stats.js     sınav ve istatistik görünümleri
  tts.js                tarayıcı seslendirmesi
  tts-audio.js          önceden üretilmiş ses çalar
  tts-panel.js          kumanda + iki dilli transkript
  icons.js              Lucide ikonları (gömülü)
  style.css             tasarım dizgesi (tek doğruluk kaynağı)
  docs/<id>.js          belge modelleri
  fonts/                Geist (arayüz) + Latin Modern (okuma)
latex/                  PDF → belge modeli üretim zinciri
colab/                  stüdyo ses üretimi defterleri
narration/              seslendirme betikleri (parçalara bölünmüş metin)
source/                 özgün PDF'ler
```

---

## Yeni metin ekleme

```bash
cd latex
python pdf2doc.py ../source/yeni.pdf yeni-id --start-at "Abstract"
python verify_doc.py yeni-id --from "Abstract" --to "References"
# meta.py'ye üstveri ve en az 8 soru ekleyin
python build_docs.py
node validate-docs.js
# index.html'e <script src="assets/docs/yeni-id.js"></script> ekleyin
```

---

## Tasarım kuralları

`assets/style.css`'teki değişkenler tek doğruluk kaynağıdır.

- Okuma metni Latin Modern, 17 pt — basılı makaleyle aynı punto ve ölçü.
- Arayüz **Geist** (Vercel, OFL) — tam Türkçe kapsam.
- Arayüz ölçüleri `rem` tabanlıdır, makale puntosundan bağımsızdır.
  `em` kullanmak düğmeleri 9 px'e düşürür — yaşanmış ve düzeltilmiş bir hata.
- Dokunma hedefi asgari 38 px (telefonda 42–46 px).
- Kırılma noktaları: 1080 / 760 / 560 / 380 px.
- Her ölçüde yatay kaydırma **sıfır**; geniş tablolar kendi kabında kayar.

---

## Test

```bash
python -m http.server 8850            # ayrı pencerede
node test-app.js                      # uçtan uca: 4 görünüm, kalıcılık, telemetri
node test-responsive-all.js           # 4 görünüm × 8 ekran = 32 birleşim
node test-hero.js                     # iki sütunlu hero: yerleşim, renk şeridi, kontrast
node test-globe.js                    # kelime küresi: WebGL, etiket, tema, kur/yık
node latex/validate-docs.js           # belge bütünlüğü ve sınav geçerliliği
node assets/store.test.js             # depolama birim testleri
python latex/verify_doc.py <id>       # metin sadakati
python colab/validate_notebooks.py    # Colab defterleri
```

Son durum: uçtan uca **hepsi geçti** (0 konsol hatası), responsive
**32/32 temiz**, belge doğrulama **10/10 geçerli**, depolama **70/70**.

---

## Bilinen sınırlar

- Cümle ve paragraf çevirisi internet ister (Google → MyMemory). Tek sözcük
  araması ve sözlük çevrimdışı çalışır.
- Tarayıcı sesinde Safari okunan sözcüğü vurgulamaz (tarayıcı eksiği).
- Veriler tarayıcıya özeldir; başka cihaza taşımak için yedek alın.

---

## Lisans ve kaynaklar

- Uygulama kodu: MIT.
- Makale metinleri yazarına aittir; açık erişim lisanslarıyla yer alır.
- Kitap metinleri kamuya açıktır (Project Gutenberg).
- Geist yazı tipi: SIL OFL · Latin Modern: GUST FL · Lucide ikonları: ISC.
