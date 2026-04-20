import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { GlassCard } from '../../shared/glass-card/glass-card';
import { Badge } from '../../shared/badge/badge';
import { Button } from '../../shared/button/button';
import { SectionHeader } from '../../shared/section-header/section-header';
import { BlobBackground } from '../../shared/blob-background/blob-background';

@Component({
  selector: 'app-design-system-demo',
  imports: [GlassCard, Badge, Button, SectionHeader, BlobBackground, TitleCasePipe],
  templateUrl: './design-system-demo.html',
  styleUrl: './design-system-demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemDemo {
  readonly colors = [
    { name: 'sage', value: '#8a9a8d', label: 'Sage' },
    { name: 'caramel', value: '#c19a6b', label: 'Caramel' },
    { name: 'oker', value: '#d4a54a', label: 'Oker' },
    { name: 'navy', value: '#2d3e50', label: 'Navy' },
    { name: 'sunset', value: '#ff8c42', label: 'Sunset' },
    { name: 'amber', value: '#ffb366', label: 'Amber' },
    { name: 'ember', value: '#ff6b42', label: 'Ember' },
    { name: 'bg-canvas', value: '#f8f4ef', label: 'Canvas' },
    { name: 'bg-surface', value: '#fdfbf7', label: 'Surface' },
    { name: 'bg-surface-warm', value: '#f0ebe3', label: 'Surface Warm' },
  ];

  readonly tags: Array<'sage' | 'caramel' | 'oker' | 'navy' | 'sunset'> = [
    'sage', 'caramel', 'oker', 'navy', 'sunset',
  ];
}

