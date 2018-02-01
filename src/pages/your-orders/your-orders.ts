import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service";
import {Client, ClientOrder, ClientOrderProducts, Product, QuotationProduct} from "../../app/model";

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'your-orders.html',
})
export class OrdersPage extends ComponentBase {

  dataLoaded: boolean = true;
  orders = new Array<ClientOrder>();

  constructor(private navCtrl: NavController, private navParams: NavParams,
                private repo: AbstractDataRepository) {
    super();
    this.initData();

  }

  async initData() {
    let _orders = await this.repo.getClientOrders();
    _orders.sort((x,y) => {
      return (+new Date(y.orderDate) - +new Date(x.orderDate));
    });

    for (let order of _orders) {
      let orSpec = await (<any>order).clientorderproducts_p;
      console.log(orSpec);
      order.orderProducts = orSpec;
    }
    this.orders = _orders;
    this.dataLoaded = true;
  }

  onBuyItAgainClick(){
    //TODO
  }

  onViewOrderDetailsClick() {
    //TODO
  }

  onWriteReviewClick() {
    //TODO
  }

  onReturnReplaceItemClick() {
    //TODO
  }

}
