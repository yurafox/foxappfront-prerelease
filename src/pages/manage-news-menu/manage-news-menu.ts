import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractNewsCategoryRepository} from "../../app/service/repository/abstract/abstract-news-category-repository";
import {NewsCategory} from "../../app/model/news-category";

@IonicPage()
@Component({
  selector: 'page-manage-news-menu',
  templateUrl: 'manage-news-menu.html',
})
export class ManageNewsMenuPage extends ComponentBase{
  public newsCategory: NewsCategory[];

  constructor(public navCtrl: NavController,
              public _newsCategoryRepo: AbstractNewsCategoryRepository ) {
    super();
    this.newsCategory = [];
  }

  async ngOnInit() {
    super.ngOnInit();

    this.newsCategory = await this._newsCategoryRepo.getNewsCategory();

    if (this.newsCategory && this.newsCategory.length > 0) {
      this.newsCategory.sort((a,b) => {
        if(a.sort < b.sort) return -1;
        if(a.sort > b.sort) return 1;
        return 0;
      });
    }
  }

  openPage(page: NewsCategory) {
    this.navCtrl.push('NewsPage', {indexNews: page.id}).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }

}

