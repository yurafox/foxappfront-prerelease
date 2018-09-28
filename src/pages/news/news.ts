import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractNewsRepository} from "../../app/service/repository/abstract/abstract-news-repository";
import {News} from "../../app/model/news";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})

export class NewsPage extends ComponentBase {
  @ViewChild('cont') cont;

  public fullNews: News[] = [];
  public news: News[] = [];

  loadedCount: number = 10;
  allResolved: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _newsRepo: AbstractNewsRepository ) {
    super();
    this.news = [];
  }

  async ngOnInit() {
    super.ngOnInit();

    this.fullNews = await this._newsRepo.getNewsByCategory(this.navParams.data.indexNews);

    if (this.fullNews && this.fullNews.length > 0) {
      this.fullNews.sort((a, b) => {
        if (a.publicDate < b.publicDate) return 1;
        if (a.publicDate > b.publicDate) return -1;
        return 0;
      });
    }

    this.loadPackNews();
    this.allResolved = true;
  }

  onOpenOneNews(item: News) {
    this.navCtrl.push('NewsDetailPage', {news: item}).catch(console.error);
  }

  onScroll(event) {
    event.enable(false);
 
    this.loadPackNews();

    event.enable(true);
    this.cont.resize();
    event.complete();
  }

  loadPackNews() {
    for(let i = 0; i <  this.loadedCount; i++) {
      if(this.fullNews.length > 0) {
        let oneNews = this.fullNews.splice(0, 1);
        this.news.push(oneNews[0]);
      }
    }
  }

}
