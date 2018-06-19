import {Injectable} from '@angular/core';
import {CurrencyRate} from '../../../model/currency-rate';
import { AbstractDataRepository } from '../abstract/abstract-data-repository';

const ticksInDay:number = 86400000;

@Injectable()
export class CurrencyStore {
  public curStore: Array<CurrencyRate>=[];
  public currentTicks:number;
  public lock:boolean;

  constructor(public _repo:AbstractDataRepository) {
    this.lock=false;
  }

  public changeCurrency(value: number, currencyCode: number): string {
    if(currencyCode === 4 )
      return value.toString();

    // update currency rate
    if(this.isNextBind || !this.currentTicks) {
      (async ()=>{
        if(!this.lock){
         this.lock = true;
         await this.initCurrencyRate();
         this.lock = false;
        }
      })();

      // make async correct
      if(this.curStore && this.curStore.length!=0)
        return this.getChangedValue(value,currencyCode);
    }
    else {
      return this.getChangedValue(value,currencyCode);
    }
  }

  public async initCurrencyRate():Promise<void> {
    this.curStore = await this._repo.getCurrencyRate();
    this.currentTicks = new Date().getTime();
  }

  public get isNextBind():boolean {
    return new Date().getTime() > this.currentTicks + ticksInDay;
  }

  public getChangedValue(value: number,currencyCode:number):string {
    let currencyRate: CurrencyRate = this.curStore.filter((value, index, array) => {
      return value.targetId === currencyCode;
    })[0];

    let result: number = (value / currencyRate.rate);
    return result.toString();
  }
}
