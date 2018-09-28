import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertController, NavController, Platform} from "ionic-angular";
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

  constructor(public alertCtrl: AlertController, public device: Device, public platform: Platform) {
    this.count = 0;
  }

  handleError(error) {
    this.handleNoConnection(error);
    throw error;
 }

  public handleNoConnection(error?: any) {
    let activePage = this.navCtrl ? this.navCtrl.getActive() : undefined;
    this.makeCordovaBehavior(activePage,error);

    //if (!this.device.cordova && !this.platform.is('ios')) this.makeBrowserBehavior(error);
  }

  public showNoConnectionPage(error: any) {
    if (this.count < 1) {
      this.count++;
      this.navCtrl.setRoot('NoConnectionPage', {error: error}).catch();
    }
  }

  public checkActivePage(activePage:any):boolean {
    return activePage && activePage.name !== 'NoConnectionPage';
  }

  public makeBrowserBehavior(error?: Error):void {
    console.error(error);
    let alert = this.alertCtrl.create({
      title: 'Trouble',
      message: error.message + ' : ' + error.stack,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present().catch((err) => console.log(`Alert error: ${err}`));
  }

  public makeCordovaBehavior(activePage:any,error: any) {
    console.error(error.message + ' : ' + error.stack);
     if(this.checkActivePage(activePage))
       this.showNoConnectionPage(error);
  }

}
