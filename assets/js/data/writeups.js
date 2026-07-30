/* =============================================================
   CATEGORIES — the filter buttons on the writeups page.
   Edit this list to add, rename, or reorder them. "all" is
   always first and is not declared here.

   `key` is what a writeup's `category` field must match.
   ============================================================= */

const CATEGORIES = [
  { key: "web2",     label: "Web2" },
  { key: "web3",     label: "Web3" },
  { key: "research", label: "Blockchain Research" }
];


/* =============================================================
   WRITEUPS — the article list. Single source of truth.
   `slug` must match a file at /writeups/posts/<slug>.html

   >>> PLACEHOLDER CONTENT. REPLACE WITH YOUR OWN. <<<

   REQUIRED
     slug      matches the filename
     title     shown everywhere
     subtitle  the deck line under the title
     date      YYYY-MM-DD (or YYYY-MM)
     category  one of the CATEGORIES keys above
     tags      first tag labels the thumbnail; the rest show on
               the card and are all searchable

   OPTIONAL
     severity  Critical | High | Medium | Low | Info
                 -> badge on the feed card, and the "By severity" sort
     cve       "CVE-2026-12345"
                 -> chip on the feed card
     program   the project or vendor name
     target    the contract, file, or endpoint
                 -> the small line above the title on the feed card
     platform  Immunefi | HackenProof | Bugcrowd | Cantina | Patchstack
                 -> searchable only
     readTime  overrides the computed estimate
     series    { name: "...", part: 1 }
                 -> banner above the article title

   severity, cve, program, target, platform and tags are all
   searchable from the writeups page.
   ============================================================= */

const WRITEUPS = [

  {
    slug: "example-ssrf-wp-plugin",
    title: "Unauthenticated SSRF in a WordPress plugin import endpoint",
    subtitle: "An import handler that never checked who was calling it, and happily fetched any URL I handed over.",
    date: "2026-07-20",
    category: "web2",
    readTime: "7 min read",
    tags: ["SSRF", "WordPress", "Unauth"],

    severity: "High",
    cve: "CVE-2026-00000",
    platform: "Patchstack",
    program: "Example Plugin Vendor",
    target: "example-plugin v1.2.3"
  },

  {
    slug: "example-oracle-dos",
    title: "One future-dated oracle round froze an entire vault",
    subtitle: "A timestamp subtraction nobody thought twice about, and the unsigned integer underflow that turned it into a denial of service.",
    date: "2026-06-14",
    category: "web3",
    readTime: "9 min read",
    tags: ["Oracle", "DoS", "Solidity"],

    severity: "High",
    platform: "Immunefi",
    program: "Example Protocol",
    target: "PriceFeed.sol"
  },

  {
    slug: "example-methodology",
    title: "How I actually read a smart contract for the first time",
    subtitle: "Not line by line from the top. Here is the order I go in, and why invariants come before implementation.",
    date: "2026-05-02",
    category: "research",
    readTime: "6 min read",
    tags: ["Methodology", "Auditing"]
  }

];
