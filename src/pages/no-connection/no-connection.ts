import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Network} from '@ionic-native/network';
import {Subscription} from 'rxjs/Subscription';
import {ConnectivityService} from '../../app/service/connectivity-service';

@IonicPage()
@Component({
  selector: 'page-no-connection',
  templateUrl: 'no-connection.html',
})
export class NoConnectionPage extends ComponentBase implements OnInit, OnDestroy {
  connected: Subscription;

  constructor(public navCtrl: NavController, public navParam: NavParams, public network: Network, public connServ: ConnectivityService) {
    super();
    this.initLocalization();
    if (this.navParam.data.error) {
      console.error(this.navParam.data.error);
    }
  }

  async ngOnInit() {
    this.checkAndHandleConnectionState();
  }
  ngOnDestroy() {
    this.connServ.counter = 0;
    if (this.connected) this.connected.unsubscribe();
  }
  ionViewWillLeave() {
    this.connServ.counter = 0;
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage', {pageMode: 1}).catch(()=>console.log('NoConnectionPage setRoot error'));
  }

  /**
   * Checking network status
   */
  checkAndHandleConnectionState() {
    this.connected = this.network.onConnect().subscribe(data => {
      if (data && data.type !== 'none') {
        this.navCtrl.setRoot('HomePage').catch(() => console.log('NoConnectionPage setRoot error'));
      }
    }, error => console.error(error));
  }

}
