# Step 08 — Skills Section

## Objective
Build a skills visualization as an Angular 21 standalone component that reads from the updated `src/content/skills.json` (which now uses the `{ imageUrl, items }` object structure per category). An optional category image displays alongside the skill rows. A Boneyard skeleton is shown while content loads.

---

## Visual Design

```
04 / SKILLS

  [ Core ]  [ Testing ]  [ Ecosystem ]  [ AI ]  [ Soft Skills ]
     ↑ tab filter

  ┌──────────────────────────────────────────┐
  │  [optional category image]               │
  │  Angular         ●●●●●                   │
  │  TypeScript      ●●●●●                   │
  │  NX Monorepo     ●●●●●                   │
  │  RxJS            ●●●●○                   │
  └──────────────────────────────────────────┘

  + floating skill cloud behind the cards
```

---

## Implementation

### File: `src/app/components/skills/skills.component.ts`

```typescript
import { Component, OnInit, signal, computed, AfterViewInit, ElementRef, ViewChild } from '@angular/core'
import { SkeletonComponent } from 'boneyard-js/angular'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import skillsData from '../../../content/skills.json'

gsap.registerPlugin(ScrollTrigger)

interface SkillItem { name: string; level: number }
interface SkillCategory { imageUrl: string; items: SkillItem[] }

const CATEGORY_LABELS: Record<string, string> = {
  core:      'Core',
  testing:   'Testing',
  ecosystem: 'Ecosystem',
  tooling:   'Tooling',
  ai:        'AI',
  soft:      'Soft Skills',
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit, AfterViewInit {
  readonly skills = skillsData as Record<string, SkillCategory>
  readonly categories = Object.keys(skillsData)
  readonly categoryLabels = CATEGORY_LABELS
  readonly dotRange = [0, 1, 2, 3, 4] // proficiency dots (max 5)

  activeCategory = signal(this.categories[0])
  isLoading = signal(true)

  activeData = computed(() => this.skills[this.activeCategory()])

  ngOnInit(): void {
    setTimeout(() => this.isLoading.set(false), 500)
  }

  ngAfterViewInit(): void {
    ScrollTrigger.create({
      trigger: '.skills',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.skill-row',
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out' }
        )
      }
    })
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat)
  }

  getLabel(cat: string): string {
    return CATEGORY_LABELS[cat] ?? cat
  }
}
```

---

### File: `src/app/components/skills/skills.component.html`

```html
<section id="skills" class="skills">
  <span class="label">04 / SKILLS</span>
  <h2 class="heading">Skills &amp; Expertise</h2>

  <div class="tabs" role="tablist">
    @for (cat of categories; track cat) {
      <button
        role="tab"
        [attr.aria-selected]="activeCategory() === cat"
        class="tab"
        [class.active]="activeCategory() === cat"
        (click)="setCategory(cat)"
      >
        {{ getLabel(cat) }}
      </button>
    }
  </div>

  <boneyard-skeleton name="skills" [loading]="isLoading()" animate="shimmer" [transition]="300">
    <div class="skill-panel" role="tabpanel">
      @if (activeData().imageUrl) {
        <div class="category-image-wrap">
          <img
            [src]="activeData().imageUrl"
            [alt]="getLabel(activeCategory()) + ' skills'"
            class="category-image"
            loading="lazy"
          />
        </div>
      }

      <div class="skill-list">
        @for (skill of activeData().items; track skill.name) {
          <div class="skill-row">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="dots" [attr.aria-label]="skill.level + ' out of 5'">
              @for (i of dotRange; track i) {
                <span class="dot" [class.filled]="i < skill.level" [class.empty]="i >= skill.level"
                      [style.animation-delay]="(i * 60) + 'ms'"></span>
              }
            </span>
          </div>
        }
      </div>
    </div>
  </boneyard-skeleton>

  <!-- Decorative background tag cloud -->
  <div class="tag-cloud" aria-hidden="true">
    @for (cat of categories; track cat) {
      @for (skill of skills[cat].items; track skill.name) {
        <span class="cloud-tag">{{ skill.name }}</span>
      }
    }
  </div>
</section>
```

---

### File: `src/app/components/skills/skills.component.scss`

Key styles:

- `.skills` — `padding: var(--section-padding); max-width: var(--max-width); margin: 0 auto; position: relative`
- `.tabs` — `display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-8)`
- `.tab` — monospace font, ghost pill style; `.active` — `background: var(--color-tag-bg); color: var(--color-accent); border-color: var(--color-accent)`
- `.skill-panel` — `display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8); align-items: start`
  - Mobile: `grid-template-columns: 1fr`
- `.category-image-wrap` — `border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border)`
- `.category-image` — `width: 100%; height: 200px; object-fit: cover`
  - If no image, the `.skill-list` spans the full width: `grid-column: 1 / -1` (handle with `@if` in template)
- `.skill-list` — `display: flex; flex-direction: column; gap: var(--space-3)`
- `.skill-row` — `display: flex; justify-content: space-between; align-items: center; padding: var(--space-4) var(--space-6); background: var(--color-surface); border-radius: var(--radius-sm); border: 1px solid var(--color-border)`
  - On hover: `border-color: var(--color-accent-dim)`
- `.dots` — `display: flex; gap: 5px`
- `.dot` — `width: 8px; height: 8px; border-radius: 50%; animation: dotPop var(--duration-base) var(--ease-bounce) both`
  - `.filled` — `background: var(--color-accent); box-shadow: 0 0 6px var(--color-accent)`
  - `.empty` — `background: var(--color-surface-2); border: 1px solid var(--color-border)`
- `.tag-cloud` — `position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: -1`; `.cloud-tag` positioned randomly via a `ngAfterViewInit` loop

---

## Boneyard Skeleton Setup

After building the component, run the Boneyard CLI to capture the skeleton:

```bash
npx boneyard-js build
```

This writes `src/bones/skills.bones.json`. Import the registry in `src/main.ts` (same file as the experience registry — one import covers all):

```typescript
import './bones/registry'
```

---

## Decorative Tag Cloud Positioning
In `ngAfterViewInit`, randomly position `.cloud-tag` elements:

```typescript
const tags: NodeListOf<HTMLElement> = document.querySelectorAll('.cloud-tag')
tags.forEach(tag => {
  tag.style.left = Math.random() * 90 + '%'
  tag.style.top  = Math.random() * 90 + '%'
})
```

---

## Acceptance Criteria
- [ ] All skill categories from `skills.json` appear as tabs
- [ ] Clicking a tab shows the correct skills with a fade animation
- [ ] Proficiency dots animate with staggered pop effect
- [ ] Filled dots glow with accent color
- [ ] Category image displays when `imageUrl` is set; skill list spans full width when no image
- [ ] Boneyard skeleton shimmer shows for ~500ms then fades to real content
- [ ] `src/bones/skills.bones.json` exists after running `npx boneyard-js build`
- [ ] Decorative tag cloud renders in the background (aria-hidden)
- [ ] GSAP ScrollTrigger entrance animation fires correctly
- [ ] Section has `id="skills"` for nav anchor
- [ ] Keyboard accessible: tabs are focusable, `aria-selected` updates correctly
- [ ] Responsive: 2-col panel on desktop (image + list), 1-col on mobile
