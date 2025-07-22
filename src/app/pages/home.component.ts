import { Component, OnInit, ChangeDetectionStrategy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeroComponent } from '../components/home/hero/hero.component';
import { ServicesComponent } from '../components/home/services/services.component';
import { AboutComponent } from '../components/home/about/about.component';
import { PortfolioComponent } from '../components/home/portfolio/portfolio.component';
import { TestimonialsComponent } from '../components/home/testimonials/testimonials.component';
import { ContactComponent } from '../components/home/contact/contact.component';

// Import AOS with a function to avoid issues with SSR
function importAOS(): Promise<any> {
  return import('aos');
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    PortfolioComponent,
    TestimonialsComponent,
    ContactComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-services />
    <app-about />
    <app-portfolio />
    <app-testimonials />
    <app-contact />
  `
})
export class HomeComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  ngOnInit(): void {
    // Initialize AOS only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      importAOS().then(AOS => {
        AOS.init({
          duration: 1000,
          once: true,
          easing: 'ease-in-out'
        });
      });
    }
  }
} 