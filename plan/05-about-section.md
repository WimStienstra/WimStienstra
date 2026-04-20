# Step 05 — About Section

## Objective
Build the About section as an Angular 21 standalone component: a personal intro that communicates who Wim is beyond a job title — his values, working style, and unique combination of engineering + AI + hobbies.

---

## Visual Design

```
┌─────────────────────────────────────────────────┐
│  01 / ABOUT                                     │
│                                                 │
│  ┌──────────┐   Frontend developer with a       │
│  │          │   focus on scalable architecture, │
│  │  [photo] │   user-friendly interfaces, and   │
│  │          │   future-proof solutions...        │
│  └──────────┘                                   │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Angular  │  │  AI-Dev  │  │  Scrum   │      │
│  │ Monorepo │  │ Explorer │  │  PSM I   │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

---

## Implementation

### File: `src/app/components/about/about.component.ts`

```typescript
import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import meta from '../../../content/meta.json'

gsap.registerPlugin(ScrollTrigger)

interface Highlight {
  icon: string
  title: string
  body: string
}

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
  readonly meta = meta

  readonly highlights: Highlight[] = [
    {
      icon: '⬡',
      title: 'Monorepo Architecture',
      body: 'Building scalable Angular monorepo platforms at the CJIB, unifying new and legacy systems under one roof.'
    },
    {
      icon: '◎',
      title: 'AI-Assisted Development',
      body: 'Exploring AI since 2019 — structured prompting, MCP, and agent workflows as first-class engineering tools.'
    },
    {
      icon: '◈',
      title: 'Scrum & Team Leadership',
      body: 'PSM I certified. Served as Scrum Master during my studies, combining technical and leadership skills.'
    }
  ]

  @ViewChildren('highlightCard') cardRefs!: QueryList<ElementRef>

  ngAfterViewInit(): void {
    ScrollTrigger.create({
      trigger: '.about-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.avatar-wrap', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
        gsap.fromTo('.bio', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 })
        gsap.fromTo(
          this.cardRefs.map(r => r.nativeElement),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out', delay: 0.3 }
        )
      }
    })
  }
}
```

---

### File: `src/app/components/about/about.component.html`

```html
<section id="about" class="about-section">
  <span class="label">01 / ABOUT</span>

  <div class="grid">
    <div class="avatar-wrap">
      <img
        [src]="meta.avatarUrl"
        alt="Wim Stienstra"
        class="avatar"
        loading="lazy"
      />
      <div class="avatar-glow" aria-hidden="true"></div>
    </div>

    <div class="bio">
      <h2 class="heading">
        Building things that <span class="accent">scale</span>.
      </h2>
      <p class="text">{{ meta.about }}</p>
      <a [href]="meta.cvUrl" class="cv-link" download>
        Download CV ↓
      </a>
    </div>
  </div>

  <div class="highlights">
    @for (h of highlights; track h.title) {
      <div class="card glass-card" #highlightCard>
        <span class="card-icon">{{ h.icon }}</span>
        <h3 class="card-title">{{ h.title }}</h3>
        <p class="card-body">{{ h.body }}</p>
      </div>
    }
  </div>
</section>
```

---

### File: `src/app/components/about/about.component.scss`

Key styles:
- `.about-section` — `padding: var(--section-padding); max-width: var(--max-width); margin: 0 auto`
- `.label` — use the `section-label` mixin from `_utilities.scss`
- `.grid` — `display: grid; grid-template-columns: 280px 1fr; gap: var(--space-16); align-items: center`
  - `@media (max-width: 768px)` — `grid-template-columns: 1fr`
- `.avatar-wrap` — `position: relative`
- `.avatar` — `width: 100%; border-radius: var(--radius-lg); border: 2px solid var(--color-border); filter: grayscale(20%)`
- `.avatar-glow` — `position: absolute; inset: -20px; background: radial-gradient(circle, var(--color-accent-glow), transparent 70%); z-index: -1`
- `.heading` — `font-size: var(--text-xl); font-weight: 700`
- `.accent` — `color: var(--color-accent)`
- `.cv-link` — ghost button style matching `.cta-secondary` from hero
- `.highlights` — `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); margin-top: var(--space-12)`
  - Mobile: `grid-template-columns: 1fr`
- `.card` (uses `.glass-card`) — `padding: var(--space-8)`
- `.card-icon` — `font-size: 2rem; color: var(--color-accent); display: block; margin-bottom: var(--space-4)`

---

## Avatar Image
Place the photo at `public/assets/avatar.jpg`. If no photo is available, use a stylised SVG placeholder with the initials "WS" in accent color on a dark background.

---

## Acceptance Criteria
- [ ] Section renders with bio text and meta pulled from `meta.json`
- [ ] Avatar image displays with glow effect
- [ ] Three highlight cards visible, styled as glass cards
- [ ] Responsive: single-column on mobile
- [ ] GSAP ScrollTrigger entrance animation works (avatar in from left, bio from right, cards from below)
- [ ] CV download link points to `/assets/cv-wim-stienstra.pdf`
- [ ] Section has `id="about"` for nav anchor
- [ ] No memory leaks: ScrollTrigger instances cleaned up on component destroy
