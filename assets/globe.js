/* ==================================================================
   globe.js — kelime takımyıldızı (hero küresi)

   Kütüphanedeki on metnin ortak sözcükleri bir kürenin yüzeyinde durur;
   her metin kürede kendi "kıtasını" tutar. Aynı metinlerde geçen
   sözcükler arasında o metnin renginde ince geodezik yaylar uzanır.
   Sözcüğün üstüne gelince Türkçesi ve hangi metinlerde geçtiği görünür;
   tıklayınca o sözcüğün en çok geçtiği metne gider.

   Veri: window.WORDGRAPH  (latex/build_wordgraph.js üretir)
   Bağımlılık: window.THREE  (assets/vendor/bundle.js)

   API:
     WordGlobe.mount(canvasEl, {theme, reduced, max})  → true | false
     WordGlobe.setTheme("light" | "dark")
     WordGlobe.destroy()
     WordGlobe.info()                                  → tanılama | null
     WordGlobe.focusDoc(i | null)     → o belgeyi öne çıkar, gerisini söndür
     WordGlobe.pointer(nx, ny | null) → -1..1 imleç; kürenin ışığını sürer

   ES modülü yok, fetch yok — file:// altında da çalışır (sözleşme §0).
   ================================================================== */
(function (global) {
  "use strict";

  var st = null;                 // etkin örnek (aynı anda tek küre)

  /* ------------------------- renk paleti -------------------------
     Sözcük ve yay renkleri belgenin `hue` değerinden türer; buradaki
     sayılar yalnızca doygunluk/parlaklık ayarıdır. Arayüz (etiket)
     renkleri style.css değişkenlerinden gelir.

     dimA artık 0: sprite'lar depthTest'siz çizildiği için küre onları
     gizlemiyor: sıfırdan büyük her taban, arka yarıküredeki sözcükleri
     ön yüzün üstüne yayılan sürekli bir pus hâline getiriyordu. */
  var PAL = {
    light: {
      wordS: 40, wordL: 25,               // sözcük: hsl(ton, S%, L%)
      lineS: 48, lineL: 38, lineA: 0.40,  // yay — ince ve sakin
      grat: "#c6bfae", gratA: 0.32,       // enlem/boylam ağı
      ball: "#fdfcf9", ballA: 0.68,       // küre gövdesi
      rim:  "#1f5f96",                    // kenar parlaması (mürekkep mavisi)
      dimA: 0                             // arka yüzdeki sözcüğün taban opaklığı
    },
    dark: {
      wordS: 38, wordL: 74,
      lineS: 52, lineL: 56, lineA: 0.38,
      grat: "#39424f", gratA: 0.48,
      ball: "#0a0c11", ballA: 0.78,
      rim:  "#7db4e6",
      dimA: 0
    }
  };

  /* Belgeleri sitenin vurgu ailesine eşit aralıklarla dağıtır.
     Ham `hue` değerleri gökkuşağı veriyordu; ham değeri ölçeklemek ise
     tonları rastgele kümeliyor. Belge SIRASINI kullanmak her metne ayrı
     ama akraba bir ton veriyor. Aralık site paletiyle aynı. */
  var HUE0 = 209, HUE1 = 30;                   // mürekkep mavisi → sıcak kahve
  function bandHue(docIndex, total) {
    var n = Math.max(1, (total || 1) - 1);
    var t = clamp((docIndex || 0) / n, 0, 1);
    return HUE0 + (HUE1 - HUE0) * t;
  }

  /* 209°→30° ton bandı düz taranınca ortadan yeşil-hardal geçiyor ve
     kâğıt/mürekkep paletinin yanında gökkuşağı gibi duruyor. Çare tonu
     değil DOYGUNLUĞU eğmek: uçlarda tam doygun (mavi / kahve), ortada
     düşük doygun (gri-kahve). Böylece on belge birbirinden ayrılmaya
     devam eder ama tek bir renk ailesi olarak okunur. hero.css'teki
     color-mix(in oklab, --accent, --warm) ile aynı his.
     0 uçlarda, 1 tam ortada. */
  function bandK(docIndex, total) {
    var n = Math.max(1, (total || 1) - 1);
    return Math.sin(Math.PI * clamp((docIndex || 0) / n, 0, 1));
  }
  var DESAT = 0.62;                  // ortadaki doygunluk kaybı oranı

  /* --------------------------- yardımcılar --------------------------- */
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function smooth(x, a, b) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  /** Düzen her açılışta aynı olsun diye tohumlu rastgele üreteç. */
  function rng(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function shortTitle(s, n) {
    s = String(s || "");
    return s.length > n ? s.slice(0, n - 1).replace(/[\s,:;–—-]+$/, "") + "…" : s;
  }

  var FONT = '"Geist",ui-sans-serif,system-ui,"Segoe UI",sans-serif';

  /* ================================================================
     yerleşim — her belge kürede bir "kıta", sözcükler çevresine serpilir
     Sözcükler nokta değil dikdörtgen olduğu için itme yarıçapı sözcüğün
     genişliğinden hesaplanır; yoksa uzun sözcükler üst üste biner.
     ================================================================ */
  function fibDirs(T, n) {
    var out = [], ga = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < n; i++) {
      var y = n === 1 ? 0 : 1 - ((i + 0.5) / n) * 2;
      var r = Math.sqrt(Math.max(0, 1 - y * y)), th = ga * i;
      out.push(new T.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).normalize());
    }
    return out;
  }

  function layout(T, nodes, ndocs, rad) {
    var anchors = fibDirs(T, ndocs);
    var rand = rng(20260804);
    var pos = [], up = new T.Vector3(0, 1, 0), alt = new T.Vector3(1, 0, 0);
    var u = new T.Vector3(), v = new T.Vector3();

    nodes.forEach(function (nd) {
      var a = anchors[nd.p] || anchors[0];
      u.crossVectors(a, Math.abs(a.y) > 0.92 ? alt : up).normalize();
      v.crossVectors(a, u).normalize();
      var ang = rand() * Math.PI * 2, r = 0.85 * Math.sqrt(rand());
      pos.push(new T.Vector3().copy(a)
        .addScaledVector(u, Math.cos(ang) * r)
        .addScaledVector(v, Math.sin(ang) * r)
        .normalize());
    });

    /* Gevşetme: iki sözcüğün açısal aralığı yarıçapları toplamından
       küçükse birbirlerini itsinler. */
    var d = new T.Vector3(), n = pos.length;
    var want = [];
    for (var i = 0; i < n; i++) { want.push([]); }
    for (i = 0; i < n; i++) for (var j = i + 1; j < n; j++) want[i][j] = rad[i] + rad[j];

    for (var it = 0; it < 60; it++) {
      var moved = 0;
      for (i = 0; i < n; i++) {
        for (j = i + 1; j < n; j++) {
          var need = want[i][j];
          var c = clamp(pos[i].dot(pos[j]), -1, 1);
          var ang2 = Math.acos(c);
          if (ang2 >= need) continue;
          d.subVectors(pos[i], pos[j]);
          if (d.lengthSq() < 1e-9) d.set(rand() - 0.5, rand() - 0.5, rand() - 0.5);
          d.normalize().multiplyScalar((need - ang2) * 0.30);
          pos[i].add(d).normalize();
          pos[j].sub(d).normalize();
          moved++;
        }
      }
      if (!moved) break;
    }
    return pos;
  }

  /* ---------------- sözcük dokusu (CanvasTexture + Sprite) ----------------
     three.js TextGeometry font dosyası ister; burada gerekmiyor. */
  function wordTexture(T, word, px, ts) {
    var c = document.createElement("canvas");
    var g = c.getContext("2d");
    var font = "600 " + Math.round(px * ts) + "px " + FONT;
    g.font = font;
    var pad = Math.round(px * ts * 0.3);
    c.width = Math.max(8, Math.ceil(g.measureText(word).width) + pad * 2);
    c.height = Math.max(8, Math.ceil(px * ts * 1.4));
    g = c.getContext("2d");                    // boyut değişimi bağlamı sıfırlar
    g.font = font;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = "#ffffff";                   // gerçek renk materyalden gelir
    g.fillText(word, c.width / 2, c.height / 2);
    var tex = new T.CanvasTexture(c);
    tex.colorSpace = T.SRGBColorSpace;
    return { tex: tex, w: c.width, h: c.height };
  }

  /* ================================================================
     mount
     ================================================================ */
  function mount(canvas, opts) {
    opts = opts || {};
    var G = global.WORDGRAPH, T = global.THREE;
    if (!canvas || !T || !G || !G.nodes || !G.nodes.length) return false;
    if (st) destroy();
    var inst = null;                       // bu montajın durumu

    var W = canvas.clientWidth, H = canvas.clientHeight;
    if (!W || !H) return false;

    var renderer;
    try {
      renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true,
                                       powerPreference: "high-performance" });
    } catch (e) { return false; }
    renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 2));
    renderer.setSize(W, H, false);

    var reduced = opts.reduced != null ? !!opts.reduced :
      (global.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)").matches : false);

    /* Dar ekranda daha az sözcük: hem okunur hem hızlı kalsın.
       Eşikler artık TUVAL genişliğine bakıyor ve tuval hero'nun yalnız bir
       sütunu; 390 px telefonda kutu ~317 px'e düşüyor. Alt basamak 105'te
       kalsaydı sınamanın "en az 100 sprite" koşuluna 5 sprite kalırdı. */
    var cap = opts.max || (W < 560 ? 110 : W < 900 ? 135 : 155);
    cap = Math.min(cap, 200, G.nodes.length);
    var nodes = G.nodes.slice(0, cap);      // en anlamlılar başta duruyor
    var links = G.links.filter(function (l) { return l.a < cap && l.b < cap; });

    /* komşuluk — üstüne gelince bağlı sözcükler öne çıksın */
    var adj = nodes.map(function () { return {}; });
    links.forEach(function (l) { adj[l.a][l.b] = 1; adj[l.b][l.a] = 1; });

    /* ------------------------- sahne ------------------------- */
    var scene = new T.Scene();
    var FOV = 40;
    var cam = new T.PerspectiveCamera(FOV, W / H, 0.1, 60);
    var root = new T.Group();
    root.rotation.z = -0.14;
    scene.add(root);

    /* fill < 1: küre kabını daha çok doldurur. Hero'da küre artık sağ
       kenardan taşacak biçimde kırpılıyor; ortada duran küçük bir daire
       yerine büyük bir küre yayı görünüyor. 1 = eski davranış. */
    var FILL = clamp(+opts.fill || 1, 0.55, 1.6);
    var camZ = 5, unit = 0.004, wordK = 1, RADPX = 0.004;
    function fit() {
      var tan = Math.tan(FOV * Math.PI / 360);
      // Dar ekranda küre genişlikten sınırlanır; payı biraz kısarak
      // kürenin hero içinde kaybolmasını engelliyoruz.
      // Küre hero'nun üst/alt kenarına değmesin: nefes payı bırakılıyor.
      var margin = (W / H < 0.85 ? 1.24 : 1.42) * FILL;
      camZ = Math.max(margin / tan, margin / (tan * Math.max(0.3, W / H)));
      cam.position.set(0, 0, camZ);
      cam.lookAt(0, 0, 0);
      unit = (2 * camZ * tan) / H;              // 1 CSS piksel = kaç dünya birimi
      // Küre ekranda küçüldükçe sözcükler küreye oranla büyüsün, yoksa
      // telefonda okunmaz hâle gelirler. (1/unit = küre yarıçapı, piksel)
      wordK = clamp(320 * unit, 1, 1.7);
      // Tuval genişliği kadar sürükleme ≈ 1.2 tur. Ekrandan bağımsız
      // sabit bir katsayı dar ekranda küreyi neredeyse hiç döndürmüyor.
      RADPX = (2 * Math.PI * 1.2) / Math.max(240, W);
    }
    fit();

    /* --- sözcük ölçüleri: kürenin yarıçapına oranlı (R = 1) --- */
    var maxN = 1, minN = 1e9;
    nodes.forEach(function (n) { maxN = Math.max(maxN, n.n); minN = Math.min(minN, n.n); });
    var lmin = Math.log(minN + 1), lmax = Math.log(maxN + 1);
    var size = nodes.map(function (nd) {
      var t = lmax > lmin ? (Math.log(nd.n + 1) - lmin) / (lmax - lmin) : 0.5;
      var h = (0.032 + 0.036 * Math.pow(t, 0.8)) * wordK;        // dünya birimi
      var ar = (0.60 * nd.w.length + 0.70) / 1.4;                // kaba en/boy
      return { t: t, h: h, w: h * ar };
    });
    /* itme yarıçapı: genişlik ağır basar, yükseklik biraz */
    var rad = size.map(function (s) { return 0.5 * (0.62 * s.w + 1.2 * s.h); });
    var dirs = layout(T, nodes, G.docs.length, rad);

    /* ---------------------- küre gövdesi + ağ ----------------------
       Düz renk bir top yerine gölgeli bir küre: yumuşak bir ışık ve
       kenarda fresnel parlaması. TikZ'in `ball color` gölgeli kürelerinin
       verdiği hacim duygusunu bu iki terim taşıyor.

       Işık yönü artık sabit değil: imleci izliyor (uLight her karede
       hedefine doğru yumuşatılıyor), imleç yokken çok yavaş bir Lissajous
       ile geziniyor. Üstüne uPointer'ın sürdüğü geniş bir parıltı ve
       hareketli bir spekülerlik biniyor — gölge böylece hiç donmuyor. */
    var LIGHT0 = new T.Vector3(-0.55, 0.72, 0.42).normalize();
    var ballGeo = new T.SphereGeometry(0.99, 64, 48);
    var ballMat = new T.ShaderMaterial({
      transparent: true, depthWrite: true,
      uniforms: {
        uBase:  { value: new T.Color("#ffffff") },
        uRim:   { value: new T.Color("#000000") },
        uOpac:  { value: 0.74 },
        uLight: { value: LIGHT0.clone() },
        uTime:  { value: 0 },
        uPointer: { value: new T.Vector2(0, 0) }
      },
      vertexShader: [
        "varying vec3 vN; varying vec3 vV;",
        "void main(){",
        "  vec4 mv = modelViewMatrix * vec4(position,1.0);",
        "  vN = normalize(normalMatrix * normal);",
        "  vV = normalize(-mv.xyz);",
        "  gl_Position = projectionMatrix * mv;",
        "}"
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 uBase; uniform vec3 uRim;",
        "uniform float uOpac; uniform vec3 uLight;",
        "uniform float uTime; uniform vec2 uPointer;",
        "varying vec3 vN; varying vec3 vV;",
        "void main(){",
        "  vec3 N = normalize(vN); vec3 V = normalize(vV);",
        "  vec3 L = normalize(uLight);",
        "  float fres = pow(1.0 - max(dot(N,V),0.0), 2.6);",
        "  float diff = 0.5 + 0.5*dot(N, L);",
        // imlecin bulunduğu yandan gelen çok geniş, düşük genlikli parıltı:
        // uLight yumuşatılarak geldiği için bu terim ani tepkiyi taşıyor
        "  vec3 L2 = normalize(vec3(uPointer.x*1.2, -uPointer.y*1.2, 0.9));",
        "  float sheen = pow(max(dot(N,L2),0.0), 3.0);",
        "  float spec = pow(max(dot(reflect(-L,N), V), 0.0), 24.0);",
        "  vec3 c = mix(uBase*0.90, uBase, diff);",
        "  c = mix(c, uRim, fres*0.55);",
        "  c += spec*0.12 + sheen*0.05;",
        // kenar çok yavaş nefes alsın: küre hiç kıpırdamadığında bile canlı
        "  float rimB = 1.0 + 0.05*sin(uTime*0.31);",
        "  float a = uOpac*(0.62+0.38*diff) + fres*0.22*rimB + spec*0.10;",
        "  gl_FragColor = vec4(c, clamp(a,0.0,1.0));",
        "}"
      ].join("\n")
    });
    var ball = new T.Mesh(ballGeo, ballMat);
    ball.renderOrder = 0;
    root.add(ball);

    var gp = [];
    function ll(lat, lon, r) {
      var p = (90 - lat) * Math.PI / 180, t = (lon + 180) * Math.PI / 180;
      return new T.Vector3(-(r * Math.sin(p) * Math.cos(t)), r * Math.cos(p),
                           r * Math.sin(p) * Math.sin(t));
    }
    function seg(a, b) { gp.push(a.x, a.y, a.z, b.x, b.y, b.z); }
    var lat, lon, prev, cur;
    for (lat = -60; lat <= 60; lat += 30) {
      prev = ll(lat, 0, 1.002);
      for (lon = 6; lon <= 360; lon += 6) { cur = ll(lat, lon, 1.002); seg(prev, cur); prev = cur; }
    }
    for (lon = 0; lon < 180; lon += 30) {
      prev = ll(-88, lon, 1.002);
      for (lat = -82; lat <= 88; lat += 6) { cur = ll(lat, lon, 1.002); seg(prev, cur); prev = cur; }
      prev = ll(88, lon + 180, 1.002);
      for (lat = 82; lat >= -88; lat -= 6) { cur = ll(lat, lon + 180, 1.002); seg(prev, cur); prev = cur; }
    }
    var gratGeo = new T.BufferGeometry();
    gratGeo.setAttribute("position", new T.Float32BufferAttribute(gp, 3));
    var gratMat = new T.LineBasicMaterial({ transparent: true, depthWrite: false });
    var grat = new T.LineSegments(gratGeo, gratMat);
    grat.renderOrder = 1;
    root.add(grat);

    /* -------------------- yaylar (geodezik eğri) --------------------
       Yay, iki sözcüğün DİBİNDE başlayıp bitmeli: sözcükler R=1.014..1.026
       yarıçapında duruyor, yaylar ise 1.005'te başlıyordu — uçlarda gözle
       görülür boşluk kalıyordu. Taban yarıçap sözcüklerin ortalamasına
       çekildi, kabarma (lift) da kısıldı: eski 0.06 katsayısıyla uzun
       yaylar 1.075'e balon yapıp küreden kopuyor, ilgisiz sözcüklerin
       üstünden geçiyordu. */
    var R_ARC = 1.020;
    var SEGS = 28, VPL = SEGS * 2;            // yay başına köşe (LineSegments)
    var lpos = new Float32Array(links.length * VPL * 3);
    var lcol = new Float32Array(links.length * VPL * 4);
    /* Her yayın SEGS+1 ayrık noktasının BİRİM yönü. Derinlik solmasını her
       karede bu diziden okuyoruz; köşeleri döndürmek yerine kamerayı
       kürenin yerel eksenine taşıdığımız için tek nokta çarpım yetiyor. */
    var ldir = new Float32Array(links.length * (SEGS + 1) * 3);
    var taper = new Float32Array(VPL);        // uçlara doğru incelme
    var cmix = new Float32Array(VPL);         // iki uç rengi arası karışım

    /** İki yön arasında küre yüzeyinde geodezik (slerp); birim yön döner. */
    function geodesic(a, b, t, ang, out) {
      var s = Math.sin(ang);
      if (ang < 1e-4 || Math.abs(s) < 1e-4) {
        out.set(0, 0, 0).addScaledVector(a, 1 - t).addScaledVector(b, t);
        if (out.lengthSq() < 1e-9) out.copy(a);
      } else {
        out.set(0, 0, 0)
          .addScaledVector(a, Math.sin((1 - t) * ang) / s)
          .addScaledVector(b, Math.sin(t * ang) / s);
      }
      return out.normalize();
    }

    (function buildArcs() {
      var k;
      for (k = 0; k < VPL; k++) {
        var u = ((k >> 1) + (k & 1)) / SEGS;         // 0..1, çizilen yay boyunca
        /* Uç 0.15'e iniyor (eskiden 0.3): iplik sözcüğün dibinde sönerek
           bitiyor. Üs 1'den küçük olduğu için sönme yalnız uçlara sıkışır,
           yayın gövdesi tam parlak kalır. */
        taper[k] = 0.15 + 0.85 * Math.pow(Math.sin(Math.PI * clamp(u, 0, 1)), 0.55);
        /* Renk karışımı yalnız ortada: her yarı dürüstçe kendi belgesinin
           renginde kalsın. Karışım BİLEŞEN bazında (RGB) — ton üzerinden
           209°→30° geçişi tam yeşilin (120°) içinden geçerdi. */
        cmix[k] = smooth(u, 0.30, 0.70);
      }
      var A = new T.Vector3(), B = new T.Vector3(), P = new T.Vector3();
      links.forEach(function (l, li) {
        A.copy(dirs[l.a]); B.copy(dirs[l.b]);
        var ang = Math.acos(clamp(A.dot(B), -1, 1));
        var lift = 0.008 + 0.035 * (ang / Math.PI);
        /* Yay sözcüğün MERKEZİNİ delmesin: uçlar sözcüğün açısal yarıçapı
           kadar içeri çekiliyor (rad[] yerleşim gevşetmesinden geliyor). */
        var t0 = ang > 1e-3 ? Math.min(0.34, 0.85 * rad[l.a] / ang) : 0;
        var t1 = 1 - (ang > 1e-3 ? Math.min(0.34, 0.85 * rad[l.b] / ang) : 0);
        var o3 = li * (SEGS + 1) * 3, off = li * VPL * 3;
        for (var s = 0; s <= SEGS; s++) {
          var t = t0 + (t1 - t0) * (s / SEGS);
          geodesic(A, B, t, ang, P);
          ldir[o3 + s * 3] = P.x; ldir[o3 + s * 3 + 1] = P.y; ldir[o3 + s * 3 + 2] = P.z;
          var r = R_ARC + lift * Math.sin(Math.PI * t);
          // LineSegments her parçayı iki köşe ister; iç noktalar iki kez yazılır
          if (s < SEGS) {
            lpos[off + s * 6] = P.x * r;
            lpos[off + s * 6 + 1] = P.y * r;
            lpos[off + s * 6 + 2] = P.z * r;
          }
          if (s > 0) {
            lpos[off + (s - 1) * 6 + 3] = P.x * r;
            lpos[off + (s - 1) * 6 + 4] = P.y * r;
            lpos[off + (s - 1) * 6 + 5] = P.z * r;
          }
        }
      });
    })();

    var arcGeo = new T.BufferGeometry();
    arcGeo.setAttribute("position", new T.Float32BufferAttribute(lpos, 3));
    // BufferAttribute diziyi başvuruyla tutar; Float32BufferAttribute
    // kopyalar — kopyalasa her karede yazdığımız alfa GPU'ya ulaşmaz.
    var arcColAttr = new T.BufferAttribute(lcol, 4);
    arcColAttr.setUsage(T.DynamicDrawUsage);
    arcGeo.setAttribute("color", arcColAttr);
    var arcMat = new T.LineBasicMaterial({ vertexColors: true, transparent: true,
                                           depthWrite: false });
    var arcs = new T.LineSegments(arcGeo, arcMat);
    arcs.renderOrder = 2;
    root.add(arcs);

    /* LineBasicMaterial `linewidth`i yok sayar (WebGL çekirdek sınırı):
       2× ekranda çizgi fiziksel olarak yarı yarıya inceliyor ve yıkanıyor.
       Kalınlaştıramadığımız için alfa tabanını azıcık açıyoruz. */
    var dprBoost = 1 + 0.15 * (clamp(global.devicePixelRatio || 1, 1, 2) - 1);

    /* Belge renkleri: ton her belgenin bandHue'su çevresinde ±4° salınıyor
       (Task C). Kuşak (209°→30°) kütüphane kartlarını ve renk şeridini de
       sürdüğü için sapma dar tutuldu — belge kimliği bozulmamalı. */
    var ND = G.docs.length;
    var docRGB = new Float32Array(ND * 3);
    function mixDocColors(t, P) {
      for (var d = 0; d < ND; d++) {
        var c = hsl(bandHue(d, ND) + 4 * Math.sin(t * 0.07 + d),
                    P.lineS * (1 - DESAT * bandK(d, ND)), P.lineL);
        docRGB[d * 3] = c.r; docRGB[d * 3 + 1] = c.g; docRGB[d * 3 + 2] = c.b;
      }
    }

    /** Yay köşelerinin RGB'si: A ucunun belge renginden B ucununkine.
        Ton kayması çok yavaş olduğu için her karede değil, saniyede
        birkaç kez çağrılıyor; alfa ise her karede yeniden yazılıyor. */
    function paintArcs() {
      for (var i = 0; i < links.length; i++) {
        var l = links[i], off = i * VPL * 4;
        var a3 = (nodes[l.a].p || 0) * 3, b3 = (nodes[l.b].p || 0) * 3;
        var ar = docRGB[a3], ag = docRGB[a3 + 1], ab = docRGB[a3 + 2];
        var br = docRGB[b3], bg = docRGB[b3 + 1], bb = docRGB[b3 + 2];
        for (var k = 0; k < VPL; k++) {
          var m = cmix[k], o = off + k * 4;
          lcol[o]     = ar + (br - ar) * m;
          lcol[o + 1] = ag + (bg - ag) * m;
          lcol[o + 2] = ab + (bb - ab) * m;
        }
      }
    }

    /* -------------------------- sözcükler -------------------------- */
    var sprites = [], texes = [], built = false;
    var wordGroup = new T.Group();
    root.add(wordGroup);

    function buildWords() {
      if (!inst || inst.dead || built) return;
      var ts = clamp(global.devicePixelRatio || 1, 1, 2) * 1.6;
      nodes.forEach(function (nd, i) {
        var px = Math.max(9, Math.round(size[i].h / unit));      // doku çözünürlüğü
        var tx = wordTexture(T, nd.w, px, ts);
        texes.push(tx.tex);
        var mat = new T.SpriteMaterial({ map: tx.tex, transparent: true,
                                         depthTest: false, depthWrite: false });
        var sp = new T.Sprite(mat);
        sp.position.copy(dirs[i]).multiplyScalar(1.014 + (i % 4) * 0.004);
        sp.userData = { i: i, ar: tx.w / tx.h, front: 0 };
        sp.renderOrder = 3;
        wordGroup.add(sp);
        sprites.push(sp);
      });
      built = true;
      applyTheme(inst.theme);
      sizeSprites();
      inst.dirty = true;
    }

    function sizeSprites() {
      sprites.forEach(function (sp, i) {
        var h = size[i].h;
        sp.scale.set(h * sp.userData.ar, h, 1);
      });
    }

    /* --------------------------- tema --------------------------- */
    var col = new T.Color();
    function hsl(h, s, l) { return col.setStyle("hsl(" + h + "," + s + "%," + l + "%)"); }

    function applyTheme(name) {
      var P = PAL[name === "dark" ? "dark" : "light"];
      inst.theme = name === "dark" ? "dark" : "light";
      inst.pal = P;
      ballMat.uniforms.uBase.value.setStyle(P.ball);
      ballMat.uniforms.uRim.value.setStyle(P.rim);
      ballMat.uniforms.uOpac.value = P.ballA;
      gratMat.color.setStyle(P.grat); gratMat.opacity = P.gratA;

      /* Yayın rengi artık tek bir belgeden gelmiyor: `l.d` iki ucun DEĞİL,
         "en ayırt edici ortak belge"nin indeksi — mavi iki sözcüğü birleştiren
         yay kahverengi çıkabiliyordu. Her yarı kendi ucunun belge rengini
         alıyor, ortada yumuşak geçiyor. (l.d focusDoc için duruyor.) */
      mixDocColors(0, P);
      paintArcs();
      arcColAttr.needsUpdate = true;

      sprites.forEach(function (sp, i) {
        var ndoc = G.docs.length;
        var hue = bandHue(nodes[i].p, ndoc);
        var k = bandK(nodes[i].p, ndoc);
        var t = size[i].t;
        var l = P.wordL + (inst.theme === "dark" ? 7 * t : -7 * t);
        sp.material.color.copy(hsl(hue, P.wordS * (1 - DESAT * k),
                                   clamp(l, 8, 92)));
      });
      inst.dirty = true;
    }

    /* --------------------------- etiket --------------------------- */
    var host = canvas.parentNode || document.body;
    var tip = document.createElement("div");
    tip.className = "wg-tip";
    tip.setAttribute("aria-hidden", "true");
    host.appendChild(tip);

    function showTip(i) {
      var nd = nodes[i];
      var names = nd.docs.slice(0, 3).map(function (d) {
        return '<span><i style="--h:' + ((G.docs[d] || {}).hue || 210) + '"></i>' +
               esc(shortTitle((G.docs[d] || {}).title_tr, 36)) + "</span>";
      }).join("");
      var more = nd.docs.length > 3
        ? "<em>+" + (nd.docs.length - 3) + " metin daha</em>" : "";
      tip.innerHTML =
        '<b class="wg-w">' + esc(nd.w) + "</b>" +
        (nd.tr ? '<span class="wg-tr">' + esc(nd.tr) + "</span>" : "") +
        '<span class="wg-n">' + nd.n + " kez · " + nd.docs.length + " metinde</span>" +
        '<span class="wg-docs">' + names + more + "</span>";
      tip.classList.add("on");
      placeTip(i);
    }
    var pv = new T.Vector3();
    function placeTip(i) {
      pv.copy(sprites[i].position).applyQuaternion(root.quaternion).project(cam);
      var x = (pv.x * 0.5 + 0.5) * W, y = (-pv.y * 0.5 + 0.5) * H;
      var tw = tip.offsetWidth || 190, th = tip.offsetHeight || 76;
      var top = y - th - (size[i].h / unit) * 0.8 - 8;
      if (top < 4) top = y + 20;
      tip.style.left = clamp(x - tw / 2, 6, Math.max(6, W - tw - 6)) + "px";
      tip.style.top = clamp(top, 4, Math.max(4, H - th - 4)) + "px";
    }
    function hideTip() { tip.classList.remove("on"); }

    /* ------------------------- etkileşim -------------------------
       İmleç iki ayrı işi sürüyor ve ikisinin sınırı artık farklı:
         · TUVAL içindeki konum → sözcük seçimi (pick/hover)
         · HERO içindeki konum  → paralaks eğim ve kürenin ışığı
       Küre eskiden hero'nun tamamını kaplıyordu, ikisi aynı şeydi. Şimdi
       yalnız sağ sütunda; tuvale bakarsak imleç sol sütunda gezerken küre
       ölü kalır. Ölçüm kutusu opts.pointerHost ile değiştirilebilir. */
    var pHost = opts.pointerHost ||
                (canvas.closest ? canvas.closest(".hero") : null) || canvas;
    var ray = new T.Raycaster(), ndc = new T.Vector3();
    var hover = -1, inCanvas = false, inHost = false;
    var mx = 0, my = 0, needPick = false;
    var tiltX = 0, tiltY = 0, tgX = 0, tgY = 0, lastTap = -1;
    /* imleç ışığı: -1..1. İki kaynak var — kendi olayımız ve DOM
       katmanının pointer() çağrısı; dışarıdan gelen önceliklidir. */
    var ptrX = 0, ptrY = 0, ptrOn = false;
    var extX = 0, extY = 0, extOn = false;

    /* Dikdörtgenler önbellekte: pointermove'da getBoundingClientRect
       çağırmak her harekette düzen hesabı zorluyor. Kaydırma/yeniden
       boyutlama geçersiz kılar, ayrıca 200 ms'de bir kendiliğinden
       tazelenir (Lenis gibi dönüşümle kaydıran katmanlara karşı). */
    var rcCv = null, rcHo = null, rcAt = -1e9, rcOld = false;
    function rects(now) {
      if (rcCv && !rcOld && now - rcAt < 200) return;
      rcCv = canvas.getBoundingClientRect();
      rcHo = pHost === canvas ? rcCv : pHost.getBoundingClientRect();
      rcAt = now; rcOld = false;
    }
    function stale() { rcOld = true; }

    function onMove(e) {
      rects(e.timeStamp || performance.now());
      if (!rcCv.width || !rcCv.height) return;
      mx = e.clientX - rcCv.left; my = e.clientY - rcCv.top;
      inCanvas = mx >= 0 && my >= 0 && mx <= rcCv.width && my <= rcCv.height;

      var hx = e.clientX - rcHo.left, hy = e.clientY - rcHo.top;
      inHost = rcHo.width > 0 && rcHo.height > 0 &&
               hx >= 0 && hy >= 0 && hx <= rcHo.width && hy <= rcHo.height;
      if (inHost) {
        tgX = (hx / rcHo.width - 0.5) * 0.28;
        tgY = (hy / rcHo.height - 0.5) * 0.18;
        ptrX = (hx / rcHo.width) * 2 - 1;
        ptrY = (hy / rcHo.height) * 2 - 1;
        ptrOn = true;
      } else {
        tgX = tgY = 0; ptrOn = false;
      }
      if (!inCanvas) { setHover(-1); inst.dirty = true; return; }
      needPick = true;
      inst.dirty = true;
    }
    /* pointerleave yalnız tuvalden çıkışı bildirir: eğim ve ışık hero
       sınırına bakıyor, orada sürmeye devam etmeli. */
    function onLeave() { inCanvas = false; setHover(-1); inst.dirty = true; }

    function pick() {
      needPick = false;
      if (!built || !inCanvas) return;
      rects(performance.now());
      if (!rcCv.width || !rcCv.height) return;
      ndc.set((mx / rcCv.width) * 2 - 1, -(my / rcCv.height) * 2 + 1, 0);
      ray.setFromCamera(ndc, cam);
      var hits = ray.intersectObjects(sprites, false), found = -1;
      for (var k = 0; k < hits.length; k++) {
        // ufkun ötesindeki sözcük görünmüyor; etiketi de açılmasın
        if (hits[k].object.userData.front > horizon) {
          found = hits[k].object.userData.i; break;
        }
      }
      setHover(found);
    }

    function setHover(i) {
      if (i === hover) return;
      hover = i;
      canvas.style.cursor = dragOn ? "grabbing" : (i >= 0 ? "pointer" : "grab");
      if (i >= 0) showTip(i); else hideTip();
      inst.dirty = true;
    }

    function onClick(e) {
      if (e.target && e.target.closest && e.target.closest("a,button")) return;
      // Sürükleyip bıraktıysa bu bir tıklama değil, çevirmedir.
      if (dgMoved > 8) { dgMoved = 0; return; }
      if (needPick) pick();
      if (hover < 0) return;
      // dokunmatikte ilk dokunuş seçer, ikincisi açar
      if ((e.pointerType === "touch" || e.pointerType === "pen") && lastTap !== hover) {
        lastTap = hover; return;
      }
      var doc = G.docs[nodes[hover].docs[0]];
      if (doc && doc.id) global.location.hash = "#/read/" + encodeURIComponent(doc.id);
    }
    function onDown(e) {
      if (e.pointerType !== "touch" && e.pointerType !== "pen") return;
      stale(); rects(performance.now());
      mx = e.clientX - rcCv.left; my = e.clientY - rcCv.top;
      inCanvas = true; pick();
    }

    /* ------------------ sürükleyerek döndürme ------------------
       Küre kendiliğinden dönüyordu ama tutulup çevrilemiyordu; "mouse ile
       dokununca dönmüyor" şikâyeti buydu. Piksel → açı katsayısı tuval
       genişliğine bağlı (RADPX, fit() içinde): dar ekranda kısa bir
       sürükleme de bir tam tur döndürsün.
       Bırakınca atalet devam eder (τ = 0.75 s). Sürükleme sırasında
       tıklama iptal edilir, yoksa her çevirme bir metne gidiyor. */
    var dragOn = false, dragId = -1, dgX = 0, dgY = 0, dgMoved = 0, dgT = 0;
    var spinV = 0, tiltV = 0, manTilt = 0;

    function onDragDown(e) {
      if (e.button != null && e.button > 0) return;      // yalnız sol tuş
      dragOn = true; dragId = e.pointerId;
      dgX = e.clientX; dgY = e.clientY; dgMoved = 0;
      dgT = e.timeStamp || performance.now();
      spinV = 0; tiltV = 0;
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      canvas.style.cursor = "grabbing";
      inst.dirty = true;
    }
    function onDragMove(e) {
      if (!dragOn || e.pointerId !== dragId) return;
      var now = e.timeStamp || performance.now();
      var sdt = Math.max(8, now - dgT) / 1000;
      var dx = e.clientX - dgX, dy = e.clientY - dgY;
      dgX = e.clientX; dgY = e.clientY; dgT = now;
      dgMoved += Math.abs(dx) + Math.abs(dy);
      root.rotation.y += dx * RADPX;
      manTilt = clamp(manTilt + dy * RADPX * 0.75, -1.05, 1.05);
      // hız: bırakıldığında atalet bundan başlar
      spinV = clamp(dx * RADPX / sdt, -8, 8);
      tiltV = clamp(dy * RADPX * 0.75 / sdt, -6, 6);
      inst.dirty = true;
    }
    function onDragUp(e) {
      if (!dragOn) return;
      if (e && e.pointerId != null && e.pointerId !== dragId &&
          e.type !== "pointercancel") return;
      dragOn = false;
      try { canvas.releasePointerCapture(dragId); } catch (err) {}
      dragId = -1;
      canvas.style.cursor = hover >= 0 ? "pointer" : "grab";
      inst.dirty = true;
    }

    canvas.style.cursor = "grab";                  // tutulabilirliği belli et
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("pointerdown", onDown, { passive: true });
    canvas.addEventListener("pointerdown", onDragDown);
    canvas.addEventListener("pointermove", onDragMove);
    canvas.addEventListener("pointerup", onDragUp);
    canvas.addEventListener("pointercancel", onDragUp);
    canvas.addEventListener("pointerleave", onLeave, { passive: true });
    global.addEventListener("pointermove", onMove, { passive: true });
    global.addEventListener("scroll", stale, { passive: true });

    /* ---------------------- ölçü / görünürlük ---------------------- */
    function resize() {
      var nw = canvas.clientWidth, nh = canvas.clientHeight;
      if (!nw || !nh || (nw === W && nh === H)) return;
      W = nw; H = nh;
      renderer.setSize(W, H, false);
      cam.aspect = W / H;
      fit();
      cam.updateProjectionMatrix();
      stale();                                 // imleç kutuları da kaydı
      inst.dirty = true;
    }
    var ro = null;
    if (global.ResizeObserver) { ro = new ResizeObserver(resize); ro.observe(canvas); }
    global.addEventListener("resize", resize);

    var visible = true, io = null;
    if (global.IntersectionObserver) {
      io = new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) { last = performance.now(); inst.dirty = true; }
      }, { threshold: 0 });
      io.observe(canvas);
    }
    function onVis() { if (!document.hidden) { last = performance.now(); inst.dirty = true; } }
    document.addEventListener("visibilitychange", onVis);

    /* ------------------------- çizim döngüsü -------------------------
       Metin güvenli bölgesi (safeMask) kaldırıldı: hero iki sütuna
       ayrıldı, metin artık kürenin ÜSTÜNDE durmuyor. Maske her sprite ve
       her yay için karede bir project(cam) çağırıyordu — o da gitti. */
    var wv = new T.Vector3(), camDir = new T.Vector3();
    var camLoc = new T.Vector3(), invQ = new T.Quaternion();
    var lightNow = LIGHT0.clone(), lightTgt = new T.Vector3();
    var fseg = new Float32Array(SEGS + 1);
    var last = performance.now(), raf = 0, tsec = 0, hueT = 1;
    /* Görünen ufuk: küre yüzeyindeki bir nokta, kamera uzaklığı d iken
       dot(yön, kameraYönü) = R/d değerinde silüete değer — SIFIRDA değil.
       Solmaları buraya oturtmazsak sözcükler kenarda birden beliriyor,
       yaylar da arka yüzden görünmeye devam ediyor. */
    var horizon = 1.005 / camZ;
    /* her yayın darbesi farklı anda geçsin diye sabit faz kaymaları */
    var pulse = 0, pulseF = 0, linkPhase = (function () {
      var r = rng(99173), a = [];
      for (var i = 0; i < links.length; i++) a.push(r());
      return a;
    })();
    /* belge odağı (WordGlobe.focusDoc) — sertçe değil, süzülerek geçer */
    var focusDocIdx = null, focusStr = 0;

    function frame(now) {
      if (!inst || inst.dead) return;
      raf = requestAnimationFrame(frame);
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!visible || document.hidden) return;
      if (reduced && !inst.dirty) return;      // hareket azaltıldıysa durağan

      /* Yumuşatma katsayısı kare süresinden türer: 0.05 sabiti 120 Hz'de
         iki kat hızlı, 30 Hz'de yarı hızlı davranıyordu. τ = 0.16 s. */
      var kd = 1 - Math.exp(-dt / 0.16);
      /* Sürükleme kullanıcının kendi hareketi: hareket azaltma ayarı onu
         engellemez, yalnızca kendiliğinden dönmeyi ve ataleti kapatır. */
      if (!dragOn) {
        if (!reduced) {
          root.rotation.y += dt * (0.05 + spinV);
          manTilt = clamp(manTilt + tiltV * dt, -1.05, 1.05);
          // atalet sönümü: bırakınca birkaç saniye savrulup durur
          var kf = Math.exp(-dt / 0.75);
          spinV *= kf; tiltV *= kf;
          if (Math.abs(spinV) > 0.002 || Math.abs(tiltV) > 0.002) inst.dirty = true;
        } else { spinV = tiltV = 0; }
      }
      if (!reduced) {
        tsec += dt;
        tiltX += (tgY - tiltX) * kd;
        tiltY += (tgX - tiltY) * kd;
        cam.position.x = tiltY * 1.1;
        cam.position.y = -tiltX * 0.7;
        cam.position.z = camZ;
        cam.lookAt(0, 0, 0);
      }
      // eğim: fare paralaksı + sürüklemeyle biriken açı
      root.rotation.x = tiltX * 0.85 + manTilt;
      inst.dirty = false;
      camDir.copy(cam.position).normalize();
      var cdist = cam.position.length();
      horizon = 1.005 / cdist;
      /* Yaylar topun bir kabuk üstünde duruyor (r ≈ 1.02+), bu yüzden ÖN
         yüzdeyken bile silüetin dışına taşıp küreyi saran bir hâle
         yapıyorlardı. Sönmeyi topun disk kenarına oturtuyoruz: r
         yarıçapındaki nokta diski sin θ = Rtop·√(1-(Rtop/d)²) / r
         açısında geçiyor; ötesi zaten "arkada" sayılmalı. */
      var rb = 0.99 / cdist;
      var sB = 0.99 * Math.sqrt(Math.max(0, 1 - rb * rb));
      var sA = Math.min(1, sB / (R_ARC + 0.02));
      var hArc = Math.sqrt(Math.max(0, 1 - sA * sA));
      /* Yay derinliği için: 16 bin köşeyi döndürmek yerine kamerayı kürenin
         yerel eksenine taşıyoruz — dönme nokta çarpımı korur. Birim
         dördeyin tersi eşleniğidir (sürüm farkı gözetmeden). */
      invQ.set(-root.quaternion.x, -root.quaternion.y,
               -root.quaternion.z, root.quaternion.w);
      camLoc.copy(camDir).applyQuaternion(invQ);
      var P = inst.pal, i;

      /* --- odak geçişi (focusDoc): ani sönme yerine süzülme --- */
      var fTgt = focusDocIdx == null ? 0 : 1;
      if (Math.abs(fTgt - focusStr) > 0.002) {
        focusStr += (fTgt - focusStr) * (1 - Math.exp(-dt / 0.20));
        inst.dirty = true;                     // azaltılmış harekette de tamamlansın
      } else { focusStr = fTgt; }

      /* --- küre ışığı: imleci izler, imleç yokken çok yavaş gezinir --- */
      var lon = extOn || ptrOn, lx = extOn ? extX : ptrX, ly = extOn ? extY : ptrY;
      if (reduced) {
        lightTgt.copy(LIGHT0);                 // hareket azaltıldı: sabit yön
      } else if (lon) {
        // imleç sağa gidince ışık sağdan gelsin; ekran y'si aşağı doğru büyür
        lightTgt.set(lx * 0.95, -ly * 0.95, 0.62).normalize();
      } else {
        lightTgt.set(LIGHT0.x + 0.16 * Math.sin(tsec * 0.23),
                     LIGHT0.y + 0.12 * Math.cos(tsec * 0.17),
                     LIGHT0.z + 0.10 * Math.sin(tsec * 0.11)).normalize();
      }
      lightNow.lerp(lightTgt, 1 - Math.exp(-dt / 0.22)).normalize();
      ballMat.uniforms.uLight.value.copy(lightNow);
      ballMat.uniforms.uTime.value = tsec;
      ballMat.uniforms.uPointer.value.set(lon ? lx : 0, lon ? ly : 0);

      /* --- imleç merceği --------------------------------------------
         Işığın imleçle kayması ölçülebilir ama GÖRÜLEMEZ kadar ince
         kalıyordu: kullanıcı "interaktif bile değil" dedi ve haklıydı.
         Mercek bunu tersine çevirir — imlecin çevresindeki sözcükler
         büyüyüp öne çıkar. Aynı zamanda ürünün vaadini anlatır:
         "sözcüğe dokun, karşılığı gelsin".
         Yarıçap tuvale oranlı: telefonda küçük kürede kocaman bir
         mercek her şeyi birden büyütürdü. */
      var lensR = clamp(W * 0.24, 96, 260);
      var lensOn = ptrOn && !reduced && built;
      var lensR2 = lensR * lensR;

      /* sözcükler: derinliğe göre soluklaşsın, üstüne gelinen öne çıksın */
      if (built) {
        var near = hover >= 0 ? adj[hover] : null;
        for (i = 0; i < sprites.length; i++) {
          var sp = sprites[i];
          wv.copy(sp.position).applyQuaternion(root.quaternion);
          var f = wv.dot(camDir);
          sp.userData.front = f;
          // solma ufka oturuyor: silüetin ötesindeki sözcük tamamen gider
          var a = smooth(f, horizon - 0.03, horizon + 0.34);
          var on = i === hover;
          var o = P.dimA + (1 - P.dimA) * Math.pow(a, 1.6);
          if (hover >= 0) o *= on ? 1 : (near[i] ? 1.1 : 0.45);
          if (focusStr > 0.002) {
            var inDoc = focusDocIdx != null && nodes[i].docs.indexOf(focusDocIdx) >= 0;
            o *= 1 + focusStr * ((inDoc ? 1 : 0.18) - 1);
          }
          /* Mercek kazancı: yalnızca ön yüzdeki sözcükler için hesaplanır,
             arkadakiler zaten görünmüyor — 110 projeksiyonun yarısı boşa
             gitmesin. */
          var g = 0;
          if (lensOn && f > horizon - 0.02) {
            pv.copy(sp.position).applyQuaternion(root.quaternion).project(cam);
            var dx = (pv.x * 0.5 + 0.5) * W - mx;
            var dy = (-pv.y * 0.5 + 0.5) * H - my;
            var dd = (dx * dx + dy * dy) / lensR2;
            if (dd < 3.2) g = Math.exp(-dd * 2.1);
          }
          sp.material.opacity = on ? 1 : clamp(o + 0.5 * g * (1 - o), 0, 1);
          var k = (0.86 + 0.14 * a) * (on ? 1.32 : 1) * (1 + 0.62 * g);
          sp.scale.set(size[i].h * sp.userData.ar * k, size[i].h * k, 1);
        }
        if (hover >= 0) placeTip(hover);
        if (lensOn) inst.dirty = true;
      }

      /* --- yaylar ---
         Sönme artık yayın ORTA noktasının derinliğinden değil, her köşenin
         kendi derinliğinden geliyor. 180°'ye varan bir yayın ortası kameraya
         bakınca yayın tamamı — silüetin arkasına dolanan yarısı dahil — aynı
         parlaklıkta kalıyordu; bağlantıların yanlış görünmesinin asıl
         sebebi buydu. Üstüne yay boyunca akan bir darbe biniyor; küre çok
         yavaş döndüğü için hareketi asıl o taşıyor. */
      pulse += dt * 0.16;
      pulseF += dt * 0.34;                     // vurgulanan komşu yaylar ~2× hızlı
      /* Ton kayması saniyede birkaç kez tazelense yeter (periyodu ~90 s);
         renk yazımını her kareye yaymak boşuna 200 KB kopyalamak olurdu. */
      hueT += dt;
      if (!reduced && hueT > 0.12) { hueT = 0; mixDocColors(tsec, P); paintArcs(); }
      var base0 = P.lineA * dprBoost;
      for (i = 0; i < links.length; i++) {
        var lk = links[i];
        var nb = hover >= 0 && (lk.a === hover || lk.b === hover);
        var fa = base0;
        if (hover >= 0) fa *= nb ? 2.2 : 0.30;
        if (focusStr > 0.002) {
          /* Odaklı belgenin yayı: l.d "en ayırt edici ortak belge", tek
             başına çok seyrek (bir belgede yalnız 1 yay olabiliyor); uçların
             kıtası da sayılıyor ki odak gözle görülür bir demet olsun. */
          var inD = lk.d === focusDocIdx ||
                    nodes[lk.a].p === focusDocIdx || nodes[lk.b].p === focusDocIdx;
          fa *= 1 + focusStr * ((inD ? 1.8 : 0.15) - 1);
        }
        var ph = ((nb ? pulseF : pulse) + linkPhase[i]) % 1;
        var o3 = i * (SEGS + 1) * 3, off = i * VPL * 4;
        for (var s = 0; s <= SEGS; s++) {
          var q = o3 + s * 3;
          var fv = ldir[q] * camLoc.x + ldir[q + 1] * camLoc.y + ldir[q + 2] * camLoc.z;
          fseg[s] = smooth(fv, hArc - 0.02, hArc + 0.30);
        }
        for (var k2 = 0; k2 < VPL; k2++) {
          var s2 = (k2 >> 1) + (k2 & 1);
          var dd = Math.abs(s2 / SEGS - ph);
          dd = Math.min(dd, 1 - dd);                        // halka mesafesi
          var glow = 1 + 0.25 * Math.exp(-dd * dd * 110);   // dar tepe
          lcol[off + k2 * 4 + 3] = Math.min(1, fa * fseg[s2] * taper[k2] * glow);
        }
      }
      arcColAttr.needsUpdate = true;

      renderer.render(scene, cam);
      if (needPick) pick();
    }

    /* ---------------------------- durum ---------------------------- */
    inst = {
      dead: false, dirty: true, theme: "light", pal: PAL.light,
      applyTheme: applyTheme,
      info: function () {
        return { sprites: sprites.length, links: links.length, nodes: nodes.length,
                 theme: inst.theme, reduced: reduced, built: built, w: W, h: H,
                 focus: focusDocIdx,
                 // sürükleme sınaması için: dönüş açısı, eğim ve atalet
                 rotY: root.rotation.y, tilt: manTilt, spin: spinV,
                 dragging: dragOn };
      },
      /** Bir belgeyi öne çıkar; null her şeyi geri getirir. */
      focusDoc: function (i) {
        var v = (i == null || i < 0 || i >= ND) ? null : (i | 0);
        if (v === focusDocIdx) return;
        focusDocIdx = v;
        inst.dirty = true;
      },
      /** -1..1 normalize imleç (hero kutusuna göre); null = imleç yok. */
      pointer: function (x, y) {
        if (x == null || y == null || x !== x || y !== y) { extOn = false; }
        else { extOn = true; extX = clamp(x, -1, 1); extY = clamp(y, -1, 1); }
        inst.dirty = true;
      },
      destroy: function () {
        inst.dead = true;
        cancelAnimationFrame(raf);
        if (ro) ro.disconnect();
        if (io) io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        global.removeEventListener("resize", resize);
        global.removeEventListener("pointermove", onMove);
        global.removeEventListener("scroll", stale);
        canvas.removeEventListener("click", onClick);
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointerdown", onDragDown);
        canvas.removeEventListener("pointermove", onDragMove);
        canvas.removeEventListener("pointerup", onDragUp);
        canvas.removeEventListener("pointercancel", onDragUp);
        canvas.removeEventListener("pointerleave", onLeave);
        if (tip && tip.parentNode) tip.parentNode.removeChild(tip);
        sprites.forEach(function (sp) {
          wordGroup.remove(sp);
          if (sp.material) sp.material.dispose();
        });
        texes.forEach(function (t) { try { t.dispose(); } catch (e) {} });
        [ballGeo, gratGeo, arcGeo].forEach(function (g) { try { g.dispose(); } catch (e) {} });
        [ballMat, gratMat, arcMat].forEach(function (m) { try { m.dispose(); } catch (e) {} });
        root.clear();
        scene.remove(root);
        try { renderer.dispose(); } catch (e) {}
        try { renderer.forceContextLoss(); } catch (e) {}
        canvas.style.cursor = "";
        sprites = []; texes = []; rcCv = rcHo = null;
      }
    };
    st = inst;

    applyTheme(opts.theme || "light");
    if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
      document.fonts.ready.then(buildWords, buildWords);
      setTimeout(function () { buildWords(); }, 1200);   // yazı tipi hiç gelmezse
    } else {
      buildWords();
    }
    raf = requestAnimationFrame(frame);
    return true;
  }

  /* ------------------------ dışa açılan API ------------------------ */
  function destroy() {
    if (!st) return;
    try { st.destroy(); } catch (e) {}
    st = null;
  }
  function setTheme(t) {
    if (!st || st.dead) return;
    try { st.applyTheme(t); } catch (e) {}
  }
  /** Tanılama (test-globe.js kullanıyor); küre yoksa null. */
  function info() { return st && !st.dead ? st.info() : null; }
  /** Renk şeridi (#heroBar) için: bir belgeyi öne çıkar, null geri alır. */
  function focusDoc(i) {
    if (!st || st.dead) return;
    try { st.focusDoc(i); } catch (e) {}
  }
  /** DOM katmanı kendi ışığını sürerken aynı değeri küreye de versin diye. */
  function pointer(x, y) {
    if (!st || st.dead) return;
    try { st.pointer(x, y); } catch (e) {}
  }

  global.WordGlobe = { mount: mount, destroy: destroy, setTheme: setTheme, info: info,
                       focusDoc: focusDoc, pointer: pointer };
})(window);
