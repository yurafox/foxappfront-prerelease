import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {IDictionary} from '../../core/app-core';
import {CurrencyStore} from '../../service/index';

const map: IDictionary<{name: string, culture: string}> = {
  '1': {name: 'UAH', culture: 'uk-UA'},
  '2': {name: 'RUB', culture: 'ru-RU'},
  '3': {name: 'USD', culture: 'en-US'}
};

@Pipe({
  name: 'localeCurrency'
})

export class LocaleCurrencyPipe implements PipeTransform {
  constructor(private currencyStore: CurrencyStore) {

  }

  transform(value: any,
            currencyCode: string,
            nickDisplay: boolean = true,
            digits: string = null): any {
    let currencyText: string = map[currencyCode].name;
    let dataUpdate = this.currencyStore.changeCurrency(+value, +currencyCode);
    return new CurrencyPipe(currencyText).transform(dataUpdate, currencyText, nickDisplay, digits);
  }
}
