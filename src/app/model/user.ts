import {IDictionary} from '../core/app-core';

export class User {
  constructor(public name?: string,
              public email?: string,
              public password?: string,
              public id?: number,
              public appKey?: string, // private application key
              public userSetting: IDictionary<string> = {}) {
  }
}
