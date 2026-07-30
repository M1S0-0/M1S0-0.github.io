/* =============================================================
   PROFILE — the banner and the report tables.

   Seeded from the real Immunefi profile. Update the numbers here
   whenever they change on the platform; nothing else needs editing.
   ============================================================= */

const PROFILE = {
  handle: "M1S00",
  memberSince: "January 29, 2026",
  tier: "Intermediate",

  bio: "Offensive security researcher and digital ghost. Breaking systems before the " +
       "bad guys do. From APIs to smart contracts: I hunt, exploit, and report " +
       "vulnerabilities that save millions. Bypassing limits, not ethics. " +
       "Always learning, always hacking.",

  /* headline cards on the right of the banner.
     `label` is the caption, `value` the number. */
  headline: [
    { label: "All time rank",  value: "1298th" },
    { label: "Total earnings", value: "$1,086" }
  ],

  links: [
    { label: "X",      url: null },
    { label: "GitHub", url: "https://github.com/M1S0-0" },
    { label: "Email",  url: "mailto:unknowbughunter@gmail.com" }
  ],

  /* shields under ACHIEVEMENTS. earned:false renders greyed out. */
  achievements: [
    { label: "First blood",       earned: true },
    { label: "Ten reports",       earned: false },
    { label: "Critical finding",  earned: false }
  ]
};


/* =============================================================
   REPORTS — the severity table.

   One row per report type. `cols` picks which severity columns
   that row shows, so a row without an Insights bucket simply
   leaves it out.
   ============================================================= */

const REPORT_COLS = ["insights", "low", "medium", "high", "critical"];

const REPORTS = [
  {
    label: "Bug bounty reports",
    total: 0,
    cols: { insights: null, low: 0, medium: 0, high: 0, critical: 0 }
  },
  {
    label: "Audit competition reports",
    total: 3,
    cols: { insights: 0, low: 2, medium: 1, high: 0, critical: 0 }
  }
];
