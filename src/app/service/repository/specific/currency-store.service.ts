import {Injectable} from '@angular/core';
import {CurrencyConvert} from '../../../model/currency';

@Injectable()
export class CurrencyStore {
  private curStore: Array<CurrencyConvert> = [
    new CurrencyConvert(1, 1, 1),
    new CurrencyConvert(1, 2, 2.16),
    new CurrencyConvert(1, 3, 27),
  ];

  constructor() {
  }

  public changeCurrency(value: number, currencyCode: number): string {
    let currencyConvert: CurrencyConvert = this.curStore.filter((value, index, array) => {
      return value.cur2 === currencyCode;
    })[0];

    let result: number = (currencyConvert.cur2 !== 2) ? (value / currencyConvert.rate) : value * currencyConvert.rate;
    return result.toString();
  }
}
