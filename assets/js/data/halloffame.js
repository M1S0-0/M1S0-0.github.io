/* =============================================================
   HALL OF FAME — what the home page is built from.

   >>> PLACEHOLDER CONTENT. REPLACE WITH YOUR REAL ENTRIES. <<<

   GROUPS are the sections, in the order they appear.
   ============================================================= */

const HOF_GROUPS = [
  { key: "web2",   label: "Web2",   note: "Public and private programs" },
  { key: "web3",   label: "Web3",   note: "Public audits" },
  { key: "audits", label: "Audits", note: "Contests and engagements" }
];


/* =============================================================
   ENTRIES

     org         organisation or protocol. For a private program
                 leave this out and it renders masked.
     group       web2 | web3 | audits  (a HOF_GROUPS key)
     visibility  public | private
                   public  -> org name shown, links out if `proof` is set
                   private -> name masked, still counted in the totals
     kind        short label: Hall of Fame, Acknowledgement,
                 CVE Credit, Audit, Contest
     detail      optional one-liner: what you found, or the scope
     year        optional, shown on the right
     proof       optional URL to the vendor's public thanks page
   ============================================================= */

const HALLOFFAME = [

  /* ---------------- web2 ---------------- */
  {
    org: "Example Corporation",
    group: "web2",
    visibility: "public",
    kind: "Hall of Fame",
    detail: "Unauthenticated SSRF in an import endpoint",
    year: "2026",
    proof: null
  },
  {
    org: "Example Foundation",
    group: "web2",
    visibility: "public",
    kind: "Acknowledgement",
    detail: "Access control bypass on the reporting API",
    year: "2026",
    proof: null
  },
  {
    group: "web2",
    visibility: "private",
    kind: "Hall of Fame",
    detail: "Authentication logic flaw",
    year: "2026"
  },
  {
    group: "web2",
    visibility: "private",
    kind: "Acknowledgement",
    detail: "IDOR exposing other users' documents",
    year: "2025"
  },

  /* ---------------- web3 ---------------- */
  {
    org: "Example Protocol",
    group: "web3",
    visibility: "public",
    kind: "Audit",
    detail: "Oracle round handling froze vault operations",
    year: "2026",
    proof: null
  },
  {
    org: "Example DAO",
    group: "web3",
    visibility: "public",
    kind: "Audit",
    detail: "Share accounting rounding in the deposit path",
    year: "2026",
    proof: null
  },

  /* ---------------- audits ---------------- */
  {
    org: "Example Contest",
    group: "audits",
    visibility: "public",
    kind: "Contest",
    detail: "Lending protocol, placed in the leaderboard",
    year: "2026",
    proof: null
  }

];
