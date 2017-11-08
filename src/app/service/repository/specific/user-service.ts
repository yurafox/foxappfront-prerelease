import {Injectable} from '@angular/core';
import {User} from '../../../model/user';
import {AppConstants} from '../../../app-constants';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import {AbstractAccountRepository} from '../abstract/abstract-account-repository';

@Injectable()
export class UserService {
  private user: User;
  private _isAuth = false;

  // <editor-fold desc='.ctor'>
  constructor(private account: AbstractAccountRepository) {
    this.user = new User();
    this.isAuth = false;
    this.firstOrDefaults(['lang', 'currency']);
  }

  // </editor-fold>

  // <editor-fold desc='getters'>
  public get name(): string {
    return this.user.name;
  }

  public get guid(): string {
    return this.user.guid;
  }

  public get lang(): string {
    return this.user.userSetting['lang'];
  }

  public get currency(): string {
    return this.user.userSetting['currency'];
  }

  public get email(): string {
    return this.user.email;
  }

  public get isAuth(): boolean {
    return this._isAuth;
  }

  // </editor-fold>

  // <editor-fold desc='setters'>
  public set name(name: string) {
    this.user.name = name;
  }

  public set guid(guid: string) {
    this.user.guid = guid;
  }

  public set email(email: string) {
    this.user.email = email;
  }

  public set lang(lang: string) {
    this.user.userSetting['lang'] = lang;
    localStorage.setItem('lang', lang);
    this.trySendSettings();
  }

  public set currency(currency: string) {
    this.user.userSetting['currency'] = currency;
    localStorage.setItem('currency', currency);
    this.trySendSettings();
  }

  public set isAuth(isAuth: boolean) {
    this._isAuth = isAuth;
  }

  // </editor-fold>

  // <editor-fold desc='methods'>
  public clear(): void {
    this.isAuth = false;
    this.guid = '';
    this.name = '';
  }

  public logOut(): void {
    localStorage.removeItem('token');
    this.clear();
  }

  // </editor-fold>

  // <editor-fold desc='private behavior'>
  private trySendSettings(): void {
    if (this.isAuth) {
      this.account.edit(this.user)
        .subscribe(user => {
          },
          error => console.log(error));
    }
  }

  private firstOrDefaults(props: Array<string>): void {
    if (props.length === 0) {
      return;
    }

    for (let i = 0; i < props.length; i++) {
      let lStoreValue: string = localStorage.getItem(props[i]);
      if (!lStoreValue) {
        lStoreValue = AppConstants.LOCALE_DEFAULT_VALUE;
        localStorage.setItem(props[i], lStoreValue);
      }

      this.user.userSetting[props[i]] = lStoreValue;
    }

  }

  // </editor-fold>
}
