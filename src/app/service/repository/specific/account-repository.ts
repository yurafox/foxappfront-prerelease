import {Injectable} from '@angular/core';
import {AbstractAccountRepository} from '../../index';
import {Headers, Http, RequestOptionsArgs} from '@angular/http';
import {User} from '../../../model/index';
import {LoginTemplate} from "../../../model/index";
import {HttpHeaders} from "@angular/common/http";

// <editor-fold desc="url const">
const tokenUrl = '/api/mtoken';
const userUrl = '/api/musers';
// </editor-fold

@Injectable()
export class AccountRepository extends AbstractAccountRepository {

  constructor(private http:Http) {
    super();
  }

  public async logIn(email: string, password: string): Promise<LoginTemplate> {
    try {
      const response = await this.http.post(tokenUrl,{ email, password }).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error(`${response.status} ${response.statusText }`);
      }

      if(!data) {
        throw new Error(`некорректные авторизационные данные`);
      }

      const currentUser: User = new User(data.user.name, data.user.email,null,data.user.id,
                                         data.user.appKey,data.user.userSetting,data.user.idClient,data.user.favoriteStoresId);

      return new LoginTemplate(data.token, currentUser);
    }

    catch (err) {
      return await this.errorHandler(err);
    }
  }

  public async register(user: User): Promise<User> {
    try {
      const response = await this.http.post(userUrl, user).toPromise();

      const data = response.json();

      if (response.status !== 201) {
        throw new Error(`${response.status} ${response.statusText }`);
      }

      if(!data) {
        throw new Error(`некорректные пользовательские данные`);
      }
      const currentUser: User = new User(data.name, data.email,null,data.id,
        data.appKey,data.userSetting,data.idClient);

      return currentUser;
    }

    catch (err) {
      return await this.errorHandler(err);
    }

  }

  public async edit(user: User, token: string): Promise<User> {
     try {
      const response = await this.http.put(userUrl, user, this.getAuthHeaderInRequest(token))
                                                          .toPromise();

      const data = response.json();
      if (response.status === 401) {
        throw new Error(`${response.status} ${response.statusText }`);
      }

      if(!data && response.status !== 200) {
        throw new Error(`ошибка правки данных`);
      }
      const currentUser: User = new User(data.name, data.email,null,data.id,
        data.appKey,data.userSetting,data.idClient);

      return currentUser;
    }

    catch (err) {
      return await this.errorHandler(err);
    }
  }

  public async getUserById(id: number , token: string): Promise<User> {
    try {
      const response = await this.http.get(`${userUrl}/${id}`,this.getAuthHeaderInRequest(token))
        .toPromise();

      const data = response.json();
      if (response.status === 401) {
        throw new Error(`${response.status} ${response.statusText }`);
      }

      if(!data && response.status !== 200)  {
        throw new Error(`некорректные пользовательские данные`);
      }

      const currentUser: User = new User(data.name, data.email,null,data.id,
        data.appKey,data.userSetting, data.idClient, data.favoriteStoresId);
      return currentUser;
    }

    catch (err) {
      return await this.errorHandler(err);
    }
  }

  public isNotSignOutSelf(): boolean {
    return !!(localStorage.getItem('id'));
  }

  // <editor-fold desc="error handler">
  private errorHandler(err: any): Promise<any> {
    return Promise.reject((err.message) ? err : new Error(`${err.status} ${err.statusText }`));
  }
  // </editor-fold>

  // <editor-fold desc="specific request>"
   private getAuthHeaderInRequest(token: string): RequestOptionsArgs {
    const h = new Headers();
    h.set('Authorization', `Bearer: ${token}`);
     return { headers: h};
   }
  // </editor-fold>
}
