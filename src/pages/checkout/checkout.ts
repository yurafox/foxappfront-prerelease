import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

declare var PMWidget: any;

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage extends ComponentBase {

  dataLoaded = true;
  pmtMethodID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cart: CartService,
              public repo: AbstractDataRepository) {
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

    if (this.pmtMethodID === 2) {
      this.navCtrl.push('PaymentResultPage').catch(err => console.error(err));
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
    this.evServ.events['cartUpdateEvent'].emit();
  }

}
