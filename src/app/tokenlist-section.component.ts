import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'bob-tokenlist-section',
  imports: [MatTableModule, MatCard],
  standalone: true,
  template: `
    <mat-card class="w-[800px] px-4 py-8">
      <h2 class="text-center text-3xl mb-4">Tokens</h2>

      @if (!tokens()) {
        <p class="text-center">
          Conecta tu wallet para ver los tokens disponibles.
        </p>
      } @else if (tokens()?.length === 0) {
        <p class="text-center">No hay tokens disponibles.</p>
      } @else {
        <table mat-table [dataSource]="tokens() ?? []">
          <ng-container matColumnDef="Image">
            <th mat-header-cell *matHeaderCellDef>Image</th>
            <td mat-cell *matCellDef="let element">
              <img [src]="element.info.image" class="w-12 h-12" />
            </td>
          </ng-container>

          <ng-container matColumnDef="Symbol">
            <th mat-header-cell *matHeaderCellDef>Symbol</th>
            <td mat-cell *matCellDef="let element">
              {{ element.info.symbol }}
            </td>
          </ng-container>

          <ng-container matColumnDef="Name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.info.name }}</td>
          </ng-container>

          <ng-container matColumnDef="Balance">
            <th mat-header-cell *matHeaderCellDef>Balance</th>
            <td mat-cell *matCellDef="let element">{{ element.balance }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      }
    </mat-card>
  `,
})
export class TokensSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly displayedColumns = ['Image', 'Symbol', 'Name', 'Balance'];

  readonly tokens = computedAsync(() =>
    this._shyftApiService.getAllTokens(this._publicKey()?.toBase58()),
  );
}
