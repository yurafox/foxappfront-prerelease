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
  productArr: Array<{ order: ClientOrder, products: Product[] }> = [];

  constructor(private navCtrl: NavController, private navParams: NavParams, private repo: AbstractDataRepository) {
    super();
  }

  async ionViewDidLoad() {
    let client = await (<any>this.userService).profile.client_p;

    try {
      await this.repo.getClientOrdersAll().then(orders => {
        if (orders) {
          orders.forEach(order => {
            //console.log(`order clientId: ${order.idClient}`);
            //console.log(`client id: ${client.id}`);
            if (order.idClient === client.id) {
              let prod: { order: ClientOrder, products: Product[] };
              let productsArr: Product[] = [];
              this.loaded = true;

              this.repo.getClientDraftOrderSpecProducts().then(orderSpecProducts => {
                orderSpecProducts.forEach(orderSpecProduct => {
                  if (order.id === orderSpecProduct.idOrder) {
                    //console.log(`idQuotProd: ${orderSpecProduct.idQuotationProduct}`);

                    this.repo.getQuotationProductById(orderSpecProduct.idQuotationProduct).then(quotProd => {
                      //console.log(`qoutProd id: ${quotProd.idProduct}`);

                      this.repo.getProductById(quotProd.idProduct).then(product => {
                        //console.log(`product price: ${product.price}`);
                        this.loaded = true;

                        if (order.id === orderSpecProduct.idOrder) {
                          if (orderSpecProduct.idQuotationProduct === quotProd.id) {
                            if (quotProd.idProduct === product.id) {
                              //console.log(`product id: ${product.id}`);
                              productsArr.push(new Product(quotProd.id, product.name, quotProd.price, product.manufacturerId,
                                null, product.imageUrl, product.rating));
                            }
                          }
                        }
                      });
                    })
                  }
                });
                prod = {order: order, products: productsArr};
                this.productArr.push(prod);
              })
            } else if (!orders || (order.idClient !== client.id)) {
              this.loaded = false;
            }
          });
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
