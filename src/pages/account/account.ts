import { System } from './../../app/core/app-core';
import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Currency, User, Lang, IUserInfo} from "../../app/model/index";
import {AbstractDataRepository} from "../../app/service/index";
import { AlertController } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {Activator} from "../../app/core/app-core";

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
  public onLoad = false;
  public isSendAsync = false;
  public verifyErrorData:{errorShow:boolean,errorMessage:string}

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
              private alertCtrl: AlertController,
              private repo: AbstractDataRepository,
              private formBuilder: FormBuilder) {
    super();
    this.verifyErrorData={errorShow:false,errorMessage:''};
  }

  async ngOnInit(){
    super.ngOnInit();
    this.buildForm();

    [this.currencies,this.langs] = await Promise.all([this.repo.getCurrencies(true),
                                                      this.repo.getLocale(true)]);

    this.setDefaultSetting<Currency>(this.currencies,
      {targetReference:{name:'currentCurrency', ref: Currency},
            item: {valueName:'id',displayValue:'shortName'},
            serviceItemName:'currency'});

    this.setDefaultSetting<Lang>(this.langs,
      {targetReference:{name:'currentLang', ref: Currency},
            item: {valueName:'id',displayValue:'name'},
            serviceItemName:'lang'});

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
      'fname':{
        'required': 'Обязательное поле',
        'maxlength': 'Значение должно быть не более 20ти символов'
      },
      'lname':{
        'required': 'Обязательное поле',
        'maxlength': 'Значение должно быть не более 20ти символов'
      },
      // 'appKey':{
      //   'minlength': this.locale['LengthNLT6'] ? this.locale['LengthNLT6'] : 'Значение должно быть не менее 6-и символов',
      //     'maxlength': this.locale['LengthNGT20'] ? this.locale['LengthNGT20'] : 'Значение должно быть не более 20-и символов'
      // },
    };
  }

  currencyUpdate(item:any):void {
    this.currentCurrency.id = item.id;
  }

  langUpdate(item:any):void {
    this.currentLang.id = item.id;
  }

  edit(){
    this.clearVerifyError();
    if (!this.editForm.valid) {
      return;
    }

      // start block logic for multiple sending        
    this.isSendAsync = true;
      
    const data = this.editForm.value;
    const user: User= new User(null,data.email,
      null,null,{'currency': `${this.currentCurrency.id}`, 'lang': `${this.currentLang.id}`},null,this.userService.profile.phone,
      data.fname,data.lname);

    (async ()=>{
      const result:IUserInfo = await this.userService.edit(user);
      if(result.status === 2) {
          await this.evServ.events['localeChangeEvent'].emit(this.userService.lang);

          let alert = this.alertCtrl.create({
            subTitle: this.locale['ProfileChangedSuccessfully'],
            buttons: ['OK'],
            cssClass: 'alertCustomCss'
          });
         
          alert.present();
      } else {
        this.verifyErrorData.errorShow = true;
        this.verifyErrorData.errorMessage = (result) ? result.message : 'Ошибка удаленного источника';
      }
    this.isSendAsync = false;
    })();
  }

  logout() {
    this.userService.logOut();
    this.nav.setRoot('HomePage');
  }

  // <editor-fold desc="form builder">
  private buildForm(): void {
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
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  // </editor-fold>

  // <editor-fold desc="form value changing hook">
  private onValueChanged(data?: any) {
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
  private setDefaultSetting<T>(store:Array<T>, map:{targetReference:{name:string, ref:any},
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

  private clearVerifyError():void {
    this.verifyErrorData.errorShow = false;
    this.verifyErrorData.errorMessage = '';
  }
}
