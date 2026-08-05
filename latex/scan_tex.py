# -*- coding: utf-8 -*-
"""continuum_ch*.tex dosyalarinin yapisini sayar.

    python latex/scan_tex.py

Donusturucuyu yazmadan once neyle ugrastigimizi bilmek icin: hangi
ortamlar, kac denklem, kac etiket, kac capraz basvuru, kac sekil.
"""
import io
import re
import collections

KAYNAK = "C:/Users/lenovo/Desktop/A/"
DOSYALAR = ["continuum_ch1", "continuum_ch2", "continuum_ch3"]


def say(metin, kalip):
    return len(re.findall(kalip, metin))


for ad in DOSYALAR:
    t = io.open(KAYNAK + ad + ".tex", encoding="utf-8").read()
    env = collections.Counter(re.findall(r"\\begin\{([a-zA-Z*]+)\}", t))
    print("=== " + ad + " ===")
    print("  satir:", t.count("\n"), " KB:", round(len(t) / 1024))
    print("  ortam:", " | ".join(k + " " + str(v) for k, v in env.most_common(12)))
    print("  chapter", say(t, r"\\chapter\{"),
          "section", say(t, r"\\section\{"),
          "subsection", say(t, r"\\subsection\{"),
          "subsubsection", say(t, r"\\subsubsection\{"))
    print("  blok \\[", say(t, r"\\\["),
          "satirici \\(", say(t, r"\\\("),
          "dolar $", say(t, r"(?<!\\)\$"))
    print("  label", say(t, r"\\label\{"),
          "eqref", say(t, r"\\eqref\{"),
          "ref", say(t, r"\\ref\{"),
          "tag", say(t, r"\\tag\{"))
    print("  newcommand", say(t, r"\\newcommand"),
          "DeclareRobust", say(t, r"\\DeclareRobustCommand"),
          "tikzpicture", say(t, r"\\begin\{tikzpicture\}"))
