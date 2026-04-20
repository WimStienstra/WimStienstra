import { Component } from '@angular/core';
import { DesignSystemDemo } from './components/design-system-demo/design-system-demo';

@Component({
  selector: 'app-root',
  imports: [DesignSystemDemo],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App { }

