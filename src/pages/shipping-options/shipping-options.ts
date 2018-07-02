import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {CartService, LoShipmentDeliveryOption} from '../../app/service/cart-service';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {LoDeliveryType} from '../../app/model/lo-delivery-type';

@IonicPage()
@Component({
  selector: 'page-shipping-options',
  templateUrl: 'shipping-options.html',
})
export class ShippingOptionsPage extends ComponentBase {

  itemIndex = 0;
  dataLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cart: CartService,
                public repo: AbstractDataRepository, public loadingCtrl: LoadingController) {
    super();
    this.initLocalization();
    this.cart.loShipmentDeliveryOptions = [];
  }

  async ngOnInit() {
    this.cart.loShipments = await this.repo.generateShipments();
    await this.getDeliveryOptions();
  }


  async getDeliveryOptions() {
    let content = this.locale['LoadingContent'];
    let loading = this.loadingCtrl.create({
      content: content
    });

    loading.present();

    let i = 0;

    const addr = this.cart.order.loIdClientAddress ? await this.repo.getClientAddressById(this.cart.order.loIdClientAddress) : null;
    const cityId = addr ? addr.idCity : null;

    for (let ship of this.cart.loShipments) {
      let loDeliveryTypes = await this.repo.getLoEntityDeliveryTypesAttr(ship, this.cart.order.loIdClientAddress);

      for (let loEnt of loDeliveryTypes) {
        let item = new LoShipmentDeliveryOption();

        item.shipment = ship;
        item.loEntityId = ship.idStorePlace ? null : loEnt.loEntityId;
        item.itemIdx = i; 
        item.deliveryCost = ship.idStorePlace ? 0 : await this.repo.getDeliveryCostByShipment(ship, loEnt.loEntityId, this.cart.order.loIdClientAddress, loEnt.deliveryTypeId);
        item.deliveryDate = loEnt.deliveryDate;
        item.loName = ship.idStorePlace ? null : (await this.repo.getLoEntitiyById(item.loEntityId)).name;
        item.pickupLocationName = ship.idStorePlace ? (await this.repo.getStorePlaceById(ship.idStorePlace)).name : null; 
        item.isChecked = ship.idStorePlace ? true : (loDeliveryTypes.length === 1);
        let delivName =  ship.idStorePlace ? null : (await this.repo.getLoDeliveryTypeById(loEnt.deliveryTypeId)).name;
        item.deliveryType = new LoDeliveryType(loEnt.deliveryTypeId, delivName);
  
        let needAddToOptionsList = true;

        if (item.deliveryType.id === 1) {
          item.loEntityOfficesList = (await this.repo.getLoOfficesByLoEntityAndCity(loEnt.loEntityId, cityId))
            .sort((a,b) => {
              if(a.name < b.name) return -1;
              if(a.name > b.name) return 1;
              return 0;
            });
          needAddToOptionsList = !(item.loEntityOfficesList.length === 0);
        }

        if (needAddToOptionsList)
          this.cart.loShipmentDeliveryOptions.push(item);
      }
      i++;
    }

    this.dataLoaded = true;
    loading.dismiss();
  }

  onSelectOptionClick(option: any) {
    this.cart.loShipmentDeliveryOptions.forEach(i => {
        if (i.itemIdx === this.itemIndex) {
          i.isChecked = (i === option);
        }
      }
    );
  }

  validatePage():boolean {
    let res: LoShipmentDeliveryOption = null;
    for (let item of this.cart.loShipmentDeliveryOptions) {
      if (item.itemIdx === this.itemIndex) {

        if (item.isChecked){
          res = item;
          break;
        }
      }
    }

    if ((res) && (res.deliveryType.id === 1))
      return (typeof res.loEntityOfficeId !== 'undefined')
    else
      return (res !== null);
 }

  async onContinueClick() {
    if (this.itemIndex < this.cart.loShipments.length-1)
      this.itemIndex++;
    else {
      for (let i of this.cart.loShipmentDeliveryOptions) {

          if (i.isChecked) {
            let ship = i.shipment;
            ship.idLoEntity = i.loEntityId;
            ship.loEstimatedDeliveryDate = i.deliveryDate;
            ship.loDeliveryCost = i.deliveryCost;
            ship.idLoDeliveryType = i.deliveryType.id;
            ship.idLoEntityOffice = i.loEntityOfficeId;
            ship = await this.repo.saveShipment(ship);
          }
      };
      this.evServ.events['cartUpdateEvent'].emit();
      //console.log(this.cart.loShipments);
      await this.navCtrl.push('SelectPmtMethodPage');
      this.navCtrl.remove((this.navCtrl.getActive().index)-1, 1)
    }
  }

}
