import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage({name: 'CategoriesPage', segment: 'categories'})
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})

export class CategoriesPage extends ComponentBase   {

  categoriesArray = [
    {categoryImg: 'assets/icon/phone.svg', caption: 'Cмартфоны и телефоны', url: 'mobilnye_telefony.html'},
    {categoryImg: 'assets/icon/tv.svg', caption: 'Телевизоры', url: 'led_televizory.html'},
    {categoryImg: 'assets/icon/computer.svg', caption: 'Ноутбуки', url: ''},
    {categoryImg: 'assets/icon/fridge.svg', caption: 'Холодильники', url: ''},
    {categoryImg: 'assets/icon/washer.svg', caption: 'Стиральные машины', url: ''},
    {categoryImg: 'assets/icon/heater.svg', caption: 'Обогреватели', url: ''},
    {categoryImg: 'assets/icon/vaccleaner.svg', caption: 'Пылесосы', url: ''},
    {categoryImg: 'assets/icon/microwave.svg', caption: 'Микроволновки', url: ''}
  ] ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
  }

  onCategoryClick(urlQueryString: string): void {
    if (urlQueryString)
      this.navCtrl.push('CategoryPage', urlQueryString); // {animate: true, direction: 'forward', duration: 500});
  }

}
