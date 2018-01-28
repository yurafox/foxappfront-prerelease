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

  availBonus: number;
  availPromoBonus: number;
  dataLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public uService: UserService, public cart: CartService) {
    super();
    this.initData();
  }

  async initData() {
    let cl = await (<any>this.uService).profile.client_p;
    this.availBonus = cl.bonusBalance;
    this.availPromoBonus = cl.actionBonusBalance;
    this.dataLoaded = true;
  }

  onContinueClick() {
    this.navCtrl.push('CheckoutPage');
  }

  validatePage() {
    return (this.cart.bonus <= this.availBonus);
  }

}
