import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DesignSystemDemo } from './components/design-system-demo/design-system-demo';

@Component({
  selector: 'app-root',
  imports: [DesignSystemDemo],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App { }

