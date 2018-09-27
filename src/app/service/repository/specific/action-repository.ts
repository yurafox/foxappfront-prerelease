import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Product } from '../../../model/product';
import { Action } from '../../../model/action';
import { ActionByProduct } from '../../../model/action-by-product';
import {AbstractActionRepository} from "../abstract/abstract-action-repository";
import {AbstractProductRepository} from "../abstract/abstract-product-repository";

// <editor-fold desc="url const">
const productsOfDayUrl = `${AppConstants.BASE_URL}/action/GetProductsOfDay`;
const productsSalesHitsUrl = `${AppConstants.BASE_URL}/action/GetProductsSalesHits`;
const actionDynamicUrl = `${AppConstants.BASE_URL}/action`;
const getActionsByProductUrl = `${AppConstants.BASE_URL}/action/GetProductActions`;
// </editor-fold

@Injectable()
export class ActionRepository extends AbstractActionRepository {
  public cache: CacheProvider = new CacheProvider();

  constructor(public http: Http, public connServ: ConnectivityService,
              public productRepo: AbstractProductRepository) {
    super();
  }

  public async getAction(id: number): Promise<Action> {
    if (!id)
      return null;
    let stringId = id.toString();
    try {
      if (this.cache.Action.HasNotValidCachedValue(stringId)) {
        const response = await this.http
          .get(`${actionDynamicUrl}/${id}`, RequestFactory.makeAuthHeader())
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        let action: Action = null;
        if (data != null) {
          action = new Action(
            data.id,
            data.name,
            new Date(data.dateStart),
            new Date(data.dateEnd),
            data.img_url,
            data.priority,
            data.sketch_content,
            data.action_content,
            (data.isActive) ? true : false,
            data.id_type,
            data.badge_url,
            data.id_supplier,
            data.title,
            (data.is_landing) ? true : false
          );
        }
        if (CacheProvider.Settings && CacheProvider.Settings.action)
          this.cache.Action.Add(stringId, { item: action, expire: Date.now() + CacheProvider.Settings.action.expire });
        return action;
      }
      else {
        return this.cache.Action.Item(stringId).item;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getActions(): Promise<Action[]> {
    try {
      const response = await this.http.get(actionDynamicUrl, RequestFactory.makeAuthHeader()).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const actions = new Array<Action>();
      if (data != null) {
        if (data) data.forEach(val => {
          const actionItem: Action = new Action(
            val.id,
            val.name,
            new Date(val.dateStart),
            new Date(val.dateEnd),
            val.img_url,
            val.priority,
            val.sketch_content,
            val.action_content,
            (data.isActive) ? true : false,
            data.id_type,
            data.badge_url,
            data.id_supplier,
            data.title,
            (data.is_landing) ? true : false
          );

          actions.push(actionItem);
        });
      }
      return actions;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getActionsByProduct(idProduct: number): Promise<ActionByProduct[]> {
    try {
      const _id = idProduct.toString();
      const response = await this.http
        .get(getActionsByProductUrl + `/${_id}`).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const arr: ActionByProduct[] = new Array<ActionByProduct>();
      if (data !== null) {
        if (data) data.forEach(val =>
          arr.push(
            new ActionByProduct(val.actionId, val.actionType, val.idQuotationProduct, val.idProduct, val.idCur, val.actionPrice,
              val.regularPrice, val.bonusQty, val.productName, val.complect, val.isMain, val.idGroup,
              val.imgUrl, val.title)
          )
        );
      }
      return arr;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductsOfDay(): Promise<Product[]> {
    try {
      const res = [];
      // http request
      const response = await this.http
        .get(productsOfDayUrl, RequestFactory.makeAuthHeader())
        .toPromise();

      // response data binding
      let data: any = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data) data.forEach(val =>
        res.push(this.productRepo.getProductFromResponse(val))
      );
      return res;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductsSalesHits(): Promise<Product[]> {
    try {
      const res = [];
      // http request
      const response = await this.http
        .get(productsSalesHitsUrl, RequestFactory.makeAuthHeader())
        .toPromise();

      // response data binding
      let data: any = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data) data.forEach(val =>
        res.push(this.productRepo.getProductFromResponse(val))
      );
      return res;
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
