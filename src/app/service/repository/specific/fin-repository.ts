import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { EnumPaymentMethod } from '../../../model/enum-payment-method';
import {AbstractFinRepository} from "../abstract/abstract-fin-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const getPaymentMethodsUrl = `${AppConstants.BASE_URL}/fin/pmtmethod`;
// </editor-fold

@Injectable()
export class FinRepository extends AbstractFinRepository {
  constructor(public http: Http, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async loadPmtMethodsCache() {
    try {
      const response = await this.http.get(getPaymentMethodsUrl, RequestFactory.makeAuthHeader()).toPromise();

      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        if (data) data.forEach(val => {
            if (this.dataRepo.cache.EnumPaymentMethod.HasNotValidCachedValue(val.id.toString())) {
              const entity: Providers.CacheDataContainer<EnumPaymentMethod> = this.dataRepo.cache.EnumPaymentMethod.Item(val.id.toString());
              const enumPayMethod: EnumPaymentMethod = (entity) ? entity.item : new EnumPaymentMethod();

              if (!entity) {
                if (CacheProvider.Settings) this.dataRepo.cache.EnumPaymentMethod.Add(val.id.toString(), { item: enumPayMethod, expire: Date.now() + CacheProvider.Settings.enumpaymentmethod.expire });
              }

              else
              if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.enumpaymentmethod.expire;

              // change in reference
              enumPayMethod.id = val.id;
              enumPayMethod.name = val.name;
            }
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPmtMethods(): Promise<EnumPaymentMethod[]> {
    try {
      if (this.dataRepo.cache.EnumPaymentMethod.HasNotValidCachedRange()) {

        const response = await this.http.get(getPaymentMethodsUrl, RequestFactory.makeAuthHeader()).toPromise();
        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const cItems = new Array<EnumPaymentMethod>();
        if (data != null) {
          if (data) data.forEach(val => {
            const enumPayMethod: EnumPaymentMethod = new EnumPaymentMethod(val.id, val.name);
            cItems.push(enumPayMethod);
            if (CacheProvider.Settings) this.dataRepo.cache.EnumPaymentMethod.Add(enumPayMethod.id.toString(), { item: enumPayMethod, expire: Date.now() + CacheProvider.Settings.enumpaymentmethod.expire });
          });
        }
        return cItems;
      }
      else
        return this.dataRepo.cache.EnumPaymentMethod.Values();
    }
    catch (err) {
      return await this.handleError(err);
    }

  }

  public async getPmtMethodById(id: number): Promise<EnumPaymentMethod> {
    try {
      const _id = id.toString();
      if (this.dataRepo.cache.EnumPaymentMethod.HasNotValidCachedValue(_id)) {
        const entity: Providers.CacheDataContainer<EnumPaymentMethod> = this.dataRepo.cache.EnumPaymentMethod.Item(_id);
        const pmtMethod: EnumPaymentMethod = (entity) ? entity.item : new EnumPaymentMethod();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.EnumPaymentMethod.Add(_id, { item: pmtMethod, expire: Date.now() + CacheProvider.Settings.enumpaymentmethod.expire });
        }

        // change current reference
        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.enumpaymentmethod.expire;

        const response = await this.http
          .get(getPaymentMethodsUrl + `/${_id}`, RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        if (data != null) {
          pmtMethod.id = data.id;
          pmtMethod.name = data.name;
          return pmtMethod;
        }
        return this.dataRepo.cache.EnumPaymentMethod.Remove(_id).item;

      }
      else {
        return this.dataRepo.cache.EnumPaymentMethod.Item(_id).item;
      }
    }
    catch (err) {
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
