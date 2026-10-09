// Builds blottergames.com's static content pages from app/content/**/*.md:
//   content/how-to-play/<game>.md -> /how-to-play/<game>/index.html (plus the /how-to-play/ hub)
//   content/learn/<slug>.md       -> /learn/<slug>/index.html       (plus the /learn/ hub)
//   content/pages/<slug>.md       -> /<slug>/index.html             (about, faq)
// and sitemap.xml, robots.txt and src/content-index.json (the landing page's links to them).
// Every page is plain HTML with the shared nav, footer and styles.css, so it reads fine
// without JavaScript. Front matter: title, description, eyebrow, order, updated (YYYY-MM-DD),
// published (YYYY-MM-DD, defaults to updated), seoTitle (the <title>, phrased the way people search;
// defaults to title), game (guides), topic (articles), related (comma-separated "learn/slug" or
// "how-to-play/game"). An article may open with a "## Key points" list and ends with a "## Sources" list.
// Also writes /learn/feed.xml (Atom) and /llms.txt (a plain map of the site for AI assistants).
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = path.resolve(APP, "..");
const SITE = "https://blottergames.com";
const PLAY_URL = "https://playstat.blottergames.com/";
const APP_STORE_URL = "https://apps.apple.com/us/app/stat-medical-minigames/id6764444936";
const EMAIL = "stat@blottergames.com";
const YEAR = new Date().getFullYear();

const GAMES = {
  syndrome: { name: "Syndrome", tagline: "Work up the case", accent: "#e11d48" },
  traits: { name: "Traits", tagline: "Narrow it down, trait by trait", accent: "#059669" },
  associations: { name: "Associations", tagline: "Find the four that belong together", accent: "#7c3aed" },
  tangent: { name: "Tangent", tagline: "Home in on the hidden structure", accent: "#0284c7", daily: "Three new puzzles every day, one per tier, the same for everyone." },
};
const TOPICS = ["Clinical reasoning", "Labs, vitals and imaging", "Anatomy", "Studying", "Inside Stat!"];
const ORG = { "@type": "Organization", name: "Blotter Games", url: SITE + "/", logo: { "@type": "ImageObject", url: SITE + "/assets/appicon.jpg" } };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtDate = (iso) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

function parse(file) {
  const raw = readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`no front matter in ${file}`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  for (const k of ["title", "description", "updated"]) if (!meta[k]) throw new Error(`${file}: missing ${k}`);
  const body = m[2];
  // Reading time counts the article itself: not its key-points summary or its source list.
  const words = body.split(/^## Sources$/m)[0].replace(/^## Key points\n[\s\S]*?(?=^## )/m, "").replace(/[#>*_|`-]/g, " ").split(/\s+/).filter(Boolean).length;
  // Tables scroll sideways on phones instead of widening the page; the source list gets its own smaller section.
  const html = marked.parse(body)
    .replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>")
    .replace(/<h2>Sources<\/h2>\s*(<ul>[\s\S]*?<\/ul>)/, '<section class="sources"><h2>Sources</h2>$1</section>')
    .replace(/<h2>Key points<\/h2>\s*(<ul>[\s\S]*?<\/ul>)/, '<section class="keypoints"><h2>Key points</h2>$1</section>');
  const sources = html.match(/<section class="sources">[\s\S]*?<\/section>/);
  const citations = sources ? [...sources[0].matchAll(/href="([^"]+)"/g)].map((x) => x[1]) : [];
  return { ...meta, citations, order: Number(meta.order || 99), related: (meta.related || "").split(",").map((s) => s.trim()).filter(Boolean), html, words, minutes: Math.max(1, Math.round(words / 220)) };
}

const load = (dir) => readdirSync(path.join(APP, "content", dir)).filter((f) => f.endsWith(".md")).map((f) => ({ slug: f.replace(/\.md$/, ""), ...parse(path.join(APP, "content", dir, f)) }));
const guides = load("how-to-play").sort((a, b) => a.order - b.order).map((p) => ({ ...p, url: `/how-to-play/${p.slug}/`, key: `how-to-play/${p.slug}` }));
const articles = load("learn").sort((a, b) => a.order - b.order).map((p) => ({ ...p, url: `/learn/${p.slug}/`, key: `learn/${p.slug}` }));
const pages = load("pages").map((p) => ({ ...p, url: `/${p.slug}/`, key: p.slug }));
const byKey = Object.fromEntries([...guides, ...articles, ...pages].map((p) => [p.key, p]));
for (const a of articles) if (!TOPICS.includes(a.topic)) throw new Error(`${a.slug}: unknown topic "${a.topic}"`);

const NAV = [["/how-to-play/", "How to play"], ["/learn/", "Learn"], ["/about/", "About"], ["/supportfile.html", "Support"]];

// errorPage: no ad tag (AdSense doesn't allow ads on error pages), noindex and no canonical.
function layout({ title, seoTitle, description, url, type = "website", jsonld = [], body, errorPage = false }) {
  const full = url === "/" ? title : `${seoTitle || title} — Stat! · Blotter Games`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
${errorPage ? "" : `  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6627383391529045" crossorigin="anonymous"></script>\n`}  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(full)}</title>
  <meta name="description" content="${esc(description)}" />
${errorPage ? `  <meta name="robots" content="noindex" />` : `  <link rel="canonical" href="${SITE}${url}" />`}
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="Blotter Games" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
${errorPage ? "" : `  <meta property="og:url" content="${SITE}${url}" />\n`}  <meta property="og:image" content="${SITE}/assets/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="color-scheme" content="light dark" />
  <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f8fafc" />
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#020617" />
  <meta name="apple-itunes-app" content="app-id=6764444936" />
  <link rel="icon" type="image/jpeg" href="/assets/appicon.jpg" />
  <link rel="apple-touch-icon" href="/assets/appicon.jpg" />
  <link rel="preload" href="/assets/fonts/bricolage-grotesque-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/styles.css" />
  <link rel="alternate" type="application/atom+xml" title="Stat! Learn articles" href="/learn/feed.xml" />
${jsonld.map((j) => `  <script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
</head>
<body>
  <nav class="site-nav"><div class="wrap inner">
    <a class="wordmark" href="/" aria-label="Stat! by Blotter Games, home"><b>Stat<span>!</span></b><small>by Blotter Games</small></a>
    <div class="nav-links">${NAV.map(([h, l]) => `<a href="${h}"${url.startsWith(h) ? ' aria-current="page"' : ""}>${l}</a>`).join("")}</div>
  </div></nav>
${body}
${FOOTER}
</body>
</html>
`;
}

const FOOTER = `  <footer class="footer"><div class="wrap">
    <div class="footer-top">
      <div>
        <a class="studio" href="/"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3c3.2 0 4.3 2.6 6.4 3.6 2.4 1.1 6.1.4 6.6 3.9.4 2.6-2.4 3.8-2.4 6.3 0 2.7 3.1 4.4 1.6 7.1-1.4 2.5-4.8 1.3-7.2 2.6C19 27.7 18.5 30 15.6 30c-3 0-3.3-2.5-5.6-3.6-2.4-1.2-6 .1-7.1-2.6-1-2.5 1.9-4.2 1.6-6.9C4.2 14.2.9 12.8 2 10.1c1-2.5 4.4-1.4 6.8-2.6C11 6.4 12.6 3 16 3z" fill="currentColor"/></svg>Blotter Games</a>
        <p class="footer-note">Stat! is a game for people who study medicine. It is for education only and is not medical advice.</p>
      </div>
      <div class="footer-links">
        <a href="${PLAY_URL}">Play in the browser</a>
        <a href="${APP_STORE_URL}" target="_blank" rel="noopener">App Store</a>
        <a href="/how-to-play/">How to play</a>
        <a href="/learn/">Learn</a>
        <a href="/about/">About</a>
        <a href="/faq/">FAQ</a>
        <a href="/supportfile.html">Support</a>
        <a href="/privacypolicy.html">Privacy policy</a>
        <a href="/supportfile.html#contact">Contact</a>
      </div>
    </div>
    <div class="footer-base"><span>© ${YEAR} Blotter Games</span><span>${EMAIL}</span></div>
  </div></footer>`;

const logo = (game) => `<img src="/assets/logo-${game}.svg" alt="" width="56" height="56" />`;

function card(p, { withLogo = false } = {}) {
  const g = p.game && GAMES[p.game];
  return `<a class="card"${g ? ` style="--accent:${g.accent}"` : ""} href="${p.url}">
        ${withLogo && g ? `<span class="card-logo">${logo(p.game)}</span>` : ""}<span class="eyebrow">${esc(p.eyebrow || p.topic || "")}</span>
        <h3>${esc(p.cardTitle || p.title)}</h3>
        <p>${esc(p.description)}</p>
        <span class="card-more">${p.key.startsWith("how-to-play") ? "Read the guide" : `${p.minutes} min read`} <span aria-hidden="true">→</span></span>
      </a>`;
}

function crumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb">${items.map(([h, l], i) => (i < items.length - 1 ? `<a href="${h}">${esc(l)}</a><span aria-hidden="true">/</span>` : `<span>${esc(l)}</span>`)).join("")}</nav>`;
}

function breadcrumbLd(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([h, l], i) => ({ "@type": "ListItem", position: i + 1, name: l, item: SITE + h })) };
}

function articlePage(p, trail) {
  const g = p.game && GAMES[p.game];
  const cta = g
    ? `<div class="cta" style="--accent:${g.accent}">
        ${logo(p.game)}
        <div><h2>Play today's ${g.name}</h2><p>${g.daily || "A new puzzle every day, the same for everyone."} Free in any browser and on iPhone and iPad.</p></div>
        <div class="actions"><a class="btn btn-primary" href="${PLAY_URL}">Play now</a><a class="btn btn-secondary" href="${APP_STORE_URL}" target="_blank" rel="noopener">Get the app</a></div>
      </div>`
    : `<div class="cta">
        <img src="/assets/appicon.jpg" alt="" width="56" height="56" class="cta-icon" />
        <div><h2>Put it into practice</h2><p>Stat! turns this kind of thinking into four quick daily games.</p></div>
        <div class="actions"><a class="btn btn-primary" href="${PLAY_URL}">Play today's puzzles</a></div>
      </div>`;
  const related = p.related.map((k) => byKey[k]).filter(Boolean);
  const items = [["/", "Home"], ...trail, [p.url, p.title]];
  const body = `  <main class="wrap">
    <article class="article">
      ${crumbs(items)}
      <header class="article-head">
        <span class="eyebrow">${esc(p.eyebrow || p.topic || "")}</span>
        <h1>${esc(p.title)}</h1>
        <p class="lead">${esc(p.description)}</p>
        <div class="meta">By <a href="/about/">the Stat! team</a> · Updated ${fmtDate(p.updated)} · ${p.minutes} min read</div>
      </header>
      <div class="prose">
${p.html}
      </div>
      ${cta}
      <p class="note">Stat! and this guide are for education only. They are not medical advice and not a substitute for professional care. If you have a health concern, talk to a qualified clinician.</p>
      ${related.length ? `<section class="related"><h2>Keep reading</h2><div class="cards">${related.map((r) => card(r)).join("")}</div></section>` : ""}
    </article>
  </main>`;
  const ld = [
    { "@context": "https://schema.org", "@type": "Article", headline: p.title, ...(p.seoTitle ? { alternativeHeadline: p.seoTitle } : {}), description: p.description, dateModified: p.updated, datePublished: p.published || p.updated, inLanguage: "en-US", isAccessibleForFree: true, articleSection: p.topic || "How to play", wordCount: p.words, author: { "@type": "Organization", name: "Blotter Games", url: SITE + "/about/" }, publisher: ORG, mainEntityOfPage: SITE + p.url, image: SITE + "/assets/og.png", ...(p.citations.length ? { citation: p.citations } : {}) },
    breadcrumbLd(items),
  ];
  return layout({ title: p.title, seoTitle: p.seoTitle, description: p.description, url: p.url, type: "article", jsonld: ld, body });
}

function simplePage(p) {
  const items = [["/", "Home"], [p.url, p.title]];
  const body = `  <main class="wrap">
    <article class="article">
      ${crumbs(items)}
      <header class="article-head">
        <span class="eyebrow">${esc(p.eyebrow || "")}</span>
        <h1>${esc(p.title)}</h1>
        <p class="lead">${esc(p.description)}</p>
        <div class="meta">Updated ${fmtDate(p.updated)}</div>
      </header>
      <div class="prose">
${p.html}
      </div>
    </article>
  </main>`;
  const ld = [breadcrumbLd(items)];
  if (p.slug === "faq") {
    // FAQPage data from the "## Question" / answer pairs.
    const qa = [...p.html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2|$)/g)].map(([, q, a]) => ({ "@type": "Question", name: q.replace(/<[^>]+>/g, "").trim(), acceptedAnswer: { "@type": "Answer", text: a.replace(/<\/?(?:strong|em|a|code)\b[^>]*>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() } }));
    ld.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qa });
  }
  return layout({ title: p.title, seoTitle: p.seoTitle, description: p.description, url: p.url, jsonld: ld, body });
}

function hub({ url, title, seoTitle, eyebrow, lead, intro, sections, list }) {
  const items = [["/", "Home"], [url, title]];
  const body = `  <main class="wrap">
    <div class="hub">
      ${crumbs(items)}
      <header class="hub-head">
        <span class="eyebrow">${esc(eyebrow)}</span>
        <h1>${esc(title)}</h1>
        <p class="lead">${esc(lead)}</p>
      </header>
      ${intro ? `<div class="prose hub-intro">${intro}</div>` : ""}
      ${sections.map((s) => `<section>${s.heading ? `<h2 class="group">${esc(s.heading)}</h2>` : ""}<div class="cards">${s.cards.join("")}</div></section>`).join("\n      ")}
    </div>
  </main>`;
  const collection = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description: lead, url: SITE + url, inLanguage: "en-US", publisher: ORG, mainEntity: { "@type": "ItemList", itemListElement: list.map((x, i) => ({ "@type": "ListItem", position: i + 1, url: SITE + x.url, name: x.title })) } };
  return layout({ title, seoTitle, description: lead, url, jsonld: [breadcrumbLd(items), collection], body });
}

function write(url, html) {
  const dir = path.join(ROOT, url);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
}

// Pages
for (const p of guides) write(p.url, articlePage(p, [["/how-to-play/", "How to play"]]));
for (const p of articles) write(p.url, articlePage(p, [["/learn/", "Learn"]]));
for (const p of pages) write(p.url, simplePage(p));

write("/how-to-play/", hub({
  url: "/how-to-play/",
  title: "How to play Stat!",
  seoTitle: "How to play Stat!: four daily medical puzzle games",
  eyebrow: "Guides",
  list: guides,
  lead: "Four daily medical puzzles, each with its own way of thinking. Here is how every game works, what the feedback means and how to solve it in fewer tries.",
  intro: marked.parse(readFileSync(path.join(APP, "content", "how-to-play-intro.md"), "utf8")),
  sections: [{ cards: guides.map((g) => card({ ...g, cardTitle: GAMES[g.game].name, description: GAMES[g.game].tagline + ". " + g.description }, { withLogo: true })) }],
}));

write("/learn/", hub({
  url: "/learn/",
  title: "Learn the medicine behind the games",
  seoTitle: "Medical guides for students: clinical reasoning, labs, anatomy",
  eyebrow: "Learn",
  list: articles,
  lead: "Plain-language guides to the reasoning, tests and anatomy that Stat! puzzles are built on, written for students and anyone curious about medicine.",
  sections: TOPICS.map((t) => ({ heading: t, cards: articles.filter((a) => a.topic === t).map((a) => card(a)) })).filter((s) => s.cards.length),
}));

// GitHub Pages serves /404.html, with a 404 status, for any path that doesn't exist.
writeFileSync(path.join(ROOT, "404.html"), layout({
  title: "Page not found",
  description: "This page doesn't exist on blottergames.com.",
  url: "/404.html",
  errorPage: true,
  body: `  <main class="wrap">
    <article class="article">
      <header class="article-head">
        <span class="eyebrow">Error 404</span>
        <h1>This page isn't here</h1>
        <p class="lead">The link may be old or mistyped. These are the main places to go instead.</p>
      </header>
      <div class="prose">
        <ul>
          <li><a href="/">Home</a>: what Stat! is and the four daily games.</li>
          <li><a href="/how-to-play/">How to play</a>: a guide to each game.</li>
          <li><a href="/learn/">Learn</a>: articles on the medicine behind the puzzles.</li>
          <li><a href="${PLAY_URL}">Play today's puzzles</a> in your browser.</li>
        </ul>
      </div>
    </article>
  </main>`,
}));

// Sitemap and robots
const urls = [
  ["/", null], ["/how-to-play/", null], ["/learn/", null],
  ...guides.map((p) => [p.url, p.updated]), ...articles.map((p) => [p.url, p.updated]), ...pages.map((p) => [p.url, p.updated]),
  ["/supportfile.html", null], ["/privacypolicy.html", null],
];
const today = new Date().toISOString().slice(0, 10);
writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, d]) => `  <url><loc>${SITE}${u}</loc><lastmod>${d || today}</lastmod></url>`).join("\n")}
</urlset>
`);
writeFileSync(path.join(ROOT, "robots.txt"), `# Search engines and AI assistants are welcome to crawl the whole site.\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

// Atom feed of the Learn articles, newest update first.
const xml = (s) => esc(s).replace(/'/g, "&apos;");
const byUpdate = [...articles].sort((a, b) => b.updated.localeCompare(a.updated) || (b.published || "").localeCompare(a.published || ""));
writeFileSync(path.join(ROOT, "learn", "feed.xml"), `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Stat! · Learn</title>
  <subtitle>Plain-language guides to the reasoning, tests and anatomy behind Stat!'s daily medical puzzles.</subtitle>
  <link href="${SITE}/learn/feed.xml" rel="self" />
  <link href="${SITE}/learn/" />
  <id>${SITE}/learn/</id>
  <updated>${byUpdate[0].updated}T12:00:00Z</updated>
  <author><name>Blotter Games</name><uri>${SITE}/about/</uri></author>
${byUpdate.map((a) => `  <entry>
    <title>${xml(a.title)}</title>
    <link href="${SITE}${a.url}" />
    <id>${SITE}${a.url}</id>
    <published>${a.published || a.updated}T12:00:00Z</published>
    <updated>${a.updated}T12:00:00Z</updated>
    <category term="${xml(a.topic)}" />
    <summary>${xml(a.description)}</summary>
  </entry>`).join("\n")}
</feed>
`);

// llms.txt (llmstxt.org): a plain map of the site for AI assistants and agents.
const line = (p, title = p.title) => `- [${title}](${SITE}${p.url}): ${p.description}`;
writeFileSync(path.join(ROOT, "llms.txt"), `# Stat! by Blotter Games

> Stat! is four daily medical puzzle games for medical, nursing and other health-profession students and anyone curious about medicine: Syndrome (work up a case and name the diagnosis), Traits (deduce a hidden disease from six traits), Associations (sort sixteen findings into four diseases) and Tangent (find a hidden structure on a body map). The daily puzzles are free in any browser at ${PLAY_URL} and on iPhone and iPad. This site also publishes plain-language articles, each with its sources and update date, on clinical reasoning, lab tests, vital signs, imaging and anatomy.

Stat! and this site are for education only and are not medical advice. Contact: ${EMAIL}.

## How to play

${[{ url: "/how-to-play/", title: "How to play Stat!", description: "How the four games work, what the feedback means and how to solve them in fewer tries." }, ...guides].map((p) => line(p)).join("\n")}

## Learn

${TOPICS.flatMap((t) => articles.filter((a) => a.topic === t).map((a) => line(a))).join("\n")}

## About

${pages.map((p) => line(p)).join("\n")}
- [Support](${SITE}/supportfile.html): Help with puzzle mistakes, saved progress, Stat! Pro, reminders and ads.
- [Privacy policy](${SITE}/privacypolicy.html): What the app and websites collect, advertising and cookies.

## Optional

- [Play in the browser](${PLAY_URL}): The four daily puzzles, free.
- [Stat! on the App Store](${APP_STORE_URL}): The iPhone and iPad app.
- [Learn feed](${SITE}/learn/feed.xml): Atom feed of new and updated articles.
`);

// The landing page links to these (src/App.tsx imports it).
writeFileSync(path.join(APP, "src", "content-index.json"), JSON.stringify({
  guides: guides.map((g) => ({ url: g.url, game: g.game, title: g.title, description: g.description })),
  articles: articles.map((a) => ({ url: a.url, title: a.title, description: a.description, topic: a.topic, minutes: a.minutes, featured: a.featured === "true" })),
}, null, 2) + "\n");

console.log(`pages: ${guides.length} guides, ${articles.length} articles, ${pages.length} pages, ${urls.length} sitemap urls`);
