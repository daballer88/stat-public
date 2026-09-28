import { renderToString } from "react-dom/server";
import App from "./App";

/** The landing page as HTML, for scripts/prerender.mjs to put into index.html at build time. */
export function render() {
  return renderToString(<App />);
}
