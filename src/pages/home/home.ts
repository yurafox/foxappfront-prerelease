import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import {SearchBtnComponent} from '../../components/search-btn/search-btn'

import {CategoriesPage} from "../index";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // list slides for slider
  public slides = [
    {
      src: 'assets/imgs/actions/action3.jpg'
    },
    {
      src: 'assets/imgs/actions/action2.jpg'
    },
    {
      src: 'assets/imgs/actions/action1.jpg'
    }
  ];


  constructor(public app: App, public nav: NavController) {
  }

  // view categories
  viewCategories() {
    this.nav.push(CategoriesPage);
  }

}
