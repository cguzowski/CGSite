import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = true;

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    this.saveTheme();
  }

  loadTheme(): void {
    if (this.isBrowser()) {
      const savedTheme = localStorage.getItem('isDarkTheme');
      this.isDarkTheme = savedTheme === null || savedTheme === 'true';
      document.body.classList.toggle('dark-theme', this.isDarkTheme);
    }
  }

  saveTheme(): void {
    if (this.isBrowser()) {
      localStorage.setItem('isDarkTheme', JSON.stringify(this.isDarkTheme));
    }
  }

  isDark(): boolean {
    return this.isDarkTheme;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}
