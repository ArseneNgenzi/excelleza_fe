import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as feather from 'feather-icons';
import { NgClass } from '@angular/common';

// Create a type for all available Feather icon names
type FeatherIconName = keyof typeof feather.icons;

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span 
      [innerHTML]="icon" 
      [ngClass]="sizeClass"
      class="inline-flex items-center justify-center"
    ></span>
  `
})
export class IconComponent implements OnChanges {
  @Input() name!: string;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
  @Input() strokeWidth: number = 2;
  @Input() class: string = '';
  
  icon: SafeHtml = '';
  
  get sizeClass(): string {
    const sizes = {
      'xs': 'w-3 h-3',
      'sm': 'w-4 h-4',
      'md': 'w-5 h-5',
      'lg': 'w-6 h-6',
      'xl': 'w-8 h-8',
      '2xl': 'w-10 h-10'
    };
    
    return `${sizes[this.size]} ${this.class}`;
  }
  
  constructor(private sanitizer: DomSanitizer) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['strokeWidth']) {
      this.updateIcon();
    }
  }
  
  private updateIcon(): void {
    if (this.name) {
      // Check if the icon exists in the Feather icons collection
      if (this.name in feather.icons) {
        const iconName = this.name as FeatherIconName;
        const featherIcon = feather.icons[iconName];
        
        // Set custom stroke width if provided
        const iconSvg = featherIcon.toSvg({
          'stroke-width': this.strokeWidth,
          'class': this.class
        });
        
        this.icon = this.sanitizer.bypassSecurityTrustHtml(iconSvg);
      } else {
        console.warn(`Feather icon "${this.name}" not found`);
        this.icon = '';
      }
    }
  }
} 