import {Injectable} from '@angular/core';
import {CurrencyRate} from '../../../model/currency-rate';
import { AbstractDataRepository } from '../abstract/abstract-data-repository';

const ticksInDay:number = 86400000;

@Injectable()
export class CurrencyStore {
  private curStore: Array<CurrencyRate>=[];
  private currentTicks:number;
  private lock:boolean;

  constructor(private _repo:AbstractDataRepository) {
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

  private async initCurrencyRate():Promise<void> {
    this.curStore = await this._repo.getCurrencyRate();
    this.currentTicks = new Date().getTime();
  }

  private get isNextBind():boolean {
    return new Date().getTime() > this.currentTicks + ticksInDay;
  }

  private getChangedValue(value: number,currencyCode:number):string {
    let currencyRate: CurrencyRate = this.curStore.filter((value, index, array) => {
      return value.targetId === currencyCode;
    })[0];

    let result: number = (value / currencyRate.rate);
    return result.toString();     
  }
}
