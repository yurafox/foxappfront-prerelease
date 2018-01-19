import {Component} from '@angular/core';
import {NavController, IonicPage, AlertController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {SelectShipAddressPage} from '../select-ship-address/select-ship-address';
import {UserService} from '../../app/service/bll/user-service';
import {LoginPage} from '../login/login';
import has = Reflect.has;

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})

export class CartPage extends ComponentBase {

  constructor(public cart: CartService, private navCtrl: NavController,
              private uService: UserService, private alertCtrl: AlertController) {
    super();
  }

  onDeleteItem(itemIndex: number) {
    this.cart.removeItem(itemIndex);
  }

  checkout() {
    if (!this.uService.isAuth) {
      this.navCtrl.push('LoginPage', {continuePage: 'SelectShipAddressPage'});
    }
    else {
      let hasErrors = false;

      for (let i of this.cart.orderProducts) {
        if (i.errorMessage) {
          hasErrors = true;
          break;
        }
      };

      if (hasErrors){
        let alert = this.alertCtrl.create({
          message: 'Some items in your order needs your attention. Please review your order and try again',
          buttons: [
            {
              text: 'OK',
              handler: () => {}
            }
          ]
        });
        alert.present();
      }
      else
        this.navCtrl.push('SelectShipAddressPage', {fromCart: 1});
    };
  }

}
