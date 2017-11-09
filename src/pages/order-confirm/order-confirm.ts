import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {CartService} from '../../services/mock-services/cart-service';
import {HomePage} from "../index";

@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html'
})
export class OrderConfirmPage {
  public cart: any;


  constructor(public nav: NavController, public cartService: CartService) {
    // set cart data
    this.cart = cartService.getAll();
  }

  // place order
  buy() {

    // back to home page
    this.nav.setRoot(HomePage);
  }
}
