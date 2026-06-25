# Personal portfolio — Sam McManagan

A static portfolio site for ML / data science (and adjacent full-stack) roles.
Built with [Astro](https://astro.build), Tailwind CSS v4, and TypeScript;
deployed to GitHub Pages via GitHub Actions. The site itself is a work sample —
clean code, fast, accessible.

## Stack

- **Astro** (static output) + **TypeScript**
- **Tailwind CSS v4** via a custom theme (tokens in `src/styles/global.css`)
- **Content collections** for projects (and a scaffolded, unlinked writing collection)
- Zero JS by default; tiny inline scripts only for theme toggle, menu, scroll-reveal

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  data/site.ts              # name, tagline, social links, nav  ← edit global config here
  content.config.ts         # content collection schemas
  content/projects/*.mdx    # one file per project (frontmatter-driven)
  content/writing/*.mdx      # scaffolded, not linked until it has content
  styles/global.css         # design tokens (fonts + palette) — re-skin here
  layouts/BaseLayout.astro  # head, SEO, dark-mode, scroll-reveal
  components/                # Nav, Footer, NetworkMark, NetworkMotif, ProjectCard
  pages/                     # index, projects/index, projects/[...slug]
public/
  cv.pdf                     # the CV (see below)
  favicon.svg, og-default.svg, robots.txt, .nojekyll
```

## Editing content (the common case)

**Standing rule:** content changes touch only `src/data/site.ts` and
`src/content/**`. Don't edit layout/design files for routine updates.

### Add a project

1. Copy `src/content/projects/_template.mdx` to a new file, e.g. `my-project.mdx`.
2. Fill in the frontmatter (`title`, `summary`, `role`, `stack`, `order`, `date`).
3. Write the case study in the body (`## Problem`, `## What I built`, `## Outcome`).
4. Set `draft: false` to publish. It appears automatically in the projects index
   **and** the nav dropdown — no nav editing needed.

- **Images:** drop an image next to the `.mdx` and set `heroImage: './hero.png'`.
- **Video:** set `video:` to a YouTube/Vimeo URL (auto-converted to an embed).
- **Repo links are deferred by default** — only add a `links.repo` when you've
  confirmed that repo is presentable.

### Swap the CV

Overwrite **`public/cv.pdf`** with your new CV. The path is stable, so the nav
link (`/cv.pdf`, opened by the browser's native PDF viewer) never changes.

### Re-skin the design

Edit the design tokens in `src/styles/global.css` (the `@theme` block + the
`.dark` overrides): fonts and palette are CSS variables, so changing them
re-skins the whole site. Nothing references raw hex values directly.

### Enable analytics (optional)

Free, privacy-friendly, cookieless analytics ([GoatCounter](https://www.goatcounter.com/))
is wired up but **off by default** — no script loads until you opt in. To enable:

1. Create a free account at [goatcounter.com](https://www.goatcounter.com/) and choose a site code.
2. Set `analytics.goatcounterCode` in `src/data/site.ts` to that code.

Your traffic dashboard then lives at `https://<code>.goatcounter.com`. No cookie
banner is needed.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site
and deploys to GitHub Pages. One-time setup:

1. Create a **public** repo named `sam-mcm-642.github.io` and push this code to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The site goes live at `https://sam-mcm-642.github.io` on the next push.

If the GitHub username changes, update `site` in `astro.config.mjs`, the repo
name, and the social link in `src/data/site.ts`.
