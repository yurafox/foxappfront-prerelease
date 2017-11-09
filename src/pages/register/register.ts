import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage, LoginPage} from '../index';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public nav: NavController) {
  }

  // go to login page
  login() {
    this.nav.push(LoginPage);
  }

  // go to home page
  register() {
    this.nav.setRoot(HomePage);
  }
}
