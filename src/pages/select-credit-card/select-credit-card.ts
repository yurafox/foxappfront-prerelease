import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponentBase } from '../../components/component-extension/component-base';
import { ClientCreditCardData } from '../../app/model/client-credit-card-data';

@IonicPage()
@Component({
  selector: 'page-select-credit-card',
  templateUrl: 'select-credit-card.html',
})
export class SelectCreditCardPage extends ComponentBase {
  clientCCs: ClientCreditCardData[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    this.initLocalization();
    this.clientCCs = [];
    if (this.navParams.data.clientCCData) {
      this.clientCCs = this.navParams.data.clientCCData;
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

  toPaymentPage(creditCard) {
    if (creditCard) this.navCtrl.push('PaymentPage', {clientCCData: creditCard}).catch(err => console.error(err));
  }

}
