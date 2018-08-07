import {Component} from '@angular/core';
import {NavController, IonicPage, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AlertController } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {Activator} from "../../app/core/app-core";
import {CartService} from "../../app/service/cart-service";
import {Currency} from '../../app/model/currency';
import {IUserInfo, User} from '../../app/model/user';
import {Lang} from '../../app/model/lang';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@IonicPage({name: 'AccountPage', segment: 'account'})
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage extends ComponentBase {
  public currencies:Array<Currency>;
  public langs: Array<Lang>;
  public currentCurrency:Currency;
  public currentLang:Lang;
  public editForm: FormGroup;
  public previousData: {email: string, currency: number, lang: number, fname: string, lname: string};
  public currentData: {email: string, currency: number, lang: number, fname: string, lname: string};
  public onLoad = false;
  public isSendAsync = false;
  public verifyErrorData:{errorShow:boolean,errorMessage:string};
  public isChanged = false;

  public formErrors = {
    'email': '',
    // 'password': '',
    //'name':'',
    'fname':'',
    'lname':'',
    //'appKey':''
  };

  public errorMessages = {};

  constructor(public nav: NavController,
              public alertCtrl: AlertController,
              public repo: AbstractDataRepository,
              public formBuilder: FormBuilder,
              public cartServ: CartService,
              public loadingCtrl: LoadingController) {
    super();
    this.initLocalization();
    this.verifyErrorData={errorShow:false,errorMessage:''};
  }

  async ngOnInit(){
    super.ngOnInit();
    this.buildForm();

    let content = this.locale['LoadingContent'] ? this.locale['LoadingContent'] : 'Пожалуйста, подождите...';
    let loading = this.loadingCtrl.create({
      content: content
    });

    try {
      loading.present();
      [this.currencies, this.langs] = await Promise.all([this.repo.getCurrencies(true),
      this.repo.getLocale(true)]);

      this.setDefaultSetting<Currency>(this.currencies,
        {
          targetReference: { name: 'currentCurrency', ref: Currency },
          item: { valueName: 'id', displayValue: 'shortName' },
          serviceItemName: 'currency'
        });

      this.setDefaultSetting<Lang>(this.langs,
        {
          targetReference: { name: 'currentLang', ref: Lang },
          item: { valueName: 'id', displayValue: 'name' },
          serviceItemName: 'lang'
        });
    } catch (err) {
      console.error(err);
    } finally {
      loading.dismiss();
    }

    this.previousData = {email: this.editForm.value.email, currency: this.currentCurrency.id, lang: this.currentLang.id, fname: this.editForm.value.fname, lname: this.editForm.value.lname};
    this.currentData = {email: this.editForm.value.email, currency: this.currentCurrency.id, lang: this.currentLang.id, fname: this.editForm.value.fname, lname: this.editForm.value.lname};

    this.onLoad=true;

    this.errorMessages = {
      'email': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'pattern': this.locale['WrongEMailFormat'] ? this.locale['WrongEMailFormat'] : 'Не правильный формат email адреса'
      },
      // 'password': {
      //   'minlength': this.locale['LengthNLT6'] ? this.locale['LengthNLT6'] : 'Значение должно быть не менее 6-и символов',
      //     'maxlength': this.locale['LengthNGT20'] ? this.locale['LengthNGT20'] : 'Значение должно быть не более 20-и символов'
      // },
      // 'name':{
      //   'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
      //     'maxlength': this.locale['LengthNGT20'] ? this.locale['LengthNGT20'] : 'Значение должно быть не более 20-и символов'
      // },
      'fname': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'maxlength': this.locale['LengthNGT20'] ? this.locale['LengthNGT20'] : 'Значение должно быть не более 20-и символов'
      },
      'lname': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'maxlength': this.locale['LengthNGT20'] ? this.locale['LengthNGT20'] : 'Значение должно быть не более 20-и символов'
      },
      // 'appKey':{
      //   'minlength': this.locale['LengthNLT6'] ? this.locale['LengthNLT6'] : 'Значение должно быть не менее 6-и символов',
      //     'maxlength': this.locale['LengthNGT20'] ? this.locale['LengthNGT20'] : 'Значение должно быть не более 20-и символов'
      // },
    };
  }

  currencyUpdate(item:any):void {
    this.currentCurrency.id = item.id;
    this.currentData.currency = item.id;
    this.checkIfDataChanged();
  }

  langUpdate(item:any):void {
    this.currentLang.id = item.id;
    this.currentData.lang = item.id;
    this.checkIfDataChanged();
  }

  edit(){
    this.clearVerifyError();
    if (!this.editForm.valid && this.isChanged === false) {
      return;
    }

    // start block logic for multiple sending
    this.isSendAsync = true;

    const data = this.editForm.value;
    const user: User = new User(null, data.email,
      null, null, {
        'currency': `${this.currentCurrency.id}`,
        'lang': `${this.currentLang.id}`
      }, null, this.userService.profile.phone,
      data.fname, data.lname);

    (async () => {
      const result: IUserInfo = await this.userService.edit(user);
      if (result.status === 2) {
        await this.evServ.events['localeChangeEvent'].emit(this.userService.lang);
        await this.cartServ.localeCartService();

        let alert = this.alertCtrl.create({
          subTitle: this.locale['ProfileChangedSuccessfully'] ? this.locale['ProfileChangedSuccessfully'] : 'Профиль успешно изменён',
          buttons: ['OK'],
          cssClass: 'alertCustomCss'
        });

        alert.present();

        this.previousData = {email: this.editForm.value.email, currency: this.currentCurrency.id, lang: this.currentLang.id, fname: this.editForm.value.fname, lname: this.editForm.value.lname};
      } else {
        this.verifyErrorData.errorShow = true;
        this.verifyErrorData.errorMessage = (result) ? result.message : (this.locale['RemoteSourceError'] ? this.locale['RemoteSourceError'] : 'Ошибка удаленного источника');
      }
      this.isSendAsync = false;
      this.isChanged = false;
    })();
  }

  logout() {
    this.userService.logOut();
    this.nav.setRoot('HomePage');

  }

  // <editor-fold desc="form builder">
  public buildForm(): void {
    this.editForm = this.formBuilder.group({
      'email': [this.userService.email, [Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],

      // 'password': ['', [Validators.minLength(6), Validators.maxLength(20)]],
      //'name':[this.userService.name,[Validators.required, Validators.maxLength(20)]],
      'fname':[this.userService.profile.fname,[Validators.required,Validators.maxLength(20)]],
      'lname':[this.userService.profile.lname,[Validators.maxLength(20)]],
      'lang':[this.userService.lang, [Validators.required]],
      //'appKey':[this.userService.appKey,[Validators.minLength(6), Validators.maxLength(20)]]
    });

    this.editForm.valueChanges
      .subscribe(data => {
        this.currentData.email = data.email;
        this.currentData.fname = data.fname;
        this.currentData.lname = data.lname;
        this.onValueChanged(data);
        this.checkIfDataChanged();
      });
    this.onValueChanged();
  }
// </editor-fold>

  // <editor-fold desc="form value changing hook">
  public onValueChanged(data?: any) {
    if(this.verifyErrorData.errorShow)
      this.clearVerifyError();

    if (!this.editForm) {
      return;
    }

    let form = this.editForm;

    for (let err in this.formErrors) {
      this.formErrors[err] = '';

      let control = form.get(err);
      if (control && control.dirty && !control.valid) {
        let messages = this.errorMessages[err];
        for (let key in control.errors) {
          this.formErrors[err] += messages[key] + ' ';
        }
      }
    }
  }
  // </editor-fold>

  //<editor-fold desc="inner helpers">
  public setDefaultSetting<T>(store:Array<T>, map:{targetReference:{name:string, ref:any},
                                                    item: {valueName:string,displayValue:string},
                                                    serviceItemName}):void {

    if(store && store.length!=0){
      const data = store.find((value) => {
        return value[map.item.valueName]===this.userService[map.serviceItemName];
      });

      if(data){
        const instanceObj= Activator(map.targetReference.ref);
        instanceObj[map.item.valueName] = data[map.item.valueName];
        instanceObj[map.item.displayValue] = data[map.item.displayValue];

        this[map.targetReference.name] = instanceObj;
      }
    }
  }
  //</editor-fold>

  public clearVerifyError():void {
    this.verifyErrorData.errorShow = false;
    this.verifyErrorData.errorMessage = '';
  }

  public checkIfDataChanged() {
    if (this.currentData.email !== this.previousData.email) {
      this.isChanged = true;
    } else if (this.currentData.fname !== this.previousData.fname) {
      this.isChanged = true;
    } else if (this.currentData.lname !== this.previousData.lname) {
      this.isChanged = true;
    } else if (this.previousData.currency !== this.currentData.currency) {
      this.isChanged = true;
    } else if (this.previousData.lang !== this.currentData.lang) {
      this.isChanged = true;
    } else {
      this.isChanged = false;
    }
  }

  public checkDisabled():boolean {
    return !this.isChanged || this.isSendAsync || !this.editForm.valid;
  }
}
