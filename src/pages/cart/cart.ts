import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {SelectShipAddressPage} from '../select-ship-address/select-ship-address';
import {UserService} from '../../app/service/bll/user-service';
import {LoginPage} from '../login/login';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})

export class CartPage extends ComponentBase {

  constructor(public cart: CartService, private navCtrl: NavController,
              private uService: UserService) {
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
    if (!this.uService.isAuth) {
      this.navCtrl.push(LoginPage, {continuePage: 'SelectShipAddressPage'});
    }
    else
      this.navCtrl.push(SelectShipAddressPage);
  }

}
