---
description: 'Angular-specific coding standards and best practices'
applyTo: '**/*.ts, **/*.html, **/*.scss, **/*.css'
---

# Angular Development Instructions

Instructions for generating high-quality Angular applications with TypeScript, using Angular Signals for state management, adhering to Angular best practices as outlined at https://angular.dev.

## Project Context
- Latest Angular version (use standalone components by default)
- TypeScript for type safety
- Angular CLI for project setup and scaffolding
- Follow Angular Style Guide (https://angular.dev/style-guide)
- Use Angular Material or other modern UI libraries for consistent styling (if specified)

## Development Standards

### Architecture
- Use standalone components unless modules are explicitly required
- Organize code by standalone feature modules or domains for scalability
- Implement lazy loading for feature modules to optimize performance
- Use Angular's built-in dependency injection system effectively
- Structure components with a clear separation of concerns (smart vs. presentational components)

### TypeScript
- Enable strict mode in `tsconfig.json` for type safety
- Define clear interfaces and types for components, services, and models
- Use type guards and union types for robust type checking
- Implement proper error handling with RxJS operators (e.g., `catchError`)
- Use typed forms (e.g., `FormGroup`, `FormControl`) for reactive forms

### Component Design
- Follow Angular's component lifecycle hooks best practices
- When using Angular >= 19, Use `input()` `output()`, `viewChild()`, `viewChildren()`, `contentChild()` and `contentChildren()` functions instead of decorators; otherwise use decorators
- Leverage Angular's change detection strategy (default or `OnPush` for performance)
- Keep templates clean and logic in component classes or services
- Use Angular directives and pipes for reusable functionality

### Styling
- Use Angular's component-level CSS encapsulation (default: ViewEncapsulation.Emulated)
- Prefer SCSS for styling with consistent theming
- Implement responsive design using CSS Grid, Flexbox, or Angular CDK Layout utilities
- Follow Angular Material's theming guidelines if used
- Maintain accessibility (a11y) with ARIA attributes and semantic HTML

### State Management
- **NgRx Signals**: Use `@ngrx/signals` for state management. This is the mandated state management solution.
- Use `signalStore` to define state, computed values, and methods.
- Decompose state into modular features using `withState`, `withComputed`, and `withMethods`.
- Use `patchState` for immutable state updates.
- Use `rxMethod` for handling side effects (like API calls) with RxJS operators (e.g., `debounceTime`, `switchMap`).

### Forms (Angular 21+)
- **Signal Forms**: Use the new experimental Signal Forms from `@angular/forms/signals`.
- Define form state using signals (e.g., `signal({ email: '', password: '' })`).
- Use the `form()` function to create the form group and attach validators.
- Use validators from `@angular/forms/signals` (e.g., `required`, `minLength`, `email`).
- Avoid legacy `FormsModule` or `ReactiveFormsModule` (`FormGroup`, `FormControl`) for new code unless strictly necessary for backward compatibility.

### Data Fetching & API
- **Debounce for Search**: When implementing search functionality, always apply a debounce strategy to prevent excessive API calls.
  - Use `rxMethod` from `@ngrx/signals` with `pipe(debounceTime(300), switchMap(...))` to handle search inputs efficiently.
  - Alternatively, convert signals to observables using `toObservable` and apply `debounceTime` before triggering requests.
- **GraphQL**: Use a GraphQL client (e.g., Apollo Angular or Urql) for data fetching.
  - Generate TypeScript types from the GraphQL schema (using GraphQL Code Generator).
  - Use typed queries and mutations.
- **Zod**: Use Zod schemas for runtime validation of API responses and form inputs.
  - Share Zod schemas with the backend if possible.
  - Use `zod-form-data` or similar adapters for form validation.
- **HttpClient**: If using REST, use Angular's `HttpClient` with proper typing.
- Implement RxJS operators for data transformation and error handling.
- Use Angular's `inject()` function for dependency injection in standalone components.
- Implement caching strategies (e.g., `shareReplay` for observables) or rely on the GraphQL client's cache.
- Store API response data in signals for reactive updates.
- Handle API errors with global interceptors for consistent error handling.

### Security
- Sanitize user inputs using Angular's built-in sanitization
- Implement route guards for authentication and authorization
- Use Angular's `HttpInterceptor` for CSRF protection and API authentication headers
- Validate form inputs with Angular's reactive forms and custom validators
- Follow Angular's security best practices (e.g., avoid direct DOM manipulation)

### Performance
- Enable production builds with `ng build --prod` for optimization
- Use lazy loading for routes to reduce initial bundle size
- Optimize change detection with `OnPush` strategy and signals for fine-grained reactivity
- Use trackBy in `ngFor` loops to improve rendering performance
- Implement server-side rendering (SSR) or static site generation (SSG) with Angular Universal (if specified)

### Testing
- Write unit tests for components, services, and pipes using Jasmine and Karma
- Use Angular's `TestBed` for component testing with mocked dependencies
- Test signal-based state updates using Angular's testing utilities
- Write end-to-end tests with Cypress or Playwright (if specified)
- Mock HTTP requests using `provideHttpClientTesting`
- Ensure high test coverage for critical functionality

## Implementation Process
1. Plan project structure and feature modules
2. Define TypeScript interfaces and models
3. Scaffold components, services, and pipes using Angular CLI
4. Implement data services and API integrations with signal-based state
5. Build reusable components with clear inputs and outputs
6. Add reactive forms and validation
7. Apply styling with SCSS and responsive design
8. Implement lazy-loaded routes and guards
9. Add error handling and loading states using signals
10. Write unit and end-to-end tests
11. Optimize performance and bundle size

## Additional Guidelines
- Follow the Angular Style Guide for file naming conventions (see https://angular.dev/style-guide), e.g., use `feature.ts` for components and `feature-service.ts` for services. For legacy codebases, maintain consistency with existing pattern.
- Use Angular CLI commands for generating boilerplate code
- Document components and services with clear JSDoc comments
- Ensure accessibility compliance (WCAG 2.1) where applicable
- Use Angular's built-in i18n for internationalization (if specified)
- Keep code DRY by creating reusable utilities and shared modules
- Use signals consistently for state management to ensure reactive updates

## Examples

### Good Example - Signal Forms & NgRx Signals
```typescript
import { signal } from '@angular/core';
import { form, required, email } from '@angular/forms/signals';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

// Store Definition
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState({ users: [], loading: false }),
  withMethods((store) => ({
    async loadUsers() {
      patchState(store, { loading: true });
      // ... fetch logic
      patchState(store, { loading: false });
    }
  }))
);

// Component
@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <form>
      <input [value]="credentials().email" (input)="updateEmail($event)" />
      <div *ngIf="loginForm.controls.email.errors() as errors">
        {{ errors[0].message }}
      </div>
    </form>
  `
})
export class LoginComponent {
  readonly credentials = signal({ email: '', password: '' });
  
  protected readonly loginForm = form(this.credentials, f => {
    required(f.email, { message: 'Email is required' });
    email(f.email, { message: 'Invalid email' });
    required(f.password, { message: 'Password is required' });
  });

  updateEmail(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.credentials.update(c => ({ ...c, email: val }));
  }
}
```

### Good Example - Debounced Search with rxMethod
```typescript
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, debounceTime, switchMap, tap } from 'rxjs';

export const SearchStore = signalStore(
  withState({ query: '', results: [] }),
  withMethods((store, searchService = inject(SearchService)) => ({
    // Define rxMethod for side effects
    search: rxMethod<string>(
      pipe(
        debounceTime(300),
        tap(() => patchState(store, { loading: true })),
        switchMap((query) => searchService.search(query)),
        tap((results) => patchState(store, { results, loading: false }))
      )
    )
  }))
);
```

### Bad Example - Legacy Forms & Zone State
```typescript
// Avoid ReactiveFormsModule and manual subscriptions
@Component({
  // ...
})
export class LegacyComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required])
  });

  search(term: string) {
    // Missing debounce, manual subscribe
    this.service.search(term).subscribe(); 
  }
}
```