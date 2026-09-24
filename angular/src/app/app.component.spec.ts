import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('introduces the portfolio owner', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Christopher Guzowski');
  });

  it('does not load a fallback during normal hero playback', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.home-background-fallback')).toBeNull();
    expect(compiled.querySelector('video')?.getAttribute('preload')).toBe('auto');
    expect(compiled.querySelectorAll('#about img[src], #projects img[src]').length).toBe(0);
  });

  it('loads the static fallback only when iOS rejects hero autoplay', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const video = compiled.querySelector<HTMLVideoElement>('.home-background')!;
    spyOnProperty(navigator, 'userAgent', 'get').and.returnValue(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1'
    );
    spyOn(video, 'play').and.callFake(
      () => Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError'))
    );

    app.tryPlayHeroVideo(video);
    flushMicrotasks();
    fixture.detectChanges();

    const fallback = compiled.querySelector<HTMLImageElement>('.home-background-fallback');
    expect(fallback).not.toBeNull();
    expect(fallback?.getAttribute('alt')).toBe('');
    expect(video.classList).toContain('ios-playback-blocked');
  }));

  it('keeps the iOS fallback flush with the viewport edges', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.iosPlaybackBlocked = true;
    fixture.detectChanges();
    const fallback = fixture.nativeElement.querySelector('.home-background-fallback') as HTMLImageElement;
    const bounds = fallback.getBoundingClientRect();

    expect(bounds.left).toBeLessThanOrEqual(0);
    expect(bounds.right).toBeGreaterThanOrEqual(document.documentElement.clientWidth);
  });

  it('does not probe or load the iOS fallback on another platform', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const video = compiled.querySelector<HTMLVideoElement>('.home-background')!;
    spyOnProperty(navigator, 'userAgent', 'get').and.returnValue(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/153.0.0.0 Safari/537.36'
    );
    spyOn(video, 'play').and.callFake(
      () => Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError'))
    );

    app.tryPlayHeroVideo(video);
    flushMicrotasks();
    fixture.detectChanges();

    expect(compiled.querySelector('.home-background-fallback')).toBeNull();
    expect(video.classList).not.toContain('ios-playback-blocked');
    expect(video.play).not.toHaveBeenCalled();
  }));

  it('provides separate mobile lines for the Home role without splitting the name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const home = fixture.nativeElement.querySelector('app-home') as HTMLElement;

    expect(home.querySelector('h1')?.classList).toContain('home-name');
    expect(home.querySelector('.role-primary')?.textContent?.trim()).toBe('Full Stack Engineer');
    expect(home.querySelector('.role-secondary')?.textContent?.trim()).toBe('& Applied AI');
  });

  it('presents Home, About, Projects and Contact in that order', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(Array.from(compiled.querySelectorAll('main > section'), section => section.id))
      .toEqual(['home', 'about', 'projects', 'contact']);
    expect(compiled.querySelector('#home h1')).not.toBeNull();
    expect(compiled.querySelectorAll('h1').length).toBe(1);
    expect(compiled.querySelector('#contact app-connect')).not.toBeNull();
    expect(compiled.querySelector('#about app-connect')).toBeNull();
    expect(compiled.querySelector('app-blog')).toBeNull();
    expect(compiled.querySelector('form')).toBeNull();
  });

  it('provides native navigation and a skip link with real destinations', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"], .skip-link');

    expect(links.length).toBeGreaterThanOrEqual(4);
    for (const link of Array.from(links)) {
      expect(compiled.querySelector(link.hash)).withContext(link.textContent ?? '').not.toBeNull();
    }
  });

  it('does not draw a page-sized focus frame around section anchor targets', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const projects = fixture.nativeElement.querySelector('#projects') as HTMLElement;

    projects.focus();

    expect(document.activeElement).toBe(projects);
    expect(getComputedStyle(projects).outlineStyle).toBe('none');
  });

  it('identifies the site author and copyright in a footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('footer')?.textContent)
      .toContain('Designed & Built by Christopher Guzowski © All Rights Reserved 2026');
  });

  it('expands each non-Home mobile title into section links and collapses on navigation or Escape', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('#home app-section-navigation')).toBeNull();
    for (const id of ['about', 'projects', 'contact']) {
      const bar = root.querySelector(`#${id} app-section-navigation`)!;
      expect(bar).not.toBeNull();
      const toggle = bar?.querySelector<HTMLButtonElement>('button');
      expect(toggle).toBeTruthy();
      if (!toggle) continue;
      expect(toggle.textContent?.replace(/\s+/g, ' ').trim())
        .toBe(({about: '• About • •', projects: '• • Projects •', contact: '• • • Contact'} as Record<string, string>)[id]);
      toggle.click();
      fixture.detectChanges();
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      const links = bar.querySelectorAll<HTMLAnchorElement>('nav a');
      expect(Array.from(links, link => link.getAttribute('href'))).toEqual(['#home', '#about', '#projects', '#contact']);
      expect(bar.querySelector('[aria-current="location"]')?.textContent?.trim()).toBe(id[0].toUpperCase() + id.slice(1));
      links[0].addEventListener('click', event => event.preventDefault());
      links[0].click();
      fixture.detectChanges();
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      tick();
      fixture.detectChanges();
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      toggle.click();
      fixture.detectChanges();
      links[1].dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
      fixture.detectChanges();
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
    }
  }));

  it('collapses an expanded mobile section navigation when tapping outside it', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const bar = root.querySelector<HTMLElement>('#about app-section-navigation')!;
    const toggle = bar.querySelector<HTMLButtonElement>('button')!;

    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');

    bar.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');

    root.querySelector<HTMLElement>('#projects')!
      .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('only promotes a section title to navigation after its section reaches the viewport top', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const projects = root.querySelector<HTMLElement>('#projects')!;
    const projectsNavigation = projects.querySelector<HTMLElement>('app-section-navigation')!;

    spyOn(projectsNavigation, 'getBoundingClientRect').and.returnValue({
      top: 240,
      bottom: 1240,
      height: 1000,
      left: 0,
      right: 375,
      width: 375,
      x: 0,
      y: 240,
      toJSON: () => ({})
    });
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(projectsNavigation.classList).not.toContain('stuck');

    projectsNavigation.getBoundingClientRect = jasmine.createSpy().and.returnValue({
      top: 0,
      bottom: 1000,
      height: 1000,
      left: 0,
      right: 375,
      width: 375,
      x: 0,
      y: 0,
      toJSON: () => ({})
    });
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(projectsNavigation.classList).toContain('stuck');
  });
});
