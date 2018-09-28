import {Product} from './product';
import {RefInjector, LazyLoad} from '../core/app-core';
import {Quotation} from './quotation';
import {AbstractQuotationRepository} from "../service/repository/abstract/abstract-quotation-repository";
import {AbstractProductRepository} from "../service/repository/abstract/abstract-product-repository";

@LazyLoad([
  { options: {constructor: Quotation}, action: 'getQuotationById', params: ['idQuotation']},
  { options: {constructor: Product}, action: 'getProductById', params: ['idProduct']}
])
export class QuotationProduct {
  public _quotationRepo: AbstractQuotationRepository;
  public _productRepo: AbstractProductRepository;

  constructor(public id: number,
              public idQuotation: number,
              public idProduct: number,
              public price: number,
              public maxDeliveryDays: number,
              public stockQuant: number,
              public stockLow?: boolean,
              public freeShipping?: boolean,
              public actionPrice?: number) {
    this._quotationRepo = RefInjector.pull(AbstractQuotationRepository);
    this._productRepo = RefInjector.pull(AbstractProductRepository);
  }
}
