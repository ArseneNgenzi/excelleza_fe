import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, PLATFORM_ID, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  year: number = new Date().getFullYear();
  emailAddress: string = 'info@eccellenza.rw';
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  constructor() {}
  }
