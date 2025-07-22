import { Component, signal, HostListener, computed, ChangeDetectionStrategy, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { ThemeToggleComponent } from '../../shared/theme-toggle.component';
import { IconComponent } from '../../shared/icon.component';
import { filter } from 'rxjs/operators';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent, NgClass, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private scrollY = signal(0);
  menuOpen = signal(false);
  activeSection = signal('hero');
  private router = inject(Router);
  private scrollListener: any;
  
  isScrolled = computed(() => this.scrollY() > 50);

  constructor() {
    // Close mobile menu when route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.menuOpen.set(false);
    });
  }

  ngOnInit() {
    // Add scroll event listener for section tracking
    this.scrollListener = () => this.checkActiveSection();
    window.addEventListener('scroll', this.scrollListener, { passive: true });
    
    // Initial check
    setTimeout(() => this.checkActiveSection(), 500);
  }
  
  ngOnDestroy() {
    // Clean up event listeners
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY.set(window.scrollY);
  }
  
  toggleMenu() {
    this.menuOpen.update(value => !value);
  }

  scrollToSection(sectionId: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    // Set active section immediately for better UX
    this.activeSection.set(sectionId);

    // Special case for "hero" - scroll to top of page
    if (sectionId === 'hero') {
      if (this.router.url !== '/') {
        // Navigate to home first, then scroll to top
        this.router.navigate(['/']).then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // For other sections
      if (this.router.url !== '/') {
        // Navigate to home first, then scroll after navigation is complete
        this.router.navigate(['/']).then(() => {
          setTimeout(() => this.scrollToElement(sectionId), 100);
        });
      } else {
        this.scrollToElement(sectionId);
      }
    }

    // Close the mobile menu if it's open
    this.menuOpen.set(false);
  }

  private scrollToElement(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get header height to adjust scroll position
      const headerHeight = document.querySelector('header')?.clientHeight || 0;
      
      // Calculate position to scroll to
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;
      
      // Scroll to the element with offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  isActive(sectionId: string): boolean {
    return this.activeSection() === sectionId;
  }
  
  private checkActiveSection() {
    // Get all sections
    const sections = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
    const headerHeight = document.querySelector('header')?.clientHeight || 0;
    const scrollPosition = window.scrollY + headerHeight + 50; // Add some buffer
    
    // Special case for top of page
    if (scrollPosition < 300) {
      this.activeSection.set('hero');
      return;
    }
    
    // Check each section
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (!element) continue;
      
      const sectionTop = element.offsetTop;
      const sectionBottom = sectionTop + element.offsetHeight;
      
      // If current scroll position is within this section
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        this.activeSection.set(sectionId);
        return;
      }
    }
  }
} 