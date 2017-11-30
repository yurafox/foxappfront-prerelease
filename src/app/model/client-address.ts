import {City} from './city';
import {Country} from './country';
import {LazyLoad, RefInjector} from '../core/app-core';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';

@LazyLoad([
 /* { options: {constructor: City}, action: 'getCityById', params: ['idCity']},*/
  { options: {constructor: Country}, action: 'getCountryById', params: ['idCountry']}
])
export class ClientAddress {
  private _repo: AbstractDataRepository;
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
    public bldApp?: string
  ) {this._repo = RefInjector.pull(AbstractDataRepository);}
}
