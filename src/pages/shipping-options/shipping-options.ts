import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, AlertController} from 'ionic-angular';
import {CartService, LoShipmentDeliveryOption} from '../../app/service/cart-service';
import {ComponentBase} from '../../components/component-extension/component-base';
import {LoDeliveryType} from '../../app/model/lo-delivery-type';
import {AbstractLoRepository} from "../../app/service/repository/abstract/abstract-lo-repository";
import {AbstractClientRepository} from "../../app/service/repository/abstract/abstract-client-repository";
import {AbstractCartRepository} from "../../app/service/repository/abstract/abstract-cart-repository";
import {AbstractStorePlaceRepository} from "../../app/service/repository/abstract/abstract-store-place-repository";

@IonicPage()
@Component({
  selector: 'page-shipping-options',
  templateUrl: 'shipping-options.html',
})
export class ShippingOptionsPage extends ComponentBase {

  itemIndex = 0;
  dataLoaded = false;
  loOfficesLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cart: CartService,
              public loRepo: AbstractLoRepository, public clientRepo: AbstractClientRepository,
              public loadingCtrl: LoadingController, public cartRepo: AbstractCartRepository,
              public storePlaceRepo: AbstractStorePlaceRepository, public alertCtrl: AlertController) {
    super();
    this.initLocalization();
    this.cart.loShipmentDeliveryOptions = [];
  }

  async ngOnInit() {
    this.cart.loShipments = await this.cartRepo.generateShipments();
    await this.getDeliveryOptions();
  }


  async getDeliveryOptions() {
    let content = this.locale['LoadingContent'];
    let loading = this.loadingCtrl.create({
      content: content
    });

    try {
      loading.present().catch(console.error);

      let i = 0;

      const addr = this.cart.order.loIdClientAddress ? await this.clientRepo.getClientAddressById(this.cart.order.loIdClientAddress) : null;
      const cityId = addr ? addr.idCity : null;

      for (let ship of this.cart.loShipments) {
        let loDeliveryTypes = await this.loRepo.getLoEntityDeliveryTypesAttr(ship, this.cart.order.loIdClientAddress);

        if (loDeliveryTypes && loDeliveryTypes.length > 0) {
          for (let loEnt of loDeliveryTypes) {
            let item = new LoShipmentDeliveryOption();

            item.shipment = ship;
            item.loEntityId = ship.idStorePlace ? null : loEnt.loEntityId;
            item.itemIdx = i;
            item.deliveryCost = ship.idStorePlace ? 0 : await this.loRepo.getDeliveryCostByShipment(ship, loEnt.loEntityId, this.cart.order.loIdClientAddress, loEnt.deliveryTypeId);
            item.deliveryDate = loEnt.deliveryDate;
            item.loName = ship.idStorePlace ? null : (await this.loRepo.getLoEntitiyById(item.loEntityId)).name;
            item.pickupLocationName = ship.idStorePlace ? (await this.storePlaceRepo.getStorePlaceById(ship.idStorePlace)).name : null;
            item.isChecked = ship.idStorePlace ? true : (loDeliveryTypes.length === 1);
            let delivName = ship.idStorePlace ? null : (await this.loRepo.getLoDeliveryTypeById(loEnt.deliveryTypeId)).name;
            item.deliveryType = new LoDeliveryType(loEnt.deliveryTypeId, delivName);

            let needAddToOptionsList = true;

            if (item.deliveryType.id === 1) {
              let loOffices = await this.loRepo.getLoOfficesByLoEntityAndCity(loEnt.loEntityId, cityId);
              if (loOffices && loOffices.length > 0) {
                item.loEntityOfficesList = loOffices.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                  });
                needAddToOptionsList = !(item.loEntityOfficesList.length === 0);
                this.loOfficesLoaded = true;
              }
            }

            if (item.deliveryCost == -1 && item.loEntityId == 203)
              needAddToOptionsList = false;

            if (needAddToOptionsList)
              this.cart.loShipmentDeliveryOptions.push(item);
          }
          this.dataLoaded = true;
        } else {
          let alert = this.alertCtrl.create({
            message: this.locale['AlertNoLOMessage'] ? this.locale['AlertNoLOMessage'] : 'К сожалению, доставка по данному адресу не осуществляется',
            buttons: [
              {
                text: 'OK',
              }
            ]
          });
          alert.present().then(() => {
            this.navCtrl.pop().catch((err) => console.error(`Couldn't pop: ${err}`));
          }).catch((err) => console.error(`Alert error: ${err}`));
        }
        i++;
      }
    } finally {
      loading.dismiss().catch(console.error);
    }
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
      return (typeof res.loEntityOfficeId !== 'undefined');
    else
      return (res !== null);
 }

  async onContinueClick() {
    if (this.cart.loShipments && this.cart.loShipments.length > 0) {
      if (this.itemIndex < this.cart.loShipments.length - 1)
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
            ship = await this.cartRepo.saveShipment(ship);
          }
        }
        this.evServ.events['cartUpdateEvent'].emit();
        await this.navCtrl.push('SelectPmtMethodPage');
        this.navCtrl.remove((this.navCtrl.getActive().index) - 1, 1).catch(console.error)
      }
    }
  }

}
