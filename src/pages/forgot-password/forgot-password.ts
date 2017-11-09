import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../index";

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  constructor(public nav: NavController) {
  }

  // submit email
  send() {
    // enter your code here
    // back to login page
    this.nav.setRoot(LoginPage);
  }
}
