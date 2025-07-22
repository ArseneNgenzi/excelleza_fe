import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button 
      (click)="toggleTheme()" 
      class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
      aria-label="Toggle theme"
    >
      <!-- Sun icon (shown in dark mode) -->
      @if (themeService.currentTheme() === 'dark') {
        <app-icon name="sun" class="text-yellow-400"></app-icon>
      } @else {
        <!-- Moon icon (shown in light mode) -->
        <app-icon name="moon" class="text-gray-700 dark:text-gray-300"></app-icon>
      }
    </button>
  `
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
} 