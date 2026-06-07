import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Build static output straight into the repo root so GitHub Pages (legacy,
// serving from main/) picks it up. assetsDir keeps hashed bundles tidy.
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
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
});
