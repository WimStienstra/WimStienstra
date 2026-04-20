---
description: 'Guidelines for using Prisma ORM in the TUPFF project'
applyTo: '**/*.prisma, **/schema.prisma'
---

# Prisma Instructions

These instructions guide the usage of Prisma ORM for database modeling and migrations in the TUPFF project.

## General Instructions

- Use **Prisma** as the source of truth for the database schema.
- Define the data model in `schema.prisma`.
- Use Prisma Migrate for all database schema changes.
- Do not manually edit the generated migration SQL files unless absolutely necessary for complex operations not supported by Prisma schema language.

## Schema Definition (`schema.prisma`)

- **Naming Conventions**:
  - Models: PascalCase (e.g., `UserProfile`).
  - Fields: camelCase (e.g., `firstName`).
  - Map to database names: Use `@@map` for table names and `@map` for column names if you want snake_case in the DB but camelCase in the client code.
    ```prisma
    model User {
      id        Int      @id @default(autoincrement())
      firstName String   @map("first_name")
      lastName  String   @map("last_name")

      @@map("users")
    }
    ```
- **Relationships**:
  - Define relationships clearly with `@relation`.
  - Always include the foreign key field in the model.
- **Enums**: Use Prisma Enums for fixed sets of values.

## Migrations

- **Create Migration**: Run `npx prisma migrate dev --name <descriptive-name>` to create and apply a migration in development.
- **Deploy Migration**: Run `npx prisma migrate deploy` in CI/CD or production environments.
- **Reset**: Use `npx prisma migrate reset` to reset the development database (caution: deletes data).

## Prisma Client

- Generate the Prisma Client after every schema change: `npx prisma generate`.
- Use the generated client for type-safe database access.
- **Note on Java/Other Languages**: While Prisma Client is primarily for TypeScript/Node.js, if you are using a community generator (e.g., for Java or Python), ensure you configure the `generator` block in `schema.prisma` correctly.
  ```prisma
  generator client {
    provider = "prisma-client-js"
  }
  
  // Example for a hypothetical Java client
  // generator java {
  //   provider = "prisma-client-java-provider"
  //   output   = "./src/main/java/com/myapp/db"
  // }
  ```

## Best Practices

- **Formatting**: Run `npx prisma format` to ensure the schema file is properly formatted.
- **Seeding**: Use a seed script (`prisma/seed.ts` or similar) to populate the database with initial data for development.
- **Indexes**: Define indexes in the schema using `@@index` for performance optimization.

## Validation

- Ensure `npx prisma validate` passes.
- Verify that the generated client types match the schema.
