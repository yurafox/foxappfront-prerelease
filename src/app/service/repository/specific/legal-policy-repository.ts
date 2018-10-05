import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import {AbstractLegalPolicyRepository} from "../abstract/abstract-legal-policy-repository";

// <editor-fold desc="url const">
const legalPolicyUrl = `${AppConstants.BASE_URL}/legalpolicy/getLegalPolicy`;
// </editor-fold

@Injectable()
export class LegalPolicyRepository extends AbstractLegalPolicyRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService) {
    super();
  }

  public async getLegalPolicy(langId: string): Promise<string> {
    try {
      const response: any = await this.http.get(legalPolicyUrl + `/${langId}`, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        return data.description;
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
