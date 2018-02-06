import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage()
@Component({
  selector: 'page-payment-fail',
  templateUrl: 'payment-fail.html',
})
export class PaymentFailPage extends ComponentBase{

  fail: any;
  error: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    if (this.navParams.data) {
      console.log(this.navParams.data);
      if (this.navParams.data === 'fail') {
        this.fail = this.navParams.data;
      } else if (this.navParams.data === 'error') {
        this.error = this.navParams.data;
      }
    }
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage').catch(err => console.error(err));
  }

}
