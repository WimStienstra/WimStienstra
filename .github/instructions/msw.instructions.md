---
description: 'Guidelines for using Mock Service Worker (MSW) for API mocking'
applyTo: '**/*.ts, **/*.tsx, **/*.js, **/*.spec.ts'
---

# MSW (Mock Service Worker) Instructions

Guidelines for using MSW to mock API requests in the TUPFF project.

## General Instructions

- Use MSW for mocking network requests in tests (Unit & Integration) and during development.
- Define request handlers in `src/mocks/handlers.ts` (or feature-specific handler files).
- Ensure handlers are type-safe and reflect the actual API schema.

## Best Practices

- **Network-Level Mocking**: Prefer mocking at the network level with MSW over mocking Angular `HttpClient` or `fetch` directly.
- **Realistic Responses**: Return realistic data structures that match the backend responses.
- **Stateful Mocks**: Use simple in-memory storage (maps/arrays) in handlers if you need to simulate state changes (e.g., create then list).
- **Avoid Logic in Tests**: Keep test code clean by moving complex mock logic into the handlers.

## Code Standards

### Handler Definition

- Group handlers by domain/feature.
- Use `http` from `msw` for REST API mocking.
- Use `graphql` from `msw` for GraphQL mocking.

### File Organization

- Global handlers: `src/mocks/handlers.ts`
- Browser setup: `src/mocks/browser.ts`
- Server setup (Node/Tests): `src/mocks/server.ts`

## Common Patterns

### REST Handler

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];
```

### GraphQL Handler

```typescript
import { graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.query('GetUser', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        user: {
          firstName: 'John',
          lastName: 'Maverick',
        },
      },
    });
  }),
];
```

### Runtime Overrides (in Tests)

```typescript
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';

test('handles server error', async () => {
  server.use(
    http.get('/api/user', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  // ... perform test action ...
});
```

## Validation

- Ensure tests pass with `npm run test`.
- Verify MSW intercepts requests in the browser console (if enabled for dev).
