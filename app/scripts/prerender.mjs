// Renders the landing page to HTML at build time (the SSR bundle in .ssr/) and puts it inside
// #root of the built index.html in the repo root, so search engines, ad reviewers and visitors
// without JavaScript get the whole page. src/main.tsx then hydrates it.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.resolve(APP, "..", "index.html");
const { render } = await import(pathToFileURL(path.join(APP, ".ssr", "entry-server.js")).href);
const html = readFileSync(file, "utf8");
const empty = '<div id="root"></div>';
if (!html.includes(empty)) throw new Error("index.html has no empty #root; was it already prerendered?");
const body = render();
writeFileSync(file, html.replace(empty, `<div id="root">${body}</div>`));
rmSync(path.join(APP, ".ssr"), { recursive: true, force: true });
console.log(`prerender: ${Math.round(body.length / 1024)} KB of HTML in index.html`);
