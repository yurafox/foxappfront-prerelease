import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service";
import {ClientOrder, Product} from "../../app/model";

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

  async ionViewDidLoad() {
    let client = await (<any>this.userService).profile.client_p;
    let ordersAre: boolean;
    try {
      await this.repo.getClientOrdersAll().then(orders => {
        if (orders && orders.length > 0) {
          this.productArr = [];
          for(let i = 0; i < orders.length; i++) {
            let order = orders[i];
            if (order.idClient === client.id) {
              ordersAre = true;

              let prod: { order: ClientOrder, products: Product[] };
              let productsArr: Product[] = [];
              this.repo.getClientDraftOrderSpecProducts().then(orderSpecProducts => {
                for (let j = 0; j < orderSpecProducts.length; j ++) {
                  let orderSpecProduct = orderSpecProducts[j];
                  if (order.id === orderSpecProduct.idOrder) {
                    this.repo.getQuotationProductById(orderSpecProduct.idQuotationProduct).then(quotProd => {
                      let quotProdProductId = quotProd.idProduct;
                      this.repo.getProductById(quotProdProductId).then(product => {
                        //console.log(`${j}. product.id: ${product.id}`);

                        if (product.id) {
                          if (order.id === orderSpecProduct.idOrder) {
                            if (orderSpecProduct.idQuotationProduct === quotProd.id) {
                              if (quotProdProductId === product.id) {
                                this.loaded = true;
                                productsArr.push(new Product(quotProd.id, product.name, quotProd.price, product.manufacturerId,
                                  null, product.imageUrl, product.rating));
                              }
                            }
                          }
                        }
                      });
                    })
                  }
                }
                prod = {order: order, products: productsArr};
                this.productArr.push(prod);
              })
            }
          }
          if (!ordersAre) {
            this.loaded = false;
          }
        } else {
          this.loaded = false;
        }
      }).catch(err => {
        console.log(`Error retrieving orders: ${err}`);
      });
    } catch (err) {
      console.log(`Error occurred: ${err}`);
    }
  }
}
