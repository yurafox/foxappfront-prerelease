import {Supplier, Currency} from './index';
import {AbstractDataRepository} from '../service/index';
import {RefInjector, LazyLoad} from '../core/app-core';

@LazyLoad([
  {options: { constructor: Supplier}, action: 'getSupplierById', params: ['idSupplier']},
  {options: { constructor: Currency}, action: 'getCurrencyById', params: ['currencyId']}
])
export class Quotation {
  private _repo: AbstractDataRepository;
  constructor(public id?: number,
              public idSupplier?: number,
              public dateStart?: Date,
              public dateEnd?: Date,
              public currencyId?: number) {
    this._repo = RefInjector.pull(AbstractDataRepository);
  }
}
