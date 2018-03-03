import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ClientAddress} from '../../app/model/client-address';
import {SelectShipAddressPage} from '../select-ship-address/select-ship-address';
import {NgForm} from '@angular/forms';
import {Country} from '../../app/model/country';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {UserService} from "../../app/service";

@IonicPage()
@Component({
  selector: 'page-edit-ship-address',
  templateUrl: 'edit-ship-address.html',
})
export class EditShipAddressPage extends ComponentBase  {
  @ViewChild('f') addressEditForm: NgForm;
  shippingAddress = new ClientAddress();
  originalAddr: ClientAddress;
  countries: Array<Country>;
  currentCountry: Country = new Country(1, 'Ukraine');

  mode: string;
  addressSelectorPage: SelectShipAddressPage;
  delivery: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public repo: AbstractDataRepository) {
    super();
    this.initPage();
  }

  async initPage() {
    this.countries = await this.repo.getCountries();
    this.mode = this.navParams.data.mode;
    this.delivery = this.navParams.data.delivery;
    this.addressSelectorPage = this.navParams.data.page;
    this.originalAddr = this.navParams.data.data;

    if (this.mode === 'edit') {
      this.shippingAddress.id = this.originalAddr.id;
      this.shippingAddress.idClient = this.originalAddr.idClient;
      this.shippingAddress.recName = this.originalAddr.recName;
      this.shippingAddress.street = this.originalAddr.street;
      this.shippingAddress.bldApp = this.originalAddr.bldApp;
      this.shippingAddress.city = this.originalAddr.city;
      this.shippingAddress.lat = this.originalAddr.lat;
      this.shippingAddress.lng = this.originalAddr.lng;
      this.shippingAddress.isPrimary = this.originalAddr.isPrimary;
      this.shippingAddress.zip = this.originalAddr.zip;
      this.shippingAddress.phone = this.originalAddr.phone;
      this.shippingAddress.idCountry = this.originalAddr.idCountry;
    }
  }

  async saveAddress() {
    if (!this.addressEditForm.valid) {
      let alert = this.alertCtrl.create({
        title: this.locale['Error'],
        message: this.locale['ReviewYourData'],
        buttons: [
          {
            text: 'OK',
            handler: () => {}
          }
        ]
      });
      alert.present();
      return;
    }

    if (this.mode === 'create') {
      this.addressSelectorPage.shippingAddresses.forEach(i => i.isPrimary = false);
      this.shippingAddress.isPrimary = true;
      let addr = await this.repo.createClientAddress(this.shippingAddress);

      this.addressSelectorPage.shippingAddresses.push(addr);
      this.navCtrl.pop().catch(err => {
        console.log(`Error navigating back: ${err}`)
      });
    } else if (this.mode === 'edit') {
      let addr = await this.repo.saveClientAddress(this.shippingAddress);
      this.originalAddr = addr;
/*
      this.originalAddr.recName = this.shippingAddress.recName;
      this.originalAddr.street = this.shippingAddress.street;
      this.originalAddr.bldApp = this.shippingAddress.bldApp;
      this.originalAddr.city = this.shippingAddress.city;
      this.originalAddr.zip = this.shippingAddress.zip;
      this.originalAddr.phone = this.shippingAddress.phone;
      this.originalAddr.idCountry = this.shippingAddress.idCountry;
*/

      this.navCtrl.pop().catch(err => {
        console.log(`Error navigating back: ${err}`)
      });
    }

  }
}
