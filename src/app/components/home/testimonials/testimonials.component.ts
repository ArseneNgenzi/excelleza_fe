import { Component, ChangeDetectionStrategy, signal, HostListener } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';

interface TestimonialItem {
  image: string;
  name: string;
  role: string;
  company: string;
  comment: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {
  currentSlide = signal(0);
  screenWidth = signal(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  testimonialItems: TestimonialItem[] = [
    {
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      comment: 'Working with this team was a game-changer for our business. They completely transformed our online presence and helped us increase our leads by over 200% in just three months.'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      name: 'Michael Chen',
      role: 'CEO',
      company: 'StartupHub',
      comment: 'Their team\'s attention to detail and commitment to quality is unmatched. They didn\'t just deliver a website; they delivered a comprehensive digital strategy that has been instrumental in our growth.'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      name: 'Emily Rodriguez',
      role: 'Design Director',
      company: 'CreativeStudio',
      comment: 'I\'ve worked with many digital agencies over the years, but none have impressed me as much as this team. Their creativity, technical expertise, and project management are all top-notch.'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      name: 'David Thompson',
      role: 'CTO',
      company: 'InnovateX',
      comment: 'The development team exceeded our expectations in every way. They not only delivered on time but also provided innovative solutions to problems we hadn\'t even considered.'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      name: 'Jessica Williams',
      role: 'Operations Manager',
      company: 'GlobalTech',
      comment: 'From the initial consultation to the final delivery, the entire process was smooth and professional. Our new system has streamlined operations and reduced costs significantly.'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/36.jpg',
      name: 'Robert Garcia',
      role: 'Founder',
      company: 'NextGen Solutions',
      comment: 'We approached them with a challenging project that other agencies had turned down. Not only did they accept the challenge, but they delivered a solution that exceeded all our expectations.'
    }
  ];

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    // Reset to first slide when resizing to avoid out-of-bounds issues
    if (this.currentSlide() > this.maxSlideIndex) {
      this.currentSlide.set(0);
    }
  }

  get visibleSlidesCount(): number {
    const width = this.screenWidth();
    if (width < 768) return 1;      // Mobile: 1 slide
    if (width < 1024) return 2;     // Tablet: 2 slides
    return 3;                       // Desktop: 3 slides
  }

  get slideWidth(): number {
    return 100 / this.visibleSlidesCount;
  }

  get maxSlideIndex(): number {
    return Math.max(0, this.testimonialItems.length - this.visibleSlidesCount);
  }

  nextSlide(): void {
    this.currentSlide.update(current => 
      current < this.maxSlideIndex ? current + 1 : current
    );
  }

  prevSlide(): void {
    this.currentSlide.update(current => 
      current > 0 ? current - 1 : current
    );
  }

  goToSlide(index: number): void {
    if (index >= 0 && index <= this.maxSlideIndex) {
      this.currentSlide.set(index);
    }
  }

  isActiveDot(index: number): boolean {
    const current = this.currentSlide();
    return index >= current && index < current + this.visibleSlidesCount;
  }
} 