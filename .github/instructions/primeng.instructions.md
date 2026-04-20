---
description: 'Guidelines for using PrimeNG UI component library in Angular applications'
applyTo: '**/*.ts, **/*.html, **/*.scss, **/*.css'
---

# PrimeNG Development Guidelines

Instructions for using PrimeNG and PrimeBlocks effectively in Angular applications, covering installation, configuration, theming, block composition, and best practices.

## General Instructions

- **Version**: Ensure you are using the latest stable version of PrimeNG (v19+).
- **Installation**: Install via npm: `npm install primeng @primeuix/themes`.
- **Configuration**: Configure PrimeNG in your application config (e.g., `app.config.ts`) using `providePrimeNG`.
- **Icons**: PrimeIcons is the default icon set. Install if needed: `npm install primeicons`.
- **PrimeBlocks**: Use [PrimeBlocks](https://primeblocks.org/) as the starting point for any new page, layout, or feature UI. It provides 490+ ready-made, copy-paste Angular blocks built on top of PrimeNG + Tailwind CSS. Always check PrimeBlocks before building a layout from scratch.

## Best Practices

### Component Usage
- **Modular Imports**: Import only the modules you need for each component (e.g., `ButtonModule`, `TableModule`) to optimize bundle size. Avoid importing the entire library.
- **Standalone Components**: PrimeNG components are standalone-ready. Import them directly into your standalone components or modules.

### Tailwind CSS Integration
- **Plugin**: Install and configure `tailwindcss-primeui` to integrate PrimeNG theming with Tailwind.
  - `npm install tailwindcss-primeui`
  - Add to `tailwind.config.js` plugins list.
- **Utility Classes**: Use PrimeNG-derived Tailwind utilities for consistent styling:
  - Colors: `bg-primary`, `text-primary-500`, `border-surface`, `text-muted-color`.
  - Animations: `animate-fadein`, `animate-slideup`.
- **Dark Mode**: Ensure your Tailwind dark mode configuration matches PrimeNG's `darkModeSelector`.
- **Overrides**: Use CSS layers to manage specificity if you need to override PrimeNG styles with Tailwind utilities.
  - Define layers: `@layer tailwind-base, primeng, tailwind-utilities;`
  - Configure `cssLayer` in `providePrimeNG` options.

### Theming & Styling
- **Design Tokens**: Use PrimeNG's design token system (Primitive, Semantic, Component) for styling.
- **Avoid Overrides**: Avoid using `::ng-deep` or global CSS overrides. Use the theming API and presets instead.
- **Presets**: Use built-in presets like Aura, Lara, or Material as a base. Customize using `definePreset`.
- **Scoped Tokens**: For component-specific styling, use the `dt` property or scoped CSS variables instead of forcing styles.

### State Management
- **Two-Way Binding**: Use `[(ngModel)]` for form components where appropriate, or reactive forms with `formControlName`.

## Code Standards

### Naming Conventions
- **Variables**: Use camelCase for component references (e.g., `myTable`, `submitButton`).
- **Handlers**: Prefix event handlers with `on` (e.g., `onRowSelect`, `onButtonClick`).

### HTML Structure
- **Prefix**: PrimeNG components use the `p-` prefix (e.g., `<p-button>`, `<p-table>`).
- **Templates**: Use `ng-template` with PrimeNG directives (e.g., `pTemplate="header"`, `pTemplate="body"`) for customizing content within complex components like Tables and DataViews.

## Common Patterns

### Application Configuration
Configure the theme and animations in `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.my-app-dark' // Optional: Custom dark mode selector
                }
            }
        })
    ]
};
```

### Customizing Themes
Create a custom preset to override default styles:

```typescript
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            500: '{indigo.500}',
            600: '{indigo.600}'
        }
    }
});

export default MyPreset;
```

### Tailwind Configuration (v3)
Configure `tailwind.config.js` to use the PrimeUI plugin:

```javascript
import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class~="my-app-dark"]'], // Match PrimeNG darkModeSelector
    content: ["./src/**/*.{html,ts}"],
    plugins: [PrimeUI],
    // ...
};
```

### Data Table
Standard pattern for a data table with pagination and sorting:

```html
<p-table [value]="products" [paginator]="true" [rows]="10" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template pTemplate="header">
        <tr>
            <th pSortableColumn="code">Code <p-sortIcon field="code"></p-sortIcon></th>
            <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>
```

### Form Integration
Using PrimeNG with Reactive Forms:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div class="flex flex-column gap-2">
        <label for="username">Username</label>
        <input pInputText id="username" formControlName="username" />
        <small *ngIf="form.get('username')?.invalid && form.get('username')?.dirty" class="p-error">
            Username is required.
        </small>
    </div>
    <p-button label="Submit" type="submit" [disabled]="form.invalid"></p-button>
</form>
```

### Tag / Badge Pattern
Use `p-tag` for status badges and `p-badge` for notification counts:

```html
<!-- Status badge on a row -->
<p-tag [value]="entry.status" [severity]="getStatusSeverity(entry.status)" />

<!-- Navigation badge for pending approval count -->
<p-badge [value]="pendingCount()" severity="danger" />
```

### Toast Notifications
Register `MessageService` and use `p-toast` for in-app feedback:

```typescript
// In component
constructor(private messageService: MessageService) {}

onApprove() {
  this.messageService.add({
    severity: 'success',
    summary: 'Approved',
    detail: 'Week approved successfully.'
  });
}
```

```html
<p-toast />
```

### Confirm Dialog
Use `p-confirmdialog` with `ConfirmationService` for destructive actions:

```typescript
this.confirmationService.confirm({
  message: 'Are you sure you want to delete this entry?',
  header: 'Confirm Delete',
  icon: 'pi pi-exclamation-triangle',
  accept: () => this.onDelete()
});
```

```html
<p-confirmdialog />
```

---

## PrimeBlocks

[PrimeBlocks](https://primeblocks.org/) is the official block library for PrimeNG — 490+ pre-built, copy-paste-ready UI sections built with PrimeNG components and Tailwind CSS. It is the **primary starting point** for all new UI work in this project before a custom Figma design is available.

### When to Use PrimeBlocks

- Building a new page layout → check **Application Shells** first.
- Building a list or data display → check **Stacked List**, **Grid List**, or **Stats** blocks.
- Building a form → check **Form Layout**, **Action Panel**, or **Sign In** blocks.
- Building navigation → check **Navbar**, **Sidebar Navigation**, or **Vertical Navigation** blocks.
- Building a dashboard → use the **Dashboard** sample block as a skeleton.
- Building an overlay or dialog → check **SlideOver** or **Dialog** blocks.
- Building an alert or status banner → check the **Alert** and **Notification** blocks.

### Block Categories Available

| Category | Sub-categories |
|---|---|
| **Application Shells** | Multi Column Layout, Sidebar Layout, Stacked Layout |
| **Samples** | Dashboard, Detail Screen, Settings Screen |
| **Headings** | Card Heading, Page Heading, Section Heading |
| **Data Display** | Description List, Stats |
| **Lists** | Feed, Grid List, Stacked List |
| **Form** | Action Panel, Form Layout, Radio Group, Sign In |
| **Feedback** | Alert |
| **Navigation** | Breadcrumbs, Footer, Navbar, Sidebar Navigation, Steps, Tabs, Vertical Navigation |
| **Overlays** | Command Menu, Dialog, Notification, SlideOver |
| **Layout** | Container, Divider, List Container, Panel |

### How to Use a PrimeBlock

1. Browse [primeblocks.org](https://primeblocks.org/) and find the block that fits.
2. Copy the Angular HTML template.
3. Paste it into the Angular component template.
4. Replace placeholder data with real signal/store bindings.
5. Remove any inline static styles and replace with Tailwind utility classes.
6. Ensure all PrimeNG components used by the block are imported in the component's `imports` array.

### Adapting Blocks to This Project's Standards

When copying a PrimeBlock, always apply the following transformations:

- **Signals over properties**: Replace `[value]="someVar"` driven by class fields with `[value]="someSignal()"` from an NgRx Signals store.
- **`@if` / `@for`**: Replace legacy `*ngIf` / `*ngFor` directives with the Angular control flow syntax (`@if`, `@for`, `@empty`).
- **`ChangeDetectionStrategy.OnPush`**: Always set on the host component.
- **`standalone: true`**: All components are standalone — add block-required PrimeNG modules to the `imports` array rather than a shared module.
- **Accessibility**: Verify that any `<button>` without visible text has an `aria-label`. Ensure interactive rows have `role="button"` and `tabindex="0"` where appropriate (PrimeNG Table rows do this via `[selectionMode]`).
- **Remove placeholder content**: Delete lorem ipsum, placeholder images, and static mock arrays before committing.

### Example: Sidebar Layout from PrimeBlocks

A typical sidebar shell adapted for this project:

```html
<!-- app-shell.component.html -->
<div class="flex min-h-screen bg-surface-ground">
  <!-- Sidebar -->
  <aside class="w-64 flex-shrink-0 bg-surface-card border-r border-surface">
    <nav aria-label="Main navigation">
      <ul class="list-none p-0 m-0">
        @for (item of navItems(); track item.route) {
          <li>
            <a
              [routerLink]="item.route"
              routerLinkActive="bg-primary-50 text-primary"
              class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface-hover transition-colors"
              [attr.aria-current]="isActive(item.route) ? 'page' : null"
            >
              <i [class]="item.icon" aria-hidden="true"></i>
              <span>{{ item.label }}</span>
              @if (item.badge && item.badge() > 0) {
                <p-badge [value]="item.badge()" severity="danger" class="ml-auto" />
              }
            </a>
          </li>
        }
      </ul>
    </nav>
  </aside>

  <!-- Main content -->
  <main id="main-content" class="flex-1 p-6 overflow-y-auto">
    <router-outlet />
  </main>
</div>
```

```typescript
// app-shell.component.ts
@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, BadgeModule]
})
export class AppShellComponent {
  private approvalStore = inject(ApprovalStore);

  navItems = computed(() => [
    { label: 'Time Entry', route: '/time-entry', icon: 'pi pi-clock' },
    {
      label: 'Approvals',
      route: '/approvals',
      icon: 'pi pi-check-circle',
      badge: this.approvalStore.pendingCount
    }
  ]);
}
```

### Example: Stats Block (Dashboard)

Adapted from the PrimeBlocks Stats section:

```html
<section aria-label="Summary statistics">
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    @for (stat of stats(); track stat.label) {
      <div class="bg-surface-card rounded-xl p-5 border border-surface shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span class="text-muted-color text-sm font-medium">{{ stat.label }}</span>
          <i [class]="stat.icon + ' text-primary text-xl'" aria-hidden="true"></i>
        </div>
        <p class="text-3xl font-bold text-color">{{ stat.value }}</p>
        @if (stat.trend) {
          <p class="text-sm mt-1" [class.text-green-600]="stat.trend > 0" [class.text-red-600]="stat.trend < 0">
            {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}% vs last week
          </p>
        }
      </div>
    }
  </div>
</section>
```

### Example: SlideOver (Approval Detail Panel)

Adapted from the PrimeBlocks SlideOver block using `p-drawer`:

```html
<p-drawer
  [(visible)]="detailVisible"
  position="right"
  styleClass="w-full md:w-[480px]"
  [header]="selectedSubmission()?.employeeName ?? 'Submission Detail'"
>
  @if (selectedSubmission(); as sub) {
    <div class="flex flex-col gap-4">
      <p-tag [value]="sub.status" [severity]="getStatusSeverity(sub.status)" />

      <p-table [value]="sub.entries" [tableStyle]="{ 'min-width': '100%' }">
        <ng-template pTemplate="header">
          <tr>
            <th>Project</th>
            <th class="text-right">Hours</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-entry>
          <tr>
            <td>{{ entry.projectName }}</td>
            <td class="text-right">{{ entry.hours }}</td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <ng-template pTemplate="footer">
      <div class="flex gap-2 justify-end">
        <p-button
          label="Request Changes"
          severity="secondary"
          (onClick)="onRequestChanges(sub)"
        />
        <p-button
          label="Approve"
          icon="pi pi-check"
          (onClick)="onApprove(sub)"
        />
      </div>
    </ng-template>
  }
</p-drawer>
```

---

## Accessibility

- **WCAG Compliance**: PrimeNG components are designed to be WCAG 2.0 compliant. Ensure you maintain this by providing necessary labels and attributes.
- **Labels**: Always provide `label` or `aria-label` for interactive components like buttons and inputs if a visible label is not present.
- **Keyboard Navigation**: Ensure custom templates inside components (like Table cells) maintain keyboard navigability.
- **PrimeBlocks Blocks**: Blocks copied from PrimeBlocks may not always be fully accessible out of the box. After pasting, verify: landmark roles, heading hierarchy, `aria-label` on icon-only buttons, and keyboard operability of interactive rows.

## Performance

- **Virtual Scrolling**: Use `virtualScroll` on Tables and Dropdowns for large datasets.
- **Lazy Loading**: Implement lazy loading for Tables (`[lazy]="true"`) when dealing with backend pagination.
- **Change Detection**: Use `ChangeDetectionStrategy.OnPush` in your components to optimize rendering performance with PrimeNG components.
- **Tree-shake PrimeNG**: Import only the modules used per component (`ButtonModule`, `TableModule`, etc.) — never import `PrimeNGModule` wholesale. This directly addresses the bundle size regression tracked in TD-008.
