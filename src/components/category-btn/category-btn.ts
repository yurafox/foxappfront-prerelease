import { Component } from '@angular/core';
import {ComponentBase} from '../../components/component-extension/component-base';
import {NavController} from "ionic-angular";
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@Component({
  selector: 'category-btn',
  templateUrl: 'category-btn.html'
})
export class CategoryBtnComponent extends ComponentBase {
  public countStr:string;
  public get productCountInOneCatalog():string {
     if(this.locale['CategoryCount'] && this.countStr)
       return this.locale['CategoryCount'].replace('${countStr}',this.countStr);
  }

  constructor(public navCtrl: NavController, public _repo:AbstractDataRepository) {
        super();
        this.initLocalization();
  }

  async ngOnInit() {
    this.countStr = await this._repo.getAppParam('CATEGORY_COUNT');
  }

  toCategories():void{
    this.navCtrl.push('CategoryTreePage').catch((err)=>console.error(err));
  }
}
