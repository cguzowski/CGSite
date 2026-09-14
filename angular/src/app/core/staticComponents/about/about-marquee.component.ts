import { ChangeDetectionStrategy, Component } from '@angular/core';

interface AboutHighlight {
  readonly symbol: string;
  readonly text: string;
  readonly usesDrone?: boolean;
}

@Component({
  selector: 'app-about-marquee',
  templateUrl: './about-marquee.component.html',
  styleUrl: './about-marquee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMarqueeComponent {
  readonly duplicateGroups = [false, true] as const;
  readonly highlights: readonly AboutHighlight[] = [
    { symbol: '🚀', text: 'Launched 5+ Systems to Production' },
    { symbol: '📜', text: 'Magna Cum Laude' },
    { symbol: '🎓', text: 'Georgia Tech OMSCS · Starting Spring 2027' },
    { symbol: '🌍', text: '35 Countries · 5 of 7 Continents' },
    { symbol: '🤝', text: 'Mentored Others Across Five Skills' },
    { symbol: '', text: 'FAA Part 107 Certified Drone Pilot', usesDrone: true },
    { symbol: '▶️', text: '1.5 Million Views on One Video' },
    { symbol: '📚', text: 'Read 200+ Books' },
    { symbol: '💻', text: '5,000+ Pre-AI Hours Coding' },
    { symbol: '🛠️', text: '150+ Projects Completed' }
  ];
}
