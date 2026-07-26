/* =============================================================
   Renders the data arrays into the page. No dependencies.
   All interpolated values go through esc() — never inject raw.
   ============================================================= */

function esc(v) {
  if (v === null || v === undefined) return "";
  return String(v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function money(n) {
  if (!n) return null;
  return "$" + Number(n).toLocaleString("en-US");
}

function byDateDesc(a, b) { return String(b.date).localeCompare(String(a.date)); }

function tagsHtml(tags) {
  if (!tags || !tags.length) return "";
  return '<div class="tags">' +
    tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") +
    "</div>";
}

/* ---------- stats ---------- */

function computeStats() {
  var paid = FINDINGS.reduce(function (s, f) { return s + (f.bounty || 0); }, 0);
  var valid = FINDINGS.filter(function (f) {
    return ["Accepted", "Fixed", "Disclosed", "Triaged"].indexOf(f.status) !== -1;
  }).length;
  var cves = FINDINGS.filter(function (f) { return !!f.cve; }).length;
  var programs = {};
  FINDINGS.forEach(function (f) { programs[f.program] = 1; });

  return {
    bounties: paid,
    findings: valid,
    cves: cves,
    hof: (typeof HALLOFFAME !== "undefined" ? HALLOFFAME.length : 0),
    programs: Object.keys(programs).length
  };
}

function renderStats(mountId) {
  var el = document.getElementById(mountId);
  if (!el) return;
  var s = computeStats();
  var cells = [
    [s.bounties ? "$" + s.bounties.toLocaleString("en-US") : "—", "Bounties"],
    [s.findings, "Findings"],
    [s.cves, "CVEs"],
    [s.hof, "Hall of Fame"],
    [s.programs, "Programs"]
  ];
  el.innerHTML = cells.map(function (c) {
    return '<div class="stat"><span class="num">' + esc(c[0]) +
           '</span><span class="lbl">' + esc(c[1]) + "</span></div>";
  }).join("");
}

/* ---------- findings ---------- */

function findingCard(f) {
  var sev = '<span class="sev sev-' + esc(f.severity.toLowerCase()) + '">' + esc(f.severity) + "</span>";
  var status = '<span class="pill">' + esc(f.status) + "</span>";
  var platform = '<span class="pill">' + esc(f.platform) + "</span>";
  var cve = f.cve ? '<span class="pill pill-cve">' + esc(f.cve) + "</span>" : "";
  var pay = money(f.bounty) ? '<span class="bounty">' + esc(money(f.bounty)) + "</span>" : "";

  var body, foot;

  if (f.visibility === "redacted") {
    body = "<h3>" + esc(f.program) + "</h3>" +
           '<p class="redacted">Details under disclosure embargo.</p>';
    foot = "";
  } else {
    var titleHtml = f.writeup
      ? '<a href="/writeups/posts/' + esc(f.writeup) + '.html">' + esc(f.title) + "</a>"
      : esc(f.title);
    body = "<h3>" + titleHtml + "</h3>" +
           '<p class="meta">' + esc(f.program) + " &middot; " + esc(f.target) + "</p>" +
           tagsHtml(f.tags);
    var links = [];
    if (f.writeup) links.push('<a href="/writeups/posts/' + esc(f.writeup) + '.html">Read writeup &rarr;</a>');
    if (f.proof) links.push('<a href="' + esc(f.proof) + '" rel="noopener">Advisory &rarr;</a>');
    foot = links.length ? '<span>' + links.join(" &nbsp;") + "</span>" : "<span></span>";
  }

  return '<article class="card" data-severity="' + esc(f.severity) +
         '" data-status="' + esc(f.status) + '">' +
           '<div class="card-top">' + sev + status + platform + cve + "</div>" +
           body +
           '<div class="card-bottom">' + (foot || "<span></span>") +
             '<span class="meta">' + esc(f.date) + (pay ? " &nbsp; " + pay : "") + "</span>" +
           "</div>" +
         "</article>";
}

function renderFindings(items, mountId) {
  var el = document.getElementById(mountId);
  if (!el) return;
  if (!items.length) {
    el.innerHTML = '<p class="empty">// nothing published here yet</p>';
    return;
  }
  el.innerHTML = items.slice().sort(byDateDesc).map(findingCard).join("");
}

/* severity filter bar */
function initFilters(barId, mountId, items) {
  var bar = document.getElementById(barId);
  if (!bar) return;
  var levels = ["All", "Critical", "High", "Medium", "Low"];

  bar.innerHTML = levels.map(function (l, i) {
    return '<button class="filter' + (i === 0 ? " on" : "") + '" data-sev="' + l + '">' + l + "</button>";
  }).join("");

  bar.addEventListener("click", function (e) {
    var btn = e.target.closest(".filter");
    if (!btn) return;
    Array.prototype.forEach.call(bar.querySelectorAll(".filter"), function (b) { b.classList.remove("on"); });
    btn.classList.add("on");
    var sev = btn.getAttribute("data-sev");
    renderFindings(sev === "All" ? items : items.filter(function (f) { return f.severity === sev; }), mountId);
  });
}

/* ---------- writeups ---------- */

function renderWriteups(items, mountId, limit) {
  var el = document.getElementById(mountId);
  if (!el) return;
  var list = items.slice().sort(byDateDesc);
  if (limit) list = list.slice(0, limit);

  if (!list.length) {
    el.innerHTML = '<p class="empty">// no writeups published yet</p>';
    return;
  }

  el.innerHTML = list.map(function (w) {
    return '<article class="card">' +
             '<div class="card-top">' +
               '<span class="pill">' + esc(w.domain) + "</span>" +
               '<span class="meta">' + esc(w.date) + "</span>" +
             "</div>" +
             '<h3><a href="/writeups/posts/' + esc(w.slug) + '.html">' + esc(w.title) + "</a></h3>" +
             "<p>" + esc(w.summary) + "</p>" +
             tagsHtml(w.tags) +
           "</article>";
  }).join("");
}

/* ---------- tools ---------- */

function renderTools(items, mountId, limit) {
  var el = document.getElementById(mountId);
  if (!el) return;
  var list = limit ? items.slice(0, limit) : items;

  if (!list.length) {
    el.innerHTML = '<p class="empty">// no tools published yet</p>';
    return;
  }

  el.innerHTML = list.map(function (t) {
    var stack = t.stack.map(function (s) { return '<span class="tag">' + esc(s) + "</span>"; }).join("");
    var hl = (t.highlights || []).map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("");
    var links = [];
    if (t.repo) links.push('<a href="' + esc(t.repo) + '" rel="noopener">Source &rarr;</a>');
    if (t.demo) links.push('<a href="' + esc(t.demo) + '" rel="noopener">Live demo &rarr;</a>');

    return '<article class="card">' +
             '<div class="card-top">' +
               '<span class="pill">' + esc(t.status) + "</span>" +
             "</div>" +
             "<h3>" + esc(t.name) + "</h3>" +
             '<p class="meta">' + esc(t.tagline) + "</p>" +
             "<p>" + esc(t.description) + "</p>" +
             (hl ? "<ul>" + hl + "</ul>" : "") +
             '<div class="tool-stack">' + stack + "</div>" +
             (links.length ? '<div class="tool-links">' + links.join("") + "</div>" : "") +
           "</article>";
  }).join("");
}

/* ---------- hall of fame ---------- */

function renderHOF(items, mountId) {
  var el = document.getElementById(mountId);
  if (!el) return;
  if (!items.length) {
    el.innerHTML = '<p class="empty">// nothing here yet</p>';
    return;
  }

  el.innerHTML = items.slice().sort(byDateDesc).map(function (h) {
    var org = h.proof
      ? '<a href="' + esc(h.proof) + '" rel="noopener">' + esc(h.org) + "</a>"
      : esc(h.org);
    return '<div class="hof-row">' +
             '<span class="hof-org">' + org + "</span>" +
             '<span class="hof-cat">' + esc(h.program) + "</span>" +
             '<span class="pill">' + esc(h.category) + "</span>" +
             '<span class="hof-date">' + esc(h.date) + "</span>" +
           "</div>";
  }).join("");
}
