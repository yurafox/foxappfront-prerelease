import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage, RegisterPage, ForgotPasswordPage} from '../index';

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

  constructor(public nav: NavController) {
  }

  // go to register page
  register() {
    this.nav.push(RegisterPage);
  }

  // go to home page
  login() {
    this.nav.setRoot(HomePage);
  }

  // go to forgot password page
  forgotPwd() {
    this.nav.push(ForgotPasswordPage);
    console.log('ForgotPasswordPage redirect');
  }
}
