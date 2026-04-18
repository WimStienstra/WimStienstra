# Step 04 — Hero Section (Pretext Kinetic Typography)

## Objective
Build the most visually striking section of the site: a full-viewport hero featuring Wim's name rendered with `@chenglou/pretext` for kinetic, cursor-reactive text layout, layered over the animated grid background.

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

### File: `src/components/Hero/Hero.jsx`

#### Step 1 — Pretext canvas setup
Pretext works by measuring text on a hidden Canvas element and computing line breaks in pure math. The hero renders the large heading on a real `<canvas>` element (not DOM text) for maximum creative control, or uses the DOM approach with calculated offsets.

**Recommended approach for this hero: DOM + Pretext measurements**
- Use Pretext's `prepare()` + `layout()` to calculate how the text wraps at the current container width
- Render each word as a `<span>` positioned with CSS `transform: translate(x, y)` driven by Pretext's computed positions
- On `mousemove`, update a "repulsion point" and re-run `layout()` with a custom `obstacles` array (Pretext supports this for obstacle-aware text flow)
- Animate each word's position with `gsap.to()` for smooth interpolation

```jsx
import { prepare, layout } from '@chenglou/pretext'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './Hero.module.css'

const HERO_TEXT = 'FRONTEND DEVELOPER'
const FONT = 'bold 7rem Inter'

export default function Hero() {
  const containerRef = useRef(null)
  const wordRefs = useRef([])
  const preparedRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    prepare(HERO_TEXT, FONT).then(prepared => {
      if (!cancelled) preparedRef.current = prepared
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMouseMove = (e) => {
      if (!preparedRef.current) return
      const rect = el.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      // Re-layout with a circular obstacle at cursor position
      const result = layout(preparedRef.current, rect.width, {
        obstacles: [{ x: mx - 60, y: my - 60, width: 120, height: 120 }]
      })
      // Animate each word span to its new computed position
      result.lines.forEach((line, li) => {
        line.words.forEach((word, wi) => {
          const ref = wordRefs.current[li * 100 + wi]
          if (ref) {
            gsap.to(ref, {
              x: word.x,
              y: word.y,
              duration: 0.4,
              ease: 'power3.out'
            })
          }
        })
      })
    }

    el.addEventListener('mousemove', onMouseMove)
    return () => el.removeEventListener('mousemove', onMouseMove)
  }, [])

  const words = HERO_TEXT.split(' ')

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.pretextContainer}>
        {words.map((word, i) => (
          <span
            key={word}
            ref={el => wordRefs.current[i] = el}
            className={styles.heroWord}
          >
            {word}
          </span>
        ))}
      </div>

      <div className={styles.meta}>
        <h1 className={styles.name}>Wim Stienstra</h1>
        <div className={styles.divider} />
        <p className={styles.tagline}>Angular · Monorepo · AI-assisted development</p>
        <div className={styles.cta}>
          <a href="#projects" className={styles.ctaPrimary}>View Work ↓</a>
          <a
            href="https://www.linkedin.com/in/wimstienstra"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span>scroll to explore</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
```

> **Note:** Pretext's obstacle API may vary — check the latest `@chenglou/pretext` README. If the obstacle API is not available yet, implement the repulsion effect manually: on each `mousemove`, calculate each word's distance to the cursor and apply a `translate` offset proportional to `1/distance²`, animated with GSAP.

---

### File: `src/components/Hero/Hero.module.css`

Key styles:
- `.hero` — `min-height: 100svh`, `display: grid`, centered content, `position: relative`, `overflow: hidden`
- `.pretextContainer` — large, full-width text container, `position: relative`, `height: ~40vh`
- `.heroWord` — `position: absolute`, `font-size: var(--text-hero)`, `font-weight: 900`, `color: var(--color-text)`, `will-change: transform`
- `.name` — `font-size: var(--text-2xl)`, `color: var(--color-accent)`, `font-family: var(--font-mono)`
- `.divider` — `width: 60px; height: 2px; background: var(--color-accent)`
- `.ctaPrimary` — filled button with accent background
- `.ctaSecondary` — ghost button with accent border
- `.scrollLine` — thin vertical animated line (pulsing opacity) below "scroll to explore"

---

## Entrance Animation (GSAP)
On mount, use `gsap.fromTo` to animate:
1. The Pretext text block slides up from below (`y: 40 → 0`) with a stagger on each word
2. `.name`, `.divider`, `.tagline`, `.cta` fade in sequentially after the big text finishes

---

## Fallback (no JS / accessibility)
The semantic `<h1>` with Wim's name must always be in the DOM (not canvas). The Pretext canvas is `aria-hidden="true"`. Screen readers see the heading correctly.

---

## Acceptance Criteria
- [ ] Full-viewport hero renders without layout shift
- [ ] Pretext library initialises and measures the hero text
- [ ] Moving the cursor over the hero causes the large text to dynamically reflow/repulse
- [ ] GSAP entrance animation plays on page load
- [ ] `<h1>Wim Stienstra</h1>` is present for screen readers
- [ ] CTA buttons scroll to `#projects` and open LinkedIn correctly
- [ ] Hero looks correct on mobile (≥ 375px) — Pretext effect degrades gracefully (or is disabled) on touch devices
