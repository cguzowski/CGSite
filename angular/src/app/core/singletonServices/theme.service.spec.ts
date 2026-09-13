import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.removeItem('isDarkTheme');
    document.body.classList.remove('dark-theme');
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.removeItem('isDarkTheme');
    document.body.classList.remove('dark-theme');
  });

  it('should be created', () => {
    service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });

  it('loads dark mode by default when no preference has been saved', () => {
    service = TestBed.inject(ThemeService);

    expect(service.isDark()).toBeTrue();
    expect(document.body.classList.contains('dark-theme')).toBeTrue();
  });

  it('respects a previously saved light-mode preference', () => {
    localStorage.setItem('isDarkTheme', 'false');
    service = TestBed.inject(ThemeService);

    expect(service.isDark()).toBeFalse();
    expect(document.body.classList.contains('dark-theme')).toBeFalse();
  });
});
