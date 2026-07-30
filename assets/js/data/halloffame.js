/* =============================================================
   HALL OF FAME — what the home page is built from.

   >>> PLACEHOLDER CONTENT. REPLACE WITH YOUR REAL ENTRIES. <<<

   HOF_GROUPS are the sections, in the order they appear. They
   also become the tabs under Programs Secured, so adding a group
   here adds a tab there with nothing else to change.
   ============================================================= */

const HOF_GROUPS = [
  {
    key: "web2-bounty",
    label: "Web2 Bug Bounty Programs",
    note: "Public disclosure programs"
  },
  {
    key: "web2-private",
    label: "Web2 Private Programs",
    note: "Invitation only and under NDA"
  },
  {
    key: "web3-bounty",
    label: "Web3 Bug Bounty Programs",
    note: "Protocol bounty programs"
  },
  {
    key: "web3-audits",
    label: "Web3 Audit Competitions",
    note: "Contests and audit engagements"
  }
];


/* =============================================================
   ENTRIES

     org         organisation or protocol. For a program you cannot
                 name, leave this out and the card renders masked.
     logo        path to the company logo, e.g.
                 "/assets/img/logos/acme.svg". Drop the file in
                 assets/img/logos/. Leave it out and the card shows
                 the org's initials instead, so nothing breaks while
                 you are still collecting logos.
     group       one of the HOF_GROUPS keys above
     visibility  public | private
                   public  -> name and logo shown, links out if
                              `proof` is set
                   private -> padlock card, no name, still counted
     kind        short label: Hall of Fame, Acknowledgement,
                 CVE Credit, Bug Bounty, Audit, Contest
     detail      optional one-liner: what you found, or the scope
     year        optional
     proof       optional URL to the vendor's public thanks page
   ============================================================= */

const HALLOFFAME = [

  /* ---------- Web2 bug bounty ---------- */
  {
    org: "Example Corporation",
    logo: null,
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    detail: "Unauthenticated SSRF in an import endpoint",
    year: "2026",
    proof: null
  },
  {
    org: "Example Foundation",
    logo: null,
    group: "web2-bounty",
    visibility: "public",
    kind: "Acknowledgement",
    detail: "Access control bypass on the reporting API",
    year: "2026",
    proof: null
  },

  /* ---------- Web2 private ---------- */
  {
    group: "web2-private",
    visibility: "private",
    kind: "Hall of Fame",
    detail: "Authentication logic flaw",
    year: "2026"
  },
  {
    group: "web2-private",
    visibility: "private",
    kind: "Acknowledgement",
    detail: "IDOR exposing other users' documents",
    year: "2025"
  },

  /* ---------- Web3 bug bounty ---------- */
  {
    org: "Example Protocol",
    logo: null,
    group: "web3-bounty",
    visibility: "public",
    kind: "Bug Bounty",
    detail: "Oracle round handling froze vault operations",
    year: "2026",
    proof: null
  },

  /* ---------- Web3 audit competitions ---------- */
  {
    org: "Example DAO",
    logo: null,
    group: "web3-audits",
    visibility: "public",
    kind: "Audit",
    detail: "Share accounting rounding in the deposit path",
    year: "2026",
    proof: null
  },
  {
    org: "Example Contest",
    logo: null,
    group: "web3-audits",
    visibility: "public",
    kind: "Contest",
    detail: "Lending protocol, placed in the leaderboard",
    year: "2026",
    proof: null
  }

];
