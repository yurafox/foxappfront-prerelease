import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IonicPage} from "ionic-angular";

import {AlertController, NavController, ToastController} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage({name: 'SupportPage', segment: 'support'})
@Component({
  selector: 'page-support',
  templateUrl: 'support.html'
})
export class SupportPage extends ComponentBase {

  submitted: boolean = false;
  supportMessage: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
    super();
  }

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      let message = this.locale['ToastMessage'];
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();

      // Handle report message sending here
    }
  }

}
