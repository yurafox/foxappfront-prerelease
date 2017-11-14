import {Injectable} from '@angular/core';
import {User} from '../../model/index';
import {AbstractAccountRepository} from "../index";
import {AppConstants} from "../../app-constants";

@Injectable()
export class UserService {
  private user: User;
  private _auth: boolean;
  private _token: string;

  public errorMessage: string; // field for user service error log

  // <editor-fold desc='.ctor'>
  constructor(private _account: AbstractAccountRepository) {
    this.callDefaultUser();
  }

  // </editor-fold>

  // <editor-fold desc='getters'>
  public get token(): string {
      return this._token;
  }

  public get name(): string {
    return this.user.name;
  }

  public get uid(): number {
    return this.user.uid;
  }

  public get lang(): number {
    return +this.user.userSetting['lang'];
  }

  public get currency(): number {
    return +this.user.userSetting['currency'];
  }

  public get email(): string {
    return this.user.email;
  }

  public get isAuth(): boolean {
    return this._auth;
  }

  public get appKey(): string {
    return this.user.appKey;
  }
  // </editor-fold>

  // <editor-fold desc='setters'>
  public set name(name: string) {
    this.user.name = name;
  }

  public set uid(uid: number) {
    this.user.uid = uid;
  }

  public set email(email: string) {
    this.user.email = email;
  }

  public set lang(lang: number) {
    this.user.userSetting['lang'] = lang.toString();
    localStorage.setItem('lang', lang.toString());
    this.trySendSettings();
  }

  public set currency(currency: number) {
    this.user.userSetting['currency'] = currency.toString();
    localStorage.setItem('currency', currency.toString());
    this.trySendSettings();
  }
  // </editor-fold>

  // <editor-fold desc='methods'>
  public clear(): void {
    localStorage.removeItem('uid'); // uid location in localeStorage for more fast connection
    this._account.logOut();
  }

  public logOut(): void {
    // clear storage data (localeStorage and other stores)
    this.clear();
    this.callDefaultUser();
  }

  public isNotSignOutSelf(): boolean {
    return this._account.isNotSignOutSelf();
  }

  public async shortLogin(): Promise<void> {
    const uid: string = localStorage.getItem('uid');
    if (!uid)
      return;

    await this._account.getUserById(+localStorage.getItem('uid'));
  }
  // </editor-fold>

  // <editor-fold desc='private behavior'>
  private trySendSettings(): void {
    if (this._auth) {
      this._account.edit(this.user)
        .then(user => {},error => this.errorMessage = error.message);
    }
  }

  private firstOrDefaults(props: Array<string>): void {
    if (props.length === 0) {
      return;
    }

    for (let i = 0; i < props.length; i++) {
      let lStoreValue: string = localStorage.getItem(props[i]);
      if (!lStoreValue) {
        lStoreValue = AppConstants.LOCALE_DEFAULT_VALUE.toString();
        localStorage.setItem(props[i], lStoreValue);
      }

      this.user.userSetting[props[i]] = lStoreValue;
    }

  }

  private callDefaultUser() {
    this.user = new User();
    this._auth = false;
    this.firstOrDefaults(['lang', 'currency']);
  }
  // </editor-fold>
}
