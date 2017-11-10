import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CategoryPage} from '../category/category';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
<<<<<<< HEAD
export class CategoriesPage {
  // list of categories
  public categories: any;
=======
export class CategoriesPage  {
>>>>>>> fox-app/yurafox

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  onCategoryClick(): void {
    this.navCtrl.setRoot(CategoryPage, 1); // {animate: true, direction: 'forward', duration: 500});
    console.log('Category item click');
  }

}
