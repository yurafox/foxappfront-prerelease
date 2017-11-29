import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';

import {CategoriesPage, CategoryPage} from '../index';
import {SearchPage} from '../search/search';

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

  // view a category
  viewCategory(catId) {
    this.nav.push(CategoryPage, {id: catId});
  }

  // view a item
  viewItem(itemId) {
    this.nav.push(CategoryPage, {id: itemId})
  }

  onSearchClick() {
    this.nav.push(SearchPage);
  }
}
