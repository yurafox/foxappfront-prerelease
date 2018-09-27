import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import {AbstractLegalPolicyRepository} from "../abstract/abstract-legal-policy-repository";

// <editor-fold desc="url const">
const legalPolicyUrl = `${AppConstants.BASE_URL}/legalpolicy/getLegalPolicy`;
// </editor-fold

@Injectable()
export class LegalPolicyRepository extends AbstractLegalPolicyRepository {
  constructor(public http: Http, public connServ: ConnectivityService) {
    super();
  }

  public async getLegalPolicy(langId: string): Promise<string> {
    try {
      const response = await this.http.get(legalPolicyUrl + `/${langId}`, RequestFactory.makeAuthHeader()).toPromise();
      let data: any = response.json();
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
