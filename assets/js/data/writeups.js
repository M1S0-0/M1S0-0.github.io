/* =============================================================
   WRITEUPS — the article feed.
   `slug` must match a file at /writeups/posts/<slug>.html

   >>> PLACEHOLDER CONTENT. REPLACE WITH YOUR OWN. <<<

   subtitle: the deck line under the title
   tags:     first tag becomes the thumbnail label; all tags
             become filter buttons on the writeups page
   readTime: optional. Article pages compute it from real word count.
   ============================================================= */

const WRITEUPS = [

  {
    slug: "example-ssrf-wp-plugin",
    title: "Unauthenticated SSRF in a WordPress plugin import endpoint",
    subtitle: "An import handler that never checked who was calling it, and happily fetched any URL I handed over.",
    date: "2026-07-20",
    readTime: "7 min read",
    tags: ["SSRF", "WordPress", "Unauth"]
  },

  {
    slug: "example-oracle-dos",
    title: "One future-dated oracle round froze an entire vault",
    subtitle: "A timestamp subtraction nobody thought twice about, and the unsigned integer underflow that turned it into a denial of service.",
    date: "2026-06-14",
    readTime: "9 min read",
    tags: ["Oracle", "DoS", "Solidity"]
  },

  {
    slug: "example-methodology",
    title: "How I actually read a smart contract for the first time",
    subtitle: "Not line by line from the top. Here is the order I go in, and why invariants come before implementation.",
    date: "2026-05-02",
    readTime: "6 min read",
    tags: ["Methodology", "Auditing"]
  }

];
