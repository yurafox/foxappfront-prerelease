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
    setTimeout(() =>
        {
          this.searchButtonControl.setFocus();
          this.searchButtonControl.disabled = false;
        },
      150);

//    console.log(this.searchButtonControl.searchService.searchItems.length);

  }

  deleteSearchItem(index: number) {
    this.searchButtonControl.removeSearchItem(index);
  }

}
