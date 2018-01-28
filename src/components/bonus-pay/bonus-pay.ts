import { Component } from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {CartService} from '../../app/service/cart-service';

@Component({
  selector: 'bonus-pay',
  templateUrl: 'bonus-pay.html'
})
export class BonusPayComponent extends ComponentBase {

  constructor(public cart: CartService) {
    super();
  }


}
