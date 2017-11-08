import {Injectable} from '@angular/core';
import {AbstractAccountRepository} from '../abstract/abstract-account-repository';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import {ResponseOptions, Response, Headers} from '@angular/http';
import {JwtTokenResponse} from '../../../model/jwt-token';
import {User} from '../../../model/user';

@Injectable()
export class MockAccountRepository extends AbstractAccountRepository {
  private mockUserAuth: Array<User> = [];

  constructor() {
    super();
    this.mockUserAuth.push(
      new User('fox', 'fox@fox.com', 'foxfox', {'lang': '1', 'currency': '1'}, 'fox-123-fox-123'));
  }

  public isLoginIn(): Observable<boolean> {
    let result = false;

    let tokenObjStr = localStorage.getItem('token');
    if (!tokenObjStr) {
      return Observable.of(false);
    }
    ;

    try {
      return this.getMockTokenValid(tokenObjStr)
        .map(resp => {
          let resData = resp.json();
          let result = (resp.status === 200 && (resData && resData.valid));
          return result;
        });
    } catch (err) {
      return Observable.of(false);
    }
  }

  public logIn(email: string, password: string): Observable<JwtTokenResponse> {
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


  public register(user: User): Observable<User> {
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

  public edit(user: User): Observable<User> {
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

  // <editor-fold desc='private behavior'>
  private getMockTokenValid(token: string): Observable<Response> {
    let responseOpt: ResponseOptions = new ResponseOptions();
    switch (token) {
      case 'tokenValid': {
        responseOpt.status = 200;
        responseOpt.body = {token: 'tokenValid', valid: true};
        break;
      }

      case 'tokenInValid': {
        responseOpt.status = 200;
        responseOpt.body = {token: 'tokenInValid', valid: false};
        break;
      }

      default: {
        responseOpt.status = 500;
      }
    }

    return Observable.of(new Response(responseOpt)).delay(1000);
  }

  private checkLoginWithMockData(email: string, password: string): boolean {
    for (let i = 0; i < this.mockUserAuth.length; i++) {
      if (this.mockUserAuth[i].email === email && this.mockUserAuth[i].password === password)
        return true;
    }
    return false;
  }

  private makeGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // </editor-fold>
}
