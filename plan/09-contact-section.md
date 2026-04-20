# Step 09 — Contact Section

## Objective
Build the final section of the page as an Angular 21 standalone component: a contact block that feels like the natural end of a journey, inviting recruiters to reach out with clear links to LinkedIn, email, and GitHub.

---

## Visual Design

```
┌──────────────────────────────────────────────┐
│                                              │
│   07 / CONTACT                               │
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
│   © 2026 Wim Stienstra · Built with Angular  │
│           & @chenglou/pretext                │
└──────────────────────────────────────────────┘
```

---

## Implementation

### File: `src/app/components/contact/contact.component.ts`

```typescript
import { Component, AfterViewInit } from '@angular/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWebHaptics } from 'web-haptics/react'
import meta from '../../../content/meta.json'

gsap.registerPlugin(ScrollTrigger)

interface ContactLink {
  label: string
  href: string
  display: string
  external: boolean
}

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit {
  readonly meta = meta
  readonly year = new Date().getFullYear()
  private haptics = useWebHaptics()

  readonly links: ContactLink[] = [
    {
      label: 'Email',
      href: `mailto:${meta.email}`,
      display: meta.email,
      external: false,
    },
    {
      label: 'LinkedIn',
      href: meta.linkedin,
      display: 'linkedin.com/in/wimstienstra',
      external: true,
    },
    {
      label: 'GitHub',
      href: meta.github,
      display: 'github.com/WimStienstra',
      external: true,
    },
  ]

  ngAfterViewInit(): void {
    ScrollTrigger.create({
      trigger: '.contact',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.contact-heading',  { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
        gsap.fromTo('.contact-sub',      { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.2 })
        gsap.fromTo('.contact-link',     { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, duration: 0.6, delay: 0.3 })
        gsap.fromTo('.contact-footer',   { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.6 })
      }
    })
  }

  // Haptic feedback for contact link interactions (mobile)
  onContactLinkClick(type: 'email' | 'social'): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      this.haptics.trigger(type === 'email' ? 'heavy' : 'medium')
    }
  }
}
```

---

### File: `src/app/components/contact/contact.component.html`

```html
<section id="contact" class="contact">
  <div class="inner">
    <span class="label">05 / CONTACT</span>

    <h2 class="contact-heading">
      Let&apos;s build something <span class="accent">together.</span>
    </h2>

    <p class="contact-sub">
      Open to new opportunities, collaborations, or just a good conversation about frontend architecture.
    </p>

    <ul class="links">
      @for (link of links; track link.label) {
        <li>
          <a
            [href]="link.href"
            class="contact-link"
            [attr.target]="link.external ? '_blank' : null"
            [attr.rel]="link.external ? 'noopener noreferrer' : null"
          >
            <span class="link-label">{{ link.label }}</span>
            <span class="link-display">{{ link.display }}</span>
            <span class="arrow">↗</span>
          </a>
        </li>
      }
    </ul>

    <div class="location">
      <span class="pin-icon">📍</span>
      <span>{{ meta.location }}</span>
    </div>
  </div>

  <footer class="contact-footer">
    <span>© {{ year }} Wim Stienstra</span>
    <span class="footer-divider">·</span>
    <span>Built with Angular &amp; @chenglou/pretext</span>
  </footer>
</section>
```

---

### File: `src/app/components/contact/contact.component.scss`

Key styles:

- `.contact` — centred, `padding: var(--section-padding)`, with radial glow bleed at the bottom:
  ```scss
  .contact::before {
    content: '';
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 600px; height: 400px;
    background: radial-gradient(ellipse at bottom, rgba(74, 240, 200, 0.07), transparent 70%);
    pointer-events: none;
  }
  ```
- `.inner` — `max-width: 700px; width: 100%; margin: 0 auto; text-align: center`
- `.contact-heading` — `font-size: var(--text-3xl); font-weight: 800; line-height: 1.1`
- `.accent` — `color: var(--color-accent)`
- `.contact-sub` — `color: var(--color-text-muted); font-size: var(--text-lg); line-height: 1.7; margin-bottom: var(--space-12)`
- `.links` — `list-style: none; display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-8)`
- `.contact-link` — `display: flex; align-items: center; gap: var(--space-3); padding: var(--space-5) var(--space-8); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-decoration: none; color: var(--color-text); transition: all var(--duration-base) var(--ease-out-expo)`
  - On hover: `border-color: var(--color-accent); transform: translateX(6px); color: var(--color-accent)`
- `.link-label` — `font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-muted); min-width: 70px`
- `.link-display` — `flex: 1`
- `.arrow` — `margin-left: auto; color: var(--color-text-muted); transition: transform var(--duration-base)`
  - `.contact-link:hover .arrow` — `transform: translate(3px, -3px)`
- `.contact-footer` — `margin-top: var(--space-24); padding-top: var(--space-8); border-top: 1px solid var(--color-border); color: var(--color-text-faint); font-size: var(--text-xs); font-family: var(--font-mono); display: flex; gap: var(--space-4); justify-content: center`

---

## Optional: Sticky Navigation Bar
If not added elsewhere, add a minimal sticky nav in `app.component.html`:

```html
<nav class="sticky-nav">
  <span class="nav-brand">WS</span>
  <div class="nav-links">
    <a href="#about">About</a>
    <a href="#experience">Experience</a>
    <a href="#projects">Projects</a>
    <a href="#skills">Skills</a>
    <a href="#hobbies">Hobbies</a>
    <a href="#contact">Contact</a>
  </div>
</nav>
```

Styles: `position: fixed; top: 0; z-index: 100; backdrop-filter: blur(12px); background: rgba(8,13,26,0.8); border-bottom: 1px solid var(--color-border)`. Shrinks after scrolling 80px (GSAP ScrollTrigger).

---

## Acceptance Criteria
- [ ] Email, LinkedIn, and GitHub links render and are functional
- [ ] Hover effect slides links right with accent color border
- [ ] Footer renders with the current year (dynamic)
- [ ] Footer says "Built with Angular & @chenglou/pretext"
- [ ] Radial glow bleed is visible at the bottom of the page
- [ ] Section has `id="contact"` for nav anchor
- [ ] All external links have `target="_blank"` and `rel="noopener noreferrer"`
- [ ] GSAP ScrollTrigger entrance animation fires correctly
