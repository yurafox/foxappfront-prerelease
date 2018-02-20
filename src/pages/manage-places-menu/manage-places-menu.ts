import {Component} from '@angular/core';
import {Nav, Platform, MenuController, IonicPage} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";

export interface PageInterface {
  title: string;
  name?: string;
  component?: any;
  icon?: string;
  index?: number;
}

@IonicPage({name: 'ManagePlacesMenuPage'})
@Component({
  templateUrl: 'manage-places-menu.html'
})
export class ManagePlacesMenuPage extends ComponentBase {

  places: PageInterface[] = [
    {
      title: 'Адреса доставки',
      name: 'SelectShipAddress',
      component: 'SelectShipAddressPage',
      icon: 'ios-home-outline',
      index: 0
    },
    {
      title: 'Избранные магазины',
      name: 'FavoriteStores',
      component: 'FavoriteStoresPage',
      icon: 'md-star-outline',
      index: 1
    }
  ];

  constructor(private platform: Platform, private nav: Nav,
              public menuCtrl: MenuController) {
    super();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }

  ionViewDidLoad() {
  }

  async ngOnInit() {
    super.ngOnInit();
    if (!this.userService.isAuth && this.userService.isNotSignOutSelf()) {
      await this.userService.shortLogin();
    }
  }

  openPage(page: PageInterface) {
    if (page.component === 'SelectShipAddressPage') {
      this.nav.push('SelectShipAddressPage', {fromCart: 0}).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    } else {
      this.nav.push(page.component).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
  }

}

