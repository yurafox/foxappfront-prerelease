import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})

export class CartPage extends ComponentBase {

  constructor(public cart: CartService) {
    super();
  }

  incQty(item): void {
    item.qty++;
  }

  decQty(item): void {
    if (item.qty >= 2)
      item.qty--;
  }

  onDeleteItem(itemIndex: number) {
    this.cart.orderProducts.splice(itemIndex, 1);
  }

}
