import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponentBase } from "../../components/component-extension/component-base";
import { Category } from './../../app/model/index';
import {DomSanitizer} from "@angular/platform-browser";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";

@IonicPage()
@Component({
  selector: 'page-category-tree',
  templateUrl: 'category-tree.html',
})
export class CategoryTreePage extends ComponentBase {
  private groups: Category[] = [];
  private currentGroup: Category[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _sanitizer: DomSanitizer,
              private _repo: AbstractDataRepository) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.groups = await this._repo.getCategories();

    if (this.groups && this.groups.length != 0) {
      this.setCurrentCategoryList();
    }
  }


  public toChildCategory(id:number) {
    const recursionGroup = this.groups.filter((value:Category): boolean => {
      return value.parent_id === id;
    });
    if(recursionGroup && recursionGroup.length!=0)
      this.navCtrl.push('CategoryTreePage', { groups:this.groups,currentGroup:recursionGroup});
    else this.navCtrl.push('CategoryPage',id);
  }


  private setCurrentCategoryList(): void
  {
     const isChildLevel = !!this.navParams.data.currentGroup;
     this.currentGroup = (!isChildLevel) ? this.buildRootTree()
                                         : this.navParams.data.currentGroup;
  }

  private buildRootTree():Category[] {
    const rootIndex = this.groups.findIndex((value:Category):boolean => {
         return !value.parent_id;
    });

    const rootId = this.groups[rootIndex].id;
    const filteredArray=this.groups.filter((value:Category): boolean => {
            return value.parent_id === rootId;
      });

    if(filteredArray && filteredArray.length!=0) {
      filteredArray.sort((x,y)=>{return y.priority_index-x.priority_index;});
    }

    return filteredArray;
  }

  public convertImg(imgTxt:string):any {
    if (!imgTxt || imgTxt === '') return;
    let header:string = 'data:image/svg+xml;charset=utf-8;base64,';
    return this._sanitizer.bypassSecurityTrustResourceUrl(`${header}${imgTxt}`);
  }
}
