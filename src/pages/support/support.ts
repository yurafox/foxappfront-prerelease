import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IonicPage, ViewController} from "ionic-angular";
import {NavController, ToastController} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";
import {ClientMessage} from "../../app/model/client-message";

@IonicPage({name: 'SupportPage', segment: 'support'})
@Component({
  selector: 'page-support',
  templateUrl: 'support.html'
})
export class SupportPage extends ComponentBase {

  submitted: boolean = false;
  supportMessage: string;
  minMsgLength = 10;

  constructor(private toastCtrl: ToastController,
              private repo: AbstractDataRepository,
              private viewCtrl: ViewController) {
    super();
  }

/*  protected adjustTextarea(event: any): void {
    let textarea: any		= event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height 	= 'auto';
    textarea.style.height 	= textarea.scrollHeight + 'px';
    return;
  }*/

  async submit() {
    this.submitted = true;

    if (this.supportMessage && this.supportMessage.length>this.minMsgLength) {
      let m = new ClientMessage();
      m.messageDate = new Date(Date.now());
      m.messageText = this.supportMessage;
      if (m && m !== null && m.messageText) {
        await this.repo.postClientMessage(m);
        this.supportMessage = '';
        this.submitted = false;
        let message = this.locale['ToastMessage'];
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000
        });
        toast.present().then(() => {
          this.viewCtrl.dismiss()
        });
      }
    }
  }

}
