import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { LoSupplEntity } from '../../../model/lo-suppl-entity';
import { LoTrackLog } from '../../../model/lo-track-log';
import { LoEntity } from '../../../model/lo-entity';
import { Shipment } from '../../../model/shipment';
import { LoEntityOffice } from '../../../model/lo-entity-office';
import { LoDeliveryType } from '../../../model/lo-delivery-type';
import { LoDeliveryTypeAttr } from '../../../model/lo-delivery-type-attr';
import {AbstractLoRepository} from "../abstract/abstract-lo-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const getDeliveryCostByShipmentUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/lo/GetDeliveryCostByShipment`;
const getDeliveryDateByShipmentUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/lo/GetDeliveryDateByShipment`;
const loEntitiesUrl = `${AppConstants.BASE_URL}/lo/loentity`;
const loSupplEntitiesUrl = `${AppConstants.BASE_URL}/lo/losupplentity`;
const specLOTrackingLogUrl = `${AppConstants.BASE_URL}/lo/specLOTrackingLog`;
const getLoDeliveryTypeUrl =`${AppConstants.BASE_URL}/lo/LoDeliveryType`;
const getLoEntityOfficeUrl =`${AppConstants.BASE_URL}/lo/LoEntityOffice`;
const getLoDeliveryTypesByLoEntityUrl = `${AppConstants.BASE_URL}/lo/LoDeliveryTypesByLoEntity`;
const getLoOfficesByLoEntityAndCityUrl = `${AppConstants.BASE_URL}/lo/LoEntityOfficesByLoEntityAndCity`;
const getLoDeliveryTypesAttrByLoEntityUrl = `${AppConstants.BASE_URL}/lo/LoDeliveryTypesAttrByLoEntity`;
const allowTakeOnCreditByStatusUrl = `${AppConstants.BASE_URL}/lo/AllowTakeOnCredit`;
// </editor-fold

@Injectable()
export class LoRepository extends AbstractLoRepository {
  constructor(public http: Http, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async getLoEntitiyById(entityId: number): Promise<LoEntity> {
    try {
      const id = entityId.toString();
      if (this.dataRepo.cache.LoEntity.HasNotValidCachedValue(id)) {

        const entity: Providers.CacheDataContainer<LoEntity> = this.dataRepo.cache.LoEntity.Item(id);
        const loEntity: LoEntity = (entity) ? entity.item : new LoEntity();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.LoEntity.Add(id, { item: loEntity, expire: Date.now() + CacheProvider.Settings.loentity.expire });
        }

        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.loentity.expire;


        const response = await this.http
          .get(loEntitiesUrl + `/${entityId}`, RequestFactory.makeAuthHeader())
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data) {
          loEntity.id = data.id;
          loEntity.name = data.name;
          return loEntity;
        }
        return this.dataRepo.cache.LoEntity.Remove(id).item;
      }
      else {
        return this.dataRepo.cache.LoEntity.Item(id).item;
      }

    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getLoTrackLogByOrderSpecId(id: number): Promise<LoTrackLog[]> {
    try {
      const response = await this.http
        .get(specLOTrackingLogUrl, RequestFactory.makeSearch([{ key: "idOrderSpecProd", value: id.toString() }]))
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const arr = new Array<LoTrackLog>();
      if (data != null) {
        if (data) data.forEach(val =>
          arr.push(
            new LoTrackLog(
              val.id,
              val.idOrderSpecProd,
              val.trackDate,
              val.trackString
            )
          )
        );

        arr.sort((x, y) => {
            return (+new Date(y.trackDate) - +new Date(x.trackDate));
          }
        );
      }

      return arr;
    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getLoEntitiesForSupplier(supplierId: number): Promise<LoSupplEntity[]> {
    try {
      const response = await this.http
        .get(loSupplEntitiesUrl, RequestFactory.makeSearch([
          { key: "idSupplier", value: supplierId.toString() }
        ])).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cloSupplEntArr = new Array<LoSupplEntity>();
      if (data != null) {
        if (data) data.forEach(val =>
          cloSupplEntArr.push(
            new LoSupplEntity(
              val.id,
              val.idSupplier,
              val.idLoEntity
            )
          )
        );
      }
      return cloSupplEntArr;
    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getDeliveryDateByShipment(shpmt: Shipment, loEntityId: number, loIdClientAddress: number, delivTypeId: number): Promise<Date> {
    try {
      const response = await this.http
        .post(getDeliveryDateByShipmentUrl, { shpmt: shpmt.dto, loEntity: loEntityId, loIdClientAddress: loIdClientAddress, delivTypeId: delivTypeId },
          RequestFactory.makeAuthHeader())
        .toPromise();
      const val = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      return val.deliveryDate;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getDeliveryCostByShipment(shpmt: Shipment, loEntityId: number, loIdClientAddress: number, delivTypeId: number): Promise<number> {
    try {
      const response = await this.http
        .post(getDeliveryCostByShipmentUrl, { shpmt: shpmt.dto, loEntity: loEntityId, loIdClientAddress: loIdClientAddress, delivTypeId: delivTypeId },
          RequestFactory.makeAuthHeader())
        .toPromise();
      const val = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      return val.assessedCost;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getLoDeliveryTypeById(id: number): Promise<LoDeliveryType> {
    try {
      const _id = id.toString();
      if (this.dataRepo.cache.LoDeliveryType.HasNotValidCachedValue(_id)) {

        const entity: Providers.CacheDataContainer<LoDeliveryType> = this.dataRepo.cache.LoDeliveryType.Item(_id);
        const delType: LoDeliveryType = (entity) ? entity.item : new LoDeliveryType();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.LoDeliveryType.Add(_id, { item: delType, expire: Date.now() + CacheProvider.Settings.lodeliverytype.expire });
        }

        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.lodeliverytype.expire;

        const response = await this.http
          .get(getLoDeliveryTypeUrl + `/${_id}`, RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        if (data) {
          delType.name = data.name;
          return delType;
        }
        return this.dataRepo.cache.LoDeliveryType.Remove(_id).item;
      }
      else {
        return this.dataRepo.cache.LoDeliveryType.Item(_id).item;
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getLoEntityOfficeById(id: number): Promise<LoEntityOffice> {
    try {
      const _id = id.toString();
      if (this.dataRepo.cache.LoEntityOffice.HasNotValidCachedValue(_id)) {
        const entity: Providers.CacheDataContainer<LoEntityOffice> = this.dataRepo.cache.LoEntityOffice.Item(_id);
        const entOff: LoEntityOffice = (entity) ? entity.item : new LoEntityOffice();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.LoEntityOffice.Add(_id, { item: entOff, expire: Date.now() + CacheProvider.Settings.loentityoffice.expire });
        }

        // change current reference
        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.loentityoffice.expire;


        const response = await this.http
          .get(getLoEntityOfficeUrl + `/${_id}`, RequestFactory.makeAuthHeader()).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        if (data) {
          entOff.name = data.name;
          entOff.idLoEntity = data.idLoEntity;
          entOff.idCity = data.idCity;
          return entOff;
        }
        return this.dataRepo.cache.LoEntityOffice.Remove(_id).item;
      }
      else {
        return this.dataRepo.cache.LoEntityOffice.Item(_id).item;
      };
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getLoEntityDeliveryTypes(idLoEntity: number): Promise<LoDeliveryType[]> {
    try {
      const _id = idLoEntity.toString();
      const response = await this.http
        .get(getLoDeliveryTypesByLoEntityUrl + `/${_id}`).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const arr: LoDeliveryType[] = new Array<LoDeliveryType>();
      if (data !== null) {
        if (data) data.forEach(val =>
          arr.push(
            new LoDeliveryType(val.id, val.name)
          )
        );
      }
      return arr;
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getLoOfficesByLoEntityAndCity(idLoEntity: number, idCity: number): Promise<LoEntityOffice[]> {
    try {
      const response = await this.http
        .post(getLoOfficesByLoEntityAndCityUrl, { idLoEntity: idLoEntity, idCity: idCity }).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const arr: LoEntityOffice[] = new Array<LoEntityOffice>();
      if (data !== null) {
        if (data) data.forEach(val =>
          arr.push(
            new LoEntityOffice(val.id, val.idLoEntity, val.name, val.idCity)
          )
        );
      }
      return arr;
    }
    catch (err) {
      return await this.handleError(err);
    }

  }

  public async getLoEntityDeliveryTypesAttr(shpmt: Shipment, loIdClientAddress: number): Promise<LoDeliveryTypeAttr[]> {
    try {
      const response = await this.http
        .post(getLoDeliveryTypesAttrByLoEntityUrl, { shpmt: shpmt.dto, loIdClientAddress: loIdClientAddress },
          RequestFactory.makeAuthHeader())
        .toPromise();
      const data = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const arr: LoDeliveryTypeAttr[] = new Array<LoDeliveryTypeAttr>();
      if (data !== null) {
        if (data) data.forEach(val =>
          arr.push(
            new LoDeliveryTypeAttr(val.loEntityId, val.deliveryTypeId, val.deliveryDate )
          )
        );
      }
      return arr;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getAllowTakeOnCreditByStatus(status: number): Promise<boolean> {
    try {
      const response = await this.http
        .get(`${allowTakeOnCreditByStatusUrl}/${status}`, RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      return data;
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
}
