import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { DeviceData } from '../../../model/device-data';
import {AbstractDeviceDataRepository} from "../abstract/abstract-device-data-repository";

// <editor-fold desc="url const">
const deviceDataUrl = `${AppConstants.BASE_URL}/DeviceData`;
// </editor-fold

@Injectable()
export class DeviceDataRepository extends AbstractDeviceDataRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService) {
    super();
  }

  public async postDeviceData(deviceData: DeviceData) {
    try {
      const response: any = await this.http.post(deviceDataUrl, deviceData, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

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
