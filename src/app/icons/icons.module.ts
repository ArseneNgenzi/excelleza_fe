// src/app/icons/icons.module.ts
import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Home, Briefcase, Users } from 'angular-feather/icons';

const icons = {
    Camera,
    Heart,
    Github,
    Home,
    Briefcase,
    Users
  };
  

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule]
})
export class IconsModule {}
