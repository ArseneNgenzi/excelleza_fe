import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgFor } from '@angular/common';

interface PortfolioItem {
  image: string;
  alt: string;
  title: string;
  description: string;
  tags: string[];
  delay: number;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent {
  portfolioItems: PortfolioItem[] = [
    {
      image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      alt: 'E-commerce Website',
      title: 'E-commerce Website',
      description: 'A modern e-commerce platform with seamless user experience and secure payment processing.',
      tags: ['Web Design', 'Development', 'E-commerce'],
      delay: 100
    },
    {
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      alt: 'Mobile Banking App',
      title: 'Mobile Banking App',
      description: 'A secure and intuitive mobile banking application with advanced features for financial management.',
      tags: ['UI/UX Design', 'Mobile App', 'Fintech'],
      delay: 200
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      alt: 'Corporate Branding',
      title: 'Corporate Branding',
      description: 'Complete brand identity design including logo, visual elements, and brand guidelines.',
      tags: ['Branding', 'Graphic Design', 'Identity'],
      delay: 300
    },
    {
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      alt: 'Marketing Campaign',
      title: 'Digital Marketing Campaign',
      description: 'Comprehensive digital marketing strategy that increased client\'s conversion rate by 150%.',
      tags: ['Marketing', 'SEO', 'Social Media'],
      delay: 400
    },
    {
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
      alt: 'Educational Platform',
      title: 'Educational Platform',
      description: 'Online learning platform with interactive courses, assessments, and student progress tracking.',
      tags: ['Web App', 'Education', 'UX Design'],
      delay: 500
    },
    {
      image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      alt: 'Real Estate Website',
      title: 'Real Estate Website',
      description: 'Property listing website with advanced search, virtual tours, and agent management system.',
      tags: ['Web Design', 'Real Estate', 'Development'],
      delay: 600
    }
  ];
} 