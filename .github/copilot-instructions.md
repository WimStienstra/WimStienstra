# GitHub Copilot Instructions

You are an expert AI programming assistant working on the **Wandr** project.
Your primary responsibility is to generate code that strictly adheres to the project's architecture, coding standards, and best practices defined in the `.github/instructions` folder.

## 🏗️ Project Architecture & Tech Stack

### Frontend (Angular)
- **Framework**: Angular (Latest) with **Standalone Components**.
- **State Management**: **NgRx Signals** (`@ngrx/signals`) using `signalStore`.
  - Use `withState`, `withComputed`, `withMethods`.
  - Use `patchState` for updates.
  - Use `rxMethod` for side effects.
- **UI Library**: **PrimeNG** (v17+) integrated with **Tailwind CSS**.
- **Styling**: **Tailwind CSS** (Utility-first).
- **Forms**: Angular Signal Forms (`@angular/forms/signals`) or Reactive Forms.
- **Generative UI**: **HashBrown** (`@hashbrownai/angular`) for AI-driven component rendering.
- **Testing**: **Vitest** (Unit), **Playwright** (E2E), and **MSW** (Mocking).

### Backend & Data
- **Framework**: **Spring Boot** (Java) 
  - *Note: Instructions provided cover Spring Boot. If working in .NET, apply similar Domain-Driven Design and Clean Architecture principles.*
- **API Style**: **GraphQL** (Schema-First or Code-First).
- **Database**: **PostgreSQL**.
- **ORM**: **Prisma** (Source of truth for schema).

### Tooling
- **Monorepo**: **Nx**.
- **Version Control**: **Conventional Commits**.

---

## 📜 Key Coding Rules

### 1. Accessibility (A11y)
- **Mandatory**: All code must be **WCAG 2.2 Level AA** compliant.
- **Practice**: Use semantic HTML, ARIA labels where necessary, and ensure keyboard navigability.
- **Testing**: Verify with accessibility tools.

### 2. Security (OWASP)
- **Input Validation**: Validate all inputs (Zod for frontend, Java Bean Validation).
- **Secrets**: Never hardcode secrets. Use environment variables.
- **Auth**: Implement proper Authorization checks in GraphQL resolvers/Controllers.

### 3. Frontend Best Practices
- **Signals**: Prefer Signals over RxJS `BehaviorSubject` for state.
- **Components**: Keep components "dumb" (presentational). Move logic to Stores or Services.
- **Performance**: Use `OnPush` change detection. Use DataLoaders in GraphQL to avoid N+1.

### 4. Backend Best Practices
- **Schema**: Define data models in `schema.prisma`.
- **GraphQL**: Use DataLoaders. Handle errors gracefully.
- **Controller/Resolver**: Keep them thin. Delegate business logic to Services.

---

## 📂 Reference Instructions

For detailed implementation guidelines, always refer to the specific instruction files:

- **Frontend**: `angular.instructions.md`, `ngrx-signals.instructions.md`, `primeng.instructions.md`, `tailwind.instructions.md`, `hashbrown.instructions.md`
- **Backend**: `springboot.instructions.md`, `graphql.instructions.md`, `prisma.instructions.md`, `postgres.instructions.md`
- **Testing**: `vitest.instructions.md`, `playwright-typescript.instructions.md`, `msw.instructions.md`
- **General**: `nx.instructions.md`, `conventional-commits.instructions.md`, `a11y.instructions.md`, `security-and-owasp.instructions.md`

When in doubt, check the `.github/instructions` folder for the most relevant guide.
And if you lose of the vision, revisit the readme.md for project context and goals.
