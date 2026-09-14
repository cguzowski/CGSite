import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ThemeService } from '../../singletonServices/theme.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let themeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    themeService = jasmine.createSpyObj('ThemeService', ['isDark', 'toggleTheme']);
    themeService.isDark.and.returnValue(false);
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [{ provide: ThemeService, useValue: themeService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('offers native links to the four homepage sections', () => {
    const element: HTMLElement = fixture.nativeElement;
    const links = element.querySelectorAll<HTMLAnchorElement>('nav ul a');
    expect(Array.from(links, link => link.getAttribute('href')))
      .toEqual(['#home', '#about', '#projects', '#contact']);
  });

  it('exposes a named theme control and delegates activation', () => {
    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button[aria-label="Use dark theme"]');
    expect(button).not.toBeNull();
    expect(button?.querySelector('[data-icon="moon"]')).not.toBeNull();
    expect(button?.textContent?.trim()).toBe('');
    button?.click();
    expect(themeService.toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('shows a sun when activating light theme', () => {
    themeService.isDark.and.returnValue(true);
    fixture.detectChanges();

    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button[aria-label="Use light theme"]');
    expect(button?.querySelector('[data-icon="sun"]')).not.toBeNull();
  });
});
