import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LoDeliveryOption, CartService} from '../../app/service/cart-service';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

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
    this.cart.loDeliveryOptions = [];
    this.getDeliveryOptions();
  }

  async getDeliveryOptions() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    let i = 0;
    for (let ci of this.cart.orderProducts) {
      let qp = await (<any>ci).quotationproduct_p;
      let quot = await (<any>qp).quotation_p;
      let suppl = await (<any>quot).supplier_p;

      let supplLoEnt = await this.repo.getLoEntitiesForSupplier(suppl.id);

      for (let loEnt of supplLoEnt) {
        let ent = await this.repo.getLoEntitiyById(loEnt.idLoEntity);
        let item = new LoDeliveryOption();
        item.loEntityId = loEnt.idLoEntity;
        item.itemIdx = i;
        item.deliveryCost = await this.repo.getDeliveryCost(ci.id, loEnt.idLoEntity);
        item.deliveryDate = await this.repo.getDeliveryDate(ci.id, loEnt.idLoEntity);
        item.loName = ent.name;
        item.isChecked = false;
        this.cart.loDeliveryOptions.push(item);
      };
      i++;
    }
    this.dataLoaded = true;
    loading.dismiss();
  }

  onSelectOptionClick(option: any) {
    this.cart.loDeliveryOptions.forEach(i => {
        if (i.itemIdx === this.itemIndex) {
          i.isChecked = (i === option);
        }
      }
    );
  }

  isAnyOptionSelected():boolean {
    let res = false;
    for (let item of this.cart.loDeliveryOptions) {
      if (item.itemIdx === this.itemIndex) {
        if (item.isChecked){
          res = true;
          break;
        }
      }
    }
    return res;
 }

  onContinueClick() {
    if (this.itemIndex < this.cart.orderProducts.length-1)
      this.itemIndex++
    else
      this.navCtrl.push('SelectPmtMethodPage');
  }
}
