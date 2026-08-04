/* =========================================================================
   store.js — Node üzerinde çalışan sınama betiği
   -------------------------------------------------------------------------
   IndexedDB olmayan bir ortamı taklit eder: yalnızca sahte (bellek içi) bir
   localStorage sunulur, böylece Store'un yedek motoru ("ls") sınanır.

   Çalıştırma:  node store.test.js
   ========================================================================= */
"use strict";

var fs = require("fs");
var path = require("path");

/* ------------------------------------------------- sahte tarayıcı ortamı */

function makeLocalStorage() {
  var map = new Map();
  return {
    get length() { return map.size; },
    key: function (i) { var k = Array.from(map.keys())[i]; return k === undefined ? null : k; },
    getItem: function (k) { return map.has(String(k)) ? map.get(String(k)) : null; },
    setItem: function (k, v) { map.set(String(k), String(v)); },
    removeItem: function (k) { map.delete(String(k)); },
    clear: function () { map.clear(); }
  };
}

globalThis.localStorage = makeLocalStorage();
globalThis.indexedDB = undefined;          // IndexedDB yok → yedeğe düşmeli

/* ---------------------------------------------------------- store.js yükle */

var src = fs.readFileSync(path.join(__dirname, "store.js"), "utf8");
(0, eval)(src);                            // dolaylı eval → global kapsamda çalışır
var Store = globalThis.Store;

/* ------------------------------------------------------------ test iskeleti */

var pass = 0, fail = 0;

function section(title) { console.log("\n" + title); }

function check(label, ok, detail) {
  if (ok) { pass++; console.log("  ✓ " + label); }
  else { fail++; console.log("  ✗ " + label + (detail !== undefined ? "   → " + detail : "")); }
}

function near(a, b, tol) { return Math.abs(a - b) <= tol; }

var DAY = 86400000;

// n gün önce, sabah 10:00 (yerel saat) — seri (streak) sınaması için.
function daysAgoAt10(n) {
  var d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(10, 0, 0, 0);
  return d.getTime();
}

/* ===========================================================================
   Testler
   =========================================================================== */

async function main() {
  console.log("Store sınaması — IndexedDB'siz ortam (localStorage yedeği)");

  /* --------------------------------------------------------- 1. hazırlık */
  section("1. Başlatma");
  await Store.ready();
  check("ready() çözüldü", true);
  check('engine === "ls" (IndexedDB yok, yedeğe düşüldü)', Store.engine === "ls", Store.engine);
  await Store.clearAll();
  var empty = await Store.allProgress();
  check("clearAll() sonrası ilerleme listesi boş", empty.length === 0, empty.length);

  /* -------------------------------------------------- 2. okuma ilerlemesi */
  section("2. Okuma ilerlemesi (setProgress / getProgress / allProgress)");

  check("hiç okunmamış belge için null", (await Store.getProgress("jadr-2022")) === null);

  // Bekletmeli yazma: promise beklenmeden önce disk henüz yazılmamış olmalı.
  var pending = Store.setProgress("jadr-2022", { pct: 42, sectionId: "sec-3-1", seconds: 610 });
  var immediate = await Store.getProgress("jadr-2022");
  check("bekleyen yazma okumada görünüyor (pct 42)", immediate && immediate.pct === 42, immediate && immediate.pct);
  var rawBefore = globalThis.localStorage.getItem("rl:progress");
  check("400 ms dolmadan localStorage'a yazılmadı (debounce)", !rawBefore || rawBefore.indexOf("jadr-2022") === -1);
  await pending;
  var rawAfter = globalThis.localStorage.getItem("rl:progress");
  check("bekleme dolunca kalıcı olarak yazıldı", !!rawAfter && rawAfter.indexOf("jadr-2022") !== -1);

  var p1 = await Store.getProgress("jadr-2022");
  check("pct / sectionId / seconds doğru okundu",
    p1.pct === 42 && p1.sectionId === "sec-3-1" && p1.seconds === 610,
    JSON.stringify(p1));
  check("henüz bitmedi (finishedAt boş)", !p1.finishedAt, p1.finishedAt);

  // Birleştirme: yalnız verilen alan değişir.
  Store.setProgress("jadr-2022", { pct: 100 });
  await Store.flush();
  var p2 = await Store.getProgress("jadr-2022");
  check("setProgress birleştiriyor (sectionId korundu)", p2.sectionId === "sec-3-1", p2.sectionId);
  check("pct 100 → finishedAt işaretlendi", !!p2.finishedAt, p2.finishedAt);

  // Peş peşe yazmalar tek turda birleşmeli.
  Store.setProgress("little-women-a2", { pct: 5 });
  Store.setProgress("little-women-a2", { pct: 12 });
  Store.setProgress("little-women-a2", { seconds: 90 });
  await Store.flush();
  var p3 = await Store.getProgress("little-women-a2");
  check("art arda 3 yazma tek kayıtta birleşti", p3.pct === 12 && p3.seconds === 90, JSON.stringify(p3));

  var all = await Store.allProgress();
  check("allProgress() 2 belge döndürdü", all.length === 2, all.length);

  /* ------------------------------------------------ 3. arama telemetrisi */
  section("3. Sözcük arama telemetrisi (logLookup / topLookups / lookupTotal)");

  await Store.logLookup("resilience", "jadr-2022", "dict");
  await Store.logLookup("Resilience", "jadr-2022", "dict");     // büyük harf → aynı sözcük
  await Store.logLookup("trauma", "jadr-2022", "live");
  await Store.logLookup("grief", "little-women-a2", "dict");
  await Store.flush();

  var tot = await Store.lookupTotal();
  check("lookupTotal.distinct === 3", tot.distinct === 3, tot.distinct);
  check("lookupTotal.total === 4", tot.total === 4, tot.total);

  var top = await Store.topLookups(2);
  check("topLookups(2) iki satır döndürdü", top.length === 2, top.length);
  check('en çok aranan "resilience" (2 kez)', top[0].word === "resilience" && top[0].count === 2,
    JSON.stringify(top[0]));
  check("docIds toplandı", Array.isArray(top[0].docIds) && top[0].docIds[0] === "jadr-2022",
    JSON.stringify(top[0].docIds));
  check("lastAt damgası var", top[0].lastAt > 0, top[0].lastAt);

  /* ---------------------------------------------- 4. sözcük defteri + SRS */
  section("4. Sözcük defteri ve SRS kutuları (addVocab / reviewVocab / listVocab)");

  var v = await Store.addVocab({ key: "Resilience", tr: "dayanıklılık", def: "ability to recover", pos: "noun", docId: "jadr-2022" });
  check("addVocab kaydı oluşturdu, anahtar küçük harfe indi", v.key === "resilience", v.key);
  check("yeni sözcük 1. kutuda", v.srsBox === 1, v.srsBox);
  check("dueAt ≈ +1 gün", near(v.dueAt - Date.now(), 1 * DAY, 5000), v.dueAt - Date.now());

  await Store.addVocab({ key: "grief", tr: "yas", docId: "little-women-a2" });
  await Store.addVocab({ key: "trauma", tr: "travma", docId: "jadr-2022" });
  check("defterde 3 sözcük var", (await Store.listVocab()).length === 3);

  // Kutu ilerlemesi: 1→2→3→4→5 ve 5'te tavan.
  var beklenen = [
    { box: 2, gun: 3 },
    { box: 3, gun: 7 },
    { box: 4, gun: 16 },
    { box: 5, gun: 35 },
    { box: 5, gun: 35 }   // tavan
  ];
  var ok = true, iz = [];
  for (var i = 0; i < beklenen.length; i++) {
    var r = await Store.reviewVocab("resilience", true);
    iz.push(r.srsBox);
    if (r.srsBox !== beklenen[i].box) ok = false;
    if (!near(r.dueAt - Date.now(), beklenen[i].gun * DAY, 5000)) ok = false;
  }
  check("doğru yanıtta kutu 1→2→3→4→5 ilerledi ve 5'te durdu (gecikmeler 3/7/16/35 gün)", ok, iz.join(","));

  var wrong = await Store.reviewVocab("resilience", false);
  check("yanlış yanıtta kutu 1'e döndü", wrong.srsBox === 1, wrong.srsBox);
  check("yanlış yanıtta dueAt ≈ +1 gün", near(wrong.dueAt - Date.now(), 1 * DAY, 5000), wrong.dueAt - Date.now());
  check("tekrar sayaçları tutuluyor", wrong.reviews === 6 && wrong.correct === 5,
    wrong.reviews + "/" + wrong.correct);

  // listVocab dueAt'e göre artan sırada olmalı.
  await Store.reviewVocab("grief", true);       // grief → kutu 2 → +3 gün
  var list = await Store.listVocab();
  var sirali = true;
  for (var j = 1; j < list.length; j++) if (list[j].dueAt < list[j - 1].dueAt) sirali = false;
  check("listVocab() dueAt artan sırada", sirali, list.map(function (x) { return x.key + ":" + x.srsBox; }).join(" "));
  check("en yakın tekrar en başta", list[0].key === "resilience" || list[0].key === "trauma", list[0].key);

  await Store.removeVocab("trauma");
  check("removeVocab çalıştı (2 sözcük kaldı)", (await Store.listVocab()).length === 2);
  await Store.addVocab({ key: "trauma", tr: "travma", docId: "jadr-2022" });   // geri ekle

  /* ------------------------------------------------------- 5. notlar */
  section("5. Serbest notlar (addNote / listNotes / removeNote)");

  var n1 = await Store.addNote({ docId: "jadr-2022", quote: "post-traumatic growth", note: "Travma sonrası gelişim." });
  var n2 = await Store.addNote({ docId: "jadr-2022", quote: "avoidance", note: "Kaçınma davranışı." });
  var n3 = await Store.addNote({ docId: "little-women-a2", quote: "Jo", note: "Ana karakter." });
  check("addNote otomatik id verdi", typeof n1.id === "number" && n1.id > 0, n1.id);
  check("id'ler artıyor", n2.id > n1.id && n3.id > n2.id, [n1.id, n2.id, n3.id].join(","));

  check("listNotes() hepsini döndürdü (3)", (await Store.listNotes()).length === 3);
  var docNotes = await Store.listNotes("jadr-2022");
  check("listNotes(docId) süzdü (2)", docNotes.length === 2, docNotes.length);
  check("en yeni not başta", docNotes[0].id === n2.id, docNotes[0].id);

  await Store.removeNote(n2.id);
  check("removeNote sildi (2 kaldı)", (await Store.listNotes()).length === 2);
  check("silinen not listede yok",
    (await Store.listNotes("jadr-2022")).every(function (x) { return x.id !== n2.id; }));

  /* --------------------------------------------------------- 6. sınav */
  section("6. Sınav sonuçları (saveQuizRun / quizRuns)");

  var q1 = await Store.saveQuizRun({ docId: "jadr-2022", score: 6, total: 8, answers: [0, 1, 2, 1, 0, 3, 2, 1] });
  await Store.saveQuizRun({ docId: "jadr-2022", score: 8, total: 8, answers: [0, 1, 2, 1, 0, 3, 2, 0] });
  await Store.saveQuizRun({ docId: "little-women-a2", score: 5, total: 10, answers: [] });
  check("saveQuizRun id verdi", typeof q1.id === "number" && q1.id > 0, q1.id);
  check("quizRuns() hepsi (3)", (await Store.quizRuns()).length === 3);

  var runs = await Store.quizRuns("jadr-2022");
  check("quizRuns(docId) süzdü (2)", runs.length === 2, runs.length);
  check("en yeni deneme başta (8/8)", runs[0].score === 8 && runs[0].total === 8,
    runs[0].score + "/" + runs[0].total);
  check("cevap dizisi korundu", Array.isArray(runs[1].answers) && runs[1].answers.length === 8,
    runs[1].answers && runs[1].answers.length);

  /* ------------------------------------------------------ 7. oturumlar */
  section("7. Okuma oturumu (beginSession / endSession / sessionsTotal)");

  var sid = await Store.beginSession("jadr-2022");
  check("beginSession sessionId döndürdü", typeof sid === "number" && sid > 0, sid);
  var ended = await Store.endSession(sid, 1200);
  check("endSession oturumu kapattı", !!ended && ended.endedAt > 0);
  check("okunan sözcük sayısı yazıldı", ended.words === 1200, ended.words);
  check("süre dakikaya çevrildi (≥ 0)", typeof ended.minutes === "number" && ended.minutes >= 0, ended.minutes);
  check("bilinmeyen oturum null döndürür", (await Store.endSession(999999, 10)) === null);

  var t1 = await Store.sessionsTotal();
  check("sessionsTotal.days === 1 (bugün)", t1.days === 1, t1.days);
  check("sessionsTotal.streak === 1", t1.streak === 1, t1.streak);

  // Dün ve evvelsi gün için oturum ekleyip seriyi 3'e çıkar.
  var gecmis = {
    schema: 1,
    exportedAt: new Date().toISOString(),
    data: {
      sessions: [
        { id: 9001, docId: "jadr-2022", startedAt: daysAgoAt10(1), endedAt: daysAgoAt10(1) + 25 * 60000, words: 900, minutes: 25, updatedAt: daysAgoAt10(1) },
        { id: 9002, docId: "jadr-2022", startedAt: daysAgoAt10(2), endedAt: daysAgoAt10(2) + 10 * 60000, words: 300, minutes: 10, updatedAt: daysAgoAt10(2) }
      ]
    }
  };
  await Store.importAll(JSON.stringify(gecmis));
  var t2 = await Store.sessionsTotal();
  check("geçmiş oturumlarla days === 3", t2.days === 3, t2.days);
  check("kesintisiz seri (streak) === 3", t2.streak === 3, t2.streak);
  check("toplam dakika ≥ 35", t2.minutes >= 35, t2.minutes);

  // Serinin kesilmesi: 5 gün öncesine ait tek oturum seriyi uzatmamalı.
  await Store.importAll(JSON.stringify({
    data: { sessions: [{ id: 9005, docId: "jadr-2022", startedAt: daysAgoAt10(5), endedAt: daysAgoAt10(5) + 60000, words: 10, minutes: 1, updatedAt: daysAgoAt10(5) }] }
  }));
  var t3 = await Store.sessionsTotal();
  check("boşluklu gün seriyi uzatmadı (streak hâlâ 3, days 4)", t3.streak === 3 && t3.days === 4,
    t3.streak + "/" + t3.days);

  /* --------------------------------------- 8. dışa/içe aktarım turu */
  section("8. Taşınabilirlik (exportAll → clearAll → importAll)");

  var oncesi = {
    progress: (await Store.allProgress()).length,
    lookups: (await Store.topLookups()).length,
    vocab: (await Store.listVocab()).length,
    notes: (await Store.listNotes()).length,
    quiz: (await Store.quizRuns()).length,
    total: await Store.sessionsTotal(),
    lookupTotal: await Store.lookupTotal(),
    srs: (await Store.listVocab()).filter(function (x) { return x.key === "grief"; })[0].srsBox
  };

  var json = await Store.exportAll();
  check("exportAll bir JSON metni döndürdü", typeof json === "string" && json.length > 100, typeof json);
  var parsed = JSON.parse(json);
  check("şema sürümü ve tarih var", parsed.schema === 1 && !!parsed.exportedAt,
    parsed.schema + " / " + parsed.exportedAt);
  check("altı store da dışa aktarıldı",
    ["progress", "lookups", "vocab", "notes", "quizRuns", "sessions"]
      .every(function (s) { return Array.isArray(parsed.data[s]); }),
    Object.keys(parsed.data).join(","));

  await Store.clearAll();
  var bosMu = (await Store.allProgress()).length === 0 &&
    (await Store.listVocab()).length === 0 &&
    (await Store.listNotes()).length === 0 &&
    (await Store.quizRuns()).length === 0 &&
    (await Store.topLookups()).length === 0 &&
    (await Store.sessionsTotal()).days === 0;
  check("clearAll her şeyi sildi", bosMu);

  var rapor = await Store.importAll(json);
  check("importAll kayıt ekledi", rapor && rapor.added > 0, JSON.stringify(rapor));

  var sonrasi = {
    progress: (await Store.allProgress()).length,
    lookups: (await Store.topLookups()).length,
    vocab: (await Store.listVocab()).length,
    notes: (await Store.listNotes()).length,
    quiz: (await Store.quizRuns()).length,
    total: await Store.sessionsTotal(),
    lookupTotal: await Store.lookupTotal(),
    srs: (await Store.listVocab()).filter(function (x) { return x.key === "grief"; })[0].srsBox
  };

  check("ilerleme sayısı korundu", sonrasi.progress === oncesi.progress, sonrasi.progress + " ≠ " + oncesi.progress);
  check("arama sayaçları korundu",
    sonrasi.lookupTotal.total === oncesi.lookupTotal.total &&
    sonrasi.lookupTotal.distinct === oncesi.lookupTotal.distinct,
    JSON.stringify(sonrasi.lookupTotal));
  check("sözcük defteri korundu", sonrasi.vocab === oncesi.vocab, sonrasi.vocab + " ≠ " + oncesi.vocab);
  check("SRS kutusu korundu", sonrasi.srs === oncesi.srs, sonrasi.srs + " ≠ " + oncesi.srs);
  check("notlar korundu", sonrasi.notes === oncesi.notes, sonrasi.notes + " ≠ " + oncesi.notes);
  check("sınav denemeleri korundu", sonrasi.quiz === oncesi.quiz, sonrasi.quiz + " ≠ " + oncesi.quiz);
  check("oturum toplamı korundu (dakika/gün/seri)",
    sonrasi.total.minutes === oncesi.total.minutes &&
    sonrasi.total.days === oncesi.total.days &&
    sonrasi.total.streak === oncesi.total.streak,
    JSON.stringify(sonrasi.total) + " ≠ " + JSON.stringify(oncesi.total));

  var pAfter = await Store.getProgress("jadr-2022");
  check("belge ayrıntıları korundu (pct 100, sectionId)",
    pAfter.pct === 100 && pAfter.sectionId === "sec-3-1" && !!pAfter.finishedAt,
    JSON.stringify(pAfter));

  // Aynı dosyayı ikinci kez almak kopya üretmemeli.
  await Store.importAll(json);
  var ikinciNot = (await Store.listNotes()).length;
  var ikinciQuiz = (await Store.quizRuns()).length;
  check("aynı yedeği ikinci kez almak kopya üretmedi",
    ikinciNot === oncesi.notes && ikinciQuiz === oncesi.quiz,
    ikinciNot + "/" + ikinciQuiz);

  /* -------------------------------------------------- 9. hatalı girdiler */
  section("9. Hata durumları");

  var hata = null;
  try { await Store.importAll("{bu geçerli json değil"); } catch (e) { hata = e; }
  check("bozuk JSON anlamlı hata fırlattı", !!hata && /JSON/i.test(hata.message), hata && hata.message);

  hata = null;
  try { await Store.importAll('{"baska":"veri"}'); } catch (e) { hata = e; }
  check("tanınmayan biçim reddedildi", !!hata, hata && hata.message);

  check("olmayan sözcüğün tekrarı null döner", (await Store.reviewVocab("yokboyle", true)) === null);

  /* ---------------------------------------------------------------- özet */
  console.log("\n" + "-".repeat(62));
  var toplam = pass + fail;
  console.log("ÖZET: " + toplam + " sınama — " + pass + " geçti, " + fail + " kaldı" +
    "   (motor: " + Store.engine + ")");
  if (fail > 0) { console.log("SONUÇ: BAŞARISIZ"); process.exit(1); }
  console.log("SONUÇ: HEPSİ GEÇTİ ✓");
}

main().catch(function (e) {
  console.error("\n✗ Beklenmeyen hata:", e && e.stack ? e.stack : e);
  process.exit(1);
});
