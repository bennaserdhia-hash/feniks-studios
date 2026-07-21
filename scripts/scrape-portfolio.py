# -*- coding: utf-8 -*-
"""
Récupère les 50 projets du portfolio de l'ancien site WordPress :
titre, catégorie, description, lien YouTube et miniature.

Sortie : data/portfolio.json
"""
import io, json, re, html, time, urllib.request

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36"
BASE = "https://www.feniksstudios.com"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")


def slugify(s):
    s = s.lower()
    s = re.sub(r"[àâä]", "a", s)
    s = re.sub(r"[éèêë]", "e", s)
    s = re.sub(r"[îï]", "i", s)
    s = re.sub(r"[ôö]", "o", s)
    s = re.sub(r"[ûüù]", "u", s)
    s = re.sub(r"[ç]", "c", s)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:60] or "projet"


def parse_project(url, image):
    h = get(url)

    # --- titre + catégorie : "[Catégorie] Nom du projet | Feniks Studios"
    m = re.search(r"<title>(.*?)</title>", h, re.S)
    raw = html.unescape(m.group(1)).strip() if m else ""
    raw = re.sub(r"\s*\|\s*Feniks Studios\s*$", "", raw)
    cat = ""
    mc = re.match(r"\[([^\]]+)\]\s*(.+)", raw)
    if mc:
        cat, title = mc.group(1).strip(), mc.group(2).strip()
    else:
        title = raw

    # --- vidéo
    yt = re.search(r"(?:youtube\.com/(?:watch\?v=|embed/)|youtu\.be/)([\w-]{11})", h)
    vimeo = re.search(r"vimeo\.com/(?:video/)?(\d+)", h)

    # --- description
    body = re.search(r"<article.*?</article>", h, re.S)
    seg = body.group(0) if body else h
    seg = re.sub(r"<(script|style|nav|header|footer)[^>]*>.*?</\1>", "", seg, flags=re.S)
    txt = html.unescape(re.sub(r"<[^>]+>", "\n", seg))
    lines = [re.sub(r"\s+", " ", l).strip() for l in txt.split("\n")]

    skip = ("feniks", "devis", "projet vidéo", "cookie", "menu", "accueil",
            "partager", "copyright", "mentions", "tous droits")
    paras = []
    for l in lines:
        if len(l) < 30:
            continue
        low = l.lower()
        if any(s in low for s in skip):
            continue
        if l not in paras:
            paras.append(l)
    paras = paras[:4]

    return {
        "id": slugify(title),
        "title": title,
        "category": cat or "Vidéo",
        "image": image,
        "youtubeId": yt.group(1) if yt else "",
        "vimeoId": vimeo.group(1) if vimeo else "",
        "description": paras[0] if paras else "",
        "details": paras[1:],
        "sourceUrl": url,
    }


def main():
    pairs = []
    for line in io.open("portfolio_links.txt", encoding="utf-8"):
        if "\t" in line:
            href, img = line.rstrip("\n").split("\t")
            pairs.append((href, img))

    out, seen = [], set()
    for i, (href, img) in enumerate(pairs, 1):
        try:
            p = parse_project(href, img)
            base_id = p["id"]
            n = 2
            while p["id"] in seen:
                p["id"] = f"{base_id}-{n}"
                n += 1
            seen.add(p["id"])
            out.append(p)
            flag = "YT" if p["youtubeId"] else ("VM" if p["vimeoId"] else "--")
            print(f"[{i:>2}/{len(pairs)}] {flag} {p['category'][:22]:<22} {p['title'][:46]}")
        except Exception as e:
            print(f"[{i:>2}/{len(pairs)}] ERREUR {href} -> {e}")
        time.sleep(0.25)

    io.open("data/portfolio-scraped.json", "w", encoding="utf-8").write(
        json.dumps(out, ensure_ascii=False, indent=2)
    )
    withv = sum(1 for p in out if p["youtubeId"] or p["vimeoId"])
    withd = sum(1 for p in out if p["description"])
    print(f"\n{len(out)} projets | {withv} avec vidéo | {withd} avec description")


main()
