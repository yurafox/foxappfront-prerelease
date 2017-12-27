import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service";
import {ClientOrder} from "../../app/model";

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'your-orders.html',
})
export class OrdersPage extends ComponentBase {

  orders: Array<ClientOrder>;

  constructor(private navCtrl: NavController, private navParams: NavParams, private repo: AbstractDataRepository) {
    super();
  }

  async ionViewDidLoad() {
    await this.repo.getClientOrders().then(orders => {
      this.orders = orders;
    }).catch(err => {
      console.log(`Error retrieving orders: ${err}`);
    });
  }

}
