import {Injectable} from '@angular/core';
import {User} from '../../model/index';
import {AbstractAccountRepository} from "../index";
import {AppConstants} from "../../app-constants";
import {LoginTemplate} from "../../model/index";

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
      return this._token || localStorage.getItem('token');
  }

  public get name(): string {
    return this.user.name;
  }

  public get uid(): number {
    return this.user.id;
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

  public set uid(id: number) {
    this.user.id = id;
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
    this.removeDataFromStorage(['id','token','appKey']);
  }

  public logOut(): void {
    // clear storage data (localeStorage and other stores)
    this.clear();
    this.callDefaultUser();
  }

  // method for control signOut behavior
  public isNotSignOutSelf(): boolean {
    return this._account.isNotSignOutSelf();
  }

  // get user fast by token and uid
  public async shortLogin():Promise<boolean> {
    try {
    const id: string = localStorage.getItem('id');
    if (!id)
      return false;

    this.user = await this._account.getUserById(+id, this.token);
      this.changeAuthStatus(['appKey']);
      return true;

    } catch (err) {
      this.errorMessage = err.message;
      return false;
    }
  }

  public async register(user: User):Promise<boolean> {
    try {
      let returnUser: User = await this._account.register(user);
      return (returnUser) ? true: false;

    } catch (err) {
      this.errorMessage = err.message;
      return false;
    }
  }

  public async edit(user: User):Promise<boolean> {
    try {
      if (this._auth) {
        const resUser: User = await this._account.edit(user, this.token);
        if (!resUser) return false;
        this.user = resUser;
        this.changeAuthStatus(['appKey']);
        return true;
     }
    } catch (err) {
      this.errorMessage = err.message;
      return false;
    }

  }
  public async login(email: string, password: string) {
    try {
      const loginModel: LoginTemplate = await this._account.logIn(email,password);
      this.user = loginModel.user;
      this._token = loginModel.token;
      localStorage.setItem('token',loginModel.token);
      this.changeAuthStatus(['id','appKey']);

    } catch (err) {
      this.errorMessage = err.message;
    }
  }
  // </editor-fold>

  // <editor-fold desc='private behavior'>

  // send fastswiching data
  private trySendSettings(): void {
    if (this._auth) {
      this._account.edit(this.user, this.token)
        .then(user => {},error => this.errorMessage = error.message);
    }
  }

  private firstOrDefaults(props: Array<string>, defVals: Array<string>): void {
    if (props.length === 0) {
      return;
    }

    for (let i = 0; i < props.length; i++) {
      let lStoreValue: string = localStorage.getItem(props[i]);
      if (!lStoreValue) {
        lStoreValue = defVals[i];
        localStorage.setItem(props[i], lStoreValue);
      }

      this.user.userSetting[props[i]] = lStoreValue;
    }

  }

  // crete default user
  private callDefaultUser() {
    this.user = new User();
    this._auth = false;
    const lang: string = AppConstants.LOCALE_DEFAULT_VALUE.toString();
    const currency: string = AppConstants.CURRENCY_DEFAULT_VALUE.toString();
    this.firstOrDefaults(['lang', 'currency'],[lang, currency]);
  }

  // add data to storage and check user status
  private addImpotantDataToStorage(userFields: Array<string>) {
    localStorage.setItem('currency',this.user.userSetting['currency']);
    localStorage.setItem('lang', this.user.userSetting['lang']);

    for(let i = 0; i < userFields.length; i++){
      localStorage.setItem(userFields[i], this.user[userFields[i]]);
    }

  }

  // change status method facade
  private changeAuthStatus(userFields: Array<string>): void {
    this.addImpotantDataToStorage(userFields);
    this._auth = true;
  }

 // remove data from storage and check user status
  private removeDataFromStorage(fields: Array<string>){
    for(let i = 0; i < fields.length; i++) {
      localStorage.removeItem(fields[i]);
    }
  }
  // </editor-fold>
}
