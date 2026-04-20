---
title: "Experimenting with AI Code Assistants"
date: "2026-04-10"
slug: "experimenting-with-ai-code-assistants"
tags: ["ai", "development", "github-copilot"]
excerpt: "My journey using GitHub Copilot and other AI tools to enhance my development workflow"
coverImage: "/assets/blog/ai-workflow.jpg"
draft: false
---

# Getting Started with AI Assistants

Over the past year, I've been experimenting with AI-powered coding assistants. Not as a replacement for thinking, but as a tool that — when used intentionally — can accelerate certain parts of development.

This post shares what I've learned, what works, what doesn't, and how I've integrated AI into my workflow at CJIB.

## The Tools I Use

### GitHub Copilot

**What it's good for:**
- Autocompleting boilerplate (constructors, getters, standard patterns)
- Writing tests (especially parametrized tests with many cases)
- Generating regex patterns with explanatory comments
- Suggesting API signatures when I start typing a function

**What it's not good for:**
- Understanding business logic (it guesses, often incorrectly)
- Designing architectures (it follows patterns, doesn't invent them)
- Security-critical code (it sometimes suggests vulnerable patterns)

### ChatGPT / Claude

I use these for:
- Explaining unfamiliar APIs or library patterns
- Generating sample data for testing
- Brainstorming refactoring approaches
- Translating code between languages (e.g., Java → TypeScript)

## Real-World Example: Migrating Angular 14 → 20

At CJIB, I led a migration from Angular 14 to Angular 20 for our case-processing application. AI tools were helpful, but not magic.

### What AI Did Well

**1. Dependency Updates**

Copilot suggested updated import paths when Angular's package structure changed:

```typescript
// Old (Angular 14)
import { ComponentFixture, TestBed } from '@angular/core/testing';

// New (Angular 20) — Copilot autocompleted correctly
import { ComponentFixture, TestBed } from '@angular/core/testing';
// No change needed here, but for other imports like HttpClientTestingModule:
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
```

**2. Test Refactoring**

I was converting Karma/Jasmine tests to Jest. Copilot saved hours by auto-generating test setups:

```typescript
describe('CaseDetailsComponent', () => {
  let component: CaseDetailsComponent;
  let fixture: ComponentFixture<CaseDetailsComponent>;
  
  beforeEach(async () => {
    // Copilot filled in this entire block after I typed "beforeEach"
    await TestBed.configureTestingModule({
      imports: [CaseDetailsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

**3. Playwright E2E Test Generation**

When replacing Cucumber with Playwright, I described the test scenario in a comment, and Copilot suggested the test code:

```typescript
// Test: User searches for a case by number and opens the details page
test('search and view case details', async ({ page }) => {
  await page.goto('/cases');
  await page.getByLabel('Case number').fill('2024-12345');
  await page.getByRole('button', { name: 'Search' }).click();
  
  await expect(page.getByRole('heading', { name: 'Case 2024-12345' })).toBeVisible();
  await page.getByRole('link', { name: 'View details' }).click();
  
  await expect(page).toHaveURL(/\/cases\/2024-12345/);
  await expect(page.getByText('Status: Open')).toBeVisible();
});
```

This was about 80% correct — I only had to adjust the selectors to match our actual DOM.

### What AI Struggled With

**1. Business Logic**

Copilot has no idea what CJIB-specific domain rules are. When I wrote this:

```typescript
// Check if the case is eligible for settlement
function isEligibleForSettlement(case: Case): boolean {
  // Copilot suggested generic conditions that were completely wrong
  // return case.status === 'open' && case.amount > 0; ❌
  
  // Actual CJIB business rule:
  return case.status === 'open' 
    && case.type !== 'CRIMINAL' 
    && case.paymentPlan === null
    && !case.hasObjection;
}
```

AI can't infer domain rules. I had to read the legacy code and documentation myself.

**2. Nx Monorepo Configuration**

We migrated to an Nx monorepo. Copilot struggled with suggesting correct `project.json` configurations because our setup was custom.

```json
{
  "name": "case-processing",
  "targets": {
    "build": {
      // Copilot kept suggesting Angular CLI patterns, not Nx patterns
      "executor": "@nx/angular:webpack-browser", // ❌ Doesn't exist
      // Correct:
      "executor": "@angular-devkit/build-angular:browser"
    }
  }
}
```

I had to reference Nx documentation and other projects in the monorepo manually.

## My Workflow Rules

After a year of experimentation, here's how I use AI tools effectively:

### ✅ Do Use AI For:

- **Boilerplate generation** — constructors, standard interfaces, test scaffolds
- **Refactoring assistance** — renaming variables, converting loops to array methods
- **Learning new APIs** — asking "how do I use X library to do Y?"
- **Generating test data** — realistic mock objects with varied properties
- **Explaining unfamiliar patterns** — "what does this RxJS operator do?"

### ❌ Don't Use AI For:

- **Architecture decisions** — AI suggests patterns, not solutions to your specific problem
- **Security-sensitive code** — always review thoroughly; AI sometimes suggests anti-patterns
- **Domain logic** — AI doesn't know your business rules
- **Critical algorithms** — AI can miss edge cases

### 🛡️ Safety Rules

1. **Never commit AI-generated code without reading it line by line**
2. **Run tests and lint checks** — AI code often has style violations or logic errors
3. **Beware of license issues** — Copilot sometimes suggests code from copyrighted repos
4. **Don't paste sensitive code into ChatGPT** — use local models or sanitize first

## Example: Using AI to Speed Up Grunt Work

I needed to create 20 form field validators for a complex case intake form. Each validator had similar structure but different rules.

### Without AI (manual):

```typescript
// Field 1
export const validateCaseNumber: ValidatorFn = (control) => {
  const value = control.value;
  if (!value) return null;
  return /^[0-9]{4}-[0-9]{5}$/.test(value) ? null : { invalidCaseNumber: true };
};

// Field 2
export const validateEmail: ValidatorFn = (control) => {
  // ... copy-paste-modify ...
};

// ... repeat 18 more times 😴
```

### With AI (guided generation):

I wrote the first validator, then added a comment describing the next one:

```typescript
export const validateCaseNumber: ValidatorFn = (control) => {
  const value = control.value;
  if (!value) return null;
  return /^[0-9]{4}-[0-9]{5}$/.test(value) ? null : { invalidCaseNumber: true };
};

// Email validator: must be valid email format
export const validateEmail: ValidatorFn = (control) => {
  const value = control.value;
  if (!value) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : { invalidEmail: true };
};

// Phone number validator: must be Dutch phone number (10 digits or +31 format)
// Copilot autocompleted the entire function here ✅
```

This saved me about 30 minutes of tedious copy-paste work.

## Measuring Impact

I tracked my usage over 3 months:

- **Time saved on boilerplate:** ~2 hours/week
- **Bugs introduced by blindly accepting AI suggestions:** 3 (caught in PR review)
- **Tests written faster with AI scaffolding:** ~40% faster
- **New APIs learned by asking AI instead of docs:** 5

**Net result:** Positive, but only because I'm careful about reviewing and testing.

## Conclusion

AI coding assistants are tools, not replacements for thinking. Used well, they speed up grunt work and help you learn new patterns faster. Used carelessly, they introduce bugs and tech debt.

My advice:

1. **Start small** — use AI for autocomplete and boilerplate first
2. **Always read the code** — never accept suggestions blindly
3. **Test thoroughly** — AI code is as bug-prone as junior developer code
4. **Learn the domain** — AI can't understand your business logic; you must

AI won't replace developers anytime soon, but developers who use AI effectively will replace those who don't.

---

**Tools mentioned:**

- [GitHub Copilot](https://github.com/features/copilot)
- [ChatGPT](https://chat.openai.com/)
- [Claude](https://www.anthropic.com/claude)
- [Nx](https://nx.dev/)
- [Playwright](https://playwright.dev/)

**Questions?** Let's discuss on [LinkedIn](https://linkedin.com/in/wimstienstra)!
