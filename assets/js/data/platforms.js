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
               HackenProof  -> "Rank 40"
               Bugcrowd     -> "P4 · 92% accuracy"

             Add a platform by appending an object here. Set `url`
             when you have the profile link and the card becomes
             clickable on its own.
     note    optional second line, e.g. reports or earnings
   ============================================================= */

const PLATFORMS = [
  {
    name: "Immunefi",
    handle: "@M1S00",
    url: "https://immunefi.com/profile/M1S00/",
    stat: "Associate",
    note: "Web3 bug bounty"
  },
  {
    name: "Bugcrowd",
    handle: "@M1S0",
    url: "https://bugcrowd.com/h/M1S0",
    stat: "— accuracy",
    note: "Web2 bug bounty"
  },
  {
    name: "HackenProof",
    handle: "@M1S0",
    url: "https://hackenproof.com/hackers/M1S0",
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
