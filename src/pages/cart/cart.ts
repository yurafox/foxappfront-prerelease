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

  validateStep(): boolean {
    // Proceed to checkout rule
    let err = this.cart.cartErrors;
    if (err) {
      let alert = this.alertCtrl.create({
        message: 'Some items in your order needs your attention. Please review your order and try again',
        buttons: [
          {
            text: 'OK',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
      return false;
    }
    else
      return true;
  }

  checkout() {
    if (!this.validateStep())
      return;

    if (!this.uService.isAuth) {
      this.navCtrl.push('LoginPage', {continuePage: 'SelectShipAddressPage'});
    }
    else {
      this.navCtrl.push('SelectShipAddressPage', {fromCart: 1});
    };
  }

  onAfterQtyUpdate(item: any, objRef:any): void {
    this.evServ.events['cartUpdateEvent'].emit();
    this.evServ.events['cartItemsUpdateEvent'].emit();
  }

}
