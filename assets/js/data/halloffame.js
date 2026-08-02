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
    label: "Web2 Private Audits / NDA",
    note: "Invitation only, under non-disclosure agreement. Counted, never described."
  },
  {
    key: "web3-bounty",
    label: "Smart Contract Bug Bounty / Contest",
    note: "Protocol bounty programs and contests"
  },
  {
    key: "blockchain-dlt",
    label: "Blockchain / DLT",
    note: "Protocol, consensus and node level"
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
    org: "OpenAI",
    logo: "/assets/img/logos/openai.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "PayPal",
    logo: "/assets/img/logos/paypal.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Binance",
    logo: "/assets/img/logos/binance.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Cisco",
    logo: "/assets/img/logos/cisco.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Dell",
    logo: "/assets/img/logos/dell.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Groww",
    logo: "/assets/img/logos/groww.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Comcast",
    logo: "/assets/img/logos/comcast.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Xfinity",
    logo: "/assets/img/logos/xfinity.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Chime",
    logo: "/assets/img/logos/chime.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "FusionAuth",
    logo: "/assets/img/logos/fusionauth.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Gen Digital Inc",
    logo: "/assets/img/logos/gendigital.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Aurory",
    logo: "/assets/img/logos/aurory.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Jetstar",
    logo: "/assets/img/logos/jetstar.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Bolt",
    logo: "/assets/img/logos/bolt.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Monash University",
    logo: "/assets/img/logos/monash.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "GoPro",
    logo: "/assets/img/logos/gopro.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "ImmoScout24",
    logo: "/assets/img/logos/immoscout24.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Greenfly",
    logo: "/assets/img/logos/greenfly.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "CoinDepo",
    logo: "/assets/img/logos/coindepo.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "GMGN.AI",
    logo: "/assets/img/logos/gmgn.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Levex",
    logo: "/assets/img/logos/levex.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "RTree Finance",
    logo: "/assets/img/logos/rtreefinance.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Layer3",
    logo: "/assets/img/logos/layer3.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "WhiteMarket",
    logo: "/assets/img/logos/whitemarket.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },

  {
    org: "MATLAB",
    logo: "/assets/img/logos/matlab.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },

  {
    org: "Office of Natural Resources Revenue",
    logo: "/assets/img/logos/onrr.png",
    group: "web2-bounty",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },

  /* ---------- Web2 private audits ---------- */
  {
    org: "CredentiAI",
    logo: "/assets/img/logos/credentiai.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Groww",
    logo: "/assets/img/logos/groww.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "VFS Global",
    logo: "/assets/img/logos/vfsglobal.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Prudential",
    logo: "/assets/img/logos/prudential.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Government of Maharashtra",
    logo: "/assets/img/logos/maharashtra.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },
  {
    org: "Block-Stars Pvt. Ltd.",
    logo: "/assets/img/logos/blockstars.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },

  {
    org: "Spaceship",
    logo: "/assets/img/logos/spaceship.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },

  {
    org: "ManyVids",
    logo: "/assets/img/logos/manyvids.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },

  {
    org: "TryFinch",
    logo: "/assets/img/logos/tryfinch.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },

  {
    org: "Fintual",
    logo: "/assets/img/logos/fintual.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },

  {
    org: "Fansly",
    logo: "/assets/img/logos/fansly.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },

  {
    org: "Restorecord",
    logo: "/assets/img/logos/restorecord.png",
    group: "web2-private",
    visibility: "public",
    kind: "Hall of Fame",
    proof: null
  },

  /* ---------- Smart contract bug bounty / contest ---------- */
  {
    org: "Folks Finance",
    logo: "/assets/img/logos/folksfinance.png",
    group: "web3-bounty",
    visibility: "public",
    kind: "Bug Bounty",
    detail: "Staking contracts",
    proof: null
  },
  {
    org: "Base Azul",
    logo: "/assets/img/logos/baseazul.png",
    group: "web3-bounty",
    visibility: "public",
    kind: "Bug Bounty",
    proof: null
  },
  {
    org: "0xMarkets",
    logo: "/assets/img/logos/zeroxmarkets.png",
    group: "web3-bounty",
    visibility: "public",
    kind: "Bug Bounty",
    proof: null
  },
  {
    org: "OpenSea",
    logo: "/assets/img/logos/opensea.png",
    group: "web3-bounty",
    visibility: "public",
    kind: "Bug Bounty",
    proof: null
  },

  /* ---------- Blockchain / DLT ---------- */
  {
    org: "Base Azul",
    logo: "/assets/img/logos/baseazul.png",
    group: "blockchain-dlt",
    visibility: "public",
    kind: "Bug Bounty",
    proof: null
  }

];
