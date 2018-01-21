import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
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

}
