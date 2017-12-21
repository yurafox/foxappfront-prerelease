import {Client} from './client';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {IDictionary, LazyLoad, RefInjector} from '../core/app-core';
import {Store} from "./store";


@LazyLoad([
  { options:{constructor: Client}, action: 'getClientByUserId', params: ['id']}
])
export class User {
  private _repo: AbstractDataRepository;
  constructor(public name?: string,
              public email?: string,
              public password?: string,
              public id?: number,
              public appKey?: string, // private application key
              public userSetting: IDictionary<string> = {},
              public idClient?: number,
              public favoriteStoresId?: number[]) {
    this._repo = RefInjector.pull(AbstractDataRepository);
  }
}
