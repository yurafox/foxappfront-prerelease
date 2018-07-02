import {QuotationProduct} from './quotation-product';

export class Offer {
  constructor(id: number,
              idClient: number,
              quotation: QuotationProduct,
              price: number,
              dateValidFrom: Date,
              dateValidTo: Date) {}
}
