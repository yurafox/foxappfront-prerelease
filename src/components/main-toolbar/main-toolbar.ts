import { Component } from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {CartPage, HomePage} from '../../pages/index';

@Component({
  selector: 'main-toolbar',
  templateUrl: 'main-toolbar.html'
})
export class MainToolbarComponent {

  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToCart(): void {
    console.log('Go to cart');
    this.navCtrl.setRoot(CartPage);
  }

  goToHome(): void {
    if (!(this.navCtrl.getActive().name === 'HomePage')) {
      this.navCtrl.setRoot(HomePage);
    }
  }
}
