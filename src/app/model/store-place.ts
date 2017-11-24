import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {RefInjector, LazyLoad} from '../core/app-core';
import {City} from './city';

@LazyLoad([
  { options: {constructor: City}, action: 'getCityById', params: ['idCity']}
])

export class StorePlace {
  private _repo: AbstractDataRepository;

  constructor (
    public id: number,
    public idSupplier: number,
    public name: string,
    public idCity: number,
    public zip: string,
    public address_line: string,
    public lat: number,
    public lng: number,
    public type: number
  ){this._repo = RefInjector.pull(AbstractDataRepository);}
}
