import {Injectable} from '@angular/core';
import {AbstractAccountRepository} from '../../index';
import {ResponseOptions, Response, Headers} from '@angular/http';
import {User} from '../../../model/index';

@Injectable()
export class AccountRepository extends AbstractAccountRepository {

  constructor() {
    super();
  }

  public async logIn(email: string, password: string): Promise<string> {
    let options: ResponseOptions = new ResponseOptions();
    options.status = 200;

    if (this.checkLoginWithMockData(email, password)) {
      options.body = {
        token: 'tokenValid',
        user: this.mockUserAuth
          .filter((value) => value.email === email && value.password === password)
      };
      options.headers = new Headers({'Authorization': 'tokenValid'});
    }

    return Observable.of(new Response(options))
      .delay(1000)
      .map(response => {
        let body = response.json();
        let tokenInHeader = response.headers;
        let jwtResp: JwtTokenResponse = (body && body.token === 'tokenValid')
        && (tokenInHeader && tokenInHeader.get('Authorization') === 'tokenValid')
          ? new JwtTokenResponse(body.token, body.user[0], true)
          : new JwtTokenResponse(null, null, false);

        return jwtResp;
      });
  }


  public async register(user: User): Promise<User> {
    let respOpt: ResponseOptions = new ResponseOptions();
    respOpt.status = 200;
    respOpt.body = user;
    return Observable.of(new Response(respOpt))
      .map(response => {
        let retUser: User = response.json() as User;
        if (retUser) {
          retUser.guid = this.makeGuid();
          this.mockUserAuth.push(retUser);
        }

        return retUser;
      }).delay(1000);
  }

  public async edit(user: User): Promise<User> {
    let resOpt: ResponseOptions = new ResponseOptions();
    resOpt.headers = new Headers({'Authorization': 'tokenValid'});
    resOpt.body = user
    resOpt.status = 200;

    return Observable.of(new Response(resOpt))
      .map(resp => {
        let user: User = resp.json();
        let token: string = (resp.headers) ? resp.headers.get('Authorization') : '';

        if (resp.status === 200 && user && token === 'tokenValid') {
          let editUsers: User[] = this.mockUserAuth
            .filter((value) => value.guid === user.guid);

          if (editUsers.length !== 0) {
             let edUser = editUsers[0];
             edUser.userSetting['lang'] = user.userSetting['lang'];
             edUser.userSetting['currency'] = user.userSetting['currency'];
          }
        }
        return null;
      }).delay(1000);
  }

  public async getUserById(id: number): Promise<User> {
    return null;
  }

  public logOut(): void {

  }

  public isNotSignOutSelf(): boolean {
    return !!(localStorage.getItem('uid'));
  }
}
