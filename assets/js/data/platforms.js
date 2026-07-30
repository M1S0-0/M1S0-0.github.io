/* =============================================================
   PLATFORMS — the cross-platform presence strip.

   Every bounty platform shows your record only on that platform.
   This is the one place the whole picture lives, which is the
   point of having your own profile at all.

   >>> PLACEHOLDER. REPLACE HANDLES, URLS AND STATS. <<<

     name    platform name
     handle  your handle there
     url     your public profile, or null to render it unlinked
     stat    the headline number that platform gives you.
             Use whatever that platform actually calls it:
               Immunefi     -> "Elite Auditor" / "Rank 412"
               HackerOne    -> "Rank 1,204" / "Reputation 892"
               Bugcrowd     -> "P4 · 92% accuracy"
               Cantina      -> "Rank 88"
               HackenProof  -> "Rank 40"
     note    optional second line, e.g. reports or earnings
   ============================================================= */

const PLATFORMS = [
  {
    name: "Immunefi",
    handle: "@m1s0",
    url: null,
    stat: "Associate",
    note: "Web3 bug bounty"
  },
  {
    name: "HackerOne",
    handle: "@m1s0",
    url: null,
    stat: "Rank —",
    note: "Web2 bug bounty"
  },
  {
    name: "Bugcrowd",
    handle: "@m1s0",
    url: null,
    stat: "— accuracy",
    note: "Web2 bug bounty"
  },
  {
    name: "Cantina",
    handle: "@m1s0",
    url: null,
    stat: "Rank —",
    note: "Audit competitions"
  },
  {
    name: "HackenProof",
    handle: "@m1s0",
    url: null,
    stat: "Rank —",
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
