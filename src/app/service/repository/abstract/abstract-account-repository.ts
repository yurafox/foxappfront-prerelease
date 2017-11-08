import {Observable} from 'rxjs/Observable';
import {JwtTokenResponse} from '../../../model/jwt-token';
import {User} from '../../../model/user';

export abstract class AbstractAccountRepository {
  public get token(): string {
    return localStorage.getItem('token');
  }
  public set token(value: string) {
    localStorage.setItem('token', value);
  }
  public abstract isLoginIn(): Observable<boolean>;
  public abstract register(user: User): Observable<User>
  public abstract edit(user: User): Observable<User>
  public abstract logIn(email: string, password: string): Observable<JwtTokenResponse>


  protected constructor() {
  }

}
