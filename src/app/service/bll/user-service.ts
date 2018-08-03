import {Injectable} from '@angular/core';
import {AlertController, ToastController} from 'ionic-angular';
import {AppConstants} from '../../app-constants';
import {IDictionary} from '../../core/app-core';
import {EventService} from '../event-service';
import {AbstractLocalizationRepository} from '../repository/abstract/abstract-localization-repository';
import {IUserInfo, IUserVerifyAccountData, User} from '../../model/user';
import {AbstractAccountRepository} from '../repository/abstract/abstract-account-repository';
import {ChangePassword} from '../../model/change-password';
import {LoginTemplate} from '../../model/login-template';
import {Product} from '../../model/product';
import {AbstractDataRepository} from '../repository/abstract/abstract-data-repository';

@Injectable()
export class UserService {
  user: User;
  _auth: boolean;
  _token: string;
  shortloginMutex:boolean = false;
  viewProducts = new Array<Product>();
  isLoadedViewProducts: boolean = false;

  public errorMessages:IDictionary<string> = {  // field for user service error log
    'login':'',
    'shortLogin':'',
    'register':'',
    'edit':''
  };

  // <editor-fold desc='.ctor'>
  constructor(public _account: AbstractAccountRepository,
              public evServ:EventService,
              public alertCtrl:AlertController,
              public toastCtrl:ToastController,
              public locRepo: AbstractLocalizationRepository,
              public repo: AbstractDataRepository) {
    this.callDefaultUser();
  }

  // </editor-fold>

  // <editor-fold desc='getters'>
  public get profile(): User {
    return this.user;
  }

  public get bonusInfo(): Promise<any> {
    return this._account.getBonusesInfo();
  }

  public get token(): string {
      return this._token || localStorage.getItem('token');
  }

  public get name(): string {
    return this.user ? this.user.fname : '';
  }

  // public get uid(): number {
  //   return this.user.id;
  // }

  public get lang(): number {
    //return 3;
    return this.user ? +this.user.userSetting['lang'] : AppConstants.LOCALE_DEFAULT_VALUE;
  }

  public get currency(): number {
    return this.user ? +this.user.userSetting['currency'] : AppConstants.CURRENCY_DEFAULT_VALUE;
  }

  public get email(): string {
    return this.user ? this.user.email : '';
  }

  public get isAuth(): boolean {
    return this._auth;
  }

  public get appKey(): string {
    return this.user ? this.user.appKey : '';
  }
  // </editor-fold>

  public get userMutex():boolean {
     return this.shortloginMutex;
  }
  // <editor-fold desc='setters'>
  public set name(name: string) {
    this.user.name = name;
  }

  // public set uid(id: number) {
  //   this.user.id = id;
  // }

  public set email(email: string) {
    this.user.email = email;
  }

  public set userMutex(mutex:boolean) {
    this.shortloginMutex = mutex;
  }


  public set lang(lang: number) {
    this.user.userSetting['lang'] = lang.toString();
    localStorage.setItem('lang', lang.toString());
    //this.trySendSettings();
  }

  public set currency(currency: number) {
    this.user.userSetting['currency'] = currency.toString();
    localStorage.setItem('currency', currency.toString());
    //this.trySendSettings();
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
    this.evServ.events['logOffEvent'].emit();
  }

  // method for control signOut behavior
  // public isNotSignOutSelf(): boolean {
  //   return this._account.isNotSignOutSelf();
  // }

  // get user fast by token and uid
  public async shortLogin():Promise<boolean> {
    try {
    // const id: string = localStorage.getItem('id');
    // if (!id)
     // return false;

    this.user = await this._account.getUserById(this.token);
      this.changeAuthStatus(['appKey']);
      this.errorClear('shortLogin');
      await this.locRepo.setLocalization();
      this.evServ.events['localeChangeEvent'].emit(this.lang);
      return true;

    } catch (err) {
      this.errorMessages['shortLogin'] = err.message;
      return false;
    }
  }

  public async register(user: User):Promise<IUserInfo> {
    try {
      let returnUser: IUserInfo = await this._account.register(user);
      this.errorClear('register');
      return returnUser;

    } catch (err) {
      this.errorMessages['register'] = err.message;
    }
  }

  public async edit(user: User):Promise<IUserInfo> {
    try {
      if (this._auth) {
        const res: IUserInfo = await this._account.edit(user);
        if (res.status === 2 && res.user) {
          this.user.name = res.user.name;
          this.user.email = res.user.email;
          this.user.userSetting = res.user.userSetting;
          this.user.phone = res.user.phone;
          this.user.fname = res.user.fname;
          this.user.lname = res.user.lname;

          await this.locRepo.setLocalization();
          this.changeAuthStatus(['appKey']);
          this.errorClear('edit');
        }

        return res;
     }
    } catch (err) {
      this.errorMessages['edit'] = err.message;
    }

  }

  public async changePassword(pswdModel:ChangePassword):Promise<IUserVerifyAccountData> {
      let returnUser: IUserVerifyAccountData = await this._account.changePassword(pswdModel);
      return returnUser;
  }

  public async login(phone: string, password: string) {
    try {
      const loginModel: LoginTemplate = await this._account.logIn(phone,password);
      if(loginModel.errMessage){
        throw new Error(loginModel.errMessage);
      }

      this.user = loginModel.user;
      this._token = loginModel.token;
      localStorage.setItem('token',loginModel.token);
      this.changeAuthStatus(['appKey']);
      //this.changeAuthStatus(['id','appKey']);
      this.errorClear('login');
      await this.locRepo.setLocalization();
    } catch (err) {
      this.errorMessages['login'] = err.message;
    }
  }

  public async verifyAccount(phone: string): Promise<IUserVerifyAccountData> {
     return await this._account.verifyAccount(phone);
  }

  public removeToken(){
    localStorage.removeItem('token');
  }
  // send fastswiching data
  // public trySendSettings(): void {
  //   if (this._auth) {
  //     this._account.edit(this.user, this.token)
  //       .then(user => {},error => this.errorMessages['edit'] = error.message);
  //   }
  // }

  firstOrDefaults(props: Array<string>, defVals: Array<string>): void {
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

  // create default user
  callDefaultUser() {
    this.user = new User();
    this._auth = false;
    const lang: string = AppConstants.LOCALE_DEFAULT_VALUE.toString();
    const currency: string = AppConstants.CURRENCY_DEFAULT_VALUE.toString();
    this.firstOrDefaults(['lang', 'currency'],[lang, currency]);
  }

  // add data to storage and check user status
  addImpotantDataToStorage(userFields: Array<string>) {
    localStorage.setItem('currency',this.user.userSetting['currency']);
    localStorage.setItem('lang', this.user.userSetting['lang']);

    for(let i = 0; i < userFields.length; i++){
      localStorage.setItem(userFields[i], this.user[userFields[i]]);
    }

  }

  // change status method facade
  changeAuthStatus(userFields: Array<string>): void {
    this.addImpotantDataToStorage(userFields);
    let cAuth = this._auth;
    this._auth = true;
    if (!cAuth)
      this.evServ.events['logonEvent'].emit();
  }

 // remove data from storage and check user status
  removeDataFromStorage(fields: Array<string>){
    for(let i = 0; i < fields.length; i++) {
      localStorage.removeItem(fields[i]);
    }
  }
  // </editor-fold>

// error clear
  errorClear(actionName: string){
    this.errorMessages[actionName]='';
  }
  // </editor-fold>

  public callMe(phone: string) {
    return this._account.callMe(phone);
  }

  async loadViewProducts() {
    if(!this.isLoadedViewProducts) {
      this.viewProducts = await this.repo.getViewProducts();
      this.isLoadedViewProducts = true;
    }
  }

  addViewProduct(product: Product) {
    let index = this.viewProducts.findIndex((x) => {return x.id === product.id});
    if(index != -1) 
      this.viewProducts.splice(index, 1);

    this.viewProducts.unshift(product);
  }

}
