import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { QuotationProduct } from '../../../model/quotation-product';
import {AbstractQuotationProductRepository} from "../abstract/abstract-quotation-product-repository";

// <editor-fold desc="url const">
const quotationProductsUrl = `${AppConstants.BASE_URL}/quotationproduct`;
// </editor-fold

@Injectable()
export class QuotationProductRepository extends AbstractQuotationProductRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService) {
    super();
  }

  public async getQuotationProductById(qpId: number): Promise<QuotationProduct> {
    try {
      const response: any = await this.http
        .get(quotationProductsUrl + `/${qpId}`, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      let quotationProduct: QuotationProduct = null;
      if (data != null) {
        quotationProduct = new QuotationProduct(
          data.id,
          data.idQuotation,
          data.idProduct,
          data.price,
          data.maxDeliveryDays,
          data.stockQuant,
          data.stockLow,
          data.freeShipping
        );
      }
      return quotationProduct;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getValueQuotByProduct(id: number): Promise<QuotationProduct> {
    let _qps = await this.getQuotationProductsByProductId(id);
    if (_qps.length === 0)
      return null;

    // Возвращаем предложение с минимальной ценой
    return _qps.sort((x, y) => {
      return (x.price - y.price);
    })
      .find((i) => { return (i.stockQuant > 0) });
  }

  public async getByItAgainQP(originalQP: QuotationProduct): Promise<QuotationProduct> {
    //Если исходный QP все еще актуальный - возвращаем его
    if (originalQP.stockQuant > 0)
      return originalQP;

    //среди текущих предложений продавцов находим предложение того же продавца и возвращаем его
    const _orQuot = await (<any>originalQP).quotation_p;
    const _qps = await this.getQuotationProductsByProductId(originalQP.idProduct);
    let _foundQuot: QuotationProduct = null;
    for (let i of _qps) {
      let _q = await (<any>i).quotation_p;
      if ((_q.idSupplier === _orQuot.idSupplier) && (i.stockQuant > 0)) {
        return _foundQuot;
      }
    }

    // находим valueQuot и возвращаем его
    return await this.getValueQuotByProduct(originalQP.idProduct);
  }

  public async getQuotationProductsByProductId(productId: number): Promise<QuotationProduct[]> {
    try {
      const response: any = await this.http
        .get(quotationProductsUrl, RequestFactory.makeSearch([
          { key: "idProduct", value: productId.toString() }
        ])).pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const qProducts = new Array<QuotationProduct>();
      if (data != null) {
        if (data) data.forEach(val =>
          qProducts.push(
            new QuotationProduct(
              val.id,
              val.idQuotation,
              val.idProduct,
              val.price,
              val.maxDeliveryDays,
              val.stockQuant,
              val.stockLow,
              val.freeShipping,
              val.actionPrice
            )
          )
        );
      }
      return qProducts;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getQuotationProductsByQuotationId(quotationId: number): Promise<QuotationProduct[]> {
    try {
      const response: any = await this.http
        .get(quotationProductsUrl, RequestFactory.makeSearch([
          { key: "idQuotation", value: quotationId.toString() }
        ])).pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const qProducts = new Array<QuotationProduct>();
      if (data != null) {
        if (data) data.forEach(val =>
          qProducts.push(
            new QuotationProduct(
              val.id,
              val.idQuotation,
              val.idProduct,
              val.price,
              val.maxDeliveryDays,
              val.stockQuant,
              val.stockLow,
              val.freeShipping,
              val.actionPrice
            )
          )
        );
      }
      return qProducts;
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
