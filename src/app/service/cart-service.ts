import {Injectable} from '@angular/core';
import {ClientOrder} from '../model/client-order';
import {ClientOrderProducts} from '../model/client-order-products';
import {QuotationProduct} from '../model/quotation-product';
import {UserService} from './repository/specific/user-service';

@Injectable()
export class CartService {

  public order: ClientOrder;
  public orderProducts = new Array <ClientOrderProducts>();

  constructor(public userSvc: UserService ) {

  };

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

  addItem(item: QuotationProduct, qty: number, price: number) {
    let orderItem = new ClientOrderProducts(
      100,
      1,
      item.id,
      price,
      qty
    );

    this.orderProducts.push(orderItem);
  }

  removeItem(itemIndex: number) {
    this.orderProducts.splice(itemIndex, 1);
  }

}
