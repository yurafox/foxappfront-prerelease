import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import IKeyedCollection = Providers.IKeyedCollection;
import { Lang } from '../../../model/lang';
import { AppParam } from '../../../model/app-param';
import { AbstractDataRepository } from '../abstract/abstract-data-repository';

// <editor-fold desc="url const">
const LangUrl = `${AppConstants.BASE_URL}/localization/lang`;
const appParamsUrl = `${AppConstants.BASE_URL}/appparams`;
// </editor-fold

@Injectable()
export class AppDataRepository extends AbstractDataRepository {
  public cache: CacheProvider = new CacheProvider();

  constructor(public http: Http, public connServ: ConnectivityService) {
    super();
    this.CacheProviderOptInit().catch(console.error);
  }

  public async CacheProviderOptInit() {
    try {
      let result: string = await this.getAppParam("CLIENT_CACHE_SETTINGS");
      if (result)
        CacheProvider.Settings = JSON.parse(result.toLowerCase());
    }
    catch (err) {
      await this.handleError(err);
    }
  }

  search(textToSearch: string, srchVal: string): boolean {
    if (textToSearch && srchVal) {
      let ar = srchVal.toLowerCase().split(" ");
      let i = 0;
      if (ar) ar.forEach(str => {
        if (!(textToSearch.toLowerCase().indexOf(str) == -1)) {
          i++;
        }
      });
      if (i == ar.length) return true;
    } else return false;
  }

  public async getLocale(cacheForce: boolean): Promise<Lang[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Lang.HasNotValidCachedRange() || cacheForce === true) {
        const response = await this.http.get(LangUrl, RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const languages = new Array<Lang>();
        if (data != null) {
          if (data) data.forEach(val => {
            const langItem: Lang = new Lang(val.id, val.name);
            languages.push(langItem);

            // add currency to cashe
            if (CacheProvider.Settings) this.cache.Lang.Add(langItem.id.toString(), { item: langItem, expire: Date.now() + CacheProvider.Settings.lang.expire });
          });
        }
        return languages;
      } else {
        // </editor-fold>
        return this.cache.Lang.Values();
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

  // <editor-fold desc="inspect cache predicate"
  public isEmpty<T>(value: T) {
    return value === undefined;
  }
  // </editor-fold>

  public async getAppParams(): Promise<IKeyedCollection<Providers.CacheDataContainer<AppParam>>> {
    try {
      if (this.cache.AppParams.HasNotValidCachedRange()) {
        const response = await this.http
          .get(appParamsUrl).toPromise();

        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          if (data) data.forEach(val => {
            let param = new AppParam(val.id, val.propName, val.propVal);

            if (this.cache.AppParams.HasNotValidCachedValue(val.propName)) {
              this.cache.AppParams.Add(val.propName, { item: param, expire: Date.now() + AppConstants.ROOT_APP_PARAMS_CACHE_LIFETIME });
            }

          }
          );
        }
      }
      return this.cache.AppParams;
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getAppParam(param: string): Promise<string> {
    let params = await this.getAppParams();
    if (params) {
      let paramsCollection = <IKeyedCollection<Providers.CacheDataContainer<AppParam>>>(params);
      if (paramsCollection && paramsCollection.Item(param) && paramsCollection.Item(param).item) {
        return paramsCollection.Item(param).item.propVal;
      }
    }
  }

}
