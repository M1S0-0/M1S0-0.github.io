/* =============================================================
   WRITEUPS — long-form articles.
   Each `slug` must match a file at /writeups/posts/<slug>.html
   Copy /writeups/posts/template.html to start a new one.

   >>> PLACEHOLDER. Replace. <<<
   domain: web2 | web3 | research | ctf
   ============================================================= */

const WRITEUPS = [

  {
    slug: "example-ssrf-wp-plugin",
    title: "Unauthenticated SSRF in a WordPress plugin import endpoint",
    summary: "An import endpoint that never checked authentication and happily fetched any URL I handed it. Walking from the initial hunch to a working proof of concept and a CVE.",
    date: "2026-07",
    domain: "web2",
    tags: ["SSRF", "WordPress", "Unauth"],
    findingId: "example-ssrf-wp-plugin"
  }

];
