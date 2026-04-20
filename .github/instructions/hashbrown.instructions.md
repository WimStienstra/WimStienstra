---
description: 'Guidelines for using HashBrown for Generative UI in Angular'
applyTo: '**/*.ts, **/*.html'
---

# HashBrown Instructions

Guidelines for using HashBrown (`@hashbrownai/angular`) to build Generative UI features in the TUPFF project.

## General Instructions

- Use HashBrown to enable LLMs to render Angular components ("Generative UI") instead of just text.
- Use `uiChatResource` to manage the chat state and interaction with the LLM.
- Expose "dumb" presentation components to the LLM using `exposeComponent`.
- Use the `prompt` tagged template literal for system instructions to ensure type-safety and validation of examples.

## Best Practices

- **Component Granularity**: Expose small, focused components (e.g., `ChartComponent`, `StatsCardComponent`) rather than large page-level components.
- **Schema Definition**: Use Skillet (`s`) for defining schemas. While it is "Zod-like", HashBrown uses its own optimized schema language to ensure compatibility with LLM structured outputs and streaming. Do not use Zod directly for `exposeComponent` or tool definitions.
- **Streaming**: Use `s.streaming.string()` for text content to improve perceived performance.
- **System Instructions**: Provide clear examples in the system prompt using the `<ui>` tag syntax to teach the LLM when to use specific components.

## Code Standards

### Exposing Components

Use `exposeComponent` to define the schema for your Angular components.

```typescript
import { exposeComponent, s } from '@hashbrownai/angular';
import { ChartComponent } from './chart.component';

export const ExposedChartComponent = exposeComponent(ChartComponent, {
  description: 'Displays a chart to visualize data',
  input: {
    title: s.string('The title of the chart'),
    type: s.string('The type of chart (bar, line, pie)'),
    data: s.array(
      s.object({
        label: s.string('Data label'),
        value: s.number('Data value'),
      })
    ),
  },
});
```

### Chat Resource Setup

Initialize the chat resource in your component or service.

```typescript
import { Component, inject } from '@angular/core';
import { uiChatResource, prompt } from '@hashbrownai/angular';
import { ExposedChartComponent } from './exposed-components';

@Component({
  // ...
})
export class ChatComponent {
  chat = uiChatResource({
    apiUrl: '/api/chat', // Point to your backend proxy
    system: prompt`
      You are a helpful data analyst.
      
      ### EXAMPLES
      <user>Show me sales for Q1</user>
      <assistant>
        <ui>
          <app-chart 
            title="Q1 Sales" 
            type="bar" 
            data='[{"label": "Jan", "value": 100}, {"label": "Feb", "value": 120}]'
          />
        </ui>
      </assistant>
    `,
    components: [ExposedChartComponent],
  });
}
```

### Rendering

Use `<hb-render-message>` to render the assistant's response.

```html
@for (message of chat.value(); track $index) {
  @if (message.role === 'assistant') {
    <hb-render-message [message]="message" />
  } @else {
    <div class="user-message">{{ message.content }}</div>
  }
}
```

## Mocking with MSW

To test HashBrown integrations without calling a real LLM, intercept the chat API endpoint with MSW.

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/chat', async () => {
    // Simulate a streaming response or a static JSON response
    // For simple tests, return a JSON that matches the HashBrown response structure
    return HttpResponse.json({
      role: 'assistant',
      content: '',
      // This structure depends on the specific LLM provider adapter being used
      // but generally involves returning the tool calls or UI schema
    });
  }),
];
```

*Note: For complex streaming mocks, refer to the MSW documentation on streaming responses.*
