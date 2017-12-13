import { Component} from '@angular/core';
import {App, NavController, IonicPage} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service/index";

@IonicPage({name: 'HomePage', segment: 'home'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
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

  public content:string='';

  constructor(public app: App, public nav: NavController,
              private _repo:AbstractDataRepository) {
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

  async ngOnInit() {
    super.ngOnInit();
    this.content = await this._repo.getContent(1);
  }
}
