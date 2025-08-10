import { Component, ChangeDetectionStrategy, signal, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';

interface Testimonial {
  image: string;
  name: string;
  message: string;
  company: string;
  position: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {
  currentSlide = signal(0);
  screenWidth = signal(typeof window !== 'undefined' ? window.innerWidth : 0);

  testimonials: Testimonial[] = [
    {
      image: 'https://randomuser.me/api/portraits/men/12.jpg',
      name: 'Innocent Byiringiro',
      message: 'Eccellenza delivered a robust land registry system on time. Their team ensured data integrity and a smooth rollout.',
      company: 'IRPV',
      position: 'Executive Director'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/24.jpg',
      name: 'Chipo Moyo',
      message: 'The Deeds Platform modernized our workflows and drastically reduced processing time for land transfers.',
      company: 'Government of Zimbabwe',
      position: 'Project Coordinator'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/31.jpg',
      name: 'Tafadzwa Ndlovu',
      message: 'REPZ elevated the real estate experience with verified listings. Fraud cases dropped noticeably.',
      company: 'Private Sector',
      position: 'Product Lead'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      name: 'Aline Uwase',
      message: 'Their QA practices gave us confidence. The social registry launched with exceptional stability.',
      company: 'MINALOC (via QT Global)',
      position: 'Program Manager'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/28.jpg',
      name: 'Jean Bosco',
      message: 'The PKI integration on Umucyo significantly strengthened trust and compliance in procurement.',
      company: 'RPPA (via QT Global)',
      position: 'Technical Lead'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/37.jpg',
      name: 'Grace Mukamana',
      message: 'A reliable partner. Excellent communication and timely delivery across complex milestones.',
      company: 'QT Global Software',
      position: 'Delivery Manager'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      name: 'Farai Chiwara',
      message: 'From design to deployment, the team showed mastery and ownership. Highly recommended.',
      company: 'Dokuma Group',
      position: 'Operations Director'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/12.jpg',
      name: 'Diane Nyirahabimana',
      message: 'The CMS for CHOGM handled dynamic updates flawlessly and scaled during peak traffic.',
      company: 'Gov’t of Rwanda (via QT Global)',
      position: 'Communications Lead'
    }
  ];

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.currentSlide() > this.maxSlideIndex) {
      this.currentSlide.set(0);
    }
  }

  get visibleSlidesCount(): number {
    const width = this.screenWidth();
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  get slideWidth(): number {
    return 100 / this.visibleSlidesCount;
  }

  get maxSlideIndex(): number {
    return Math.max(0, this.testimonials.length - this.visibleSlidesCount);
  }

  nextSlide(): void {
    this.currentSlide.update(current => current < this.maxSlideIndex ? current + 1 : current);
  }

  prevSlide(): void {
    this.currentSlide.update(current => current > 0 ? current - 1 : current);
  }

  goToSlide(index: number): void {
    if (index >= 0 && index <= this.maxSlideIndex) {
      this.currentSlide.set(index);
    }
  }

  isActiveDot(index: number): boolean {
    const current = this.currentSlide();
    return index >= current && index < current + 1;
  }
} 