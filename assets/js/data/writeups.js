/* =============================================================
   CATEGORIES — the filter buttons on the writeups page.
   Edit this list to add, rename, or reorder them. "all" is
   always first and is not declared here.

   `key` is what a writeup's `category` field must match.
   ============================================================= */

const CATEGORIES = [
  { key: "web2",     label: "Web2" },
  { key: "web3",     label: "Web3" }
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
    slug: "langflow-rce-cve-2025-3248",
    title: "When \"validate code\" runs the code: unauthenticated RCE in Langflow",
    subtitle: "An endpoint whose whole job was to check a snippet of Python turned out to run it, with no login required. CVE-2025-3248, found live on an internet-exposed instance, from a validator to a root shell.",
    date: "2025-09-12",
    category: "web2",
    tags: ["RCE", "CVE-2025-3248", "Langflow", "Unauthenticated"],

    severity: "Critical",
    cve: "CVE-2025-3248",
    platform: "Bugcrowd",
    program: "Comcast VDP",
    target: "Langflow /api/v1/validate/code"
  },

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
    slug: "folks-finance-irrevocable-permit",
    title: "Trapped approvals in Folks Finance Staking: a permit you could grant but never revoke",
    subtitle: "A role check sat on the wrong side of an approval. Once an admin removed a migrator's role, users could no longer revoke the permit they had given it, leaving a latent authorization over their staked funds that they could not take back.",
    date: "2025-08-08",
    category: "web3",
    tags: ["Access Control", "Smart Contract", "DeFi", "Griefing"],

    severity: "Low",
    platform: "Immunefi",
    program: "Folks Finance Staking (Audit Comp)",
    target: "Staking.sol setMigrationPermit()"
  },

  {
    slug: "base-gossip-flood-limiter-bypass",
    title: "The flood limiter that never fires: a DoS in Base's consensus gossip",
    subtitle: "Base's gossip layer caps how many blocks it accepts per height, but it recorded a block only after verifying its signature. Forged-signature blocks were never counted, so the limiter never fired and every one still cost a full ECDSA recovery.",
    date: "2025-08-29",
    category: "web3",
    tags: ["Denial of Service", "Consensus", "Blockchain", "P2P"],

    severity: "Medium",
    platform: "Immunefi",
    program: "Base Azul (Audit Comp)",
    target: "base-consensus-gossip block_validity.rs"
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
    slug: "smtp-open-relay-spoofing",
    title: "Sending mail as Microsoft: an open SMTP relay on port 25",
    subtitle: "A mail server accepted email from anyone, addressed to anyone, claiming to be anyone, with no login. An open relay that turns one forgotten server into a phishing engine.",
    date: "2025-08-10",
    category: "web2",
    tags: ["SMTP", "Open Relay", "Email Spoofing", "Phishing"],

    severity: "Low",
    platform: "Bugcrowd",
    target: "Open SMTP relay, port 25"
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
    slug: "openai-discord-csrf-unlink",
    title: "One link to unlink: a CSRF in OpenAI's Discord verification",
    subtitle: "An unlink action on OpenAI's Discord verification service ran on a plain GET with no anti-CSRF token, so a single crafted link could quietly pull any member out of the OpenAI Discord without their knowledge.",
    date: "2025-08-30",
    category: "web2",
    tags: ["CSRF", "OpenAI", "Discord", "Authenticated Action"],

    severity: "Medium",
    platform: "Bugcrowd",
    program: "OpenAI",
    target: "discord.verify.openai.com /unlink"
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
