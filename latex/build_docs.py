# -*- coding: utf-8 -*-
"""
partial.json (pdf2doc.py çıktısı) + meta.py (üstveri, sınav)
      →  assets/docs/<id>.js   ve   assets/docs/manifest.js

Ayrıca eski JADR sitesinden hazır belge modelini de alır.
"""
import os, re, json, math, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.abspath(os.path.join(HERE, "..", "assets", "docs"))
OLD = r"C:\Users\lenovo\Downloads\Aysazci-Cakar-2022-Review\site\assets"

sys.path.insert(0, HERE)
from meta import META                                     # noqa: E402

ORDER = ["jadr-2022", "net-feasibility", "doc-net-tr", "doc-b89f"]


def count_words(html):
    plain = re.sub(r"<[^>]+>", " ", html)
    return len(re.findall(r"[A-Za-z][A-Za-z'’-]*", plain))


def load_jadr():
    """Eski sitedeki hazır modeli oku (metni zaten doğrulanmıştı)."""
    src = open(os.path.join(OLD, "article.js"), encoding="utf-8").read()
    d = json.loads(src[len("window.__ARTICLE__ = "):].rstrip().rstrip(";"))
    figs = {}
    p = os.path.join(OLD, "figures.js")
    if os.path.exists(p):
        s = open(p, encoding="utf-8").read()
        figs = json.loads(s[len("window.__FIGS__ = "):].rstrip().rstrip(";"))
    return {"html": d["html"], "toc": d["toc"], "figures": figs}


def load_partial(docid):
    p = os.path.join(DOCS, docid + ".partial.json")
    return json.load(open(p, encoding="utf-8"))


def build(docid):
    m = META[docid]
    if docid == "jadr-2022":
        base = load_jadr()
    else:
        base = load_partial(docid)

    html = base["html"]
    words = count_words(html)
    doc = {
        "id": docid,
        "kind": m["kind"],
        "title": {"en": m["title_en"], "tr": m["title_tr"]},
        "authors": m["authors"],
        "source": m["source"],
        "year": m["year"],
        "level": m["level"],
        "words": words,
        "minutes": max(1, math.ceil(words / 200)),
        "blurb": {"tr": m["blurb_tr"]},
        "cover": {"emoji": m["emoji"], "hue": m["hue"]},
        "toc": base["toc"],
        "html": html,
        "quiz": m["quiz"],
    }
    if base.get("figures"):
        doc["figures"] = base["figures"]

    # eşleştirme sorularını sözleşme biçimine çevir
    for q in doc["quiz"]:
        if q.get("type") == "match" and "pairs" in q:
            q["left"] = [{"en": a, "tr": ""} for a, b in q["pairs"]]
            q["right"] = [{"en": "", "tr": b} for a, b in q["pairs"]]
            q["opts"] = []

    out = os.path.join(DOCS, docid + ".js")
    with open(out, "w", encoding="utf-8") as f:
        f.write("window.DOCS = window.DOCS || {};\n")
        f.write('window.DOCS["%s"] = ' % docid)
        json.dump(doc, f, ensure_ascii=False)
        f.write(";\n")
    kb = os.path.getsize(out) // 1024
    print(f"  {docid:18s} {words:6d} sözcük  {doc['minutes']:3d} dk  "
          f"{len(doc['toc']):3d} başlık  {len(doc['quiz'])} soru  {kb:5d} KB")
    return {"id": docid, "file": docid + ".js", "group": "Makaleler"}


def main():
    os.makedirs(DOCS, exist_ok=True)
    print("belge modelleri:")
    entries = [build(d) for d in ORDER]

    # kitaplar ayrı bir manifestte gelir (varsa birleştirilir)
    with open(os.path.join(DOCS, "manifest.js"), "w", encoding="utf-8") as f:
        f.write("// Kütüphanedeki belgeler. Sıra = görünme sırası.\n")
        f.write("window.MANIFEST = ")
        json.dump(entries, f, ensure_ascii=False, indent=1)
        f.write(";\n")
        f.write("if (window.MANIFEST_BOOKS) "
                "window.MANIFEST = window.MANIFEST.concat(window.MANIFEST_BOOKS);\n")
    print("manifest.js yazıldı:", len(entries), "belge")


if __name__ == "__main__":
    main()
