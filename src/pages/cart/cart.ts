import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {OrderConfirmPage} from "../index";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  public cart: any;

  constructor(public nav: NavController) {
    // set cart data
    this.cart = null;
  }

  // remove item
  remove() {
  }

  // place order
  buy() {
    this.nav.setRoot(OrderConfirmPage);
  }
}
