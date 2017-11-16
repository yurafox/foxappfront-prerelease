import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage extends ComponentBase implements OnInit {

  isDisabled = false;
  @ViewChild('srch') input;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
  }


  ngOnInit() {
    setTimeout(() =>
        { this.input.setFocus(); },
      150);
    console.log(this.input.searchService.searchItems.length);



  }



}
