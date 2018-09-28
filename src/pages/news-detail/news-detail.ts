import {Component, Input, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {News} from "../../app/model/news";
import {AbstractNewsRepository} from "../../app/service/repository/abstract/abstract-news-repository";

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage implements OnInit{
  @Input() news: News;
  description: string;
  allResolved: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public newsRepo: AbstractNewsRepository) {
    this.news = this.navParams.data.news;
  }

  async ngOnInit() {
    await this.newsRepo.getNewsDescription(this.news.id).then( description => {
        this.description = description;
      }
    );

    this.allResolved = true;
  }

}
