import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { StorePlace } from '../../../model/store-place';
import { ProductStorePlace } from '../../../model/product-store-place';
import {AbstractStorePlaceRepository} from "../abstract/abstract-store-place-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const productStorePlacesUrl = `${AppConstants.BASE_URL}/storeplace/productstoreplaces`;
const storePlacesUrl = `${AppConstants.BASE_URL}/storeplace/storeplace`;
// </editor-fold

@Injectable()
export class StorePlaceRepository extends AbstractStorePlaceRepository {
  constructor(public http: Http, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async getProductStorePlacesByQuotId(quotId: number): Promise<ProductStorePlace[]> {
    try {
      const response = await this.http
        .get(productStorePlacesUrl, RequestFactory.makeSearch([
          { key: "idQuotationProduct", value: quotId.toString() }
        ])).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const qProductsStorePlaces = new Array<ProductStorePlace>();
      if (data != null) {
        for (let val of data) {
          let psp = new ProductStorePlace(
            val.id,
            val.idQuotationProduct,
            val.idStorePlace,
            val.qty
          );

          let sp = await (<any>psp).storeplace_p;
          if (sp.type == 1)
          //select only storeplaces with type of store
            qProductsStorePlaces.push(psp);
        }
      }
      /*return qProductsStorePlaces.sort((a, b) =>
        {return ( (<any>a).idStorePlace.storeplace.city.name - (<any>b).idStorePlace.storeplace.city.name)});*/
      return qProductsStorePlaces;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async loadStorePlaceCache() {
    try {
      const response = await this.http
        .get(storePlacesUrl, RequestFactory.makeAuthHeader()).toPromise();

      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        if (data) data.forEach(val => {
            if (this.dataRepo.cache.StorePlace.HasNotValidCachedValue(val.id.toString())) {
              const entity: Providers.CacheDataContainer<StorePlace> = this.dataRepo.cache.StorePlace.Item(val.id.toString());
              const storePlace: StorePlace = (entity) ? entity.item : new StorePlace();

              if (!entity) {
                if (CacheProvider.Settings) this.dataRepo.cache.StorePlace.Add(val.id.toString(), { item: storePlace, expire: Date.now() + CacheProvider.Settings.storeplace.expire });
              }

              else
              if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.storeplace.expire;

              storePlace.id = val.id;
              storePlace.name = val.name;
              storePlace.idSupplier = val.idSupplier;
              storePlace.idCity = val.idCity;
              storePlace.zip = val.zip;
              storePlace.address_line = val.address_line;
              storePlace.lat = val.lat;
              storePlace.lng = val.lng;
              storePlace.type = val.type;
            }
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getStorePlaceById(id: number): Promise<StorePlace> {
    try {
      const _id: string = id.toString();
      if (this.dataRepo.cache.StorePlace.HasNotValidCachedValue(_id)) {
        const entity: Providers.CacheDataContainer<StorePlace> = this.dataRepo.cache.StorePlace.Item(_id);
        const storePlace: StorePlace = (entity) ? entity.item : new StorePlace();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.StorePlace.Add(_id, { item: storePlace, expire: Date.now() + CacheProvider.Settings.storeplace.expire });
        }

        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.storeplace.expire;

        // http request
        const response = await this.http
          .get(storePlacesUrl + `/${_id}`, RequestFactory.makeAuthHeader())
          .toPromise();

        // response data binding
        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data) {
          storePlace.id = id;
          storePlace.name = data.name;
          storePlace.idSupplier = data.idSupplier;
          storePlace.idCity = data.idCity;
          storePlace.zip = data.zip;
          storePlace.address_line = data.address_line;
          storePlace.lat = data.lat;
          storePlace.lng = data.lng;
          storePlace.type = data.type;

          return storePlace;
        }
        return this.dataRepo.cache.StorePlace.Remove(_id).item;
      } else {
        return this.dataRepo.cache.StorePlace.Item(_id).item;
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
