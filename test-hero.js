/* ==================================================================
   test-hero.js — iki sütunlu hero'nun sınaması

   Kullanıcının asıl şikâyeti buydu: "başlıkları ve textleri direkt
   üstüne değil de o dünya sağda ve başlıklar ve texler solda olsun."
   Bu yüzden birinci denetim, metin dikdörtgeni ile küre dikdörtgeninin
   KESİŞMEMESİ. Gerisi renk şeridi, erişilebilirlik, taşma ve kontrast.

   Önce sunucu: python -m http.server 8850   (depo kökünden)
   ================================================================== */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const SHOT = path.join(__dirname, "shots");
fs.mkdirSync(SHOT, { recursive: true });
const BASE = "http://127.0.0.1:8850/index.html";

let fails = 0;
function check(name, ok, detail) {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail ? "  — " + detail : ""}`);
  if (!ok) fails++;
}
const NOISE = /favicon/i;
function watch(page, errs) {
  page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE: " + m.text()); });
  page.on("requestfailed", (r) => {
    if (!NOISE.test(r.url())) errs.push("404: " + r.url().split("/").pop());
  });
}

/* Sitenin belge ton bandı: mürekkep mavisi → sıcak kahve.
   globe.js bandHue() ve app.js docHue() ile birebir aynı olmalı. */
function docHue(i, n) {
  const d = Math.max(1, (n || 1) - 1);
  return Math.round(209 + (30 - 209) * Math.min(1, Math.max(0, i / d)));
}

/* --- kontrast (WCAG 2.x); test-contrast.js ile aynı hesap --- */
function lum(c) {
  const f = c.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
}
function ratio(a, b) {
  const x = lum(a), y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** Sayfadan renk toplar: metin rengi + arkasındaki gerçek zemin. */
const COLORS = (sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const px = (s) => (s.match(/[\d.]+/g) || []).map(Number);
  const fg = px(getComputedStyle(el).color);
  // saydam olmayan ilk ata zemini bul
  let n = el, bg = [255, 255, 255, 1];
  while (n) {
    const c = px(getComputedStyle(n).backgroundColor);
    if (c.length >= 3 && (c[3] === undefined || c[3] > 0.98)) { bg = c; break; }
    n = n.parentElement;
  }
  return { fg: fg.slice(0, 3), bg: bg.slice(0, 3) };
};

(async () => {
  const browser = await chromium.launch();

  /* ============ 1. yerleşim: metin solda, küre sağda ============ */
  console.log("\n=== yerleşim (1440 px) ===");
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  watch(page, errs);
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);

  const geo = await page.evaluate(() => {
    const r = (s) => {
      const e = document.querySelector(s);
      if (!e) return null;
      const b = e.getBoundingClientRect();
      return { l: Math.round(b.left), r: Math.round(b.right),
               t: Math.round(b.top), b: Math.round(b.bottom),
               w: Math.round(b.width), h: Math.round(b.height) };
    };
    return { txt: r(".hero-in"), orb: r("#heroOrb"), cv: r("#globe"),
             h1: r(".hero-h1"), cta: r(".hero-cta") };
  });
  check("(1) .hero-in ve #heroOrb bulundu", !!(geo.txt && geo.orb),
    JSON.stringify(geo.txt) + " | " + JSON.stringify(geo.orb));
  if (geo.txt && geo.orb) {
    const kesisme = !(geo.txt.r <= geo.orb.l || geo.orb.r <= geo.txt.l ||
                      geo.txt.b <= geo.orb.t || geo.orb.b <= geo.txt.t);
    check("(1) metin ile küre KESİŞMİYOR", !kesisme,
      "metin sağ kenar " + geo.txt.r + " · küre sol kenar " + geo.orb.l);
    check("(1) küre metnin SAĞINDA", geo.orb.l >= geo.txt.r,
      geo.orb.l + " >= " + geo.txt.r);
    check("(1) canvas kare (±%4)",
      geo.cv && Math.abs(geo.cv.w - geo.cv.h) / Math.max(1, geo.cv.w) < 0.04,
      geo.cv ? geo.cv.w + "×" + geo.cv.h : "canvas yok");
  }
  check("(1) konsol temiz", errs.length === 0, errs.slice(0, 3).join(" | "));
  await page.screenshot({ path: path.join(SHOT, "hero-1440.png") });

  /* ============ 2. renk şeridi ============ */
  console.log("\n=== renk şeridi ===");
  const bar = await page.evaluate(() => {
    const segs = [...document.querySelectorAll("#heroBar .hb-seg")];
    return {
      n: segs.length,
      docs: (window.WORDGRAPH && window.WORDGRAPH.docs || []).length,
      hidden: !!document.querySelector("#heroBar[hidden]"),
      hues: segs.map((s) => s.style.getPropertyValue("--hue").trim()),
      etiketli: segs.every((s) => (s.getAttribute("aria-label") || "").length > 2),
      dugme: segs.every((s) => s.tagName === "BUTTON"),
      // kart sol kenar tonlarıyla eşleşiyor mu?
      kart: [...document.querySelectorAll("#cards .card")]
        .map((c) => c.style.getPropertyValue("--hue").trim())
    };
  });
  check("(2) şerit görünür", !bar.hidden);
  check("(2) bölme sayısı = belge sayısı", bar.n > 0 && bar.n === bar.docs,
    bar.n + " bölme / " + bar.docs + " belge");
  const tonDogru = bar.hues.every((h, i) => Number(h) === docHue(i, bar.n));
  check("(2) tonlar 209°→30° bandında", bar.n > 0 && tonDogru,
    bar.hues.join(", "));
  check("(2) kart tonlarıyla aynı",
    bar.kart.length > 0 && bar.hues.join() === bar.kart.slice(0, bar.n).join(),
    "kart: " + bar.kart.slice(0, 4).join(", ") + "…");
  check("(2) bölmeler gerçek <button>", bar.dugme);
  check("(2) her bölmenin erişilebilir adı var", bar.etiketli);

  /* şeride gelince küre o belgeye odaklanmalı */
  const odak = await page.evaluate(async () => {
    const s = document.querySelector("#heroBar .hb-seg");
    if (!s) return { yok: true };
    const at = (t) => s.dispatchEvent(new PointerEvent(t,
      { bubbles: true, pointerType: "mouse" }));
    at("pointerenter"); at("pointerover"); at("pointermove");
    await new Promise((r) => setTimeout(r, 350));
    const i = window.WordGlobe && WordGlobe.info ? WordGlobe.info().focus : "yok";
    const lbl = (document.querySelector("#heroBar .hb-label") || {}).textContent || "";
    at("pointerleave"); at("pointerout");
    await new Promise((r) => setTimeout(r, 350));
    const j = window.WordGlobe && WordGlobe.info ? WordGlobe.info().focus : "yok";
    return { i, j, lbl: lbl.trim() };
  });
  check("(2) üstüne gelince küre odaklanıyor", odak.i === 0, "focus=" + odak.i);
  check("(2) etiket belgeyi yazıyor", (odak.lbl || "").length > 2, odak.lbl);
  check("(2) ayrılınca odak kalkıyor", odak.j === null || odak.j === -1,
    "focus=" + odak.j);

  /* klavye */
  const klavye = await page.evaluate(async () => {
    const segs = [...document.querySelectorAll("#heroBar .hb-seg")];
    if (segs.length < 2) return { ok: false, why: "bölme yok" };
    segs[0].focus();
    const ilk = document.activeElement === segs[0];
    segs[0].dispatchEvent(new KeyboardEvent("keydown",
      { key: "ArrowRight", bubbles: true }));
    await new Promise((r) => setTimeout(r, 120));
    return { ok: ilk, sag: document.activeElement === segs[1] };
  });
  check("(2) bölmeye odak verilebiliyor", klavye.ok, klavye.why || "");
  check("(2) sağ ok komşuya geçiyor", klavye.sag === true);

  /* ============ 3. giriş animasyonu son hâli ============ */
  console.log("\n=== giriş animasyonu ===");
  const son = await page.evaluate(() => {
    const g = (s) => {
      const e = document.querySelector(s);
      if (!e) return null;
      const c = getComputedStyle(e);
      return { op: Number(c.opacity), tr: c.transform, txt: e.textContent.trim().slice(0, 40) };
    };
    return { kick: g(".hero-kicker"), h1: g(".hero-h1"), sub: g(".hero-sub"),
             stat: g("#heroStats"), cta: g(".hero-cta"),
             statHTML: (document.querySelector("#heroStats") || {}).textContent || "" };
  });
  ["kick", "h1", "sub", "stat", "cta"].forEach((k) => {
    const v = son[k];
    check("(3) " + k + " tam görünür", !!v && v.op === 1, v ? "opacity " + v.op : "yok");
  });
  check("(3) #heroStats 'metin' içeriyor", /metin/.test(son.statHTML),
    son.statHTML.replace(/\s+/g, " ").slice(0, 70));
  check("(3) sayaçlar Türkçe biçimde bitti",
    !/\d{4,}/.test(son.statHTML.replace(/\./g, "")) ||
    /\d\.\d{3}/.test(son.statHTML), son.statHTML.replace(/\s+/g, " ").slice(0, 70));

  /* ============ 4. kontrast, iki tema ============ */
  console.log("\n=== kontrast (WCAG AA 4.5:1) ===");
  for (const tema of ["light", "dark"]) {
    await page.evaluate((t) => {
      document.documentElement.setAttribute("data-theme", t);
    }, tema);
    await page.waitForTimeout(500);
    for (const sel of [".hero-h1", ".hero-sub", ".hero-kicker", "#heroBar .hb-label"]) {
      const c = await page.evaluate(COLORS, sel);
      if (!c) { check("(4) " + tema + " " + sel, false, "öge yok"); continue; }
      const r = ratio(c.fg, c.bg);
      check("(4) " + tema + " " + sel, r >= 4.5, r.toFixed(2) + ":1");
    }
  }
  await page.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SHOT, "hero-1440-dark.png") });
  await ctx.close();

  /* ============ 5. taşma + telefonda dizilim ============ */
  console.log("\n=== ölçüler ===");
  for (const w of [360, 390, 430, 768, 1024, 1440, 1920, 2560]) {
    const c = await browser.newContext({ viewport: { width: w, height: 900 } });
    const p = await c.newPage();
    const e2 = [];
    watch(p, e2);
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.waitForTimeout(2000);
    const r = await p.evaluate(() => {
      const box = (s) => {
        const el = document.querySelector(s);
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { t: Math.round(b.top), b: Math.round(b.bottom),
                 l: Math.round(b.left), r: Math.round(b.right) };
      };
      return {
        tas: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        txt: box(".hero-in"), orb: box("#heroOrb")
      };
    });
    const dar = w <= 760;
    let yerlesim = true, aciklama = "";
    if (r.txt && r.orb) {
      if (dar) {
        yerlesim = r.txt.b <= r.orb.t + 2;              // metin üstte
        aciklama = "metin alt " + r.txt.b + " ≤ küre üst " + r.orb.t;
      } else {
        yerlesim = r.orb.l >= r.txt.r - 2;              // küre sağda
        aciklama = "küre sol " + r.orb.l + " ≥ metin sağ " + r.txt.r;
      }
    } else { yerlesim = false; aciklama = "öge yok"; }
    check(w + " px taşma 0", r.tas === 0, "taşma " + r.tas);
    check(w + " px " + (dar ? "metin üstte, küre altta" : "küre sağda"),
      yerlesim, aciklama);
    if (e2.length) check(w + " px konsol temiz", false, e2.slice(0, 2).join(" | "));
    if (w === 390) await p.screenshot({ path: path.join(SHOT, "hero-390.png") });
    await c.close();
  }

  /* ============ 6. hareket azaltma ============ */
  console.log("\n=== prefers-reduced-motion ===");
  const c3 = await browser.newContext({ viewport: { width: 1280, height: 800 },
                                        reducedMotion: "reduce" });
  const p3 = await c3.newPage();
  const e3 = [];
  watch(p3, e3);
  await p3.goto(BASE, { waitUntil: "networkidle" });
  await p3.waitForTimeout(2400);
  const rm = await p3.evaluate(() => {
    const ops = [".hero-kicker", ".hero-h1", ".hero-sub", "#heroStats", ".hero-cta"]
      .map((s) => {
        const e = document.querySelector(s);
        return e ? Number(getComputedStyle(e).opacity) : 0;
      });
    const info = window.WordGlobe && WordGlobe.info ? WordGlobe.info() : null;
    return { ops, segs: document.querySelectorAll("#heroBar .hb-seg").length,
             sprites: info ? info.sprites : -1 };
  });
  check("(6) hero metni görünür ve son hâlinde", rm.ops.every((o) => o === 1),
    rm.ops.join(", "));
  check("(6) şerit yine kurulu", rm.segs > 0, rm.segs + " bölme");
  check("(6) küre duruyor ama görünüyor", rm.sprites >= 100, rm.sprites + " sprite");
  check("(6) konsol temiz", e3.length === 0, e3.slice(0, 3).join(" | "));
  await c3.close();

  /* ============ 7. üç tur kur/yık ============ */
  console.log("\n=== 3 tur görünüm değişimi ===");
  const c4 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p4 = await c4.newPage();
  const e4 = [];
  await p4.goto(BASE, { waitUntil: "networkidle" });
  await p4.waitForTimeout(2000);
  watch(p4, e4);
  for (let i = 0; i < 3; i++) {
    await p4.evaluate(() => { location.hash = "#/read/jadr-2022"; });
    await p4.waitForTimeout(1300);
    await p4.evaluate(() => { location.hash = "#/"; });
    await p4.waitForTimeout(1600);
  }
  const tur = await p4.evaluate(() => ({
    segs: document.querySelectorAll("#heroBar .hb-seg").length,
    docs: (window.WORDGRAPH && window.WORDGRAPH.docs || []).length,
    hero: !!window.__hero__,
    tas: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));
  check("(7) 3 tur sonrası konsol temiz", e4.length === 0, e4.slice(0, 4).join(" | "));
  check("(7) şerit çoğalmadı", tur.segs === tur.docs, tur.segs + " / " + tur.docs);
  check("(7) küre yeniden kuruldu", tur.hero);
  check("(7) taşma yok", tur.tas === 0, "taşma " + tur.tas);
  await c4.close();

  /* ============ 8. "kaldığım yerden devam" düğmesi ============
     Taze bir Playwright oturumunda ilerleme kaydı olmadığı için bu
     düğme `hidden` kalıyor ve hiçbir sınama onu ölçmüyordu. Oysa
     .btn `white-space:nowrap` ve etiket 70 karaktere yakın: 360 px'te
     yatay taşma doğurabilir. Bu yüzden ilerlemeyi elle tohumluyoruz. */
  console.log("\n=== devam düğmesi (360 px, ilerleme tohumlu) ===");
  const c5 = await browser.newContext({ viewport: { width: 360, height: 780 } });
  const p5 = await c5.newPage();
  const e5 = [];
  watch(p5, e5);
  await p5.goto(BASE, { waitUntil: "networkidle" });
  await p5.waitForTimeout(1500);
  const tohum = await p5.evaluate(async () => {
    if (!window.Store || !Store.setProgress) return "Store yok";
    if (Store.ready) { try { await Store.ready(); } catch (e) {} }
    await Store.setProgress("jadr-2022", { pct: 0.42, sectionId: null });
    return "ok";
  });
  await p5.reload({ waitUntil: "networkidle" });
  await p5.waitForTimeout(2400);
  const dev = await p5.evaluate(() => {
    const b = document.querySelector("#continueBtn");
    if (!b || b.hidden) return { yok: true };
    const r = b.getBoundingClientRect();
    return { yok: false, sag: Math.round(r.right),
             genis: document.documentElement.clientWidth,
             tas: document.documentElement.scrollWidth -
                  document.documentElement.clientWidth,
             uzun: b.textContent.trim().length };
  });
  check("(8) ilerleme tohumlandı", tohum === "ok", String(tohum));
  check("(8) devam düğmesi göründü", !dev.yok);
  if (!dev.yok) {
    check("(8) düğme ekranı taşırmıyor", dev.sag <= dev.genis + 1,
      "sağ kenar " + dev.sag + " / " + dev.genis + " px · etiket " + dev.uzun + " karakter");
    check("(8) 360 px yatay taşma 0", dev.tas === 0, "taşma " + dev.tas);
  }
  check("(8) konsol temiz", e5.length === 0, e5.slice(0, 3).join(" | "));
  await p5.screenshot({ path: path.join(SHOT, "hero-360-devam.png") });
  await c5.close();

  console.log("\n" + (fails ? fails + " SORUN" : "HEPSİ GEÇTİ"));
  await browser.close();
  process.exit(fails ? 1 : 0);
})();
