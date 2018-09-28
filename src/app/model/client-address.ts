import {Country} from './country';
import {LazyLoad, RefInjector} from '../core/app-core';
import {AbstractGeoRepository} from "../service/repository/abstract/abstract-geo-repository";

@LazyLoad([
  { options: {constructor: Country}, action: 'getCountryById', params: ['idCountry']}
])
export class ClientAddress {

  public _geoRepo: AbstractGeoRepository;

  get dto(): any {
    return  {id: this.id, idClient: this.idClient, idCity: this.idCity, zip: this.zip, street: this.street,
      lat: this.lat, lng: this.lng, isPrimary: this.isPrimary,
      idCountry: this.idCountry, city: this.city,
      bldApp: this.bldApp, recName: this.recName,
      phone: this.phone};
  }

  public get addressString(): string {
    return ((this.street) ? this.street : '') + ' ' +
      ((this.bldApp) ? this.bldApp : '') + ', ' +
      ((this.city) ? this.city : '') +
      //((this.zip) ? this.zip : '') + ' ' +
      //(((<any>this).country) ? (<any>this).country.name : '') + ' ' +
      ((this.phone) ? ', Phone: ' + this.phone : '');
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
  ) {this._geoRepo = RefInjector.pull(AbstractGeoRepository);}


}
