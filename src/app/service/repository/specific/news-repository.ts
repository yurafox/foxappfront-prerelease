import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { News } from '../../../model/news';
import {AbstractNewsRepository} from "../abstract/abstract-news-repository";

// <editor-fold desc="url const">
const newsDescriptionsUrl = `${AppConstants.BASE_URL}/news/getNewsDescription`;
const newsByCategoryUrl = `${AppConstants.BASE_URL}/news/getNewsByCategory`;
// </editor-fold

@Injectable()
export class NewsRepository extends AbstractNewsRepository {
  constructor(public http: Http, public connServ: ConnectivityService) {
    super();
  }

  public async getNewsByCategory(categoryId: number): Promise<News[]> {
    try {
      const response = await this.http.get(newsByCategoryUrl + `/${categoryId}`,RequestFactory.makeAuthHeader()).toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      let news: News[] = [];
      if (data !== null) {
        if (data) data.forEach((dataNews) => {
          news.push(dataNews);
        })
      }
      return news;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getNewsDescription(id: number): Promise<string> {
    try {
      const _id = id.toString();
      const response = await this.http.get(newsDescriptionsUrl + `/${_id}`,RequestFactory.makeAuthHeader()).toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        return data.description;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  // <editor-fold desc="error handler"
  public handleError(error?: Error): any {
    if (this.connServ.counter < 1) {
      this.connServ.handleNoConnection(error);
    }
  }
  // </editor-fold>
}
