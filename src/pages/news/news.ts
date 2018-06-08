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
              private _repo: AbstractDataRepository ) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();

    this.news = await this._repo.getNews();

    this.news.sort((a,b) => {
      if(a.sort < b.sort) return -1;
      if(a.sort > b.sort) return 1;
      return 0;
    });
  }

  onOpenOneNews(item: News) {
    this.navCtrl.push('NewsDetailPage', {news: item});
  }

}
