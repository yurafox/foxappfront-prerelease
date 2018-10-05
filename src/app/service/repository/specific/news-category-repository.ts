import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { NewsCategory } from '../../../model/news-category';
import {AbstractNewsCategoryRepository} from "../abstract/abstract-news-category-repository";

// <editor-fold desc="url const">
const newsCategoryUrl = `${AppConstants.BASE_URL}/NewsCategory`;
// </editor-fold

@Injectable()
export class NewsCategoryRepository extends AbstractNewsCategoryRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService) {
    super();
  }

  public async getNewsCategory(): Promise<NewsCategory[]> {
    try {
      const response: any = await this.http.get(newsCategoryUrl,RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      let newsCategory: NewsCategory[] = [];
      if (data !== null) {
        if (data) data.forEach((dataNewsCategory) => {
          newsCategory.push(dataNewsCategory);
        })
      }
      return newsCategory;
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
