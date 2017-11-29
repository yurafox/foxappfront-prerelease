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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public uService: UserService) {
    super();
    this.getDefaultShipAddress().then(data => this.defaultShippingAddress = data );
  }

  async getDefaultShipAddress(): Promise<ClientAddress> {
    let client = await (<any>this.uService).profile.client_p;
    console.log(client.lname);
    return null;
/*
    let clientAddresses = await client.clientaddress_p;
    for (let ca of clientAddresses) {
      if ((<any>ca).isPrimary)
        return ca;
    };
    return null;
*/
  }

}
