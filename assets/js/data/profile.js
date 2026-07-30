/* =============================================================
   PROFILE — the banner and the report tables.

   Seeded from the real Immunefi profile. Update the numbers here
   whenever they change on the platform; nothing else needs editing.
   ============================================================= */

const PROFILE = {
  handle: "M1S00",
  /* shown as pills under the handle. `years` is approximate and
     renders with a leading tilde. */
  exposure: [
    { label: "Web2", years: 3 },
    { label: "Web3", years: 1 }
  ],
  tier: null,          /* set a string to show a tier pill again */

  bio: "Offensive security researcher and digital ghost. Breaking systems before the " +
       "bad guys do. From APIs to smart contracts: I hunt, exploit, and report " +
       "vulnerabilities that save millions. Bypassing limits, not ethics. " +
       "Always learning, always hacking.",

  /* headline cards on the right of the banner. Empty for now.
     Add { label, value } objects here to bring them back. */
  headline: [],

  links: [
    { label: "X",      url: null },
    { label: "GitHub", url: "https://github.com/M1S0-0" },
    { label: "Email",  url: "mailto:unknowbughunter@gmail.com" }
  ],

};

