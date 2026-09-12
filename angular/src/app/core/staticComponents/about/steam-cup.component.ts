import { afterNextRender, Component, ElementRef, inject, NgZone, OnDestroy, viewChild } from '@angular/core';
import { createSteamAnimation } from './steam-animation';

@Component({
  selector: 'app-steam-cup',
  standalone: true,
  templateUrl: './steam-cup.component.html',
  styleUrl: './steam-cup.component.css',
  host: { role: 'img', 'aria-label': 'A ceramic coffee cup with gently rising steam' }
})
export class SteamCupComponent implements OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('steam');
  private readonly cup = viewChild.required<ElementRef<SVGSVGElement>>('cup');
  private cleanup?: () => void;

  constructor() {
    afterNextRender(() => {
      this.cleanup = this.zone.runOutsideAngular(() =>
        createSteamAnimation(this.canvas().nativeElement, this.cup().nativeElement));
    });
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}
