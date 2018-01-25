import {Component, Input} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";
import {CartPage, HomePage} from '../../pages/index';
import {CartService} from '../../app/service/cart-service';

@Component({
  selector: 'main-toolbar',
  templateUrl: 'main-toolbar.html'
})
export class MainToolbarComponent {

  @Input()
  showCartIcon = true;

  @Input()
  showCloseIcon = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public cart: CartService, public viewCtrl: ViewController) {}

  goToCart(): void {
    if (!(this.navCtrl.getActive().name === 'CartPage'))
      this.navCtrl.push(CartPage);
  }

  goToHome(): void {
    if (!(this.navCtrl.getActive().name === 'HomePage')) {
      this.navCtrl.setRoot(HomePage);
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
