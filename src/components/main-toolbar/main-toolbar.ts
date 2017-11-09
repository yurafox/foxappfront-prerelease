import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {CartPage, HomePage} from '../../pages/index';

@Component({
  selector: 'main-toolbar',
  templateUrl: 'main-toolbar.html'
})
export class MainToolbarComponent {

  text: string;

  constructor(public nav: NavController) {
  }

  goToCart(): void {
    console.log('Go to cart');
    this.nav.setRoot(CartPage);
  }

  goToHome(): void {
    console.log('Go to home click');
    this.nav.setRoot(HomePage);
  }
}
