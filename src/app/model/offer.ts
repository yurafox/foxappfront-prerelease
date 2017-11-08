import {QuotationProduct} from './index';

export class Offer {
  constructor(id: number,
              idClient: number,
              quotation: QuotationProduct,
              price: number,
              dateValidFrom: Date,
              dateValidTo: Date) {}
}
