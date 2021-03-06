import { Component } from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@Component({
  selector: 'promo-code',
  templateUrl: 'promo-code.html'
})
export class PromoCodeComponent extends ComponentBase {

  errorText: string;

  constructor(public cart: CartService, public repo: AbstractDataRepository) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.errorText = this.locale['ErrorText'];
  }

  onApplyPromoCodeClick() {
    this.evServ.events['cartUpdateEvent'].emit();
    //this.cart.getPromocodeDiscount();
  }

}
