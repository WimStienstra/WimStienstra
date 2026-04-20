# Step 07 — Projects Section

## Objective
Build a visually bold projects showcase as an Angular 21 standalone component that reads from `src/content/projects.json`. Featured projects get large cards with hover effects; non-featured ones appear in a compact grid below. Optional images display on cards that have them.

---

## Visual Design

```
03 / PROJECTS

Featured:
┌──────────────────────────────────────────────┐
│  [optional image]                            │
│  EXPO — Angular Monorepo Platform            │
│  ──────────────────────────                  │
│  Monorepo platform unifying enforcement      │
│  apps and legacy systems at the CJIB.        │
│                                              │
│  [Angular] [NX] [TypeScript] [Monorepo]      │
│                             [Professional]   │
└──────────────────────────────────────────────┘
┌─────────────────────┐ ┌────────────────────┐
│ Digitaal Loket ...  │ │ Jip Snel Chatbot   │
└─────────────────────┘ └────────────────────┘

More Projects ↓
┌────────┐ ┌────────┐ ┌────────┐
│ Game   │ │ IBC    │ │ Quiz   │
└────────┘ └────────┘ └────────┘
```

---

## Implementation

### File: `src/app/components/projects/projects.component.ts`

```typescript
import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projectsData from '../../../content/projects.json'

gsap.registerPlugin(ScrollTrigger)

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  type: 'Professional' | 'Personal' | 'Study'
  imageUrl: string
  featured: boolean
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  readonly featured: Project[] = projectsData.filter(p => p.featured) as Project[]
  readonly others: Project[] = projectsData.filter(p => !p.featured) as Project[]
  readonly heroProject: Project | undefined = this.featured[0]
  readonly restFeatured: Project[] = this.featured.slice(1)

  @ViewChildren('card') cardRefs!: QueryList<ElementRef>

  ngAfterViewInit(): void {
    const cards = this.cardRefs.map(r => r.nativeElement)
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects', start: 'top 80%' }
      }
    )

    // 3D tilt on hover
    cards.forEach(card => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        gsap.to(card, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 800, duration: 0.4, ease: 'power2.out' })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6 })
      })
    })
  }
}
```

---

### File: `src/app/components/projects/projects.component.html`

```html
<section id="projects" class="projects">
  <span class="label">03 / PROJECTS</span>
  <h2 class="heading">Selected Work</h2>

  @if (heroProject) {
    <article class="card large glass-card" #card>
      @if (heroProject.imageUrl) {
        <img [src]="heroProject.imageUrl" [alt]="heroProject.title" class="card-image" loading="lazy" />
      }
      <div class="card-inner">
        <span class="badge" [class]="'badge-' + heroProject.type.toLowerCase()">{{ heroProject.type }}</span>
        <h3 class="title">{{ heroProject.title }}</h3>
        <p class="description">{{ heroProject.description }}</p>
        <div class="tags">
          @for (tag of heroProject.tags; track tag) {
            <span class="tag">{{ tag }}</span>
          }
        </div>
      </div>
      <div class="card-glow" aria-hidden="true"></div>
    </article>
  }

  @if (restFeatured.length) {
    <div class="featured-grid">
      @for (project of restFeatured; track project.id) {
        <article class="card glass-card" #card>
          @if (project.imageUrl) {
            <img [src]="project.imageUrl" [alt]="project.title" class="card-image" loading="lazy" />
          }
          <div class="card-inner">
            <span class="badge" [class]="'badge-' + project.type.toLowerCase()">{{ project.type }}</span>
            <h3 class="title">{{ project.title }}</h3>
            <p class="description">{{ project.description }}</p>
            <div class="tags">
              @for (tag of project.tags; track tag) {
                <span class="tag">{{ tag }}</span>
              }
            </div>
          </div>
          <div class="card-glow" aria-hidden="true"></div>
        </article>
      }
    </div>
  }

  @if (others.length) {
    <h3 class="more-heading">More Projects</h3>
    <div class="more-grid">
      @for (project of others; track project.id) {
        <article class="card glass-card" #card>
          @if (project.imageUrl) {
            <img [src]="project.imageUrl" [alt]="project.title" class="card-image small" loading="lazy" />
          }
          <div class="card-inner">
            <span class="badge" [class]="'badge-' + project.type.toLowerCase()">{{ project.type }}</span>
            <h3 class="title small">{{ project.title }}</h3>
            <p class="description">{{ project.description }}</p>
            <div class="tags">
              @for (tag of project.tags; track tag) {
                <span class="tag">{{ tag }}</span>
              }
            </div>
          </div>
          <div class="card-glow" aria-hidden="true"></div>
        </article>
      }
    </div>
  }
</section>
```

---

### File: `src/app/components/projects/projects.component.scss`

Key styles:

- `.projects` — `padding: var(--section-padding); max-width: var(--max-width); margin: 0 auto`
- `.card` — extends `.glass-card`; `position: relative; overflow: hidden`
- `.card-image` — `width: 100%; max-height: 220px; object-fit: cover; border-radius: var(--radius-md) var(--radius-md) 0 0; border-bottom: 1px solid var(--color-border)`
- `.card-image.small` — `max-height: 140px`
- `.large .title` — `font-size: var(--text-2xl)`
- `.card-inner` — `position: relative; z-index: 1; padding: var(--space-8)`
- `.card-glow`:
  ```scss
  .card-glow {
    position: absolute; inset: 0;
    background: radial-gradient(circle at 0% 0%, var(--color-accent-glow), transparent 60%);
    opacity: 0;
    transition: opacity var(--duration-slow) var(--ease-out-expo);
    pointer-events: none;
  }
  .card:hover .card-glow { opacity: 1; }
  ```
- `.badge` — monospace pill:
  ```scss
  &.badge-professional { background: rgba(74,240,200,0.1); color: var(--color-accent); }
  &.badge-personal     { background: rgba(160,100,240,0.1); color: #a064f0; }
  &.badge-study        { background: rgba(240,180,74,0.1);  color: #f0b44a; }
  ```
- `.featured-grid` — `display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); margin-bottom: var(--space-12)`
- `.more-grid` — `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4)`
  - Responsive breakpoints: 2-col at 900px, 1-col at 600px

---

## Acceptance Criteria
- [ ] All projects from `projects.json` render
- [ ] Cards with `imageUrl` show the image at the top of the card
- [ ] Featured projects have visual hierarchy (large card + 2-col grid)
- [ ] Non-featured projects appear in the compact "More Projects" grid
- [ ] Card glow effect works on hover
- [ ] Type badge color-coded (Professional/Personal/Study)
- [ ] GSAP tilt effect works on desktop hover
- [ ] GSAP ScrollTrigger entrance animation fires correctly
- [ ] Section has `id="projects"` for nav anchor
- [ ] Responsive: correct breakpoints on mobile/tablet/desktop
