import {Client} from './client';
import {IDictionary, LazyLoad, RefInjector} from '../core/app-core';
import {AbstractClientRepository} from "../service/repository/abstract/abstract-client-repository";


@LazyLoad([
  { options:{constructor: Client}, action: 'getClientByPhone', params: ['phone']}
])
export class User {
  public _clientRepo: AbstractClientRepository;
  constructor(public name?: string,
              public email?: string,
              public password?: string,
              public appKey?: string, // public application key
              public userSetting: IDictionary<string> = {},
              public favoriteStoresId?: number[],
              public phone?: string,
              public fname?: string,
              public lname?: string) {
    this._clientRepo = RefInjector.pull(AbstractClientRepository);
  }
}

export interface IUserVerifyAccountData {
   message:string,
   status: number
}

export interface IUserInfo extends IUserVerifyAccountData{
   user:User
}
