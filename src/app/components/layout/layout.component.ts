import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BackToTopComponent } from '../shared/back-to-top.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BackToTopComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header />
      <main class="flex-grow">
        <router-outlet />
      </main>
      <app-footer />
      <app-back-to-top />
    </div>
  `
})
export class LayoutComponent {} 