# -*- coding: utf-8 -*-
"""Colab defterlerinin biçimini ve kod hücrelerinin sözdizimini denetler."""
import json, os, ast, sys

HERE = os.path.dirname(os.path.abspath(__file__))
fails = 0

for name in ["higgs_audio_v2", "step_audio_editx"]:
    p = os.path.join(HERE, name + ".ipynb")
    d = json.load(open(p, encoding="utf-8"))
    kinds = [c["cell_type"] for c in d["cells"]]
    print(f"{name}.ipynb  {len(d['cells'])} hücre "
          f"({kinds.count('code')} kod, {kinds.count('markdown')} metin)  "
          f"{os.path.getsize(p)//1024} KB")

    assert d["nbformat"] == 4, "nbformat 4 olmalı"
    assert d["metadata"].get("accelerator") == "GPU", "GPU seçili olmalı"

    for i, c in enumerate(d["cells"]):
        assert isinstance(c["source"], list), f"hücre {i}: source liste olmalı"
        if c["cell_type"] != "code":
            continue
        src = "".join(c["source"])
        # Colab sihirli komutları (!, %) Python'da geçersiz; girintiyi
        # koruyarak `pass` ile değiştir, yoksa blok boş kalır
        def demagic(l):
            s = l.lstrip()
            if s.startswith(("!", "%")):
                return " " * (len(l) - len(s)) + "pass"
            return l
        clean = "\n".join(demagic(l) for l in src.split("\n"))
        # #@param yorumları zaten yorum, sorun değil
        try:
            ast.parse(clean)
        except SyntaxError as e:
            print(f"   ✗ hücre {i} sözdizimi: satır {e.lineno}: {e.msg}")
            print("     " + (src.split(chr(10))[max(0, (e.lineno or 1) - 1)][:80]))
            fails += 1

print("\n" + ("SORUN VAR" if fails else "defterler geçerli"))
sys.exit(1 if fails else 0)
