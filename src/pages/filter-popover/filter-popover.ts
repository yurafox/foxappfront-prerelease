import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FilterComponent} from '../../components/filter/filter';

@IonicPage()
@Component({
  selector: 'page-filter-popover',
  templateUrl: 'filter-popover.html',
})
export class FilterPopoverPage {

  public filter: FilterComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.filter = navParams.get('filterControl');

  }

  close(): void {
    this.viewCtrl.dismiss();
  }

}
