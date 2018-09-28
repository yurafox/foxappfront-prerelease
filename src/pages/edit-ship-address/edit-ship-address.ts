import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ClientAddress} from '../../app/model/client-address';
import {SelectShipAddressPage} from '../select-ship-address/select-ship-address';
import {NgForm} from '@angular/forms';
import {Country} from '../../app/model/country';
import {CartService} from '../../app/service/cart-service';
import {City} from '../../app/model/city';
import {AbstractGeoRepository} from "../../app/service/repository/abstract/abstract-geo-repository";
import {AbstractClientRepository} from "../../app/service/repository/abstract/abstract-client-repository";

@IonicPage()
@Component({
  selector: 'page-edit-ship-address',
  templateUrl: 'edit-ship-address.html',
})
export class EditShipAddressPage extends ComponentBase  {
  cityInputStream$ = new Subject<string>();

  @ViewChild('f') addressEditForm: NgForm;
  shippingAddress = new ClientAddress();
  originalAddr: ClientAddress;
  countries: Country[];
  cities: City[];
  showCityPopup = false;

  mode: string;
  addressSelectorPage: SelectShipAddressPage;
  delivery: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public geoRepo: AbstractGeoRepository,
              public clientRepo: AbstractClientRepository, public cart: CartService) {
    super();
    this.initPage().catch(console.error);

    this.cityInputStream$.debounceTime(300)
      .distinctUntilChanged()
      .subscribe(inputValue =>
        {
          this.showCityPopup = true;
          this.geoRepo.searchCities(inputValue).then(
            x => {this.cities = x;}
          );
        }
      );

  }

  cityUpdate(item: any, objRef:any ) {
    this.shippingAddress.city = item.name;
    this.showCityPopup = false;
  }

  async initPage() {
    this.countries = await this.geoRepo.getCountries();
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
      this.shippingAddress.idCity = this.originalAddr.idCity;
      this.shippingAddress.lat = this.originalAddr.lat;
      this.shippingAddress.lng = this.originalAddr.lng;
      this.shippingAddress.isPrimary = this.originalAddr.isPrimary;
      this.shippingAddress.zip = this.originalAddr.zip;
      this.shippingAddress.phone = this.originalAddr.phone;
      this.shippingAddress.idCountry = this.originalAddr.idCountry;
    }
  }

  async internalSaveAddress(): Promise<ClientAddress> {
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
      alert.present().catch(console.error);
      return null;
    }

    if (this.mode === 'create') {
      this.addressSelectorPage.shippingAddresses.forEach(i => i.isPrimary = false);
      this.shippingAddress.isPrimary = true;
      let addr = await this.clientRepo.createClientAddress(this.shippingAddress);
      this.addressSelectorPage.shippingAddresses.push(addr);
      return addr;
    } else if (this.mode === 'edit') {
      const addr: ClientAddress = await this.clientRepo.saveClientAddress(this.shippingAddress);
      Object.assign(this.originalAddr, addr);
      return addr;
    }

  }

  async saveThisAddress() {
    let addr = await this.internalSaveAddress();
    if(this.delivery === 1) {
      this.cart.order.loIdClientAddress = addr.id;
    }
    this.navCtrl.pop().catch(console.error);
  }

  validatePage(): boolean {
    return (!(this.shippingAddress.idCity === null) && (!this.showCityPopup) && (this.addressEditForm.valid));

  }

}
