// src/app/shared/icon.component.ts
import {
  Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  @if (isFeatherIcon) {
    <i [attr.data-feather]="name" 
       [class]="getIconClass()"></i>
  } @else if (svgContent) {
    <div [innerHTML]="svgContent" [class]="getIconClass()" [style]="getSvgStyles()"></div>
  } @else {
    <!-- Fallback for unknown icons -->
    <div [class]="getIconClass()" title="Unknown icon: {{name}}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
        <circle cx="12" cy="12" r="10"></circle>
        <text x="12" y="16" text-anchor="middle" font-size="12" fill="currentColor">?</text>
      </svg>
    </div>
  }
`,
styles: [`
  :host {
    display: block;
  }
  :host ::ng-deep svg {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
`]
})
export class IconComponent implements OnChanges {
  @Input() name!: string;
  @Input() size?: 'sm' | 'lg' = 'sm';

  isFeatherIcon = false;
  svgContent: SafeHtml | null = null;

  // List of available feather icon names 
  public availableFeatherIcons = [
    'home', 'users', 'briefcase', 'grid', 'mail', 'menu', 'chevron-up', 
    'sun', 'moon', 'camera', 'heart', 'github'
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.processIcon();
  }

  public processIcon(): void {
    if (!this.name) {
      this.resetIcon();
      return;
    }

    // Check if it's an SVG string (starts with <svg)
    if (this.name.startsWith('<svg')) {
      this.isFeatherIcon = false;
      this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.name);
    } 
    // Check if it's a valid feather icon name
    else if (this.availableFeatherIcons.includes(this.name.toLowerCase())) {
      this.isFeatherIcon = true;
      this.svgContent = null;
    } 
    // Unknown icon
    else {
      this.resetIcon();
      console.warn(`Icon "${this.name}" not found. Available feather icons: ${this.availableFeatherIcons.join(', ')}`);
    }
  }

  public resetIcon(): void {
    this.isFeatherIcon = false;
    this.svgContent = null;
  }

  // public getIconClass(): string {
  //   const baseClass = 'inline-block';
  //   const sizeClass = this.size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  //   return `${baseClass} ${sizeClass}`;
  // }

  // public getSize(): string {
  //   return this.size === 'lg' ? '24px' : '16px';
  // }

  public getIconClass(): string {
    const sizeClass = this.size === 'lg' ? 'w-8 h-8' : 'w-4 h-4';
    return `flex items-center justify-center ${sizeClass}`;
  }

  public getSize(): string {
    return this.size === 'lg' ? '32px' : '16px';
  }

    
  public getSvgStyles(): string {
    return 'display: flex; align-items: center; justify-content: center;';
  }

}