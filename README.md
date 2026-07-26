# m1s0-0.github.io

Security research writeups. Live at **https://m1s0-0.github.io/**

Static HTML, no build step, no dependencies. Push to `main` and it is live.

## Structure

```
index.html                  Home — masthead + latest writeups
writeups/index.html         Feed — featured post, search, tag filter
writeups/posts/<slug>.html  One file per article
writeups/posts/template.html
404.html
assets/
  css/site.css              all styling; CSS variables at the top
  js/site.js                feed, theme, syntax highlighting, TOC
  js/data/writeups.js       the article list
```

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
| Read time | Computed from the real word count on article pages |
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
