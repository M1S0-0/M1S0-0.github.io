# m1s0-0.github.io

Security research writeups. Live at **https://m1s0-0.github.io/**

Static HTML, no build step, no dependencies. Push to `main` and it is live.

## Structure

```
index.html                  Home — masthead, stats, about, latest writeups
writeups/index.html         Feed — featured post, search, tag filter
writeups/posts/<slug>.html  One file per article
writeups/posts/template.html
404.html
feed.xml sitemap.xml robots.txt favicon.ico    generated, see below
assets/
  css/site.css              all styling; CSS variables at the top
  js/site.js                feed, theme, syntax highlighting, TOC
  js/data/writeups.js       the article list
  img/                      generated favicons and link preview cards
scripts/
  generate.js               rebuilds feed.xml, sitemap.xml, robots.txt
  make-images.py            rebuilds favicons and OG cards
```

## Article components

Copy these out of `writeups/posts/template.html`. Every one is already styled in
both light and dark.

| Block | Markup | Notes |
|---|---|---|
| Series banner | `<div id="series"></div>` | Appears only if the entry has `series: { name, part }`. |
| Callout | `<div class="callout callout-note">` | Variants: `note`, `tip`, `warn`, `danger`. |
| Numbered steps | `<ol class="steps">` | For exploitation chains. Code blocks nest inside a step. |
| Code with filename | `<pre data-file="Vault.sol" data-lang="solidity">` | Both attributes optional; renders a header bar. |
| Figure | `<figure><img><figcaption>` | Captioned diagram or screenshot. |
| Key takeaways | `<div class="takeaways">` | The generalisable lesson, not the specific bug. |
| References | `<div class="refs">` | Numbered source list. |
| Author box | `<div id="authorbox"></div>` | Rendered automatically. |

## Categories

The filter buttons on the writeups page come from the `CATEGORIES` array at the top of
`assets/js/data/writeups.js`:

```js
const CATEGORIES = [
  { key: "web2",     label: "Web2" },
  { key: "web3",     label: "Web3" },
  { key: "research", label: "Blockchain Research" }
];
```

Add, rename or reorder entries there and the buttons follow. `All` is always first and is
not declared. Every writeup needs a `category` matching one of the keys.

Optional fields on a data entry — `severity`, `cve`, `program`, `target`, `platform` —
put a severity badge and CVE chip on the feed card, drive the By severity sort, and are
all searchable from the writeups page.

## After adding or removing a writeup

```bash
node scripts/generate.js        # feed.xml, sitemap.xml, robots.txt
python3 scripts/make-images.py  # favicons + a link preview card per post
```

Both read `assets/js/data/writeups.js`, so they never drift from the post list.
Commit whatever they change. Neither is required to deploy, only to keep the feed
and link previews current.

`make-images.py` needs Pillow and reads fonts from `/usr/share/fonts` — adjust the
paths at the top of the file if you move to another machine.

## Adding a writeup

1. Copy `writeups/posts/template.html` to `writeups/posts/<slug>.html`
2. Edit the four marked lines in `<head>`, write the body, and set the
   `initArticle({ slug, date, title })` call at the bottom
3. Add a matching entry to `assets/js/data/writeups.js`

The `slug` in the data file must match the filename. Nothing else needs touching —
the feed, the homepage, prev/next links and the "More writeups" block all update
themselves.

## What runs automatically

| Feature | Notes |
|---|---|
| Dates | Never shown anywhere. `date` only orders the feed, picks the Latest hero, and feeds RSS |
| Table of contents | Built from the `h2` headings, hidden if fewer than 3 |
| Syntax highlighting | Strings matched before comments, so URLs are not mangled |
| Copy button | Added to every code block |
| Prev / next | Derived from publication date order |
| Thumbnails | Gradient generated from a hash of the slug, so it never changes |
| Theme | Light by default, toggle persists in localStorage |

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

Use the server rather than opening files directly, since absolute paths like
`/assets/css/site.css` will not resolve over `file://`.
