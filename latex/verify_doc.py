# -*- coding: utf-8 -*-
"""
Üretilen belge modelinin metnini, PDF'ten bağımsız yolla (pdftotext) çıkarılan
metinle sözcük sözcük karşılaştırır. Amaç: metnin kaynağın birebir aynısı
olduğunu kanıtlamak.

Kullanım:
    python verify_doc.py <docid> [--from "Abstract"] [--to "References"]
"""
import sys, os, re, json, difflib, argparse, subprocess, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.abspath(os.path.join(HERE, "..", "source"))
EXT = os.path.abspath(os.path.join(HERE, "..", "extract"))
DOCS = os.path.abspath(os.path.join(HERE, "..", "assets", "docs"))


def fold(s):
    """Karşılaştırma için sadeleştir: aksan, tırnak ve boşluk farklarını sil."""
    s = s.replace("ﬁ", "fi").replace("ﬂ", "fl").replace("ﬀ", "ff")
    s = re.sub(r"­\s*\n\s*", "", s)             # yumuşak tire + satır sonu
    s = re.sub(r"([A-Za-zçğıöşü])-\s*\n\s*([a-zçğıöşü])", r"\1\2", s)
    s = s.replace("\n", " ")
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    for a, b in [("“", '"'), ("”", '"'), ("‘", "'"), ("’", "'"),
                 ("—", "-"), ("–", "-"), (" ", " "), (" ", " ")]:
        s = s.replace(a, b)
    return s.lower()


def words(s):
    return re.findall(r"[a-z0-9]+", fold(s))


def load_doc(docid):
    p = os.path.join(DOCS, docid + ".partial.json")
    if os.path.exists(p):
        return json.load(open(p, encoding="utf-8"))
    p = os.path.join(DOCS, docid + ".js")
    src = open(p, encoding="utf-8").read()
    m = re.search(r'window\.DOCS\["[^"]+"\]\s*=\s*(\{.*\});\s*$', src, re.S)
    return json.loads(m.group(1))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("docid")
    ap.add_argument("--from", dest="frm", default=None)
    ap.add_argument("--to", dest="to", default=None)
    ap.add_argument("--show", type=int, default=25)
    a = ap.parse_args()

    # 1) bağımsız referans metin: pdftotext
    pdf = os.path.join(SRC, a.docid + ".pdf")
    txt = os.path.join(EXT, a.docid + ".txt")
    if not os.path.exists(txt):
        subprocess.run(["pdftotext", "-raw", "-enc", "UTF-8", pdf, txt], check=True)
    raw = open(txt, encoding="utf-8").read()

    # pdftotext sayfa üstbilgi/altbilgilerini metne karıştırır; dönüştürücü
    # onları eler. Adil kıyas için burada da elenmeli: çok yinelenen satırlar
    # ve yalın sayfa numaraları.
    lines = raw.split("\n")
    import collections
    cnt = collections.Counter(re.sub(r"\d+", "#", x).strip().lower() for x in lines)
    rep = {k for k, c in cnt.items() if c >= 4 and len(k) > 8}
    kept = []
    for x in lines:
        k = re.sub(r"\d+", "#", x).strip().lower()
        if k in rep or re.fullmatch(r"\s*\d{1,3}\s*", x):
            continue
        kept.append(x)
    raw = "\n".join(kept)

    if a.frm:
        i = raw.lower().find(a.frm.lower())
        if i > 0:
            raw = raw[i:]
    if a.to:
        j = raw.lower().rfind(a.to.lower())
        if j > 0:
            raw = raw[:j]

    # 2) üretilen model
    doc = load_doc(a.docid)
    html = doc["html"]
    if a.to:
        html = re.sub(r'<ol class="refs">.*?</ol>', " ", html, flags=re.S)
    plain = re.sub(r"<[^>]+>", " ", html)
    plain = (plain.replace("&amp;", "&").replace("&lt;", "<")
                  .replace("&gt;", ">").replace("&nbsp;", " "))

    ow, sw = words(raw), words(plain)
    sm = difflib.SequenceMatcher(None, ow, sw, autojunk=False)
    ratio = sm.ratio()

    print(f"belge         : {a.docid}")
    print(f"pdftotext     : {len(ow):6d} sözcük")
    print(f"belge modeli  : {len(sw):6d} sözcük")
    print(f"benzerlik     : {ratio*100:.2f}%")

    n = 0
    print("\n--- farklar ---")
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        o, s = " ".join(ow[i1:i2]), " ".join(sw[j1:j2])
        if not (o + s).strip():
            continue
        n += 1
        if n <= a.show:
            ctx = " ".join(ow[max(0, i1 - 6):i1])
            print(f"[{tag}] …{ctx}…")
            print(f"   PDF : {o[:130] or '(yok)'}")
            print(f"   DOC : {s[:130] or '(yok)'}")
    print(f"\ntoplam fark bloğu: {n}")
    ok = ratio >= 0.99
    print("SONUÇ: " + ("GEÇTİ" if ok else "KALDI — %99 altında"))
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
