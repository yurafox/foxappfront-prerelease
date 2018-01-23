import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService, LoDeliveryOption} from '../../app/service/cart-service';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage extends ComponentBase {

  dataLoaded = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cart: CartService, public repo: AbstractDataRepository) {
    super();


  }

  onPlaceOrderClick() {
    console.log('Place Order!');
  }

  onAfterQtyUpdate(item: any, objRef:any): void {
    let j = 0;
    for (let i of this.cart.loDeliveryOptions) {
      if ((i.idClientOrderProduct === objRef.id) && (i.isChecked))  {
        break;
      }
      j++;
    };

    this.repo.getDeliveryCost(objRef, this.cart.loDeliveryOptions[j].loEntityId).then(r => {
        console.log('r: '+ r + ' , j: '+ j);
        this.cart.loDeliveryOptions[j].deliveryCost = r;
      }
    );

    console.log(item);
    console.log(objRef);
    console.log(this.cart.loDeliveryOptions);
    console.log(this.cart.orderProducts);

  }
}
