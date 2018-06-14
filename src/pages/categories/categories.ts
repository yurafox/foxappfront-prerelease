import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {Category} from '../../app/model/category';

@IonicPage({name: 'CategoriesPage', segment: 'categories'})
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})

export class CategoriesPage extends ComponentBase   {

  private categoriesArray:Category[]=[];
  public  categoryForShow:Category[]=[];
  public canAllCategoryView:boolean=false;
  // categoriesArray = [
  //   {categoryImg: 'assets/icon/phone.svg', caption: 'Cмартфоны и телефоны', url: 'mobilnye_telefony.html'},
  //   {categoryImg: 'assets/icon/tv.svg', caption: 'Телевизоры', url: 'led_televizory.html'},
  //   {categoryImg: 'assets/icon/computer.svg', caption: 'Ноутбуки', url: ''},
  //   {categoryImg: 'assets/icon/fridge.svg', caption: 'Холодильники', url: ''},
  //   {categoryImg: 'assets/icon/washer.svg', caption: 'Стиральные машины', url: ''},
  //   {categoryImg: 'assets/icon/heater.svg', caption: 'Обогреватели', url: ''},
  //   {categoryImg: 'assets/icon/vaccleaner.svg', caption: 'Пылесосы', url: ''},
  //   {categoryImg: 'assets/icon/microwave.svg', caption: 'Микроволновки', url: ''}
  // ] ;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _repo: AbstractDataRepository,
              private _sanitizer: DomSanitizer) {
    super();

  }

  async ngOnInit(){
    super.ngOnInit();
    this.categoriesArray = await this._repo.getCategories();
    if(this.categoriesArray && this.categoriesArray.length!=0) {
      this.categoryForShow = this.categoriesArray.filter((value:Category): boolean => {
        return value.is_show;
     });

      this.sortDesc();
      this.canAllCategoryView = true;
    }
  }

  onCategoryClick(categoryId: number) {
    if (categoryId)
      this.navCtrl.push('CategoryPage', categoryId); // {animate: true, direction: 'forward', duration: 500});
  }

  public convertImg(imgTxt:string):any {
    let header:string = 'data:image/svg+xml;charset=utf-8;base64,';
    return this._sanitizer.bypassSecurityTrustResourceUrl(`${header}${imgTxt}`);
  }

  public toCategoryTree(){
    this.navCtrl.push('CategoryTreePage',{groups:this.categoriesArray});
  }
  private sortDesc():void {
    //this.categoriesArray.sort((x,y)=>{return y.priority_index-x.priority_index;});
    this.categoryForShow.sort((x,y)=>{return y.priority_show-x.priority_show;});
  }
}
