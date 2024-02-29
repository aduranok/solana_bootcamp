import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { TransferModalComponent } from './transfer-modal.component';

@Component({
  selector: 'bob-balance-section',
  template: `
    @if (!account()) {
    } @else {
      <footer class="flex justify-center">
        <button
          (click)="onTransfer()"
          type="submit"
          mat-raised-button
          color="primary"
        >
          Transferir Fondos
        </button>
      </footer>
    }
  `,
  imports: [MatTableModule, MatCard, TransferModalComponent, MatButton],
  standalone: true,
})
export class BalanceSectionCommponent {
  private readonly _matDialog = inject(MatDialog);
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  private readonly _mintsilly = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';

  readonly account = computedAsync(() =>
    this._shyftApiService.getAccount(
      this._publicKey()?.toBase58(),
      this._mintsilly,
    ),
  );

  onTransfer() {
    //  console.log('Hola mundo!');
    this._matDialog.open(TransferModalComponent);
  }
}
