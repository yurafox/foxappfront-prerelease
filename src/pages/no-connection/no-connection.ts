import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ConnectivityService} from '../../app/service/connectivity-service';

@IonicPage()
@Component({
  selector: 'page-no-connection',
  templateUrl: 'no-connection.html',
})
export class NoConnectionPage extends ComponentBase implements OnInit, OnDestroy {

  constructor(public navCtrl: NavController, public navParam: NavParams,
              public connServ: ConnectivityService) {
    super();
    this.initLocalization();
    if (this.navParam.data.error) {
      console.log(JSON.stringify(this.navParam.data.error));
    }
  }

  ngOnDestroy() {
    this.connServ.counter = 0;
  }
  ionViewWillLeave() {
    this.connServ.counter = 0;
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage', {pageMode: 1}).catch(()=>console.log('NoConnectionPage setRoot error'));
  }

}
