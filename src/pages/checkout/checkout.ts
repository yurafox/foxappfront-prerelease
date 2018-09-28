import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ComponentBase } from '../../components/component-extension/component-base';
import { CartService } from '../../app/service/cart-service';
import { Shipment } from '../../app/model/shipment';
import { AppConstants } from '../../app/app-constants';
import {AbstractLoRepository} from "../../app/service/repository/abstract/abstract-lo-repository";
import {AbstractFinRepository} from "../../app/service/repository/abstract/abstract-fin-repository";

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage extends ComponentBase {

  dataLoaded = true;
  pmtMethodName = '';
  mPlaceFeaturesEnabled = AppConstants.ENABLE_MARKETPLACE_FEATURES;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cart: CartService,
              public paymentRepo: AbstractFinRepository, public loRepo: AbstractLoRepository,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController)
  {
    super();
  }
  
  async ngOnInit() {
    super.ngOnInit();
    let pmt = await this.paymentRepo.getPmtMethodById(this.cart.order.idPaymentMethod);
    if (pmt)
      this.pmtMethodName = pmt.name;
  }

  get continueBtnEnabled(): boolean {
    return ((this.validatePage().isValid) && !(this.cart._httpCallInProgress));
  }

  validatePage(): {isValid: boolean, errors: string[]} {

    let err = [];
    if (this.cart.order) {
      if (this.cart.order.idPaymentMethod === 3)
        this.cart.validateLoan(this.cart.cartGrandTotal).validationErrors.forEach(i => {err.push(i)});
      this.cart.orderProducts.forEach(i => {
        if(i.errorMessage)
          err.push(i.errorMessage);
      });
    }
    return {isValid: !(err.length>0), errors: err};
  }

  async onPlaceOrderClick() {
    if (this.cart._httpCallInProgress)
      return;

    try
    {
      this.cart._httpCallInProgress = true;
      //Save cart items
      for (let i of this.cart.orderProducts) {
        await this.cart.cartRepo.saveCartProduct(i);
      }

      if (this.cart.order.idPaymentMethod === 2) {
        this.navCtrl.push('PaymentPage').catch(err => console.error(err));
      }
      else
       {
        let res = await this.cart.cartRepo.postOrder(this.cart.order);

        if ((res) && (res.isSuccess))
        {
          //console.log('Success!!!!');

          let title = this.locale['AlertTitle'];
          let message = this.locale['AlertMessage'];
          let btnText = this.locale['BtnText'];
          let alert = this.alertCtrl.create({
            title: title,
            message: message,
            enableBackdropDismiss:false,
            buttons: [
              {
                text: btnText,
                handler: () => {
                  this.navCtrl.setRoot('HomePage').catch(console.error);
                  this.cart.initCart().catch(console.error);
                }
              }
            ]
          });
          alert.present().catch(console.error);
        }
        else
        {
          //console.log(res.errorMessage);
          let title = this.locale['AlertErrorTitle'];
          let message = this.locale['AlertErrorMessage']; // + ' ' + res.errorMessage;
          let btnText = this.locale['BtnErrorText'];
          let alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
              {
                text: btnText,
                handler: () => {
                  //this.cart.emptyCart();
                  this.cart.initCart().then(() => {
                      this.navCtrl.setRoot('CartPage').catch(console.error);
                    }
                  );
                }
              }
            ]
          });
          alert.present().catch(console.error);
        }
      }
    }
    finally
    {
      this.cart._httpCallInProgress = false;
    }
  }

  async onAfterQtyUpdate(item: any, objRef:any) {
    try
    {
      this.cart._httpCallInProgress = true;
      let content = this.locale['LoadingContent'];
      let loading = this.loadingCtrl.create({
        content: content
      });
      loading.present().catch(console.error);

      //сохраняем кол-во
      await this.cart.updateItem(objRef, false);

      // пересчитьіваем стоимость и дату доставки
      let spmt: Shipment = null;

      for (let i of this.cart.loShipments) {
        for (let j of i.shipmentItems) {
          if (j.idOrderSpecProd === objRef.id) {
            spmt = i;
            break;
          }
        }
      }

      if (!spmt.idStorePlace) {
        spmt.loDeliveryCost = await this.loRepo.getDeliveryCostByShipment(spmt, spmt.idLoEntity, this.cart.order.loIdClientAddress, spmt.idLoDeliveryType);
        spmt.loEstimatedDeliveryDate = await this.loRepo.getDeliveryDateByShipment(spmt, spmt.idLoEntity, this.cart.order.loIdClientAddress, spmt.idLoDeliveryType);
        spmt = await this.cart.cartRepo.saveShipment(spmt);
      }
      await this.cart.saveOrder(false);

      this.evServ.events['cartUpdateEvent'].emit();
      loading.dismiss().catch(console.error);
    }
    finally {
      this.cart._httpCallInProgress = false;
    }

  }

}
