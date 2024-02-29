import { Component } from '@angular/core';
import { BalanceSectionCommponent } from './balance-section.component';
import { TokensSectionComponent } from './tokenlist-section.component';
import { TransactionsSectionComponent } from './transactions-section.component';

@Component({
  selector: 'bob-balance-page',
  template: `
    <div class="flex justify-center mb-4 px-4 py-8">
      <bob-tokenlist-section></bob-tokenlist-section>
    </div>
    <div class="flex justify-center gap-1 pb-12">
      <bob-balance-section></bob-balance-section>
    </div>
    <div class="flex justify-center mb-4">
      <bob-transactions-section></bob-transactions-section>
    </div>
  `,
  standalone: true,
  imports: [
    TransactionsSectionComponent,
    BalanceSectionCommponent,
    TokensSectionComponent,
  ],
})
export class BalancePageComponent {}
