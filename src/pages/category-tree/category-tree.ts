import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import { ComponentBase } from '../../components/component-extension/component-base';
import {Category} from '../../app/model/category';

@IonicPage()
@Component({
  selector: 'page-category-tree',
  templateUrl: 'category-tree.html',
})
export class CategoryTreePage extends ComponentBase {
  groups: Category[] = [];
  currentGroup: Category[] = [];
  private rootId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _sanitizer: DomSanitizer,
              public _repo: AbstractDataRepository) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.groups = await this._repo.getCategories();
    this.rootId = parseInt(await this._repo.getAppParam('CATEGORY_ROOT_ID'));

    if (this.groups && this.groups.length != 0) {
      this.setCurrentCategoryList();
    }
  }


  public toChildCategory(id:number) {
    const recursionGroup = this.groups.filter((value:Category): boolean => {
      return value.id_parent_group === id;
    });
    if(recursionGroup && recursionGroup.length!=0)
      this.navCtrl.push('CategoryTreePage', { groups:this.groups,currentGroup:recursionGroup});
    else this.navCtrl.push('CategoryPage',id);
  }


  setCurrentCategoryList(): void
  {
     const isChildLevel = !!this.navParams.data.currentGroup;
     this.currentGroup = (!isChildLevel) ? this.buildRootTree()
                                         : this.navParams.data.currentGroup;
  }

  buildRootTree():Category[] {    
    const filteredArray=this.groups.filter((value:Category): boolean => {
            return value.id_parent_group === this.rootId;
      });

    if(filteredArray && filteredArray.length!=0) {
      filteredArray.sort((x,y)=>{return x.priority-y.priority;}); // Should be x-y
    }

    return filteredArray;
  }

  public convertImg(imgTxt:string):any {
    if (!imgTxt || imgTxt === '') return;
    let header:string = 'data:image/svg+xml;charset=utf-8;base64,';
    return this._sanitizer.bypassSecurityTrustResourceUrl(`${header}${imgTxt}`);
  }
}
