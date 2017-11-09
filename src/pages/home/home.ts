import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import {SearchBtnComponent} from '../../components/search-btn/search-btn'

import {CategoryService} from "../../services/mock-services/category-service";
import {ItemService} from "../../services/mock-services/item-service";

import {CartPage, CategoriesPage, CategoryPage, ItemPage, SearchPage} from "../index";

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

  constructor(public app: App, public nav: NavController, public categoryService: CategoryService, public itemService: ItemService) {
    this.categories = categoryService.getAll();

    this.items = itemService.getAll();
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
    this.nav.push(ItemPage, {id: itemId})
  }

}
