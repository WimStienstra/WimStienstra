import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant = 'sage' | 'caramel' | 'oker' | 'navy' | 'sunset';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Badge {
  readonly variant = input<BadgeVariant>('sage');
  readonly label = input.required<string>();
}
