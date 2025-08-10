// src/app/shared/icon.component.ts
import {
  Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  @if (svgContent) {
    <div [innerHTML]="svgContent" [class]="getIconClass()" [style]="getSvgStyles()"></div>
  } @else {
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
    width: 100%;
    height: 100%;
  }
`]
})
export class IconComponent implements OnChanges {
  @Input() name!: string;
  @Input() size?: 'sm' | 'lg' = 'sm';

  svgContent: SafeHtml | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.processIcon();
  }

  public processIcon(): void {
    if (!this.name) {
      this.resetIcon();
      return;
    }

    const trimmed = this.name.trim();
    if (trimmed.startsWith('<svg')) {
      this.svgContent = this.sanitizer.bypassSecurityTrustHtml(trimmed);
      return;
    }

    const iconName = trimmed.toLowerCase();
    const featherIcon = (feather as any).icons?.[iconName];
    if (featherIcon) {
      const svg = featherIcon.toSvg({});
      this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
      return;
    }

    this.resetIcon();
    console.warn(`Icon "${this.name}" not found in feather-icons or not a valid SVG.`);
  }

  public resetIcon(): void {
    this.svgContent = null;
  }

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