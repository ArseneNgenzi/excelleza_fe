import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
        title: 'Xolio - Creative Digital Agency'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
