import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {NgForm} from '@angular/forms';
import {UserService} from '../../app/service/bll/user-service';


@IonicPage()
@Component({
  selector: 'page-call-me',
  templateUrl: 'call-me.html',
})
export class CallMePage  extends ComponentBase {

  @ViewChild('f') phoneForm: NgForm;
  callPhone: string;
  btnDisabled = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public toastCtrl: ToastController) {
    super();
  }

  validatePage(): boolean {
    return ((this.phoneForm.valid) && (!this.btnDisabled));
  }

  async callMe() {
    this.btnDisabled = true;
    this.userService.callMe(this.callPhone);
    let toast = this.toastCtrl.create({
      message: this.locale['WaitForCall'],
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    this.viewCtrl.dismiss();
  }

}
