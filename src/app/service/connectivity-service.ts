import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Network} from "@ionic-native/network";
import {AlertController, NavController} from "ionic-angular";
import {NoConnectionPage} from "../../pages/no-connection/no-connection";
import {Device} from '@ionic-native/device';

@Injectable()
export class ConnectivityService {
  private navCtrl: NavController;
  private count: number;

  public set nav(nav: NavController) {
    this.navCtrl = nav;
  }

  public set counter(count: number) {
    this.count = count;
  }

  public get counter(): number {
    return this.count;
  }

  constructor(private network: Network, private alertCtrl: AlertController, private device: Device) {
    this.count = 0;
  }

  public checkConnection(error?: any) {
    let activePage = this.navCtrl ? this.navCtrl.getActive() : undefined;

    (!this.device.cordova) ? this.makeBrowserBehavior(error) 
                          : this.makeCordovaBehavior(activePage,error); 
  }

  private showNoConnectionPage(error: any) {
    if (this.count < 1) {
      this.count++;
      this.navCtrl.setRoot('NoConnectionPage', {error: error}).catch();
    }
  }

  private checkActivePage(activePage:any):boolean {
    let verifyNetwork = this.network && this.network.type==='none';
    let verifyActPage = activePage && activePage.name !== 'NoConnectionPage';
    return verifyNetwork && verifyActPage;
  }

  private makeBrowserBehavior(error?: Error):void {
    console.error(error.message ? error.message : error);
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

  private makeCordovaBehavior(activePage:any,error: any) {
     if(this.checkActivePage(activePage))
       this.showNoConnectionPage(error);
  }
}
