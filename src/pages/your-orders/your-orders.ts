import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {AbstractProductRepository} from '../../app/service/repository/abstract/abstract-product-repository';
import {AbstractQuotationProductRepository} from '../../app/service/repository/abstract/abstract-quotation-product-repository';
import {AbstractClientRepository} from '../../app/service/repository/abstract/abstract-client-repository';
import {AbstractCartRepository} from '../../app/service/repository/abstract/abstract-cart-repository';

export class OrdersFilter {
  constructor(
    public key: string,
    public displayName: string,
    public isDefault?: boolean
  ){}
}

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'your-orders.html',
})
export class OrdersPage extends ComponentBase {

  dataLoaded = false;
  orderProducts = [];
  filter: OrdersFilter = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public productRepo: AbstractProductRepository,
              public quotProductRepo: AbstractQuotationProductRepository,
              public clientRepo: AbstractClientRepository,
              public cartRepo: AbstractCartRepository,
              public cart: CartService, public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
    super();

    this.initData(this.navParams.data.filter).catch(console.error);
  }

  async initData(data: OrdersFilter) {
    if (!data)
      this.filter = await this.clientRepo.getDefaultClientOrderDatesRanges(true);
    else {
      this.filter = data;
    }
    this.orderProducts = await this.cartRepo.getClientOrderProductsByDate(this.filter.key);
    this.dataLoaded = true;
  }

  onShowFilterClick(filter: OrdersFilter) {
    this.navCtrl.push('OrdersFilterPage', {filter}).catch(console.error);
  }

  async onBuyItAgainClick(idQuotProd: number){
    const qp = await this.quotProductRepo.getQuotationProductById(idQuotProd);
    const valQ = await this.quotProductRepo.getByItAgainQP(qp);
    const message = this.locale['AlertMessage'];
    if (valQ) {
      await this.cart.addItem(valQ,  1, valQ.price, null, this, true)
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
      alert.present().catch(console.error);
    }
  }

  async onViewOrderDetailsClick(orderId: number) {
    const order = await this.cartRepo.getClientHistOrderById(orderId);
    order.orderProducts = await this.cartRepo.getClientHistOrderProductsByOrderId(orderId);
    this.navCtrl.push('OrderDetailsPage', {order: order}).catch(console.error);
  }

  async onWriteReviewClick(idProduct: number) {
    const product = await this.productRepo.getProductById(idProduct);
    this.navCtrl.push('ItemReviewWritePage', product).catch(console.error);
  }

  onTrackItemClick(orderSpec: number) {
    this.navCtrl.push('LoTrackItemPage', orderSpec).catch(console.error);
  }

}
