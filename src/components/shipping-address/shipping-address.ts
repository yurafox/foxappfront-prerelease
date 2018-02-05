/**Defines, does page using delivery functionality.
 * @param withDelivery?: boolean;
 *
 * Contains an array of ClientAddress object.
 * @param addresses?: ClientAddress[];
 */

import {Component, Input} from '@angular/core';
import {ClientAddress} from "../../app/model/client-address";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {UserService} from "../../app/service/bll/user-service";
import {ComponentBase} from "../component-extension/component-base";

@Component({
  selector: 'shipping-address',
  templateUrl: 'shipping-address.html'
})
export class ShippingAddressComponent extends ComponentBase {

  @Input() withDelivery?: boolean;
  @Input() addresses?: ClientAddress[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public uService: UserService, public alertCtrl: AlertController) {
    super();
  }


  onIsPrimaryClick(item: any, event: any) {
    for (let i of this.addresses) {
      i.isPrimary = (i === item);
    }
    event.preventDefault();
  }

  deliverToThisAddress(item: any) {
    if (this.withDelivery) {
      this.navCtrl.push('ShippingOptionsPage', {data: item});

    }
  }

  editAddress(item: ClientAddress) {
    if (this.withDelivery === true) {
      this.navCtrl.push('EditShipAddressPage', {data: item, mode: 'edit', delivery: 1, page: this}).catch(err => {
        console.log(`Error navigating to EditShipAddressPage: ${err}`);
      });
    } else {
      this.navCtrl.push('EditShipAddressPage', {data: item, mode: 'edit', delivery: 0, page: this}).catch(err => {
        console.log(`Error navigating to EditShipAddressPage: ${err}`);
      });
    }
  }

  deleteAddress(item: ClientAddress) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure you want to delete this address from your address book?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.addresses.splice(this.addresses.indexOf(item), 1);
            /*if (this.addresses.length > 0) {
              this.addresses[0].isPrimary = true;
            }*/
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
}
