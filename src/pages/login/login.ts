import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage, RegisterPage} from '../index';
import {UserService} from "../../app/service/bll/user-service";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit{
  private _authError = false;
  public loginForm: FormGroup;
  public get authError() {
    return this._authError;
  }


  public formErrors = {
    'email': '',
    'password': ''
  };

  public errorMessages = {
    'email': {
      'required': 'Обязательное поле',
      'pattern': 'Не правильный формат email адреса'
    },
    'password': {
      'required': 'Обязательное поле',
      'minlength': 'Значение должно быть не менее 6ти символов',
      'maxlength': 'Значение должно быть не более 12ти символов'
    }
  };

  constructor(public nav: NavController,
              private formBuilder: FormBuilder,
              private  account: UserService) {
  }

  // application hook
  ngOnInit(){
    //super.ngOnInit();
    this.buildForm();
  }

  // go to register page
  register() {
    this.nav.push(RegisterPage);
  }

  // go to home page
  async login() {
    if (!this.loginForm.valid) {
      return;
    }

    const data = this.loginForm.value;

    await this.account.login(data.email,data.password);
    if(this.account.isAuth) this.nav.setRoot(HomePage);
    else this._authError = true;
  }

  // <editor-fold desc="form builder">
  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],

      'password': ['', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)]]
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
    ;
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
