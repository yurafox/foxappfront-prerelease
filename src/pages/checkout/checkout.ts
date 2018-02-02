import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService, LoDeliveryOption} from '../../app/service/cart-service';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

declare var PMWidget: any;

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage extends ComponentBase {

  dataLoaded = true;
  formInput: any;
  pmtMethodID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cart: CartService,
              public repo: AbstractDataRepository, private modalCtrl: ModalController) {
    super();
    this.pmtMethodID = this.cart.pmtMethod.id;
  }

  validatePage(): {isValid: boolean, errors: string[]} {
    let err = [];
    if (this.cart.pmtMethod.id === 3)
      this.cart.validateLoan(this.cart.cartGrandTotal).validationErrors.forEach(i => {err.push(i)});
    this.cart.orderProducts.forEach(i => {
      if(i.errorMessage)
        err.push(i.errorMessage);
    });
    return {isValid: !(err.length>0), errors: err};
  }

  async onPlaceOrderClick() {
    console.log('Place Order!');
    /**
     * Pay Systems for PayMaster:
     * 21 - Visa/MasterCard;
     * 1  - WebMoney;
     * 6  - MoneXy
     **/
    if (this.pmtMethodID === 2) {
      this.formInput = await this.repo.getDataForRedirectToPaymaster(this.cart.order.id, this.cart.cartGrandTotal, 21);
      console.log(this.formInput);
      this.navCtrl.push('PaymentPage',this.formInput);
      /*const modal = this.modalCtrl.create('PaymentPage',this.formInput);
      modal.present();
      modal.onDidDismiss(() => {console.log('dismissed')});*/
      /*let f = this.formInput;
      let lang: string;
      switch(this.userService.lang) {
        case 1: {lang = 'ru'; break;}
        case 2: {lang = 'uk'; break;}
        case 3: {lang = 'en'; break;}
        default: lang = 'ru';
      }
      PMWidget.init({
        //embedTarget: '#paymaster',
        mode: 'popup',
        params: {
          "LMI_MERCHANT_ID": f.LMI_MERCHANT_ID,
          "LMI_PAYMENT_NO": f.LMI_PAYMENT_NO,
          "LMI_PAYMENT_AMOUNT": f.LMI_PAYMENT_AMOUNT,
          "LMI_PAYMENT_DESC": f.LMI_PAYMENT_DESC
        },
        closeOnFail: true,
        language: lang
      })
        .on('ready', function() {
          console.log('READY');
        })
        .on('success', function() {
          console.log('SUCCESS');
        })
        .on('fail', function(params) {
          console.log('FAIL ' + params.message);
        })
        .on('close', function() {
          console.log('CLOSE');
        })
        .on('error', function(err) {
          console.log('ERROR '+err);
        })
      ;*/
    }
  }

  onAfterQtyUpdate(item: any, objRef:any): void {
    let j = 0;
    for (let i of this.cart.loResultDeliveryOptions) {
      if (i.idClientOrderProduct === objRef.id)  {
        break;
      }
      j++;
    }

    this.repo.getDeliveryCost(objRef, this.cart.loResultDeliveryOptions[j].loEntityId).then(r => {
        this.cart.loResultDeliveryOptions[j].deliveryCost = r;
      }
    );
    this.evServ.events['cartItemsUpdateEvent'].emit();
    this.evServ.events['cartUpdateEvent'].emit();

  }

  onShowBalanceClick() {
    this.navCtrl.push('BalancePage');
  }

}
