import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  afterNextRender,
  inject,
} from '@angular/core';
import { gsap } from 'gsap';
import meta from '../../../content/meta.json';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements OnDestroy {
  readonly meta = meta;
  readonly displayWords = ['FRONTEND', 'DEVELOPER'];

  @ViewChild('heroSection') sectionRef!: ElementRef<HTMLElement>;
  @ViewChildren('wordEl') wordElRefs!: QueryList<ElementRef<HTMLElement>>;

  private mouseMoveHandler!: (e: MouseEvent) => void;
  private readonly zone = inject(NgZone);

  constructor() {
    afterNextRender(() => {
      this.zone.runOutsideAngular(() => {
        this.playEntrance();
        this.attachMouse();
      });
    });
  }

  private playEntrance(): void {
    const els = this.wordElRefs.map(r => r.nativeElement);
    gsap.set(els, { opacity: 0, y: 60 });
    gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out', delay: 0.3 });
    gsap.fromTo('.hero-meta', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 });
    gsap.fromTo('.hero-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.2 });
  }

  private attachMouse(): void {
    const section = this.sectionRef.nativeElement;
    const REPULSE_RADIUS = 150;
    const REPULSE_STRENGTH = 70;

    this.mouseMoveHandler = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      this.wordElRefs.forEach((ref) => {
        const el = ref.nativeElement;
        const elRect = el.getBoundingClientRect();
        const cx = elRect.left + elRect.width / 2 - rect.left;
        const cy = elRect.top + elRect.height / 2 - rect.top;
        const dx = cx - (e.clientX - rect.left);
        const dy = cy - (e.clientY - rect.top);
        const dist = Math.hypot(dx, dy);

        if (dist < REPULSE_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSE_RADIUS) * REPULSE_STRENGTH;
          gsap.to(el, { x: (dx / dist) * force, y: (dy / dist) * force, duration: 0.4, ease: 'power2.out' });
        } else {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        }
      });
    };

    section.addEventListener('mousemove', this.mouseMoveHandler);
    section.addEventListener('mouseleave', () => {
      this.wordElRefs.forEach(ref =>
        gsap.to(ref.nativeElement, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      );
    });
  }

  onCtaClick(type: 'primary' | 'secondary'): void {
    if ('vibrate' in navigator) navigator.vibrate(type === 'primary' ? [40] : [20]);
  }

  ngOnDestroy(): void {
    this.sectionRef?.nativeElement?.removeEventListener('mousemove', this.mouseMoveHandler);
  }
}
