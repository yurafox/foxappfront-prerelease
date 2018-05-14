import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {Network} from "@ionic-native/network";
import {Subscription} from "rxjs/Subscription";
import {ConnectivityService} from "../../app/service/connectivity-service";

@IonicPage()
@Component({
  selector: 'page-no-connection',
  templateUrl: 'no-connection.html',
})
export class NoConnectionPage extends ComponentBase implements OnInit, OnDestroy {
  private connected: Subscription;

  constructor(private navCtrl: NavController, private network: Network, private connServ: ConnectivityService) {
    super();
    this.initLocalization();
    const index = this.navCtrl.getActive().index;
    const prevPage = this.navCtrl.getByIndex(index-1);
    if ((1 < index) && (prevPage.name !== 'HomePage')) {
      this.navCtrl.remove(index - 1).catch();
    } else if (prevPage && prevPage.name === 'HomePage')  {
      this.navCtrl.remove(index - 1).catch();
      this.navCtrl.insert(index - 1, 'HomePage').catch();
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

  /**
   * Checking network status
   */
  checkAndHandleConnectionState() {
    this.connected = this.network.onConnect().subscribe(data => {
      if (data) {
        if (data.type !== 'none') {
          this.navCtrl.pop();
        }
      }
    }, error => console.error(error));
  }

}
