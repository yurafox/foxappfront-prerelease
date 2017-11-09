import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CategoryPage} from '../category/category';
import {CategoryService} from "../../services/mock-services/category-service";

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  // list of categories
  public categories: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryService: CategoryService) {
    this.categories = categoryService.getAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  onCategoryClick(categoryId): void {
    this.navCtrl.setRoot(CategoryPage, {id: categoryId}, {animate: true, direction: 'forward', duration: 500});
    console.log('Category item click');
  }

}
