import {Component} from '@angular/core';
import {NavController, IonicPage, AlertController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Currency, Lang, IUserInfo} from "../../app/model/index";
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
  public langs:Array<Lang>;
  public registerForm: FormGroup;
  public verifyForm: FormGroup;
  public verifyErrorData:{errorShow:boolean,errorMessage:string}
  private onLoad = false;
  private preRegister = true;
  private isSendAsync = false;
  public formErrors = {
    'phone': '',
    'email': '',
    'password': '',
    //'name':'',
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
    // 'password': {
    //   'required': 'Обязательное поле',
    //   'minlength': 'Значение должно быть не менее 6ти символов',
    //   'maxlength': 'Значение должно быть не более 20ти символов'
    // },
    // 'name':{
    //   'required': 'Обязательное поле',
    //   'maxlength': 'Значение должно быть не более 20ти символов'
    // },
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
    [this.currencies,this.langs] = await Promise.all([this.repo.getCurrencies(true),this.repo.getLocale(true)]);
    this.onLoad=true;
  }

  // go to login page
  login(phone:string) {
    this.nav.push('LoginPage',{phone: phone}).catch(
      err => {
        console.log(`Error navigating to LoginPage: ${err}`);
      }
    );
  }

  verifyUser() {
    // clear error message
    this.clearVerifyError();
    if (!this.verifyForm.valid) {
      return;
    }
    
     // start block logic for multiple sending
     this.isSendAsync = true;

    const phone = this.verifyForm.value.phone;
    (async ()=>{
      const result:IUserVerifyAccountData = await this.account.verifyAccount(phone);
      if(result===null || result.status===0){
        this.verifyErrorData.errorShow = true;
        this.verifyErrorData.errorMessage = (result) ? result.message : 'Ошибка удаленного источника';
      }

      else {
        this.findBehaviorByStatus(result, phone);
      }

      // end block logic for multiple sending
      this.isSendAsync = false;
    })();
  }

  register() {
    this.clearVerifyError();
    if (!this.registerForm.valid) {
      return;
    }

     // start block logic for multiple sending
    this.isSendAsync = true;
    const data = this.registerForm.value;
    const user: User= new User(null,data.email, null,
                              null,{'currency':data.currency,'lang':data.lang},
                              null,data.phone,data.fname,data.lname);

    (async ()=>{
      const result:IUserInfo = await this.userService.register(user);
      if(result.status === 2 && result.user)
         this.showSmsPopUp(result.message,result.user.phone);
      else {
          this.verifyErrorData.errorShow = true;
          this.verifyErrorData.errorMessage = (result) ? result.message : 'Ошибка удаленного источника';
      }

      this.isSendAsync = false;
    })();
  }

  // <editor-fold desc="form builder">
  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      'phone': ['', [Validators.required,
        Validators.pattern('^380\\d{9}$')]],

      'email': ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      //'name':['',[Validators.required, Validators.maxLength(20)]],
      'fname':['',[Validators.required,Validators.maxLength(20)]],
      'lname':['',[Validators.maxLength(20)]],
      'currency':['4', [Validators.required]],
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
    if(this.verifyErrorData.errorShow)
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

  private findBehaviorByStatus(result:IUserVerifyAccountData, phone:string ):void {
    if(result.status === 1) {
      this.preRegister = false;
      this.registerForm.controls['phone'].setValue(phone);
    }

    else {
      this.showSmsPopUp(result.message,phone);
    }

  }

  private clearVerifyError():void {
    this.verifyErrorData.errorShow = false;
    this.verifyErrorData.errorMessage = '';
  }

  private showSmsPopUp(message:string,phone:string){
    let alert = this.alertCtrl.create({
      message: message,
      enableBackdropDismiss:false,
      buttons:[
        {
          text: 'OK',
          handler: () => {
            if(this.nav.length() > 1) {this.nav.removeView(this.nav.getActive());}
           
            // go to login page
            this.login(phone);
          }
        }
      ]
    });

    alert.present();
  }
  // </editor-fold>
}
