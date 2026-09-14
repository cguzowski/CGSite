import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-section-navigation',
  host: { '[class.stuck]': 'stuck' },
  template: `
    <h2 [id]="section + '-heading'" [attr.aria-label]="title" [class.expanded]="expanded">
      <span class="desktop-title">{{ title }}</span>
      <button #toggle type="button" [attr.aria-expanded]="expanded"
        [attr.aria-controls]="section + '-navigation'"
        [attr.aria-label]="sectionLabel + ': show section navigation'"
        (click)="expanded = !expanded" (keydown.escape)="expanded = false">
        @for (item of sections; track item.id) {
          <span [class.current]="item.id === section" [attr.aria-hidden]="item.id !== section ? 'true' : null">{{ item.id === section ? item.label : '•' }}</span>{{ ' ' }}
        }
      </button>
    </h2>
    <nav [id]="section + '-navigation'" [hidden]="!expanded" aria-label="Section navigation"
      (keydown.escape)="expanded = false; toggle.focus()">
      @for (item of sections; track item.id) {
        <a [href]="'#' + item.id" [attr.aria-current]="item.id === section ? 'location' : null"
          (click)="collapseAfterNavigation()">{{ item.label }}</a>
      }
    </nav>
  `,
  styleUrl: './section-navigation.component.css'
})
export class SectionNavigationComponent implements AfterViewInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private updateStuckState?: () => void;

  @Input({ required: true }) section!: string;
  @Input({ required: true }) title!: string;
  expanded = false;
  stuck = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.updateStuckState = () => {
      const host = this.element.nativeElement;
      const section = host.closest('section');
      if (!section) return;

      const nextStuck = host.getBoundingClientRect().top <= 0
        && section.getBoundingClientRect().bottom > 0;
      if (nextStuck === this.stuck) return;

      this.stuck = nextStuck;
      if (!nextStuck) this.expanded = false;
    };
    this.updateStuckState();
    window.addEventListener('scroll', this.updateStuckState, { passive: true });
    window.addEventListener('resize', this.updateStuckState);
  }

  ngOnDestroy(): void {
    if (!this.updateStuckState) return;
    window.removeEventListener('scroll', this.updateStuckState);
    window.removeEventListener('resize', this.updateStuckState);
  }

  collapseAfterNavigation(): void {
    // Keep the link visible until the browser completes its native fragment action.
    setTimeout(() => this.expanded = false);
  }
  readonly sections = [
    { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' }, { id: 'contact', label: 'Contact' }
  ];
  get sectionLabel(): string {
    return this.sections.find(item => item.id === this.section)?.label ?? this.title;
  }
}
