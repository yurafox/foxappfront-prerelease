import {Component, Input, OnChanges} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {CreditCalc} from '../../pages/credit-calc/credit-calc';

@Component({
  selector: 'credit',
  templateUrl: 'credit.html'
})
export class CreditComponent extends ComponentBase implements OnChanges {

  @Input()
  loanAmount: number;


  @Input()
  cProduct: CreditCalc;

  public partsPmtArray: Array<{clMonths: number, displayValue: string}> = [];


  constructor(public cart: CartService ) {
    super();
  }

  ngOnChanges() {
    this.initData();
  }

  initData() {
    //console.log('Credit max perriod: ' + this.cProduct.creditProduct.maxTerm);
    for (let i = this.cProduct.creditProduct.minTerm; i <= this.cProduct.creditProduct.maxTerm; i++) {
      this.partsPmtArray.push({clMonths: i, displayValue: i.toString()});
    };
  }



}
