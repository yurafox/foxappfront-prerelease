import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserService} from '../../app/service/bll/user-service';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';

@IonicPage()
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage extends ComponentBase {

  dataLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public uService: UserService, public cart: CartService) {
    super();

    this.initData();
  }

  async initData() {
    await this.cart.initBonusData();
    this.dataLoaded = true;
  }

  onContinueClick() {
    this.navCtrl.push('CheckoutPage');
  }

  validatePage() {
    return (!(this.cart.userInputBonus)
        || (this.cart.userInputBonus && (this.cart.userInputBonus <= this.cart.bonusPayMaxQty)));
  }

}
