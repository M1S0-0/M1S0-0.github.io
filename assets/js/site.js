/* =============================================================
   m1s0 — Home + Writeups
   No dependencies. Every interpolated value passes through esc().
   ============================================================= */

var AUTHOR = "M1S0";

function esc(v) {
  if (v === null || v === undefined) return "";
  return String(v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------- theme ---------- */

function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  try { localStorage.setItem("theme", t); } catch (e) {}
  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.textContent = t === "dark" ? "☀" : "☾";
    btn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
}

function initTheme() {
  var saved;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  applyTheme(saved || "light");
  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }
}

/* ---------- helpers ---------- */

function hueOf(str) {
  var h = 0;
  for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
}

function gradientOf(slug) {
  var h = hueOf(slug);
  return "linear-gradient(135deg, hsl(" + h + ",58%,44%), hsl(" + ((h + 46) % 360) + ",54%,25%))";
}

function initials(name) {
  var clean = name.replace(/[^A-Za-z0-9]/g, "");
  return clean.slice(0, 2).toUpperCase();
}

function bylineHtml() {
  return '<div class="byline">' +
           '<span class="avatar">' + esc(initials(AUTHOR)) + "</span>" +
           "<span>" + esc(AUTHOR) + "</span>" +
         "</div>";
}

function metaHtml(w) {
  var bits = [];

  if (w.severity) {
    bits.push('<span class="sev sev-' + esc(w.severity.toLowerCase()) + '">' + esc(w.severity) + "</span>");
  }
  if (w.cve) {
    bits.push('<span class="chip-cve">' + esc(w.cve) + "</span>");
  }
  if (w.tags && w.tags[0]) {
    bits.push('<span class="chip">' + esc(w.tags[0]) + "</span>");
  }

  return '<div class="meta">' + bits.join("") + "</div>";
}

function sortedPosts(items) {
  return items.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
}

/* ---------- feed ---------- */

function renderFeed(items, mountId, opts) {
  var el = document.getElementById(mountId);
  if (!el) return;
  opts = opts || {};

  var list = opts.presorted ? items.slice() : sortedPosts(items);
  var q = opts.query || "";

  if (!list.length) {
    el.innerHTML =
      '<div class="empty">' +
        "<b>Nothing matches that.</b>" +
        "<span>Try a different term, or clear the filters.</span>" +
        '<button type="button" data-reset>Clear filters</button>' +
      "</div>";
    var btn = el.querySelector("[data-reset]");
    if (btn && typeof window.__writeupsReset === "function") {
      btn.addEventListener("click", window.__writeupsReset);
    }
    return;
  }

  el.innerHTML = list.map(function (w) {
    var label = (w.tags && w.tags[0]) ? w.tags[0] : "";


    /* program line, only when the post declares one */
    var program = "";
    if (w.program) {
      program = '<span class="program">' + esc(w.program) +
                (w.target ? " &middot; " + esc(w.target) : "") + "</span>";
    }

    /* remaining tags under the meta row */
    var extra = "";
    if (opts.allTags && w.tags && w.tags.length > 1) {
      extra = '<div class="item-tags">' +
        w.tags.slice(1).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") +
        "</div>";
    }

    return            '<a class="item" href="/writeups/posts/' + esc(w.slug) + '.html">' +
             '<div class="item-main">' +
               bylineHtml() +
               program +
               "<h3>" + markMatch(w.title, q) + "</h3>" +
               "<p>" + markMatch(w.subtitle || w.summary || "", q) + "</p>" +
               metaHtml(w) +
               extra +
             "</div>" +
             '<div class="thumb" style="background:' + gradientOf(w.slug) + '">' +
               "<span>" + esc(label) + "</span>" +
             "</div>" +
           "</a>";
  }).join("");
}

/* ---------- reading progress ---------- */

function initProgress() {
  var bar = document.querySelector(".progress > i");
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

/* ---------- byline on an article ---------- */

function initByline() {
  var av = document.getElementById("byline-avatar");
  var nm = document.getElementById("byline-name");
  if (av) av.textContent = initials(AUTHOR);
  if (nm) nm.textContent = AUTHOR;
}

/* ---------- syntax highlighting ----------
   Deliberately small. Strings are matched BEFORE comments so that a
   URL like https://x.y inside quotes is not mistaken for a // comment.
------------------------------------------- */

var KEYWORDS = /\b(?:function|return|if|else|for|while|require|revert|assert|emit|new|delete|try|catch|throw|public|private|internal|external|view|pure|payable|memory|storage|calldata|constant|immutable|contract|interface|library|struct|enum|mapping|modifier|event|constructor|is|import|pragma|using|var|let|const|class|def|echo|curl|sudo|apt|git|npm|node|python3?)\b/;
var TYPES = /\b(?:uint\d*|int\d*|address|bool|bytes\d*|string|void|true|false|null|undefined|this|msg|block|tx)\b/;

function highlightCode(text) {
  var master = new RegExp(
    "(" + /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/.source + ")" +   // 1 string
    "|(" + /\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*/.source + ")" +  // 2 comment
    "|(" + KEYWORDS.source + ")" +                                // 3 keyword
    "|(" + TYPES.source + ")" +                                   // 4 type
    "|(" + /\b0x[0-9a-fA-F]+\b|\b\d+(?:\.\d+)?\b/.source + ")",   // 5 number
    "g"
  );

  var out = "";
  var last = 0;
  var m;
  while ((m = master.exec(text)) !== null) {
    out += esc(text.slice(last, m.index));
    var cls = m[1] ? "string" : m[2] ? "comment" : m[3] ? "keyword" : m[4] ? "type" : "number";
    out += '<span class="tok-' + cls + '">' + esc(m[0]) + "</span>";
    last = m.index + m[0].length;
  }
  out += esc(text.slice(last));
  return out;
}

/* ---------- code blocks: highlight + copy button ---------- */

function initCodeBlocks() {
  var pres = document.querySelectorAll(".body pre");
  Array.prototype.forEach.call(pres, function (pre) {
    var code = pre.querySelector("code") || pre;
    var raw = code.textContent;

    code.innerHTML = highlightCode(raw);

    var wrap = document.createElement("div");
    wrap.className = "codewrap";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    var btn = document.createElement("button");
    btn.className = "copy";
    btn.type = "button";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var done = function () {
        btn.textContent = "Copied";
        btn.classList.add("done");
        setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1600);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(raw).then(done, function () {});
      } else {
        var ta = document.createElement("textarea");
        ta.value = raw;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
    wrap.appendChild(btn);
  });
}

/* ---------- table of contents ---------- */

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function initTOC(mountId) {
  var el = document.getElementById(mountId);
  var heads = document.querySelectorAll(".body h2");
  if (!el || heads.length < 3) { if (el) el.style.display = "none"; return; }

  var links = [];
  el.innerHTML = '<div class="toc-label">Contents</div>' +
    Array.prototype.map.call(heads, function (h) {
      var id = h.id || slugify(h.textContent);
      h.id = id;
      h.insertBefore(Object.assign(document.createElement("a"), {
        className: "anchor", href: "#" + id, textContent: "#"
      }), h.firstChild);
      return '<a href="#' + esc(id) + '" data-id="' + esc(id) + '">' + esc(h.textContent.replace(/^#/, "")) + "</a>";
    }).join("");

  links = el.querySelectorAll("a[data-id]");

  function onScroll() {
    var best = null;
    Array.prototype.forEach.call(heads, function (h) {
      if (h.getBoundingClientRect().top <= 120) best = h.id;
    });
    Array.prototype.forEach.call(links, function (a) {
      a.classList.toggle("on", a.getAttribute("data-id") === best);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- share ---------- */

function initShare(title) {
  var x = document.getElementById("share-x");
  var copy = document.getElementById("share-copy");
  var url = window.location.href;

  if (x) {
    x.href = "https://twitter.com/intent/tweet?text=" +
             encodeURIComponent(title) + "&url=" + encodeURIComponent(url);
    x.target = "_blank";
    x.rel = "noopener";
  }
  if (copy) {
    copy.addEventListener("click", function () {
      var done = function () {
        copy.textContent = "Link copied";
        copy.classList.add("done");
        setTimeout(function () { copy.textContent = "Copy link"; copy.classList.remove("done"); }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () {});
    });
  }
}

/* ---------- prev / next ---------- */

function initPrevNext(currentSlug, mountId) {
  var el = document.getElementById(mountId);
  if (!el || typeof WRITEUPS === "undefined") return;

  var list = sortedPosts(WRITEUPS);
  var i = list.findIndex(function (w) { return w.slug === currentSlug; });
  if (i === -1) { el.innerHTML = ""; return; }

  var newer = list[i - 1];
  var older = list[i + 1];
  var html = "";

  if (older) {
    html += '<a class="pn prev" href="/writeups/posts/' + esc(older.slug) + '.html">' +
              "<small>Older</small><strong>" + esc(older.title) + "</strong></a>";
  }
  if (newer) {
    html += '<a class="pn next" href="/writeups/posts/' + esc(newer.slug) + '.html">' +
              "<small>Newer</small><strong>" + esc(newer.title) + "</strong></a>";
  }
  el.innerHTML = html;
}

/* ---------- more from ---------- */

function renderMore(currentSlug, mountId, n) {
  var el = document.getElementById(mountId);
  if (!el || typeof WRITEUPS === "undefined") return;
  var rest = WRITEUPS.filter(function (w) { return w.slug !== currentSlug; });
  if (!rest.length) { el.innerHTML = ""; return; }
  renderFeed(sortedPosts(rest).slice(0, n || 2), mountId);
}

/* ---------- scroll to top ---------- */

function initToTop() {
  var btn = document.getElementById("totop");
  if (!btn) return;
  btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  window.addEventListener("scroll", function () {
    btn.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
}

/* ---------- one call to set up an article page ---------- */

function initArticle(opts) {
  initTheme();
  initProgress();
  initByline();

  renderSeries(opts.slug, "series");

  initCodeBlocks();
  initCodeTitles();          /* must run after initCodeBlocks builds .codewrap */
  initTOC("toc");

  initShare(opts.title);
  renderAuthorBox("authorbox");
  initPrevNext(opts.slug, "prevnext");
  renderMore(opts.slug, "more", 2);

  initReveal();
  initToTop();
}

/* ---------- scroll reveal ----------
   Adds .in when an element scrolls into view. Anything already in the
   first viewport is revealed immediately so nothing sits invisible.
------------------------------------- */

function initReveal() {
  var els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(els, function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -40px 0px", threshold: 0.05 });

  Array.prototype.forEach.call(els, function (el, i) {
    el.style.transitionDelay = Math.min(i, 5) * 45 + "ms";
    io.observe(el);
  });
}


/* =============================================================
   Article detail
   ============================================================= */

function findPost(slug) {
  if (typeof WRITEUPS === "undefined") return null;
  for (var i = 0; i < WRITEUPS.length; i++) {
    if (WRITEUPS[i].slug === slug) return WRITEUPS[i];
  }
  return null;
}

/* series banner, if the post declares one */
function renderSeries(slug, mountId) {
  var el = document.getElementById(mountId);
  var w = findPost(slug);
  if (!el) return;
  if (!w || !w.series) { el.style.display = "none"; return; }
  el.className = "series";
  el.innerHTML = "<span>Part <b>" + esc(w.series.part) + "</b> of</span><span>" + esc(w.series.name) + "</span>";
}

/* author box at the end of an article */
function renderAuthorBox(mountId) {
  var el = document.getElementById(mountId);
  if (!el) return;
  el.className = "authorbox";
  el.innerHTML =
    '<span class="avatar">' + esc(initials(AUTHOR)) + "</span>" +
    '<div class="authorbox-main">' +
      "<h4>" + esc(AUTHOR) + "</h4>" +
      "<p>Security researcher working across smart contract auditing and web application " +
      "vulnerability research. I write up how the bugs were actually found, not just what they were.</p>" +
      '<div class="authorbox-links">' +
        '<a href="/writeups/">All writeups</a>' +
        '<a href="https://github.com/M1S0-0" rel="noopener">GitHub</a>' +
        '<a href="mailto:unknowbughunter@gmail.com">Email</a>' +
        '<a href="/feed.xml">RSS</a>' +
      "</div>" +
    "</div>";
}

/* filename bar on a <pre data-file="Vault.sol"> */
function initCodeTitles() {
  var wraps = document.querySelectorAll(".codewrap");
  Array.prototype.forEach.call(wraps, function (wrap) {
    var pre = wrap.querySelector("pre");
    if (!pre) return;
    var file = pre.getAttribute("data-file");
    var lang = pre.getAttribute("data-lang");
    if (!file && !lang) return;

    var head = document.createElement("div");
    head.className = "codehead";
    head.innerHTML = "<span>" + esc(file || "") + "</span><span>" + esc(lang || "") + "</span>";
    wrap.insertBefore(head, pre);
    wrap.classList.add("titled");
  });
}

/* =============================================================
   Writeups index controller
   Search + tag + sort, mirrored into the URL hash so a filtered
   view can be linked and survives a reload.
   ============================================================= */

var SEV_RANK = { Critical: 0, High: 1, Medium: 2, Low: 3, Info: 4 };

/* wraps matches in <mark> without ever injecting raw input */
function markMatch(text, q) {
  if (!q) return esc(text);
  var lower = String(text).toLowerCase();
  var needle = q.toLowerCase();
  var out = "";
  var i = 0;
  while (true) {
    var at = lower.indexOf(needle, i);
    if (at === -1) { out += esc(String(text).slice(i)); break; }
    out += esc(String(text).slice(i, at));
    out += "<mark>" + esc(String(text).substr(at, needle.length)) + "</mark>";
    i = at + needle.length;
  }
  return out;
}

/* maps a category key to its display label */
function categoryLabel(key) {
  if (!key || typeof CATEGORIES === "undefined") return "";
  for (var i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].key === key) return CATEGORIES[i].label;
  }
  return key;
}

/* The newest post by date. Publishing a new writeup promotes it here
   automatically, whatever category it is in. */
function heroCard(w, mountId) {
  var el = document.getElementById(mountId);
  if (!el || !w) { if (el) el.innerHTML = ""; return; }

  var label = (w.tags && w.tags[0]) ? w.tags[0] : "";
  var cat = categoryLabel(w.category);

  el.innerHTML =
    '<a class="hero-post" href="/writeups/posts/' + esc(w.slug) + '.html">' +
      '<div class="hero-main">' +
        '<div class="hero-badges">' +
          '<span class="hero-badge">Latest</span>' +
          (cat ? '<span class="hero-cat">' + esc(cat) + "</span>" : "") +
        "</div>" +
        "<h2>" + esc(w.title) + "</h2>" +
        "<p>" + esc(w.subtitle) + "</p>" +
        metaHtml(w) +
      "</div>" +
      '<div class="hero-art" style="background:' + gradientOf(w.slug) + '">' +
        "<span>" + esc(label) + "</span>" +
      "</div>" +
    "</a>";
}

function initWriteupsPage(items, opts) {
  var input = document.getElementById(opts.inputId);
  var clearBtn = document.getElementById(opts.clearId);
  var catbar = document.getElementById(opts.catbarId);
  var filterClear = document.getElementById(opts.clearFiltersId);
  var sortBtn = document.getElementById(opts.sortId);
  var countEl = document.getElementById(opts.countId);
  var mount = opts.mountId;

  var SORTS = [
    { key: "newest", label: "Newest first" },
    { key: "oldest", label: "Oldest first" },
    { key: "severity", label: "By severity" }
  ];

  var state = { q: "", cat: "all", sort: "newest" };

  /* ---- url hash <-> state ---- */
  function readHash() {
    var h = (location.hash || "").replace(/^#/, "");
    if (!h) return;
    h.split("&").forEach(function (pair) {
      var kv = pair.split("=");
      var k = decodeURIComponent(kv[0] || "");
      var v = decodeURIComponent(kv[1] || "");
      if (k === "q") state.q = v;
      if (k === "cat") state.cat = v;
      if (k === "sort" && SORTS.some(function (s) { return s.key === v; })) state.sort = v;
    });
  }

  function writeHash() {
    var parts = [];
    if (state.q) parts.push("q=" + encodeURIComponent(state.q));
    if (state.cat !== "all") parts.push("cat=" + encodeURIComponent(state.cat));
    if (state.sort !== "newest") parts.push("sort=" + encodeURIComponent(state.sort));
    var next = parts.length ? "#" + parts.join("&") : " ";
    history.replaceState(null, "", location.pathname + (parts.length ? next : ""));
  }

  /* ---- category buttons, with a count each ---- */
  function buildCats() {
    if (!catbar) return;
    var counts = {};
    items.forEach(function (w) {
      if (w.category) counts[w.category] = (counts[w.category] || 0) + 1;
    });

    var list = (typeof CATEGORIES !== "undefined" ? CATEGORIES : []);

    catbar.innerHTML =
      '<button class="catbtn" data-cat="all">All<b>' + items.length + "</b></button>" +
      list.map(function (c) {
        var n = counts[c.key] || 0;
        return '<button class="catbtn" data-cat="' + esc(c.key) + '">' +
                 esc(c.label) + "<b>" + n + "</b></button>";
      }).join("");
  }

  function paintCats() {
    if (catbar) {
      Array.prototype.forEach.call(catbar.querySelectorAll(".catbtn"), function (b) {
        b.classList.toggle("on", b.getAttribute("data-cat") === state.cat);
      });
    }
    if (filterClear) filterClear.classList.toggle("show", state.cat !== "all" || !!state.q);
  }

  /* ---- filter + sort + render ---- */
  function apply(pushHash) {
    var q = state.q.trim().toLowerCase();

    var out = items.filter(function (w) {
      if (state.cat !== "all" && w.category !== state.cat) return false;
      if (!q) return true;
      var hay = [w.title, w.subtitle, (w.tags || []).join(" "),
                 w.program, w.target, w.cve, w.platform, w.severity]
        .filter(Boolean).join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    if (state.sort === "oldest") {
      out = out.slice().sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
    } else if (state.sort === "severity") {
      out = out.slice().sort(function (a, b) {
        var ra = a.severity ? SEV_RANK[a.severity] : 9;
        var rb = b.severity ? SEV_RANK[b.severity] : 9;
        return ra - rb || String(b.date).localeCompare(String(a.date));
      });
    } else {
      out = sortedPosts(out);
    }

    renderFeed(out, mount, {
      presorted: true,
      allTags: true,
      query: state.q.trim()
    });

    if (countEl) {
      countEl.textContent = out.length === items.length
        ? items.length + (items.length === 1 ? " writeup" : " writeups")
        : out.length + " of " + items.length;
    }

    if (clearBtn) clearBtn.classList.toggle("show", !!state.q);
    paintCats();
    if (pushHash !== false) writeHash();
  }

  function reset() {
    state.q = ""; state.cat = "all";
    if (input) input.value = "";
    apply();
  }
  window.__writeupsReset = reset;   /* used by the empty-state button */

  /* ---- wire up ---- */
  buildCats();
  readHash();
  if (input) input.value = state.q;
  if (sortBtn) {
    sortBtn.textContent = (SORTS.filter(function (s) { return s.key === state.sort; })[0] || SORTS[0]).label;
    sortBtn.addEventListener("click", function () {
      var i = 0;
      SORTS.forEach(function (s, n) { if (s.key === state.sort) i = n; });
      var next = SORTS[(i + 1) % SORTS.length];
      state.sort = next.key;
      sortBtn.textContent = next.label;
      apply();
    });
  }

  if (input) {
    input.addEventListener("input", function () { state.q = input.value; apply(); });
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      state.q = ""; input.value = ""; input.focus(); apply();
    });
  }
  if (filterClear) filterClear.addEventListener("click", reset);

  if (catbar) {
    catbar.addEventListener("click", function (e) {
      var btn = e.target.closest(".catbtn");
      if (!btn) return;
      var c = btn.getAttribute("data-cat");
      state.cat = (state.cat === c && c !== "all") ? "all" : c;   /* click again to unset */
      apply();
    });
  }

  /* keyboard: / focuses search, Escape clears it */
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== input) {
      e.preventDefault();
      if (input) input.focus();
    } else if (e.key === "Escape" && document.activeElement === input) {
      state.q = ""; input.value = ""; input.blur(); apply();
    }
  });

  /* shadow under the control bar once it sticks */
  var controls = document.querySelector(".controls");
  if (controls) {
    window.addEventListener("scroll", function () {
      controls.classList.toggle("stuck", controls.getBoundingClientRect().top <= 58);
    }, { passive: true });
  }

  apply(false);
}

/* =============================================================
   HOME — hall of fame chain + stats
   ============================================================= */

function hofOf(group) {
  if (typeof HALLOFFAME === "undefined") return [];
  return HALLOFFAME.filter(function (h) { return h.group === group; });
}


/* first letter of the first two words: "Example Corporation" -> "EC" */
function orgMonogram(name) {
  var words = String(name).trim().split(/[\s\-_.]+/).filter(Boolean);
  if (!words.length) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/* one company on the wall: logo (or a monogram) above the name */
function hofCard(h) {
  var isPrivate = h.visibility === "private";

  var mark;
  if (isPrivate) {
    mark = '<div class="logo-mark"><span class="logo-mono">&#128274;</span></div>';
  } else if (h.logo) {
    mark = '<div class="logo-mark"><img src="' + esc(h.logo) +
           '" alt="' + esc(h.org || "") + ' logo" loading="lazy"></div>';
  } else {
    /* no logo supplied yet: initials, so the wall never shows a broken image */
    mark = '<div class="logo-mark"><span class="logo-mono">' +
           esc(orgMonogram(h.org || "?")) + "</span></div>";
  }

  var name = isPrivate
    ? '<div class="logo-name">Private program</div>'
    : '<div class="logo-name">' + esc(h.org || "Unnamed") + "</div>";

  var body =
    mark +
    name +
    (!isPrivate && h.detail ? '<div class="logo-detail">' + esc(h.detail) + "</div>" : "") +
    '<div class="logo-foot">' +
      (h.kind ? '<span class="kind">' + esc(h.kind) + "</span>" : "") +
      (h.year ? '<span class="block-year">' + esc(h.year) + "</span>" : "") +
    "</div>";

  var cls = "logo-card" + (isPrivate ? " is-private" : "");

  if (!isPrivate && h.proof) {
    return '<a class="' + cls + '" href="' + esc(h.proof) + '" rel="noopener">' + body + "</a>";
  }
  return '<div class="' + cls + '">' + body + "</div>";
}

function renderHallOfFame(mountId) {
  var el = document.getElementById(mountId);
  if (!el || typeof HOF_GROUPS === "undefined") return;

  el.innerHTML = HOF_GROUPS.map(function (g) {
    var rows = hofOf(g.key);
    if (!rows.length) return "";

    /* named entries lead, private ones follow */
    rows = rows.slice().sort(function (a, b) {
      var av = a.visibility === "private" ? 1 : 0;
      var bv = b.visibility === "private" ? 1 : 0;
      return av - bv || String(b.year || "").localeCompare(String(a.year || ""));
    });

    return '<section class="hof-section reveal">' +
             '<div class="hof-head">' +
               "<h2>" + esc(g.label) + "</h2>" +
               '<span class="note">' + esc(g.note || "") + "</span>" +
               '<span class="n">' + rows.length + "</span>" +
             "</div>" +
             '<div class="logo-grid">' + rows.map(hofCard).join("") + "</div>" +
           "</section>";
  }).join("");
}
