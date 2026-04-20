---
description: 'Guidelines for using Tailwind CSS in the project'
applyTo: '**/*.html, **/*.css, **/*.scss, **/*.ts'
---

# Tailwind CSS Development Guidelines

Instructions for using Tailwind CSS effectively, covering installation, configuration, and best practices for utility-first styling.

## General Instructions

- **Philosophy**: Adopt a utility-first approach. Build complex components from primitive utilities directly in your HTML.
- **Responsiveness**: Use mobile-first breakpoints (e.g., `sm:`, `md:`, `lg:`) to build responsive layouts.
- **Dark Mode**: Use the `dark:` variant to style for dark mode. Ensure your configuration aligns with the project's dark mode strategy (selector or media strategy).
- **Optimization**: Tailwind automatically purges unused styles in production. Do not worry about bundle size when using many utilities.

## Best Practices

### Layout & Spacing
- **Flexbox & Grid**: Use `flex` and `grid` utilities for layout instead of custom CSS.
- **Spacing**: Use the spacing scale (e.g., `p-4`, `m-2`, `gap-4`) to ensure consistent whitespace.
- **Container**: Use the `container` class with `mx-auto` for centering page content.

### Typography
- **Scale**: Use the typography scale (e.g., `text-sm`, `text-xl`, `font-bold`) for consistent font sizing and weights.
- **Colors**: Use semantic color utilities (e.g., `text-gray-700`, `text-primary-500`) to maintain theme consistency.

### Reusability
- **Components**: Extract repeating utility patterns into component classes using `@apply` in CSS files ONLY when necessary (e.g., for complex buttons used everywhere). Prefer keeping utilities in HTML for better maintainability.
- **Loops**: In frameworks like Angular, use loops (`*ngFor`) to render repetitive elements instead of copying HTML blocks.

## Code Standards

### Class Ordering
- **Consistency**: Order classes logically (e.g., Layout -> Box Model -> Typography -> Visuals -> Misc).
- **Plugins**: Consider using a prettier plugin for automatic class sorting if available in the workspace.

### Customization
- **Config**: Customize `tailwind.config.js` to extend the theme (colors, spacing, breakpoints) rather than using arbitrary values (e.g., `w-[123px]`) frequently.
- **Arbitrary Values**: Use arbitrary values `[]` only for one-off styles that don't fit the design system.

## Common Patterns

### Responsive Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="p-4 border rounded shadow">Item 1</div>
  <div class="p-4 border rounded shadow">Item 2</div>
  <div class="p-4 border rounded shadow">Item 3</div>
</div>
```

### Centered Card
```html
<div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
  <div class="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Login</h2>
    <!-- Content -->
  </div>
</div>
```

### Interactive Elements
```html
<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
  Click Me
</button>
```

## Integration with UI Libraries

- **PrimeNG**: When using with PrimeNG, install `tailwindcss-primeui` to access PrimeNG theme colors (e.g., `bg-primary`, `text-surface-500`) as Tailwind utilities.
- **Overrides**: Use CSS layers or specific utility classes to override library styles if necessary, but prefer using the library's theming API first.
