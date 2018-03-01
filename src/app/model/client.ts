import {LazyLoad, RefInjector} from '../core/app-core';
import {ClientAddress} from './client-address';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';

@LazyLoad([
  {options:{constructor: ClientAddress}, action: 'getClientAddressesByClientId', params: ['id']}
])

export class Client {
  private _repo: AbstractDataRepository;
  constructor (
    public id?: number,
    public userId?: number,
    public name?: string,
    public phone?: string,
    public login?: string,
    public email?: string,
    public fname?: string,
    public lname?: string,
    public barcode?: string
    /*,
    public bonusBalance?: number,
    public actionBonusBalance?: number
    */
  ){this._repo = RefInjector.pull(AbstractDataRepository);}
}
