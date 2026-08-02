/* =============================================================
   CERTIFICATIONS

   One flat list. Cards render in the order written below, so put
   the ones worth seeing first at the top.

     name        the certification title, as printed on it
     issuer      the body that awarded it
     logo        path to the badge art, e.g.
                 "/assets/img/certs/offsec.png". Drop the file in
                 assets/img/certs/. Leave it out and the card shows
                 the issuer's initials instead, so nothing breaks
                 while you are still collecting badges.
     year        optional, shown under the name
     credential  optional URL to the verification page. When set,
                 the whole card becomes a link.

   Example:

     {
       name: "Offensive Security Certified Professional",
       issuer: "OffSec",
       logo: "/assets/img/certs/offsec.png",
       year: "2025",
       credential: "https://www.credential.net/..."
     },

   ============================================================= */

const CERTIFICATIONS = [
  {
    name: "Securing API Servers",
    issuer: "APIsec University",
    logo: "/assets/img/certs/apisec-securing-api-servers.png",
    year: "2024",
    credential: "https://www.credly.com/badges/020819c0-da70-4452-ab0f-1d7bad639abc/linked_in_profile"
  }
];
