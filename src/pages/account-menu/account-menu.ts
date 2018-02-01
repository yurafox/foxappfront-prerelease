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
export interface MenuPageInterface {
  title: string;
  pages: PageInterface[];
  index?: number;
}

@IonicPage({name: 'AccountMenuPage'})
@Component({
  templateUrl: 'account-menu.html'
})
export class AccountMenuPage extends ComponentBase {

  // Pages in menu list
  ordersPages: PageInterface[] = [
    {title: 'Your orders', name: 'Orders', component: 'OrdersPage', index: 0},
  ];
  accountSettingsPages: PageInterface[] = [
    {title: 'Login & Security', name: 'LoginAndSecurity', component: 'AccountPage', index: 0},
    {title: 'Your FoxClub member\'s balance', name: 'Balance', component: 'BalancePage', index: 1},
    {title: 'Your virtual FoxClub card', name: 'Barcode', component: 'BarcodePage', index: 2},
    {title: 'Manage your places', name: 'ManagePlaces', component: 'ManagePlacesMenuPage', index: 3},
  ];

  // Categories of pages
  accountMenu: MenuPageInterface[] = [
    {title: 'Orders', pages: this.ordersPages, index: 0},
    {title: 'Account settings', pages: this.accountSettingsPages, index: 1}
  ];

  constructor(private platform: Platform, private nav: Nav,
              public menuCtrl: MenuController) {
    super();
    //this.rootPage = HomePage;
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
    if ((this.userService.isAuth === false) && (page.component === 'AccountPage')) {
      this.nav.push('LoginPage').catch((err: any) => {
        console.log(`Couldn't navigate to LoginPage: ${err}`);
      });
    } else {
      this.nav.push(page.component).catch((err: any) => {
        console.log(`Couldn't push this page: ${page.component.toString()}: ${err}`);
      });
    }
  }

}

