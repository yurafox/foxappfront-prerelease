import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ClientAddress} from '../../app/model/client-address';


@IonicPage()
@Component({
  selector: 'page-edit-ship-address',
  templateUrl: 'edit-ship-address.html',
})
export class EditShipAddressPage extends ComponentBase  {

  shippingAddress: ClientAddress;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    this.shippingAddress = navParams.data.item;
  }


  deliverToThisAddress() {

  }

}
