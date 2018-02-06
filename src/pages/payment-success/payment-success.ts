import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage()
@Component({
  selector: 'page-payment-success',
  templateUrl: 'payment-success.html',
})
export class PaymentSuccessPage extends ComponentBase {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage').catch(err => console.error(err));
  }

}
