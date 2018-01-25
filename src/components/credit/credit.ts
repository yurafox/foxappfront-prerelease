import {Component, Input, OnChanges} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {CartService} from '../../app/service/cart-service';

@Component({
  selector: 'credit',
  templateUrl: 'credit.html'
})
export class CreditComponent extends ComponentBase implements OnChanges {

  @Input()
  maxPeriod: number;

  @Input()
  creditName: string;

  @Input()
  comissionPct: number;

  @Input()
  storeVal: any;

  @Input()
  loanAmount: number;

  public partsPmtArray: Array<{value: number, displayValue: string}> = [];


  constructor(public cart: CartService ) {
    super();
  }

  ngOnChanges() {
    this.initData();
  }

  initData() {
    console.log('Credit max perriod: ' + this.maxPeriod);
    for (let i = 2; i <= this.maxPeriod; i++) {
      this.partsPmtArray.push({value: i, displayValue: i.toString()});
    };
  }

  public get mouthlyPmt(): number {
    return this.cart.calculateLoan(this.loanAmount, this.storeVal.value, this.comissionPct);
  }

}
