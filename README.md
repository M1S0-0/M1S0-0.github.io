# m1s0-0.github.io

Personal security research portfolio. Live at **https://m1s0-0.github.io/**

Static HTML, no build step, no dependencies. Push to `main` and it is live.

## How to add content

Everything on the site is generated from four data files. **You never hand-edit HTML to add an entry.**

| To add | Edit |
|---|---|
| A finding (web2 or web3) | `assets/js/data/findings.js` |
| A tool you built | `assets/js/data/tools.js` |
| A writeup | `assets/js/data/writeups.js` + an HTML file in `writeups/posts/` |
| A hall of fame entry | `assets/js/data/halloffame.js` |

Add one object to the array. The relevant page picks it up, and the stat counters on
the homepage recalculate on their own.

### Adding a writeup

1. Copy `writeups/posts/template.html` to `writeups/posts/<slug>.html`
2. Fill it in
3. Add an entry to `writeups.js` with a matching `slug`

### Disclosure control

Findings support `visibility: "public" | "redacted"`.

Set it to `redacted` while a report is still embargoed. The card renders as severity,
platform and payout only, with no title, target or detail. It still counts toward the
homepage totals. Flip it to `public` once the program authorises disclosure.

## Structure

```
index.html              home: stats, featured findings, tools, writeups, about
web2/                   web application findings
web3/                   smart contract findings
writeups/               article index
  posts/                one HTML file per article
tools/                  tools built
hall-of-fame/           acknowledgements and CVE credits
404.html
assets/
  css/style.css         all styling, CSS variables at the top
  js/render.js          turns the data arrays into cards
  js/data/*.js          the content
```

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

Opening the HTML files directly with `file://` also works, but absolute paths like
`/assets/css/style.css` will not resolve, so use the server.
