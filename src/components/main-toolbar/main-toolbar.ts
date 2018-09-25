import {Component, Input, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, Navbar} from "ionic-angular";
import {CartService} from '../../app/service/cart-service';
import {PageMode} from '../../pages/home/home';

@Component({
  selector: 'main-toolbar',
  templateUrl: 'main-toolbar.html'
})
export class MainToolbarComponent {
  @ViewChild('navbar') navbar: Navbar;

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
      this.navCtrl.push('CartPage', {},{animate: false}).catch(console.error);
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
      this.navCtrl.setRoot('HomePage', {pageMode: PageMode.HomeMode}).catch(console.error);
  }

  close() {
    this.viewCtrl.dismiss().catch(console.error);
  }

  async showSearch() {
    this.navCtrl.push('HomePage', {pageMode: PageMode.SearchMode}, {animate: false}).catch(console.error);
  }

}
