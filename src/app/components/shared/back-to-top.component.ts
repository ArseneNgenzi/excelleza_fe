import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <button 
      *ngIf="isVisible"
      (click)="scrollToTop()"
      class="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 z-50 backdrop-blur-sm bg-opacity-90 border border-white/20 dark:bg-indigo-600 dark:hover:bg-indigo-700"
      aria-label="Back to top">
      <app-icon name="chevron-up" class="text-white"></app-icon>
    </button>
  `
})
export class BackToTopComponent implements OnInit, OnDestroy {
  isVisible = false;
  private scrollThreshold = 400; // Pixels scrolled before button appears
  private scrollListener: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.handleScroll();
      
      this.scrollListener = window.addEventListener('scroll', () => {
        this.handleScroll();
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  @HostListener('window:scroll', [])
  handleScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isVisible = window.scrollY > this.scrollThreshold;
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
} 