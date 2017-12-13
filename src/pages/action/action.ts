import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
})
export class ActionPage {
  public actionId:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.actionId = this.navParams.data;
  }

}
