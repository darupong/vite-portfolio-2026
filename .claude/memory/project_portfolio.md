---
name: portfolio-project
description: English portfolio website for Darupong Chouypu — Vite 8, React, Tailwind v4, Zustand, Framer Motion
type: project
---

Portfolio site built from scratch (no scaffolding CLI) at `/Users/neungdarupong/Desktop/Dev 2026/portfolio`.

**Stack:** Vite 8 + @vitejs/plugin-react v6 (Oxc-based) · React 19 · Tailwind CSS v4 (@tailwindcss/vite plugin) · Zustand 5 · Framer Motion · Lucide React.

**Why:** User wanted English version of existing Thai portfolio with performance optimization using Vite 8 (Rolldown bundler, 10-30x faster builds).

**How to apply:** Keep @vitejs/plugin-react at ^6.x.x (v4/v5 don't support Vite 8). Tailwind config is CSS-first (no tailwind.config.ts — use @theme in index.css). Path alias `@/` configured via node:path + @types/node in tsconfig.node.json.

**Key decisions:**
- Space in folder name "Dev 2026" requires `fileURLToPath` + `resolve` for alias (URL encoding breaks path otherwise)
- `useInView` hook uses `RefObject<any>` to avoid JSX ref type conflicts between HTMLElement subtypes
- vite-env.d.ts provides Vite client types for CSS module imports in main.tsx

**Sections:** Hero · Experience (timeline) · Projects (grid, show more) · Skills (category cards) · Education · Contact · Footer

**Build output:** ~350KB JS / 37KB CSS (gzipped: 111KB / 7KB). Build time ~187ms.
