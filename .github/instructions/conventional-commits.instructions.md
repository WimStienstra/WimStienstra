---
description: 'Guidelines for writing commit messages using the Conventional Commits specification'
applyTo: '**'
---

# Conventional Commits Instructions

These instructions define the commit message convention for the TUPFF project. We follow the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## General Instructions

- All commit messages **MUST** follow the Conventional Commits format.
- This format allows for automatic changelog generation and semantic versioning.
- Write clear, concise, and descriptive commit messages.
- Use the imperative mood in the description (e.g., "add feature" not "added feature").

## Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

The following types are allowed:

- **feat**: A new feature (correlates with MINOR in Semantic Versioning).
- **fix**: A bug fix (correlates with PATCH in Semantic Versioning).
- **docs**: Documentation only changes.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **perf**: A code change that improves performance.
- **test**: Adding missing tests or correcting existing tests.
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
- **chore**: Other changes that don't modify src or test files.
- **revert**: Reverts a previous commit.

### Scopes

A scope is optional but recommended to provide context. It should be a noun describing a section of the codebase, surrounded by parentheses.

Examples:
- `feat(auth): add login functionality`
- `fix(api): handle null response`
- `style(ui): fix button padding`
- `chore(deps): update react`

### Description

- The description **MUST** immediately follow the colon and space after the type/scope prefix.
- It **MUST** be a short summary of the code changes.
- It **SHOULD** be written in the imperative mood (e.g., "change" not "changed" or "changes").
- It **SHOULD NOT** end with a period.

### Body

- The body is optional.
- It **MUST** begin one blank line after the description.
- It allows for a more detailed explanation of the changes.
- It **SHOULD** explain the "what" and "why" of the change, not just the "how".

### Footers / Breaking Changes

- Footers are optional and follow the git trailer format.
- **Breaking Changes**:
  - MUST be indicated by a `!` after the type/scope (e.g., `feat!: ...`) OR by a `BREAKING CHANGE:` footer.
  - If using the footer, it MUST consist of the uppercase text `BREAKING CHANGE`, followed by a colon, space, and description.
  - Breaking changes correlate with MAJOR in Semantic Versioning.

## Examples

### Feature
```
feat(user): add user profile page
```

### Bug Fix
```
fix(auth): fix token expiration issue
```

### Breaking Change
```
feat(api)!: remove deprecated endpoint

BREAKING CHANGE: The /v1/users/old endpoint has been removed. Use /v2/users instead.
```

### Documentation
```
docs: update readme with installation instructions
```

### Refactor
```
refactor(utils): simplify date formatting logic
```
