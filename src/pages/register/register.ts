import {Component, OnInit} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Currency} from "../../app/model/index";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";
import {UserService} from "../../app/service/bll/user-service";
import {User} from "../../app/model/index";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit{
  public currencies:Array<Currency>;
  public registerForm: FormGroup;
  public onLoad = false;

  public formErrors = {
    'email': '',
    'password': '',
    'name':''
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
    },
    'name':{
      'required': 'Обязательное поле',
      'maxlength': 'Значение должно быть не более 20ти символов'
    }
  };



  constructor(public nav: NavController,
              private repo: AbstractDataRepository,
              private formBuilder: FormBuilder,
              private account:UserService) {
    this.buildForm();
  }

  async ngOnInit(){
    this.currencies = await this.repo.getCurrencies(true);
    this.onLoad=true;
  }

  // go to login page
  login() {
    this.nav.push('LoginPage');
  }

  // go to home page
  register() {
    if (!this.registerForm.valid) {
      return;
    }

    const data = this.registerForm.value;
    const user: User= new User(data.name,data.email,
                               data.password,null,null,{'currency':data.currency,'lang':data.lang});
    (async ()=>{
      const result = await this.account.register(user);
      if(result) this.login();
    })();
  }

  // <editor-fold desc="form builder">
  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],

      'password': ['', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)]],

      'name':['',[Validators.required, Validators.maxLength(20)]],
      'currency':['0', [Validators.required]],
      'lang':['1', [Validators.required]]
    });

    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  // </editor-fold>

  // <editor-fold desc="form value changing hook">
  private onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }
    ;
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
  // </editor-fold>
}
