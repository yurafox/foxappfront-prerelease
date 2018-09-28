import {Component, ViewChild} from '@angular/core';
import {IonicPage, ToastController, ViewController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {NgForm} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-call-me',
  templateUrl: 'call-me.html',
})
export class CallMePage  extends ComponentBase {

  @ViewChild('f') phoneForm: NgForm;
  callPhone: string;
  btnDisabled = false;

  constructor(public toastCtrl: ToastController, public viewCtrl: ViewController) {
    super();
  }

  validatePage(): boolean {
    return ((this.phoneForm.valid) && (!this.btnDisabled));
  }

  async callMe() {
    this.btnDisabled = true;
    this.userService.callMe(this.callPhone).catch(console.error);
    let toast = this.toastCtrl.create({
      message: this.locale['WaitForCall'],
      duration: 3000,
      position: 'bottom'
    });
    toast.present().catch(console.error);
    this.viewCtrl.dismiss().catch(console.error);
  }

}
