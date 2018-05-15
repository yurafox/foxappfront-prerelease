import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ComponentBase} from "../../components/component-extension/component-base";
import {CartService} from '../../app/service/cart-service';

@IonicPage({name: 'LoginPage', segment: 'login'})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends ComponentBase implements OnInit {

  private _authError = false;
  private _phone = '';
  public isSendAsync = false;
  public loginForm: FormGroup;

  public get authError() {
    return this._authError;
  }


  public formErrors = {
    'phone': '',
    'password': ''
  };

  public errorMessages = {
      /*'phone': {
      'required': 'Обязательное поле',
      'pattern': 'Не правильный формат номера'
    },
    'password': {
      'required': 'Обязательное поле',
      'minlength': 'Значение должно быть не менее 6ти символов',
      'maxlength': 'Значение должно быть не более 25ти символов'
    }*/
  };

  constructor(public nav: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, public cart: CartService) {
    super();
    this.initLocalization();
    const navData = this.navParams.data;
    this._phone = (navData && navData.phone) ? navData.phone : '';
  }

  // application hook /
  async ngOnInit(){
    this.errorMessages = {
      'phone': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'pattern': this.locale['WrongPhoneFormat'] ? this.locale['WrongPhoneFormat'] : 'Не правильный формат номера'
      },
      'password': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'minlength': this.locale['LengthNLT6'] ? this.locale['LengthNLT6'] : 'Значение должно быть не менее 6-и символов',
        'maxlength': this.locale['LengthNGT25'] ? this.locale['LengthNGT25'] : 'Значение должно быть не более 25-и символов'
      }
    };
    this.buildForm();
  }

  // go to register page
  register() {
    this.nav.push('RegisterPage');
  }

  // go to home page
  async login() {
    if (!this.loginForm.valid) {
      return;
    }

    // start block logic for multiple sending
    this.isSendAsync = true;
    const data = this.loginForm.value;

    await this.userService.login(data.phone,data.password);
    this.isSendAsync = false;

    if(this.userService.isAuth) {
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
        this.nav.setRoot('HomePage');
    }
    else this._authError = true;
  }

  private toContinuePage(params:any) {
    this.nav.remove(0).then(() => this.nav.insert(0, 'HomePage'));
    this.nav.push(this.navParams.data.continuePage,params).then(() => {
      this.nav.remove(this.nav.getActive().index);
    });
  }

// <editor-fold desc="form builder">
  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      'phone': [this._phone, [Validators.required,
        // obsolete email regex^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$
        Validators.pattern('^380\\d{9}$')]],

      'password': ['', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)]]
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  // </editor-fold>

  // <editor-fold desc="form value changing hook">
  private onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    let form = this.loginForm;

    for (let err in this.formErrors) {
      this.formErrors[err] = '';
      this._authError = false;

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
}
