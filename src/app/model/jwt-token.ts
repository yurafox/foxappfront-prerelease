import {User} from './user';

export class JwtTokenResponse {
  constructor(public token?: string,
              public user?: User,
              public isValid?: boolean) {
  }
}
