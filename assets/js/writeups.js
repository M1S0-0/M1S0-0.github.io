/* =============================================================
   Writeups section — feed rendering, theme, reading progress.
   Standalone: does not depend on render.js.
   ============================================================= */

var AUTHOR = "M1S0";

function wEsc(v) {
  if (v === null || v === undefined) return "";
  return String(v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------- theme ---------- */

function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  try { localStorage.setItem("w-theme", t); } catch (e) {}
  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.textContent = t === "dark" ? "☀" : "☾";
    btn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
}

function initTheme() {
  var saved;
  try { saved = localStorage.getItem("w-theme"); } catch (e) {}
  applyTheme(saved || "light");
  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }
}

/* ---------- helpers ---------- */

/* deterministic colour from a slug, so each post keeps the same thumbnail */
function hueOf(str) {
  var h = 0;
  for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
}

function thumbFor(w) {
  var h = hueOf(w.slug);
  var bg = "linear-gradient(135deg, hsl(" + h + ",62%,42%), hsl(" + ((h + 42) % 360) + ",58%,26%))";
  var label = (w.tags && w.tags[0]) ? w.tags[0] : w.domain;
  return '<div class="w-thumb" style="background:' + bg + '"><span>' + wEsc(label) + "</span></div>";
}

function initials(name) {
  return name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
}

function prettyDate(d) {
  var parts = String(d).split("-");
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var m = months[parseInt(parts[1], 10) - 1] || "";
  return parts[2] ? m + " " + parseInt(parts[2], 10) + ", " + parts[0] : m + " " + parts[0];
}

function readTimeOf(w) {
  if (w.readTime) return w.readTime;
  var words = ((w.summary || "") + " " + (w.subtitle || "")).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200)) + " min read";
}

/* ---------- feed ---------- */

function renderFeed(items, mountId) {
  var el = document.getElementById(mountId);
  if (!el) return;

  var list = items.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });

  if (!list.length) {
    el.innerHTML = '<p class="w-empty">// nothing published here yet</p>';
    return;
  }

  el.innerHTML = list.map(function (w) {
    var tag = (w.tags && w.tags[0]) ? '<span class="w-chip">' + wEsc(w.tags[0]) + "</span>" : "";
    return '<a class="w-item" href="/writeups/posts/' + wEsc(w.slug) + '.html">' +
             '<div class="w-item-main">' +
               '<div class="w-byline">' +
                 '<span class="w-avatar">' + wEsc(initials(AUTHOR)) + "</span>" +
                 "<span>" + wEsc(AUTHOR) + "</span>" +
               "</div>" +
               "<h2>" + wEsc(w.title) + "</h2>" +
               "<p>" + wEsc(w.subtitle || w.summary) + "</p>" +
               '<div class="w-meta">' +
                 "<span>" + wEsc(prettyDate(w.date)) + "</span>" +
                 '<span class="w-dot">&middot;</span>' +
                 "<span>" + wEsc(readTimeOf(w)) + "</span>" +
                 (tag ? '<span class="w-dot">&middot;</span>' + tag : "") +
               "</div>" +
             "</div>" +
             thumbFor(w) +
           "</a>";
  }).join("");
}

/* ---------- tabs ---------- */

function initTabs(barId, mountId, items) {
  var bar = document.getElementById(barId);
  if (!bar) return;

  var cats = ["All", "web2", "web3", "research", "ctf"];
  var labels = { All: "All", web2: "Web2", web3: "Web3", research: "Research", ctf: "CTF" };

  bar.innerHTML = cats.map(function (c, i) {
    return '<button class="w-tab' + (i === 0 ? " on" : "") + '" data-cat="' + c + '">' + labels[c] + "</button>";
  }).join("");

  bar.addEventListener("click", function (e) {
    var btn = e.target.closest(".w-tab");
    if (!btn) return;
    Array.prototype.forEach.call(bar.querySelectorAll(".w-tab"), function (b) { b.classList.remove("on"); });
    btn.classList.add("on");
    var c = btn.getAttribute("data-cat");
    renderFeed(c === "All" ? items : items.filter(function (w) { return w.domain === c; }), mountId);
  });
}

/* ---------- article page ---------- */

function initProgress() {
  var bar = document.querySelector(".w-progress > i");
  if (!bar) return;
  function update() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
  }
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* fills the byline from the post body word count */
function initByline(dateStr) {
  var body = document.querySelector(".w-body");
  var meta = document.getElementById("byline-meta");
  var av = document.getElementById("byline-avatar");
  var nm = document.getElementById("byline-name");
  if (av) av.textContent = initials(AUTHOR);
  if (nm) nm.textContent = AUTHOR;
  if (!body || !meta) return;
  var words = body.textContent.trim().split(/\s+/).length;
  var mins = Math.max(1, Math.round(words / 200));
  meta.textContent = prettyDate(dateStr) + " · " + mins + " min read";
}

/* "More from" block at the end of an article */
function renderMore(currentSlug, mountId, n) {
  var el = document.getElementById(mountId);
  if (!el || typeof WRITEUPS === "undefined") return;
  var rest = WRITEUPS.filter(function (w) { return w.slug !== currentSlug; });
  if (!rest.length) { el.innerHTML = ""; return; }
  renderFeed(rest.slice(0, n || 2), mountId);
}
