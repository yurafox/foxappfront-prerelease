import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {RefInjector, LazyLoad} from '../core/app-core';
import {StorePlace} from './store-place'

@LazyLoad([
  { options: {constructor: StorePlace}, action: 'getStorePlaceById', params: ['idStorePlace']}
])

export class ProductStorePlace {
  _repo: AbstractDataRepository;

  constructor (
    public id: number,
    public idQuotationProduct: number,
    public idStorePlace: number,
    public qty: number
  )
  {this._repo = RefInjector.pull(AbstractDataRepository);}
}
