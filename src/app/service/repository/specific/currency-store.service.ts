import {Injectable} from '@angular/core';
import {CurrencyConvert} from '../../../model/currency';

@Injectable()
export class CurrencyStore {
  private curStore: Array<CurrencyConvert> = [
    new CurrencyConvert(0, 1, 31),
    new CurrencyConvert(0, 2, 27),
    new CurrencyConvert(0, 3, 1.51)
  ];

  constructor() {
  }

  public changeCurrency(value: number, currencyCode: number): string {

    if(currencyCode ===0 )
      return value.toString();

    let currencyConvert: CurrencyConvert = this.curStore.filter((value, index, array) => {
      return value.cur2 === currencyCode;
    })[0];

    let result: number = (value / currencyConvert.rate);
    return result.toString();
  }
}
