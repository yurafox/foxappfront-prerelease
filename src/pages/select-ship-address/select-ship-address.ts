import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {UserService} from '../../app/service/bll/user-service';
import {ClientAddress} from '../../app/model/client-address';


@IonicPage()
@Component({
  selector: 'page-select-ship-address',
  templateUrl: 'select-ship-address.html',
})
export class SelectShipAddressPage extends ComponentBase {

  defaultShippingAddress: ClientAddress;
  qty: number = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public uService: UserService) {
    super();
    this.getDefaultShipAddress().then(data => this.defaultShippingAddress = data );
  }

  async getDefaultShipAddress(): Promise<ClientAddress>  {
    let res = null;
    let client = await (<any>this.uService).profile.client_p;
    let clientAddresses = await client.clientaddress_p;
    console.log(client);
    console.log(clientAddresses);
    for (let ca of clientAddresses) {
      if ((<any>ca).isPrimary)
        res = ca;
    };
    return res;
  }

  deliverToThisAddress() {

  }

  editAddress() {

  }

  deleteAddress() {

  }
}
