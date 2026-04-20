---
description: 'Guidelines for using PostgreSQL in the TUPFF project'
applyTo: '**/*.sql, **/*.prisma, **/docker-compose*.yml'
---

# PostgreSQL Instructions

These instructions guide the usage and configuration of PostgreSQL for the TUPFF project.

## General Instructions

- Use **PostgreSQL** as the primary relational database.
- Ensure all database changes are managed via migrations (using Prisma).
- Do not modify the database schema manually in production; always use the migration workflow.
- Use descriptive names for tables and columns (snake_case is preferred for SQL, but follow Prisma's camelCase mapping conventions).

## Best Practices

- **Indexing**: Always index foreign keys and columns frequently used in `WHERE`, `ORDER BY`, and `JOIN` clauses.
- **Constraints**: Use database-level constraints (NOT NULL, UNIQUE, CHECK, FOREIGN KEY) to ensure data integrity.
- **JSONB**: Use `JSONB` for semi-structured data, but prefer normalized tables for structured relational data.
- **Security**:
  - Never store plain-text passwords. Use strong hashing algorithms (handled by auth libraries).
  - Follow the principle of least privilege for database users.
- **Performance**:
  - Avoid `SELECT *`; select only necessary columns.
  - Use `EXPLAIN ANALYZE` to optimize complex queries.

## Configuration

- Configure the database connection string via environment variables (`DATABASE_URL`).
- Ensure the connection string includes necessary parameters (e.g., `schema=public`, connection pooling settings).

## Docker

- Use the official PostgreSQL Docker image for local development.
- Define the database service in `docker-compose.yml`.

### Example `docker-compose.yml` snippet

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Validation

- Verify database connectivity using `psql` or a GUI tool.
- Ensure migrations apply successfully without errors.
