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
  public productCountInOneCatalog:string;

  constructor(public navCtrl: NavController, public _repo:AbstractDataRepository) {
        super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.countStr = await this._repo.getAppParam('CATEGORY_COUNT');
    this.productCountInOneCatalog = (this.locale['CategoryCount'] && this.countStr) 
                              ? this.locale['CategoryCount'].replace('${countStr}',this.countStr)
                              : this.callDisplayBlank();
  }

  toCategories():void {
    this.navCtrl.push('CategoryTreePage').catch((err)=>console.error(err));
  }

  callDisplayBlank():string {
      const lang:number = this.localeID;
      let res:string;
      switch (lang) {
        case 0:{res=`more than ${this.countStr} products in catalog`;break;}
        case 2:{res =`більше ${this.countStr} товарів в каталозі`;break;}
        default:{res=`более ${this.countStr} товаров в каталоге`;}
      }

      return res;
  }
}
