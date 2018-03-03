import {Component} from '@angular/core';
import {NavController, IonicPage, AlertController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Currency} from "../../app/model/index";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";
import {UserService} from "../../app/service/bll/user-service";
import {User,IUserVerifyAccountData} from "../../app/model/index";
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage extends ComponentBase{
  public currencies:Array<Currency>;
  public registerForm: FormGroup;
  public verifyForm: FormGroup;
  public verifyErrorData:{errorShow:boolean,errorMessage:string}
  public onLoad = false;
  public preRegister = true;
  public formErrors = {
    'phone': '',
    'email': '',
    'password': '',
    'name':'',
    'fname':'',
    'lname':''
  };

  public errorMessages = {
    'phone': {
      'required': 'Обязательное поле',
      'pattern': 'Не правильный формат номера'
    },
    'email': {
      'required': 'Обязательное поле',
      'pattern': 'Не правильный формат email адреса'
    },
    'password': {
      'required': 'Обязательное поле',
      'minlength': 'Значение должно быть не менее 6ти символов',
      'maxlength': 'Значение должно быть не более 25ти символов'
    },
    'name':{
      'required': 'Обязательное поле',
      'maxlength': 'Значение должно быть не более 20ти символов'
    },
    'fname':{
      'required': 'Обязательное поле',
      'maxlength': 'Значение должно быть не более 20ти символов'
    },
    'lname':{
      'required': 'Обязательное поле',
      'maxlength': 'Значение должно быть не более 20ти символов'
    }
  };



  constructor(public nav: NavController,
              private repo: AbstractDataRepository,
              private formBuilder: FormBuilder,
              private alertCtrl:AlertController,
              private account:UserService) {
    super();
    this.verifyErrorData={errorShow:false,errorMessage:''};
  }

  async ngOnInit(){
    super.ngOnInit();
    this.buildForm();
    this.currencies = await this.repo.getCurrencies(true);
    this.onLoad=true;
  }

  // go to login page
  login() {
    this.nav.push('LoginPage');
  }
  
  verifyUser() {
    this.clearVerifyError();
    if (!this.verifyForm.valid) {
      return;
    }

    const phone = this.verifyForm.value.phone;
    (async ()=>{
      const result:IUserVerifyAccountData = await this.account.verifyAccount(phone);
      if(result===null || result.status===0){
        this.verifyErrorData.errorShow = true;
        this.verifyErrorData.errorMessage = (result) ? result.message : 'Ошибка удаленного источника';
      } 
        
      else {
        this.findBehaviorByStatus(result);
      }
    })();
  }
  
  register() {
    
    if (!this.registerForm.valid) {
      return;
    }
    const data = this.registerForm.value;
    const user: User= new User(data.name,data.email, null,
                              null,{'currency':data.currency,'lang':data.lang},
                              null,data.phone,data.fname,data.lname);
    (async ()=>{
      const result = await this.account.register(user);
      if(result) this.login();
    })();
  }

  // <editor-fold desc="form builder">
  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      'phone': ['', [Validators.required,
        Validators.pattern('^380\\d{9}$')]],

      'email': ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      'name':['',[Validators.required, Validators.maxLength(20)]],
      'fname':['',[Validators.required, Validators.maxLength(20)]],
      'lname':['',[Validators.required, Validators.maxLength(20)]],
      'currency':['0', [Validators.required]],
      'lang':['1', [Validators.required]]
    });
   
    this.verifyForm = this.formBuilder.group({
      'phone': ['', [Validators.required,
        Validators.pattern('^380\\d{9}$')]]
    });

    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.verifyForm.valueChanges
      .subscribe(data => this.onVerifyChanged(data));

    this.onValueChanged();
  }
  // </editor-fold>

  // <editor-fold desc="form value changing hook">
  private onValueChanged(data?: any) {
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
  private onVerifyChanged(data?:any) {
    if(this.verifyErrorData.errorShow)
      this.clearVerifyError();  

    if (!this.verifyForm) {
      return;
    }
    
    let form = this.verifyForm;
    this.formErrors['phone'] = '';
    let control = form.get('phone');
    if (control && control.dirty && !control.valid) {
      let messages = this.errorMessages['phone'];
      for (let key in control.errors) {
        this.formErrors['phone'] += messages[key] + ' ';
      }
    }
  }
  
  private findBehaviorByStatus(result:IUserVerifyAccountData ):void {
    if(result.status === 1) {
      this.preRegister = false;
    }

    else {
      let alert = this.alertCtrl.create({
        message: result.message,
        buttons:[
          {
            text: 'OK',
            handler: () => {
              this.nav.removeView(this.nav.getActive());
              this.login();
            }
          }
        ]
      });

      alert.present();
    }

  }
  
  private clearVerifyError():void {
    this.verifyErrorData.errorShow = false;
    this.verifyErrorData.errorMessage = '';
  }
  // </editor-fold>
}
