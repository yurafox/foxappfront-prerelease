import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Network} from "@ionic-native/network";
import {AlertController, NavController} from "ionic-angular";
import {NoConnectionPage} from "../../pages/no-connection/no-connection";
import {Device} from '@ionic-native/device';

@Injectable()
export class ConnectivityService {
  public navCtrl: NavController;
  public count: number;

  public set nav(nav: NavController) {
    this.navCtrl = nav;
  }

  public set counter(count: number) {
    this.count = count;
  }

  public get counter(): number {
    return this.count;
  }

  constructor(public network: Network, public alertCtrl: AlertController, public device: Device) {
    this.count = 0;
  }
  public checkConnection(error?: any) {
    let activePage = this.navCtrl ? this.navCtrl.getActive() : undefined;
    this.makeCordovaBehavior(activePage,error);

    if (!this.device.cordova) this.makeBrowserBehavior(error);
  }

  public showNoConnectionPage(error: any) {
    if (this.count < 1) {
      this.count++;
      this.navCtrl.setRoot('NoConnectionPage', {error: error}).catch();
    }
  }

  public checkActivePage(activePage:any):boolean {
    let verifyNetwork = this.network && this.network.type==='none';
    let verifyActPage = activePage && activePage.name !== 'NoConnectionPage';
    return verifyNetwork && verifyActPage;
  }

  public makeBrowserBehavior(error?: Error):void {
    let alert = this.alertCtrl.create({
      title: 'Trouble',
      message: error.message,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present().catch((err) => console.log(`Alert error: ${err}`));
  }

  public makeCordovaBehavior(activePage:any,error: any) {
     if(this.checkActivePage(activePage))
       this.showNoConnectionPage(error);
  }

}