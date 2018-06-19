import {Supplier} from './supplier';
import {Currency} from './currency';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {RefInjector, LazyLoad} from '../core/app-core';

@LazyLoad([
  {options: { constructor: Supplier}, action: 'getSupplierById', params: ['idSupplier']},
  {options: { constructor: Currency}, action: 'getCurrencyById', params: ['currencyId']}
])
export class Quotation {
  public _repo: AbstractDataRepository;
  constructor(public id?: number,
              public idSupplier?: number,
              public dateStart?: Date,
              public dateEnd?: Date,
              public currencyId?: number) {
    this._repo = RefInjector.pull(AbstractDataRepository);
  }
}
