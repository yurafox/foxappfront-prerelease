import {Injectable} from '@angular/core';
import {CurrencyConvert} from '../../../model/currency';

@Injectable()
export class CurrencyStore {
  private curStore: Array<CurrencyConvert> = [
    new CurrencyConvert(0, 3, 32),
    new CurrencyConvert(0, 0, 26),
    new CurrencyConvert(0, 20, 1.58)
  ];

  constructor() {
  }

  public changeCurrency(value: number, currencyCode: number): string {

    if(currencyCode === 4 )
      return value.toString();

    let currencyConvert: CurrencyConvert = this.curStore.filter((value, index, array) => {
      return value.cur2 === currencyCode;
    })[0];

    let result: number = (value / currencyConvert.rate);
    return result.toString();
  }
}
