# -*- coding: utf-8 -*-
"""continuum_ch*.tex -> assets/docs/cont-<n>.js  (site belge modeli)

    python latex/tex2doc.py

Ne yapiyor
  · Bolum/altbolum basliklarindan icindekiler cikarir.
  · Denklemleri KaTeX'e birakir: matematik CEVRILMEZ, oldugu gibi
    tasinir. \\[ ... \\] blok, $ ... $ satirici olur. Numarali
    denklemler .eq/.eq-body/.eq-no yapisina girer.
  · \\label / \\ref / \\eqref capraz basvurularini gercek baglantiya
    cevirir: denkleme, sekle, teoreme tiklayinca oraya gidilir.
  · theorem/definition/proposition/... ortamlarini .box olarak dizer.
  · tikzpicture'lari onceden derlenmis SVG'ye baglar (latex/tikz_svg.py).

DIKKAT — SIRA: bu betik belge dosyalarini SIFIRDAN yazar, yani icindeki
sinav (doc.quiz) silinir. Calistirdiktan sonra mutlaka

    node latex/build_bookquiz.js

de calistirin; yoksa validate-docs "soru < 8" der ve okur bolumu bitirince
bos bir sinav bulur.

Neden matematigi cevirmiyoruz
  KaTeX zaten sitede yuklu ve LaTeX sozdizimini okuyor. Formulu HTML'e
  cevirmeye calismak hem kayipli hem gereksiz; kaynak metni oldugu gibi
  tasiyip isi KaTeX'e birakmak PDF'e en yakin sonucu veriyor. Kaynaktaki
  ozel makrolar (\\vek, \\Lin, \\Et ...) toplanip belgenin `macros`
  alanina yaziliyor; okuyucu bunlari KaTeX'e veriyor.
"""
import io
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tex2doc_core import cevir

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KAYNAK = "C:/Users/lenovo/Desktop/A/"
DOCS = os.path.join(KOK, "assets", "docs")
FIG = os.path.join(KOK, "assets", "figures")

BOLUMLER = [
    ("cont-ch1", "ch1", "Mathematical Preliminaries",
     "Matematiksel Hazirlik",
     "Vektor uzaylari, ic carpim, ikinci mertebe tensorler ve temel "
     "ozdeslikler. Steigmann ve Shirani'nin Continuum Mechanics kitabinin "
     "birinci bolumunun adim adim islenmis hali; her ara islem gosteriliyor."),
    ("cont-ch2", "ch2", "Kinematics",
     "Kinematik",
     "Hareket, deformasyon gradyani, polar ayrisim ve gerinim olculeri. "
     "Cismin yer degistirmesi matematiksel olarak nasil tanimlanir, "
     "sekillerle ve cozulmus orneklerle anlatiliyor."),
    ("cont-ch3", "ch3", "Balance Laws and Stress",
     "Denge Yasalari ve Gerilme",
     "Kutle korunumu, momentum dengesi, Cauchy gerilme tensoru ve "
     "termodinamik esitsizlik. Sureklilik mekaniginin denge yasalari "
     "turetiliyor."),
]

# Kaynaktaki ortam -> site kutusu ve Turkce etiket
KUTULAR = {
    "theorem": ("thm", "Teorem"), "lemma": ("thm", "Lemma"),
    "proposition": ("thm", "Onerme"), "corollary": ("thm", "Sonuc"),
    "definition": ("def", "Tanim"), "example": ("ex", "Ornek"),
    "remark": ("rem", "Not"), "problem": ("ex", "Problem"),
    "solution": ("sol", "Cozum"), "proof": ("proof", "Kanit"),
}


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;")
             .replace(">", "&gt;").replace('"', "&quot;"))


def makrolari_topla(on):
    """Onsozdeki \\newcommand tanimlarini KaTeX macros sozlugune cevirir."""
    mak = {}
    for m in re.finditer(
            r"\\(?:newcommand|renewcommand|providecommand)\s*\{?\\([A-Za-z]+)\}?"
            r"(?:\[(\d+)\])?(?:\[[^\]]*\])?\s*\{", on):
        ad = m.group(1)
        i = m.end() - 1
        d = 0
        while i < len(on):
            c = on[i]
            if c == "\\":
                i += 2
                continue
            if c == "{":
                d += 1
            elif c == "}":
                d -= 1
                if d == 0:
                    break
            i += 1
        mak["\\" + ad] = on[m.end():i]
    for m in re.finditer(r"\\DeclareMathOperator\*?\s*\{\\([A-Za-z]+)\}\s*\{([^}]*)\}", on):
        mak["\\" + m.group(1)] = "\\operatorname{" + m.group(2) + "}"
    # accents paketiyle tanimlanan \vek KaTeX'te yok; en yakin karsiligi
    mak["\\vek"] = "\\underset{\\sim}{#1}"
    return mak


def kimlik(s, on=""):
    t = re.sub(r"[^a-z0-9]+", "-", (on + " " + s).lower()).strip("-")
    return t[:60] or "b"


def main():
    os.makedirs(DOCS, exist_ok=True)
    man = []
    for did, kisa, en, tr, blurb in BOLUMLER:
        yol = KAYNAK + "continuum_" + kisa + ".tex"
        if not os.path.exists(yol):
            print("kaynak yok:", yol)
            continue
        ham = io.open(yol, encoding="utf-8").read()
        i = ham.find("\\begin{document}")
        on = ham[:i] if i > 0 else ""
        gov = ham[i + len("\\begin{document}"):] if i > 0 else ham
        j = gov.find("\\end{document}")
        if j > 0:
            gov = gov[:j]
        mak = makrolari_topla(on)
        doc = cevir(gov, did, kisa, en, tr, blurb, mak)
        yol_js = os.path.join(DOCS, did + ".js")
        io.open(yol_js, "w", encoding="utf-8").write(
            "window.DOCS = window.DOCS || {};\nwindow.DOCS[" +
            json.dumps(did) + "] = " + json.dumps(doc, ensure_ascii=False) + ";\n")
        kb = os.path.getsize(yol_js) / 1024
        print(did, "->", len(doc["toc"]), "baslik,", doc["words"], "sozcuk,",
              str(round(kb)) + " KB")
        man.append({"id": did, "file": did + ".js", "group": "Ders notlari"})
    io.open(os.path.join(DOCS, "manifest-notes.js"), "w", encoding="utf-8").write(
        "// URETILMIS - python latex/tex2doc.py\n"
        "window.MANIFEST_NOTES = " + json.dumps(man, ensure_ascii=False, indent=1) + ";\n")
    print("manifest-notes.js yazildi:", len(man), "belge")


if __name__ == "__main__":
    main()
