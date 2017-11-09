import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html'
})
export class MyOrderPage {
  // sample data
  public orders: any;

  constructor(public nav: NavController) {
    // set sample data
    this.orders = [];
  }
}
