import { Component } from '@angular/core';
import {ComponentBase} from '../../components/component-extension/component-base';
import {NavController} from "ionic-angular";
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@Component({
  selector: 'category-btn',
  templateUrl: 'category-btn.html'
})
export class CategoryBtnComponent extends ComponentBase {
  public productCountInOneCatalog:string;
  constructor(public navCtrl: NavController, public _repo:AbstractDataRepository) {
        super();
        this.initLocalization();
  }

  async ngOnInit() {
    const countStr = await this._repo.getAppParam('CATEGORY_COUNT');
    if (countStr && this.locale['CategoryCount']) {
      this.productCountInOneCatalog = this.locale['CategoryCount'].replace('${countStr}',countStr);
    }
  }

  toCategories():void{
    this.navCtrl.push('CategoryTreePage').catch((err)=>console.error(err));
  }
}
