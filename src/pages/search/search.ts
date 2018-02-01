import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage extends ComponentBase {

  @ViewChild('srch') searchButtonControl;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
  }

  deleteSearchItem(event: any, item: string) {
    event.stopPropagation();
    this.searchButtonControl.removeSearchItem(item);
  }

  search(srchString: string): void {
    this.searchButtonControl.searchByText(srchString);
  }

}
