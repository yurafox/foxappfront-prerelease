import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage  extends ComponentBase  {

  constructor(public nav: NavController) {
    super();
  }
}
