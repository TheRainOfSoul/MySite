// github-projects.js — auto-populates the Projects section from GitHub.
const PROJECTS_CONFIG = {
  endpoint: "/api/projects",           // Netlify proxy (holds the token server-side)
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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cardImage(p) {
  if (p.ogImage) {
    return `<img class="project-og" src="${escapeHtml(p.ogImage)}" alt="${escapeHtml(p.title)}" loading="lazy"
      onerror="this.parentElement.parentElement.classList.add('no-img'); this.remove();">`;
  }
  return "";
}

function buildCard(p) {
  const el = document.createElement("div");
  el.className = "glass-card project-card fade-in tilt-card" + (p.ogImage ? "" : " no-img");
  el.dataset.name = p.name;
  const topics = p.topics || [];
  const tags = topics.slice(0, 4)
    .concat(p.language && !topics.includes(p.language) ? [p.language] : [])
    .slice(0, 4);
  const title = escapeHtml(p.title);
  el.innerHTML = `
    <div class="project-img-placeholder">
      ${cardImage(p)}
      <span class="project-img-label">${title}</span>
      <div class="project-view-btn">${t("btn_view_project")}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-left: 4px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </div>
    </div>
    <div class="project-content">
      <div class="project-info">
        <h3>${title}</h3>
        <p>${escapeHtml(describeGeneric(p))}</p>
      </div>
      <div class="project-meta">
        ${p.isPrivate ? `<span class="badge-private">🔒 ${t("proj_private")}</span>` : ""}
        ${p.stars ? `<span class="meta-item">⭐ ${p.stars}</span>` : ""}
        <span class="meta-item">${t("proj_updated")}: ${fmtDate(p.updated)}</span>
      </div>
      <div class="project-tags">
        ${tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join(" ")}
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
    ? `<img src="${escapeHtml(p.ogImage)}" alt="${escapeHtml(p.title)}" style="width:100%;border-radius:12px;" onerror="this.remove();">`
    : `<span>${escapeHtml(p.title)}</span>`;
  const meta = [
    p.isPrivate ? `🔒 ${t("proj_private")}` : "",
    p.language || "",
    p.stars ? `⭐ ${p.stars}` : "",
    `${t("proj_updated")}: ${fmtDate(p.updated)}`,
  ].filter(Boolean).join(" · ");
  document.getElementById("modal-description").innerHTML =
    `<p>${escapeHtml(describeGeneric(p))}</p><p class="modal-meta">${escapeHtml(meta)}</p>`;

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
  const hasCache = !!(cache && cache.projects && cache.projects.length);
  if (hasCache) {
    LOADED_PROJECTS = cache.projects;
    renderProjects(cache.projects);   // instant paint from last known list
  } else {
    renderSkeletons(grid);
  }

  // Always revalidate in the background, so newly added/removed repos (and the
  // switch from public-fallback to the full private list) show up on the very
  // next load instead of being hidden behind a stale cache.
  try {
    let projects;
    try { projects = await fetchFromProxy(); }
    catch { projects = await fetchPublicFallback(); }
    LOADED_PROJECTS = projects;
    writeCache(projects);
    renderProjects(projects);
  } catch {
    if (hasCache) return;             // keep the cached paint on network failure
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
