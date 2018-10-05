import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { BannerSlide } from '../../../model/banner-slide';
import {AbstractBannerSlideRepository} from "../abstract/abstract-banner-slide-repository";

// <editor-fold desc="url const">
const bannerSlidesUrl = `${AppConstants.BASE_URL}/BannerSlide`;
// </editor-fold

@Injectable()
export class BannerSlideRepository extends AbstractBannerSlideRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService) {
    super();
  }

  public async getBannerSlides(): Promise<BannerSlide[]> {
    try {
      const response: any = await this.http.get(bannerSlidesUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      let banners: BannerSlide[] = [];
      if (data !== null) {
        if (data) data.forEach((banner) => {
          banners.push(banner);
        })
      }
      return banners;
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
