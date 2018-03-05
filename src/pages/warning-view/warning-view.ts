import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartService} from '../../app/service/cart-service';
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage()
@Component({
  selector: 'page-warning-view',
  templateUrl: 'warning-view.html',
})
export class WarningViewPage extends ComponentBase {
  warnArr = [];
  dataLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public cart: CartService) {
    super();
    this.initData();
  }

async initData() {
  this.warnArr = [];
  for (let i of this.cart.orderProducts) {
    if ((!(i.warningRead) && !(i.warningMessage == null))) {
      let prod = await (await (<any>i).quotationproduct_p).product_p;
      this.warnArr.push({product: prod, warningMessage: i.warningMessage});
      i.warningRead = true;
      this.cart.repo.saveCartProduct(i);
    }
  };
  this.dataLoaded = true;

}

}
