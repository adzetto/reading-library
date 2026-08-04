# Stüdyo ses üretimi — Google Colab

Sitedeki metinleri **Higgs-Audio v2 (3B)** ya da **Step-Audio-EditX** gibi
büyük modellerle seslendirip siteye geri koymak için.

Tarayıcıda çalışan küçük modeller yerine bu yol seçildi: kalite kıyaslanamaz
ve ses bir kez üretilip statik dosya olarak sunulduğu için okurun cihazında
hiçbir model çalışmaz — anında başlar, çevrimdışı çalışır.

---

## Akış

```
1. narration/<docid>.json      → bu depoda hazır (parçalara bölünmüş metin)
2. Colab defterini çalıştır    → parça başına bir .wav üretir
3. wav → opus, manifest.js     → defter bunu da yapar
4. audio-<docid>.zip indir     → siteye ver
5. assets/audio/<docid>/ altına aç
6. assets/audio/index.js içine docid ekle
```

Site geri kalanını kendi halleder: panel "Stüdyo ses" rozetini gösterir,
paragraf vurgusu ve iki dilli transkript aynen çalışır.

---

## Hangi belge ne kadar

| Belge | Parça | Karakter | Tahmini ses | T4'te süre |
|---|---|---|---|---|
| `aesop-fables` | 36 | 7.297 | ~8 dk | ~5 dk |
| `selfish-giant` | 40 | 8.542 | ~9 dk | ~6 dk |
| `tell-tale-heart` | 35 | 11.113 | ~12 dk | ~7 dk |
| `alice-rabbit-hole` | 41 | 11.193 | ~12 dk | ~7 dk |
| `happy-prince` | 95 | 18.154 | ~19 dk | ~12 dk |
| `ugly-duckling` | 71 | 19.772 | ~21 dk | ~13 dk |
| `net-feasibility` | 201 | 40.118 | ~42 dk | ~25 dk |
| `jadr-2022` | 182 | 55.189 | ~58 dk | ~35 dk |
| `doc-b89f` | 183 | 55.967 | ~59 dk | ~35 dk |
| `doc-net-tr` | 482 | 137.823 | ~145 dk | ~85 dk |
| **toplam** | **1.366** | **365.168** | **~6.4 saat** | |

Süreler Higgs-Audio v2 3B, T4 GPU, bfloat16 içindir. A100'de 3-4 kat hızlı.

**Öneri:** önce `aesop-fables` ile deneyin — 5 dakikada biter, sesi
beğenirseniz uzunlara geçin. Akademik metinler için sakin ton, öyküler için
daha canlı ton kullanılıyor (defter bunu `voice_hint` alanından otomatik seçer).

---

## Defterler

| Dosya | Model | Not |
|---|---|---|
| `higgs_audio_v2.ipynb` | `bosonai/higgs-audio-v2-generation-3B-base` | Ana seçenek. Ses klonlama destekli. |
| `step_audio_editx.ipynb` | `stepfun-ai/Step-Audio-EditX` | Alternatif. Duygu/üslup düzenleme güçlü. |

İkisi de aynı `narration/*.json` girdisini okur ve aynı çıktı düzenini üretir;
istediğinizi kullanabilirsiniz.

---

## Kullanım

1. `higgs_audio_v2.ipynb` dosyasını Colab'da açın
   (**Dosya → Not defteri yükle** ya da GitHub sekmesinden bu depo).
2. **Çalışma zamanı → Çalışma zamanı türünü değiştir → T4 GPU**.
3. Hücreleri sırayla çalıştırın. 2. hücrede `DOC_ID` değerini seçin.
4. Son hücre `audio-<docid>.zip` dosyasını indirir.

Colab oturumu 12 saatte kapanır; uzun belgeler (`doc-net-tr`) için defterdeki
**parça aralığı** ayarını kullanıp iki oturumda üretebilirsiniz — üretilen
parçalar Drive'a yazılırsa kaldığı yerden devam eder.

---

## Ses seçimi

Higgs-Audio v2 hem hazır seslerle hem de **ses klonlama** ile çalışır:

- **Hazır ses:** `VOICE = "en_woman"` gibi bir etiket yeter.
- **Klonlama:** 10-20 saniyelik temiz bir kayıt yükleyin (`ref.wav`), model
  o sesle okur. Kendi sesinizi ya da izin verdiğiniz birinin sesini kullanın.

Akademik metinler için sakin ve net bir anlatım, öyküler için daha canlı bir
ton önerilir; defterde her ikisi için hazır ayar var.

---

## Çıktı düzeni

```
assets/audio/<docid>/
  manifest.js        window.AUDIO["<docid>"] = {voice, model, format, sr, items:[…]}
  <docid>-0000-0.opus
  <docid>-0001-0.opus
  …
```

`manifest.js` içindeki her öge `{id, node, part, dur}` taşır; `node`, sitedeki
kaçıncı okunabilir paragraf olduğunu söyler — vurgulama bununla hizalanır.
