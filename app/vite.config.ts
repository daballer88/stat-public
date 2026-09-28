import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Build static output straight into the repo root so GitHub Pages (legacy,
// serving from main/) picks it up. assetsDir keeps hashed bundles tidy.
// `npm run build` = scripts/pages.mjs (guides, articles, sitemap) + this client build +
// an SSR build that scripts/prerender.mjs uses to put the landing page's HTML in index.html.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  // The SSR build (src/entry-server.tsx) only feeds scripts/prerender.mjs and is deleted after.
  build: isSsrBuild
    ? { outDir: path.resolve(__dirname, ".ssr"), emptyOutDir: true, rollupOptions: { output: { entryFileNames: "[name].js" } } }
    : {
        outDir: path.resolve(__dirname, ".."),
        emptyOutDir: false, // never wipe CNAME, app-ads.txt, .html, /assets
        assetsDir: "build",
        rollupOptions: {
          output: {
            entryFileNames: "build/[name]-[hash].js",
            chunkFileNames: "build/[name]-[hash].js",
            assetFileNames: "build/[name]-[hash][extname]",
          },
        },
      },
}));
