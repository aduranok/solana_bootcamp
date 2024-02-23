import { Component } from '@angular/core';
import { BalanceSectionCommponent } from './balance-section.component';
import { TransactionsSectionComponent } from './transactions-section.component';

@Component({
  selector: 'bob-balance-page',
  template: `
    <div class="flex justify-center gap-4">
      <bob-balance-section></bob-balance-section>

      <bob-transactions-section></bob-transactions-section>
    </div>
  `,
  standalone: true,
  imports: [TransactionsSectionComponent, BalanceSectionCommponent],
})
export class BalancePageComponent {}
