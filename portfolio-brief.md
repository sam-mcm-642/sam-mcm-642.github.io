# Portfolio site — project brief for Claude Code

This is the spec for building my personal portfolio site. Read it fully before
writing any code. Build incrementally, component by component, and pause for
review after each major step rather than generating the whole site at once.

---

## 1. Goal & audience

A polished, original, professional personal website to support my CV for
**AI/ML and data science roles**, with secondary signalling of **full-stack /
SWE** competence for adjacent roles. The site itself is a work sample: clean
code, a public repo, strong Lighthouse scores, and well-written project case
studies are the point — not just a brochure.

Primary reader: technical recruiters and engineers who will read the project
writeups and may glance at the repo.

### Positioning / story (drives hero + about copy)

Tell this as a layered story, in this order of emphasis:

1. **Core:** ML / data science is my primary, most extensive expertise — lead
   with this.
2. **Differentiator:** a psychology background that shapes how I design
   features and products people actually want to use. This is the distinctive
   angle — foreground it, don't bury it.
3. **Supporting range:** some full-stack / SWE experience, shown as breadth for
   adjacent roles.

The hero one-liner and about section should land this mix in 2–3 sentences. The
landing page is deliberately minimal (see §5), so this copy carries most of the
page — it must be tight.

---

## 2. Stack (fixed)

- **Astro** (static output mode — `output: 'static'`)
- **Tailwind CSS** for styling, via a custom theme (see §6 — do NOT use stock
  defaults)
- **TypeScript** throughout
- **Astro content collections** for projects (and optionally writing/notes)
- React or Svelte islands **only** where genuine interactivity is needed
  (e.g. an interactive chart). Default to zero JS.
- **Host: GitHub Pages**, deployed via GitHub Actions on push to `main`.

Do not introduce a backend, SSR, or serverless functions — Pages is static
only. Anything dynamic runs client-side in the browser.

---

## 3. Repo & deployment setup

- This is a **standalone repo** dedicated to the website (separate from my
  project repos). I will reference my project repos for content but the site
  lives here.
- Configure `astro.config.mjs` for GitHub Pages:
  - set `site` to my Pages URL
  - set `base` correctly (`/` if using a custom domain or a
    `username.github.io` repo; `/<repo-name>` otherwise — ask me which before
    finalising)
- Add a **GitHub Actions workflow** (`.github/workflows/deploy.yml`) that
  builds the Astro site and deploys to Pages on every push to `main`. Use the
  official `actions/deploy-pages` approach.
- Add a `.nojekyll` file so Pages doesn't try to process the build output.
- README should document: how to run locally (`npm run dev`), how to add a
  project, and how to swap the CV PDF.
- **The site repo is public and will be read as a code sample.** Keep it
  presentable: clean commit messages, a real README, sensible structure, no
  secrets or junk committed, a proper `.gitignore`.

---

## 4. Content / layout separation (important for my workflow)

I will update this site roughly every couple of weeks, mostly by pointing
Claude Code at it. To keep those edits fast and safe, **content must live in
clearly-named data files, separate from layout**:

- `src/content/projects/*.mdx` — one file per project, frontmatter-driven
  (see §5)
- `public/cv.pdf` — the CV. The **CV nav item links directly to `/cv.pdf`** —
  no intermediate page, no embed, no HTML rendering. The browser's native PDF
  viewer handles viewing and downloading. Updating the CV = overwrite this one
  file. The stable path means the link never changes.
- `src/data/site.ts` — global config: name, tagline, social links, nav items.

**Standing rule for future edits:** content changes touch only the files above.
Never modify layout/design files unless I explicitly ask.

---

## 5. Pages & structure

A multi-page site (not a one-pager):

1. **Landing page** — deliberately minimal. A short who-I-am intro (the
   positioning story from §1, in 2–3 tight sentences), a photo of me, an email
   link, and contact/repo links (GitHub, LinkedIn, email) along the top. **No
   project cards on the landing page.** Because it's sparse, the design
   (typography, photo treatment, spacing, the network motif) carries it — get
   this right.
2. **Projects** — accessed via a **dropdown in the top nav**, with each of the
   4–5 projects as its own entry linking straight to its detail page. Also
   provide a **Projects index page** as the dropdown's parent, so the projects
   can be browsed in one place as well as reached directly.
3. **Project detail** — one template, rendered per project. Each shows:
   problem statement, my specific contribution, the stack, results/outcome, and
   media (screenshots and/or an embedded video walkthrough — see §7). Jean is
   the anchor/strongest project but lives on its own detail page reached via the
   dropdown — it is NOT surfaced on the landing page.
4. **CV** — the nav item links **directly to `/cv.pdf`**. No intermediate page,
   no embed. The browser's native viewer handles view + download.
5. **(Optional) Writing/notes** — scaffold a second content collection for
   short technical writeups, but **do NOT link it in the nav** until there is
   actual content. No empty blog visible.

Projects to feature (LINEUP — TO CONFIRM): 4–5 strong, varied entries covering
ML, full-stack, and research. **Jean anchors** as the strongest single piece.
Other candidates: the neurosymbolic visual-grounding thesis, ResearchDigest
(arXiv tracker), and the fine-tuned Llama / local RAG work. I will confirm the
final lineup and the emphasis for each before writing case-study copy.

### Project frontmatter schema (define in `src/content/config.ts`)

```yaml
title: string
summary: string            # one line, used on cards
role: string               # my specific contribution
stack: string[]            # technologies
links:                     # optional — see note below
  demo?: string
  repo?: string
  writeup?: string
heroImage?: string
video?: string             # embed URL, see §7
featured: boolean          # show on home page
order: number              # sort order
date: date
```

**Repo links — deferred.** Default to NO repo link per project. Jean's repo
will likely stay private and some other repos need tidying first. Leave the
`repo` field empty for now; I'll add links selectively later once the relevant
repos are presentable. Never auto-link a repo I haven't explicitly confirmed.

---

## 5a. Contact

- Header links: **GitHub, LinkedIn, email**. Plain links, no contact form.
- Email as a `mailto:` link (no third-party form needed — keeps it fully
  static).

## 5b. Privacy & content boundaries (STANDING RULE)

The site is public and search-indexed. Only include what a recruiter needs.
These are hard constraints — apply them to all copy now and to every future
content edit, and never reintroduce the excluded items:

- **Do NOT mention relocation** or any move.
- **Do NOT mention location** detail.
- **Do NOT mention product launches, pilots, timelines, or pre-launch status**
  for Jean or anything else. Jean is presented as an app/product I built and
  the engineering behind it — not as a venture with a roadmap.
- **Do NOT mention** runway/contract/side work (bartending, data-annotation
  contracting, etc.). Keep it off the site entirely.
- Jean's case study is written around the **technical work** (ML stack,
  architecture, what I built), not the business.
- Foreground only what a recruiter for an AI/ML/DS role needs to assess me.

This is what separates an original site from a templated one, and it's my call.
**Do not pick the aesthetic yourself or fall back to default Tailwind.** Wait
for me to supply, or build these as explicit theme tokens once I do:

- **Type pairing:** a real display/heading font (not Inter everywhere) + a
  clean body font. [TO SUPPLY]
- **Palette:** a constrained palette with one confident accent colour, defined
  as CSS variables / Tailwind theme tokens — not ad-hoc hex values. [TO SUPPLY]
- **Spacing & grid system:** one consistent scale, defined in the Tailwind
  config. [TO SUPPLY or use a sensible 4/8px scale]
- **Signature motif:** thread the Jean logo concept (a network/node symbol
  suspended in the letter J) through the site as a visual through-line —
  e.g. subtle network/graph imagery in the hero or section dividers. [TO
  DISCUSS]
- **One or two signature interactions:** e.g. a subtle scroll-reveal or a small
  interactive graph element. Keep tasteful; respect reduced-motion.

Lock typography and palette as theme tokens on day 1, before any content goes
in, so everything stays consistent.

---

## 7. Media handling

- **Images/screenshots:** store in `src/assets` (Astro-optimised) or `public/`;
  use Astro's `<Image>` for optimisation. Always set `alt` text.
- **Video walkthrough (e.g. of Jean):** do **not** commit large video files to
  the repo (Pages soft-caps repo size and bandwidth). Host the recording on
  YouTube/Vimeo (unlisted) and embed via iframe, OR use a small compressed MP4
  referenced by URL. A short looping GIF/MP4 is fine for a hero accent.
- Lazy-load embeds so they don't hurt initial load.

---

## 8. Quality bar (day 4 / polish pass)

- Fully responsive across breakpoints — verify mobile and desktop.
- Accessibility: keyboard navigation, sufficient contrast, alt text,
  `prefers-reduced-motion` respected.
- SEO: per-page `<title>`/meta, Open Graph + Twitter card tags, a generated
  social-preview image, `sitemap.xml`, `robots.txt`.
- Performance: target Lighthouse 95+ across all four categories. (Screenshot
  the scores — they're a portfolio signal in themselves.)
- Analytics: a lightweight, privacy-friendly option (e.g. a script-tag
  analytics provider). Optional.

---

## 9. Suggested build order (≈3 days)

- **Day 1 — Foundation:** scaffold Astro project, Tailwind with custom theme
  tokens (§6), base layout, nav, footer, dark mode, the GitHub Pages config +
  deploy workflow. Get one trivial page deploying to Pages end-to-end before
  building further.
- **Day 2 — Content architecture:** projects content collection + schema,
  project index + detail template, the Projects nav dropdown, and the direct
  `/cv.pdf` link. Wire in the content/layout separation (§4). Scaffold the
  writing collection but leave it unlinked.
- **Day 3 — Signature + content:** hero, the network motif, the chosen
  signature interaction, embed the Jean walkthrough video, and write the 3–4
  project case studies well (content quality matters more than chrome).
- **Polish pass:** responsive, a11y, SEO, performance, custom domain if used.

---

## 10. Things to ask me before proceeding

Still outstanding (the rest is settled in this brief):

1. Custom domain, or `username.github.io`? (Determines `base` config.)
2. Final project lineup (4–5) and the emphasis for each case study. Jean
   anchors; confirm the others.
3. Design direction: type pairing, palette, and how far to take the network
   motif. (Locks on day 1 — highest priority to settle.)

Already decided: stack (Astro/Tailwind/TS, static, GitHub Pages), minimal
landing page, Projects nav dropdown + index, CV as a direct `/cv.pdf` link,
contact = GitHub/LinkedIn/email links only, privacy constraints (§5b), repo
links deferred, writing section scaffolded but unlinked, public site repo.
