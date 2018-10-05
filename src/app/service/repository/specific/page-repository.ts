import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import {AppDataRepository} from "./app-data-repository";
import {AbstractPageRepository} from "../abstract/abstract-page-repository";

// <editor-fold desc="url const">
const pagesDynamicUrl = `${AppConstants.BASE_URL}/page`;
const pageOptionsUrl = `${AppConstants.BASE_URL}/page/GetPageOptions`;
// </editor-fold

@Injectable()
export class PageRepository extends AbstractPageRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async getPageContent(id: number): Promise<string> {
    try {
      const response: any = await this.http
        .get(`${pagesDynamicUrl}/${id}`, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      return data["content"];
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPageOptionsById(id:number):Promise<any> {
    if (!id)
      return null;
    let stringId = id.toString();
    try {
      if (this.dataRepo.cache.PageOptions.HasNotValidCachedValue(stringId)) {
        const response: any = await this.http.get(`${pageOptionsUrl}/${id}`, RequestFactory.makeAuthHeader())
          .pipe(retry(3)).toPromise();
        let data: any = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (CacheProvider.Settings && CacheProvider.Settings.pageoptions) {
          this.dataRepo.cache.PageOptions.Add(stringId, {
            item: data,
            expire: Date.now() + CacheProvider.Settings.pageoptions.expire });
        }
        return data;
      }
      else {
        return this.dataRepo.cache.PageOptions.Item(stringId).item;
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
