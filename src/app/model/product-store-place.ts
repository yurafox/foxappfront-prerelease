import {RefInjector, LazyLoad} from '../core/app-core';
import {StorePlace} from './store-place'
import {AbstractStorePlaceRepository} from "../service/repository/abstract/abstract-store-place-repository";

@LazyLoad([
  { options: {constructor: StorePlace}, action: 'getStorePlaceById', params: ['idStorePlace']}
])

export class ProductStorePlace {
  _storePlaceRepo: AbstractStorePlaceRepository;

  constructor (
    public id: number,
    public idQuotationProduct: number,
    public idStorePlace: number,
    public qty: number
  )
  {this._storePlaceRepo = RefInjector.pull(AbstractStorePlaceRepository);}
}
