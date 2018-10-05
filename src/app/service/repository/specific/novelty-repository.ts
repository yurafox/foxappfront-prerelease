import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Novelty } from '../../../model/novelty';
import { NoveltyDetails } from '../../../model/novelty-det';
import {AbstractNoveltyRepository} from "../abstract/abstract-novelty-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const noveltyByIdDynamicUrl = `${AppConstants.BASE_URL}/novelty/GetNoveltyById`;
const noveltiesDynamicUrl = `${AppConstants.BASE_URL}/novelty/GetNovelties`;
const noveltyDetailsDynamicUrl = `${AppConstants.BASE_URL}/novelty/GetNoveltyDetailsByNoveltyId`;
// </editor-fold

@Injectable()
export class NoveltyRepository extends AbstractNoveltyRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async getNovelty(id: number): Promise<Novelty> {
    if (!id)
      return null;
    let stringId = id.toString();
    try {
      if (this.dataRepo.cache.Novelty.HasNotValidCachedValue(stringId)) {
        const response: any = await this.http
          .get(`${noveltyByIdDynamicUrl}/${id}`, RequestFactory.makeAuthHeader())
          .pipe(retry(3)).toPromise();

        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        let novelty: Novelty;
        if (data != null) {
          novelty = new Novelty(
            data.id,
            data.idProduct,
            data.name,
            data.img_url,
            data.priority,
            data.sketch_content,
            data.novelty_content
          );
        }
        if (CacheProvider.Settings && CacheProvider.Settings.novelty)
          this.dataRepo.cache.Novelty.Add(stringId, { item: novelty, expire: Date.now() + CacheProvider.Settings.novelty.expire });
        return novelty;
      }
      else {
        return this.dataRepo.cache.Novelty.Item(stringId).item;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getNovelties(): Promise<Novelty[]> {
    try {
      const response: any = await this.http.get(noveltiesDynamicUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      let novelties: Array<Novelty> = new Array<Novelty>();
      if (data != null) {
        if (data) data.forEach(val => {
          const novelty: Novelty = new Novelty(
            val.id,
            val.idProduct,
            val.name,
            val.img_url,
            val.priority,
            val.sketch_content,
            val.novelty_content
          );
          novelties.push(novelty);
        });
      }
      return novelties;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getNoveltyDetailsByNoveltyId(id: number): Promise<NoveltyDetails[]> {
    try {
      const response: any = await this.http.get(`${noveltyDetailsDynamicUrl}/${id}`, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      let noveltyDetails: NoveltyDetails[] = [];
      if (data != null) {
        if (data) data.forEach(val => {
          let detail: NoveltyDetails = new NoveltyDetails(
            val.id,
            val.idNovelty,
            val.idProduct
          );
          noveltyDetails.push(detail);
        });
      }
      return noveltyDetails;
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
