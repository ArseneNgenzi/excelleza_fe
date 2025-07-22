import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class AppComponent {
  title = 'Excellenza Technologies Ltd. - Software Development Agency';
  private themeService = inject(ThemeService);
  
  constructor() {
    // Theme service is injected to initialize it
    // The effect in the service will handle theme changes
  }
}
