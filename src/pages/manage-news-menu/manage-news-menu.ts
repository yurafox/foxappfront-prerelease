import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";
import {NewsCategory} from "../../app/model/news-category";

@IonicPage()
@Component({
  selector: 'page-manage-news-menu',
  templateUrl: 'manage-news-menu.html',
})
export class ManageNewsMenuPage extends ComponentBase{
  public newsCategory: NewsCategory[];

  constructor(public navCtrl: NavController,
              private _repo: AbstractDataRepository ) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();

    this.newsCategory = await this._repo.getNewsCategory();

    this.newsCategory.sort((a,b) => {
      if(a.sort < b.sort) return -1;
      if(a.sort > b.sort) return 1;
      return 0;
    });
  }

  openPage(page: NewsCategory) {
    this.navCtrl.push('NewsPage', {indexNews: page.id}).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }

}

