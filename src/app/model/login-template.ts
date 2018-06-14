import {User} from './user';

export class LoginTemplate {
  constructor (
    public token: string,
    public user: User,
    public errMessage:string=null
  ) {}
}
