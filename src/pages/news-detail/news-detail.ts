import {Component, Input, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {News} from "../../app/model/news";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage implements OnInit{
  @Input() news: News;
  description: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public repo: AbstractDataRepository) {
    this.news = this.navParams.data.news;
  }

  async ngOnInit() {
    this.repo.getNewsDescription(this.news.id).then( description => {
        this.description = description;
      }
    );
  }

}
