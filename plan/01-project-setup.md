# Step 01 — Project Setup

## Objective
Scaffold the complete Vite + React project inside the existing `WimStienstra/WimStienstra` repository, install all dependencies, and verify the dev server runs.

---

## Prerequisites
- Node.js 20+
- The repository is cloned locally at the root

---

## Tasks

### 1. Scaffold Vite + React
Run in the repo root (NOT in a subdirectory — the portfolio **is** the repo):

```bash
npm create vite@latest . -- --template react
```

Accept overwrite prompts. This creates `src/`, `index.html`, `vite.config.js`, `package.json`.

### 2. Install Dependencies

```bash
npm install
npm install @chenglou/pretext
npm install gsap
npm install lucide-react
```

Dev dependencies:

```bash
npm install -D @vitejs/plugin-react
```

### 3. Configure Vite for GitHub Pages
In `vite.config.js`, set the `base` to the repo name so asset paths work on GitHub Pages:

```js
export default {
  base: '/',  // root domain (wimstienstra.nl points to this repo)
  plugins: [react()],
}
```

If during development the site is served from a subpath (e.g., `https://wimstienstra.github.io/WimStienstra/`), set `base: '/WimStienstra/'` instead.

### 4. Clean Boilerplate
- Remove all content from `src/App.css`
- Replace `src/App.jsx` with a bare-bones shell that imports each section component (stubs for now)
- Replace `src/index.css` with only a CSS reset and the `:root` custom properties (to be filled in step 03)

```jsx
// src/App.jsx
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import Contact from './components/Contact/Contact'

export default function App() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}
```

### 5. Create Stub Components
Create empty placeholder files for each section so the project compiles:

```
src/components/Hero/Hero.jsx
src/components/Hero/Hero.module.css
src/components/About/About.jsx
src/components/About/About.module.css
src/components/Experience/Experience.jsx
src/components/Experience/Experience.module.css
src/components/Projects/Projects.jsx
src/components/Projects/Projects.module.css
src/components/Skills/Skills.jsx
src/components/Skills/Skills.module.css
src/components/Contact/Contact.jsx
src/components/Contact/Contact.module.css
```

Each stub exports a `<section>` with the section name as a heading.

### 6. Create Content Directory
```
src/content/meta.json
src/content/experience.json
src/content/projects.json
src/content/skills.json
```

Leave them as empty `{}` objects for now — Step 02 fills them.

### 7. Verify Dev Server
```bash
npm run dev
```

The site should load at `http://localhost:5173` showing the stub sections.

---

## Acceptance Criteria
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` produces a `dist/` folder without errors
- [ ] All six section components render (as stubs) in the browser
- [ ] No leftover Vite boilerplate (counter button, Vite/React logos)
