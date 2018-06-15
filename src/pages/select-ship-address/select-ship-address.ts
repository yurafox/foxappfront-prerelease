import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {UserService} from '../../app/service/bll/user-service';
import {ClientAddress} from '../../app/model/client-address';
import {CartService} from '../../app/service/cart-service';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@IonicPage()
@Component({
  selector: 'page-select-ship-address',
  templateUrl: 'select-ship-address.html',
})
export class SelectShipAddressPage extends ComponentBase {

  shippingAddresses: ClientAddress[];
  dataLoaded = false;
  withDelivery: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public uService: UserService, public alertCtrl: AlertController,
              public cart: CartService, public repo: AbstractDataRepository) {
    super();

  }


  async ngOnInit() {
    super.ngOnInit();

    this.withDelivery = this.navParams.data.fromCart === 1;

    if ((this.withDelivery) && (this.cart.checkIsPickupOnly)) {
      this.cart.loShipments = await this.cart.repo.generateShipments();
      this.navCtrl.push('ShippingOptionsPage');
      this.navCtrl.remove((this.navCtrl.getActive().index)-1, 1);
    }

    this.getDefaultShipAddress().then(data => {
        this.shippingAddresses = data;
        this.dataLoaded = true;
      }
    );
  }

  async getDefaultShipAddress(): Promise<ClientAddress[]> {
    let client = await (<any>this.uService).profile.client_p;
    return await client.clientaddress_p;
  }

  addNewAddress() {
    if (this.withDelivery === true) {
      this.navCtrl.push('EditShipAddressPage', {data: null, mode: 'create', delivery: 1, page: this}).catch(err => {
        console.log(`Error navigating to EditShipAddressPage: ${err}`);
      });
    } else {
      this.navCtrl.push('EditShipAddressPage', {data: null, mode: 'create', delivery: 0, page: this}).catch(err => {
        console.log(`Error navigating to EditShipAddressPage: ${err}`);
      });
    }

  }
}
