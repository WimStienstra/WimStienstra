---
description: 'Guidelines for designing and implementing GraphQL APIs in the TUPFF project'
applyTo: '**/*.graphql, **/*.gql, **/*Resolver.ts, **/*Controller.java, **/*Controller.cs'
---

# GraphQL Instructions

These instructions guide the design and implementation of GraphQL APIs for the TUPFF project.

## General Instructions

- Use **GraphQL** for the API layer to provide flexible and efficient data fetching.
- Follow a **Schema-First** or **Code-First** approach consistently (choose one for the project).
- Ensure the schema is strongly typed and documented.

## Schema Design

- **Naming Conventions**:
  - Types: PascalCase (e.g., `UserProfile`).
  - Fields: camelCase (e.g., `firstName`).
  - Enums: PascalCase types, UPPER_CASE values.
- **Nullability**:
  - Be explicit about nullability. Fields should be non-nullable (`!`) by default unless there is a valid reason for them to be null.
  - Return nullable types for fields that might fail or be missing, to avoid null bubbling destroying the entire response.
- **IDs**: Use the `ID` scalar for unique identifiers.
- **Input Types**: Use `Input` types for arguments, especially for mutations (e.g., `CreateUserInput`).

## Operations

- **Queries**: Use for fetching data. Queries should be side-effect free.
- **Mutations**: Use for modifying data (create, update, delete).
  - Return the modified object (or at least its ID) from the mutation.
  - Consider returning a payload type that includes success status and user errors (e.g., `CreateUserPayload`).
- **Subscriptions**: Use for real-time updates (if applicable).

## Best Practices

- **Pagination**: Implement cursor-based pagination (Relay style connections) for lists that can grow large.
- **Filtering and Sorting**: Provide arguments for filtering and sorting lists.
- **N+1 Problem**: Use **DataLoaders** to batch and cache database requests to avoid the N+1 query problem.
- **Error Handling**:
  - Use standard GraphQL error formatting.
  - Distinguish between user errors (validation) and system errors (internal server error).
- **Security**:
  - Implement depth limiting to prevent malicious deep queries.
  - Implement complexity analysis to prevent expensive queries.
  - Ensure proper authorization checks in resolvers.

## Integration with Prisma

- Map Prisma models to GraphQL types.
- Use Prisma Client within resolvers to fetch data.
- Be careful not to expose internal database fields (like password hashes) directly in the GraphQL schema.

## Validation

- Validate the schema against the GraphQL specification.
- Ensure all queries and mutations have corresponding resolvers.
- Test resolvers with unit and integration tests.

## Examples

### Good Example - Schema Definition
```graphql
type User {
  id: ID!
  username: String!
  email: String!
  posts(first: Int, after: String): PostConnection!
}

type Post {
  id: ID!
  title: String!
  content: String
  author: User!
}

input CreateUserInput {
  username: String!
  email: String!
}

type Mutation {
  createUser(input: CreateUserInput!): UserPayload!
}
```

### Good Example - Resolver with DataLoader
```typescript
// UserResolver.ts
@ResolveField()
async posts(@Parent() user: User, @Args() args: ConnectionArgs) {
  // Use DataLoader to batch fetch posts for users
  return this.postsLoader.load(user.id);
}
```

### Bad Example - N+1 Problem
```typescript
// Avoid fetching related data directly in a loop or without batching
@ResolveField()
async posts(@Parent() user: User) {
  // This executes a query for EVERY user, causing N+1 issues
  return this.postService.findAllByUserId(user.id);
}
```
