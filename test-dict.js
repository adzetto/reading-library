/* ==================================================================
   test-dict.js — sözlük katmanının sınaması

   Ürünün tek vaadi şu: bir sözcüğe dokun, Türkçesi gelsin. Sözlük
   2000 maddeyle büyüdü ve büyüme boyutu üç katına çıkarıyordu; bu
   yüzden uzun açıklamalar ayrı bir dosyaya alınıp ilk aramaya
   ertelendi. Buradaki denetimler o pazarlığın iki ucunu da tutuyor:

     · açılışta yalnızca karşılıklar inmeli (dict-ext-def.js İSTENMEMELİ)
     · dokunulduğunda açıklama da gelmeli (yoksa erteleme okuru cezalandırır)

   Önce sunucu: python -m http.server 8850   (depo kökünden)
   ================================================================== */
const { chromium } = require("playwright");

const BASE = "http://127.0.0.1:8850/index.html";

let fails = 0;
function check(name, ok, detail) {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail ? "  — " + detail : ""}`);
  if (!ok) fails++;
}

/* Sözlükte OLMADIĞINI ölçtüğümüz, dict-ext ile gelen sözcükler. */
const YENI = ["you", "his", "she", "him", "your", "mistress", "queer", "twas"];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const hata = [];
  page.on("pageerror", (e) => hata.push("PAGEERROR: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") hata.push("CONSOLE: " + m.text()); });

  /* İstenen dosyaları ve boyutlarını izle. */
  const istek = [];
  page.on("response", async (r) => {
    const ad = r.url().split("/").pop().split("?")[0];
    if (/\.js$/.test(ad)) {
      let n = 0;
      try { n = (await r.body()).length; } catch (e) {}
      istek.push({ ad, n });
    }
  });

  await page.goto(BASE, { waitUntil: "networkidle" });

  console.log("\nAÇILIŞ");
  const boyut = await page.evaluate(() => ({
    size: window.Lookup ? window.Lookup.size : 0,
    defsVar: !!window.__DICT_DEFS__,
  }));
  check("sözlük yüklendi", boyut.size >= 3000, boyut.size + " madde");
  check("uzun açıklamalar HENÜZ yüklenmedi", !boyut.defsVar);
  check("dict-ext-def.js açılışta istenmedi",
        !istek.some((x) => x.ad === "dict-ext-def.js"));

  const ext = istek.find((x) => x.ad === "dict-ext.js");
  check("dict-ext.js indi", !!ext, ext ? (ext.n / 1024).toFixed(0) + " KB ham" : "yok");

  /* Açılıştaki toplam betik yükü: erteleme kararının gerekçesi buydu,
     geri kaymasın diye ölçülüyor. */
  const toplam = istek.reduce((s, x) => s + x.n, 0);
  console.log("    açılıştaki betik yükü: " + (toplam / 1024).toFixed(0) + " KB ham");

  console.log("\nKARŞILIKLAR (açıklama gelmeden, eşzamanlı)");
  const peek = await page.evaluate((ws) => ws.map((w) => {
    const r = window.Lookup.peek(w);
    return { w, tr: r && r.tr, def: r && r.def };
  }), YENI);
  const eksik = peek.filter((x) => !x.tr).map((x) => x.w);
  check("her sözcüğün karşılığı anında geliyor", eksik.length === 0,
        eksik.length ? "eksik: " + eksik.join(", ") : peek.length + " sözcük");

  console.log("\nİLK ARAMA — açıklamalar ertelenmiş yerinden gelir");
  const w = await page.evaluate(() => window.Lookup.word("mistress"));
  check("karşılık geldi", !!(w && w.tr), w && w.tr);
  check("uzun açıklama da geldi", !!(w && w.def && w.def.length > 20),
        w && w.def ? w.def.slice(0, 46) + "…" : "YOK");
  check("kaynak yerel sözlük (ağ değil)", w && w.source === "dict", w && w.source);
  check("açıklama dosyası şimdi yüklendi",
        await page.evaluate(() => !!window.__DICT_DEFS__));

  /* Çekimli biçim: peek() kökü buluyor mu? */
  const cek = await page.evaluate(() => window.Lookup.peek("carriages"));
  check("çekimli biçim köke iniyor", !!(cek && cek.tr && cek.key === "carriage"),
        cek ? cek.key + " → " + cek.tr : "yok");

  console.log("\nOKUYUCUDA AÇILIR PENCERE");
  await page.goto(BASE + "#/read/call-of-the-wild", { waitUntil: "networkidle" });
  await page.waitForSelector("#article .w", { timeout: 15000 });
  /* dict-ext'ten gelen bir sözcüğü metinde bul ve GERÇEKTEN tıkla:
     pencere mouseup'a bağlı, element.click() yalnızca click gönderir. */
  const sira = await page.evaluate(() => {
    const ws = [...document.querySelectorAll("#article .w")];
    const i = ws.findIndex((e) => /^(his|him|you|her|she)$/i.test(e.textContent.trim()));
    return i < 0 ? null : { i, w: ws[i].textContent.trim() };
  });
  const tiklandi = sira && sira.w;
  check("metinde denenecek sözcük bulundu", !!tiklandi, tiklandi || "yok");
  if (tiklandi) {
    await page.locator("#article .w").nth(sira.i).click();
    await page.waitForFunction(
      () => { const p = document.querySelector("#pop .pop-tr"); return p && p.textContent.trim(); },
      { timeout: 8000 }).catch(() => {});
    const pop = await page.evaluate(() => {
      const t = document.querySelector("#pop .pop-tr");
      const d = document.querySelector("#pop .pop-def");
      return { tr: t && t.textContent.trim(), def: d && d.textContent.trim() };
    });
    check("pencerede Türkçe karşılık var", !!(pop.tr && pop.tr.length > 1), pop.tr);
    check("pencerede açıklama var", !!(pop.def && pop.def.length > 20),
          pop.def ? pop.def.slice(0, 46) + "…" : "YOK");
  }

  console.log("\nKONSOL");
  check("hata yok", hata.length === 0, hata.slice(0, 2).join(" | "));

  await browser.close();
  console.log("\n" + (fails ? fails + " sorun" : "hepsi geçti"));
  process.exit(fails ? 1 : 0);
})();
