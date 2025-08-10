import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { provideServiceWorker, } from '@angular/service-worker';

import { routes } from './app.routes';
import * as feather from 'feather-icons';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimations()
  ]
};



// const icons = {
//     Camera,
//     Heart,
//     Github,
//     Home,
//     Users,
//     Briefcase,
//     Grid,
//     Mail,
//     Menu,
//     ChevronUp,
//     Sun,
//     Moon
//   };