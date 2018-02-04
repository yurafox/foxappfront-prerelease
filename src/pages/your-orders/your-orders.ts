import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service';
import {ClientOrder} from '../../app/model';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'your-orders.html',
})
export class OrdersPage extends ComponentBase {

  dataLoaded = false;
  orders = new Array<ClientOrder>();

  constructor(private navCtrl: NavController,
                private repo: AbstractDataRepository) {
    super();
    this.initData();
  }

  async initData() {
    // get data and sort by orderDate desc
    this.orders =
        (await this.repo.getClientOrders())
          .sort((x,y) => {
                                    return (+new Date(y.orderDate) - +new Date(x.orderDate));
                                  }
          );

    // Inits and resolves nav prop's orderProducts collection promise
    for (let order of this.orders) {
      order.orderProducts = await (<any>order).clientorderproducts_p;
    }

    this.dataLoaded = true;
  }


  onBuyItAgainClick(){
    //TODO
  }

  onViewOrderDetailsClick(order: ClientOrder) {
    this.navCtrl.push('OrderDetailsPage', {order: order});
  }

  onWriteReviewClick(product: any) {
    this.navCtrl.push('ItemReviewWritePage', product);
  }

  onReturnReplaceItemClick() {
    //TODO
  }

}
