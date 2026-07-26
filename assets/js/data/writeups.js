/* =============================================================
   WRITEUPS — the article feed.
   `slug` must match a file at /writeups/posts/<slug>.html

   >>> PLACEHOLDER CONTENT. REPLACE WITH YOUR OWN. <<<

   domain:   web2 | web3 | research | ctf
   subtitle: the deck line shown under the title (Medium style)
   readTime: optional. Omitted on an article page, where it is
             computed from the actual word count instead.
   ============================================================= */

const WRITEUPS = [

  {
    slug: "example-ssrf-wp-plugin",
    title: "Unauthenticated SSRF in a WordPress plugin import endpoint",
    subtitle: "An import handler that never checked who was calling it, and happily fetched any URL I handed over.",
    summary: "An import handler that never checked who was calling it, and happily fetched any URL I handed over.",
    date: "2026-07-20",
    domain: "web2",
    readTime: "7 min read",
    tags: ["SSRF", "WordPress", "Unauth"],
    findingId: "example-ssrf-wp-plugin"
  },

  {
    slug: "example-oracle-dos",
    title: "One future-dated oracle round froze an entire vault",
    subtitle: "A timestamp subtraction nobody thought twice about, and the unsigned integer underflow that turned it into a denial of service.",
    summary: "A timestamp subtraction nobody thought twice about, and the unsigned integer underflow that turned it into a denial of service.",
    date: "2026-06-14",
    domain: "web3",
    readTime: "9 min read",
    tags: ["Oracle", "DoS", "Solidity"],
    findingId: "example-oracle-dos"
  },

  {
    slug: "example-methodology",
    title: "How I actually read a smart contract for the first time",
    subtitle: "Not line by line from the top. Here is the order I go in, and why invariants come before implementation.",
    summary: "Not line by line from the top. Here is the order I go in, and why invariants come before implementation.",
    date: "2026-05-02",
    domain: "research",
    readTime: "6 min read",
    tags: ["Methodology", "Auditing"],
    findingId: null
  }

];
