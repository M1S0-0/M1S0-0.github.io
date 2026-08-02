/* =============================================================
   CERTIFICATIONS

   Two groups render as two stacked sections under About.
   Add a group here and it appears automatically.
   ============================================================= */

const CERT_GROUPS = [
  {
    key: "web2",
    label: "Web2 Security",
    note: "Application and infrastructure security"
  },
  {
    key: "blockchain",
    label: "Blockchain Security",
    note: "Smart contract and protocol security"
  }
];


/* =============================================================
   ENTRIES

     name        the certification title, as printed on it
     issuer      the body that awarded it
     logo        path to the issuer logo, e.g.
                 "/assets/img/certs/offsec.png". Drop the file in
                 assets/img/certs/. Leave it out and the card shows
                 the issuer's initials instead, so nothing breaks
                 while you are still collecting logos.
     group       one of the CERT_GROUPS keys above
     year        optional, shown under the issuer
     credential  optional URL to the verification page. When set,
                 the whole card becomes a link.

   Example:

     {
       name: "Offensive Security Certified Professional",
       issuer: "OffSec",
       logo: "/assets/img/certs/offsec.png",
       group: "web2",
       year: "2025",
       credential: "https://www.credential.net/..."
     },

   ============================================================= */

const CERTIFICATIONS = [

  /* ---------- Web2 security ---------- */

  /* ---------- Blockchain security ---------- */

];


/* rows for one group, in the order written above */
function certsOf(key) {
  return CERTIFICATIONS.filter(function (c) { return c.group === key; });
}
