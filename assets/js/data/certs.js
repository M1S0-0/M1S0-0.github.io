/* =============================================================
   CERTIFICATIONS

   One flat list. Cards render in the order written below.

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

   ============================================================= */

const CERTIFICATIONS = [
  {
    name: "Certified Smart Contract Auditor",
    issuer: "Blockchain Council",
    logo: "/assets/img/certs/blockchain-council-csca.png",
    year: "2026",
    credential: "https://www.credential.net/1ae4ee63-6c1f-4c9e-bcbf-cf7098ae5e8a"
  },
  {
    name: "Foundry Fundamentals",
    issuer: "Cyfrin Updraft",
    logo: "/assets/img/certs/cyfrin-foundry-fundamentals.png",
    year: "2026",
    credential: "https://profiles.cyfrin.io/u/m1s00/achievements/foundry"
  },
  {
    name: "Smart Contract Security",
    issuer: "Cyfrin Updraft",
    logo: "/assets/img/certs/cyfrin-smart-contract-security.png",
    year: "2026",
    credential: "https://profiles.cyfrin.io/u/m1s00/achievements/security"
  },
  {
    name: "The Complete Solidity Course - Blockchain - Zero to Expert",
    issuer: "Udemy",
    logo: "/assets/img/certs/udemy-complete-solidity.png",
    year: "2025",
    credential: "https://www.udemy.com/certificate/UC-0870257b-4316-43ab-b726-b0078f1df5d4/"
  },
  {
    name: "Namaste Arbitrum",
    issuer: "Arbitrum and PYOR",
    logo: "/assets/img/certs/pyor-namaste-arbitrum.png",
    year: "2024",
    credential: "https://credsverse.com/credentials/8fcbc3aa-72bf-439b-ad5f-dbd1f0098eb6?recipient=true"
  },
  {
    name: "APISEC|CON Money",
    issuer: "APIsec University",
    logo: "/assets/img/certs/apisec-con-money.png",
    year: "2024",
    credential: "https://www.credly.com/badges/48433cbc-5454-488b-8eab-e4eb7a0739fd/linked_in_profile"
  },
  {
    name: "API Gateway Security Best Practices",
    issuer: "APIsec University",
    logo: "/assets/img/certs/apisec-api-gateway-security.png",
    year: "2024",
    credential: "https://www.credly.com/badges/60679a53-9aea-42ec-912d-bebb0007733f"
  },
  {
    name: "Securing API Servers",
    issuer: "APIsec University",
    logo: "/assets/img/certs/apisec-securing-api-servers.png",
    year: "2024",
    credential: "https://www.credly.com/badges/020819c0-da70-4452-ab0f-1d7bad639abc/linked_in_profile"
  },
  {
    name: "OWASP API Security Top 10",
    issuer: "APIsec University",
    logo: "/assets/img/certs/apisec-owasp-api-top10.png",
    year: "2024",
    credential: "https://www.credly.com/badges/2c599ec0-d685-43a9-9536-39da2310e01a"
  },
  {
    name: "White Badge",
    issuer: "PentesterLab",
    logo: "/assets/img/certs/pentesterlab-white-badge.png",
    year: "2024",
    credential: "https://pentesterlab.com/certs/5a395cc4662a60513bab7504a4a7f9"
  },
  {
    name: "HTTP Badge",
    issuer: "PentesterLab",
    logo: "/assets/img/certs/pentesterlab-http-badge.png",
    year: "2024",
    credential: "https://pentesterlab.com/certs/12e075c7c9983740fe4fce600f595e"
  },
  {
    name: "Essential Badge",
    issuer: "PentesterLab",
    logo: "/assets/img/certs/pentesterlab-essential-badge.png",
    year: "2024",
    credential: "https://pentesterlab.com/certs/579af9f4d51285fdd2223431e5b825"
  },
  {
    name: "MITRE ATT&CK Framework",
    issuer: "Udemy",
    logo: "/assets/img/certs/udemy-mitre-attack.png",
    year: "2024",
    credential: "https://www.udemy.com/certificate/UC-d77209c8-8ae6-467b-b477-e52584928fc0/"
  },
  {
    name: "The Complete Web Penetration Testing & Bug Bounty Course",
    issuer: "Udemy",
    logo: "/assets/img/certs/udemy-web-pentesting.png",
    year: "2022",
    credential: "https://www.udemy.com/certificate/UC-87e1057d-861b-4773-acbb-d4885250b002/"
  }
];
