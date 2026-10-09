// Tells IndexNow search engines (Bing, which feeds ChatGPT search and Copilot, plus Yandex, Seznam,
// Naver and others) that pages changed, so they recrawl now instead of whenever they next visit.
// Run after a deploy is live:  node app/scripts/indexnow.mjs            (every URL in the sitemap)
//                              node app/scripts/indexnow.mjs /learn/x/   (just these paths)
// The key is public by design: $586e0e61ef3bab0054939197afbff4b2.txt at the site root proves the site sent the ping.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://blottergames.com";
const KEY = "586e0e61ef3bab0054939197afbff4b2";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : SITE + p))
  : [...readFileSync(path.join(ROOT, "sitemap.xml"), "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: "blottergames.com", key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URL(s)`);
if (!res.ok && res.status !== 202) process.exit(1);
