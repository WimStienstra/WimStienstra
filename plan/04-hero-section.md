# Step 04 — Hero Section (Pretext Kinetic Typography)

## Objective
Build the most visually striking section of the site: a full-viewport hero featuring display text rendered with `@chenglou/pretext` for kinetic, cursor-reactive layout, layered over the animated grid background. Built as an Angular 21 standalone component.

---

## Visual Design

```
┌─────────────────────────────────────────────┐
│                                             │
│   [ subtle animated grid background ]       │
│                                             │
│   FRONTEND                                  │
│   DEVELOPER          ← Pretext kinetic      │
│                         large display text  │
│   Wim Stienstra                             │
│   ─────────────────────                     │
│   Angular · Monorepo · AI-assisted          │
│   [ View Work ↓ ]  [ LinkedIn ↗ ]           │
│                                             │
│        scroll to explore ↓                  │
└─────────────────────────────────────────────┘
```

The large display text ("FRONTEND DEVELOPER") uses Pretext to flow and reflow around a phantom obstacle that follows the mouse cursor, making the text appear to physically avoid the pointer.

---

## Implementation

### File: `src/app/components/hero/hero.component.ts`

```typescript
import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone
} from '@angular/core'
import { prepare, layout } from '@chenglou/pretext'
import { gsap } from 'gsap'
import { useWebHaptics } from 'web-haptics/react'

const HERO_TEXT = 'FRONTEND DEVELOPER'
const FONT = 'bold 7rem Inter'

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroContainer') containerRef!: ElementRef<HTMLElement>

  readonly words = HERO_TEXT.split(' ')
  wordEls: HTMLElement[] = []

  private prepared: Awaited<ReturnType<typeof prepare>> | null = null
  private mouseMoveListener!: (e: MouseEvent) => void
  private haptics = useWebHaptics()

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // Prepare Pretext outside Angular's change detection
    this.ngZone.runOutsideAngular(() => {
      prepare(HERO_TEXT, FONT).then(p => {
        this.prepared = p
        this.initMouseEffect()
      })
      this.playEntranceAnimation()
    })
  }

  private initMouseEffect(): void {
    const el = this.containerRef.nativeElement
    this.mouseMoveListener = (e: MouseEvent) => {
      if (!this.prepared) return
      const rect = el.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      // Re-layout with a circular obstacle at cursor position
      // Note: check the latest @chenglou/pretext API for the obstacles option
      const result = layout(this.prepared, rect.width, {
        obstacles: [{ x: mx - 60, y: my - 60, width: 120, height: 120 }]
      })
      result.lines?.forEach((line: any, li: number) => {
        line.words?.forEach((word: any, wi: number) => {
          const ref = this.wordEls[li * 100 + wi]
          if (ref) {
            gsap.to(ref, { x: word.x, y: word.y, duration: 0.4, ease: 'power3.out' })
          }
        })
      })
    }
    el.addEventListener('mousemove', this.mouseMoveListener)
  }

  private playEntranceAnimation(): void {
    // Stagger words up on load
    gsap.fromTo(
      this.wordEls,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }

  // Haptic feedback for CTA interactions
  onCtaClick(type: 'primary' | 'secondary'): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      this.haptics.trigger(type === 'primary' ? 'heavy' : 'medium')
    }
  }

  ngOnDestroy(): void {
    const el = this.containerRef?.nativeElement
    if (el && this.mouseMoveListener) {
      el.removeEventListener('mousemove', this.mouseMoveListener)
    }
  }
}
```

---

### File: `src/app/components/hero/hero.component.html`

```html
<section class="hero" #heroContainer>
  <div class="pretext-container" aria-hidden="true">
    @for (word of words; track word) {
      <span class="hero-word" #wordEl>{{ word }}</span>
    }
  </div>

  <div class="meta">
    <h1 class="name">Wim Stienstra</h1>
    <div class="divider"></div>
    <p class="tagline">Angular · Monorepo · AI-assisted development</p>
    <div class="cta">
      <a 
        href="#projects" 
        class="cta-primary"
        (pointerdown)="onCtaClick('primary')">View Work ↓</a>
      <a
        href="https://www.linkedin.com/in/wimstienstra"
        target="_blank"
        rel="noopener noreferrer"
        class="cta-secondary"
        (pointerdown)="onCtaClick('secondary')"
      >LinkedIn ↗</a>
    </div>
  </div>

  <div class="scroll-hint">
    <span>scroll to explore</span>
    <div class="scroll-line"></div>
  </div>
</section>
```

> **Note on `@ViewChild` vs template refs for `wordEls`:** Use `@ViewChildren('wordEl')` with a `QueryList<ElementRef>` to collect word elements, then map them to `HTMLElement[]` in `ngAfterViewInit`. The `wordEls` array feeds into GSAP and Pretext layout updates.

Update `HeroComponent` to use `@ViewChildren`:
```typescript
@ViewChildren('wordEl') wordElRefs!: QueryList<ElementRef<HTMLElement>>

ngAfterViewInit(): void {
  this.wordEls = this.wordElRefs.map(r => r.nativeElement)
  // ... rest of init
}
```

---

### File: `src/app/components/hero/hero.component.scss`

Key styles:
- `.hero` — `min-height: 100svh; display: grid; align-content: center; position: relative; overflow: hidden`
- `.pretext-container` — `position: relative; height: 40vh; width: 100%`
- `.hero-word` — `position: absolute; font-size: var(--text-hero); font-weight: 900; color: var(--color-text); will-change: transform`
- `.name` — `font-size: var(--text-2xl); color: var(--color-accent); font-family: var(--font-mono)`
- `.divider` — `width: 60px; height: 2px; background: var(--color-accent); margin: var(--space-4) 0`
- `.cta-primary` — filled button: `background: var(--color-accent); color: var(--color-bg); border-radius: var(--radius-sm); padding: var(--space-3) var(--space-6); font-weight: 600; text-decoration: none`
- `.cta-secondary` — ghost button: `border: 1px solid var(--color-accent); color: var(--color-accent); border-radius: var(--radius-sm); padding: var(--space-3) var(--space-6); text-decoration: none`
- `.scroll-line` — thin vertical animated pulsing line: `width: 1px; height: 40px; background: var(--color-accent); animation: pulse 2s ease-in-out infinite`

---

## Entrance Animation (GSAP)
On `ngAfterViewInit`:
1. Word elements slide up from `y: 40 → 0` with stagger
2. `.meta` children (`.name`, `.divider`, `.tagline`, `.cta`) fade in sequentially after

---

## Fallback (Accessibility)
The semantic `<h1 class="name">Wim Stienstra</h1>` is always in the DOM. The Pretext `<div class="pretext-container">` has `aria-hidden="true"`. Screen readers read the heading correctly.

---

## Pretext Obstacle API Note
Check the latest `@chenglou/pretext` npm README for the exact `layout()` API signature. If the `obstacles` option is not yet in the published version, implement the repulsion manually:
- On each `mousemove`, iterate over `this.wordEls`
- Calculate each word's distance to the cursor
- Apply a `translate` offset proportional to `1 / distance²`
- Animate with `gsap.to(el, { x, y, duration: 0.4 })`

---

## Acceptance Criteria
- [ ] Full-viewport hero renders without layout shift
- [ ] Pretext library initialises and measures the hero text
- [ ] Moving cursor over hero causes text to dynamically reflow/repulse
- [ ] GSAP entrance animation plays on page load
- [ ] `<h1>Wim Stienstra</h1>` is present for screen readers
- [ ] CTA buttons scroll to `#projects` and open LinkedIn correctly
- [ ] Mouse listener is removed in `ngOnDestroy` (no memory leaks)
- [ ] Hero looks correct on mobile (≥ 375px) — Pretext effect disabled on touch devices
