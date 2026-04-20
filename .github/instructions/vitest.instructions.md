---
description: 'Guidelines for writing Angular and TypeScript code with Vitest testing'
applyTo: '**/*.ts'
---

# Angular and Vitest Development Instructions

Guidelines for writing robust, maintainable, and high-quality tests for Angular applications using Vitest.

## Project Context

- **Framework**: Angular (Latest)
- **Language**: TypeScript
- **Test Runner**: Vitest
- **State Management**: Angular Signals
- **Style Guide**: [Angular Style Guide](https://angular.dev/style-guide)

## General Instructions

- Use **Vitest** for all unit and integration testing.
- Write tests for all new features, bug fixes, and refactors.
- Ensure tests cover edge cases, error handling, and user interactions.
- Keep tests simple, readable, and focused on behavior, not implementation details.
- NEVER modify production code solely to make it easier to test; refactor for testability instead.

## Testing Standards

### Structure and Syntax
- Use `describe` blocks to group related tests (e.g., by method or feature).
- Use `it` blocks for individual test cases.
- Use `beforeEach` for setting up test environments (e.g., `TestBed` configuration).
- Use `afterEach` for cleanup if necessary (though Vitest handles most cleanup).
- Use `expect` assertions to verify outcomes.

### Angular Testing
- Use `TestBed` to configure the Angular testing module.
- Use `ComponentFixture` to interact with component instances and the DOM.
- Use `provideHttpClientTesting()` for mocking HTTP requests.
- Use `provideRouter()` or `RouterTestingHarness` for routing tests.

### Mocking and Spying
- Use `vi.mock()` to mock external modules.
- Use `vi.spyOn()` to spy on method calls and return values.
- Use `vi.fn()` to create standalone mock functions.
- Prefer mocking dependencies over using real services to isolate the unit under test.

## Common Patterns

### Component Testing with Signals

#### Good Example
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should increment count signal', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });
});
```

#### Bad Example
```typescript
// Avoid using Jasmine syntax or complex logic in tests
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  it('should work', () => {
    const comp = new CounterComponent(); // Don't instantiate manually if it has dependencies
    comp.increment();
    if (comp.count() !== 1) {
      throw new Error('Failed'); // Use expect() instead
    }
  });
});
```

### Service Testing with Mocks

#### Good Example
```typescript
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let apiServiceMock: any;

  beforeEach(() => {
    apiServiceMock = {
      getUser: vi.fn().mockReturnValue(of({ id: 1, name: 'Test' })),
    };

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: ApiService, useValue: apiServiceMock },
      ],
    });

    service = TestBed.inject(UserService);
  });

  it('should fetch user', () => {
    service.getUser(1).subscribe((user) => {
      expect(user.name).toBe('Test');
      expect(apiServiceMock.getUser).toHaveBeenCalledWith(1);
    });
  });
});
```

## Validation

- **Run Unit Tests**: `npm run test` (or `npm run test:unit`)
- **Run E2E Tests**: `npm run e2e`
- **Linting**: `npm run lint`

## User Interactions

- Ask questions if requirements for testing specific edge cases are unclear.
- Suggest adding tests if a provided code snippet lacks them.
- Always answer in the same language as the question, but use English for code, comments, and documentation.