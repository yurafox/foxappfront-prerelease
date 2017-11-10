import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-modal-item-option',
  templateUrl: 'modal-item-option.html'
})
export class ModalItemOptionPage {

  constructor(public nav: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {

  }

}
