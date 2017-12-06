import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

@IonicPage({name: 'AboutPage', segment: 'about'})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
