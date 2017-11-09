import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-tab-filter',
  templateUrl: 'tab-filter.html'
})
export class TabFilterPage {
  // set filter value
  public filter = {
    shipTo: ''
  }

  constructor(public nav: NavController, public viewCtrl: ViewController) {
  }

}
