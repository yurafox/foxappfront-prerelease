import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {SelectShipAddressPage} from '../select-ship-address/select-ship-address';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})

export class CartPage extends ComponentBase {

  constructor(public cart: CartService, private navCtrl: NavController) {
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
    this.cart.removeItem(itemIndex);
  }

  checkout() {
    this.navCtrl.push(SelectShipAddressPage);
  }

}
