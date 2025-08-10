import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { IconComponent } from '../../shared/icon.component';

interface Service {
  icon: string;
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  services = signal<Service[]>([
    {
      icon: 'code',
      title: 'Software Solutions',
      description: 'End-to-end design, development, maintenance, and enhancement of robust digital platforms tailored to client needs.',
      link: '/services/software-solutions'
    },
    {
      icon: 'package',
      title: 'Product Management',
      description: 'Designing and managing digital products that are desirable, usable, and viable—with strong market fit and business value.',
      link: '/services/product-management'
    },
    {
      icon: 'clipboard',
      title: 'Project Management',
      description: 'Leading complex technology initiatives with precision, aligned to scope, time, and budget constraints.',
      link: '/services/project-management'
    },
    {
      icon: 'check-circle',
      title: 'Quality Assurance',
      description: 'Rigorous testing protocols and continuous validation to ensure reliability, performance, and user satisfaction.',
      link: '/services/quality-assurance'
    },
    {
      icon: 'server',
      title: 'System Administration',
      description: 'Strategic systems and infrastructure management to support daily operations and long-term growth.',
      link: '/services/system-administration'
    },
    {
      icon: 'shield',
      title: 'Cybersecurity',
      description: 'Security embedded across the SDLC—safeguarding data, ensuring compliance, and protecting against evolving threats.',
      link: '/services/cybersecurity'
    }
  ]);
} 