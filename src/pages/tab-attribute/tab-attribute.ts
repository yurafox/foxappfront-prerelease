import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-tab-attribute',
  templateUrl: 'tab-attribute.html'
})
export class TabAttributePage {
  // all attributes
  public attr = {
    category: 1,
    sleeve: '',
    fabric: ''
  }

  constructor(public nav: NavController, public viewCtrl: ViewController) {
  }

}
