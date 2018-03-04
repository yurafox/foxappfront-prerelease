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

  get dto(): any {
    return  {id: this.id, idClient: this.idClient, idCity: this.idCity, zip: this.zip, street: this.street,
      lat: this.lat, lng: this.lng, isPrimary: this.isPrimary,
      idCountry: this.idCountry, city: this.city,
      bldApp: this.bldApp, recName: this.recName,
      phone: this.phone};
  }

  public get addressString(): string {
    const cntry = ((<any>this).country) ? (<any>this).country.name : '';
    const phone = this.phone ? ', Phone: ' + this.phone : '';
    return ((this.street) ? this.street : '') + ' ' +
      ((this.bldApp) ? this.bldApp : '') + ', ' +
      ((this.city) ? this.city : '') + ', ' +
      ((this.zip) ? this.zip : '') + ' ' +
      cntry + ' ' +
      phone;
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
