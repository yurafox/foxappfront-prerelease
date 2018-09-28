import {RefInjector, LazyLoad} from '../core/app-core';
import {Region} from './region';
import {AbstractGeoRepository} from "../service/repository/abstract/abstract-geo-repository";

@LazyLoad([
  { options:{constructor: Region}, action: 'getRegionById', params: ['idRegion']}
])
export class City {

  _geoRepo: AbstractGeoRepository;

  public get cityWithRegion(): string {
    const _reg = ((<any>this).region) ? (<any>this).region.name : '';
    return this.name + ', ' + _reg;
  }

  constructor(
    public id?: number,
    public name?: string,
    public idRegion?: number
  ) { this._geoRepo = RefInjector.pull(AbstractGeoRepository);}
}
