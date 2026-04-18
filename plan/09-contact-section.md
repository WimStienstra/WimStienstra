# Step 09 — Contact Section

## Objective
Build the final section of the page: a contact block that feels like the natural end of a journey. It should invite recruiters to reach out with clear, prominent links to LinkedIn and email, and an optional GitHub link. The visual design closes the page elegantly.

---

## Visual Design

```
┌──────────────────────────────────────────────┐
│                                              │
│   05 / CONTACT                               │
│                                              │
│   Let's build something                      │
│   together.                                  │
│                                              │
│   [ w.j.stienstra@hotmail.com ↗ ]            │
│   [ LinkedIn ↗ ]  [ GitHub ↗ ]               │
│                                              │
│   Leeuwarden, Friesland, Netherlands         │
│                                              │
│   ──────────────────────────────────────     │
│   © 2025 Wim Stienstra · Built with React    │
│           & @chenglou/pretext                │
└──────────────────────────────────────────────┘
```

---

## Implementation

### File: `src/components/Contact/Contact.jsx`

```jsx
import meta from '../../content/meta.json'
import { Mail, Linkedin, Github, MapPin } from 'lucide-react'
import styles from './Contact.module.css'

const links = [
  {
    label: 'Email',
    href: `mailto:${meta.email}`,
    icon: Mail,
    display: meta.email,
  },
  {
    label: 'LinkedIn',
    href: meta.linkedin,
    icon: Linkedin,
    display: 'linkedin.com/in/wimstienstra',
    external: true,
  },
  {
    label: 'GitHub',
    href: meta.github,
    icon: Github,
    display: 'github.com/WimStienstra',
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <span className={styles.label}>05 / CONTACT</span>

        <h2 className={styles.heading}>
          Let&apos;s build something <span className={styles.accent}>together.</span>
        </h2>

        <p className={styles.sub}>
          Open to new opportunities, collaborations, or just a good conversation about frontend architecture.
        </p>

        <ul className={styles.links}>
          {links.map(link => {
            const Icon = link.icon
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={styles.link}
                  {...(link.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <Icon size={18} className={styles.linkIcon} />
                  <span>{link.display}</span>
                  <span className={styles.arrow}>↗</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className={styles.location}>
          <MapPin size={14} />
          <span>{meta.location}</span>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Wim Stienstra</span>
        <span className={styles.footerDivider}>·</span>
        <span>Built with React & @chenglou/pretext</span>
      </footer>
    </section>
  )
}
```

---

### File: `src/components/Contact/Contact.module.css`

Key styles:

- `.contact` — `padding: var(--section-padding); max-width: var(--max-width); margin: 0 auto; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative`
  - Add a radial gradient bleed from bottom of page:
    ```css
    .contact::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 400px;
      background: radial-gradient(
        ellipse at bottom,
        rgba(74, 240, 200, 0.07),
        transparent 70%
      );
      pointer-events: none;
    }
    ```
- `.inner` — `max-width: 700px; width: 100%`
- `.heading` — `font-size: var(--text-3xl); font-weight: 800; line-height: 1.1; margin-bottom: var(--space-6)`
- `.accent` — `color: var(--color-accent)`
- `.sub` — `color: var(--color-text-muted); font-size: var(--text-lg); line-height: 1.7; margin-bottom: var(--space-12)`
- `.links` — `list-style: none; display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-8); width: 100%`
- `.link` — `display: flex; align-items: center; gap: var(--space-3); padding: var(--space-5) var(--space-8); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-decoration: none; color: var(--color-text); font-size: var(--text-base); transition: all var(--duration-base) var(--ease-out-expo)`
  - On hover: `border-color: var(--color-accent); background: var(--color-surface-2); transform: translateX(6px); color: var(--color-accent)`
- `.linkIcon` — `color: var(--color-accent); flex-shrink: 0`
- `.arrow` — `margin-left: auto; color: var(--color-text-muted); transition: transform var(--duration-base)`
  - `.link:hover .arrow` — `transform: translate(3px, -3px)`
- `.location` — `display: flex; align-items: center; gap: var(--space-2); color: var(--color-text-muted); font-size: var(--text-sm); margin-top: var(--space-4)`
- `.footer` — `margin-top: var(--space-24); padding-top: var(--space-8); border-top: 1px solid var(--color-border); color: var(--color-text-faint); font-size: var(--text-xs); font-family: var(--font-mono); display: flex; gap: var(--space-4); justify-content: center`

---

## Scroll Animation (GSAP ScrollTrigger)
- `.heading` — slides up from `y: 40`, opacity 0 → 1
- `.sub` — fades in with slight delay
- `.links li` — staggered `x: -20 → 0`, stagger `0.08s`
- `.footer` — fades in last

---

## Navigation (Optional: Sticky Nav)
If not already added by another step, add a minimal sticky nav bar at the top of the page (in `App.jsx` or a separate `Nav` component) with anchor links:

```
Wim Stienstra    About  Experience  Projects  Skills  Contact
```

Styles:
- `position: fixed; top: 0; left: 0; right: 0; z-index: 100`
- `backdrop-filter: blur(12px); background: rgba(8, 13, 26, 0.8); border-bottom: 1px solid var(--color-border)`
- Shrinks (reduces padding) after scrolling 80px, animated with GSAP

---

## Acceptance Criteria
- [ ] Email, LinkedIn, and GitHub links render and are functional
- [ ] Hover effect slides links to the right with accent color border
- [ ] Footer renders with the current year (dynamic `new Date().getFullYear()`)
- [ ] Radial glow bleed is visible at the bottom of the page
- [ ] Section has `id="contact"` for nav anchor
- [ ] All external links have `target="_blank"` and `rel="noopener noreferrer"`
- [ ] GSAP ScrollTrigger entrance animation fires correctly
- [ ] Sticky nav (if included) hides on scroll down, shows on scroll up
