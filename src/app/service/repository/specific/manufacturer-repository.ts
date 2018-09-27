import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Manufacturer } from '../../../model/manufacturer';
import {AbstractManufacturerRepository} from "../abstract/abstract-manufacturer-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const manufacturersUrl = `${AppConstants.BASE_URL}/manufacturer`;
// </editor-fold

@Injectable()
export class ManufacturerRepository extends AbstractManufacturerRepository {
  constructor(public http: Http, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async getManufacturerById(manufacturerId: number): Promise<Manufacturer> {
    try {
      const id: string = manufacturerId.toString();
      // <editor-fold desc = "id in cache is empty"
      if (this.dataRepo.cache.Manufacturer.HasNotValidCachedValue(id)) {
        const entity: Providers.CacheDataContainer<Manufacturer> = this.dataRepo.cache.Manufacturer.Item(id);
        const manufacturer: Manufacturer = (entity) ? entity.item : new Manufacturer();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.Manufacturer.Add(id, { item: manufacturer, expire: Date.now() + CacheProvider.Settings.manufacturer.expire });
        }

        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.manufacturer.expire;

        const response = await this.http
          .get(manufacturersUrl + `/${id}`, RequestFactory.makeAuthHeader())
          .toPromise();
        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data) {
          manufacturer.id = data.id;
          manufacturer.name = data.name;
          return manufacturer;
        }
        return this.dataRepo.cache.Manufacturer.Remove(id).item;
      } else {
        // </editor-fold>

        return this.dataRepo.cache.Manufacturer.Item(id).item;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getManufacturers(cacheForce: boolean): Promise<Manufacturer[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.dataRepo.cache.Manufacturer.HasNotValidCachedRange() || cacheForce === true) {
        const response = await this.http.get(manufacturersUrl, RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const manufacturers = new Array<Manufacturer>();
        if (data != null) {
          if (data) data.forEach(val => {
            // create current manufacturer
            const manufacturerItem: Manufacturer = new Manufacturer(
              val.id,
              val.name
            );

            manufacturers.push(manufacturerItem);

            // add manufacturer to cache
            if (CacheProvider.Settings) this.dataRepo.cache.Manufacturer.Add(
              manufacturerItem.id.toString(),
              { item: manufacturerItem, expire: Date.now() + CacheProvider.Settings.manufacturer.expire }
            );
          });
        }
        return manufacturers;
      } else {
        // </editor-fold>
        return this.dataRepo.cache.Manufacturer.Values();
      }
    } catch (err) {
      await this.handleError(err);
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
