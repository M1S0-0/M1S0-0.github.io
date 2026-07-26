/* =============================================================
   WRITEUPS — the article list. Single source of truth.
   `slug` must match a file at /writeups/posts/<slug>.html

   >>> PLACEHOLDER CONTENT. REPLACE WITH YOUR OWN. <<<

   REQUIRED
     slug      matches the filename
     title     shown everywhere
     subtitle  the deck line under the title
     date      YYYY-MM-DD (or YYYY-MM)
     tags      first tag labels the thumbnail; all become filter buttons

   OPTIONAL — anything you set here appears in the "At a glance" table
   at the top of the article, and as badges on the feed card.
     severity  Critical | High | Medium | Low | Info
     cvss      "7.5" or a full vector string
     cve       "CVE-2026-12345"
     platform  Immunefi | HackenProof | Bugcrowd | Cantina | Patchstack
     program   the project or vendor name
     target    the contract, file, or endpoint
     status    Reported | Triaged | Accepted | Fixed | Disclosed | Duplicate
     bounty    a number, in USD
     readTime  overrides the computed estimate
     series    { name: "...", part: 1 }
   ============================================================= */

const WRITEUPS = [

  {
    slug: "example-ssrf-wp-plugin",
    title: "Unauthenticated SSRF in a WordPress plugin import endpoint",
    subtitle: "An import handler that never checked who was calling it, and happily fetched any URL I handed over.",
    date: "2026-07-20",
    readTime: "7 min read",
    tags: ["SSRF", "WordPress", "Unauth"],

    severity: "High",
    cvss: "8.6",
    cve: "CVE-2026-00000",
    platform: "Patchstack",
    program: "Example Plugin Vendor",
    target: "example-plugin v1.2.3",
    status: "Disclosed"
  },

  {
    slug: "example-oracle-dos",
    title: "One future-dated oracle round froze an entire vault",
    subtitle: "A timestamp subtraction nobody thought twice about, and the unsigned integer underflow that turned it into a denial of service.",
    date: "2026-06-14",
    readTime: "9 min read",
    tags: ["Oracle", "DoS", "Solidity"],

    severity: "High",
    cvss: "7.5",
    platform: "Immunefi",
    program: "Example Protocol",
    target: "PriceFeed.sol",
    status: "Fixed",
    bounty: 8000
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
