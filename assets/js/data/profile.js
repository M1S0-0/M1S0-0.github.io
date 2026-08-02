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

  /* Written for a prospective client reading this cold. Leads with what
     can be checked (named organisations, how the work is delivered)
     rather than adjectives, and closes on availability. */
  bio: "Security researcher working across Web2 applications and Web3 protocols. " +
       "Credited by 40+ organisations, among them OpenAI, PayPal, Cisco and Dell, " +
       "for vulnerabilities confirmed in production systems. I work to one standard: " +
       "every finding arrives with a reproducible proof of concept, a clear impact " +
       "assessment, and a fix your team can ship. Need a smart contract audit or a " +
       "penetration test? I take on freelance and contract engagements. Get in touch.",

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

