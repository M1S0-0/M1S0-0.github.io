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


   REQUIRED
     slug      matches the filename
     title     shown everywhere
     subtitle  the deck line under the title
     date      YYYY-MM-DD (or YYYY-MM). NEVER DISPLAYED — it only
               orders the feed, picks the Latest hero, and drives
               prev/next and the RSS feed.
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
     series    { name: "...", part: 1 }
                 -> banner above the article title

   severity, cve, program, target, platform and tags are all
   searchable from the writeups page.
   ============================================================= */

const WRITEUPS = [

  {
    slug: "carthavault-share-manipulation",
    title: "Share price manipulation in CarthaVault through an in-flight deposit",
    subtitle: "The vault priced new shares against a total value that briefly dropped while its assets were in transit to an external pool. Any depositor could exploit that window to mint inflated shares and take value from existing holders.",
    date: "2025-09-05",
    category: "web3",
    tags: ["Share Price Manipulation", "DeFi", "Vault", "Smart Contract"],

    severity: "High",
    platform: "HackenProof",
    program: "0xMarkets Audit Contest",
    target: "CarthaVault.sol _totalValueLocked()"
  },

  {
    slug: "whitemarket-email-bombing",
    title: "Email bombing on WhiteMarket: racing the verification-resend limit",
    subtitle: "The resend-verification endpoint was rate limited and even returned 429 under load, but the limit was not atomic. A parallel burst slipped a stack of emails through before the limiter caught up.",
    date: "2025-08-20",
    category: "web2",
    tags: ["Race Condition", "Rate Limit Bypass", "Email Bombing", "GraphQL"],

    severity: "Low",
    platform: "HackenProof",
    program: "WhiteMarket Web",
    target: "POST /graphql/api on api.white.market"
  },

  {
    slug: "levex-otp-race-condition",
    title: "Racing the rate limit: unlimited OTP emails on LeveX",
    subtitle: "The endpoint that sends a one-time code capped how often you could call it, but not atomically. Firing the same request in parallel slipped a burst past the limit and flooded the mailbox.",
    date: "2025-08-15",
    category: "web2",
    tags: ["Race Condition", "Rate Limit Bypass", "OTP", "API"],

    severity: "Low",
    platform: "HackenProof",
    program: "LeveX Web & Mobile",
    target: "POST /service-user-identity/codes/mail on api100.levex.com"
  },

  {
    slug: "coindepo-idor",
    title: "IDOR on CoinDepo: reading any user's KYC through a trusted email field",
    subtitle: "One profile endpoint decided whose data to return from values in the request, not from who was logged in. Any authenticated user could pull another user's full KYC record.",
    date: "2025-09-10",
    category: "web2",
    tags: ["IDOR", "BOLA", "Broken Access Control", "API", "PII"],

    severity: "Critical",
    platform: "HackenProof",
    program: "CoinDepo Web & App DualDefense Audit",
    target: "POST /api/details on app.coindepo.com"
  },

  {
    slug: "dell-dependency-confusion",
    title: "How I earned a $750 bounty for a dependency confusion attack on Dell",
    subtitle: "A package name Dell forgot to claim was all it took. The whole story, in plain English, from the file I found to the bounty that landed.",
    date: "2025-09-01",
    category: "web2",
    tags: ["Dependency Confusion", "Supply Chain", "RCE", "npm"],

    severity: "Medium",
    platform: "Bugcrowd",
    program: "Dell Technologies Application Bug Bounty",
    target: "csm-installation-wizard in dell/csm-docs"
  }

];
