import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _key = '9J5KgbmsMqq8Qn45';
  private readonly _header = { 'x-api-key': this._key };
  private readonly _mintsol = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  private readonly _mintsilly = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';

  getAllTokens(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL('https://api.shyft.to/sol/v1/wallet/all_tokens');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);

    return this._httpClient
      .get<{
        result: {
          address: string;
          balance: number;
          info: { name: string; symbol: string; image: string };
        }[];
      }>(url.toString(), {
        headers: this._header,
      })
      .pipe(map((response) => response.result));
  }

  getEndpoint() {
    const url = new URL('https://rpc.shyft.to');

    url.searchParams.set('api_key', this._key);

    return url.toString();
  }

  getAccount(publicKey: string | undefined | null, token: string) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);
    url.searchParams.set('token', token);

    return this._httpClient
      .get<{ result: { balance: number; info: { image: string } } }>(
        url.toString(),
        { headers: this._header },
      )
      .pipe(map((response) => response.result));
  }

  getBalance(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL('https://api.shyft.to/sol/v1/wallet/balance');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);

    return this._httpClient
      .get<{
        result: { balance: number };
      }>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));
  }

  getTransactions(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL('https://api.shyft.to/sol/v1/transaction/history');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('account', publicKey);
    url.searchParams.set('tx_num', '10');

    return this._httpClient
      .get<{ result: { status: string; type: string; timestamp: string }[] }>(
        url.toString(),
        {
          headers: this._header,
        },
      )
      .pipe(map((response) => response.result));
  }
}
