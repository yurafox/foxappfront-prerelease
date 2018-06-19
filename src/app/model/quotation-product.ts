import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {Product} from './product';
import {RefInjector, LazyLoad} from '../core/app-core';
import {Quotation} from './quotation';

@LazyLoad([
  { options: {constructor: Quotation}, action: 'getQuotationById', params: ['idQuotation']},
  { options: {constructor: Product}, action: 'getProductById', params: ['idProduct']}
])
export class QuotationProduct {
  public _repo: AbstractDataRepository;

  constructor(public id: number,
              public idQuotation: number,
              public idProduct: number,
              public price: number,
              public maxDeliveryDays: number,
              public stockQuant: number,
              public stockLow?: boolean,
              public freeShipping?: boolean,
              public actionPrice?: number) {
    this._repo = RefInjector.pull(AbstractDataRepository);
  }
}
