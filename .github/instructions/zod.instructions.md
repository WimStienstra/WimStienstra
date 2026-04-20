---
description: 'Guidelines for using Zod for schema validation and type sharing in the TUPFF project'
applyTo: '**/*.ts, **/*.tsx, **/*.js'
---

# Zod Instructions

These instructions guide the usage of Zod for runtime validation, schema definition, and type inference in the TUPFF project, specifically focusing on sharing types between frontend and backend in a monorepo structure.

## General Instructions

- Use **Zod** as the primary library for schema validation.
- Define schemas in a shared location (e.g., a `shared` or `common` package) if possible, to be consumed by both frontend and backend (if the backend uses Node.js/TS).
- If the backend is not TS (e.g., Java/C#), use Zod in the frontend to validate API responses and form inputs, ensuring they match the expected contract.

## Schema Definition

- **Naming**: Suffix schema variables with `Schema` (e.g., `UserSchema`, `LoginInputSchema`).
- **Type Inference**: Export the TypeScript type inferred from the schema.
  ```typescript
  import { z } from 'zod';

  export const UserSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(3),
    email: z.string().email(),
    role: z.enum(['ADMIN', 'USER']),
  });

  export type User = z.infer<typeof UserSchema>;
  ```

## Sharing Types (Monorepo Strategy)

To ensure the frontend and backend use the same types:

1.  **Shared Package**: Create a shared workspace package (e.g., `packages/shared` or `libs/types`).
2.  **Define Schemas**: Put Zod schemas in this shared package.
3.  **Export**: Export both the schemas and the inferred types.
4.  **Consume**:
    - **Frontend**: Import the schemas for form validation (e.g., with `react-hook-form` and `@hookform/resolvers/zod`) and API response validation.
    - **Backend (Node/TS)**: Import the schemas for request validation.
    - **Backend (Non-TS)**: If the backend is Java/C#, you cannot directly import Zod schemas. In this case:
        - Use the Zod schemas in the frontend to strictly validate the JSON received from the backend.
        - Consider using a tool to generate Zod schemas from an OpenAPI/Swagger spec or GraphQL schema if the backend generates those.

## Best Practices

- **Strict Mode**: Use `.strict()` on object schemas when you want to forbid unknown keys (useful for API validation).
- **Transformations**: Use `.transform()` to modify data during parsing (e.g., string to date), but be careful as this changes the output type.
- **Error Messages**: Provide custom error messages for better user experience.
  ```typescript
  z.string().min(1, { message: "Name is required" })
  ```
- **Environment Variables**: Use Zod to validate environment variables at application startup.

## Validation

- Ensure schemas cover all required fields and constraints.
- Test schemas with valid and invalid data to verify behavior.
