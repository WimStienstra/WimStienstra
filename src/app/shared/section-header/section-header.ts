import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeader {
  readonly eyebrow = input<string>('');
  readonly heading = input.required<string>();
  readonly description = input<string>('');
  readonly align = input<'left' | 'center'>('left');
}
