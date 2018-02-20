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
    let lang: number = this.userService.lang;
    let content: string;
    if (lang === 1) {
      content = 'Пожалуйста, подождите'
    } else if (lang === 2) {
      content = 'Будь-ласка, зачекайте'
    } else if (lang === 3) {
      content = 'Please wait...'
    } else {
      content = 'Пожалуйста, подождите'
    }
    let loading = this.loadingCtrl.create({
      content: content
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
        item.idClientOrderProduct = ci.id;
        item.loEntityId = loEnt.idLoEntity;
        item.itemIdx = i;
        item.deliveryCost = await this.repo.getDeliveryCost(ci, loEnt.idLoEntity);
        item.deliveryDate = await this.repo.getDeliveryDate(ci, loEnt.idLoEntity);
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
    else {
      // Выбранные опции запихиваем в массив выбранных опций
      this.cart.loResultDeliveryOptions = [];
      this.cart.loDeliveryOptions.forEach(i => {
          if (i.isChecked) {
            this.cart.loResultDeliveryOptions.push(i);
            this.evServ.events['cartUpdateEvent'].emit();
          }
        }
      );
      this.navCtrl.push('SelectPmtMethodPage');
    };
  }
}
