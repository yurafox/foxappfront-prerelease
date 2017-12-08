import {Injectable} from '@angular/core';
import {ClientOrder} from '../model/client-order';
import {ClientOrderProducts} from '../model/client-order-products';
import {QuotationProduct} from '../model/quotation-product';
import {StorePlace} from '../model/store-place';
import {UserService} from './bll/user-service';
import {AbstractDataRepository} from './repository/abstract/abstract-data-repository';
import {EventService} from './event-service';
import {System} from '../core/app-core';


@Injectable()
export class CartService {

  private cKey = 'cartItems';
  public order: ClientOrder;
  public orderProducts = new Array <ClientOrderProducts>();

  constructor(private userService: UserService, private repo: AbstractDataRepository,
              private evServ: EventService) {
    this.evServ.events['logonEvent'].subscribe(() => {
        this.addCartItemsFromStorage();
      }
    );

    this.evServ.events['logOffEvent'].subscribe(() => {
        this.orderProducts = [];
      }
    );
    this.initCart();
  };

  async initCart() {
    //this.orderProducts = [];
    if (this.userService.isAuth)
      this.orderProducts = await this.repo.getCartProducts()
    else {
      const stor = JSON.parse(localStorage.getItem(this.cKey));
      if (stor) {
        stor.forEach((val) => {
          let spec = new ClientOrderProducts();
          spec.idQuotationProduct = val.idQuotationProduct;
          spec.price = val.price;
          spec.qty = val.qty;
          spec.idStorePlace = val.storePlace;
          this.orderProducts.push(spec);
        });
      };
    }
  }

  // после успешного логона переносим корзину из локалстораджа в бекенд
  async addCartItemsFromStorage() {
    let op = await this.repo.getCartProducts();
    for (let i of this.orderProducts) {
      await this.repo.saveCartProduct(i);
      op.push(i);
    };

    //переключаем корзину на результирующую
    this.orderProducts = op;

    // после переноса содержимого локальной корзиньі в бекенд - затираем локальную корзину
    localStorage.setItem(this.cKey, null);
  }

  public get cartItemsCount(): number {
      let _q = 0;
      if (this.orderProducts)
        this.orderProducts.forEach(item => {
          _q = _q + item.qty;
        });
      return _q;
  }

  public get orderTotal(): number {
    let _s = 0;
    if (this.orderProducts) {
      this.orderProducts.forEach(item => {
        _s = _s + item.price*item.qty;
      });
    };
    return _s;
  }

  async addItem(item: QuotationProduct, qty: number, price: number, storePlace: StorePlace) {
    let orderItem = new ClientOrderProducts();
    orderItem.idQuotationProduct = item.id;
    orderItem.price = price;
    orderItem.qty = qty;
    orderItem.idStorePlace = (storePlace ? storePlace.id : null);

    if (this.userService.isAuth) {
      orderItem = await this.repo.saveCartProduct(orderItem);
    }

    this.orderProducts.push(orderItem);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    if (!this.userService.isAuth) {

      let saveArr = new Array<any>();
      this.orderProducts.forEach(i => {
          // TODO переписать на DTO после того, как пофиксим баг с удалением методов декоратором LazyLoading
/*
          let saveObj = {idQuotationProduct: i.idQuotationProduct,
            price: i.price, qty: i.qty, idStorePlace: i.idStorePlace};
*/
          saveArr.push(i.dto);
        }
      );
      localStorage.setItem(this.cKey, JSON.stringify(saveArr));
    }
  }

  async updateItem(itemIndex: number) {
    //TODO implement update method

  }

  async removeItem(itemIndex: number) {
    if (this.userService.isAuth)
      this.repo.deleteCartProduct(this.orderProducts[itemIndex]);
    this.orderProducts.splice(itemIndex, 1);
    this.saveToLocalStorage();
  }

}
