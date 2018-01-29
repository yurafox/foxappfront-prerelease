import { Component } from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@Component({
  selector: 'promo-code',
  templateUrl: 'promo-code.html'
})
export class PromoCodeComponent extends ComponentBase {

  constructor(public cart: CartService, public repo: AbstractDataRepository) {
    super();
  }

  onApplyPromoCodeClick() {
    this.cart.getPromocodeDiscount();
  }

}
