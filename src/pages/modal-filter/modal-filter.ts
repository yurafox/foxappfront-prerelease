import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TabFilterPage, TabAttributePage} from "../index";

@Component({
  selector: 'page-modal-filter',
  templateUrl: 'modal-filter.html'
})

export class ModalFilterPage {
  // tabs
  public tabFilter = TabFilterPage;
  public tabAttribute = TabAttributePage;
  public selectedIndex = 0;

  constructor(public nav: NavController, public navParams: NavParams) {
    if (navParams.get('tabName') == 'Атрибуты') {
      this.selectedIndex = 1
    }
  }
}
