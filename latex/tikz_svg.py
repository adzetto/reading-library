# -*- coding: utf-8 -*-
"""continuum_ch*.tex icindeki TikZ sekillerini SVG'ye derler.

    python latex/tikz_svg.py [ch1 ch2 ch3]

Cikti: assets/figures/cont-<bolum>-<n>.svg

Neden yeniden cizmek yerine DERLEMEK:
Sekiller kaynakta zaten var ve yazarin cizdigi hali. Elle yeniden
cizmek hem 32 sekil demek hem de her birinde sapma riski. LaTeX zaten
kurulu (MiKTeX); standalone sinifiyla her tikzpicture ayri derlenip
dvisvgm ile SVG'ye cevriliyor. Yazi tipleri yola cevriliyor (--no-fonts),
boylece SVG'nin tarayicida LaTeX yazi tipine ihtiyaci kalmiyor ve
sekildeki matematik kaynaktakiyle birebir ayni gorunuyor.
"""
import io
import os
import re
import shutil
import subprocess
import sys
import tempfile

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KAYNAK = "C:/Users/lenovo/Desktop/A/"
CIKTI = os.path.join(KOK, "assets", "figures")

# Kaynaktaki onsozden alinan, sekillerin ihtiyac duydugu her sey.
# Belge sinifi standalone: sayfa sekle gore kirpiliyor.
ONSOZ = r"""\documentclass[border=2pt]{standalone}
\usepackage{amsmath,amssymb,amsthm}
\usepackage{bm}
\usepackage{accents}
\DeclareRobustCommand{\vek}[1]{\underaccent{\tilde}{#1}}
\usepackage{xcolor}
\usepackage{tikz}
\usetikzlibrary{arrows.meta,calc,positioning,angles,quotes,patterns,
                decorations.pathmorphing,decorations.markings,3d,shapes.geometric,
                intersections,through,backgrounds,fit,matrix,shadows}
\tikzset{vec/.style={-{Stealth[length=2.3mm]},thick},
         thinvec/.style={-{Stealth[length=1.8mm]},semithick},
         guide/.style={gray!65,densely dashed,thin}}
"""


def makrolari_al(metin):
    """Kaynagin onsozunu OLDUGU GIBI alir; yalnizca standalone ile
    catisan satirlar ayiklanir.

    Once satir satir tanim toplanmisti; cok satirli newcommand'lar
    ortasindan kesildigi icin her derleme "File ended while scanning use
    of argdef" ile dusuyordu. Onsoz butun olarak alinmali: makrolar
    birbirine dayaniyor.
    """
    bas = metin.find("\\begin{document}")
    on = metin[:bas] if bas > 0 else metin
    cikar = (
        r"\\documentclass",              # standalone kullaniyoruz
        r"\\usepackage\{geometry\}",
        r"\\usepackage\[margin",
        r"\\usepackage\[.*?\]\{hyperref\}",
        r"\\usepackage\{hyperref\}",
        r"\\usepackage\{tikz\}",         # onsozde zaten var
        r"\\usetikzlibrary",
        r"\\DeclareRobustCommand\{\\vek\}",
        r"\\newtheorem",                 # sekilde amsthm ortami gerekmiyor
        r"\\theoremstyle",
        r"\\setlength",
        r"\\pagestyle",
        r"\\title", r"\\author", r"\\date",
    )
    # Yorumlari at ama satir yapisini koru.
    on = re.sub(r"(?<!\\)%.*", "", on)

    # KOMUT KOMUT ayikla, satir satir DEGIL. Onceki surum satir bazliydi:
    # \usepackage[...\n...]{hyperref} gibi cok satirli bir komutun ilk
    # satirini atip devamini birakiyordu; kalan parca onsozde duz metin
    # olarak gorunup "Missing \begin{document}" hatasi veriyordu.
    def blok_sonu(s, i):
        """i konumundaki komutun bittigi yeri.

        \\newcommand{\\ad}[2]{govde} gibi komutlar BIRDEN COK grup alir;
        ilk kapanista durmak tanimi ortasindan kesiyor ve LaTeX geri
        kalanini duz metin sanip "Missing \\begin{document}" veriyordu.
        Bu yuzden ardisik gruplar bittikce devam ediyoruz.
        """
        j = s.find("{", i)
        k = s.find("[", i)
        if j < 0 or (0 <= k < j):
            j = k
        if j < 0 or j > s.find("\n", i) >= 0 and s.find("\n", i) < j:
            # komutun kendi satirinda grup yok: satir sonunda biter
            n = s.find("\n", i)
            return n if n >= 0 else len(s)
        while j < len(s) and s[j] in "{[":
            derinlik = 0
            while j < len(s):
                c = s[j]
                if c == "\\" and j + 1 < len(s):
                    j += 2
                    continue
                if c in "{[":
                    derinlik += 1
                elif c in "}]":
                    derinlik -= 1
                    if derinlik == 0:
                        j += 1
                        break
                j += 1
            # sonraki grup hemen bitisikse (bosluk/yeni satir olabilir) devam et
            ileri = j
            while ileri < len(s) and s[ileri] in " \t\n":
                ileri += 1
            if ileri < len(s) and s[ileri] in "{[":
                j = ileri
            else:
                break
        return j

    # YALNIZCA tanimlari al: \newcommand, \def, \DeclareMathOperator,
    # \tikzset, \colorlet. Paketleri kaynaktan TASIMIYORUZ — ONSOZ zaten
    # gerekenleri yukluyor ve tasinan \usepackage satirlari tikz
    # kutuphanelerinden SONRA geldigi icin "Missing $ inserted" veriyordu
    # (paket yuklemesi belge govdesi baslamis gibi degerlendiriliyor).
    tanim = re.compile(
        r"\\(?:newcommand|renewcommand|providecommand|def|let"
        r"|DeclareMathOperator|DeclareRobustCommand|newtheorem"
        r"|tikzset|pgfdeclare[A-Za-z]*|colorlet|definecolor)\b")
    tut = []
    i = 0
    while i < len(on):
        m = re.compile(r"\\[A-Za-z@]+").search(on, i)
        if not m:
            break
        son = blok_sonu(on, m.start())
        parca = on[m.start():son]
        if tanim.match(parca) and not any(re.match(k, parca) for k in cikar):
            tut.append(parca)
        i = son
    return "\n".join(tut)


def komut_sil(s, ad):
    """\\ad{...} komutunu, ic ice suslu parantezleri sayarak siler."""
    out = []
    i = 0
    while True:
        m = re.compile(r"\\" + ad + r"\s*(\[[^\]]*\])?\s*\{").search(s, i)
        if not m:
            out.append(s[i:])
            return "".join(out)
        out.append(s[i:m.start()])
        d = 0
        j = m.end() - 1
        while j < len(s):
            if s[j] == "\\":
                j += 2
                continue
            if s[j] == "{":
                d += 1
            elif s[j] == "}":
                d -= 1
                if d == 0:
                    j += 1
                    break
            j += 1
        i = j


def sekilleri_bul(metin):
    """Derlenecek sekil birimlerini tex2doc ile AYNI sirada dondurur.

    Onceden burada her tikzpicture ayri bir sekil sayiliyordu; tex2doc ise
    once \\begin{figure} ortamlarini yakaliyor. 3. bolumde bir figure
    ortaminda uc panel, bir baskasinda ise hic tikzpicture yoktu (PDF
    gomulmus): iki numaralandirma 7. sekilden itibaren kayiyor ve okur
    YANLIS sekli goruyordu. Artik birim = figure ortami; ortamin icindeki
    kac panel varsa hepsi tek SVG'ye giriyor, tipki kitaptaki gibi.

    Doner: (tur, govde) — tur "tikz" ya da "pdf".
    """
    # AYNI ON ISLEME: tex2doc once on sayfayi ve icindekiler komutlarini
    # atiyor. Bu kozmetik degil — 2. bolumde on sayfa bolgesindeki bir
    # \end{figure} kalintisi, atilmadan once kendinden onceki \begin ile
    # eslesip iki gercek sekli tek eslesmeye indiriyor. Atinca 14 degil 15
    # sekil cikiyor. Iki taraf ayni metni gormezse numaralar kayar.
    metin = re.sub(r"\\begin\{titlepage\}.*?\\end\{titlepage\}", "", metin, flags=re.S)
    metin = re.sub(r"\\(?:maketitle|tableofcontents|listoffigures|listoftables)\b",
                   "", metin)

    out = []

    def figur(m):
        g = m.group(0)
        g = re.sub(r"\\begin\{figure\}\s*(\[[^\]]*\])?", "", g)
        g = g.replace("\\end{figure}", "")
        g = komut_sil(g, "caption")
        g = komut_sil(g, "label")
        g = re.sub(r"\\renewcommand\s*\{[^}]*\}\s*\{[^}]*\}", "", g)
        g = re.sub(r"\\centering\b", "", g)
        gi = re.search(r"\\includegraphics\s*(\[[^\]]*\])?\s*\{([^}]*)\}", g)
        if "\\begin{tikzpicture}" in g:
            out.append(("tikz", g.strip()))
        elif gi:
            out.append(("pdf", gi.group(2).strip()))
        else:
            out.append(("bos", ""))
        return "\n\x00FIG\x00\n"

    # AYNI ALGORITMA. tex2doc once figure ortamlarini yer tutucuyla
    # DEGISTIRIYOR, sonra kalan metinde tikzpicture ariyor. Burada ayni
    # metni maskeleyip aramak yeterli gorunuyordu ama sonuc farkli cikti
    # (16'ya 15). Tahmin yurutmek yerine adimi birebir tekrarliyoruz:
    # boylece iki numaralandirmanin ayrilmasi yapisal olarak imkansiz.
    kalan = re.sub(r"\\begin\{figure\}.*?\\end\{figure\}", figur, metin, flags=re.S)
    for m in re.finditer(r"\\begin\{tikzpicture\}.*?\\end\{tikzpicture\}",
                         kalan, re.S):
        out.append(("tikz", m.group(0)))
    return out


#  Vektore donusturulen PDF bu esigi asarsa raster'a duseriz. Sinir keyfi
#  degil: cizgi cizimi bu boyuta cikmaz, cikiyorsa icerik nokta bulutudur
#  ve orada vektorun bir faydasi yok. sphere_to_ellipsoid.pdf 3000 nokta
#  tasiyor ve SVG'si 6.9 MB; ayni sekil 150 dpi PNG olarak 267 KB.
PDF_SVG_SINIR = 400 * 1024


def pdf_svg(ad, hedef):
    """figure icindeki \\includegraphics PDF'ini SVG'ye, gerekirse PNG'ye cevirir."""
    kaynak = os.path.join(KAYNAK, ad)
    if not os.path.exists(kaynak) and not ad.lower().endswith(".pdf"):
        kaynak += ".pdf"
    if not os.path.exists(kaynak):
        return False, "dosya yok: " + ad
    try:
        subprocess.run(["pdftocairo", "-svg", kaynak, hedef],
                       capture_output=True, timeout=180)
    except (subprocess.TimeoutExpired, FileNotFoundError) as e:
        return False, "pdftocairo: " + str(e)
    if not os.path.exists(hedef):
        return False, "pdftocairo cikti vermedi"
    if os.path.getsize(hedef) <= PDF_SVG_SINIR:
        return True, ""
    # Cok buyuk: SVG'yi at, ayni sekli PNG olarak uret.
    os.remove(hedef)
    png = hedef[:-4] + ".png"
    try:
        subprocess.run(["pdftocairo", "-png", "-r", "150", "-singlefile",
                        kaynak, png[:-4]], capture_output=True, timeout=180)
    except (subprocess.TimeoutExpired, FileNotFoundError) as e:
        return False, "pdftocairo png: " + str(e)
    return os.path.exists(png), "png uretilemedi"


def derle(govde, makro, hedef):
    """Tek bir tikzpicture'i SVG'ye cevirir. Basarili ise True."""
    with tempfile.TemporaryDirectory() as td:
        tex = os.path.join(td, "f.tex")
        io.open(tex, "w", encoding="utf-8").write(
            ONSOZ + makro + "\n\\begin{document}\n" + govde + "\n\\end{document}\n")
        try:
            r = subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", "-halt-on-error",
                 "-output-format=dvi", "f.tex"],
                cwd=td, capture_output=True, timeout=120)
        except subprocess.TimeoutExpired:
            return False, "zaman asimi"
        dvi = os.path.join(td, "f.dvi")
        if not os.path.exists(dvi):
            son = r.stdout.decode("utf-8", "replace")[-400:]
            hata = re.findall(r"^! .*", son, re.M)
            return False, (hata[0] if hata else "dvi yok")
        try:
            subprocess.run(["dvisvgm", "--no-fonts", "--exact", "--zoom=1.6",
                            "-o", hedef, dvi],
                           cwd=td, capture_output=True, timeout=120)
        except subprocess.TimeoutExpired:
            return False, "dvisvgm zaman asimi"
        return os.path.exists(hedef), ""


def main():
    os.makedirs(CIKTI, exist_ok=True)
    hedefler = sys.argv[1:] or ["ch1", "ch2", "ch3"]
    toplam = basarili = 0
    for kisa in hedefler:
        yol = KAYNAK + "continuum_" + kisa + ".tex"
        if not os.path.exists(yol):
            print("kaynak yok:", yol)
            continue
        metin = io.open(yol, encoding="utf-8").read()
        makro = makrolari_al(metin)
        sekiller = sekilleri_bul(metin)
        print("=== " + kisa + " === " + str(len(sekiller)) + " sekil")
        for i, (tur, gov) in enumerate(sekiller, 1):
            ad = "cont-" + kisa + "-" + str(i) + ".svg"
            hedef = os.path.join(CIKTI, ad)
            toplam += 1
            if tur == "bos":
                print("  " + str(i) + " atlandi (cizim yok)")
                continue
            # Buyuk PDF'ler PNG'ye dusuyor; onbellek denetimi ikisine de baksin.
            png = hedef[:-4] + ".png"
            var = next((y for y in (hedef, png)
                        if os.path.exists(y) and os.path.getsize(y) > 400), None)
            if var:
                basarili += 1
                print("  " + str(i) + " zaten var")
                continue
            if tur == "pdf":
                ok, neden = pdf_svg(gov, hedef)
            else:
                ok, neden = derle(gov, makro, hedef)
            if ok:
                basarili += 1
                cikti = hedef if os.path.exists(hedef) else png
                kb = os.path.getsize(cikti) / 1024
                print("  " + str(i) + " tamam (" + str(round(kb, 1)) + " KB, " +
                      os.path.splitext(cikti)[1][1:] + ")")
            else:
                print("  " + str(i) + " BASARISIZ: " + neden)
    print("-" * 46)
    print("derlenen:", basarili, "/", toplam)


if __name__ == "__main__":
    main()
