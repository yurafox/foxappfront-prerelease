import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage extends ComponentBase implements OnInit {

  @ViewChild('srch') searchButtonControl;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
  }

  ngOnInit() {
    //this.searchButtonControl.disabled = false;
  }

  deleteSearchItem(event: any, item: string) {
    event.stopPropagation();
    this.searchButtonControl.removeSearchItem(item);
  }

  search(srchString: string): void {
    this.searchButtonControl.searchByText(srchString);
  }

}
