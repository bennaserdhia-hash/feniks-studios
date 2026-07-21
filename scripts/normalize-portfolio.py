# -*- coding: utf-8 -*-
"""
Normalise les 50 projets récupérés depuis l'ancien site :
 - remet titre / catégorie dans le bon ordre
 - regroupe les catégories sur un jeu propre
 - identifiants lisibles, dérivés du titre
 - télécharge les miniatures (URL accentuées gérées)
Sortie : data/portfolio.json
"""
import io, json, os, re, urllib.parse, urllib.request

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36"
OUT_DIR = os.path.join("public", "portfolio")

TYPE_WORDS = [
    "couverture d'événement", "couverture d’événement", "motion design",
    "film d'entreprise", "film d’entreprise", "spot web", "spot pub", "spot city",
    "pub tv", "pub web", "vidéo corporate", "corporate", "reportage", "mini série",
    "série", "vidéo de présentation", "présentation d'activité", "présentation d’activité",
    "timelapse", "time lapse", "film sportif", "video learning", "vidéo produit",
    "cv vidéo", "site web", "vidéo de sensibilisation", "after movie", "aftermovie",
    "film chantier", "drone", "clip", "interview", "formation", "publicité", "vidéo",
]

# (motif recherché dans le libellé d'origine) -> catégorie finale
CATEGORY_RULES = [
    ("drone", "Timelapse & drone"),
    ("time lapse", "Timelapse & drone"),
    ("timelapse", "Timelapse & drone"),
    ("aftermovie", "Couverture d'événement"),
    ("after movie", "Couverture d'événement"),
    ("couverture", "Couverture d'événement"),
    ("séminaire", "Couverture d'événement"),
    ("motion design", "Motion design"),
    ("film d'entreprise", "Film d'entreprise"),
    ("film d’entreprise", "Film d'entreprise"),
    ("film chantier", "Film d'entreprise"),
    ("pub tv", "Publicité"),
    ("pub web", "Publicité"),
    ("spot pub", "Publicité"),
    ("spot city", "Publicité"),
    ("spot web", "Publicité"),
    ("publicité", "Publicité"),
    ("reportage", "Reportage"),
    ("mini série", "Reportage"),
    ("série", "Reportage"),
    ("vidéo produit", "Vidéo produit"),
    ("corporate", "Vidéo corporate"),
    ("formation", "Vidéo de formation"),
    ("video learning", "Vidéo de formation"),
    ("sensibilisation", "Vidéo de sensibilisation"),
    ("cv vidéo", "Vidéo de présentation"),
    ("présentation", "Vidéo de présentation"),
    ("film sportif", "Film sportif"),
    ("site web", "Site web"),
]


def is_type(s):
    low = s.lower()
    return any(w in low for w in TYPE_WORDS)


def canon_category(raw):
    low = raw.lower()
    for needle, cat in CATEGORY_RULES:
        if needle in low:
            return cat
    return "Vidéo"


def slugify(s):
    s = s.lower()
    for a, b in [("àâä", "a"), ("éèêë", "e"), ("îï", "i"), ("ôö", "o"), ("ûüù", "u"), ("ç", "c")]:
        for ch in a:
            s = s.replace(ch, b)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:50] or "projet"


def tidy(s):
    return re.sub(r"\s+", " ", s.strip(" -–—[]"))


def download(src, dest):
    """Télécharge en encodant le chemin (URL avec accents)."""
    parts = urllib.parse.urlsplit(src)
    safe = urllib.parse.urlunsplit((
        parts.scheme, parts.netloc,
        urllib.parse.quote(parts.path, safe="/%"),
        parts.query, parts.fragment,
    ))
    req = urllib.request.Request(safe, headers={"User-Agent": UA})
    data = urllib.request.urlopen(req, timeout=30).read()
    if len(data) < 2000 or data[:15].lower().startswith(b"<!doctype"):
        raise ValueError("réponse non-image")
    open(dest, "wb").write(data)


def main():
    projects = json.load(io.open("data/portfolio-scraped.json", encoding="utf-8"))
    os.makedirs(OUT_DIR, exist_ok=True)
    final, seen, failed = [], set(), []

    for p in projects:
        cat_raw, title = tidy(p["category"]), tidy(p["title"])

        # 1) le crochet contenait le type -> on inverse
        if not is_type(cat_raw) and is_type(title):
            cat_raw, title = title, cat_raw

        # 2) "Vidéo de présentation - Ibrahim Shalabi" : le vrai nom est après le tiret
        if " - " in cat_raw and (not title or is_type(title)):
            left, right = cat_raw.split(" - ", 1)
            if is_type(left) and not is_type(right):
                cat_raw, title = left, right

        if not title or is_type(title) and not is_type(cat_raw):
            title, cat_raw = cat_raw, title

        category = canon_category(cat_raw)

        # --- identifiant lisible depuis le titre
        pid = slugify(title)
        n = 2
        base = pid
        while pid in seen:
            pid = f"{base}-{n}"
            n += 1
        seen.add(pid)

        # --- miniature
        src = p["image"]
        ext = ".png" if src.lower().split("?")[0].endswith(".png") else ".jpg"
        fname = pid + ext
        dest = os.path.join(OUT_DIR, fname)
        if not os.path.exists(dest):
            try:
                download(src, dest)
            except Exception as e:
                failed.append((pid, str(e)[:50]))
                fname = None

        if not fname:
            continue

        final.append({
            "id": pid,
            "title": title,
            "category": category,
            "categoryLabel": cat_raw,
            "image": f"/portfolio/{fname}",
            "youtubeId": p.get("youtubeId", ""),
            "vimeoId": p.get("vimeoId", ""),
            "description": p.get("description", ""),
            "details": [d for d in p.get("details", []) if d],
        })

    io.open("data/portfolio.json", "w", encoding="utf-8").write(
        json.dumps(final, ensure_ascii=False, indent=2) + "\n"
    )

    print(f"{len(final)} projets -> data/portfolio.json")
    print(f"  avec vidéo       : {sum(1 for p in final if p['youtubeId'] or p['vimeoId'])}")
    print(f"  avec description : {sum(1 for p in final if p['description'])}")
    if failed:
        print("  miniatures KO    :", failed)
    from collections import Counter
    print("\nCatégories :")
    for c, n in Counter(p["category"] for p in final).most_common():
        print(f"  {n:>2}  {c}")


main()
