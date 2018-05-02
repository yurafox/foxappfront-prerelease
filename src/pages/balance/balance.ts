import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserService} from '../../app/service/bll/user-service';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {ClientBonus} from '../../app/model/client-bonus';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

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
              public uService: UserService, public cart: CartService,
              public repo: AbstractDataRepository) {
    super();

    this.checkoutMode = this.navParams.data.checkoutMode;
    this.initData();
  }

  private _getTime(date?: Date): number {
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
    let cl = await (<any>this.userService).profile.client_p;
    this.clientBonusArr = await this.repo.getClientBonusesExpireInfo(/*cl.id*/11049778713); //TODO
    this.clientBonusArr.sort((x,y) => {
      return +new Date(x.dueDate) - +new Date(y.dueDate);
    });
    this.dataLoaded = true;
  }

  onContinueClick() {
    this.navCtrl.push('CheckoutPage');
  }

  validatePage() {
    return (!(this.cart.bonus)
        || (this.cart.bonus && (this.cart.bonus <= this.cart.availBonus))
        );
  }

}
