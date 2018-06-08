import {Component} from '@angular/core';
import {Nav, IonicPage} from 'ionic-angular';
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
  name?: string;
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
     {title: 'YourOrders', name: 'Ваши заказы', component: 'OrdersPage', index: 0},
     {title: 'YourFoxClubBalance', name: 'Ваш баланс пользователя ФоксКлуб', component: 'BalancePage', index: 1},
     {title: 'YourFoxClubCard', name: 'Ваша виртуальная карта ФоксКлуб', component: 'BarcodePage', index: 2},
   ];
  accountSettingsPages: PageInterface[] = [
     {title: 'Login&Security', name: 'Авторизация и Безопасность', component: 'AccountPage', index: 0},
     {title: 'ChangePassword', name: 'Сменить пароль', component: 'ChangePasswordPage', index: 1},
     {title: 'ManageYourPlaces', name: 'Управление адресами', component: 'ManagePlacesMenuPage', index: 2},
     {title: 'LegalPolicy', name: 'Пользовательское соглашение', component: 'LegalPolicyPage', index: 3},
   ];
  // Categories of pages
  accountMenu: MenuPageInterface[] = [
     {title: 'Shopping', name: 'Покупки', pages: this.ordersPages, index: 0},
     {title: 'Settings', name: 'Настройки', pages: this.accountSettingsPages, index: 1}
   ];

  constructor(private nav: Nav) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
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

