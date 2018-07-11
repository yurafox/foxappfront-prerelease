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
  showSearchButton = true;

  @Input()
  host = null;

  @Input()
  disableHeaderClickHandler = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public cart: CartService, public viewCtrl: ViewController) {}

  goToCart() {
    if (!(this.navCtrl.getActive().name === 'CartPage'))
      this.navCtrl.push('CartPage');
  }

  goToHome() {
    if (this.disableHeaderClickHandler)
      return;

    if (this.host) {
      if (this.host.pageMode !== PageMode.HomeMode) {
        this.host.searchButtonControl.clearInput(null);
        this.host.initData();
      }
    }
    else
      this.navCtrl.setRoot('HomePage', {pageMode: PageMode.HomeMode});
  }

  close() {
    this.viewCtrl.dismiss();
  }

  async showSearch() {
    this.navCtrl.push('HomePage', {pageMode: PageMode.SearchMode});
  }

}
