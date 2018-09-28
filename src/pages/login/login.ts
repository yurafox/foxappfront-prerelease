import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {NavController,NavParams, IonicPage, AlertController} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {CartService} from '../../app/service/cart-service';
import {AbstractCurrencyRepository} from "../../app/service/repository/abstract/abstract-currency-repository";
import {UserService} from '../../app/service/bll/user-service';
import {Currency} from '../../app/model/currency';
import {Lang} from '../../app/model/lang';
import {IUserVerifyAccountData} from '../../app/model/user';
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";

@IonicPage({name: 'LoginPage', segment: 'login'})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends ComponentBase implements OnInit {

  public currencies:Array<Currency>;
  public langs:Array<Lang>;
  public verifyForm: FormGroup;
  public verifyErrorData:{errorShow:boolean,errorMessage:string};
  onLoad = false;
  isSendAsync = false;
  useCode = false;
  _authError = false;
  _phone = '';

  public get authError() {
    return this._authError;
  }


  public formErrors = {
    'phone': '',
    'code': '',
  };

  public errorMessages = {};



  constructor(public nav: NavController,
              public navParams: NavParams,
              public currencyRepo: AbstractCurrencyRepository,
              public dataRepo: AbstractDataRepository,
              public formBuilder: FormBuilder,
              public alertCtrl:AlertController,
              public cart: CartService,
              public account:UserService) {
    super();
    this.initLocalization();
    const navData = this.navParams.data;
    this._phone = (navData && navData.phone) ? navData.phone : '';
    this.verifyErrorData={errorShow:false,errorMessage:''};
  }

  async ngOnInit(){
    super.ngOnInit();
    this.errorMessages = {
      'phone': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'pattern': this.locale['WrongPhoneFormat'] ? this.locale['WrongPhoneFormat'] : 'Не правильный формат номера'
      },
      'code': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'pattern': this.locale['WrongSmsFormat'] ? this.locale['WrongSmsFormat'] : 'Не правильный формат кода из смс'
      },
    };
    this.buildForm();
    [this.currencies,this.langs] = await Promise.all([
      this.currencyRepo.getCurrencies(true),
      this.dataRepo.getLocale(true)
    ]);
    this.checkUserBehavior();
    this.onLoad=true;
  }

  public async verifyUser() {
    // clear error message
    this.clearVerifyError();
    if (!this.verifyForm.valid) {
      return;
    }

    await this.verificationAccount();
  }

  public async logIn() {
    if (!this.verifyForm.valid) {
      return;
    }

    // start block logic for multiple sending
    this.isSendAsync = true;
    const data = this.verifyForm.value;

    await this.userService.login(data.phone,data.code);
    this.isSendAsync = false;

    if(this.userService.isAuth) {
      this.changeUseCode(false);
      this.evServ.events['localeChangeEvent'].emit(this.userService.lang);
      if (this.navParams.data.continuePage) {
        if (this.navParams.data.continuePage === 'SelectShipAddressPage') {
          this.cart.cartValidationNeeded = true;
          this.toContinuePage({fromCart: 1});
        }
        else if (this.navParams.data.continuePage !== 'SelectShipAddressPage') {
          this.toContinuePage(this.navParams.data.params);
        }
      }
      else
        this.nav.setRoot('HomePage').catch(console.error);
    }
    else {this.changeUseCode(true); this._authError = true}
  }

  buildForm(): void {
    this.verifyForm = this.formBuilder.group({
      'phone': [this._phone, [Validators.required,
        Validators.pattern('^380\\d{9}$')]],
      'code':['']
    });

    this.verifyForm.valueChanges
      .subscribe(() => this.onVerifyChanged());

    this.onVerifyChanged();
  }

  onVerifyChanged() {
    if(this.verifyErrorData.errorShow)
      this.clearVerifyError();

    if (!this.verifyForm) {
      return;
    }

    for (let err in this.formErrors) {
      this.formErrors[err] = '';

      let control = this.verifyForm.get(err);
      if (control && control.dirty && !control.valid) {
        let messages = this.errorMessages[err];
        for (let key in control.errors) {
          this.formErrors[err] += messages[key] + ' ';
        }
      }
    }

  }

  findBehaviorByStatus(result:IUserVerifyAccountData, phone:string ):void {
    if(result.status === 1) {
      this.changeUseCode(false);
      const contPage:string = (this.navParams.data
                               && this.navParams.data.continuePage
                              ) ? this.navParams.data.continuePage : null;

      this.nav.push('RegisterPage',{phone: phone,continuePage:contPage}).catch(console.error);
    }

    else {
      this.showSmsPopUp(result.message,phone);
    }

  }

  clearVerifyError():void {
    this.verifyErrorData.errorShow = false;
    this.verifyErrorData.errorMessage = '';
  }

  showSmsPopUp(message:string, phone:string){
    let alert = this.alertCtrl.create({
      message: message,
      enableBackdropDismiss:false,
      buttons:[
        {
          text: 'OK',
          handler: () => {
            this.changeUseCode(true);
          }
        }
      ]
    });
    alert.present().catch(console.error);
  }

  changeUseCode(codePredicate:boolean):void {
    (codePredicate) ? this.addCodeValidators() : this.removeCodeValidators();
    this.useCode = codePredicate;
  }

  addCodeValidators():void {
      this.verifyForm.controls['code'].setValidators([Validators.required,Validators.pattern('^\\d{3,6}$')]);
      this.makeCodeUpdate();
  }

  removeCodeValidators():void {
    this.verifyForm.controls['code'].clearValidators();
    this.makeCodeUpdate();
  }

  makeCodeUpdate(){
    this.verifyForm.controls['code'].updateValueAndValidity();
  }

  toContinuePage(params:any) {
    this.nav.remove(0).then(() => this.nav.insert(0, 'HomePage'));
    this.nav.push(this.navParams.data.continuePage,params).then(() => {
      this.nav.remove(this.nav.getActive().index).catch(console.error);
    });
  }

  checkUserBehavior():void {
    if(this.navParams.data && this.navParams.data.fromRegistry){
      this.changeUseCode(true);
    }
  }

  async repeatCode() {
    this.clearAfterRepeatCode();
    this.changeUseCode(false);
  }

  get phone() { return this.verifyForm.get('phone'); }
  
  async verificationAccount() {
       // start block logic for multiple sending
     this.isSendAsync = true;

     const phone = this.verifyForm.value.phone;
     (async ()=>{
       const result:IUserVerifyAccountData = await this.account.verifyAccount(phone);
       if(result===null || result.status===0){
         this.changeUseCode(false);
         this.verifyErrorData.errorShow = true;
         this.verifyErrorData.errorMessage = (result) ? result.message : (this.locale['RemoteSourceError'] ? this.locale['RemoteSourceError'] : 'Ошибка удаленного источника');
       }
 
       else {
         this.findBehaviorByStatus(result, phone);
       }
 
       // end block logic for multiple sending
       this.isSendAsync = false;
     })();
  }

  clearAfterRepeatCode():void {
    const smsCodeField:AbstractControl = this.verifyForm.get('code'); 
    smsCodeField.setValue('');
    this._authError = false;
    this.formErrors.code='';
    smsCodeField.markAsPristine();
    smsCodeField.markAsUntouched();
  }
}
