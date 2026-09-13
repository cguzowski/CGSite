import { TestBed } from '@angular/core/testing';
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

  it('identifies the site author and copyright in a footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('footer')?.textContent)
      .toContain('Designed & Built by Christopher Guzowski © All Rights Reserved 2026');
  });
});
