import { Component } from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {CartPage, HomePage} from '../../pages/index';
import {CartService} from '../../app/service/cart-service';

@Component({
  selector: 'main-toolbar',
  templateUrl: 'main-toolbar.html'
})
export class MainToolbarComponent {

  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public cart: CartService) {}

  goToCart(): void {
    if (!(this.navCtrl.getActive().name === 'CartPage'))
      this.navCtrl.push(CartPage);
  }

  goToHome(): void {
    if (!(this.navCtrl.getActive().name === 'HomePage')) {
      this.navCtrl.setRoot(HomePage);
    }
  }
}
