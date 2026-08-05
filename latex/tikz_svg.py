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


def sekilleri_bul(metin):
    """tikzpicture bloklarini, varsa figure ustbilgisiyle birlikte dondurur."""
    out = []
    for m in re.finditer(r"\\begin\{tikzpicture\}.*?\\end\{tikzpicture\}",
                         metin, re.S):
        out.append((m.start(), m.group(0)))
    return out


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
        for i, (_, gov) in enumerate(sekiller, 1):
            ad = "cont-" + kisa + "-" + str(i) + ".svg"
            hedef = os.path.join(CIKTI, ad)
            toplam += 1
            if os.path.exists(hedef) and os.path.getsize(hedef) > 400:
                basarili += 1
                print("  " + str(i) + " zaten var")
                continue
            ok, neden = derle(gov, makro, hedef)
            if ok:
                basarili += 1
                kb = os.path.getsize(hedef) / 1024
                print("  " + str(i) + " tamam (" + str(round(kb, 1)) + " KB)")
            else:
                print("  " + str(i) + " BASARISIZ: " + neden)
    print("-" * 46)
    print("derlenen:", basarili, "/", toplam)


if __name__ == "__main__":
    main()
