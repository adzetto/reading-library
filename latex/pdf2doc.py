# -*- coding: utf-8 -*-
"""
PDF → belge modeli dönüştürücü.

pdftotext'in düz çıktısı paragraf sınırlarını kaybettiği için PyMuPDF ile
satırları konum ve font bilgisiyle okuyup yeniden kurar:

  * yinelenen üstbilgi/altbilgi (her sayfada aynı y'de aynı metin) atılır,
  * başlıklar font boyutu / kalınlık / numaralama örüntüsünden bulunur,
  * satır sonu tirelemeleri birleştirilir,
  * paragraflar, satırın sağ kenara ulaşıp ulaşmadığına bakılarak birleşir.

Metne DOKUNULMAZ: yazım, noktalama ve hatalar kaynaktaki gibi kalır.

Kullanım:
    python pdf2doc.py <pdf> <çıktı-id> [--start N] [--end N]
"""
import sys, os, re, json, argparse, collections, unicodedata

import fitz  # PyMuPDF

HERE = os.path.dirname(os.path.abspath(__file__))
OUTDIR = os.path.abspath(os.path.join(HERE, "..", "assets", "docs"))


# --------------------------------------------------------------- yardımcılar
def clean(s):
    """Görünmez karakterleri ve ligatürleri düzelt; metni değiştirme."""
    s = s.replace("ﬁ", "fi").replace("ﬂ", "fl")
    s = s.replace("ﬀ", "ff").replace("ﬃ", "ffi").replace("ﬄ", "ffl")
    s = s.replace("­", "")          # yumuşak tire
    s = s.replace("​", "").replace("﻿", "")
    s = s.replace("’", "’")
    return s


def norm_key(s):
    """Üstbilgi eşleştirmesi için sayıları ve boşlukları eleyen anahtar."""
    s = re.sub(r"\d+", "#", s)
    return re.sub(r"\s+", " ", s).strip().lower()


# ------------------------------------------------------------ satır çıkarımı
def extract_lines(doc, first, last):
    """Her satır için metin, font boyutu, kalınlık, x0/x1 ve sayfa döndürür."""
    out = []
    for pno in range(first, last):
        page = doc[pno]
        W = page.rect.width
        H = page.rect.height
        d = page.get_text("dict")
        for blk in d.get("blocks", []):
            if blk.get("type") != 0:
                continue
            for ln in blk.get("lines", []):
                allspans = ln.get("spans", [])
                # Metni TÜM span'lerden kur: sözcük arası boşluk kimi PDF'te
                # kendi span'i olur; onu elemek "has identified" → "hasidentified"
                # gibi birleşmelere yol açar. Ölçüm için ise yalnızca dolu
                # span'ler kullanılır.
                spans = [s for s in allspans if s.get("text", "").strip()]
                if not spans:
                    continue
                txt = clean("".join(s.get("text", "") for s in allspans)).strip()
                if not txt:
                    continue
                sizes = [round(s["size"], 1) for s in spans]
                size = max(set(sizes), key=sizes.count)
                bold = sum(1 for s in spans if (s.get("flags", 0) & 16)) >= len(spans) / 2
                x0 = min(s["bbox"][0] for s in spans)
                x1 = max(s["bbox"][2] for s in spans)
                y0 = min(s["bbox"][1] for s in spans)
                out.append({
                    "t": txt, "size": size, "bold": bold,
                    "x0": round(x0, 1), "x1": round(x1, 1),
                    "y": round(y0, 1), "page": pno,
                    "top": y0 / H, "W": W,
                })
    return out


EDGE_TOP, EDGE_BOT = 0.11, 0.89


def drop_running(lines):
    """Sayfa üstünde/altında yinelenen künye satırlarını at.

    Künye çoğu dergide tek sayfada üstte, çift sayfada altta durur; bu yüzden
    eşik sayfa sayısının yarısı değil, üçte biri alınır. Kenar bölgesi de
    biraz geniş tutulur, yoksa iki satırlık künyenin alt satırı kaçar.
    """
    pages = len({l["page"] for l in lines}) or 1
    edge = [l for l in lines if l["top"] < EDGE_TOP or l["top"] > EDGE_BOT]
    freq = collections.Counter(norm_key(l["t"]) for l in edge)
    bad = {k for k, c in freq.items() if c >= max(3, pages * 0.30)}
    kept = []
    for l in lines:
        k = norm_key(l["t"])
        if l["top"] < EDGE_TOP or l["top"] > EDGE_BOT:
            if k in bad or re.fullmatch(r"#|page #|# of #|#\s*#", k) or len(l["t"]) < 4:
                continue
        kept.append(l)
    return kept


# --------------------------------------------------------------- başlıklar
# "1. Introduction" kadar "1.Introduction" ve "2.1Participants" de geçerli:
# bu PDF'lerde numara ile başlık arasında boşluk yok. Yanlış eşleşmeyi
# (ör. "2.5 million people were…") önlemek için başlık büyük harfle
# başlamalı, satır kısa olmalı ve nokta/virgülle bitmemelidir.
NUMBERED = re.compile(r"^(\d+(?:\.\d+)*)\.?\s*([A-ZÀ-ſ][^\n]*)$")
NAMED = re.compile(
    r"^(abstract|öz|özet|keywords?|anahtar kelimeler|introduction|giriş|"
    r"method(?:s|ology)?|materials and methods|yöntem|results?|bulgular|"
    r"findings|discussion|tartışma|conclusions?|sonuç|references?|kaynakça|"
    r"acknowledge?ments?|teşekkür|limitations?|appendix|ek)\b[:.]?\s*$",
    re.I)


def find_body_size(lines):
    """En çok yer kaplayan font boyutu = gövde metni boyutu."""
    c = collections.Counter()
    for l in lines:
        c[l["size"]] += len(l["t"])
    return c.most_common(1)[0][0]


def is_heading(l, body):
    t = l["t"].strip()
    if len(t) > 90:
        return None
    big = l["size"] >= body + 0.6
    m = NUMBERED.match(t)
    if (m and (big or l["bold"])
            and len(t) < 70
            and not t.rstrip().endswith((".", ",", ";", ":"))
            and len(m.group(2).split()) <= 10):
        depth = m.group(1).count(".") + 1
        return (min(depth, 2), m.group(1), m.group(2).strip())
    if NAMED.match(t) and (big or l["bold"] or t.isupper()):
        return (1, "", t.rstrip(":. "))
    if big and l["bold"] and len(t.split()) <= 12:
        return (1, "", t)
    return None


# --------------------------------------------------------- paragraf birleşme
def common_margins(vals, total, share=0.05, tol=3.0):
    """Sık kullanılan kenar konumlarını öbekle.

    Bir belgede birden çok sol kenar olabilir (iki dilli metin, alıntı bloğu,
    farklı bölüm düzeni). Tek bir yüzdelik değer alınırsa ikinci kenardaki
    her satır 'girintili' sanılır ve paragraflar satır satır bölünür.
    """
    c = collections.Counter(round(v / tol) * tol for v in vals)
    return sorted(m for m, n in c.items() if n >= max(4, total * share))


def build_blocks(lines, body):
    """Satırları başlık ve paragraf bloklarına ayır."""
    bl = [l for l in lines if abs(l["size"] - body) < 0.6]
    n = len(bl) or 1
    lefts = common_margins([l["x0"] for l in bl], n) or [0]
    rights = common_margins([l["x1"] for l in bl], n) or [0]
    right = max(rights)
    left = min(lefts)

    def is_indent(x0):
        """Bilinen kenarların hiçbirine oturmuyorsa ve soldan içerideyse."""
        return x0 > left + 6 and min(abs(x0 - m) for m in lefts) > 6

    # Satır sonundaki tire iki şeyden biri olabilir: hece bölmesi
    # ("humani-tarian" → humanitarian) ya da gerçek bileşik tire
    # ("trauma-focused"). Ayırt etmek için belgenin kendi metnine bakılır:
    # aynı bileşik satır ortasında tireli geçiyorsa tire korunur.
    inline_hyph = set()
    for l in lines:
        for m in re.finditer(r"\b([A-Za-zçğıöşü]{2,})-([A-Za-zçğıöşü]{2,})\b", l["t"]):
            inline_hyph.add((m.group(1).lower(), m.group(2).lower()))

    blocks, buf = [], []

    def flush():
        if buf:
            txt = " ".join(buf).strip()
            txt = re.sub(r"\s+", " ", txt)
            if txt:
                blocks.append(("p", txt))
            buf.clear()

    for i, l in enumerate(lines):
        h = is_heading(l, body)
        if h:
            flush()
            blocks.append(("h", h))
            continue
        t = l["t"]
        # tireli satır sonu: bir sonraki satırla birleşecek
        m = buf and re.search(r"([A-Za-zçğıöşüÇĞİÖŞÜ]{2,})-$", buf[-1])
        if m:
            head = m.group(1).lower()
            tail = re.match(r"([A-Za-zçğıöşüÇĞİÖŞÜ]{2,})", t)
            keep = tail and (head, tail.group(1).lower()) in inline_hyph
            buf[-1] = buf[-1] + t if keep else buf[-1][:-1] + t
        else:
            buf.append(t)
        # paragraf sonu: satır sağ kenara ulaşmıyor ve cümle bitmiş
        short = l["x1"] < right - 22
        ends = re.search(r"[.!?»”\"'\)]\s*$", t)
        nxt = lines[i + 1] if i + 1 < len(lines) else None
        indented = nxt and is_indent(nxt["x0"])
        newpage = nxt and nxt["page"] != l["page"]
        if (short and ends) or indented or (newpage and short):
            flush()
    flush()
    return blocks


# ------------------------------------------------------------------ HTML
def slug(s, used):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()[:44] or "b"
    base, i = s, 2
    while s in used:
        s = f"{base}-{i}"; i += 1
    used.add(s)
    return s


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


SC = re.compile(r"\b(PTSD|NET|TSSB|PRISMA|CBT|TFCBT|EMDR|WHO|UNHCR|NICE|"
                r"MINI|HTQ|BDI|PHQ|GAD|PCL|HSCL|IES-R|CAPS|SLESQ|ETI|DSM|ICD)\b")


def smallcaps(s):
    return SC.sub(lambda m: '<span class="sc">%s</span>' % m.group(1).lower(), s)


REF_HEAD = re.compile(r"^(references?|kaynakça|kaynaklar|bibliography)$", re.I)


def to_html(blocks, start_at=None):
    """Blokları HTML'e çevirir.

    start_at verilirse, o başlığa kadar olan her şey (dergi künyesi, yazar
    adresleri) atlanır. 'References' başlığından sonrası tek tek <li> olarak
    kaynak listesine alınır — paragraf gibi birleştirilmez.
    """
    html, toc, used = [], [], set()
    started = start_at is None
    in_refs = False
    refs = []

    for kind, val in blocks:
        if kind == "h":
            depth, num, title = val
            if not started:
                if re.fullmatch(start_at, title.strip(), re.I):
                    started = True
                else:
                    continue
            if REF_HEAD.match(title.strip()):
                in_refs = True
                aid = slug("references", used)
                html.append(f'<h2 class="section unnum" id="{aid}">{esc(title)}</h2>')
                toc.append({"level": 1, "n": "", "t": title, "id": aid})
                continue
            in_refs = False
            title_h = smallcaps(esc(title))
            lvl = 2 if (num and "." in num) else 1
            aid = slug((num + "-" + title) if num else title, used)
            if lvl == 1:
                html.append(f'<h2 class="section{"" if num else " unnum"}" id="{aid}">'
                            + (f'<span class="num">{num}</span>' if num else "")
                            + f'{title_h}</h2>')
                toc.append({"level": 1, "n": num, "t": title, "id": aid})
            else:
                html.append(f'<h3 class="subsection" id="{aid}">'
                            f'<span class="num">{num}</span>{title_h}</h3>')
                toc.append({"level": 2, "n": num, "t": title, "id": aid})
        else:
            if not started:
                continue
            if in_refs:
                refs.append("<li>" + esc(val) + "</li>")
            else:
                html.append("<p>" + smallcaps(esc(val)) + "</p>")

    if refs:
        html.append('<ol class="refs">' + "".join(refs) + "</ol>")
    return "\n".join(html), toc


# ------------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf")
    ap.add_argument("docid")
    ap.add_argument("--start", type=int, default=1)
    ap.add_argument("--end", type=int, default=0)
    ap.add_argument("--dump", action="store_true", help="blokları metin olarak da yaz")
    ap.add_argument("--start-at", default=None,
                    help="bu başlığa kadar olan künye atlanır (regex, ör. 'Abstract')")
    a = ap.parse_args()

    doc = fitz.open(a.pdf)
    first = a.start - 1
    last = a.end or doc.page_count
    lines = extract_lines(doc, first, last)
    print(f"ham satır      : {len(lines)}")
    lines = drop_running(lines)
    print(f"künye sonrası  : {len(lines)}")
    body = find_body_size(lines)
    print(f"gövde punto    : {body}")
    blocks = build_blocks(lines, body)
    nh = sum(1 for k, _ in blocks if k == "h")
    npar = sum(1 for k, _ in blocks if k == "p")
    print(f"blok           : {nh} başlık, {npar} paragraf")

    html, toc = to_html(blocks, a.start_at)
    words = len(re.findall(r"[A-Za-z][A-Za-z'’-]*", re.sub(r"<[^>]+>", " ", html)))
    print(f"sözcük         : {words}")
    print("başlıklar      :")
    for t in toc[:40]:
        print(f"   {'  ' * (t['level'] - 1)}{t['n']} {t['t'][:70]}")

    os.makedirs(OUTDIR, exist_ok=True)
    out = {"id": a.docid, "toc": toc, "html": html, "words": words}
    p = os.path.join(OUTDIR, a.docid + ".partial.json")
    json.dump(out, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("yazıldı        :", p)

    if a.dump:
        d = os.path.join(OUTDIR, a.docid + ".blocks.txt")
        with open(d, "w", encoding="utf-8") as f:
            for k, v in blocks:
                f.write(("## " + " ".join(str(x) for x in v) if k == "h" else v) + "\n\n")
        print("blok dökümü    :", d)


if __name__ == "__main__":
    main()
