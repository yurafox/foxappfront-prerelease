import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserService} from '../../app/service/bll/user-service';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {ClientBonus} from '../../app/model/client-bonus';
import {AbstractClientRepository} from '../../app/service/repository/abstract/abstract-client-repository';

@IonicPage()
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage extends ComponentBase {

  checkoutMode = false;
  dataLoaded = false;
  showBonusDetails = false;

  clientBonusArr = new Array<ClientBonus>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userService: UserService, public cart: CartService,
              public clientRepo: AbstractClientRepository) {
    super();

    this.checkoutMode = this.navParams.data.checkoutMode;
    this.initData().catch(console.error);
  }

  _getTime(date?: Date): number {
    return date != null ? date.getTime() : 0;
  }

  toggleBonusDetails() {
    this.showBonusDetails = !this.showBonusDetails;
  }

  get bonusDaysLeft(): number {
    if (this.clientBonusArr.length > 0) {
      return Math.ceil((Date.parse(this.clientBonusArr[0].dueDate.toString()) - (new Date()).getTime()) / (1000 * 3600 * 24));
    }
    else
      return null;
  }

  async initData() {
    await this.cart.initBonusData();
    this.clientBonusArr = (await this.clientRepo.getClientBonusesExpireInfo()).filter(x => {return x.type === 'regular';});
    this.clientBonusArr.sort((x,y) => {
      return +new Date(x.dueDate) - +new Date(y.dueDate);
    });
    this.dataLoaded = true;
  }

  onContinueClick() {
    this.navCtrl.push('CheckoutPage').catch(console.error);
  }

  validatePage() {
    return (!(this.cart.bonus)
        || (this.cart.bonus && (this.cart.bonus <= this.cart.availBonus))
        );
  }

}
