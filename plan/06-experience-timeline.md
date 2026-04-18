# Step 06 — Experience Timeline

## Objective
Build an interactive, animated experience timeline that reads from `src/content/experience.json`. The timeline should feel alive — entries snap in as you scroll and expand on click/hover to reveal more detail.

---

## Visual Design

```
02 / EXPERIENCE

│
├── ● Sep 2025 – Present
│   CJIB — Frontend Web Developer
│   [Angular] [Monorepo] [TypeScript]
│   > (click to expand description)
│
├── ● Sep 2024 – Sep 2025
│   CJIB — Full Stack Developer
│   [Angular] [NX] [Playwright] [Jest]
│
├── ● Feb 2024 – Sep 2024
│   CJIB — Graduate Intern
│
...
```

The vertical line is drawn in `var(--color-border)`. The dot for the active/hovered entry glows with `var(--color-accent)`. Expanding an entry pushes the items below down with a smooth height transition.

---

## Implementation

### File: `src/components/Experience/Experience.jsx`

```jsx
import { useState } from 'react'
import experience from '../../content/experience.json'
import styles from './Experience.module.css'

function Tag({ label }) {
  return <span className={styles.tag}>{label}</span>
}

function ExperienceEntry({ entry, isOpen, onToggle }) {
  return (
    <article
      className={`${styles.entry} ${isOpen ? styles.open : ''}`}
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <div className={styles.dot} aria-hidden="true">
        <div className={styles.dotInner} />
      </div>

      <div className={styles.content}>
        <time className={styles.period}>{entry.period}</time>
        <h3 className={styles.role}>{entry.role}</h3>
        <p className={styles.company}>{entry.company}</p>

        <div className={styles.tags}>
          {entry.tags.map(tag => <Tag key={tag} label={tag} />)}
        </div>

        <div className={`${styles.description} ${isOpen ? styles.descriptionOpen : ''}`}>
          <p>{entry.description}</p>
        </div>
      </div>
    </article>
  )
}

export default function Experience() {
  const [openId, setOpenId] = useState(experience[0]?.id ?? null)

  const toggle = (id) => setOpenId(prev => prev === id ? null : id)

  return (
    <section id="experience" className={styles.experience}>
      <span className={styles.label}>02 / EXPERIENCE</span>
      <h2 className={styles.heading}>Career Journey</h2>

      <div className={styles.timeline}>
        {experience.map(entry => (
          <ExperienceEntry
            key={entry.id}
            entry={entry}
            isOpen={openId === entry.id}
            onToggle={() => toggle(entry.id)}
          />
        ))}
      </div>
    </section>
  )
}
```

---

### File: `src/components/Experience/Experience.module.css`

Key styles:

- `.experience` — `padding: var(--section-padding); max-width: var(--max-width); margin: 0 auto`
- `.timeline` — `position: relative; padding-left: var(--space-8)` with a `::before` pseudo-element for the vertical line:
  ```css
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
  - On hover: `background: var(--color-surface)`
- `.dot` — `position: absolute; left: calc(-1 * var(--space-8)); top: var(--space-6); width: 14px; height: 14px; display: flex; align-items: center; justify-content: center`
- `.dotInner` — `width: 8px; height: 8px; border-radius: 50%; background: var(--color-text-muted); transition: all var(--duration-base)`
  - `.open .dotInner` — `background: var(--color-accent); box-shadow: 0 0 12px var(--color-accent)`
- `.period` — monospace, muted, `font-size: var(--text-xs)`
- `.role` — `font-size: var(--text-lg); font-weight: 600; color: var(--color-text)`
- `.company` — `color: var(--color-accent); font-size: var(--text-sm)`
- `.tags` — `display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: var(--space-3)`
- `.tag` — `background: var(--color-tag-bg); color: var(--color-tag-text); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 2px var(--space-3); font-family: var(--font-mono); font-size: var(--text-xs)`
- `.description` — `max-height: 0; overflow: hidden; transition: max-height var(--duration-slow) var(--ease-out-expo), opacity var(--duration-base)` — opacity 0 when closed
- `.descriptionOpen` — `max-height: 400px; opacity: 1`

---

## Scroll Animation (GSAP ScrollTrigger)
Each `.entry` animates in as it enters the viewport:
- `x: -30 → 0`, `opacity: 0 → 1`
- Staggered by `0.1s` between entries
- Start trigger: `"top 85%"`

---

## Grouping (Optional Enhancement)
If the experience list gets long, group entries by company (CJIB has 3 entries). Use a collapsible company header. Implement only if it improves clarity.

---

## Acceptance Criteria
- [ ] All experience entries from `experience.json` render in order
- [ ] Clicking an entry expands/collapses the description with a smooth animation
- [ ] The first entry is open by default
- [ ] Timeline vertical line renders correctly
- [ ] Dots glow on the active/open entry
- [ ] Tags render in monospace with accent color
- [ ] GSAP ScrollTrigger entrance animation fires correctly
- [ ] Section has `id="experience"` for nav anchor
- [ ] Responsive: readable on 375px mobile width
