# -*- coding: utf-8 -*-
"""tex2doc.py'nin cevirici cekirdegi.

Ayri dosyada, cunku burasi kalibi tutan yer: LaTeX govdesini site belge
modelinin HTML'ine ceviren kurallar. tex2doc.py yalnizca dosya girdi
cikti ve ustveri isini yapiyor.
"""
import io
import os
import re

FIGDIR = "figures/"

KUTULAR = {
    "theorem": ("thm", "Teorem"), "lemma": ("thm", "Lemma"),
    "proposition": ("thm", "Önerme"), "corollary": ("thm", "Sonuç"),
    "definition": ("def", "Tanım"), "example": ("ex", "Örnek"),
    "remark": ("rem", "Not"), "problem": ("ex", "Problem"),
    "solution": ("sol", "Çözüm"), "proof": ("proof", "Kanıt"),
}


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;")
             .replace(">", "&gt;").replace('"', "&quot;"))


def slug(s, ek=""):
    t = re.sub(r"[^a-z0-9]+", "-", (s + " " + ek).lower()).strip("-")
    return t[:56] or "b"


def grup_al(s, i):
    """s[i] '{' ise eslesen kapanisa kadar olan icerigi ve son konumu doner."""
    if i >= len(s) or s[i] != "{":
        return "", i
    d = 0
    j = i
    while j < len(s):
        c = s[j]
        if c == "\\":
            j += 2
            continue
        if c == "{":
            d += 1
        elif c == "}":
            d -= 1
            if d == 0:
                return s[i + 1:j], j + 1
        j += 1
    return s[i + 1:], len(s)


def metin_temizle(t):
    """Matematik DISINDAKI metni HTML'e cevirir.

    Matematik parcalari cagiran tarafindan zaten ayrilmis oluyor; burada
    yalnizca duz metnin bicimlendirmesi var.
    """
    t = re.sub(r"(?<!\\)%.*", "", t)
    # \ref ve \eqref KORUNUR. Asagidaki genel "\komut sil" kurali onlari
    # da siliyordu: 253 capraz basvurunun hepsi metinden yok oluyor,
    # ref_cevir calistiginda ortada cevrilecek bir sey kalmiyordu.
    t = re.sub(r"\\(ref|eqref)\s*\{([^}]*)\}", "\x01\\1\x02\\2\x03", t)
    t = t.replace("\\%", "%").replace("\\&", "&amp;").replace("\\_", "_")
    t = t.replace("\\,", " ").replace("\\;", " ").replace("\\!", "")
    t = t.replace("~", " ").replace("\\@", "")
    t = re.sub(r"\\(?:textit|emph|textsl)\s*\{([^{}]*)\}", r"<em>\1</em>", t)
    t = re.sub(r"\\(?:textbf|bf)\s*\{([^{}]*)\}", r"<strong>\1</strong>", t)
    t = re.sub(r"\\(?:textsc|sc)\s*\{([^{}]*)\}", r'<span class="sc">\1</span>', t)
    t = re.sub(r"\\texttt\s*\{([^{}]*)\}", r"<code>\1</code>", t)
    t = re.sub(r"\\(?:label|index|vspace|hspace|noindent|centering|par|medskip"
               r"|smallskip|bigskip|clearpage|newpage|hfill|quad|qquad)\s*"
               r"(\*)?(\{[^{}]*\}|\[[^\]]*\])*", "", t)
    t = t.replace("``", "\u201c").replace("''", "\u201d")
    t = t.replace("---", "\u2014").replace("--", "\u2013")
    t = re.sub(r"\\\\(\[[^\]]*\])?", " ", t)
    t = re.sub(r"\{\\[a-zA-Z]+\s*([^{}]*)\}", r"\1", t)
    t = re.sub(r"\\[a-zA-Z]+\s*", "", t)
    t = t.replace("{", "").replace("}", "")
    return re.sub(r"[ \t]+", " ", t).strip()


class Cevirici(object):
    def __init__(self, kisa, mak):
        self.kisa = kisa            # ch1 / ch2 / ch3
        self.mak = mak
        self.toc = []
        self.eqno = 0
        self.figno = 0
        self.kutuno = {}
        self.etiket = {}            # \label adi -> (hedef_id, gorunen_ad)
        self.parcalar = []

    # ---------------------------------------------------------------- math
    def math_ayir(self, t):
        """Metindeki $...$ ve \\(...\\) parcalarini .math span'ine sarar."""
        out = []
        i = 0
        while i < len(t):
            if t[i] == "$":
                j = t.find("$", i + 1)
                if j < 0:
                    break
                out.append(('math', t[i + 1:j]))
                i = j + 1
                continue
            if t.startswith("\\(", i):
                j = t.find("\\)", i)
                if j < 0:
                    break
                out.append(('math', t[i + 2:j]))
                i = j + 2
                continue
            j = len(t)
            for k in ("$", "\\("):
                p = t.find(k, i)
                if p >= 0:
                    j = min(j, p)
            out.append(('text', t[i:j]))
            i = j
        h = ""
        for tur, s in out:
            if tur == "math":
                h += '<span class="math">' + esc(s.strip()) + "</span>"
            else:
                # metin_temizle bastaki/sondaki bosluklari kirpiyor; kirpmadan
                # once var miydi diye bakip geri koyuyoruz. Yoksa "a body $B$
                # is" -> "bodyBis" gibi bitisik ciktilar oluyordu.
                on = " " if s[:1].isspace() else ""
                arka = " " if s[-1:].isspace() else ""
                gov = metin_temizle(s)
                h += (on if gov else "") + gov + (arka if gov else (on or arka))
        return re.sub(r"[ \t]{2,}", " ", h)

    # ------------------------------------------------------------ referans
    def ref_cevir(self, h):
        """\\ref ve \\eqref'i gercek baglantiya cevirir."""
        def dg(m):
            ad = m.group(2)
            hedef, gor = self.etiket.get(ad, (None, ""))
            paren = m.group(1) == "eqref"
            if not hedef:
                # Hedefi olmayan basvuru: link yerine sade metin. "?" yazmak
                # okura yanlis bir sey oldugunu dusundururdu.
                return ("(" + gor + ")") if (paren and gor) else gor
            metin = ("(" + gor + ")") if paren else gor
            return ('<a class="xref" href="#' + hedef + '">' + metin + "</a>")
        return re.sub("\x01(ref|eqref)\x02([^\x03]*)\x03", dg, h)


def cevir(gov, did, kisa, en, tr, blurb, mak):
    """LaTeX govdesini site belge modeline cevirir."""
    C = Cevirici(kisa, mak)

    # ON SAYFA VE ICINDEKILER ATILIR. titlepage'in icindeki \vfill,
    # \vspace{1cm}, \par gibi komutlar duz metne dokulup KaTeX'e
    # yem oluyordu: sayfanin basinda kirmizi bir LaTeX kaynak yigini
    # goruluyordu. Icindekiler zaten sol panelde uretiliyor.
    gov = re.sub(r"\\begin\{titlepage\}.*?\\end\{titlepage\}", "", gov, flags=re.S)
    gov = re.sub(r"\\(?:maketitle|tableofcontents|listoffigures|listoftables)\b",
                 "", gov)

    # 1) SEKILLER: tikzpicture -> onceden derlenmis SVG
    sekiller = []

    def fig_yakala(m):
        C.figno += 1
        n = C.figno
        ad = "cont-" + kisa + "-" + str(n) + ".svg"
        blok = m.group(0)
        cap = ""
        cm = re.search(r"\\caption\s*\{", blok)
        if cm:
            cap, _ = grup_al(blok, cm.end() - 1)
        lm = re.search(r"\\label\s*\{([^}]*)\}", blok)
        fid = "fig-" + kisa + "-" + str(n)
        if lm:
            C.etiket[lm.group(1)] = (fid, "Şekil " + str(n))
        sekiller.append((fid, ad, cap, n))
        return "\n\x00FIG" + str(len(sekiller) - 1) + "\x00\n"

    gov = re.sub(r"\\begin\{figure\}.*?\\end\{figure\}", fig_yakala, gov, flags=re.S)
    gov = re.sub(r"\\begin\{tikzpicture\}.*?\\end\{tikzpicture\}", fig_yakala, gov, flags=re.S)

    # 2) DENKLEMLER: numara ver, etiketi kaydet
    denk = []

    def eq_yakala(m):
        ic = m.group(2)
        yildiz = m.group(1) and m.group(1).endswith("*")
        tm = re.search(r"\\tag\s*\{([^}]*)\}", ic)
        lm = re.search(r"\\label\s*\{([^}]*)\}", ic)
        if tm:
            no = tm.group(1)
        elif yildiz:
            no = ""
        else:
            C.eqno += 1
            no = str(C.eqno)
        eid = "eq-" + kisa + "-" + re.sub(r"[^0-9a-zA-Z.]", "", no or str(len(denk) + 1))
        if lm:
            C.etiket[lm.group(1)] = (eid, no or "?")
        ic = re.sub(r"\\(?:tag|label)\s*\{[^}]*\}", "", ic)
        denk.append((eid, no, ic.strip()))
        return "\n\x00EQ" + str(len(denk) - 1) + "\x00\n"

    gov = re.sub(r"\\begin\{(equation\*?|align\*?|gather\*?)\}(.*?)\\end\{\1\}",
                 eq_yakala, gov, flags=re.S)

    def blok_yakala(m):
        return eq_yakala(re.match(r"()(.*)", m.group(1), re.S))

    gov = re.sub(r"\\\[(.*?)\\\]", blok_yakala, gov, flags=re.S)

    # 3) KUTULAR (teorem, tanim, kanit...)
    kutular = []

    def kutu_yakala(m):
        ad = m.group(1)
        ic = m.group(2)
        sinif, etiket = KUTULAR.get(ad, ("rem", ad.capitalize()))
        baslik = ""
        ic2 = ic.lstrip()
        if ic2.startswith("["):
            d = 0
            for k, c in enumerate(ic2):
                if c == "[":
                    d += 1
                elif c == "]":
                    d -= 1
                    if d == 0:
                        baslik = ic2[1:k]
                        ic = ic2[k + 1:]
                        break
        C.kutuno[ad] = C.kutuno.get(ad, 0) + 1
        n = C.kutuno[ad]
        bid = sinif + "-" + kisa + "-" + str(n)
        lm = re.search(r"\\label\s*\{([^}]*)\}", ic)
        if lm:
            C.etiket[lm.group(1)] = (bid, etiket + " " + str(n))
        kutular.append((bid, sinif, etiket, n, baslik, ic))
        return "\n\x00BOX" + str(len(kutular) - 1) + "\x00\n"

    ortam = "|".join(KUTULAR.keys())
    for _ in range(6):     # ic ice kutular icin birkac tur
        yeni = re.sub(r"\\begin\{(" + ortam + r")\}(.*?)\\end\{\1\}",
                      kutu_yakala, gov, flags=re.S)
        if yeni == gov:
            break
        gov = yeni

    # 4) BASLIKLAR ve paragraflar
    parts = re.split(r"(\\(?:chapter|section|subsection|subsubsection)\*?\s*\{)", gov)
    html = []
    C.toc = []

    def govde_yaz(t):
        for ham in re.split(r"\n\s*\n", t):
            p = ham.strip()
            if not p:
                continue
            m = re.match(r"^\x00(FIG|EQ|BOX)(\d+)\x00$", p)
            if m:
                html.append(("YER", m.group(1), int(m.group(2))))
                continue
            # yer tutucu ile karisik paragraf: once yer tutuculari ayir
            parcalar = re.split(r"(\x00(?:FIG|EQ|BOX)\d+\x00)", p)
            for pr in parcalar:
                mm = re.match(r"^\x00(FIG|EQ|BOX)(\d+)\x00$", pr.strip())
                if mm:
                    html.append(("YER", mm.group(1), int(mm.group(2))))
                elif pr.strip():
                    html.append(("P", C.math_ayir(pr), 0))

    i = 0
    while i < len(parts):
        if parts[i].startswith("\\"):
            tur = re.match(r"\\([a-z]+)", parts[i]).group(1)
            baslik_ham, kalan = grup_al("{" + parts[i + 1], 0)
            baslik = metin_temizle(C.math_ayir(baslik_ham))
            baslik = re.sub(r"<[^>]+>", "", baslik).strip()
            duzey = {"chapter": 0, "section": 0, "subsection": 1,
                     "subsubsection": 2}.get(tur, 1)
            hid = slug(baslik, kisa)
            # ayni id iki kez cikmasin
            k = 2
            while any(x["id"] == hid for x in C.toc):
                hid = slug(baslik, kisa) + "-" + str(k)
                k += 1
            C.toc.append({"level": duzey, "n": "", "t": baslik, "id": hid})
            html.append(("H", (duzey, hid, baslik), 0))
            govde_yaz(parts[i + 1][kalan - 1:])
            i += 2
        else:
            govde_yaz(parts[i])
            i += 1

    # 5) HTML kur
    out = []
    for tur, a, b in html:
        if tur == "H":
            d, hid, bas = a
            etiket = "h1" if d == 0 else ("h2" if d == 1 else "h3")
            out.append("<" + etiket + ' class="chapter" id="' + hid + '">' +
                       esc(bas) + "</" + etiket + ">")
        elif tur == "P":
            if a.strip():
                out.append("<p>" + a + "</p>")
        elif tur == "YER":
            if a == "EQ":
                eid, no, ic = denk[b]
                out.append('<div class="eq" id="' + eid + '">'
                           '<div class="eq-body">' + esc(ic) + "</div>" +
                           ('<span class="eq-no">(' + esc(no) + ")</span>"
                            if no else "") + "</div>")
            elif a == "FIG":
                fid, ad, cap, n = sekiller[b]
                out.append('<figure class="fig" id="' + fid + '" data-fig="' + str(n) + '">'
                           '<div class="fig-frame" data-svg="' + FIGDIR + ad + '"></div>'
                           "<figcaption><span class=\"fig-no\">Şekil " + str(n) + ".</span> " +
                           C.math_ayir(cap) + "</figcaption></figure>")
            else:
                bid, sinif, etiket, n, bas, ic = kutular[b]
                govde = []
                for pr in re.split(r"\n\s*\n", ic):
                    pr = pr.strip()
                    if not pr:
                        continue
                    mm = re.match(r"^\x00(FIG|EQ|BOX)(\d+)\x00$", pr)
                    if mm and mm.group(1) == "EQ":
                        eid, no, eic = denk[int(mm.group(2))]
                        govde.append('<div class="eq" id="' + eid + '">'
                                     '<div class="eq-body">' + esc(eic) + "</div>" +
                                     ('<span class="eq-no">(' + esc(no) + ")</span>"
                                      if no else "") + "</div>")
                    else:
                        s = C.math_ayir(pr)
                        if s.strip():
                            govde.append("<p>" + s + "</p>")
                out.append('<div class="box box-' + sinif + '" id="' + bid + '">'
                           '<p class="box-h">' + esc(etiket) + " " + str(n) +
                           (" · " + esc(metin_temizle(bas)) if bas else "") + "</p>" +
                           "".join(govde) + "</div>")

    gövde = C.ref_cevir("\n".join(out))
    duz = re.sub(r"<[^>]+>", " ", gövde)
    kelime = len(re.findall(r"[A-Za-z][A-Za-z'\u2019-]*", duz))

    # SEKILLER BELGEYE GOMULUR. app.js renderFigures() SVG'yi dosyadan
    # cekmiyor, doc.figures haritasindan aliyor (anahtar = uzantisiz dosya
    # adi). Yalnizca data-svg yolunu yazmak yetmiyordu: cerceve bos
    # kaliyordu.
    figs = {}
    figdizin = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            "..", "assets", "figures")
    for fid, ad, cap, n in sekiller:
        yol = os.path.join(figdizin, ad)
        if not os.path.exists(yol):
            continue
        svg = io.open(yol, encoding="utf-8").read()
        svg = re.sub(r"<\?xml[^>]*\?>", "", svg)
        svg = re.sub(r"<!DOCTYPE[^>]*>", "", svg, flags=re.S)
        # Olcu kaptan gelsin: sabit width/height kaldiriliyor, viewBox kaliyor.
        svg = re.sub(r'(<svg[^>]*?)\s+width="[^"]*"', r"\1", svg, count=1)
        svg = re.sub(r'(<svg[^>]*?)\s+height="[^"]*"', r"\1", svg, count=1)
        svg = svg.replace("<svg ", '<svg class="tikz" preserveAspectRatio="xMidYMid meet" ', 1)
        figs[ad.replace(".svg", "")] = svg.strip()

    return {
        "id": did, "kind": "notes",
        "title": {"en": en, "tr": tr},
        "authors": ["Steigmann & Shirani (kaynak kitap)"],
        "source": "Ders notu · continuum_" + kisa + ".tex",
        "year": 2026, "level": "C2",
        "words": kelime,
        "minutes": max(1, round(kelime / 120)),   # formullu metin yavas okunur
        "blurb": {"tr": blurb},
        "cover": {"emoji": "\u2207", "hue": 210},
        "toc": C.toc,
        "figures": figs,
        "macros": mak,
        "html": gövde,
    }
