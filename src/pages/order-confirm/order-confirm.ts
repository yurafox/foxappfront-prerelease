import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {HomePage} from "../index";

@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html'
})
export class OrderConfirmPage {
  public cart: any;


  constructor(public nav: NavController) {
    // set cart data
    this.cart = [];
  }

  // place order
  buy() {

    // back to home page
    this.nav.setRoot(HomePage);
  }
}
