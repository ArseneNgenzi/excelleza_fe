import { Component, ChangeDetectionStrategy } from '@angular/core';

interface PortfolioItem {
  image: string;
  alt: string;
  title: string;
  description: string;
  client: string[];
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
      image: 'https://res.cloudinary.com/dd2gn74lv/image/upload/v1754839351/Screenshot_2025-08-10_at_17.22.13_bcoogv.png',
      alt: 'Rwanda Valuation System',
      title: 'Rwanda Valuation System',
      description: 'Centralized registry enabling property valuations, online requests, certificate verification, and valuer oversight—improving trust and reducing fraud.',
      client: ['IRPV'],
      delay: 100
    },
    {
      image: 'https://res.cloudinary.com/dd2gn74lv/image/upload/v1754838868/Screenshot_2025-08-10_at_17.14.09_yeym6e.png',
      alt: 'Deeds Platform – Zimbabwe',
      title: 'Deeds Platform – Zimbabwe',
      description: 'Digital land management platform to search and verify property records and transfer ownership via conveyancers—modernizing transactions.',
      client: ['Government of Zimbabwe'],
      delay: 150
    },
    {
      image: 'https://res.cloudinary.com/dd2gn74lv/image/upload/v1754840105/Screenshot_2025-08-10_at_17.28.40_zynibu.png',
      alt: 'REPZ Real Estate Platform – Zimbabwe',
      title: 'REPZ Real Estate Platform – Zimbabwe',
      description: 'Centralized platform for listing, buying, renting, and selling properties—integrated with land system to verify agents and properties, reducing fraud.',
      client: ['Private Sector'],
      delay: 200
    },
    {
      image: 'https://res.cloudinary.com/dd2gn74lv/image/upload/v1754840722/Screenshot_2025-08-10_at_17.44.18_mwazk5.png',
      alt: 'Social Registry – Rwanda',
      title: 'Social Registry – Rwanda',
      description: 'National social registry consolidating program data to help institutions identify vulnerable households by defined criteria.',
      client: ['MINALOC (via QT Global Software LTD)'],
      delay: 250
    },
    {
      image: 'https://res.cloudinary.com/dd2gn74lv/image/upload/v1754841407/umucyo_hrkyjk.jpg',
      alt: 'Umucyo System (PKI Integration)',
      title: 'Umucyo System (PKI Integration)',
      description: 'Integrated PKI for secure digital signatures and encrypted transactions—strengthening trust in procurement.',
      client: ['RPPA (via QT Global Software LTD)'],
      delay: 300
    },
    {
      image: 'https://images.unsplash.com/photo-1585247226801-bc613c441316?auto=format&fit=crop&w=1470&q=80',
      alt: 'CHOGM CMS – Rwanda',
      title: 'CHOGM CMS – Rwanda',
      description: 'Custom CMS for centralized management of media, updates, and event information in real time during CHOGM 2022.',
      client: ['Government of Rwanda (via QT Global Software LTD)'],
      delay: 350
    }
  ];
} 