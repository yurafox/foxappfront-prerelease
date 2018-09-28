import {RefInjector, LazyLoad} from '../core/app-core';
import {City} from './city';
import {AbstractGeoRepository} from "../service/repository/abstract/abstract-geo-repository";

@LazyLoad([
  { options: {constructor: City}, action: 'getCityById', params: ['idCity']}
])

export class StorePlace {
  public _geoRepo: AbstractGeoRepository;

  constructor (
    public id?: number,
    public idSupplier?: number,
    public name?: string,
    public idCity?: number,
    public zip?: string,
    public address_line?: string,
    public lat?: number,
    public lng?: number,
    public type?: number
  ){this._geoRepo = RefInjector.pull(AbstractGeoRepository);}
}
