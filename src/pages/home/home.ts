import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SearchBtnComponent} from '../../components/search-btn/search-btn'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
