

import {QuotationProduct} from './quotation-product';
import {Currency} from './currency';

export class CartProduct {
  constructor(public id: number,
              public quotationProduct: QuotationProduct,
              public qty: number) {
  }
}

export class Order {
  constructor(public id: number,
              public cDate: Date,
              public cur: Currency,
              public clientId: any,
              public orderLine: Array<CartProduct>,
              public total: number,
              public paymentMethod: number,
              public paymentStatus: number,
              public status: number) {
  }

  private get totalItems(): number {
    let count = 0;
    this.orderLine.forEach((value: CartProduct) => {
      count += value.qty;
    });

    return count;
  }
}
