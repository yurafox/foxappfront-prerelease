import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AbstractDataRepository} from "./service/index";


import {
  AboutPage,
  AccountPage,
  HomePage,
  SupportPage,
  LoginPage,
  CategoriesPage,
  MapPage,
  MyOrderPage
} from '../pages/index';

import {ComponentBase} from "../components/component-extension/component-base";

export interface PageInterface {
  title: string;
  name?: string;
  component: any;
  icon?: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class FoxApp extends ComponentBase {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  appPages = [
    {title: 'Главная', name: 'Home', component: HomePage, index: 0, icon: 'ios-home-outline'},
    {title: 'Категории', name: 'Categories', component: CategoriesPage, index: 1, icon: 'ios-list-outline'},
    /*{title: 'Ваши Заказы', name: 'Orders', component: MyOrderPage, index: 2, icon: 'ios-cart-outline'},*/
    {title: 'Профиль', name: 'Account', component: AccountPage, index: 3, icon: 'ios-person-outline'},
  ];
  infoPages = [
    {title: 'Магазины на карте', name: 'Map', component: MapPage, index: 0, icon: 'ios-map-outline'},
    {title: 'О нас', name: 'About', component: AboutPage, index: 1, icon: 'ios-information-circle-outline'},
    {title: 'Поддержка', name: 'Support', component: SupportPage, index: 2, icon: 'ios-text-outline'}
  ];


  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen, public menuCtrl: MenuController,
              private repo: AbstractDataRepository) {
    super();
    this.rootPage = HomePage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  async ngOnInit() {
    super.ngOnInit();
    if(!this.userService.isAuth && this.userService.isNotSignOutSelf()){
      await this.userService.shortLogin();
    }

  }

  openPage(page: PageInterface) {

    if ((this.userService.isAuth === false) && (page.component === AccountPage)) {
      this.nav.setRoot(LoginPage).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    } else {
      this.nav.setRoot(page.component).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    /*if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }*/
  }

  signOut() {
    this.userService.logOut();
    this.nav.setRoot(HomePage);
    this.menuCtrl.close();
  }
}

