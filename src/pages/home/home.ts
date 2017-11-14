import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import {SearchBtnComponent} from '../../components/search-btn/search-btn'

import {CartPage, CategoriesPage, CategoryPage} from '../index';

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

  // list categories
  public categories: any;

  // list of items
  public items: any;

  constructor(public app: App, public nav: NavController) {
    this.categories = [];

    this.items = [];
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

}
