---
description: 'Guidelines for using NgRx Signals for state management in the TUPFF project'
applyTo: '**/*.ts'
---

# NgRx Signals Instructions

These instructions guide the usage of NgRx Signals (`@ngrx/signals`) for reactive state management in the TUPFF project.

## General Instructions

- Use **NgRx Signals** as the standard state management solution.
- Prefer **SignalStores** over classic NgRx (Store, Effects, Reducers) or plain Services with Subjects.
- Use `signalStore` to define functional, modular, and tree-shakable stores.
- Keep state logic close to where it is used (ComponentStore pattern) or global (`providedIn: 'root'`) depending on the scope.

## Core Concepts

### SignalStore
- Define stores using `signalStore()`.
- Compose stores using features: `withState`, `withComputed`, `withMethods`, and `withHooks`.

### State Updates
- Use `patchState` for all state updates to ensure immutability and proper signal notification.
- Do not mutate state directly.

### Side Effects
- Use `rxMethod` to handle asynchronous side effects (API calls, debouncing, etc.).
- `rxMethod` bridges the gap between Signals and RxJS, allowing usage of operators like `switchMap`, `debounceTime`, and `catchError`.

## Best Practices

### Architecture
- **Feature Stores**: Create specific stores for features (e.g., `UserStore`, `ProductStore`).
- **Custom Features**: Encapsulate reusable logic (e.g., `withPagination`, `withRequestStatus`) into custom store features using `signalStoreFeature`.
- **Dependency Injection**:
  - Use `{ providedIn: 'root' }` for global state.
  - Omit `providedIn` and provide in `providers: []` array of a component for local component state.

### Naming Conventions
- Suffix store files with `.store.ts`.
- Suffix store classes/variables with `Store` (e.g., `TodosStore`).
- Method names should be actions (e.g., `loadTodos`, `addTodo`).

### Performance
- Use `withComputed` for derived state to ensure values are memoized and only re-calculated when dependencies change.
- Avoid excessive computations in `effect()`; prefer `computed()` for values and `rxMethod` for actions.

## Examples

### Good Example - Basic Store
```typescript
import { patchState, signalStore, withMethods, withState, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';

export const CounterStore = signalStore(
  { providedIn: 'root' },
  withState({ count: 0 }),
  withComputed(({ count }) => ({
    doubleCount: computed(() => count() * 2),
  })),
  withMethods((store) => ({
    increment() {
      patchState(store, (state) => ({ count: state.count + 1 }));
    },
    decrement() {
      patchState(store, (state) => ({ count: state.count - 1 }));
    },
  }))
);
```

### Good Example - Async Data with rxMethod
```typescript
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { DataService } from './data.service';

export const DataStore = signalStore(
  withState({ items: [], loading: false, error: null }),
  withMethods((store, service = inject(DataService)) => ({
    loadItems: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          service.getItems().pipe(
            tapResponse({
              next: (items) => patchState(store, { items, loading: false }),
              error: (error) => patchState(store, { error, loading: false }),
            })
          )
        )
      )
    ),
  }))
);
```

### Bad Example - Mutable State & Manual Subscriptions
```typescript
// Avoid this pattern
export const BadStore = signalStore(
  withState({ items: [] }),
  withMethods((store) => ({
    addItem(item) {
      // BAD: Direct mutation
      store.items().push(item); 
    },
    loadItems() {
      // BAD: Manual subscribe without cleanup management
      inject(DataService).getItems().subscribe(items => {
        patchState(store, { items });
      });
    }
  }))
);
```

## Validation

- Ensure `patchState` is used for updates.
- Verify `rxMethod` is used for async operations.
- Check that derived state uses `withComputed`.
