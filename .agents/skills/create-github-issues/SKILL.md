---
name: create-github-issues
description: "Create GitHub issues from a specification or implementation plan. Supports one issue for a full specification, one issue per implementation phase, or one issue per unmet requirement after checking the codebase and existing issues."
---

# Create GitHub Issues

Create GitHub issues from the input document at `${file}`.

## When To Use

Use this skill when the user asks to:
- Create GitHub issues from a specification
- Create GitHub issues from an implementation plan
- Create one issue per phase or requirement
- Create issues only for unmet or unimplemented specification requirements

## Modes

Choose the mode that matches the user's request and the source document.

### `spec-single`

Use for a specification when the user wants one issue for the full feature.

### `plan-phases`

Use for an implementation plan when the user wants one issue per phase or milestone.

### `spec-gaps`

Use for a specification when the user wants one issue per unmet requirement after checking the codebase.

## Process

1. Analyze the input document to identify the requested scope and issue granularity.
2. Determine the mode from the document type and user intent.
3. Search existing issues to avoid duplicates before creating or updating anything.
4. If the mode is `spec-gaps`, inspect the codebase to confirm whether each requirement is already implemented or partially implemented.
5. Create new issues or update matching existing issues with clear titles, context, and acceptance criteria.
6. Use the appropriate issue template when available, such as `feature_request.yml` or `chore_request.yml`, and fall back to the default issue body when no template fits.

## Requirements

- Create only the issues required by the selected mode.
- Keep titles specific and stable so duplicates are easy to detect.
- Include enough implementation context for the issue to be actionable.
- Preserve traceability back to the source phase, feature, or requirement.
- Verify against existing issues before creating new ones.

## Issue Output By Mode

### `spec-single`

- One issue for the complete specification
- Title based on the feature or specification name
- Description includes the problem, proposed solution, scope, and acceptance criteria
- Labels should match feature or enhancement work

### `plan-phases`

- One issue per implementation phase or milestone
- Title based on the phase name
- Description includes the phase goal, scope, dependencies, and deliverables
- Labels should match feature or chore work as appropriate

### `spec-gaps`

- One issue per unmet requirement
- Title includes the requirement identifier and short description when available
- Description includes the unmet requirement, current gap, implementation guidance, and acceptance criteria
- Labels should match feature or enhancement work

## Implementation Check For `spec-gaps`

- Search the codebase for related code paths, components, services, or APIs
- Verify whether the requirement is fully implemented, partially implemented, or missing
- Skip creating a new issue for requirements that are already complete
- Prefer updating an existing issue if the requirement is already tracked
