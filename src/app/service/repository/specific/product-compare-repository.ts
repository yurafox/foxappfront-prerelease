import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Product } from '../../../model/product';
import {AbstractProductCompareRepository} from "../abstract/abstract-product-compare-repository";
import {AbstractProductRepository} from "../abstract/abstract-product-repository";

// <editor-fold desc="url const">
const similarProductsUrl = `${AppConstants.BASE_URL}/ProductCompare/GetSimilarProducts`;
const popularAccessoriesUrl = `${AppConstants.BASE_URL}/ProductCompare/GetPopularAccessories`;
// </editor-fold

@Injectable()
export class ProductCompareRepository extends AbstractProductCompareRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService,
              public productRepo: AbstractProductRepository) {
    super();
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

  public async getSimilarProducts(productId: number): Promise<Product[]> {
    try {
      const response: any = await this.http
        .get(`${similarProductsUrl}/${productId}`, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const products = new Array<Product>();

      if (data != null)
        data.forEach(val =>
          products.push(this.productRepo.getProductFromResponse(val))
        );

      return products;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPopularAccessories(productId: number): Promise<Product[]> {
    try {
      const response: any = await this.http
        .get(`${popularAccessoriesUrl}/${productId}`, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const products = new Array<Product>();

      if (data != null)
        data.forEach(val =>
          products.push(this.productRepo.getProductFromResponse(val))
        );

      return products;
    } catch (err) {
      return await this.handleError(err);
    }
  }

}
