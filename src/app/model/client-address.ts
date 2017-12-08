import {City} from './city';
import {Country} from './country';
import {LazyLoad, RefInjector, System} from '../core/app-core';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import FoxNumber = System.FoxNumber;

@LazyLoad([
 /* { options: {constructor: City}, action: 'getCityById', params: ['idCity']},*/
  { options: {constructor: Country}, action: 'getCountryById', params: ['idC']}
])
export class ClientAddress {

  private _repo: AbstractDataRepository;

  public get idC(): number {
    return this.idCountry;
  }

  constructor (
    public id?: number,
    public idClient?: number,
    public idCity?: number,
    public zip?: string,
    public street?: string,
    public lat?: number,
    public lng?: number,
    public isPrimary?: boolean,
    public idCountry?: number,
    public city?: string,
    public bldApp?: string,
    public recName?: string,
    public phone?: string
  ) {this._repo = RefInjector.pull(AbstractDataRepository);}
}
