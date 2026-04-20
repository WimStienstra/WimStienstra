import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type GlassVariant = 'warm' | 'sage' | 'glow' | 'light';

@Component({
  selector: 'app-glass-card',
  imports: [],
  templateUrl: './glass-card.html',
  styleUrl: './glass-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"glass-card-host"',
  },
})
export class GlassCard {
  readonly variant = input<GlassVariant>('warm');
  readonly padding = input<string>('var(--space-6)');
}
