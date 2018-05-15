import { Component } from '@angular/core';
import {ComponentBase} from "../../components/component-extension/component-base";
import {NavController} from "ionic-angular";
import { AbstractDataRepository } from '../../app/service/index';

@Component({
  selector: 'category-btn',
  templateUrl: 'category-btn.html'
})
export class CategoryBtnComponent extends ComponentBase {
  public productCountInOneCatalog:string;
  constructor(public navCtrl: NavController, private _repo:AbstractDataRepository) {
        super();
        this.initLocalization();
  }

  async ngOnInit() {
    const countStr:string = await this._repo.getAppParam('CATEGORY_COUNT');
    this.productCountInOneCatalog = eval('`'+ this.locale['CategoryCount'] +'`') || `более ${countStr} товаров в каталоге`;
  }

  toCategories():void{
    this.navCtrl.push('CategoriesPage');
  }
}
