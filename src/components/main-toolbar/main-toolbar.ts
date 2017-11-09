import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../../pages/home/home';

/**
 * Generated class for the MainToolbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'main-toolbar',
  templateUrl: 'main-toolbar.html'
})
export class MainToolbarComponent {

  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToCart(): void {
    console.log('Go to cart');
  }

  goToHome(): void {
    if (!(this.navCtrl.getActive().name === 'HomePage')) {
      this.navCtrl.setRoot(HomePage);
    }
  }
}
