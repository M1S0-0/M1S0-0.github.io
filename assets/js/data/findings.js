/* =============================================================
   FINDINGS — web2 + web3 in one array, split by `domain`.
   /web2/ and /web3/ are filtered views. Home stats total both.

   >>> EVERYTHING BELOW IS PLACEHOLDER DATA. REPLACE IT. <<<
   These are demo rows so you can see every card state render.
   No real finding of yours is published here on purpose.

   severity   Critical | High | Medium | Low | Info
   status     Reported | Triaged | Accepted | Fixed | Disclosed | Duplicate
   visibility public   -> full detail shown
              redacted -> severity + payout counted, details hidden
                          (use until the program authorises disclosure)
   ============================================================= */

const FINDINGS = [

  {
    id: "example-ssrf-wp-plugin",
    domain: "web2",
    title: "Unauthenticated SSRF in a WordPress plugin import endpoint",
    program: "Example Plugin Vendor",
    platform: "Patchstack",
    target: "example-plugin v1.2.3",
    severity: "High",
    status: "Disclosed",
    bounty: 0,
    cve: "CVE-2026-00000",
    date: "2026-07",
    tags: ["SSRF", "WordPress", "Unauth"],
    writeup: "example-ssrf-wp-plugin",
    proof: null,
    visibility: "public"
  },

  {
    id: "example-oracle-dos",
    domain: "web3",
    title: "Future-dated oracle round underflows the price read and freezes the vault",
    program: "Example Protocol",
    platform: "Immunefi",
    target: "PriceFeed.sol",
    severity: "High",
    status: "Accepted",
    bounty: 8000,
    cve: null,
    date: "2026-06",
    tags: ["Oracle", "DoS", "Underflow"],
    writeup: "example-oracle-dos",
    proof: null,
    visibility: "public"
  },

  {
    id: "example-redacted-critical",
    domain: "web3",
    title: "Accounting flaw allowing unbacked share minting",
    program: "Private Program",
    platform: "HackenProof",
    target: "Vault",
    severity: "Critical",
    status: "Fixed",
    bounty: 25000,
    cve: null,
    date: "2026-05",
    tags: ["Accounting", "Theft of funds"],
    writeup: null,
    proof: null,
    visibility: "redacted"
  },

  {
    id: "example-idor",
    domain: "web2",
    title: "IDOR in the account statement export exposing other users' documents",
    program: "Private Program",
    platform: "Bugcrowd",
    target: "api.example.com",
    severity: "Medium",
    status: "Fixed",
    bounty: 1500,
    cve: null,
    date: "2026-04",
    tags: ["IDOR", "Access Control"],
    writeup: null,
    proof: null,
    visibility: "redacted"
  },

  {
    id: "example-signature-replay",
    domain: "web3",
    title: "Missing chain ID in the signed payload enables cross-chain replay",
    program: "Example Multisig",
    platform: "Cantina",
    target: "WalletSimple.sol",
    severity: "Medium",
    status: "Triaged",
    bounty: null,
    cve: null,
    date: "2026-07",
    tags: ["Signature Replay", "EIP-712"],
    writeup: null,
    proof: null,
    visibility: "public"
  }

];
