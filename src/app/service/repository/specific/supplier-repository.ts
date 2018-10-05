import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Supplier } from '../../../model/supplier';
import {AbstractSupplierRepository} from "../abstract/abstract-supplier-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const suppliersUrl = `${AppConstants.BASE_URL}/supplier`;
// </editor-fold

@Injectable()
export class SupplierRepository extends AbstractSupplierRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async loadSuppliersCache() {
    try {
      const response: any = await this.http
        .get(suppliersUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data) {
        data.forEach(val => {
            if (this.dataRepo.cache.Suppliers.HasNotValidCachedValue(val.id.toString())) {
              const entity: Providers.CacheDataContainer<Supplier> = this.dataRepo.cache.Suppliers.Item(val.id.toString());
              const supplier: Supplier = (entity) ? entity.item : new Supplier();

              if (!entity) {
                if (CacheProvider.Settings) this.dataRepo.cache.Suppliers.Add(val.id.toString(), { item: supplier, expire: Date.now() + CacheProvider.Settings.supplier.expire });
              }

              else
              if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.supplier.expire;

              supplier.id = val.id;
              supplier.name = val.name;
              supplier.paymentMethodId = val.paymentMethodId;
              supplier.rating = val.rating;
              supplier.positiveFeedbackPct = val.positiveFeedbackPct;
              supplier.refsCount = val.refsCount;
            }
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getSupplierById(supplierId: number): Promise<Supplier> {
    try {
      const id: string = supplierId.toString();

      if (this.dataRepo.cache.Suppliers.HasNotValidCachedValue(id)) {
        const entity: Providers.CacheDataContainer<Supplier> = this.dataRepo.cache.Suppliers.Item(id);
        const supplier: Supplier = (entity) ? entity.item : new Supplier();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.Suppliers.Add(id, { item: supplier, expire: Date.now() + CacheProvider.Settings.supplier.expire });
        }

        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.supplier.expire;

        const response: any = await this.http
          .get(suppliersUrl + `/${id}`, RequestFactory.makeAuthHeader())
          .pipe(retry(3)).toPromise();

        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data) {
          supplier.id = data.id;
          supplier.name = data.name;
          supplier.paymentMethodId = data.paymentMethodId;
          supplier.rating = data.rating;
          supplier.positiveFeedbackPct = data.positiveFeedbackPct;
          supplier.refsCount = data.refsCount;
          return supplier;
        }
        return this.dataRepo.cache.Suppliers.Remove(id).item;
      } else {
        return this.dataRepo.cache.Suppliers.Item(id).item;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getSuppliers(cacheForce: boolean): Promise<Supplier[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.dataRepo.cache.Suppliers.HasNotValidCachedRange() || cacheForce === true) {
        const response: any = await this.http.get(suppliersUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        const suppliers = new Array<Supplier>();
        if (data != null) {
          if (data) data.forEach(val => {
            // create current supplier
            const supplierItem: Supplier = new Supplier(
              val.id,
              val.name,
              val.paymentMethodId,
              val.rating,
              val.positiveFeedbackPct,
              val.refsCount
            );

            suppliers.push(supplierItem);

            // add supplier to cashe
            if (CacheProvider.Settings) this.dataRepo.cache.Suppliers.Add(supplierItem.id.toString(), { item: supplierItem, expire: Date.now() + CacheProvider.Settings.supplier.expire });
          });
        }
        return suppliers;
      } else {
        // </editor-fold>
        return this.dataRepo.cache.Suppliers.Values();
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
