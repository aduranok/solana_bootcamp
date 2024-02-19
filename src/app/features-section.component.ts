import { Component } from '@angular/core';

@Component({
  selector: 'bob-features-section',
  template: `
    <section class="px-16">
      <ul class="flex justify-center items-center gap-4">
        <li>Rápido</li>
        <li>Eficiente</li>
        <li>Seguro</li>
      </ul>
    </section>
  `,
  standalone: true,
})
export class FeaturesSectionComponent {}
