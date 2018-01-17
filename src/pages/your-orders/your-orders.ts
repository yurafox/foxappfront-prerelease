import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service";
import {Client, ClientOrder, ClientOrderProducts, Product, QuotationProduct} from "../../app/model";
import {isNullOrUndefined} from "util";
import {Order} from "../../app/model/cart-product";

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'your-orders.html',
})
export class OrdersPage extends ComponentBase {

  loaded: boolean;
  productArr: Array<{ order: ClientOrder, products: Product[] }>;

  constructor(private navCtrl: NavController, private navParams: NavParams, private repo: AbstractDataRepository) {
    super();
  }

  async ngOnInit() {
    await this.loadProducts();
  }

  async ionViewDidLoad() {
  }

  async loadProducts() {
    try {
      let client = await (<any>this.userService).profile.client_p;
      let ordersAre: boolean;
    } catch (err) {
      console.log(`Error occurred: ${err}`);
      this.navCtrl.setRoot('HomePage').catch();
    }
  }

}
