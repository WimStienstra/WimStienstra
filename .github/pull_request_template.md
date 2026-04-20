# Pull Request

## Summary

<!-- What does this PR do in 1–3 sentences? -->

## Plan Section

<!-- Which plan step(s) does this PR implement? e.g. "plan/04-hero-section.md" -->

* Plan file(s): `plan/`
* This PR stays within the scope of the referenced plan step(s):

  * [ ] Yes
  * [ ] No (explain why below)

If **No**, explain:

## Problem Statement

<!-- What problem does this PR solve, or what section/feature does it add? -->

## Solution Overview

<!-- High-level explanation of what was built or changed -->

## Definition of Done Checklist

* [ ] Matches the plan step's definition of done
* [ ] No out-of-scope features added
* [ ] No unused abstractions or premature extensibility
* [ ] Component uses `ChangeDetectionStrategy.OnPush`
* [ ] Standalone component (no NgModule)
* [ ] Uses `input()` / `output()` signal functions, not decorators

## Content Changes

* JSON content files changed (`src/content/`):

  * [ ] No
  * [ ] Yes (list files below)

Details:

## Accessibility

* [ ] Semantic HTML used (landmarks, headings, lists)
* [ ] All interactive elements are keyboard accessible
* [ ] Images have appropriate `alt` text
* [ ] Color contrast meets WCAG 2.2 AA

## Performance & Styling

* [ ] No inline styles — Tailwind classes or SCSS used
* [ ] No magic numbers — design tokens from `_tokens.scss` used where applicable
* [ ] Animations respect `prefers-reduced-motion`

## Testing

* [ ] Manually tested in browser
* [ ] Responsive layout checked (mobile + desktop)
* [ ] No console errors or warnings

## Screenshots (if UI)

<!-- Paste a before/after screenshot or recording here -->

## Reviewer Notes

<!-- Anything reviewers should pay extra attention to -->

---

### Final Check (Required)

* [ ] Follows Angular coding standards in `AGENTS.md`
* [ ] No hardcoded content that should live in `src/content/`
* [ ] Conventional commit message used on all commits
