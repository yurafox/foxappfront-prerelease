import {RefInjector, LazyLoad} from '../core/app-core';
import {Region} from './region';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';

@LazyLoad([
  { options:{constructor: Region}, action: 'getRegionById', params: ['idRegion']}
])
export class City {

  private _repo: AbstractDataRepository;

  public get cityWithRegion(): string {
    const _reg = ((<any>this).region) ? (<any>this).region.name : '';
    return this.name + ', ' + _reg;
  }

  constructor(
    public id?: number,
    public name?: string,
    public idRegion?: number
  ) { this._repo = RefInjector.pull(AbstractDataRepository);}
}
