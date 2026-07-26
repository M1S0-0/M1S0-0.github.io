#!/usr/bin/env node
/**
 * Regenerates feed.xml and sitemap.xml from assets/js/data/writeups.js
 *
 *     node scripts/generate.js
 *
 * Run it after adding or removing a writeup, then commit the output.
 * Nothing else in the site depends on a build step.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://m1s0-0.github.io";
const AUTHOR = "M1S0";
const TITLE = "M1S0 — Security Researcher";
const DESC = "Writeups on vulnerability research, exploitation, and smart contract auditing.";

/* load the data file without a module system */
const dataSrc = fs.readFileSync(path.join(ROOT, "assets/js/data/writeups.js"), "utf8");
const WRITEUPS = eval(dataSrc + "\nWRITEUPS");

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const sorted = WRITEUPS.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));

/* a date field may be YYYY-MM or YYYY-MM-DD */
const toDate = (d) => new Date(String(d).length === 7 ? d + "-01" : d);

/* ------------------------------------------------------------------ RSS */

const items = sorted.map((w) => `    <item>
      <title>${esc(w.title)}</title>
      <link>${SITE}/writeups/posts/${esc(w.slug)}.html</link>
      <guid isPermaLink="true">${SITE}/writeups/posts/${esc(w.slug)}.html</guid>
      <description>${esc(w.subtitle || "")}</description>
      <pubDate>${toDate(w.date).toUTCString()}</pubDate>
${(w.tags || []).map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`).join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(TITLE)}</title>
    <link>${SITE}/</link>
    <description>${esc(DESC)}</description>
    <language>en</language>
    <managingEditor>${esc(AUTHOR)}</managingEditor>
    <lastBuildDate>${sorted.length ? toDate(sorted[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(ROOT, "feed.xml"), rss);
console.log("wrote feed.xml          " + sorted.length + " items");

/* -------------------------------------------------------------- sitemap */

const urls = [
  { loc: SITE + "/", pri: "1.0" },
  { loc: SITE + "/writeups/", pri: "0.9" },
  ...sorted.map((w) => ({
    loc: `${SITE}/writeups/posts/${w.slug}.html`,
    pri: "0.8",
    lastmod: toDate(w.date).toISOString().slice(0, 10)
  }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${esc(u.loc)}</loc>${u.lastmod ? `
    <lastmod>${u.lastmod}</lastmod>` : ""}
    <priority>${u.pri}</priority>
  </url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);
console.log("wrote sitemap.xml       " + urls.length + " urls");

/* --------------------------------------------------------------- robots */

fs.writeFileSync(path.join(ROOT, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log("wrote robots.txt");
