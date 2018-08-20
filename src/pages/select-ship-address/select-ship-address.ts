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
    let client = await (<any>this.uService).profile.client_p;

    if (client) {
      this.shippingAddresses = await client.clientaddress_p;
      if (this.shippingAddresses && this.shippingAddresses.length > 0) 
        this.dataLoaded = true;
    }

    this.withDelivery = this.navParams.data.fromCart === 1;

    if ((this.withDelivery) && (this.cart.checkIsPickupOnly)) {
      this.cart.loShipments = await this.cart.repo.generateShipments();
      this.navCtrl.push('ShippingOptionsPage');
      this.navCtrl.remove((this.navCtrl.getActive().index)-1, 1);
    }
  }

  addNewAddress() {
    const _delivery:number=(this.withDelivery === true) ? 1:0;
    this.dataLoaded=true;
    this.navCtrl.push('EditShipAddressPage', {data: null, mode: 'create', delivery: _delivery, page: this}).catch(err => {
      console.log(`Error navigating to EditShipAddressPage: ${err}`);
    });
  }
}
