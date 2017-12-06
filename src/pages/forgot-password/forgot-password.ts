import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage  extends ComponentBase {

  constructor(public nav: NavController) {
    super();
  }

  // submit email
  send() {
    // enter your code here
    // back to login page
    this.nav.setRoot('LoginPage');
  }
}
