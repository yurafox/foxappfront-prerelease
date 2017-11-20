import {Component,OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../index"
import {UserService} from "../../app/service/bll/user-service";
import {Currency} from "../../app/model/index";
import {AbstractDataRepository} from "../../app/service/index";
import {User} from "../../app/model/index";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage implements OnInit{
  public currencies:Array<Currency>;
  public editForm: FormGroup;
  public onLoad = false;

  public formErrors = {
    'email': '',
    'password': '',
    'name':'',
    'appKey':''
  };

  public errorMessages = {
    'email': {
      'required': 'Обязательное поле',
      'pattern': 'Не правильный формат email адреса'
    },
    'password': {
      'minlength': 'Значение должно быть не менее 6ти символов',
      'maxlength': 'Значение должно быть не более 12ти символов'
    },
    'name':{
      'required': 'Обязательное поле',
      'maxlength': 'Значение должно быть не более 20ти символов'
    },
    'appKey':{
      'minlength': 'Значение должно быть не менее 6ти символов',
      'maxlength': 'Значение должно быть не более 20ти символов'
    },
  };

  constructor(public nav: NavController,
              public account:UserService,
              private alertCtrl: AlertController,
              private repo: AbstractDataRepository,
              private formBuilder: FormBuilder) {
    this.buildForm();
  }

  async ngOnInit(){
    this.currencies = await this.repo.getCurrencies(true);
    this.onLoad=true;
  }

  edit(){
    if (!this.editForm.valid) {
      return;
    }

    const data = this.editForm.value;
    const user: User= new User(data.name,data.email,
      data.password,this.account.uid,data.appKey,{'currency':data.currency,'lang':data.lang});

    (async ()=>{
      const result = await this.account.edit(user);
      if(result) {
          let alert = this.alertCtrl.create({
            subTitle: 'профайл успешно изменен',
            buttons: ['Ok'],
            cssClass: 'alertCustomCss'
          });
          alert.present();
        }
    })();
  }

  logout() {
    this.account.logOut();
    this.nav.setRoot(HomePage);
  }

  // <editor-fold desc="form builder">
  private buildForm(): void {
    this.editForm = this.formBuilder.group({
      'email': [this.account.email, [Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],

      'password': ['', [Validators.minLength(6), Validators.maxLength(12)]],
      'name':[this.account.name,[Validators.required, Validators.maxLength(20)]],
      'currency':[this.account.currency, [Validators.required]],
      'lang':[this.account.lang, [Validators.required]],
      'appKey':[this.account.appKey,[Validators.minLength(6), Validators.maxLength(20)]]
    });

    this.editForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  // </editor-fold>

  // <editor-fold desc="form value changing hook">
  private onValueChanged(data?: any) {
    if (!this.editForm) {
      return;
    }
    ;
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
}
