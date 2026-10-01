# neonetz-portfolio

Personal portfolio site built with React 19, TypeScript, Vite, and Tailwind CSS v4,
animated with GSAP + Lenis. Published to GitHub Pages from the repository root.

## Development

```bash
npm install
npm run dev       # start Vite dev server
```

## Build & Deploy

The site is served from the **repository root**, not from `portfolio/`.
Deployment copies the Vite build output one level up:

```bash
npm run build     # type-check (tsc -b) then build to dist/
npm run deploy    # copy dist/ to repo root, prune stale hashed assets
```

After running `deploy`, commit the changed files in the repository root.

## Other scripts

```bash
npm run lint      # ESLint (flat config)
npm run preview   # serve the local build
npm run logos     # re-download skill brand SVGs into public/skills (Simple Icons)
```

## Structure

- `src/data/portfolio.ts` — single source of truth for profile, projects, and skills content.
- `src/features/` — one folder per page section (hero, projects, about, skills, contact).
- `src/components/` — shared layout (`layouts/`) and generic UI (`ui/`) components.
- `src/hooks/`, `src/lib/` — GSAP/Lenis motion hooks and helpers.
- `public/` — static assets copied verbatim into the build (img, skill logos, SEO files).
- `scripts/deploy.mjs` — copies `dist/` to the repo root for GitHub Pages.
- `scripts/fetch-skill-logos.mjs` — syncs `public/skills/*.svg` with Simple Icons.
