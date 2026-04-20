# Plan Overview — Wim Stienstra Portfolio

## Goal
Build a flashy, recruiter-impressing frontend portfolio for Wim Stienstra that showcases Angular/monorepo expertise, creative engineering, AI-assisted development, and a well-rounded personality including game modding, drone flying, and music production. The site must be easy to update without touching code.

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **Angular 21.2.x (standalone components)** | Wim's primary expertise; proves mastery on the portfolio itself; latest stable as of April 2026 |
| Text layout / effects | **`@chenglou/pretext`** | Kinetic, cursor-reactive typography in the hero; zero-dependency, 15 KB |
| Animation | **GSAP 3.14.x (GreenSock)** | Industry-standard, buttery scroll + entrance animations; now **fully free** — all plugins included, Webflow-sponsored |
| Styling | **SCSS + CSS custom properties** | Angular's default style system; scoped component styles + global tokens |
| Skeleton loading | **`boneyard-js/angular`** | Pixel-perfect skeleton screens auto-captured from real UI; zero manual measurement |
| Content | **JSON files in `src/content/`** | Edit one file to update any section—no CMS login needed |
| Icons | **`lucide-angular`** | Clean, consistent, tree-shakeable — Angular-native package |
| Deployment | **Static files → any web host** | `ng build` produces pure static HTML/JS/CSS; upload `dist/wimstienstra/browser/` to Wim's existing static host |
| Domain | **wimstienstra.nl** | Existing domain, point DNS to the static host's server |

> **Why no headless CMS?** Wim is a developer — JSON files in the repo are version-controlled, diff-friendly, and editable in VS Code or directly on GitHub. If a GUI is wanted later, Tina CMS (git-backed, free tier) can be dropped in without changing the architecture.

---

## Architecture

```
WimStienstra/WimStienstra (GitHub repo)
├── plan/                    ← this folder (per-step agent instructions)
├── src/
│   ├── content/             ← ALL editable content lives here (JSON + Markdown)
│   │   ├── meta.json
│   │   ├── experience.json  ← includes optional imageUrl per entry
│   │   ├── projects.json
│   │   ├── skills.json      ← includes optional imageUrl per skill category
│   │   ├── hobbies.json     ← game mods, drone footage, music production
│   │   ├── blog-index.json  ← auto-generated from blog/*.md files
│   │   └── blog/            ← markdown blog posts with frontmatter
│   │       ├── first-home-automation-setup.md
│   │       └── experimenting-with-ai-agents.md
│   ├── app/
│   │   ├── app.component.ts / .html / .scss
│   │   ├── components/
│   │   │   ├── hero/
│   │   │   ├── about/
│   │   │   ├── experience/
│   │   │   ├── projects/
│   │   │   ├── skills/
│   │   │   ├── hobbies/
│   │   │   ├── blog/            ← blog list & post components
│   │   │   │   ├── blog-list/
│   │   │   │   ├── blog-post/
│   │   │   │   └── shared/
│   │   │   └── contact/
│   │   └── shared/          ← shared components (tag, badge, skeleton wrappers)
│   ├── bones/               ← Boneyard auto-generated .bones.json files
│   ├── styles/              ← global SCSS, design tokens
│   │   ├── _tokens.scss
│   │   ├── _typography.scss
│   │   ├── _reset.scss
│   │   ├── _utilities.scss
│   │   └── _animations.scss
│   ├── styles.scss          ← Angular global stylesheet (imports all partials)
│   └── main.ts
├── public/
│   └── assets/              ← images, CV PDF, drone videos
│       ├── avatar.jpg
│       ├── cv-wim-stienstra.pdf
│       ├── experience/      ← per-job images
│       ├── skills/          ← per-skill/category images
│       ├── hobbies/         ← mod screenshots, drone photos, music
│       └── blog/            ← blog post images (all posts share this folder)
├── .github/workflows/
│   └── deploy.yml           ← GitHub Actions → GitHub Pages
├── boneyard.config.json     ← Boneyard capture config
├── angular.json
├── tsconfig.json
└── package.json
```

---

## Visual Direction

- **Dark theme** (deep navy/charcoal `#080d1a`) with electric accent (`#4af0c8` — cyan-green)
- **Glassmorphism** cards with subtle blur + border glow
- **Monospace font** for code-style labels (JetBrains Mono); modern sans for body (Inter)
- **Pretext kinetic hero**: display text flows and physically avoids the cursor
- **GSAP ScrollTrigger**: sections slide and fade in as the user scrolls
- **Boneyard skeletons**: every data-loaded section shows a pixel-perfect animated skeleton before content appears
- **Animated CSS grid background**: subtle perspective grid on the page background
- Images alongside experience entries and skill categories (optional per entry)

---

## Content Update Workflow (for Wim)

### Portfolio Sections (JSON)
1. Open the relevant `.json` file in `src/content/` on GitHub or in VS Code
2. Edit text, add/change image paths, update tags or proficiency levels
3. Drop any new images into `public/assets/<section>/`
4. Commit → GitHub Actions automatically rebuilds and deploys in ~45 seconds

### Blog Posts (Markdown)
1. Create or edit `.md` file in `src/content/blog/` with frontmatter (title, date, slug, tags, excerpt, coverImage)
2. Write content in markdown with inline images using `/assets/blog/` paths
3. Drop any new images into `public/assets/blog/`
4. Commit → Blog index auto-generates, routes prerender, site deploys in ~60 seconds

---

## Build Steps (one per agent)

| File | Step |
|------|------|
| `01-project-setup.md` | Scaffold Angular 21 app, install all deps, configure static build |
| `02-content-layer.md` | Create all JSON content files with Wim's real data (incl. images + hobbies) |
| `03-design-system.md` | SCSS tokens, global styles, fonts, animation utilities |
| `04-hero-section.md` | Pretext kinetic hero component (Angular) |
| `05-about-section.md` | About / personal intro section (Angular) |
| `06-experience-timeline.md` | Interactive animated experience timeline + images |
| `07-projects-section.md` | Project showcase with hover effects |
| `08-skills-section.md` | Skills visualization + images + Boneyard skeleton |
| `09-contact-section.md` | Contact section with links |
| `10-deployment.md` | Static files build + upload to any web host (FTP/Netlify/CF Pages/Vercel) |
| `11-hobbies-section.md` | Hobbies gallery — game mods, drone footage, music production |
| `12-blog-section.md` | Blog with markdown posts, multi-image support, tags/search, code highlighting, TOC |
