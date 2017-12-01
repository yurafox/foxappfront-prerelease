import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ClientAddress} from '../../app/model/client-address';
import {SelectShipAddressPage} from '../select-ship-address/select-ship-address';


@IonicPage()
@Component({
  selector: 'page-edit-ship-address',
  templateUrl: 'edit-ship-address.html',
})
export class EditShipAddressPage extends ComponentBase  {

  shippingAddress: ClientAddress;
  mode: string;
  addressSelectorPage: SelectShipAddressPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    this.mode = navParams.data.mode;
    this.addressSelectorPage = navParams.data.page;

    if (this.mode === 'edit')
      this.shippingAddress = navParams.data.data
    else {
      this.shippingAddress = new ClientAddress();
    };
  }

  deliverToThisAddress() {
    if (this.mode === 'create') {
      this.addressSelectorPage.shippingAddresses.forEach(i => i.isPrimary = false);
      this.shippingAddress.isPrimary = true;
      this.addressSelectorPage.shippingAddresses.push(this.shippingAddress);
    }
  }

}
