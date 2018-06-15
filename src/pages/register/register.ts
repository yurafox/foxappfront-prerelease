import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AbstractDataRepository } from "../../app/service/repository/abstract/abstract-data-repository";
import { UserService } from '../../app/service/bll/user-service';
import { ComponentBase } from '../../components/component-extension/component-base';
import {Currency} from '../../app/model/currency';
import {Lang} from '../../app/model/lang';
import {IUserInfo, User} from '../../app/model/user';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage extends ComponentBase {
  public currencies: Array<Currency>;
  public langs: Array<Lang>;
  public registerForm: FormGroup;
  public verifyErrorData: { errorShow: boolean, errorMessage: string };
  onLoad = false;
  isSendAsync = false;
  public currentCurrency:Currency = new Currency(4,'UAH');
  public currentLang:Lang = new Lang(1,'RUS');
  _phone: string;

  public formErrors = {
    'phone': '',
    'email': '',
    'password': '',
    'fname': '',
    'lname': ''
  };

  public errorMessages = {};



  constructor(public nav: NavController,
              public navParams: NavParams,
              public repo: AbstractDataRepository,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public account: UserService) {
    super();
    this.initLocalization();
    const navData = this.navParams.data;
    this._phone = (navData && navData.phone) ? navData.phone : '';
    this.verifyErrorData = { errorShow: false, errorMessage: '' };
  }

  async ngOnInit() {
    super.ngOnInit();
    this.errorMessages = {
      'phone': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'pattern': this.locale['WrongPhoneFormat'] ? this.locale['WrongPhoneFormat'] : 'Не правильный формат номера'
      },
      'email': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'pattern': this.locale['WrongEMailFormat'] ? this.locale['WrongEMailFormat'] : 'Не правильный формат email адреса'
      },
      'fname': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'maxlength': this.locale['LengthNGT20'] ? this.locale['LengthNGT20'] : 'Значение должно быть не более 20-и символов'
      },
      'lname': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'maxlength': this.locale['LengthNGT20'] ? this.locale['LengthNGT20'] : 'Значение должно быть не более 20-и символов'
      }
    };

    this.buildForm();
    [this.currencies, this.langs] = await Promise.all([this.repo.getCurrencies(true), this.repo.getLocale(true)]);
    this.onLoad = true;
  }

  // go to login page
  login(phone: string) {
    const tData = {phone:phone,fromRegistry:true};
    if(this.navParams.data && this.navParams.data.continuePage)
         tData['continuePage'] = this.navParams.data.continuePage;

    this.nav.push('LoginPage', tData).then(()=>{
      const startIndex = this.nav.getActive().index - 2;
      this.nav.remove(startIndex, 2);
    });
  }

  register() {
    this.clearVerifyError();
    if (!this.registerForm.valid) {
      return;
    }

    // start block logic for multiple sending
    this.isSendAsync = true;
    const data = this.registerForm.value;
    const user: User = new User(null, data.email, null,
      null, { 'currency': `${this.currentCurrency.id}`, 'lang': `${this.currentLang.id}` },
      null, data.phone, data.fname, data.lname);

    (async () => {
      const result: IUserInfo = await this.userService.register(user);
      if (result.status === 2 && result.user)
        this.showSmsPopUp(result.message, result.user.phone);
      else {
        this.verifyErrorData.errorShow = true;
        this.verifyErrorData.errorMessage = (result) ? result.message : (this.locale['RemoteSourceError'] ? this.locale['RemoteSourceError'] : 'Ошибка удаленного источника');
      }

      this.isSendAsync = false;
    })();
  }

  // <editor-fold desc="form builder">
  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      'phone': [this._phone, [Validators.required,
      Validators.pattern('^380\\d{9}$')]],

      'email': ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      'fname': ['', [Validators.required, Validators.maxLength(20)]],
      'lname': ['', [Validators.required,Validators.maxLength(20)]],
    });

    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  // </editor-fold>

  // <editor-fold desc="form value changing hook">
  onValueChanged(data?: any) {
    if (this.verifyErrorData.errorShow)
      this.clearVerifyError();

    if (!this.registerForm) {
      return;
    }
    let form = this.registerForm;

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


  clearVerifyError(): void {
    this.verifyErrorData.errorShow = false;
    this.verifyErrorData.errorMessage = '';
  }

  showSmsPopUp(message: string, phone: string) {
    let alert = this.alertCtrl.create({
      message: message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // go to login page
            this.login(phone);
          }
        }
      ]
    });

    alert.present();
  }
}
