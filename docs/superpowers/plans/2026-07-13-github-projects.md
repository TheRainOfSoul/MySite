# GitHub Projects Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio's Projects section auto-populate from the user's GitHub repos (public + private) with short descriptions, served safely via a Netlify serverless proxy.

**Architecture:** A Netlify Function (`netlify/functions/projects.js`) holds the GitHub token server-side, fetches all owned repos, adds README-derived descriptions where missing, and returns a token-free JSON. A client module (`github-projects.js`) fetches that JSON, renders cards/modal, caches in localStorage, and falls back to the public GitHub API for local dev. The three hardcoded placeholder cards are removed.

**Tech Stack:** Static HTML/CSS/vanilla JS, Netlify Functions (Node 18+, global `fetch`, zero dependencies), GitHub REST API.

## Global Constraints

- No secrets in any client-shipped file. The GitHub token lives ONLY in Netlify env vars (`GITHUB_TOKEN`).
- Node runtime for functions: 18+ (use global `fetch`, no `node-fetch` dependency).
- Description text is shown as-is (single language); only UI labels are translated (RU/EN/HY).
- Private repos: show all except server-side `EXCLUDE_REPOS`. Private cards have NO GitHub link (would 404) and NO OG image; use gradient placeholder + 🔒 Private badge.
- Follow existing code style: vanilla JS, no build step, no framework, no npm dependencies for the site itself.
- GitHub username: `TheRainOfSoul`.

---

### Task 1: Netlify serverless function + config

**Files:**
- Create: `netlify/functions/projects.js`
- Create: `netlify.toml`
- Test: `netlify/functions/projects.test.mjs` (uses built-in `node:test`)

**Interfaces:**
- Produces: HTTP endpoint returning `{ projects: Project[] }` where
  `Project = { name, title, description, language, topics, stars, updated, htmlUrl, homepage, isPrivate, ogImage }`.
  `htmlUrl` and `ogImage` are `null` for private repos.
- Produces (for the test): pure helper `firstMeaningfulLine(markdown) -> string`, exported for unit testing.

- [ ] **Step 1: Write the failing test for the README parser**

Create `netlify/functions/projects.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { firstMeaningfulLine } from "./projects.js";

test("skips headings, badges, and images; returns first prose line", () => {
  const md = [
    "# My Project",
    "",
    "![badge](https://img)",
    "[![ci](https://a)](https://b)",
    "",
    "A small tool that **does** things and [links](http://x).",
  ].join("\n");
  assert.equal(firstMeaningfulLine(md), "A small tool that does things and links.");
});

test("returns empty string when nothing meaningful", () => {
  assert.equal(firstMeaningfulLine("# Only a title\n\n"), "");
});

test("truncates long lines to <=140 chars with ellipsis", () => {
  const long = "x".repeat(300);
  const out = firstMeaningfulLine(long);
  assert.ok(out.length <= 140);
  assert.ok(out.endsWith("…"));
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test netlify/functions/`
Expected: FAIL — cannot import `firstMeaningfulLine` (module/file not found).

- [ ] **Step 3: Write `netlify/functions/projects.js`**

```js
const GITHUB_API = "https://api.github.com";

function decodeBase64Utf8(b64) {
  return Buffer.from(String(b64).replace(/\n/g, ""), "base64").toString("utf-8");
}

function firstMeaningfulLine(markdown) {
  const lines = String(markdown).split(/\r?\n/);
  for (let raw of lines) {
    let line = raw.trim();
    if (!line) continue;
    if (line.startsWith("#")) continue;          // heading
    if (line.startsWith("![")) continue;         // image
    if (line.startsWith("[![")) continue;        // badge link
    if (line.startsWith("<")) continue;          // html
    if (line.startsWith(">")) continue;          // blockquote
    if (/^[-=*_]{3,}$/.test(line)) continue;     // horizontal rule
    line = line
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")   // [text](url) -> text
      .replace(/[*_`~]/g, "")                    // emphasis/code
      .trim();
    if (!line) continue;
    if (line.length > 140) line = line.slice(0, 139).trimEnd() + "…";
    return line;
  }
  return "";
}

async function fetchReadmeDescription(owner, name, headers) {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${owner}/${name}/readme`, { headers });
    if (!res.ok) return "";
    const data = await res.json();
    if (!data.content) return "";
    return firstMeaningfulLine(decodeBase64Utf8(data.content));
  } catch {
    return "";
  }
}

function json(statusCode, obj) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };
}

async function handler() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "TheRainOfSoul";
  const exclude = (process.env.EXCLUDE_REPOS || "")
    .split(",").map(s => s.trim().toLowerCase()).filter(Boolean);

  if (!token) return json(500, { error: "GITHUB_TOKEN is not configured" });

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": `${username}-portfolio`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  let repos;
  try {
    const res = await fetch(
      `${GITHUB_API}/user/repos?visibility=all&affiliation=owner&per_page=100&sort=updated`,
      { headers }
    );
    if (!res.ok) return json(502, { error: `GitHub API error: ${res.status}` });
    repos = await res.json();
  } catch {
    return json(502, { error: "Failed to reach GitHub" });
  }

  repos = repos.filter(r =>
    !r.fork && !r.archived && !exclude.includes(r.name.toLowerCase())
  );

  await Promise.allSettled(repos.map(async r => {
    if (!r.description) {
      r._readmeDesc = await fetchReadmeDescription(r.owner.login, r.name, headers);
    }
  }));

  const projects = repos.map(r => ({
    name: r.name,
    title: null,
    description: r.description || r._readmeDesc || "",
    language: r.language || null,
    topics: r.topics || [],
    stars: r.stargazers_count || 0,
    updated: r.pushed_at || r.updated_at,
    htmlUrl: r.private ? null : r.html_url,
    homepage: r.homepage || null,
    isPrivate: !!r.private,
    ogImage: r.private ? null : `https://opengraph.githubassets.com/1/${r.owner.login}/${r.name}`,
  }));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Netlify-CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
    body: JSON.stringify({ projects }),
  };
}

exports.handler = handler;
exports.firstMeaningfulLine = firstMeaningfulLine;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test netlify/functions/`
Expected: PASS (3 tests).

- [ ] **Step 5: Create `netlify.toml`**

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/projects"
  to = "/.netlify/functions/projects"
  status = 200
```

- [ ] **Step 6: Syntax-check the function**

Run: `node --check netlify/functions/projects.js`
Expected: no output, exit 0.

---

### Task 2: Client module `github-projects.js`

**Files:**
- Create: `github-projects.js`

**Interfaces:**
- Consumes: from `script.js` (loaded first) the globals `translations`, `currentLang`, and `window.enhanceProjectCards(nodeList)` (Task 4); DOM ids `#projects-grid`, `#projects-error` (Task 3); the existing modal ids `#project-modal`, `#modal-title`, `#modal-image`, `#modal-description`, `#modal-github`, `#modal-live`.
- Consumes: the `Project` JSON shape from Task 1.
- Produces: renders cards into `#projects-grid`; wires card clicks to the modal.

- [ ] **Step 1: Write the module**

```js
// github-projects.js — auto-populates the Projects section from GitHub.
const PROJECTS_CONFIG = {
  endpoint: "/api/projects",           // Netlify proxy (holds the token server-side)
  cacheMinutes: 60,                    // localStorage cache TTL
  fallbackUsername: "TheRainOfSoul",   // public-only fallback for local dev (no function)
  overrides: {
    // "repo-name": { title, description, live, tags: ["a","b"], order: 1, hide: true }
  },
};

const CACHE_KEY = "gh_projects_cache_v1";

function t(key) {
  const dict = (window.translations && window.translations[window.currentLang]) || {};
  return dict[key] || key;
}

function prettifyName(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

function applyOverrides(projects) {
  const ov = PROJECTS_CONFIG.overrides || {};
  return projects
    .map(p => {
      const o = ov[p.name] || {};
      return {
        ...p,
        title: o.title || p.title || prettifyName(p.name),
        description: o.description || p.description || "",
        homepage: o.live || p.homepage || null,
        topics: o.tags || p.topics || [],
        _order: typeof o.order === "number" ? o.order : null,
        _hide: !!o.hide,
      };
    })
    .filter(p => !p._hide)
    .sort((a, b) => {
      if (a._order != null && b._order != null) return a._order - b._order;
      if (a._order != null) return -1;
      if (b._order != null) return 1;
      return new Date(b.updated) - new Date(a.updated);
    });
}

function describeGeneric(p) {
  if (p.description) return p.description;
  if (p.language) return `${p.language} ${t("proj_project_word")}`;
  return t("proj_no_desc");
}

function fmtDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(
      window.currentLang === "en" ? "en-US" : window.currentLang === "hy" ? "hy-AM" : "ru-RU",
      { year: "numeric", month: "short", day: "numeric" }
    );
  } catch { return ""; }
}

function cardImage(p) {
  if (p.ogImage) {
    return `<img class="project-og" src="${p.ogImage}" alt="${p.title}" loading="lazy"
      onerror="this.parentElement.classList.add('no-img'); this.remove();">`;
  }
  return "";
}

function buildCard(p) {
  const el = document.createElement("div");
  el.className = "glass-card project-card fade-in tilt-card" + (p.ogImage ? "" : " no-img");
  el.dataset.name = p.name;
  const tags = (p.topics || []).slice(0, 4)
    .concat(p.language && !(p.topics || []).includes(p.language) ? [p.language] : [])
    .slice(0, 4);
  el.innerHTML = `
    <div class="project-img-placeholder">
      ${cardImage(p)}
      <span class="project-img-label">${p.title}</span>
      <div class="project-view-btn">${t("btn_view_project")}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-left: 4px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </div>
    </div>
    <div class="project-content">
      <div class="project-info">
        <h3>${p.title}</h3>
        <p>${describeGeneric(p)}</p>
      </div>
      <div class="project-meta">
        ${p.isPrivate ? `<span class="badge-private">🔒 ${t("proj_private")}</span>` : ""}
        ${p.stars ? `<span class="meta-item">⭐ ${p.stars}</span>` : ""}
        <span class="meta-item">${t("proj_updated")}: ${fmtDate(p.updated)}</span>
      </div>
      <div class="project-tags">
        ${tags.map(tag => `<span>${tag}</span>`).join(" ")}
      </div>
    </div>`;
  el.addEventListener("click", () => openProjectModal(p));
  return el;
}

function openProjectModal(p) {
  const modal = document.getElementById("project-modal");
  document.getElementById("modal-title").textContent = p.title;
  const img = document.getElementById("modal-image");
  img.innerHTML = p.ogImage
    ? `<img src="${p.ogImage}" alt="${p.title}" style="width:100%;border-radius:12px;" onerror="this.remove();">`
    : `<span>${p.title}</span>`;
  const meta = [
    p.isPrivate ? `🔒 ${t("proj_private")}` : "",
    p.language || "",
    p.stars ? `⭐ ${p.stars}` : "",
    `${t("proj_updated")}: ${fmtDate(p.updated)}`,
  ].filter(Boolean).join(" · ");
  document.getElementById("modal-description").innerHTML =
    `<p>${describeGeneric(p)}</p><p class="modal-meta">${meta}</p>`;

  const gh = document.getElementById("modal-github");
  if (p.htmlUrl) { gh.href = p.htmlUrl; gh.style.display = ""; }
  else { gh.style.display = "none"; }

  const live = document.getElementById("modal-live");
  if (p.homepage) { live.href = p.homepage; live.style.display = ""; }
  else { live.style.display = "none"; }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function renderSkeletons(grid) {
  grid.innerHTML = Array.from({ length: 3 }).map(() =>
    `<div class="glass-card project-card skeleton"><div class="project-img-placeholder"></div>
     <div class="project-content"><div class="sk-line"></div><div class="sk-line short"></div></div></div>`
  ).join("");
}

function renderError() {
  const grid = document.getElementById("projects-grid");
  const err = document.getElementById("projects-error");
  grid.innerHTML = "";
  err.innerHTML = `<p>${t("proj_error")}</p>
    <a class="btn btn-outline" target="_blank" rel="noopener"
       href="https://github.com/${PROJECTS_CONFIG.fallbackUsername}">${t("proj_view_profile")}</a>`;
  err.style.display = "block";
}

let LOADED_PROJECTS = null;

function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  const err = document.getElementById("projects-error");
  err.style.display = "none";
  grid.innerHTML = "";
  const prepared = applyOverrides(projects);
  const frag = document.createDocumentFragment();
  prepared.forEach(p => frag.appendChild(buildCard(p)));
  grid.appendChild(frag);
  if (typeof window.enhanceProjectCards === "function") {
    window.enhanceProjectCards(grid.querySelectorAll(".project-card"));
  }
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function writeCache(projects) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), projects }));
  } catch { /* ignore quota */ }
}

async function fetchFromProxy() {
  const res = await fetch(PROJECTS_CONFIG.endpoint, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("proxy " + res.status);
  const data = await res.json();
  if (!Array.isArray(data.projects)) throw new Error("bad shape");
  return data.projects;
}

async function fetchPublicFallback() {
  const res = await fetch(
    `https://api.github.com/users/${PROJECTS_CONFIG.fallbackUsername}/repos?per_page=100&sort=updated`
  );
  if (!res.ok) throw new Error("public " + res.status);
  const repos = await res.json();
  return repos.filter(r => !r.fork && !r.archived).map(r => ({
    name: r.name,
    title: null,
    description: r.description || "",
    language: r.language || null,
    topics: r.topics || [],
    stars: r.stargazers_count || 0,
    updated: r.pushed_at || r.updated_at,
    htmlUrl: r.html_url,
    homepage: r.homepage || null,
    isPrivate: false,
    ogImage: `https://opengraph.githubassets.com/1/${r.owner.login}/${r.name}`,
  }));
}

async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const cache = readCache();
  const fresh = cache && (Date.now() - cache.ts) < PROJECTS_CONFIG.cacheMinutes * 60000;
  if (cache && cache.projects && cache.projects.length) {
    LOADED_PROJECTS = cache.projects;
    renderProjects(cache.projects);
    if (fresh) return;
  } else {
    renderSkeletons(grid);
  }

  try {
    let projects;
    try { projects = await fetchFromProxy(); }
    catch { projects = await fetchPublicFallback(); }
    LOADED_PROJECTS = projects;
    writeCache(projects);
    renderProjects(projects);
  } catch {
    if (cache && cache.projects && cache.projects.length) return; // keep stale
    renderError();
  }
}

// Re-render on language change so labels/dates update (description text stays as-is).
document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("lang-select");
  if (langSelect) langSelect.addEventListener("change", () => {
    if (LOADED_PROJECTS) renderProjects(LOADED_PROJECTS);
  });
  loadProjects();
});
```

- [ ] **Step 2: Syntax-check**

Run: `node --check github-projects.js`
Expected: no output, exit 0.

---

### Task 3: `index.html` — remove placeholders, add dynamic container

**Files:**
- Modify: `index.html` (Projects section ~lines 172-227; script tags ~line 332)

- [ ] **Step 1: Replace the Projects section body**

Replace the entire `<div class="projects-grid"> ... </div>` (the three static `.project-card` blocks) inside `#projects` with:

```html
        <div class="projects-grid" id="projects-grid"></div>
        <div class="projects-error" id="projects-error" style="display:none;"></div>
```

Keep the surrounding `<section id="projects" ...>` and its `<h2 class="section-title ...">` heading unchanged.

- [ ] **Step 2: Add the module script tag**

Change the end-of-body scripts from:

```html
    <script src="script.js"></script>
```

to:

```html
    <script src="script.js"></script>
    <script src="github-projects.js"></script>
```

- [ ] **Step 3: Verify in a browser (deferred to Task 6 end-to-end check)**

No standalone command; verified after Task 4/5 via local static server.

---

### Task 4: `script.js` — remove hardcoded projects, add labels + `enhanceProjectCards`

**Files:**
- Modify: `script.js` (remove `modal_projects` in `ru`/`en`/`hy`; add label keys; add `enhanceProjectCards`)

**Interfaces:**
- Produces: `window.enhanceProjectCards(nodeList)` — applies 3D-tilt, glow tracking, cursor-hover, and fade-in observation to dynamically-added `.project-card` elements.

- [ ] **Step 1: Remove `modal_projects` objects**

Delete the `modal_projects: { ... }` property (and its trailing comma handling) from each of the three language objects (`ru`, `en`, `hy`). The `dynamic_texts` arrays and all other keys stay.

- [ ] **Step 2: Add label keys to each language**

Add these keys inside each language object (translate values as shown):

`ru`:
```js
        proj_updated: "Обновлён",
        proj_private: "Приватный",
        proj_project_word: "проект",
        proj_no_desc: "Описание пока не добавлено.",
        proj_error: "Не удалось загрузить проекты.",
        proj_view_profile: "Открыть профиль на GitHub",
```
`en`:
```js
        proj_updated: "Updated",
        proj_private: "Private",
        proj_project_word: "project",
        proj_no_desc: "No description yet.",
        proj_error: "Could not load projects.",
        proj_view_profile: "Open GitHub profile",
```
`hy`:
```js
        proj_updated: "Թարմացվել է",
        proj_private: "Փակ",
        proj_project_word: "նախագիծ",
        proj_no_desc: "Նկարագրությունը դեռ ավելացված չէ։",
        proj_error: "Չհաջողվեց բեռնել նախագծերը։",
        proj_view_profile: "Բացել GitHub պրոֆիլը",
```

- [ ] **Step 3: Expose globals for the client module**

`github-projects.js` reads `window.translations` and `window.currentLang`. Since `translations` is a top-level `const` and `currentLang` a top-level `let`, add explicit assignments so they are reachable as window properties. After the `let currentLang = 'ru';` line (~line 200) add:

```js
window.translations = translations;
window.currentLang = currentLang;
```

And inside `setLanguage(lang)`, right after `currentLang = lang;`, add:

```js
    window.currentLang = currentLang;
```

- [ ] **Step 4: Add `enhanceProjectCards` near the bottom of `script.js`**

After the IntersectionObserver (`observer`) and `cursor` are defined (they are at module scope), add:

```js
// Apply interactive effects to dynamically-added project cards.
function enhanceProjectCards(cards) {
    cards.forEach(card => {
        // 3D tilt
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const cx = rect.width / 2, cy = rect.height / 2;
            const rx = ((e.clientY - rect.top - cy) / cy) * -5;
            const ry = ((e.clientX - rect.left - cx) / cx) * 5;
            card.style.transform =
                `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
            // glow tracking
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform =
                `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
        });
        // custom cursor hover state
        card.addEventListener('mouseover', () => cursor.classList.add('hover'));
        card.addEventListener('mouseout', () => cursor.classList.remove('hover'));
        // scroll-reveal
        observer.observe(card);
    });
}
window.enhanceProjectCards = enhanceProjectCards;
```

- [ ] **Step 5: Syntax-check**

Run: `node --check script.js`
Expected: no output, exit 0.

---

### Task 5: `styles.css` — skeleton, private badge, meta, error, image

**Files:**
- Modify: `styles.css` (append new rules)

- [ ] **Step 1: Append styles**

```css
/* --- GitHub projects: dynamic cards --- */
.project-og {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; border-radius: inherit;
}
.project-card .project-img-placeholder { position: relative; overflow: hidden; }
.project-card .project-img-label {
    position: absolute; bottom: 10px; left: 14px; z-index: 2;
    font-weight: 600; opacity: 0; transition: opacity .3s;
}
.project-card.no-img .project-img-label { opacity: .85; }

.project-meta {
    display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
    margin: 10px 0; font-size: .82rem; opacity: .8;
}
.project-meta .badge-private {
    padding: 2px 8px; border-radius: 999px;
    background: rgba(255,180,0,.15); color: #ffb400;
    font-weight: 600;
}
.modal-meta { font-size: .85rem; opacity: .7; margin-top: 12px; }

/* skeletons */
.project-card.skeleton { pointer-events: none; }
.project-card.skeleton .project-img-placeholder { min-height: 160px; }
.skeleton .sk-line, .project-card.skeleton .project-img-placeholder {
    background: linear-gradient(90deg, rgba(255,255,255,.06) 25%, rgba(255,255,255,.14) 37%, rgba(255,255,255,.06) 63%);
    background-size: 400% 100%; animation: sk-shimmer 1.4s ease infinite; border-radius: 8px;
}
.skeleton .sk-line { height: 14px; margin: 12px 16px; }
.skeleton .sk-line.short { width: 60%; }
@keyframes sk-shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }

/* error state */
.projects-error { text-align: center; padding: 2rem; opacity: .85; }
.projects-error .btn { margin-top: 1rem; }
```

- [ ] **Step 2: Verify CSS loads (end-to-end in next step)**

---

### Task 6: End-to-end verification, git init, GitHub repo, push

**Files:**
- Create: `.gitignore`
- Create: `DEPLOY.md` (Netlify + token setup instructions)

- [ ] **Step 1: Run the function unit tests + syntax checks**

Run: `node --test netlify/functions/ && node --check github-projects.js && node --check script.js && node --check netlify/functions/projects.js`
Expected: tests PASS, checks silent.

- [ ] **Step 2: Serve the site locally and verify the public fallback renders**

Run: `python -m http.server 8080` (from `g:\MySite`), open `http://localhost:8080`.
Expected: Projects section shows cards for the public repos (arm-tv, hhscript, HHGnumner, our-story) via the public fallback (no function locally). Clicking a card opens the modal. Switching language updates labels.

- [ ] **Step 3: Create `.gitignore`**

```gitignore
node_modules/
.netlify/
.env
.DS_Store
*.log
```

- [ ] **Step 4: Create `DEPLOY.md`**

Document: (a) create a GitHub fine-grained PAT with **read-only** access to repository contents+metadata for the repos to display; (b) in Netlify → Site settings → Environment variables set `GITHUB_TOKEN`, `GITHUB_USERNAME=TheRainOfSoul`, optional `EXCLUDE_REPOS`; (c) Netlify auto-detects `netlify.toml`; (d) note the token is never in the repo.

- [ ] **Step 5: git init + first commit**

```bash
git init -b main
git add .
git commit -m "feat: auto-populate projects from GitHub via Netlify proxy"
```

- [ ] **Step 6: Create the GitHub repo and push** (name + visibility confirmed with user at execution time)

```bash
gh repo create <NAME> --<public|private> --source=. --remote=origin --push
```
Expected: repo created, `main` pushed, `origin` set.

- [ ] **Step 7: Confirm**

Run: `gh repo view --web` (or print the repo URL).
Expected: repo visible with all files; `netlify/functions/projects.js` present; no `.env` committed.

---

## Notes for the implementer

- The token in the running `gh` CLI is for local git/gh only. Netlify needs its OWN token set as an env var (`DEPLOY.md` covers it). Never commit a token.
- No npm packages are installed for the site. The only "tooling" is Node's built-in `--test`/`--check` and Python's `http.server`, both already available.
