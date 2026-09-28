import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// The built index.html already holds the page (scripts/prerender.mjs), so React takes it over
// in place; the dev server serves an empty #root and renders from scratch.
const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
