import {Component, Input} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {CreditCalc} from '../../app/model/credit-calc';
import {CartService} from '../../app/service/cart-service';


@Component({
  selector: 'credit-brief',
  templateUrl: 'credit-brief.html'
})
export class CreditBriefComponent extends ComponentBase {

  @Input()
  public credit: CreditCalc = null;

  @Input()
  public creditAmt: number;

  constructor(public cart: CartService) {
    super();
  }

}
