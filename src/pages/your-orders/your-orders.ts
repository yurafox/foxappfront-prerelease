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
      await this.extractedClientOrdersAll(client, ordersAre);
    } catch (err) {
      console.log(`Error occurred: ${err}`);
      this.navCtrl.setRoot('HomePage').catch();
    }
  }

  async extractedClientOrdersAll(client: any, ordersAre: boolean) {
    await this.repo.getClientOrdersAll().then(orders => {
      if (orders && orders.length > 0) {
        this.productArr = [];
        for (let i = 0; i < orders.length; i++) {
          let order = orders[i];
          if (order.idClient === client.id) {
            ordersAre = true;

            let prod: { order: ClientOrder, products: Product[] };
            let productsArr: Product[] = [];
            this.extractedClientDraftSpecProducts(order, productsArr, prod).catch(err => {
              console.log(`Error: ${err}`);
            });
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
  }

  async extractedClientDraftSpecProducts(order: ClientOrder, productsArr: Product[], prod: { order: ClientOrder; products: Product[] }) {
    await this.repo.getClientDraftOrderSpecProducts().then(orderSpecProducts => {
      for (let j = 0; j < orderSpecProducts.length; j++) {
        let orderSpecProduct = orderSpecProducts[j];
        if (order.id === orderSpecProduct.idOrder) {
          let prodIds = [];
          let products: Product[] = [];
          this.extractedQuotationProducts(orderSpecProduct, products, prodIds, productsArr, order).catch(err => {
            console.log(`Error: ${err}`);
          });
        }
      }
      prod = {order: order, products: productsArr};
      this.productArr.push(prod);
    })
  }

  async extractedQuotationProducts(orderSpecProduct: ClientOrderProducts, products: Product[], prodIds: any[], productsArr: Product[], order: ClientOrder) {
    await this.repo.getQuotationProductById(orderSpecProduct.idQuotationProduct).then(quotProd => {
      let quotProdProductId = quotProd.idProduct;
      for (let k = 0; k <= products.length; k++) {
        if (prodIds.includes(quotProdProductId)) {
          if (products[k].id) {
            productsArr.push(new Product(products[k].id, products[k].name, quotProd.price, products[k].manufacturerId,
              null, products[k].imageUrl, products[k].rating, products[k].recall, products[k].supplOffers));
          }
        } else {
          this.extractedProducts(quotProdProductId, order, orderSpecProduct, quotProd, prodIds, products, productsArr).catch(err => {
            console.log(`Error: ${err}`);
          });
        }
      }
    });
  }

  async extractedProducts(quotProdProductId: number, order: ClientOrder, orderSpecProduct: ClientOrderProducts, quotProd, prodIds: any[], products: Product[], productsArr: Product[]) {
    await this.repo.getProductById(quotProdProductId).then(product => {

      if (!isNullOrUndefined(product)) {
        if (order.id === orderSpecProduct.idOrder) {
          if (orderSpecProduct.idQuotationProduct === quotProd.id) {
            if (quotProdProductId === product.id) {
              this.loaded = true;
              //console.log(`${j}. product.id: ${product.id}`);
              prodIds.push(quotProdProductId);
              products.push(product);
              productsArr.push(new Product(product.id, product.name, quotProd.price, product.manufacturerId,
                null, product.imageUrl, product.rating, product.recall, product.supplOffers));
            }
          }
        }
      }
    });
  }
}
