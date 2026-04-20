# Step 06 — Experience Timeline

## Objective
Build an interactive, animated experience timeline as an Angular 21 standalone component that reads from `src/content/experience.json`. Each entry can display an optional image. A Boneyard skeleton is shown while content loads.

---

## Visual Design

```
02 / EXPERIENCE

[ skeleton shimmer while loading ]

│
├── ● Sep 2025 – Present
│   CJIB — Frontend Web Developer
│   [Angular] [Monorepo] [TypeScript]
│   ┌──────────────────────────────────────┐
│   │  [optional job screenshot/image]     │
│   └──────────────────────────────────────┘
│   > (click to expand description)
│
├── ● Sep 2024 – Sep 2025
│   CJIB — Full Stack Developer
│
...
```

---

## Implementation

### File: `src/app/components/experience/experience.component.ts`

```typescript
import { Component, OnInit, signal } from '@angular/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SkeletonComponent } from 'boneyard-js/angular'
import experienceData from '../../../content/experience.json'

gsap.registerPlugin(ScrollTrigger)

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  period: string
  location: string
  tags: string[]
  imageUrl: string
  description: string
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements OnInit {
  readonly experience: ExperienceEntry[] = experienceData
  openId = signal<string | null>(experienceData[0]?.id ?? null)
  isLoading = signal(true)

  ngOnInit(): void {
    // Simulate async load (replace with real async fetch if content moves to an API later)
    setTimeout(() => this.isLoading.set(false), 600)
  }

  toggle(id: string): void {
    this.openId.update(current => current === id ? null : id)
  }

  isOpen(id: string): boolean {
    return this.openId() === id
  }
}
```

---

### File: `src/app/components/experience/experience.component.html`

```html
<section id="experience" class="experience">
  <span class="label">02 / EXPERIENCE</span>
  <h2 class="heading">Career Journey</h2>

  <boneyard-skeleton name="experience" [loading]="isLoading()" animate="shimmer" [transition]="300">
    <div class="timeline">
      @for (entry of experience; track entry.id) {
        <article
          class="entry"
          [class.open]="isOpen(entry.id)"
          (click)="toggle(entry.id)"
          [attr.aria-expanded]="isOpen(entry.id)"
        >
          <div class="dot" aria-hidden="true">
            <div class="dot-inner"></div>
          </div>

          <div class="content">
            <time class="period">{{ entry.period }}</time>
            <h3 class="role">{{ entry.role }}</h3>
            <p class="company">{{ entry.company }}</p>

            <div class="tags">
              @for (tag of entry.tags; track tag) {
                <span class="tag">{{ tag }}</span>
              }
            </div>

            @if (entry.imageUrl) {
              <div class="entry-image-wrap" [class.visible]="isOpen(entry.id)">
                <img
                  [src]="entry.imageUrl"
                  [alt]="entry.company + ' — ' + entry.role"
                  class="entry-image"
                  loading="lazy"
                />
              </div>
            }

            <div class="description" [class.open]="isOpen(entry.id)">
              <p>{{ entry.description }}</p>
            </div>
          </div>
        </article>
      }
    </div>
  </boneyard-skeleton>
</section>
```

---

### File: `src/app/components/experience/experience.component.scss`

Key styles:

- `.experience` — `padding: var(--section-padding); max-width: var(--max-width); margin: 0 auto`
- `.timeline` — `position: relative; padding-left: var(--space-8)` with `::before` vertical line:
  ```scss
  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      transparent,
      var(--color-border) 10%,
      var(--color-border) 90%,
      transparent
    );
  }
  ```
- `.entry` — `position: relative; padding: var(--space-6) var(--space-8); cursor: pointer; border-radius: var(--radius-md); transition: background var(--duration-base) var(--ease-out-expo)`
  - `&:hover` — `background: var(--color-surface)`
- `.dot` / `.dot-inner` — circle on the timeline line; `.open .dot-inner` — `background: var(--color-accent); box-shadow: 0 0 12px var(--color-accent)`
- `.period` — `font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-muted)`
- `.role` — `font-size: var(--text-lg); font-weight: 600`
- `.company` — `color: var(--color-accent); font-size: var(--text-sm)`
- `.tag` — monospace pill with `var(--color-tag-bg)` and `var(--color-tag-text)`
- `.entry-image-wrap` — `max-height: 0; overflow: hidden; transition: max-height var(--duration-slow) var(--ease-out-expo); margin-top: var(--space-4)`
  - `.visible` — `max-height: 400px`
- `.entry-image` — `width: 100%; border-radius: var(--radius-md); border: 1px solid var(--color-border); object-fit: cover; max-height: 240px`
- `.description` — `max-height: 0; overflow: hidden; opacity: 0; transition: max-height var(--duration-slow) var(--ease-out-expo), opacity var(--duration-base)`
  - `.open` — `max-height: 600px; opacity: 1`

---

## Boneyard Skeleton Setup

After building the component, run Boneyard's CLI once to capture the skeleton:

```bash
npx boneyard-js build
```

This visits `http://localhost:4200`, finds `<boneyard-skeleton name="experience">`, snapshots its layout at 375/768/1280px, and writes `src/bones/experience.bones.json`.

Import the registry once in `src/main.ts`:
```typescript
import './bones/registry'
```

---

## Scroll Animation (GSAP ScrollTrigger)
After skeleton fades out, each `.entry` animates in:
- `x: -30 → 0`, `opacity: 0 → 1`, stagger `0.1s`, trigger `"top 85%"`

Use `ScrollTrigger.create` inside a `ngAfterViewInit` and clean up in `ngOnDestroy`.

---

## Acceptance Criteria
- [ ] All experience entries from `experience.json` render
- [ ] Boneyard skeleton shimmer shows for ~600ms, then fades to real content
- [ ] `src/bones/experience.bones.json` exists after running `npx boneyard-js build`
- [ ] Clicking an entry expands/collapses description with smooth height transition
- [ ] Entry image shows/hides when entry is opened (only if `imageUrl` is set)
- [ ] First entry is open by default
- [ ] Timeline vertical line renders correctly
- [ ] GSAP ScrollTrigger entrance animation fires correctly
- [ ] Section has `id="experience"` for nav anchor
- [ ] Responsive: readable on 375px mobile width
