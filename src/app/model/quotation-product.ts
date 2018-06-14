import {RefInjector, LazyLoad} from '../core/app-core';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {Product} from './product';

@LazyLoad([
  { options: {constructor: QuotationProduct}, action: 'getQuotationById', params: ['idQuotation']},
  { options: {constructor: Product}, action: 'getProductById', params: ['idProduct']}
])
export class QuotationProduct {
  private _repo: AbstractDataRepository;

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
