import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Currency } from '../../../model/currency';
import { CurrencyRate } from '../../../model/currency-rate';
import {AbstractCurrencyRepository} from "../abstract/abstract-currency-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const currenciesUrl = `${AppConstants.BASE_URL}/currency`;
const getCurrencyRate = `${AppConstants.BASE_URL}/currency/rate`;
// </editor-fold

@Injectable()
export class CurrencyRepository extends AbstractCurrencyRepository {
  constructor(public http: Http, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async getCurrencies(cacheForce: boolean): Promise<Currency[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.dataRepo.cache.Currency.HasNotValidCachedRange() || cacheForce === true) {
        const response = await this.http.get(currenciesUrl, RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const currencies = new Array<Currency>();
        if (data != null) {
          if (data) data.forEach(val => {
            // create current currency
            const currencyItem: Currency = new Currency(val.id, val.shortName);
            currencies.push(currencyItem);

            // add currency to cashe
            if (CacheProvider.Settings) this.dataRepo.cache.Currency.Add(currencyItem.id.toString(), { item: currencyItem, expire: Date.now() + CacheProvider.Settings.currency.expire });
          });
        }
        return currencies;
      } else {
        // </editor-fold>
        return this.dataRepo.cache.Currency.Values();
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCurrencyById(currencyId: number): Promise<Currency> {
    try {
      const id: string = currencyId.toString();

      if (this.dataRepo.cache.Currency.HasNotValidCachedValue(id)) {
        const currentEntity: Providers.CacheDataContainer<Currency> = this.dataRepo.cache.Currency.Item(id);
        const curr: Currency = (currentEntity) ? currentEntity.item : new Currency();

        if (!currentEntity) {
          if (CacheProvider.Settings) this.dataRepo.cache.Currency.Add(id, { item: curr, expire: Date.now() + CacheProvider.Settings.currency.expire });
        }

        // change current reference
        else
        if (CacheProvider.Settings) currentEntity.expire = Date.now() + CacheProvider.Settings.currency.expire;

        // request
        const response = await this.http
          .get(currenciesUrl + `/${id}`, RequestFactory.makeAuthHeader())
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          curr.id = data.id;
          curr.shortName = data.shortName;
          return curr;
        }

        return this.dataRepo.cache.Currency.Remove(id).item;

      } else {
        return this.dataRepo.cache.Currency.Item(id).item;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCurrencyRate(): Promise<CurrencyRate[]> {
    try {
      const response = await this.http
        .get(getCurrencyRate, RequestFactory.makeAuthHeader()).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const currencyRates: CurrencyRate[] = new Array<CurrencyRate>();
      if (data !== null) {
        if (data) data.forEach(val =>
          currencyRates.push(
            new CurrencyRate(val.defaultId, val.targetId, val.rate)
          )
        );
      }
      return currencyRates;
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
