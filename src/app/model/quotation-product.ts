import {Quotation, Product} from './index';
import {AbstractDataRepository} from '../service/index';
import {RefInjector, LazyLoad} from '../core/app-core';

@LazyLoad([
  { options: {constructor: Quotation}, action: 'getQuotationById', params: ['idQuotation']},
  { options: {constructor: Product}, action: 'getProductById', params: ['idProduct']}
])
export class QuotationProduct {
  private _repo: AbstractDataRepository;

  constructor(public id: number,
              public idQuotation: number,
              public idProduct: number,
              public price: number,
              public maxDeliveryDays: number,
              public stockQuant: number) {
    this._repo = RefInjector.pull(AbstractDataRepository);
  }
}
