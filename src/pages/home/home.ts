import {Component} from '@angular/core';
import {App, NavController, IonicPage} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service";

@IonicPage({name: 'HomePage', segment: 'home'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends ComponentBase {
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


  constructor(public app: App, public nav: NavController, private repo: AbstractDataRepository) {
    super();
  }

  // view categories
  viewCategories() {
    this.nav.push('CategoriesPage');
  }

  // view a category
  viewCategory(catId) {
    this.nav.push('CategoryPage', {id: catId});
  }

  // view a item
  viewItem(itemId) {
    this.nav.push('CategoryPage', {id: itemId})
  }

  onSearchClick() {
    this.nav.push('SearchPage');
  }

}
