# Pull Request

## Summary

<!-- What does this PR do in 1–3 sentences? -->

## Phase Scope

* Phase: **Phase 0** / Phase 1 / Phase 2 (circle one)
* This PR is strictly within the scope of the current phase:

  * [ ] Yes
  * [ ] No (explain why below)

If **No**, explain:

## Problem Statement

<!-- What problem does this PR solve? Link to scenario if applicable -->

## Solution Overview

<!-- High-level explanation of how the problem is solved -->

## User Scenario Coverage

This PR supports the following documented scenarios:

* [ ] Scenario 1: Log weekly hours
* [ ] Scenario 2: Manager approval flow
* [ ] Scenario 3: Export to Exact-compatible CSV

(Reference: `docs/phase-0-scenarios.md`)

## Definition of Done Checklist

* [ ] Feature matches Phase definition of done
* [ ] No out-of-scope features added
* [ ] No unused abstractions or premature extensibility
* [ ] All data writes are transactional
* [ ] No data loss possible on refresh/network failure
* [ ] AuditLog entries are written where required

## Data & API Impact

* Prisma schema changed:

  * [ ] No
  * [ ] Yes (describe below)

* API contract changed:

  * [ ] No
  * [ ] Yes (update `phase-0-api.md`)

Details:

## Security & Compliance

* [ ] Tenant isolation preserved
* [ ] Authorization checks present
* [ ] No sensitive data logged
* [ ] GDPR: data can be exported and soft-deleted

## UX & Performance

* Time entry speed tested (< 60 seconds per week):

  * [ ] Yes
  * [ ] Not applicable

* Works on:

  * [ ] Desktop
  * [ ] Mobile (responsive or PWA)

## Testing

* [ ] Unit tests added or updated
* [ ] Manual testing performed
* [ ] Edge cases considered (duplicates, partial submits, retries)

Describe testing performed:

## Screenshots / Recordings (if UI)

<!-- Optional but encouraged -->

## Rollback Plan

<!-- How can this change be safely reverted if needed? -->

## Reviewer Notes

<!-- Anything reviewers should pay extra attention to -->

---

### Final Check (Required)

* [ ] I have read `COPILOT_INSTRUCTIONS.md`
* [ ] This PR aligns with the current phase constraints
* [ ] This PR does not introduce future-phase concepts
