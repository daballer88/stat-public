// Publishes one reviewed draft: app/content/drafts/<slug>.md becomes app/content/learn/<slug>.md, dated
// today; then the site is built, committed and pushed to main (GitHub Pages deploys it), and once the page
// is live, IndexNow is pinged for it. Safe to re-run: an article that is already published is left alone,
// and nothing happens if the repo has uncommitted changes or the build doesn't produce the page.
//   node app/scripts/publish-draft.mjs <slug>
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = path.resolve(APP, "..");
const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("usage: node app/scripts/publish-draft.mjs <slug>");
  process.exit(2);
}
const draft = path.join(APP, "content", "drafts", `${slug}.md`);
const target = path.join(APP, "content", "learn", `${slug}.md`);
const run = (cmd, args, cwd = ROOT) => execFileSync(cmd, args, { cwd, stdio: "inherit" });
const out = (cmd, args) => execFileSync(cmd, args, { cwd: ROOT, encoding: "utf8" }).trim();
const fail = (msg) => { console.error(`publish-draft: ${msg}`); process.exit(1); };

if (out("git", ["status", "--porcelain"])) fail("the site repo has uncommitted changes; nothing was published");
run("git", ["pull", "--ff-only", "origin", "main"]);
if (existsSync(target)) { console.log(`publish-draft: ${slug} is already published`); process.exit(0); }
if (!existsSync(draft)) fail(`no draft at ${draft}`);

const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local time
const text = readFileSync(draft, "utf8")
  .replace(/^published: .*$/m, `published: ${today}`)
  .replace(/^updated: .*$/m, `updated: ${today}`);
const title = (text.match(/^title: (.*)$/m) || [])[1];
if (!title) fail("the draft has no title");
run("git", ["mv", path.relative(ROOT, draft), path.relative(ROOT, target)]);
writeFileSync(target, text);

try {
  run("npm", ["run", "build"], APP);
  const page = path.join(ROOT, "learn", slug, "index.html");
  if (!existsSync(page) || !readFileSync(page, "utf8").includes("<h1>")) throw new Error("the page was not built");
  if (!readFileSync(path.join(ROOT, "sitemap.xml"), "utf8").includes(`/learn/${slug}/`)) throw new Error("the page is not in the sitemap");
} catch (e) {
  run("git", ["reset", "--hard", "HEAD"]); // undo the move and the build output
  fail(`build check failed (${e.message}); the repo was reset and nothing was pushed`);
}

run("git", ["add", "-A"]);
run("git", ["commit", "-m", `Learn: publish "${title}"\n\nA reviewed draft from app/content/drafts, published on its scheduled date.`]);
run("git", ["push", "origin", "main"]);

const url = `https://blottergames.com/learn/${slug}/`;
let live = false;
for (let i = 0; i < 40 && !live; i++) {
  try { live = (await fetch(`${url}?v=${Date.now()}`, { cache: "no-store" })).ok; } catch {}
  if (!live) await new Promise((r) => setTimeout(r, 15000));
}
if (!live) fail(`pushed, but ${url} was not live after 10 minutes; check GitHub Pages, then run: node app/scripts/indexnow.mjs /learn/${slug}/ /learn/ /`);
run("node", ["app/scripts/indexnow.mjs", `/learn/${slug}/`, "/learn/", "/"]);
console.log(`publish-draft: ${url} is live`);
