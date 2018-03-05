import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service';
import {ClientOrder} from '../../app/model';
import {ClientOrderProducts} from '../../app/model/client-order-products';
import {CartService} from '../../app/service/cart-service';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'your-orders.html',
})
export class OrdersPage extends ComponentBase {

  dataLoaded = false;
  orders = new Array<ClientOrder>();

  constructor(private navCtrl: NavController,
                private repo: AbstractDataRepository,
                private cart: CartService, public toastCtrl: ToastController,
                private alertCtrl: AlertController) {
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


  async onBuyItAgainClick(orderSpec: ClientOrderProducts){
    const valQ = await this.repo.getByItAgainQP(await (<any>orderSpec).quotationproduct_p);
    let message = this.locale['AlertMessage'];
    if (valQ) {
      this.cart.addItem(valQ,  1, valQ.price, null, this)
    }
    else {
      let alert = this.alertCtrl.create({
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }
  }

  onViewOrderDetailsClick(order: ClientOrder) {
    this.navCtrl.push('OrderDetailsPage', {order: order});
  }

  onWriteReviewClick(product: any) {
    this.navCtrl.push('ItemReviewWritePage', product);
  }

  onTrackItemClick(orderSpec: ClientOrderProducts) {
    this.navCtrl.push('LoTrackItemPage', orderSpec);
  }

}
