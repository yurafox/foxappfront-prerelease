import {Quotation, Product} from './index';
import {AbstractDataRepository} from '../service/index';
import {RefInjector, LazyLoad} from '../core/app-core';
import {QuotationProduct} from './quotation-product';

@LazyLoad([
  { options: {constructor: QuotationProduct}, action: 'getQuotationProductById', params: ['idQuotationProduct']}
])

export class ClientOrderProducts {
  private _repo: AbstractDataRepository;

  constructor (
    public id: number,
    public idOrder: number,
    public idQuotationProduct: number,
    public price: number,
    public qty: number
  ){ this._repo = RefInjector.pull(AbstractDataRepository) }
}
