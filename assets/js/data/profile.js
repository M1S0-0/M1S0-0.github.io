/* =============================================================
   PROFILE — the banner and the report tables.

   Seeded from the real Immunefi profile. Update the numbers here
   whenever they change on the platform; nothing else needs editing.
   ============================================================= */

const PROFILE = {
  handle: "M1S0",
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

  /* The brand mark is picked from the label, so "LinkedIn" finds the
     LinkedIn glyph on its own. Known marks: x, linkedin, telegram,
     github, email. Add `icon` to override, or `tint` for a custom
     colour. A label with no matching mark renders as text only. */
  links: [
    { label: "X",        url: "https://x.com/M1S00000" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/m1s0/" },
    { label: "Telegram", url: "https://t.me/M1S0_MS" }
  ],

};

