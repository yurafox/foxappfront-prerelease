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
    let lang = this.userService.lang;
    if (lang === 1) {
      this.errorText = 'Содержимое корзины было обновлено. Пожалуйста, примените промокод снова';
    } else if (lang === 2) {
      this.errorText = 'Вміст кошика було оновлено. Будь-ласка, застосуйте промокод знову';
    } else if (lang === 3) {
      this.errorText = 'Cart content has been updated. Please, apply promocode again';
    } else {
      this.errorText = 'Содержимое корзины было обновлено. Пожалуйста, примените промокод снова';
    }
  }

  onApplyPromoCodeClick() {
    this.evServ.events['cartUpdateEvent'].emit();
    //this.cart.getPromocodeDiscount();
  }

}
