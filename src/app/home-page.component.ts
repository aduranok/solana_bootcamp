import { Component } from '@angular/core';
import { FeaturesSectionComponent } from './features-section.component';
import { HeroSectionComponent } from './hero-section.component';

@Component({
  selector: 'bob-home-page',
  template: `
    <bob-hero-section></bob-hero-section>
    <bob-features-section></bob-features-section>
  `,
  standalone: true,
  imports: [FeaturesSectionComponent, HeroSectionComponent],
})
export class HomePageComponent {}
