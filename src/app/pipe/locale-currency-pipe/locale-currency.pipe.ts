import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {IDictionary} from '../../core/app-core';
import {CurrencyStore} from '../../service/repository/specific/currency-store.service';
import {AbstractLocalizationRepository} from "../../service/repository/abstract/abstract-localization-repository";

const map: IDictionary<{name: string, culture: string}> = {
  '4': {name: 'UAH', culture: 'uk-UA'},
  '3': {name: 'EUR', culture: 'en-US'},
  '0': {name: 'USD', culture: 'en-US'},
  '20': {name: 'MDL', culture: 'md-MD'}
};

@Pipe({
  name: 'localeCurrency'
})

export class LocaleCurrencyPipe implements PipeTransform {
  constructor(public currencyStore: CurrencyStore, public locRepo: AbstractLocalizationRepository) {

  }

  transform(value: any,
            currencyCode: number,
            nickDisplay: any,
            digits: string = null): any {
    if (!value) value = 0;
    let currencyText: string = map[currencyCode.toString()].name;
    let dataUpdate = this.currencyStore.changeCurrency(+value, +currencyCode);
    return new CurrencyPipe(currencyText).transform(dataUpdate, currencyText, "symbol-narrow", digits, this.locRepo.getLocString());
  }
}
