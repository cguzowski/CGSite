import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps the portrait URL out of the initial document until About approaches', () => {
    const image: HTMLImageElement = fixture.nativeElement.querySelector('.profile-photo');
    expect(image.hasAttribute('src')).toBeFalse();
    component.portraitReady.set(true);
    fixture.detectChanges();
    expect(image.getAttribute('src')).toBeTruthy();
    expect(image.getAttribute('srcset')).toContain('400w');
  });

  it('offers accessible resume and profile links beneath the about content', () => {
    const host = fixture.nativeElement as HTMLElement;
    const links = Array.from(host.querySelectorAll<HTMLAnchorElement>('.profile-link'));

    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Resume',
      'GitHub',
      'LinkedIn'
    ]);
    expect(links[0].getAttribute('href')).toBe('assets/documents/resume.pdf');
    expect(links[0].hasAttribute('download')).toBeFalse();
    expect(links[0].getAttribute('target')).toBe('_blank');
    expect(links[1].getAttribute('href')).toBe('https://github.com/cguzowski');
    expect(links[2].getAttribute('href')).toBe('https://www.linkedin.com/in/chris-guzowski/');

    for (const link of links.slice(1)) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    }

    for (const link of links) {
      expect(link.querySelector('.profile-link__icon')).not.toBeNull();
      expect(link.querySelector('.profile-link__label')).not.toBeNull();
    }
  });

  it('places a categorized professional snapshot between the biography and profile links', () => {
    const host = fixture.nativeElement as HTMLElement;
    const biography = host.querySelector<HTMLElement>('.biography');
    const snapshot = host.querySelector<HTMLElement>('.about-snapshot');
    const profileLinks = host.querySelector<HTMLElement>('.profile-links');

    expect(snapshot).not.toBeNull();
    expect(biography).not.toBeNull();
    expect(profileLinks).not.toBeNull();
    expect(biography!.compareDocumentPosition(snapshot!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(snapshot!.compareDocumentPosition(profileLinks!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const headings = Array.from(snapshot!.querySelectorAll('h3')).map((heading) => heading.textContent?.trim());
    expect(headings).toEqual(['Skills', 'Core tech', 'Hobbies']);
    expect(snapshot!.textContent).toContain('Full-stack development');
    expect(snapshot!.textContent).toContain('PostgreSQL');
    expect(snapshot!.textContent).toContain('Hugging Face models');
    expect(snapshot!.textContent).toContain('Mindful activities');
  });

  it('places a readable highlights marquee beneath the profile links', () => {
    const host = fixture.nativeElement as HTMLElement;
    const profileLinks = host.querySelector<HTMLElement>('.profile-links');
    const marquee = host.querySelector<HTMLElement>('app-about-marquee');

    expect(profileLinks).not.toBeNull();
    expect(marquee).not.toBeNull();
    expect(profileLinks!.compareDocumentPosition(marquee!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(marquee!.textContent).toContain('Launched 5+ Systems to Production');
    expect(marquee!.textContent).toContain('Georgia Tech OMSCS · Starting Spring 2027');
    expect(marquee!.textContent).toContain('FAA Part 107 Certified Drone Pilot');
    expect(marquee!.querySelector('svg')).not.toBeNull();
  });
});
