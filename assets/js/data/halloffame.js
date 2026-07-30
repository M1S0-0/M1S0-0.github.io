/* =============================================================
   HALL OF FAME — what the home page is built from.

   >>> PLACEHOLDER CONTENT. REPLACE WITH YOUR REAL ENTRIES. <<<

   GROUPS are the sections, in the order they appear.

     split: true  splits the section into two walls, public first
                  then private, each with its own sub heading from
                  `subLabels`. Used for Web2, where bug bounty
                  programs and private company work are shown apart.
   ============================================================= */

const HOF_GROUPS = [
  {
    key: "web2",
    label: "Web2",
    note: "Web application security",
    split: true,
    subLabels: {
      public:  "Bug Bounty",
      private: "Private Companies"
    }
  },
  {
    key: "web3",
    label: "Web3 & Audits",
    note: "Protocols, audits and contests"
  }
];


/* =============================================================
   ENTRIES

     org         organisation or protocol. For a private company
                 leave this out and the card renders masked.
     logo        path to the company logo, e.g.
                 "/assets/img/logos/acme.svg". Drop the file in
                 assets/img/logos/. If you leave this out the card
                 shows the org's initials instead, so nothing breaks
                 while you are still collecting logos.
     group       web2 | web3   (a HOF_GROUPS key)
     visibility  public | private
                   public  -> name and logo shown, links out if
                              `proof` is set
                   private -> padlock card, no name, still counted.
                              Inside Web2 these collect under the
                              Private Companies heading.
     kind        short label: Hall of Fame, Acknowledgement,
                 CVE Credit, Audit, Contest
     detail      optional one-liner: what you found, or the scope
     year        optional
     proof       optional URL to the vendor's public thanks page
   ============================================================= */

const HALLOFFAME = [

  /* ------- web2 · bug bounty (public) ------- */
  {
    org: "Example Corporation",
    logo: null,
    group: "web2",
    visibility: "public",
    kind: "Hall of Fame",
    detail: "Unauthenticated SSRF in an import endpoint",
    year: "2026",
    proof: null
  },
  {
    org: "Example Foundation",
    logo: null,
    group: "web2",
    visibility: "public",
    kind: "Acknowledgement",
    detail: "Access control bypass on the reporting API",
    year: "2026",
    proof: null
  },

  /* ------- web2 · private companies ------- */
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

  /* ------- web3 & audits ------- */
  {
    org: "Example Protocol",
    logo: null,
    group: "web3",
    visibility: "public",
    kind: "Audit",
    detail: "Oracle round handling froze vault operations",
    year: "2026",
    proof: null
  },
  {
    org: "Example DAO",
    logo: null,
    group: "web3",
    visibility: "public",
    kind: "Audit",
    detail: "Share accounting rounding in the deposit path",
    year: "2026",
    proof: null
  },
  {
    org: "Example Contest",
    logo: null,
    group: "web3",
    visibility: "public",
    kind: "Contest",
    detail: "Lending protocol, placed in the leaderboard",
    year: "2026",
    proof: null
  }

];
