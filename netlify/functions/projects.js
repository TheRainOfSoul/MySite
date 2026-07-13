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
