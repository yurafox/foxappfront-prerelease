import {IDictionary} from '../core/app-core';

export class User {
  constructor(public name?: string,
              public email?: string,
              public password?: string,
              public userSetting: IDictionary<string> = {},
              public guid: string = '') {
  }
}
