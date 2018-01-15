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
      this.navCtrl.push('LoginPage', {continuePage: 'SelectShipAddressPage'});
    }
    else {
      //todo check error messages
      let hasErrors = false;
      for (let i of this.cart.orderProducts) {
        if (i.errorMessage) {
          hasErrors = true;
          break;
        }
      };

      if (hasErrors){
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: 'Please check error messages',
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
