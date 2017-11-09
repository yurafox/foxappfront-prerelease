import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {OrderService} from "../../services/mock-services/order-service";

@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html'
})
export class MyOrderPage {
  // sample data
  public orders: any;

  constructor(public nav: NavController, public orderService: OrderService) {
    // set sample data
    this.orders = orderService.getAll();
  }
}
