import {Component, OnInit, Type} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Currency, User, Lang} from "../../app/model/index";
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
              private alertCtrl: AlertController,
              private repo: AbstractDataRepository,
              private formBuilder: FormBuilder) {
    super();
    this.buildForm();
  }

  async ngOnInit(){
    super.ngOnInit();

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
  }

  currencyUpdate(item:any):void {
    this.userService.currency = item.id;
  }

  langUpdate(item:any):void {
    this.userService.lang = item.id;
  }

  edit(){
    if (!this.editForm.valid) {
      return;
    }

    const data = this.editForm.value;
    const user: User= new User(data.name,data.email,
      data.password,this.userService.uid,data.appKey,{'currency': `${this.currentCurrency.id}`, 'lang': `${this.currentLang.id}`});

    (async ()=>{
      const result = await this.userService.edit(user);
      if(result) {
          let alert = this.alertCtrl.create({
            subTitle: 'профайл успешно изменен',
            buttons: ['Ok'],
            cssClass: 'alertCustomCss'
          });
          this.evServ.events['localeChangeEvent'].emit(this.userService.lang);
          alert.present();
        }
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

      'password': ['', [Validators.minLength(6), Validators.maxLength(12)]],
      'name':[this.userService.name,[Validators.required, Validators.maxLength(20)]],
      'lang':[this.userService.lang, [Validators.required]],
      'appKey':[this.userService.appKey,[Validators.minLength(6), Validators.maxLength(20)]]
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
}
