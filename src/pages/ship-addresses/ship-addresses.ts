import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {UserService} from '../../app/service/bll/user-service';
import {ClientAddress} from '../../app/model/client-address';

@IonicPage()
@Component({
  selector: 'page-ship-addresses',
  templateUrl: 'ship-addresses.html',
})
export class ShipAddressesPage extends ComponentBase implements OnInit {

  shippingAddresses: ClientAddress[];
  dataLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public uService: UserService, public alertCtrl: AlertController) {
    super();

    this.getDefaultShipAddress().then(data => {
        this.shippingAddresses = data;
        this.dataLoaded = true;
      }
    );
  }

  async getDefaultShipAddress(): Promise<ClientAddress[]>  {
    let client = await (<any>this.uService).profile.client_p;
    return await client.clientaddress_p;
  }

  onIsPrimaryClick(item: any) {
    this.shippingAddresses.forEach(i => {
        i.isPrimary = false;
      }
    );
    item.isPrimary = true;
  }

  editAddress(item: ClientAddress) {
    this.navCtrl.push('EditShipAddressNoDeliveryPage', {data: item, mode: 'edit', page: this});
  }

  addNewAddress() {
    this.navCtrl.push('EditShipAddressNoDeliveryPage', {data: null, mode: 'create', page: this});
  }

  deleteAddress(item: ClientAddress) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure you want ot delete this address for your address book?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.shippingAddresses.splice(this.shippingAddresses.indexOf(item),1);
            if (this.shippingAddresses.length > 0) {
              this.shippingAddresses[0].isPrimary = true;
            }
          }
        },
        {
          text: 'Cancel',
          handler: () => {}
        }
      ]
    });
    alert.present();
  }
}
