import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { IDictionary, Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Store } from '../../../model/store';
import {AbstractStoreRepository} from "../abstract/abstract-store-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const storesUrl = `${AppConstants.BASE_URL}/storeplace/stores`;
const favoriteStoresUrl = `${AppConstants.BASE_URL}/storeplace/FavoriteStores`;
// </editor-fold

@Injectable()
export class StoreRepository extends AbstractStoreRepository {
  constructor(public http: Http, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async getStores(): Promise<IDictionary<Store[]>> {
    try {
      if (this.dataRepo.cache.Store.HasNotValidCachedRange()) {
        const response = await this.http.get(storesUrl, RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        let stores: IDictionary<Store[]> = {};
        if (data != null) {
          let storeFiltered = [];
          let cityID: Array<number> = [];
          if (data) data.forEach(dataStore => {
            if (!(cityID.indexOf(dataStore.idCity) > -1)) {
              cityID.push(dataStore.idCity);
              storeFiltered = data.filter((value: Store): string => {
                return value.idCity === dataStore.idCity ? dataStore.idCity.toString() : '';
              });
              let storeArr: Store[] = [];
              for (let i = 0; i < storeFiltered.length; i++) {
                let store = storeFiltered[i];
                let position = { lat: store.lat, lng: store.lng };
                if (store.openTime !== null && store.closeTime !== null && store.rating === null && store.idFeedbacks === null) {
                  let s = new Store(store.id, store.idCity, store.address, position, store.openTime, store.closeTime);
                  storeArr.push(s);
                } else if (store.openTime !== null && store.closeTime !== null && store.rating !== null && store.idFeedbacks === null) {
                  let s = new Store(store.id, store.idCity, store.address, position, store.openTime, store.closeTime, store.rating);
                  storeArr.push(s);
                } else if (store.openTime !== null && store.closeTime !== null && store.rating !== null && store.idFeedbacks !== null) {
                  let s = new Store(store.id, store.idCity, store.address, position, store.openTime, store.closeTime, store.rating, store.idFeedbacks);
                  storeArr.push(s);
                } else {
                  let s = new Store(store.id, store.idCity, store.address, position);
                  storeArr.push(s);
                }
              }
              stores[dataStore.idCity.toString()] = storeArr;
              if (CacheProvider.Settings) this.dataRepo.cache.Store.Add(dataStore.idCity.toString(), { item: { id: dataStore.idCity.toString(), stores: storeArr }, expire: Date.now() + CacheProvider.Settings.store.expire });
            }
          });
        }
        return stores;
      } else {
        let stores: IDictionary<Store[]> = {};
        if (this.dataRepo.cache && this.dataRepo.cache.Store && this.dataRepo.cache.Store.Values()) this.dataRepo.cache.Store.Values().forEach(val => {
          stores[val.id.toString()] = val.stores;
        });
        return stores;
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getStoreById(id: number): Promise<Store> {
    try {
      const response = await this.http.get(`${storesUrl}/${id}`, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let resultStore: Store;
      if (data != null) {
        let position = { lat: data.lat, lng: data.lng };
        if (data.id === id) {
          if (data.openTime !== null && data.closeTime !== null && data.rating === null && data.idFeedbacks === null) {
            resultStore = new Store(data.id, data.idCity, data.address, position, data.openTime, data.closeTime);
          } else if (data.openTime !== null && data.closeTime !== null && data.rating !== null && data.idFeedbacks === null) {
            resultStore = new Store(data.id, data.idCity, data.address, position, data.openTime, data.closeTime, data.rating);
          } else if (data.openTime !== null && data.closeTime !== null && data.rating !== null && data.idFeedbacks !== null) {
            resultStore = new Store(data.id, data.idCity, data.address, position, data.openTime, data.closeTime, data.rating, data.idFeedbacks);
          } else {
            resultStore = new Store(data.id, data.idCity, data.address, position);
          }
        }
      }
      return resultStore;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getFavoriteStores(): Promise<Store[]> {
    try {
      const response = await this.http.get(favoriteStoresUrl, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let stores: Store[] = [];
      if (data != null) {
        if (data) data.forEach(val => {
          let store = new Store(
            val.id,
            val.idCity,
            val.address,
            { lat: val.lat, lng: val.lng },
            val.openTime,
            val.closeTime,
            val.rating,
            val.idFeedbacks
          );
          stores.push(store);
        });
      }
      return stores;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async addFavoriteStore(idStore: number): Promise<number> {
    try {
      const response = await this.http.post(`${favoriteStoresUrl}/${idStore}`, idStore, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
        throw new Error("server side status error");
      }
      if (data !== null) {
        return data;
      } else return 0;
    } catch (err) {
      await this.handleError(err);
    }
  };

  public async deleteFavoriteStore(idStore: number): Promise<number> {
    try {
      const response = await this.http.delete(`${favoriteStoresUrl}/${idStore}`, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data !== null) {
        return data;
      } else return 0;
    } catch (err) {
      await this.handleError(err);
    }
  };

  // <editor-fold desc="error handler"
  public handleError(error?: Error): any {
    if (this.connServ.counter < 1) {
      this.connServ.handleNoConnection(error);
    }
  }
  // </editor-fold>
}
