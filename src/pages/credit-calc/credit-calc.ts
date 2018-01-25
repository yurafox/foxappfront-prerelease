import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CartService} from '../../app/service/cart-service';
import {QuotationProduct} from '../../app/model/quotation-product';
import {UserService} from '../../app/service/bll/user-service';
import {AppConstants} from '../../app/app-constants';


@IonicPage()
@Component({
  selector: 'page-credit-calc',
  templateUrl: 'credit-calc.html',
})
export class CreditCalcPage {

  quotProduct: QuotationProduct = null;
  maxAmt = AppConstants.MAX_LOAN_AMT;
  minAmt = AppConstants.MIN_LOAN_AMT;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public cart: CartService,
              public userService: UserService) {
  }

  public get loanAmount(): number {
    if (this.quotProduct)
      return this.quotProduct.price
    else
      return this.cart.orderTotal;
  }

  onContinueClick() {
    this.viewCtrl.dismiss();
  }

  onSelectItem(cProd) {
    this.cart.credits.forEach(i => {
        i.isChecked = (cProd == i);
      }
    );
  }

  isAnyItemSelected(): boolean {
    let res = false;
    for (let i of this.cart.credits) {
      if (i.isChecked) {
        res = true;
        break;
      }
    };
    return res;
  }

  validatePage(): boolean {
    return this.isAnyItemSelected();
  }
}
