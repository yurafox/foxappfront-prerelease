import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../../app-constants';
import { RequestFactory } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { OrdersFilter } from '../../../../pages/your-orders/your-orders';
import { Product } from '../../../model/product';
import { ClientBonus } from '../../../model/client-bonus';
import { Client } from '../../../model/client';
import { ClientAddress } from '../../../model/client-address';
import { PersonInfo } from '../../../model/person';
import {AbstractClientRepository} from "../abstract/abstract-client-repository";
import {AbstractProductRepository} from "../abstract/abstract-product-repository";
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";

// <editor-fold desc="url const">
const personsUrl = `${AppConstants.CRM_SERVICE_ENDPOINT}/client/person`;
const clientsUrl = `${AppConstants.CRM_SERVICE_ENDPOINT}/client`;
const getClientBonusesExpireInfoUrl = `${AppConstants.CRM_SERVICE_ENDPOINT}/client/GetBonusesExpireInfo`;
const postProductViewUrl = `${AppConstants.CRM_SERVICE_ENDPOINT}/client/LogProductView`;
const clientAddressesUrl = `${AppConstants.CRM_SERVICE_ENDPOINT}/client/clientAddress`;
const clientOrderDatesRangeUrl = `${AppConstants.CRM_SERVICE_ENDPOINT}/client/OrderDatesRanges`;
const viewProductsUrl = `${AppConstants.CRM_SERVICE_ENDPOINT}/client/GetProductsView`;
// </editor-fold

@Injectable()
export class ClientRepository extends AbstractClientRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService,
              public productRepo: AbstractProductRepository) {
    super();
  }

  public async getClientBonusesExpireInfo(): Promise<ClientBonus[]> {
    try {
      const response: any = await this.http
        .get(getClientBonusesExpireInfoUrl, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const arr = new Array<ClientBonus>();
      if (data != null) {
        if (data) data.forEach(val =>
          arr.push(new ClientBonus(val.id, val.clientId, val.bonus, val.dueDate, val.type))
        );
      }
      return arr;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  /*public async getClientByUserId(id: number): Promise<Client> {
    try {
      const _id = id.toString();
      let client = new Client();
      const response: any = await this.http
        .get(clientsUrl, RequestFactory.makeSearch([{ key: "userId", value: _id }]))
        .pipe(retry(3)).toPromise();
      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        if (data[0]) {
          data = data[0];
        }
        client.id = data.id;
        client.name = data.name;
        client.phone = data.phone;
        client.login = data.login;
        client.email = data.email;
        client.fname = data.fname;
        client.lname = data.lname;
        client.barcode = data.barcode;
        // client.bonusBalance = data.bonusBalance;
        // client.actionBonusBalance = data.actionBonusBalance;
        return client;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }*/

  public async getClientByPhone(phonenum: string): Promise<Client> {
    try {
      let client = new Client();
      const response: any = await this.http
        .get(clientsUrl, RequestFactory.makeSearch([{ key: "phone", value: phonenum }]))
        .pipe(retry(3)).toPromise();
      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        if (data[0]) {
          data = data[0];
        }
        client.id = data.id;
        client.barcode = data.barcode;
        client.name = data.name;
        client.phone = data.phone;
        client.login = data.login;
        client.email = data.email;
        client.fname = data.fname;
        client.lname = data.lname;
        return client;
      }
    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async createClientAddress(address: ClientAddress): Promise<ClientAddress> {
    try {
      const response: any = await this.http
        .post(clientAddressesUrl, address.dto, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).pipe(retry(3)).toPromise();
      const data = response.body;

      if (response.status !== 201) {
        throw new Error("server side status error");
      }
      if (data != null) {
        let clientAddress = new ClientAddress();
        clientAddress.id = data.id;
        clientAddress.idClient = data.idClient;
        clientAddress.idCity = data.idCity;
        clientAddress.zip = data.zip;
        clientAddress.street = data.street;
        clientAddress.lat = data.lat;
        clientAddress.lng = data.lng;
        clientAddress.isPrimary = data.isPrimary;
        clientAddress.idCountry = data.idCountry;
        clientAddress.city = data.city;
        clientAddress.bldApp = data.bldApp;
        clientAddress.recName = data.recName;
        clientAddress.phone = data.phone;
        return clientAddress;
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async deleteClientAddress(address: ClientAddress) {
    try {
      const response: any = await this.http.delete(clientAddressesUrl + `/${address.id}`, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).pipe(retry(3)).toPromise();
      if (response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async saveClientAddress(address: ClientAddress): Promise<ClientAddress> {
    try {
      const response: any = await this.http
        .put(clientAddressesUrl, address.dto, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();
      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        let clientAddress = new ClientAddress();
        clientAddress.id = data.id;
        clientAddress.idClient = data.idClient;
        clientAddress.idCity = data.idCity;
        clientAddress.zip = data.zip;
        clientAddress.street = data.street;
        clientAddress.lat = data.lat;
        clientAddress.lng = data.lng;
        clientAddress.isPrimary = data.isPrimary;
        clientAddress.idCountry = data.idCountry;
        clientAddress.city = data.city;
        clientAddress.bldApp = data.bldApp;
        clientAddress.recName = data.recName;
        clientAddress.phone = data.phone;
        return clientAddress;
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientAddressById(id: number): Promise<ClientAddress> {
    if (!id)
      return Promise.resolve(null);
    try {
      let _id = id.toString();

      const response: any = await this.http
        .get(clientAddressesUrl + `/${_id}`, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        let clientAddress = new ClientAddress();
        clientAddress.id = data.id;
        clientAddress.idClient = data.idClient;
        clientAddress.idCity = data.idCity;
        clientAddress.zip = data.zip;
        clientAddress.street = data.street;
        clientAddress.lat = data.lat;
        clientAddress.lng = data.lng;
        clientAddress.isPrimary = data.isPrimary;
        clientAddress.idCountry = data.idCountry;
        clientAddress.city = data.city;
        clientAddress.bldApp = data.bldApp;
        clientAddress.recName = data.recName;
        clientAddress.phone = data.phone;
        return clientAddress;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientAddressesByClientId(id: number): Promise<ClientAddress[]> {
    try {
      let _id = id.toString();
      let clientAdresses = new Array<ClientAddress>();

      const response: any = await this.http
        .get(clientAddressesUrl, RequestFactory.makeSearch([{ key: "idClient", value: _id }]))
        .pipe(retry(3)).toPromise();

      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        for (let i of data) {
          let clientAddress = new ClientAddress();
          clientAddress.id = i.id;
          clientAddress.idClient = i.idClient;
          clientAddress.idCity = i.idCity;
          clientAddress.zip = i.zip;
          clientAddress.street = i.street;
          clientAddress.lat = i.lat;
          clientAddress.lng = i.lng;
          clientAddress.isPrimary = i.isPrimary;
          clientAddress.idCountry = i.idCountry;
          clientAddress.city = i.city;
          clientAddress.bldApp = i.bldApp;
          clientAddress.recName = i.recName;
          clientAddress.phone = i.phone;
          clientAdresses.push(clientAddress);
        }
        return clientAdresses;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientOrderDatesRanges(): Promise<OrdersFilter[]> {
    try {
      const response: any = await this.http
        .get(clientOrderDatesRangeUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      const data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const res = [];

      if (data != null) {
        if (data) data.forEach(val => {
            res.push(new OrdersFilter(val.key, val.displayName, val.isDefault));
          }
        );
      }
      return res;
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getDefaultClientOrderDatesRanges(isDefault: boolean): Promise<OrdersFilter> {
    try {
      const response: any = await this.http
        .get(clientOrderDatesRangeUrl, RequestFactory.makeSearch([
          { key: "isDefault", value: String(isDefault) }
        ])).pipe(retry(3)).toPromise();

      const data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        return new OrdersFilter(data.key, data.displayName, data.isDefault);
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async insertPerson(person: PersonInfo): Promise<PersonInfo> {
    try {
      let p = new PersonInfo();

      const response: any = await this.http
        .post(personsUrl, person, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
      const data = response.body;

      if (response.status !== 201) {
        throw new Error("server side status error");
      }
      if (data != null) {
        p.id = data.id;
        p.firstName = data.firstName;
        p.lastName = data.lastName;
        p.middleName = data.middleName;
        p.passportSeries = data.passportSeries;
        p.passportNum = data.passportNum;
        p.issuedAuthority = data.issuedAuthority;
        p.taxNumber = data.taxNumber;
        p.birthDate = data.birthDate;
        return p;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async updatePerson(person: PersonInfo): Promise<PersonInfo> {
    try {
      let p = new PersonInfo();

      const response: any = await this.http
        .put(personsUrl, person, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        p.id = data.id;
        p.firstName = data.firstName;
        p.lastName = data.lastName;
        p.middleName = data.middleName;
        p.passportSeries = data.passportSeries;
        p.passportNum = data.passportNum;
        p.issuedAuthority = data.issuedAuthority;
        p.taxNumber = data.taxNumber;
        p.birthDate = data.birthDate;
        return p;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPersonById(personId: number): Promise<PersonInfo> {
    try {
      const _id = personId.toString();
      let p = new PersonInfo();
      const response: any = await this.http.get(personsUrl + `/${_id}`, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        p.id = data.id;
        p.firstName = data.firstName;
        p.lastName = data.lastName;
        p.middleName = data.middleName;
        p.passportSeries = data.passportSeries;
        p.passportNum = data.passportNum;
        p.issuedAuthority = data.issuedAuthority;
        p.taxNumber = data.taxNumber;
        p.birthDate = data.birthDate;
        return p;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getViewProducts(): Promise<Product[]> {
    try {
      const response: any = await this.http
        .get(viewProductsUrl, RequestFactory.makeAuthHeader())
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

  public async postProductView(idProduct: number, params: string) {
    try {
      const response: any = await this.http
        .post(postProductViewUrl, { idProduct: idProduct.toString(), viewParams: params },
          RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      if (response.status !== 201) {
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

  // <editor-fold desc="inspect cache predicate"
  public isEmpty<T>(value: T) {
    return value === undefined;
  }
  // </editor-fold>

}
