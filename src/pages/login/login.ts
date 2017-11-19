import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage, RegisterPage, ForgotPasswordPage} from '../index';
import {UserService} from "../../app/service/bll/user-service";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public nav: NavController, private  account: UserService) {
  }

  // go to register page
  register() {
    this.nav.push(RegisterPage);
  }

  // go to home page
  async login() {
    // TODO: make validation
      await this.account.login('sergce@fox.com','sergce');
      if(this.account.isAuth) this.nav.setRoot(HomePage);
  }

  // go to forgot password page
  forgotPwd() {
    this.nav.push(ForgotPasswordPage);
    console.log('ForgotPasswordPage redirect');
  }
}
