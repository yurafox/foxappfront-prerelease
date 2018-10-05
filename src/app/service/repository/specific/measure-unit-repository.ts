import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { MeasureUnit } from '../../../model/measure-unit';
import {AbstractMeasureUnitRepository} from "../abstract/abstract-measure-unit-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const measureUnitUrl = `${AppConstants.BASE_URL}/measureUnit`;
// </editor-fold

@Injectable()
export class MeasureUnitRepository extends AbstractMeasureUnitRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async loadMeasureUnitCache() {
    try {
      const response: any = await this.http
        .get(measureUnitUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data) {
        data.forEach(val => {
            if (this.dataRepo.cache.MeasureUnit.HasNotValidCachedValue(val.id.toString())) {
              const entity: Providers.CacheDataContainer<MeasureUnit> = this.dataRepo.cache.MeasureUnit.Item(val.id.toString());
              const measureunit: MeasureUnit = (entity) ? entity.item : new MeasureUnit();

              if (!entity) {
                if (CacheProvider.Settings) this.dataRepo.cache.MeasureUnit.Add(val.id.toString(), { item: measureunit, expire: Date.now() + CacheProvider.Settings.measureunit.expire });
              }

              else
              if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.measureunit.expire;

              measureunit.id = val.id;
              measureunit.name = val.name;
            }
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getMeasureUnitById(unitId: number): Promise<MeasureUnit> {
    try {
      const id: string = unitId.toString();

      // <editor-fold desc = "id in cache is empty"
      if (this.dataRepo.cache.MeasureUnit.HasNotValidCachedValue(id)) {
        const entity: Providers.CacheDataContainer<MeasureUnit> = this.dataRepo.cache.MeasureUnit.Item(id);
        const measureUnit: MeasureUnit = (entity) ? entity.item : new MeasureUnit();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.MeasureUnit.Add(id, { item: measureUnit, expire: Date.now() + CacheProvider.Settings.measureunit.expire });
        }

        // change current reference
        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.measureunit.expire;

        const response: any = await this.http
          .get(measureUnitUrl + `/${id}`, RequestFactory.makeAuthHeader())
          .pipe(retry(3)).toPromise();

        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data) {
          measureUnit.id = data.id;
          measureUnit.name = data.name;

          return measureUnit;
        }
        return this.dataRepo.cache.MeasureUnit.Remove(id).item;
      } else {
        // </editor-fold>

        return this.dataRepo.cache.MeasureUnit.Item(id).item;
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
