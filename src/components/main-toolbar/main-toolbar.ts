import {Component, Input} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";
import {CartService} from '../../app/service/cart-service';
import {PageMode} from '../../pages/home/home';

@Component({
  selector: 'main-toolbar',
  templateUrl: 'main-toolbar.html'
})
export class MainToolbarComponent {

  @Input()
  showCartIcon = true;

  @Input()
  showCloseIcon = false;

  @Input()
  host = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public cart: CartService, public viewCtrl: ViewController) {}

  goToCart() {
    if (!(this.navCtrl.getActive().name === 'CartPage'))
      this.navCtrl.push('CartPage');
  }

  goToHome() {
    if (this.host) {
      this.host.pageMode = PageMode.HomeMode;
      this.host.searchButtonControl.clearInput(null);
    } else if (this.showCloseIcon === true) {
      this.viewCtrl.dismiss();
    }
    else
      this.navCtrl.setRoot('HomePage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
