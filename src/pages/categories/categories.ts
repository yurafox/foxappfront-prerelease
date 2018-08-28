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

  categoriesArray:Category[]=[];
  public  categoryForShow:Category[]=[];
  public canAllCategoryView:boolean=false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _repo: AbstractDataRepository,
              public _sanitizer: DomSanitizer) {
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
  public sortDesc():void {
    //this.categoriesArray.sort((x,y)=>{return y.priority_index-x.priority_index;});
    this.categoryForShow.sort((x,y)=>{return y.priority-x.priority;});
  }
}
