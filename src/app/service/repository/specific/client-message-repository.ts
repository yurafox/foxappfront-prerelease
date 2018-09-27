import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { ClientMessage } from '../../../model/client-message';
import {AbstractClientMessageRepository} from "../abstract/abstract-client-message-repository";

// <editor-fold desc="url const">
const clientMessageUrl = `${AppConstants.BASE_URL}/ClientMessage`;
// </editor-fold

@Injectable()
export class ClientMessageRepository extends AbstractClientMessageRepository {
  constructor(public http: Http, public connServ: ConnectivityService) {
    super();
  }

  public async postClientMessage(message: ClientMessage): Promise<ClientMessage> {
    try {
      const response = await this.http.post(clientMessageUrl, message, RequestFactory.makeAuthHeader()).toPromise();
      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
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
