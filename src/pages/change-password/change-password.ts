import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ComponentBase } from '../../components/component-extension/component-base';
import {CustomValidators} from '../../app/core/app-core';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {ChangePassword} from '../../app/model/change-password';
import {IUserVerifyAccountData} from '../../app/model/user';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage extends ComponentBase {
  public currentForm: FormGroup;
  public isSendAsync = false;
  public verifyErrorData:{errorShow:boolean,errorMessage:string};

  public formErrors = {
    'password': '',
    'newpassword':'',
    'confirmpassword':''
  };

  public errorMessages = {};

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public repo: AbstractDataRepository,
              public formBuilder: FormBuilder) {
    super();
    this.verifyErrorData={errorShow:false,errorMessage:''};
  }

  async ngOnInit(){
    super.ngOnInit();
    this.errorMessages = {
      'password': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'minlength': this.locale['LengthNLT6'] ? this.locale['LengthNLT6'] : 'Значение должно быть не менее 6-и символов',
        'maxlength': this.locale['LengthNGT25'] ? this.locale['LengthNGT25'] : 'Значение должно быть не более 25-и символов'
      },
      'newpassword': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'minlength': this.locale['LengthNLT6'] ? this.locale['LengthNLT6'] : 'Значение должно быть не менее 6-и символов',
        'maxlength': this.locale['LengthNGT25'] ? this.locale['LengthNGT25'] : 'Значение должно быть не более 25-и символов'
      },
      'confirmpassword': {
        'required': this.locale['RequiredField'] ? this.locale['RequiredField'] : 'Обязательное поле',
        'minlength': this.locale['LengthNLT6'] ? this.locale['LengthNLT6'] : 'Значение должно быть не менее 6-и символов',
        'maxlength': this.locale['LengthNGT25'] ? this.locale['LengthNGT25'] : 'Значение должно быть не более 25-и символов',
        'compare': this.locale['PassDoesNotMatch'] ? this.locale['PassDoesNotMatch'] : 'Пароль не совпадает с проверочным'
      },
    };

    this.buildForm();
  }

  public change():void {
    this.clearVerifyError();
    if (!this.currentForm.valid) {
      return;
    }

    // start block logic for multiple sending
    this.isSendAsync = true;

    const data = this.currentForm.value;
    (async ()=>{
      const passwdModel:ChangePassword = new ChangePassword(data.password,data.newpassword,data.confirmpassword);
      const result:IUserVerifyAccountData = await this.userService.changePassword(passwdModel);

      if(result.status === 2)
         this.showPopUp(result.message);

      else {
       this.verifyErrorData.errorShow = true;
       this.verifyErrorData.errorMessage = (result) ? result.message : (this.locale['RemoteSourceError'] ? this.locale['RemoteSourceError'] : 'Ошибка удаленного источника');
      }

      this.isSendAsync = false;
    })();
  }

  public buildForm(): void {
    this.currentForm = this.formBuilder.group({
      'password': ['', [Validators.required,Validators.minLength(6), Validators.maxLength(25)]],
      'newpassword': ['', [Validators.required,Validators.minLength(6), Validators.maxLength(25)]],
      'confirmpassword': ['', [Validators.required, CustomValidators.compare('newpassword'), Validators.minLength(6), Validators.maxLength(25)]],
    });

    this.currentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  public onValueChanged(data?: any) {
    if(this.verifyErrorData.errorShow)
      this.clearVerifyError();

    if (!this.currentForm) {
      return;
    }

    let form = this.currentForm;

    for (let err in this.formErrors) {
      this.formErrors[err] = '';

      let control = form.get(err);
      if (control && control.dirty && !control.valid) {
        let messages = this.errorMessages[err];
        for (let key in control.errors) {
          this.formErrors[err] = messages[key] + ' ';
        }
      }
    }
  }

  public clearVerifyError():void {
    this.verifyErrorData.errorShow = false;
    this.verifyErrorData.errorMessage = '';
  }

  public showPopUp(message:string):void {
    let alert = this.alertCtrl.create({
      message: message,
      buttons:[
        {
          text: 'OK',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    alert.present();
  }

  public logout() {
    //this.userService.logOut();
    //this.userService.removeToken();

    this.navCtrl.setRoot('HomePage');
  }
}
