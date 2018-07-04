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
  clientCCs: Array<{cardData: ClientCreditCardData, isChecked:boolean}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    this.initLocalization();
    this.clientCCs = [];
    if (this.navParams.data.clientCCData) {
      this.navParams.data.clientCCData.forEach(data => {
        this.clientCCs.push({cardData: data, isChecked: false});
      });
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

  toPaymentPage() {
    let creditCard: ClientCreditCardData;
    for (let i = 0; i < this.clientCCs.length; i++) {
      if (this.clientCCs[i].isChecked === true) {
        creditCard = this.clientCCs[i].cardData;
      }
    }
    if (creditCard && creditCard.id) this.navCtrl.push('PaymentPage', {clientCCData: creditCard}).catch(err => console.error(err));
  }

  onSelectOptionClick(clientCC: {cardData: ClientCreditCardData, isChecked:boolean}) {
    for (let i = 0; i < this.clientCCs.length; i++) {
      if (this.clientCCs[i] === clientCC) {
        this.clientCCs[i].isChecked = true;
      } else this.clientCCs[i].isChecked = false;
    }
  }

  validatePage() {
    for (let i = 0; i < this.clientCCs.length; i++) {
      if (this.clientCCs[i].isChecked === true) {
        return true;
      }
    }
    return false;
  }

}
