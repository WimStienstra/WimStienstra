# Step 08 — Skills Section

## Objective
Build a skills visualization that reads from `src/content/skills.json`. It should look impressive to a frontend recruiter: not a plain list, but an interactive, animated display that groups skills by category and shows proficiency.

---

## Visual Design

```
04 / SKILLS

  [ Core ]  [ Testing ]  [ Ecosystem ]  [ AI ]  [ Soft Skills ]
     ↑ tab filter

  ┌──────────────────────────┐
  │  Angular         ●●●●●  │
  │  TypeScript      ●●●●●  │
  │  NX Monorepo     ●●●●●  │
  │  RxJS            ●●●●○  │
  └──────────────────────────┘

  + floating skill cloud (Pretext) behind the cards
```

The tab filter switches which category is shown. The proficiency dots animate from left when they enter the viewport or when a new tab is selected.

---

## Implementation

### File: `src/components/Skills/Skills.jsx`

```jsx
import { useState } from 'react'
import skills from '../../content/skills.json'
import styles from './Skills.module.css'

const CATEGORY_LABELS = {
  core:      'Core',
  testing:   'Testing',
  ecosystem: 'Ecosystem',
  tooling:   'Tooling',
  ai:        'AI',
  soft:      'Soft Skills',
}

function ProficiencyDots({ level, max = 5 }) {
  return (
    <span className={styles.dots} aria-label={`${level} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`${styles.dot} ${i < level ? styles.filled : styles.empty}`}
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </span>
  )
}

function SkillRow({ skill }) {
  return (
    <div className={styles.skillRow}>
      <span className={styles.skillName}>{skill.name}</span>
      <ProficiencyDots level={skill.level} />
    </div>
  )
}

export default function Skills() {
  const categories = Object.keys(skills)
  const [active, setActive] = useState(categories[0])

  return (
    <section id="skills" className={styles.skills}>
      <span className={styles.label}>04 / SKILLS</span>
      <h2 className={styles.heading}>Skills & Expertise</h2>

      <div className={styles.tabs} role="tablist">
        {categories.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            className={`${styles.tab} ${active === cat ? styles.tabActive : ''}`}
            onClick={() => setActive(cat)}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      <div
        className={styles.skillList}
        role="tabpanel"
        key={active}  /* remount to re-trigger CSS animation */
      >
        {(skills[active] ?? []).map(skill => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </div>

      <div className={styles.tagCloud} aria-hidden="true">
        {Object.values(skills).flat().map(s => (
          <span key={s.name} className={styles.cloudTag}>{s.name}</span>
        ))}
      </div>
    </section>
  )
}
```

---

### File: `src/components/Skills/Skills.module.css`

Key styles:

- `.skills` — `padding: var(--section-padding); max-width: var(--max-width); margin: 0 auto; position: relative`
- `.tabs` — `display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-8)`
- `.tab` — `font-family: var(--font-mono); font-size: var(--text-xs); padding: var(--space-2) var(--space-4); border-radius: var(--radius-sm); background: transparent; border: 1px solid var(--color-border); color: var(--color-text-muted); cursor: pointer; transition: all var(--duration-base)`
  - On hover: `color: var(--color-text); border-color: var(--color-accent-dim)`
- `.tabActive` — `background: var(--color-tag-bg); color: var(--color-accent); border-color: var(--color-accent)`
- `.skillList` — `display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3)`; animation: `fadeInUp var(--duration-base) var(--ease-out-expo)`
  - Mobile: single column
- `.skillRow` — `display: flex; justify-content: space-between; align-items: center; padding: var(--space-4) var(--space-6); background: var(--color-surface); border-radius: var(--radius-sm); border: 1px solid var(--color-border); transition: border-color var(--duration-fast)`
  - On hover: `border-color: var(--color-border)` → `var(--color-accent-dim)`
- `.skillName` — `font-size: var(--text-sm); color: var(--color-text)`
- `.dots` — `display: flex; gap: 5px`
- `.dot` — `width: 8px; height: 8px; border-radius: 50%; animation: dotPop var(--duration-base) var(--ease-bounce) both`
- `.filled` — `background: var(--color-accent)`; add a subtle `box-shadow: 0 0 6px var(--color-accent)`
- `.empty` — `background: var(--color-surface-2); border: 1px solid var(--color-border)`

```css
@keyframes dotPop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

@keyframes fadeInUp {
  from { transform: translateY(16px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
```

- `.tagCloud` — `position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: -1`; contains `.cloudTag` elements scattered randomly with `position: absolute` and low `opacity: 0.04` — purely decorative background texture of skill names.

---

## Decorative Tag Cloud Positioning (JS)
In a `useEffect`, after the component mounts, randomly distribute `.cloudTag` elements across the section using `element.style.left` / `top` with `Math.random()`. This is a decorative background layer only — `aria-hidden="true"` is already set.

---

## Scroll Animation (GSAP ScrollTrigger)
When `.skillList` enters the viewport, each `.skillRow` animates in:
- `x: -20 → 0`, `opacity: 0 → 1`, stagger `0.05s`

---

## Acceptance Criteria
- [ ] All skill categories from `skills.json` appear as tabs
- [ ] Clicking a tab shows the correct skills with a fade animation
- [ ] Proficiency dots animate in with the staggered pop effect
- [ ] Filled dots glow with accent color
- [ ] Decorative tag cloud renders in the background (aria-hidden)
- [ ] GSAP ScrollTrigger entrance animation fires correctly
- [ ] Section has `id="skills"` for nav anchor
- [ ] Keyboard accessible: tabs are focusable, `aria-selected` updates correctly
- [ ] Responsive: 2-col skill list on desktop, 1-col on mobile
