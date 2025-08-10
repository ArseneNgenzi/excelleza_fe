import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html'
})
export class AboutComponent {} 