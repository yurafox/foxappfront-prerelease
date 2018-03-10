import {Injectable} from '@angular/core';
import {AbstractAccountRepository} from '../../index';
import {Headers, Http, RequestOptionsArgs} from '@angular/http';
import {User,IUserVerifyAccountData,IUserInfo} from '../../../model/index';
import {LoginTemplate} from "../../../model/index";
import {HttpHeaders} from "@angular/common/http";
import {AppConstants} from "../../../app-constants"
import { RequestFactory } from '../../../core/app-core';
// server url
const loginUrl = `${AppConstants.BASE_URL}/api/account/login`;
const accountUrl = `${AppConstants.BASE_URL}/api/account`;
const verifyAccountUrl = `${AppConstants.BASE_URL}/api/account/verify`;
// mock url
//const loginUrl = '/api/mtoken';
//const accountUrl = '/api/musers';

@Injectable()
export class AccountRepository extends AbstractAccountRepository {

  constructor(private http:Http) {
    super();
  }

  public async logIn(phone: string, password: string): Promise<LoginTemplate> {
    try {
      const response = await this.http.post(loginUrl,{ phone, password }).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error(`${response.status} ${response.statusText }`);
      }

      if(!data) {
        throw new Error(`некорректные авторизационные данные`);
      }

      const currentUser: User = new User(data.user.name, data.user.email,null,
                                         data.user.appKey,data.user.userSetting,null,data.user.phone,data.user.fname,data.user.lname); 
      return new LoginTemplate(data.token, currentUser);
    }

    catch (err) {
      return await this.errorHandler(err);
    }
  }

  public async register(user: User): Promise<IUserInfo> {
    try {

      const response = await this.http.post(accountUrl,{
        // name:user.name,
        phone:user.phone,
        email:user.email,
        fname:user.fname,
        lname:user.lname,
        userSetting:user.userSetting
      }).toPromise();

      const data = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error(`${response.status} ${response.statusText }`);
      }

      if(!data) {
        throw new Error(`некорректные пользовательские данные`);
      }

      // const currentUser: User = new User(data.name, data.email,null,null,
      //   data.userSetting,null,data.phone,data.fname,data.lname);
      
      let userInfo:IUserInfo = {message:data.message,status:data.status,user:(response.status === 201)
                                 ? data.content : null};
      return userInfo;
    }

    catch (err) {
      return await this.errorHandler(err);
    }

  }

  public async edit(user: User): Promise<IUserInfo> {
     try {
      const response = await this.http.put(accountUrl,{
        phone:user.phone,
        email:user.email,
        fname:user.fname,
        lname:user.lname,
        userSetting:user.userSetting
      }, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status === 401) {
        throw new Error(`${response.status} ${response.statusText }`);
      }

      if(!data && response.status !== 200) {
        throw new Error(`ошибка правки данных`);
      }
      
      return {message:data.message,status:data.status,user:(data.status === 2)
        ? data.content : null}
    }

    catch (err) {
      return await this.errorHandler(err);
    }
  }

  public async getUserById(token: string): Promise<User> {
    try {
      const response = await this.http.get(`${accountUrl}`,
                                       RequestFactory.makeAuthHeader())
                                  .toPromise();

      const data = response.json();
      if (response.status === 401) {
        throw new Error(`${response.status} ${response.statusText }`);
      }

      if(!data && response.status !== 200)  {
        throw new Error(`некорректные пользовательские данные`);
      }

      const currentUser: User = new User(data.name, data.email,null,
        data.appKey,data.userSetting,null,data.phone,data.fname,data.lname);
      return currentUser;
    }

    catch (err) {
      return await this.errorHandler(err);
    }
  }

  public async verifyAccount(phone: string): Promise<IUserVerifyAccountData> {
    try {
      const response = await this.http.post(verifyAccountUrl, {phone}).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error(`${response.status} ${response.statusText }`);
      }

      if(!data) {
        throw new Error('ошибка проверки аккаунта');
      }

      const verifyResult: IUserVerifyAccountData = {message:data.message, status:data.status };

      return verifyResult;
    }

    catch (err) {
      return await this.errorHandler(err);
    }
  }

  // public isNotSignOutSelf(): boolean {
  //   return !!(localStorage.getItem('id'));
  // }

  // <editor-fold desc="error handler">
  private errorHandler(err: any): Promise<any> {
    return Promise.reject((err.message) ? err : new Error(`${err.status} ${err.statusText }`));
  }
  // </editor-fold>

  //  private getAuthHeaderInRequest(token: string): RequestOptionsArgs {
  //   const h = new Headers();
  //   h.set('Authorization', `Bearer: ${token}`);
  //    return { headers: h};
  //  }
}
