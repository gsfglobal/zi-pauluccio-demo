import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

/** Anteprima in un unico file HTML (per il visualizzatore degli artifact di Claude). */
export default defineConfig({
  root: r("."),
  plugins: [react(), tailwind(), viteSingleFile()],
  resolve: {
    alias: [
      { find: "next/link", replacement: r("./shims/link.tsx") },
      { find: "next/navigation", replacement: r("./shims/navigation.ts") },
      { find: "next/dynamic", replacement: r("./shims/dynamic.tsx") },
      { find: "@", replacement: r("../src") },
    ],
  },
  define: {
    "process.env.NEXT_PUBLIC_DEMO_MODE": JSON.stringify("true"),
    "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify("https://www.zipauluccio.it"),
    "process.env.NEXT_PUBLIC_BOOKING_ENDPOINT": JSON.stringify(""),
    "process.env.NEXT_PUBLIC_GA_ID": JSON.stringify(""),
  },
  build: {
    outDir: r("../out-preview"),
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 10_000,
  },
});
