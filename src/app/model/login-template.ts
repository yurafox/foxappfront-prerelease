import {User} from "./index";

export class LoginTemplate {
  constructor (
    public token: string,
    public user: User
  ) {}
}
