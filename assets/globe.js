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

   ES modülü yok, fetch yok — file:// altında da çalışır (sözleşme §0).
   ================================================================== */
(function (global) {
  "use strict";

  var st = null;                 // etkin örnek (aynı anda tek küre)

  /* ------------------------- renk paleti -------------------------
     Sözcük ve yay renkleri belgenin `hue` değerinden türer; buradaki
     sayılar yalnızca doygunluk/parlaklık ayarıdır. Arayüz (etiket)
     renkleri style.css değişkenlerinden gelir. */
  var PAL = {
    light: {
      wordS: 40, wordL: 25,               // sözcük: hsl(ton, S%, L%)
      lineS: 48, lineL: 38, lineA: 0.32,  // yay — ince ve sakin
      grat: "#c6bfae", gratA: 0.32,       // enlem/boylam ağı
      ball: "#fdfcf9", ballA: 0.68,       // küre gövdesi
      rim:  "#1f5f96",                    // kenar parlaması (mürekkep mavisi)
      dimA: 0.028                         // en arkadaki sözcüğün opaklığı
    },
    dark: {
      wordS: 38, wordL: 74,
      lineS: 52, lineL: 56, lineA: 0.30,
      grat: "#39424f", gratA: 0.48,
      ball: "#0a0c11", ballA: 0.78,
      rim:  "#7db4e6",
      dimA: 0.04
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

    /* Dar ekranda daha az sözcük: hem okunur hem hızlı kalsın. */
    var cap = opts.max || (W < 560 ? 105 : W < 900 ? 130 : 155);
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

    var camZ = 5, unit = 0.004, wordK = 1;
    function fit() {
      var tan = Math.tan(FOV * Math.PI / 360);
      // Dar ekranda küre genişlikten sınırlanır; payı biraz kısarak
      // kürenin hero içinde kaybolmasını engelliyoruz.
      // Küre hero'nun üst/alt kenarına değmesin: nefes payı bırakılıyor.
      var margin = W / H < 0.85 ? 1.24 : 1.42;
      camZ = Math.max(margin / tan, margin / (tan * Math.max(0.3, W / H)));
      cam.position.set(0, 0, camZ);
      cam.lookAt(0, 0, 0);
      unit = (2 * camZ * tan) / H;              // 1 CSS piksel = kaç dünya birimi
      // Küre ekranda küçüldükçe sözcükler küreye oranla büyüsün, yoksa
      // telefonda okunmaz hâle gelirler. (1/unit = küre yarıçapı, piksel)
      wordK = clamp(320 * unit, 1, 1.7);
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
       Düz renk bir top yerine gölgeli bir küre: sol üstten gelen yumuşak
       bir ışık ve kenarda fresnel parlaması. TikZ'in `ball color` gölgeli
       kürelerinin verdiği hacim duygusunu bu iki terim taşıyor. */
    var ballGeo = new T.SphereGeometry(0.99, 64, 48);
    var ballMat = new T.ShaderMaterial({
      transparent: true, depthWrite: true,
      uniforms: {
        uBase:  { value: new T.Color("#ffffff") },
        uRim:   { value: new T.Color("#000000") },
        uOpac:  { value: 0.74 },
        uLight: { value: new T.Vector3(-0.55, 0.72, 0.42).normalize() }
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
        "varying vec3 vN; varying vec3 vV;",
        "void main(){",
        "  float fres = pow(1.0 - max(dot(vN,vV),0.0), 2.6);",
        "  float diff = 0.5 + 0.5*dot(vN, normalize(uLight));",
        "  vec3 c = mix(uBase*0.90, uBase, diff);",
        "  c = mix(c, uRim, fres*0.55);",
        "  float a = uOpac*(0.62+0.38*diff) + fres*0.22;",
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

    /* -------------------- yaylar (geodezik eğri) -------------------- */
    var SEGS = 16, VPL = SEGS * 2;            // yay başına köşe (LineSegments)
    var lpos = new Float32Array(links.length * VPL * 3);
    var lcol = new Float32Array(links.length * VPL * 4);
    var taper = new Float32Array(VPL);
    var linkMid = [];

    /** İki yön arasında küre yüzeyinde geodezik (slerp) + hafif kabarma. */
    function geodesic(a, b, t, ang, lift, out) {
      var s = Math.sin(ang);
      if (ang < 1e-4 || Math.abs(s) < 1e-4) {
        out.set(0, 0, 0).addScaledVector(a, 1 - t).addScaledVector(b, t);
        if (out.lengthSq() < 1e-9) out.copy(a);
      } else {
        out.set(0, 0, 0)
          .addScaledVector(a, Math.sin((1 - t) * ang) / s)
          .addScaledVector(b, Math.sin(t * ang) / s);
      }
      return out.normalize().multiplyScalar(1.005 + lift * Math.sin(Math.PI * t));
    }

    (function buildArcs() {
      var k;
      for (k = 0; k < VPL; k++) {
        var tt = (Math.floor(k / 2) + (k % 2)) / SEGS;
        taper[k] = 0.3 + 0.7 * Math.sin(Math.PI * clamp(tt, 0, 1));
      }
      var A = new T.Vector3(), B = new T.Vector3();
      var P = new T.Vector3(), Q = new T.Vector3();
      links.forEach(function (l, li) {
        A.copy(dirs[l.a]); B.copy(dirs[l.b]);
        var ang = Math.acos(clamp(A.dot(B), -1, 1));
        var lift = 0.01 + 0.06 * (ang / Math.PI);
        var off = li * VPL * 3;
        linkMid.push(new T.Vector3().addVectors(A, B).normalize());
        for (var s = 0; s < SEGS; s++) {
          geodesic(A, B, s / SEGS, ang, lift, P);
          geodesic(A, B, (s + 1) / SEGS, ang, lift, Q);
          lpos[off + s * 6] = P.x; lpos[off + s * 6 + 1] = P.y; lpos[off + s * 6 + 2] = P.z;
          lpos[off + s * 6 + 3] = Q.x; lpos[off + s * 6 + 4] = Q.y; lpos[off + s * 6 + 5] = Q.z;
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

      links.forEach(function (l, li) {
        var c = hsl(bandHue(l.d, G.docs.length), P.lineS, P.lineL);
        var off = li * VPL * 4;
        for (var k = 0; k < VPL; k++) {
          lcol[off + k * 4] = c.r;
          lcol[off + k * 4 + 1] = c.g;
          lcol[off + k * 4 + 2] = c.b;
        }
      });
      arcColAttr.needsUpdate = true;

      sprites.forEach(function (sp, i) {
        var hue = bandHue(nodes[i].p, G.docs.length);
        var t = size[i].t;
        var l = P.wordL + (inst.theme === "dark" ? 7 * t : -7 * t);
        sp.material.color.copy(hsl(hue, P.wordS, clamp(l, 8, 92)));
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

    /* ------------------------- etkileşim ------------------------- */
    var ray = new T.Raycaster(), ndc = new T.Vector2();
    var hover = -1, pointerIn = false, mx = 0, my = 0, needPick = false;
    var tiltX = 0, tiltY = 0, tgX = 0, tgY = 0, lastTap = -1;

    function onMove(e) {
      var r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      mx = e.clientX - r.left; my = e.clientY - r.top;
      pointerIn = mx >= 0 && my >= 0 && mx <= r.width && my <= r.height;
      if (!pointerIn) { setHover(-1); return; }
      tgX = (mx / r.width - 0.5) * 0.28;
      tgY = (my / r.height - 0.5) * 0.18;
      needPick = true;
      inst.dirty = true;
    }
    function onLeave() { pointerIn = false; setHover(-1); tgX = tgY = 0; inst.dirty = true; }

    function pick() {
      needPick = false;
      if (!built || !pointerIn) return;
      var r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      ndc.set((mx / r.width) * 2 - 1, -(my / r.height) * 2 + 1);
      ray.setFromCamera(ndc, cam);
      var hits = ray.intersectObjects(sprites, false), found = -1;
      for (var k = 0; k < hits.length; k++) {
        if (hits[k].object.userData.front > 0.02) { found = hits[k].object.userData.i; break; }
      }
      setHover(found);
    }

    function setHover(i) {
      if (i === hover) return;
      hover = i;
      canvas.style.cursor = i >= 0 ? "pointer" : "";
      if (i >= 0) showTip(i); else hideTip();
      inst.dirty = true;
    }

    function onClick(e) {
      if (e.target && e.target.closest && e.target.closest("a,button")) return;
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
      var r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      pointerIn = true; pick();
    }

    canvas.addEventListener("click", onClick);
    canvas.addEventListener("pointerdown", onDown, { passive: true });
    canvas.addEventListener("pointerleave", onLeave, { passive: true });
    global.addEventListener("pointermove", onMove, { passive: true });

    /* ---------------------- ölçü / görünürlük ---------------------- */
    function resize() {
      var nw = canvas.clientWidth, nh = canvas.clientHeight;
      if (!nw || !nh || (nw === W && nh === H)) return;
      W = nw; H = nh;
      renderer.setSize(W, H, false);
      cam.aspect = W / H;
      fit();
      cam.updateProjectionMatrix();
      measureSafe();
      inst.dirty = true;
    }
    var ro = null;
    if (global.ResizeObserver) { ro = new ResizeObserver(resize); ro.observe(canvas); }
    global.addEventListener("resize", resize);
    /* Hero metni yazı tipi yüklendikçe yeniden akıyor; güvenli bölge ilk
       ölçümde yanlış kalmasın diye birkaç kez tazelenir. */
    measureSafe();
    [80, 400, 1200].forEach(function (ms) { setTimeout(measureSafe, ms); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureSafe);

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

    /* ---------------------- metin güvenli bölgesi ----------------------
       Başlık ve düğmeler kürenin önünde duruyor. Sözcükler onların
       arkasından geçerken metni okunmaz hâle getiriyordu. Hero metninin
       ekrandaki dikdörtgeni NDC'ye çevrilir; o alana giren sözcük ve yay
       yumuşak bir geçişle silinir. Böylece küre metnin çevresinde
       "açılır" — kesip atmak yerine yerini açar. */
    var safe = null;                       // {x0,y0,x1,y1} NDC (-1..1)
    function measureSafe() {
      var box = canvas.parentNode &&
                canvas.parentNode.querySelector(".hero-in");
      if (!box) { safe = null; return; }
      var c = canvas.getBoundingClientRect();
      var r = box.getBoundingClientRect();
      if (!c.width || !c.height) { safe = null; return; }
      var padX = 26, padY = 18;            // metnin çevresindeki nefes payı
      safe = {
        x0: ((r.left - padX - c.left) / c.width) * 2 - 1,
        x1: ((r.right + padX - c.left) / c.width) * 2 - 1,
        y0: -(((r.bottom + padY - c.top) / c.height) * 2 - 1),
        y1: -(((r.top - padY - c.top) / c.height) * 2 - 1)
      };
    }

    /** NDC noktası güvenli bölgeye ne kadar gömülü: 0 = dışarıda, 1 = tam içeride.
        Kenarlarda `smooth` ile yumuşak geçiş; sert kesme çirkin duruyor. */
    function safeMask(x, y) {
      if (!safe) return 0;
      var fx = 0.16 * (safe.x1 - safe.x0);
      var fy = 0.34 * (safe.y1 - safe.y0);
      var mx = Math.min(smooth(x, safe.x0 - fx, safe.x0 + fx),
                        1 - smooth(x, safe.x1 - fx, safe.x1 + fx));
      var my = Math.min(smooth(y, safe.y0 - fy, safe.y0 + fy),
                        1 - smooth(y, safe.y1 - fy, safe.y1 + fy));
      return clamp(mx, 0, 1) * clamp(my, 0, 1);
    }

    /* ------------------------- çizim döngüsü ------------------------- */
    var wv = new T.Vector3(), camDir = new T.Vector3(), ndc = new T.Vector3();
    var last = performance.now(), raf = 0;
    /* her yayın darbesi farklı anda geçsin diye sabit faz kaymaları */
    var pulse = 0, linkPhase = (function () {
      var r = rng(99173), a = [];
      for (var i = 0; i < links.length; i++) a.push(r());
      return a;
    })();

    function frame(now) {
      if (!inst || inst.dead) return;
      raf = requestAnimationFrame(frame);
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!visible || document.hidden) return;
      if (reduced && !inst.dirty) return;      // hareket azaltıldıysa durağan

      if (!reduced) {
        root.rotation.y += dt * 0.05;
        tiltX += (tgY - tiltX) * 0.05;
        tiltY += (tgX - tiltY) * 0.05;
        root.rotation.x = tiltX * 0.85;
        cam.position.x = tiltY * 1.1;
        cam.position.y = -tiltX * 0.7;
        cam.position.z = camZ;
        cam.lookAt(0, 0, 0);
      }
      inst.dirty = false;
      camDir.copy(cam.position).normalize();
      var P = inst.pal, i;

      /* sözcükler: derinliğe göre soluklaşsın, üstüne gelinen öne çıksın */
      if (built) {
        var near = hover >= 0 ? adj[hover] : null;
        for (i = 0; i < sprites.length; i++) {
          var sp = sprites[i];
          wv.copy(sp.position).applyQuaternion(root.quaternion);
          var f = wv.dot(camDir);
          sp.userData.front = f;
          var a = smooth(f, -0.45, 0.86);
          var on = i === hover;
          var o = P.dimA + (1 - P.dimA) * Math.pow(a, 1.6);
          if (hover >= 0) o *= on ? 1 : (near[i] ? 1.1 : 0.45);
          // metnin durduğu alana giren sözcük silinsin
          if (safe && f > -0.2) {
            ndc.copy(sp.position).applyQuaternion(root.quaternion).project(cam);
            o *= 1 - 0.97 * safeMask(ndc.x, ndc.y);
          }
          sp.material.opacity = on ? 1 : clamp(o, 0, 1);
          var k = (0.86 + 0.14 * a) * (on ? 1.32 : 1);
          sp.scale.set(size[i].h * sp.userData.ar * k, size[i].h * k, 1);
        }
        if (hover >= 0) placeTip(hover);
      }

      /* yaylar: derinlik solması + metin bölgesinden kaçınma + akan darbe.
         Darbe, yay boyunca ilerleyen dar bir parlaklık tepesi; küre yavaş
         döndüğü için hareketi asıl bu taşıyor. */
      pulse += dt * 0.16;
      for (i = 0; i < links.length; i++) {
        wv.copy(linkMid[i]).applyQuaternion(root.quaternion);
        var fa = P.lineA * smooth(wv.dot(camDir), -0.3, 0.6);
        if (hover >= 0) {
          fa *= (links[i].a === hover || links[i].b === hover) ? 2.6 : 0.22;
          fa = Math.min(1, fa);
        }
        if (safe && fa > 0.002) {
          ndc.copy(linkMid[i]).applyQuaternion(root.quaternion).project(cam);
          fa *= 1 - 0.95 * safeMask(ndc.x, ndc.y);
        }
        var ph = (pulse + linkPhase[i]) % 1;
        var off = i * VPL * 4;
        for (var k2 = 0; k2 < VPL; k2++) {
          var tpos = (Math.floor(k2 / 2) + (k2 % 2)) / SEGS;
          var dd = Math.abs(tpos - ph);
          dd = Math.min(dd, 1 - dd);                       // halka mesafesi
          var glow = 1 + 1.5 * Math.exp(-dd * dd * 140);   // dar tepe
          lcol[off + k2 * 4 + 3] = Math.min(1, fa * taper[k2] * glow);
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
                 theme: inst.theme, reduced: reduced, built: built, w: W, h: H };
      },
      destroy: function () {
        inst.dead = true;
        cancelAnimationFrame(raf);
        if (ro) ro.disconnect();
        if (io) io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        global.removeEventListener("resize", resize);
        global.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("click", onClick);
        canvas.removeEventListener("pointerdown", onDown);
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
        sprites = []; texes = []; linkMid = [];
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

  global.WordGlobe = { mount: mount, destroy: destroy, setTheme: setTheme, info: info };
})(window);
