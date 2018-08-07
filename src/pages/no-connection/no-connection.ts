import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponentBase } from '../../components/component-extension/component-base';
import { ConnectivityService } from '../../app/service/connectivity-service';
import { CartService } from '../../app/service/cart-service';
import { SearchService } from '../../app/service/search-service';
import { UserService } from '../../app/service/bll/user-service';
import { AbstractLocalizationRepository } from '../../app/service/repository/abstract/abstract-localization-repository';

@IonicPage()
@Component({
  selector: 'page-no-connection',
  templateUrl: 'no-connection.html',
})
export class NoConnectionPage extends ComponentBase implements OnInit, OnDestroy {

  constructor(public navCtrl: NavController, public navParam: NavParams,
              public connServ: ConnectivityService, public searchServ: SearchService, 
              public cartServ: CartService, public userServ: UserService,
              public locRepo: AbstractLocalizationRepository) {
    super();
    this.initLocalization();
    if (this.navParam.data.error) {
      console.log(JSON.stringify(this.navParam.data.error));
    }
  }

  async ngOnDestroy() {
    this.connServ.counter = 0;
    this.locRepo.setLocalization();
    this.searchServ.initData();
    this.cartServ.initCart();
    if (!this.userService.isAuth && this.userService.token) {
      this.userService.userMutex = true;
      await this.userService.shortLogin();
      this.userService.userMutex = false;
    }
  }
  ionViewWillLeave() {
    this.connServ.counter = 0;
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage', {pageMode: 1}).catch(()=>console.log('NoConnectionPage setRoot error'));
  }

}
