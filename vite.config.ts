import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  preview: {
    // Serve index.html for all routes in preview mode
    headers: { "Cache-Control": "no-store" },
  },
  server: {
    // Fallback all unmatched routes to index.html for SPA routing
    fs: { strict: false },
  },
});
