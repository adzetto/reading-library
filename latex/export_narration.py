# -*- coding: utf-8 -*-
"""
Belge modellerinden seslendirme betiği çıkarır.

Çıktı:  narration/<docid>.json   — Colab'ın okuyacağı paragraf listesi
        narration/INDEX.json     — tüm belgelerin özeti

Her parça, sitedeki bir DOM ögesine birebir karşılık gelir; böylece ses
çalarken doğru paragraf vurgulanabilir.

Kullanım:
    python export_narration.py            tümü
    python export_narration.py jadr-2022  tek belge
"""
import os, re, json, sys, hashlib

HERE = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.abspath(os.path.join(HERE, "..", "assets", "docs"))
OUT = os.path.abspath(os.path.join(HERE, "..", "narration"))

# TTS'in doğal okuyabileceği azami uzunluk. Uzun paragraflar cümle
# sınırından bölünür; ses dosyaları arka arkaya çalınır.
MAX_CHARS = 480


def load_doc(path):
    src = open(path, encoding="utf-8").read()
    m = re.search(r'window\.DOCS\["([^"]+)"\]\s*=\s*(\{.*\});\s*$', src, re.S)
    if not m:
        return None, None
    return m.group(1), json.loads(m.group(2))


def strip_tags(h):
    h = re.sub(r"<span class=\"sc\">(.*?)</span>", lambda m: m.group(1).upper(), h)
    h = re.sub(r"<sup>.*?</sup>", "", h, flags=re.S)
    h = re.sub(r"<[^>]+>", "", h)
    for a, b in [("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"), ("&nbsp;", " "),
                 ("&thinsp;", " "), ("&emsp;", " "), ("&#8239;", " "),
                 ("&quot;", '"')]:
        h = h.replace(a, b)
    return re.sub(r"\s+", " ", h).strip()


def speakable(text):
    """Okunurluğu artıran küçük düzeltmeler — metni DEĞİŞTİRMEZ, yalnızca
    seslendirme kopyasında uygulanır."""
    t = text
    t = re.sub(r"\bet al\.", "et al", t)
    t = re.sub(r"\be\.g\.", "for example,", t)
    t = re.sub(r"\bi\.e\.", "that is,", t)
    t = re.sub(r"\bcf\.", "compare", t)
    t = re.sub(r"\bvs\b\.?", "versus", t)
    t = re.sub(r"\bp\s*<\s*\.?0*(\d+)", r"p less than point \1", t)
    t = re.sub(r"\bp\s*=\s*\.?0*(\d+)", r"p equals point \1", t)
    t = t.replace("%", " percent")
    t = re.sub(r"\s{2,}", " ", t)
    return t.strip()


def split_long(text, limit=MAX_CHARS):
    """Cümle sınırından böl; tek cümle bile uzunsa noktalamadan böl."""
    if len(text) <= limit:
        return [text]
    parts, buf = [], ""
    for s in re.split(r"(?<=[.!?])\s+", text):
        if not s:
            continue
        if len(buf) + len(s) + 1 <= limit:
            buf = (buf + " " + s).strip()
        else:
            if buf:
                parts.append(buf)
            if len(s) <= limit:
                buf = s
            else:                                  # tek cümle çok uzun
                cur = ""
                for piece in re.split(r"(?<=[,;:])\s+", s):
                    if len(cur) + len(piece) + 1 <= limit:
                        cur = (cur + " " + piece).strip()
                    else:
                        if cur:
                            parts.append(cur)
                        cur = piece
                buf = cur
    if buf:
        parts.append(buf)
    return parts


def build(docid, doc):
    """html'den, sitedeki düğüm sırasıyla birebir aynı sırada parça üretir."""
    # app.js şu seçiciyi kullanıyor: #article h1, h2, h3, p  (doc-head hariç)
    nodes = re.findall(r"<(h1|h2|h3|p)\b[^>]*>(.*?)</\1>", doc["html"], re.S)
    items, idx = [], 0
    for tag, inner in nodes:
        text = strip_tags(inner)
        if len(text) < 2:
            idx += 1
            continue
        chunks = split_long(speakable(text))
        for ci, c in enumerate(chunks):
            items.append({
                "id": "%s-%04d-%d" % (docid, idx, ci),
                "node": idx,          # sitedeki kaçıncı okunabilir düğüm
                "part": ci,
                "parts": len(chunks),
                "tag": tag,
                "text": c,
                "chars": len(c),
            })
        idx += 1
    return items


def main():
    os.makedirs(OUT, exist_ok=True)
    only = sys.argv[1] if len(sys.argv) > 1 else None
    index = []
    for fn in sorted(os.listdir(DOCS)):
        if not fn.endswith(".js") or fn.startswith("manifest"):
            continue
        docid, doc = load_doc(os.path.join(DOCS, fn))
        if not doc:
            continue
        if only and docid != only:
            continue
        items = build(docid, doc)
        chars = sum(i["chars"] for i in items)
        payload = {
            "id": docid,
            "title": doc["title"]["en"],
            "title_tr": doc["title"]["tr"],
            "voice_hint": "narration, calm, clear, academic" if doc.get("kind") == "article"
                          else "storytelling, warm, expressive",
            "items": items,
        }
        p = os.path.join(OUT, docid + ".json")
        json.dump(payload, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        index.append({"id": docid, "title": doc["title"]["en"],
                      "kind": doc.get("kind"), "items": len(items),
                      "chars": chars, "minutes_est": round(chars / 950)})
        print(f"  {docid:18s} {len(items):5d} parça  {chars:7d} karakter  "
              f"~{round(chars/950):3d} dk ses")
    json.dump(index, open(os.path.join(OUT, "INDEX.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    tot = sum(x["items"] for x in index)
    tc = sum(x["chars"] for x in index)
    print(f"\ntoplam: {len(index)} belge, {tot} parça, {tc} karakter, "
          f"~{round(tc/950)} dakika ses")
    print("yazıldı →", OUT)


if __name__ == "__main__":
    main()
