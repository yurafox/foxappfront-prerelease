import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Quotation } from '../../../model/quotation';
import {AbstractQuotationRepository} from "../abstract/abstract-quotation-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const quotationsUrl = `${AppConstants.BASE_URL}/quotation`;
// </editor-fold

@Injectable()
export class QuotationRepository extends AbstractQuotationRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async getQuotationById(quotationId: number): Promise<Quotation> {
    if (!quotationId) return null;
    try {
      const id: string = quotationId.toString();
      if (this.dataRepo.cache.Quotation.HasNotValidCachedValue(id)) {
        const entity: Providers.CacheDataContainer<Quotation> = this.dataRepo.cache.Quotation.Item(id);
        const quotation: Quotation = (entity) ? entity.item : new Quotation();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.Quotation.Add(id, { item: quotation, expire: Date.now() + CacheProvider.Settings.quotation.expire });
        }

        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.quotation.expire;

        const response: any = await this.http
          .get(quotationsUrl + `/${quotationId}`, RequestFactory.makeAuthHeader())
          .pipe(retry(3)).toPromise();

        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data) {
          quotation.id = data.id;
          quotation.idSupplier = data.idSupplier;
          quotation.dateStart = data.dateStart;
          quotation.dateEnd = data.dateEnd;
          quotation.currencyId = data.currencyId;

          return quotation;
        }
        return this.dataRepo.cache.Quotation.Remove(id).item;

      } else {
        return this.dataRepo.cache.Quotation.Item(id).item;
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
