import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BlobColor = 'sunset' | 'sage' | 'caramel';

@Component({
  selector: 'app-blob-background',
  imports: [],
  templateUrl: './blob-background.html',
  styleUrl: './blob-background.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlobBackground {
  readonly color = input<BlobColor>('sunset');
  readonly size = input<string>('400px');
  readonly top = input<string>('auto');
  readonly left = input<string>('auto');
  readonly right = input<string>('auto');
  readonly bottom = input<string>('auto');
}
