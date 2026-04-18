# Plan Overview — Wim Stienstra Portfolio

## Goal
Build a flashy, recruiter-impressing frontend portfolio for Wim Stienstra that showcases Angular/monorepo expertise, creative engineering, and a forward-thinking mindset. The site must be easy to update without touching code.

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **React 19 + Vite** | Fast DX, huge ecosystem, Pretext works great with it |
| Text layout / effects | **`@chenglou/pretext`** | Kinetic, physics-driven typography in the hero; zero-dependency, 15 KB |
| Animation | **GSAP (GreenSock)** | Industry-standard, buttery scroll + entrance animations |
| Styling | **CSS Modules + CSS custom properties** | Scoped styles, zero runtime, easy theming |
| Content | **JSON files in `src/content/`** | Edit one file to update any section—no CMS login needed |
| Icons | **Lucide React** | Clean, consistent, tree-shakeable |
| Deployment | **GitHub Pages via GitHub Actions** | Free, fast, already in the WimStienstra repo |
| Domain | **wimstienstra.nl** | Existing domain, point DNS to GitHub Pages |

> **Why no headless CMS?** Wim is a developer — JSON files in the repo are version-controlled, diff-friendly, and editable in VS Code or directly on GitHub. If a GUI is wanted later, Tina CMS (git-backed, free tier) can be dropped in without changing the architecture.

---

## Architecture

```
WimStienstra/WimStienstra (GitHub repo)
├── plan/                  ← this folder (per-step agent instructions)
├── src/
│   ├── content/           ← ALL editable content lives here (JSON)
│   │   ├── meta.json
│   │   ├── experience.json
│   │   ├── projects.json
│   │   └── skills.json
│   ├── components/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Experience/
│   │   ├── Projects/
│   │   ├── Skills/
│   │   └── Contact/
│   ├── hooks/
│   ├── styles/            ← global CSS, design tokens
│   └── main.jsx
├── public/
│   └── assets/            ← images, CV PDF
├── .github/workflows/
│   └── deploy.yml         ← GitHub Actions → GitHub Pages
├── index.html
├── vite.config.js
└── package.json
```

---

## Visual Direction

- **Dark theme** (deep navy/charcoal `#0a0f1e`) with electric accent (`#4af0c8` — cyan-green)
- **Glassmorphism** cards with subtle blur + border glow
- **Monospace font** for code-style labels (JetBrains Mono); modern sans for body (Inter)
- **Pretext kinetic hero**: name/title wraps, flows, and reacts to cursor movement
- **GSAP ScrollTrigger**: sections slide and fade in as the user scrolls
- **Particle/grid background**: subtle CSS animated grid that shifts on scroll
- No full-page loaders — everything is performant and accessible

---

## Content Update Workflow (for Wim)

1. Open `src/content/<section>.json` on GitHub or in VS Code
2. Edit the data (job title, project description, skill, etc.)
3. Commit → GitHub Actions automatically rebuilds and deploys in ~30 seconds

---

## Build Steps (one per agent)

| File | Step |
|------|------|
| `01-project-setup.md` | Scaffold Vite + React, install all deps, configure GitHub Pages |
| `02-content-layer.md` | Create all JSON content files with Wim's real data |
| `03-design-system.md` | CSS tokens, global styles, fonts, animation utilities |
| `04-hero-section.md` | Pretext kinetic hero component |
| `05-about-section.md` | About / personal intro section |
| `06-experience-timeline.md` | Interactive animated experience timeline |
| `07-projects-section.md` | Project showcase with hover effects |
| `08-skills-section.md` | Skills visualization component |
| `09-contact-section.md` | Contact section with links and optional form |
| `10-deployment.md` | GitHub Actions workflow + GitHub Pages config |
