# Step 01 — Project Setup

## Objective
Scaffold a fresh Angular 19 application inside the existing `WimStienstra/WimStienstra` repository using the Angular CLI, install all dependencies (including Pretext, GSAP, and Boneyard), and verify the dev server and build work.

---

## Prerequisites
- Node.js 20+
- Angular CLI 19: `npm install -g @angular/cli@19`
- The repository is cloned locally at the root

---

## Tasks

### 1. Scaffold Angular App
Run in the repo root. The portfolio **is** the repo, so scaffold directly here.

```bash
ng new wimstienstra --directory . --routing false --style scss --standalone --skip-git
```

Flags:
- `--directory .` — scaffold into the current directory
- `--routing false` — single-page app, no router needed
- `--style scss` — SCSS for all component styles
- `--standalone` — use standalone components (Angular 19 default; no NgModules)
- `--skip-git` — don't reinitialise git (repo already exists)

Accept any overwrite prompts for `package.json`, `tsconfig.json`, `README.md`.

### 2. Install Dependencies

```bash
npm install @chenglou/pretext
npm install gsap
npm install boneyard-js
npm install lucide-angular
```

Dev dependencies (Boneyard uses a CLI to capture bones):

```bash
npm install -D boneyard-js   # already in deps above; the CLI is included
```

### 3. Enable JSON Imports
In `tsconfig.json`, ensure `resolveJsonModule` is enabled so content JSON files can be imported directly:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

### 4. Configure `angular.json` for GitHub Pages
Set `baseHref` so asset paths resolve correctly when served from the root domain `wimstienstra.nl`:

In `angular.json`, under `projects.wimstienstra.architect.build.options`:
```json
{
  "baseHref": "/"
}
```

Also update the `assets` glob to include the `public/assets` folder (Angular 17+ uses `public/` as the static assets root by default — confirm this is present in the generated config).

### 5. Create Boneyard Config
Create `boneyard.config.json` in the repo root:

```json
{
  "breakpoints": [375, 768, 1280],
  "out": "./src/bones",
  "wait": 1000,
  "color": "rgba(74, 240, 200, 0.08)",
  "darkColor": "rgba(74, 240, 200, 0.06)",
  "animate": "shimmer"
}
```

> The `shimmer` animation on the accent color creates a subtle cyan glow that matches the site's design language.

### 6. Update `AppComponent` Shell
Replace the generated `src/app/app.component.ts` / `.html` with a minimal shell that declares all section components:

```typescript
// src/app/app.component.ts
import { Component } from '@angular/core'
import { HeroComponent }       from './components/hero/hero.component'
import { AboutComponent }      from './components/about/about.component'
import { ExperienceComponent } from './components/experience/experience.component'
import { ProjectsComponent }   from './components/projects/projects.component'
import { SkillsComponent }     from './components/skills/skills.component'
import { HobbiesComponent }    from './components/hobbies/hobbies.component'
import { ContactComponent }    from './components/contact/contact.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    HobbiesComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

```html
<!-- src/app/app.component.html -->
<main>
  <app-hero />
  <app-about />
  <app-experience />
  <app-projects />
  <app-skills />
  <app-hobbies />
  <app-contact />
</main>
```

### 7. Create Stub Components
Use the Angular CLI to generate all section components as stubs:

```bash
ng generate component components/hero       --standalone --inline-style false --skip-tests
ng generate component components/about      --standalone --inline-style false --skip-tests
ng generate component components/experience --standalone --inline-style false --skip-tests
ng generate component components/projects   --standalone --inline-style false --skip-tests
ng generate component components/skills     --standalone --inline-style false --skip-tests
ng generate component components/hobbies    --standalone --inline-style false --skip-tests
ng generate component components/contact    --standalone --inline-style false --skip-tests
```

Each stub renders a `<section>` with a placeholder heading:
```html
<!-- e.g. src/app/components/hero/hero.component.html -->
<section id="hero"><h2>Hero (stub)</h2></section>
```

### 8. Create Content Directory
```
src/content/meta.json
src/content/experience.json
src/content/projects.json
src/content/skills.json
src/content/hobbies.json
```

Leave them as empty `{}` or `[]` for now — Step 02 fills them.

### 9. Create Asset Directories
```bash
mkdir -p public/assets/experience
mkdir -p public/assets/skills
mkdir -p public/assets/hobbies
```

### 10. Verify Dev Server
```bash
ng serve
```

The site should load at `http://localhost:4200` showing all stub sections.

---

## Acceptance Criteria
- [ ] `ng serve` starts without errors
- [ ] `ng build` produces a `dist/wimstienstra/browser/` folder without errors
- [ ] All seven section components render (as stubs) in the browser
- [ ] No leftover Angular boilerplate (default hero image, links to angular.io)
- [ ] `tsconfig.json` has `resolveJsonModule: true`
- [ ] `boneyard.config.json` exists at repo root
- [ ] Asset directories created under `public/assets/`
