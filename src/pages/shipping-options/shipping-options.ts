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
    //let cityId =
    const addr = await this.repo.getClientAddressById(this.cart.order.loIdClientAddress);
    const cityId = addr.idCity;

    for (let ship of this.cart.loShipments) {

      if (ship.idStorePlace) {
        let item = new LoShipmentDeliveryOption();
        item.shipment = ship;
        item.loEntityId = null;
        item.itemIdx = i;
        item.deliveryCost = 0;
        item.deliveryDate = new Date(); //await this.repo.getDeliveryDateByShipment(ship.id, loEnt.idLoEntity, this.cart.order.loIdClientAddress);
        item.loName = null;
        item.isChecked = true;
        item.deliveryType = new LoDeliveryType(3); //Самомвьівоз
        item.pickupLocationName = (await this.repo.getStorePlaceById(ship.idStorePlace)).name; // '';
        this.cart.loShipmentDeliveryOptions.push(item);
      }
      else
      {
        let supplLoEnt = await this.repo.getLoEntitiesForSupplier(ship.idSupplier);
        for (let loEnt of supplLoEnt) {
          let ent = await this.repo.getLoEntitiyById(loEnt.idLoEntity);
          ent.loDeliveryTypes = await (<any>ent).lodeliverytype_p;

          for (let delType of ent.loDeliveryTypes) {
            let item = new LoShipmentDeliveryOption();

            item.shipment = ship;
            item.loEntityId = loEnt.idLoEntity;
            item.itemIdx = i;
            item.deliveryCost = await this.repo.getDeliveryCostByShipment(ship, loEnt.idLoEntity, this.cart.order.loIdClientAddress, delType.id);
            item.deliveryDate = await this.repo.getDeliveryDateByShipment(ship, loEnt.idLoEntity, this.cart.order.loIdClientAddress, delType.id);
            item.loName = ent.name;
            item.isChecked = ((supplLoEnt.length === 1) && (ent.loDeliveryTypes.length === 1));
            item.deliveryType = delType;
            if (item.deliveryType.id === 1) {
              item.loEntityOfficesList = (await this.repo.getLoOfficesByLoEntityAndCity(loEnt.idLoEntity, cityId))
                .sort((a,b) => {
                  if(a.name < b.name) return -1;
                  if(a.name > b.name) return 1;
                  return 0;
                });
            }
           this.cart.loShipmentDeliveryOptions.push(item);
          }

        }
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
