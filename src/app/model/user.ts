import {Client} from './client';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {IDictionary, LazyLoad, RefInjector} from '../core/app-core';
import {Store} from "./store";


@LazyLoad([
  { options:{constructor: Client}, action: 'getClientByPhone', params: ['phone']}
])
export class User {
  public _repo: AbstractDataRepository;
  constructor(public name?: string,
              public email?: string,
              public password?: string,
              public appKey?: string, // public application key
              public userSetting: IDictionary<string> = {},
              public favoriteStoresId?: number[],
              public phone?: string,
              public fname?: string,
              public lname?: string) {
    this._repo = RefInjector.pull(AbstractDataRepository);
  }
}

export interface IUserVerifyAccountData {
   message:string,
   status: number
}

export interface IUserInfo extends IUserVerifyAccountData{
   user:User
}
