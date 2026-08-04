#!/usr/bin/env python3
"""
Regenerates the brand images in assets/img/.

    python3 scripts/make-images.py

Produces:
    assets/img/og.png              1200x630 link preview card
    assets/img/favicon-32.png      browser tab
    assets/img/favicon-180.png     apple touch icon
    favicon.ico                    legacy fallback at the repo root

Only needs Pillow. Re-run it if the tagline or colours change.
"""

import re
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "assets" / "img"
IMG.mkdir(parents=True, exist_ok=True)

MONO_B = "/usr/share/fonts/truetype/firacode/FiraCode-Bold.ttf"
MONO_R = "/usr/share/fonts/truetype/firacode/FiraCode-Regular.ttf"
SANS_B = "/usr/share/fonts/truetype/lato/Lato-Black.ttf"
SANS_R = "/usr/share/fonts/truetype/lato/Lato-Regular.ttf"

BG = (15, 17, 21)
FG = (232, 232, 232)
MUTED = (140, 148, 160)
ACCENT = (61, 220, 151)


def font(path, size):
    return ImageFont.truetype(path, size)


# ---------------------------------------------------------------- og card
def make_og():
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    # faint grid, keeps the flat background from looking dead.
    # drawn first so nothing crosses the accent bar.
    for x in range(60, W, 60):
        d.line([(x, 0), (x, H)], fill=(23, 26, 32), width=1)
    for y in range(60, H, 60):
        d.line([(0, y), (W, y)], fill=(23, 26, 32), width=1)

    # accent bar down the left edge
    d.rectangle([0, 0, 9, H], fill=ACCENT)

    pad = 84

    # > m1s0
    f_brand = font(MONO_B, 40)
    d.text((pad, 78), ">", font=f_brand, fill=ACCENT)
    d.text((pad + 34, 78), " M1S0", font=f_brand, fill=FG)

    # eyebrow
    f_eye = font(MONO_R, 21)
    d.text((pad, 150), "S E C U R I T Y   R E S E A R C H E R", font=f_eye, fill=ACCENT)

    # headline
    f_h1 = font(SANS_B, 78)
    d.text((pad, 268), "I turn assumptions", font=f_h1, fill=FG)
    d.text((pad, 356), "into exploits.", font=f_h1, fill=FG)

    # footer line
    f_foot = font(MONO_R, 24)
    d.text((pad, 528), "m1s0-0.github.io", font=f_foot, fill=MUTED)

    im.save(IMG / "og.png", optimize=True)
    print("wrote", (IMG / "og.png").relative_to(ROOT))


# ---------------------------------------------------------------- favicon
def make_icon(size):
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)

    r = int(size * 0.22)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=BG)

    # a green > prompt, scaled to the canvas
    f = font(MONO_B, int(size * 0.62))
    text = ">"
    box = d.textbbox((0, 0), text, font=f)
    w, h = box[2] - box[0], box[3] - box[1]
    d.text(((size - w) / 2 - box[0], (size - h) / 2 - box[1]), text, font=f, fill=ACCENT)

    return im


def make_favicons():
    for s in (32, 180, 512):
        icon = make_icon(s)
        out = IMG / f"favicon-{s}.png"
        icon.save(out, optimize=True)
        print("wrote", out.relative_to(ROOT))

    ico = make_icon(64)
    ico.save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("wrote favicon.ico")


# ------------------------------------------------------- per-post og cards
def load_writeups():
    src = (ROOT / "assets/js/data/writeups.js").read_text()
    out = []
    for block in re.findall(r"\{(.*?)\}", src, re.S):
        slug = re.search(r'slug:\s*"([^"]+)"', block)
        title = re.search(r'title:\s*"([^"]+)"', block)
        date = re.search(r'date:\s*"([^"]+)"', block)
        tags = re.search(r"tags:\s*\[(.*?)\]", block, re.S)
        if slug and title:
            out.append({
                "slug": slug.group(1),
                "title": title.group(1),
                "date": date.group(1) if date else "",
                "tag": re.findall(r'"([^"]+)"', tags.group(1))[0] if tags else "",
            })
    return out


def make_post_og(w):
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    for x in range(60, W, 60):
        d.line([(x, 0), (x, H)], fill=(23, 26, 32), width=1)
    for y in range(60, H, 60):
        d.line([(0, y), (W, y)], fill=(23, 26, 32), width=1)
    d.rectangle([0, 0, 9, H], fill=ACCENT)

    pad = 84

    f_brand = font(MONO_B, 32)
    d.text((pad, 70), ">", font=f_brand, fill=ACCENT)
    d.text((pad + 27, 70), " M1S0", font=f_brand, fill=FG)

    if w["tag"]:
        f_tag = font(MONO_R, 19)
        d.text((pad, 128), w["tag"].upper(), font=f_tag, fill=ACCENT)

    # title, wrapped to fit and shrunk if it is very long
    size = 62 if len(w["title"]) < 62 else 52
    width = 30 if size == 62 else 36
    f_t = font(SANS_B, size)
    lines = textwrap.wrap(w["title"], width=width)[:4]

    y = 186
    for ln in lines:
        d.text((pad, y), ln, font=f_t, fill=FG)
        y += int(size * 1.18)

    f_foot = font(MONO_R, 22)
    foot = "m1s0-0.github.io"
    d.text((pad, 536), foot, font=f_foot, fill=MUTED)

    outdir = IMG / "og"
    outdir.mkdir(exist_ok=True)
    im.save(outdir / f"{w['slug']}.png", optimize=True)
    return outdir / f"{w['slug']}.png"


def make_post_ogs():
    for w in load_writeups():
        p = make_post_og(w)
        print("wrote", p.relative_to(ROOT))


if __name__ == "__main__":
    make_og()
    make_favicons()
    make_post_ogs()
