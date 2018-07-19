import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";
import {News} from "../../app/model/news";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})

export class NewsPage extends ComponentBase {
  public news: News[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _repo: AbstractDataRepository ) {
    super();
    this.news = [];
  }

  async ngOnInit() {
    try {
      super.ngOnInit();

      this.news = await this._repo.getNewsByCategory(this.navParams.data.indexNews);

      if (this.news && this.news.length>0) this.news.sort((a,b) => {
        if(a.publicDate < b.publicDate) return 1;
        if(a.publicDate > b.publicDate) return -1;
        return 0;
      });
    } catch(err) {
      console.log(JSON.stringify(err));
    }
  }

  onOpenOneNews(item: News) {
    this.navCtrl.push('NewsDetailPage', {news: item});
  }

}
