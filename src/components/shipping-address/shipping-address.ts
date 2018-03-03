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
import {CartService} from '../../app/service/cart-service';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@Component({
  selector: 'shipping-address',
  templateUrl: 'shipping-address.html'
})
export class ShippingAddressComponent extends ComponentBase {

  @Input() withDelivery?: boolean;
  @Input() addresses?: ClientAddress[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public uService: UserService, public alertCtrl: AlertController,
              public cart: CartService, public repo: AbstractDataRepository) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onIsPrimaryClick(item: any, event: any) {
    for (let i of this.addresses) {
      i.isPrimary = (i === item);
    }
    event.preventDefault();
  }

  deliverToThisAddress(item: any) {
    this.cart.order.loIdClientAddress = item.id;
    this.navCtrl.push('ShippingOptionsPage', {data: item});
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
    let lang: number = this.uService.lang;
    let title: string;
    let message: string;
    let cancel: string;
    if (lang === 1) {
      title = 'Подтверждение';
      message = 'Вы действительно хотите удалить этот адрес из избранных?';
      cancel = 'Отмена';
    } else if (lang === 2) {
      title = 'Підтвердження';
      message = 'Ви дійсно бажаєте видалити цю адресу з обраних?';
      cancel = 'Відміна';
    } else if (lang === 3) {
      title = 'Confirmation';
      message = 'Are you sure you want to delete this address from favorites?';
      cancel = 'Cancel';
    } else {
      title = 'Подтверждение';
      message = 'Вы действительно хотите удалить этот адрес из избранных?';
      cancel = 'Отмена';
    }
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.repo.deleteClientAddress(item).then(i => {
                this.addresses.splice(this.addresses.indexOf(item), 1);
              }
            );
            /*if (this.addresses.length > 0) {
              this.addresses[0].isPrimary = true;
            }*/
          }
        },
        {
          text: cancel,
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
}
