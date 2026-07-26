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

function prettyDate(d) {
  var p = String(d).split("-");
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var m = months[parseInt(p[1], 10) - 1] || "";
  return p[2] ? m + " " + parseInt(p[2], 10) + ", " + p[0] : m + " " + p[0];
}

function readTimeOf(w) {
  if (w.readTime) return w.readTime;
  var words = ((w.summary || "") + " " + (w.subtitle || "")).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200)) + " min read";
}

function bylineHtml() {
  return '<div class="byline">' +
           '<span class="avatar">' + esc(initials(AUTHOR)) + "</span>" +
           "<span>" + esc(AUTHOR) + "</span>" +
         "</div>";
}

function metaHtml(w) {
  var tag = (w.tags && w.tags[0]) ? '<span class="chip">' + esc(w.tags[0]) + "</span>" : "";
  return '<div class="meta">' +
           "<span>" + esc(prettyDate(w.date)) + "</span>" +
           '<span class="dot">&middot;</span>' +
           "<span>" + esc(readTimeOf(w)) + "</span>" +
           (tag ? '<span class="dot">&middot;</span>' + tag : "") +
         "</div>";
}

function sortedPosts(items) {
  return items.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
}

/* ---------- feed ---------- */

function renderFeed(items, mountId) {
  var el = document.getElementById(mountId);
  if (!el) return;

  var list = sortedPosts(items);
  if (!list.length) {
    el.innerHTML = '<p class="empty">// nothing matches</p>';
    return;
  }

  el.innerHTML = list.map(function (w) {
    var label = (w.tags && w.tags[0]) ? w.tags[0] : "";
    return '<a class="item" href="/writeups/posts/' + esc(w.slug) + '.html">' +
             '<div class="item-main">' +
               bylineHtml() +
               "<h3>" + esc(w.title) + "</h3>" +
               "<p>" + esc(w.subtitle || w.summary) + "</p>" +
               metaHtml(w) +
             "</div>" +
             '<div class="thumb" style="background:' + gradientOf(w.slug) + '">' +
               "<span>" + esc(label) + "</span>" +
             "</div>" +
           "</a>";
  }).join("");
}

/* big card for the newest post */
function renderFeatured(items, mountId) {
  var el = document.getElementById(mountId);
  if (!el) return;
  var w = sortedPosts(items)[0];
  if (!w) { el.innerHTML = ""; return; }
  var label = (w.tags && w.tags[0]) ? w.tags[0] : "";

  el.innerHTML =
    '<a class="featured" href="/writeups/posts/' + esc(w.slug) + '.html">' +
      '<span class="featured-badge">Latest</span>' +
      '<div class="featured-art" style="background:' + gradientOf(w.slug) + '">' +
        "<span>" + esc(label) + "</span>" +
      "</div>" +
      "<h2>" + esc(w.title) + "</h2>" +
      "<p>" + esc(w.subtitle || w.summary) + "</p>" +
      metaHtml(w) +
    "</a>";
  return w.slug;
}

/* ---------- search + tag filter ---------- */

function initSearch(items, opts) {
  var input = document.getElementById(opts.inputId);
  var bar = document.getElementById(opts.tagbarId);
  var countEl = document.getElementById(opts.countId);
  var activeTag = "All";

  var tags = ["All"];
  items.forEach(function (w) {
    (w.tags || []).forEach(function (t) { if (tags.indexOf(t) === -1) tags.push(t); });
  });

  if (bar) {
    bar.innerHTML = tags.map(function (t, i) {
      return '<button class="tagbtn' + (i === 0 ? " on" : "") + '" data-tag="' + esc(t) + '">' + esc(t) + "</button>";
    }).join("");
  }

  function apply() {
    var q = input ? input.value.trim().toLowerCase() : "";
    var out = items.filter(function (w) {
      var tagOk = activeTag === "All" || (w.tags || []).indexOf(activeTag) !== -1;
      if (!tagOk) return false;
      if (!q) return true;
      var hay = (w.title + " " + (w.subtitle || "") + " " + (w.tags || []).join(" ")).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    renderFeed(out, opts.mountId);
    if (countEl) {
      countEl.textContent = out.length + (out.length === 1 ? " writeup" : " writeups");
    }
  }

  if (input) input.addEventListener("input", apply);
  if (bar) {
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".tagbtn");
      if (!btn) return;
      Array.prototype.forEach.call(bar.querySelectorAll(".tagbtn"), function (b) { b.classList.remove("on"); });
      btn.classList.add("on");
      activeTag = btn.getAttribute("data-tag");
      apply();
    });
  }

  apply();
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

function initByline(dateStr) {
  var body = document.querySelector(".body");
  var av = document.getElementById("byline-avatar");
  var nm = document.getElementById("byline-name");
  var meta = document.getElementById("byline-meta");
  if (av) av.textContent = initials(AUTHOR);
  if (nm) nm.textContent = AUTHOR;
  if (!body || !meta) return;
  var words = body.textContent.trim().split(/\s+/).length;
  meta.textContent = prettyDate(dateStr) + " · " + Math.max(1, Math.round(words / 200)) + " min read";
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
  initByline(opts.date);
  initCodeBlocks();
  initTOC("toc");
  initShare(opts.title);
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

/* counts shown on the home stat line */
function renderStatline(mountId) {
  var el = document.getElementById(mountId);
  if (!el || typeof WRITEUPS === "undefined") return;

  var tags = {};
  WRITEUPS.forEach(function (w) { (w.tags || []).forEach(function (t) { tags[t] = 1; }); });

  var years = {};
  WRITEUPS.forEach(function (w) { years[String(w.date).slice(0, 4)] = 1; });

  var cells = [
    [WRITEUPS.length, WRITEUPS.length === 1 ? "Writeup" : "Writeups"],
    [Object.keys(tags).length, "Topics"],
    [Object.keys(years).length, Object.keys(years).length === 1 ? "Year" : "Years"]
  ];

  el.innerHTML = cells.map(function (c) {
    return "<div><strong>" + esc(c[0]) + "</strong><span>" + esc(c[1]) + "</span></div>";
  }).join("");
}
