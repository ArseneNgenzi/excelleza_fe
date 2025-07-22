import { Injectable, signal, WritableSignal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';
  private readonly DARK_CLASS = 'dark';
  private readonly LIGHT_CLASS = 'light';
  private isBrowser: boolean;
  
  currentTheme: WritableSignal<Theme> = signal<Theme>('light');
  
  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    this.initTheme();
    
    if (this.isBrowser) {
      // Set up effect to update DOM and localStorage when theme changes
      effect(() => {
        const theme = this.currentTheme();
        this.updateDOMTheme(theme);
        localStorage.setItem(this.THEME_KEY, theme);
      });
    }
  }
  
  toggleTheme(): void {
    this.currentTheme.update(theme => theme === 'light' ? 'dark' : 'light');
  }
  
  private initTheme(): void {
    if (!this.isBrowser) {
      // Default to light theme on the server
      return;
    }
    
    // Check user's saved preference
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    
    // Check system preference if no saved preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or system preference
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.currentTheme.set(initialTheme);
  }
  
  private updateDOMTheme(theme: Theme): void {
    if (!this.isBrowser) return;
    
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add(this.DARK_CLASS);
      root.classList.remove(this.LIGHT_CLASS);
    } else {
      root.classList.add(this.LIGHT_CLASS);
      root.classList.remove(this.DARK_CLASS);
    }
  }
} 