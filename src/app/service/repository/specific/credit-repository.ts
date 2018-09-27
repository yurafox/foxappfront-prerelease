import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { CreditProduct } from '../../../model/credit-product';
import { AbstractDataRepository } from '../abstract/abstract-data-repository';
import {AbstractCreditRepository} from "../abstract/abstract-credit-repository";

// <editor-fold desc="url const">
const creditProductsUrl = `${AppConstants.BASE_URL}/credit/creditproduct`;
const productSupplCreditGradesUrl = `${AppConstants.BASE_URL}/credit/GetProductCreditSize`;
// </editor-fold

@Injectable()
export class CreditRepository extends AbstractCreditRepository {
  constructor(public http: Http, public connServ: ConnectivityService,
              public dataRepo: AbstractDataRepository) {
    super();
  }

  public async getCreditProducts(): Promise<CreditProduct[]> {
    try {
      const response = await this.http.get(creditProductsUrl, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const minLoanAmt = parseInt(await this.dataRepo.getAppParam('MIN_LOAN_AMT'));
      const maxLoanAmt = parseInt(await this.dataRepo.getAppParam('MAX_LOAN_AMT'));

      const cItems = new Array<CreditProduct>();
      if (data != null) {
        if (data) data.forEach(val => {
          let cp = new CreditProduct();
          cp.sId = val.sId;
          cp.sName = val.sName;
          cp.sDefProdId = val.sDefProdId;
          cp.sPartPay = val.sPartPay;
          cp.sGracePeriod = val.sGracePeriod;
          cp.maxTerm = val.maxTerm;
          cp.firstPay = val.firstPay;
          cp.monthCommissionPct = val.monthCommissionPct;
          cp.minAmt = minLoanAmt;
          cp.maxAmt = maxLoanAmt;
          cp.yearPct = val.yearPct;
          cp.kpcPct = val.kpcPct;
          cp.minTerm = val.minTerm;

          cItems.push(cp);
        });
      }
      return cItems;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductCreditSize(idProduct: number, isSupplier: number): Promise<any> {
    try {
      const response = await this.http
        .get(productSupplCreditGradesUrl, RequestFactory.makeSearch([
          { key: "idProduct", value: idProduct.toString() },
          { key: "idSupplier", value: isSupplier.toString() }
        ]))
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data[0])
        return { partsPmtCnt: data[0].partsPmtCnt, creditSize: data[0].creditSize }
      else
        return null;

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
