import {RefInjector, LazyLoad} from '../core/app-core';
import {Supplier} from './supplier';
import {Currency} from './currency';
import {AbstractSupplierRepository} from "../service/repository/abstract/abstract-supplier-repository";
import {AbstractCurrencyRepository} from "../service/repository/abstract/abstract-currency-repository";

@LazyLoad([
  {options: { constructor: Supplier}, action: 'getSupplierById', params: ['idSupplier']},
  {options: { constructor: Currency}, action: 'getCurrencyById', params: ['currencyId']}
])
export class Quotation {
  _supplierRepo: AbstractSupplierRepository;
  _currencyRepo: AbstractCurrencyRepository;
  constructor(public id?: number,
              public idSupplier?: number,
              public dateStart?: Date,
              public dateEnd?: Date,
              public currencyId?: number) {
    this._supplierRepo = RefInjector.pull(AbstractSupplierRepository);
    this._currencyRepo = RefInjector.pull(AbstractCurrencyRepository);
  }
}
