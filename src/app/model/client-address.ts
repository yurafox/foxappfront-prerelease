import {City} from './city';
import {Country} from './country';
import {LazyLoad, RefInjector, System} from '../core/app-core';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import FoxNumber = System.FoxNumber;
import {Observable} from 'rxjs/Observable';

@LazyLoad([
 /* { options: {constructor: City}, action: 'getCityById', params: ['idCity']},*/
  { options: {constructor: Country}, action: 'getCountryById', params: ['idCountry']}
])
export class ClientAddress {

  private _repo: AbstractDataRepository;

  public get idC(): number {
    return this.idCountry;
  }

  public get addressString(): string {
    return ((<any>this).country) ? this.street +' ' + this.bldApp + ', ' + this.city + ', ' + this.zip + ' '
      + (<any>this).country.name + ', Phone: ' + this.phone : null;
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
