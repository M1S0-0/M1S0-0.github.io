/* =============================================================
   PLATFORMS — the cross-platform presence strip.

   Every bounty platform shows your record only on that platform.
   This is the one place the whole picture lives, which is the
   point of having your own profile at all.

   >>> PLACEHOLDER. REPLACE HANDLES, URLS AND STATS. <<<

     name    platform name
     handle  your handle there
     url     your public profile, or null to render it unlinked
     mark    which stylised brand mark to watermark the card with:
             immunefi | bugcrowd | hackenproof. These are drawn in
             each platform's colour family, not their trademark
             files. Drop a real SVG in assets/img/logos/ and point
             `logo` at it instead if you would rather use theirs.
     note    optional second line
   ============================================================= */

const PLATFORMS = [
  {
    name: "Immunefi",
    handle: "@M1S00",
    url: "https://immunefi.com/profile/M1S00/",
    mark: "immunefi",
    note: "Web3 bug bounty"
  },
  {
    name: "Bugcrowd",
    handle: "@M1S0",
    url: "https://bugcrowd.com/h/M1S0",
    mark: "bugcrowd",
    note: "Web2 bug bounty"
  },
  {
    name: "HackenProof",
    handle: "@M1S0",
    url: "https://hackenproof.com/hackers/M1S0",
    mark: "hackenproof",
    note: "Web3 bug bounty"
  }
];


/* =============================================================
   SEVERITY — findings across every platform combined.

   No platform can show you this, because each only counts its
   own. Set the totals here.
   ============================================================= */

const SEVERITY = [
  { key: "critical", label: "Critical", count: 0 },
  { key: "high",     label: "High",     count: 0 },
  { key: "medium",   label: "Medium",   count: 0 },
  { key: "low",      label: "Low",      count: 0 }
];
