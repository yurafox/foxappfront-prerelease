import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { SCN } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { ShipmentItems } from '../../../model/shipment-items';
import { ClientOrderProductHist } from '../../../model/client-order-product-hist';
import { ClientOrder } from '../../../model/client-order';
import { ClientOrderProducts } from '../../../model/client-order-products';
import { Shipment } from '../../../model/shipment';
import {AbstractCartRepository} from "../abstract/abstract-cart-repository";

// <editor-fold desc="url const">
const clientDraftOrderUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/Cart/ClientDraftOrder`;
const clientOrderSpecProductsUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/Cart/GetCartProductsByOrderId`;
const clientOrderHistSpecProductsUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/Cart/GetClientHistProductsByOrderId`;
const cartProductsUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/cart/CartProducts`;
const clientHistOrdersUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/Cart/clientHistOrder`;
const calculateCartUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/cart/calculateCart`;
const shipmentUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/cart/shipment`;
const postOrderUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/cart/postOrder`;
const clientOrderProductsByDateUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/cart/ClientOrderProductsByDate`;
const generateShipmentsUrl = `${AppConstants.CART_SERVICE_ENDPOINT}/cart/GenerateShipments`;
// </editor-fold

@Injectable()
export class CartRepository extends AbstractCartRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService) {
    super();
  }

  public async getCartProducts(): Promise<ClientOrderProducts[]> {
    try {
      const response: any = await this.http.get(cartProductsUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const cClientOrderProducts = new Array<ClientOrderProducts>();
      if (data != null) {
        if (data) data.forEach(val => {
          let p = new ClientOrderProducts();
          p.id = val.id;
          p.idOrder = val.idOrder;
          p.idQuotationProduct = val.idQuotationProduct;
          p.price = val.price;
          p.qty = val.qty;
          p.idStorePlace = val.idStorePlace;
          /*
          p.idLoEntity = val.idLoEntity;
          p.loTrackTicket = val.loTrackTicket;
          p.loDeliveryCost = val.loDeliveryCost;
          p.loDeliveryCompleted = val.loDeliveryCompleted;
          p.loEstimatedDeliveryDate = val.loEstimatedDeliveryDate;
          p.loDeliveryCompletedDate = val.loDeliveryCompletedDate;
          */
          p.errorMessage = val.errorMessage;
          p.warningMessage = val.warningMessage;
          p.payPromoCode = val.payPromoCode;
          p.payPromoCodeDiscount = val.payPromoCodeDiscount;
          p.payBonusCnt = val.payBonusCnt;
          p.payPromoBonusCnt = val.payPromoBonusCnt;
          p.earnedBonusCnt = val.earnedBonusCnt;
          p.warningRead = val.warningRead;
          p.complect = val.complect;
          p.idAction = val.idAction;
          p.actionList = val.actionList;
          p.actionTitle = val.actionTitle;

          cClientOrderProducts.push(p);
        });
      }
      return cClientOrderProducts;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async insertCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts> {
    let response: any = null;
    try {
      // Attention!: if http method returns status others than 2xx, exception raised
      // handle responses of such methods in catch block via analyzing err.status & headers & body content
      response = await this.http
        .post(cartProductsUrl, prod.dto, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();

      const val = response.body;

      if (response.status !== 201) {
        throw new Error("server side status error");
      }

      let p = new ClientOrderProducts();
      p.id = val.id;
      p.idOrder = val.idOrder;
      p.idQuotationProduct = val.idQuotationProduct;
      p.price = val.price;
      p.qty = val.qty;
      p.idStorePlace = val.idStorePlace;
      /*
      p.idLoEntity = val.idLoEntity;
      p.loTrackTicket = val.loTrackTicket;
      p.loDeliveryCost = val.loDeliveryCost;
      p.loDeliveryCompleted = val.loDeliveryCompleted;
      p.loEstimatedDeliveryDate = val.loEstimatedDeliveryDate;
      p.loDeliveryCompletedDate = val.loDeliveryCompletedDate;
      */
      p.errorMessage = val.errorMessage;
      p.warningMessage = val.warningMessage;
      p.warningRead = val.warningRead;
      p.complect = val.complect;
      p.idAction = val.idAction;
      p.actionList = val.actionList;
      p.actionTitle = val.actionTitle;
      SCN.value = parseInt(response.headers.get('X-SCN'));
      return p;
    } catch (err) {
      if ((err.status) && (err.status === 409)) {
        SCN.value = parseInt(err.headers.get('X-SCN'));
        return null;
      }
      else
        return await this.handleError(err);
    }
  }

  public async saveCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts> {
    try {
      const response: any = await this.http
        .put(cartProductsUrl, prod.dto, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();
      const val = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let p = new ClientOrderProducts();
      p.id = val.id;
      p.idOrder = val.idOrder;
      p.idQuotationProduct = val.idQuotationProduct;
      p.price = val.price;
      p.qty = val.qty;
      p.idStorePlace = val.idStorePlace;
      /*
      p.idLoEntity = val.idLoEntity;
      p.loTrackTicket = val.loTrackTicket;
      p.loDeliveryCost = val.loDeliveryCost;
      p.loDeliveryCompleted = val.loDeliveryCompleted;
      p.loEstimatedDeliveryDate = val.loEstimatedDeliveryDate;
      p.loDeliveryCompletedDate = val.loDeliveryCompletedDate;
      p.errorMessage = val.errorMessage;
      */
      p.warningMessage = val.warningMessage;
      p.warningRead = val.warningRead;
      p.complect = val.complect;
      p.idAction = val.idAction;
      p.actionList = val.actionList;
      p.actionTitle = val.actionTitle;

      SCN.value = parseInt(response.headers.get('X-SCN'));

      return p;
    } catch (err) {
      if ((err.status) && (err.status === 409)) {
        SCN.value = parseInt(err.headers.get('X-SCN'));
        return null;
      }
      else
        return await this.handleError(err);
    }
  }

  public async deleteCartProduct(prod: ClientOrderProducts) {
    try {
      const response: any = await this.http
        .delete(cartProductsUrl + `/${prod.id}`, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();
      SCN.value = parseInt(response.headers.get('X-SCN'));
      if (response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async postOrder(order: ClientOrder): Promise<{ isSuccess: boolean, errorMessage: string }> {
    try {
      const response: any = await this.http
        .put(postOrderUrl, order.dto, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
      const val = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      return { isSuccess: val.isSuccess, errorMessage: val.errorMessage };
    } catch (err) {
      if ((err.status) && (err.status === 404)) {
        return null;
      }
      else
        return await this.handleError(err);
    }
  }

  // Метод должен возвращать 1 обїект - черновой заказ, которьій для каждого клиента может бьіть только в единсвенном єкземпляре.
  // Если чернового заказа в базе нет - то создавать и возвращать его
  public async getClientDraftOrder(): Promise<ClientOrder> {
    try {
      const response: any = await this.http
        .get(clientDraftOrderUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      
      if (data != null) {
        let cClientOrder = new ClientOrder(
          data.id,
          data.orderDate,
          data.idCur,
          data.idClient,
          data.total,
          data.idPaymentMethod,
          data.idPaymentStatus,
          data.idStatus,
          null,
          data.loIdClientAddress,
          data.itemsTotal,
          data.shippingTotal,
          data.bonusTotal,
          data.promoBonusTotal,
          data.bonusEarned,
          data.promoCodeDiscTotal,
          data.idPerson, null, null,
          data.idCreditProduct,
          data.creditPeriod,
          data.creditMonthlyPmt,
          data.idApp,
          data.scn
        );
        SCN.value = data.scn;
        return cClientOrder;
      }
      ;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientHistOrderById(orderId: number): Promise<ClientOrder> {
    try {

      const response: any = await this.http
        .get(clientHistOrdersUrl + `/${orderId}`, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        return new ClientOrder(
          data.id,
          data.orderDate,
          data.idCur,
          data.idClient,
          data.total,
          data.idPaymentMethod,
          data.idPaymentStatus,
          data.idStatus,
          null,
          data.loIdClientAddress,
          data.itemsTotal,
          data.shippingTotal,
          data.bonusTotal,
          data.promoBonusTotal,
          data.bonusEarned,
          data.promoCodeDiscTotal,
          data.idPerson,
          null,
          data.clientHistFIO,
          data.clientHistAddress
        );
      };
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async saveClientDraftOrder(order: ClientOrder): Promise<ClientOrder> {
    try {
      const response: any = await this.http
        .put(clientDraftOrderUrl, order.dto, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();
      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        let cClientOrder = new ClientOrder(
          data.id,
          data.orderDate,
          data.idCur,
          data.idClient,
          data.total,
          data.idPaymentMethod,
          data.idPaymentStatus,
          data.idStatus,
          null,
          data.loIdClientAddress,
          data.itemsTotal,
          data.shippingTotal,
          data.bonusTotal,
          data.promoBonusTotal,
          data.bonusEarned,
          data.promoCodeDiscTotal,
          data.idPerson, /*null,*/ null, null,
          data.idCreditProduct,
          data.creditPeriod,
          data.creditMonthlyPmt,
          data.idApp,
          data.scn
        );
        SCN.value = data.scn;
        return cClientOrder;
      }
    }
    catch (err) {
      if ((err.status) && (err.status === 409)) {
        SCN.value = parseInt(err.headers.get('X-SCN'));
        return null;
      }
      else
        return await this.handleError(err);
    }

  }

  public async getClientOrderProductsByOrderId(orderId: number): Promise<ClientOrderProducts[]> {
    try {
      const response: any = await this.http
        .get(clientOrderSpecProductsUrl, RequestFactory.makeSearch([
          { key: "idOrder", value: orderId.toString() }
        ])).pipe(retry(3)).toPromise();

      let orderProducts = [];
      const val = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (val) val.forEach(i => {
        let p = new ClientOrderProducts();
        p.id = i.id;
        p.idOrder = i.idOrder;
        p.idQuotationProduct = i.idQuotationProduct;
        p.price = i.price;
        p.qty = i.qty;
        p.idStorePlace = i.idStorePlace;
        /*
        p.idLoEntity = i.idLoEntity;
        p.loTrackTicket = i.loTrackTicket;
        p.loDeliveryCost = i.loDeliveryCost;
        p.loDeliveryCompleted = i.loDeliveryCompleted;
        p.loEstimatedDeliveryDate = i.loEstimatedDeliveryDate;
        p.loDeliveryCompletedDate = i.loDeliveryCompletedDate;
        */
        p.errorMessage = i.errorMessage;
        p.payPromoCode = i.payPromoCode;
        p.payPromoCodeDiscount = i.payPromoCodeDiscount;
        p.payBonusCnt = i.payBonusCnt;
        p.payPromoBonusCnt = i.payPromoBonusCnt;
        p.earnedBonusCnt = i.earnedBonusCnt;
        p.warningRead = i.warningRead;
        p.complect = i.complect;
        p.idAction = i.idAction;
        p.actionList = i.actionList;
        p.actionTitle = i.actionTitle;
        orderProducts.push(p);
      });
      return orderProducts;
    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getClientHistOrderProductsByOrderId(orderId: number): Promise<ClientOrderProductHist[]> {
    try {
      const response: any = await this.http
        .get(clientOrderHistSpecProductsUrl, RequestFactory.makeSearch([
          { key: "idOrder", value: orderId.toString() }
        ])).pipe(retry(3)).toPromise();

      let orderProducts = [];
      const val = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (val) val.forEach(i => {
        let p = new ClientOrderProductHist();
        p.id = i.id;
        p.idOrder = i.idOrder;
        p.idQuotationProduct = i.idQuotationProduct;
        p.price = i.price;
        p.qty = i.qty;
        p.idStorePlace = i.idStorePlace;
        p.idLoEntity = i.idLoEntity;
        p.loTrackTicket = i.loTrackTicket;
        p.loDeliveryCost = i.loDeliveryCost;
        p.loDeliveryCompleted = i.loDeliveryCompleted;
        p.loEstimatedDeliveryDate = i.loEstimatedDeliveryDate;
        p.loDeliveryCompletedDate = i.loDeliveryCompletedDate;
        p.earnedBonusCnt = i.earnedBonusCnt;
        /*
        p.errorMessage = i.errorMessage;
        p.payPromoCode = i.payPromoCode;
        p.payPromoCodeDiscount = i.payPromoCodeDiscount;
        p.payBonusCnt = i.payBonusCnt;
        p.payPromoBonusCnt = i.payPromoBonusCnt;
        p.warningRead = i.warningRead;
        p.complect = i.complect;
        p.idAction = i.idAction;
        p.actionList = i.actionList;
        p.actionTitle = i.actionTitle;
        */
        orderProducts.push(p);
      });
      return orderProducts;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientOrderProductsByDate(datesRange: string):
    Promise<{
      orderId: string, orderDate: Date, orderSpecId: number, idProduct: number,
      productName: string, productImageUrl: string, loTrackTicket: string, idQuotation: number
    }[]> {
    try {
      const response: any = await this.http.get(clientOrderProductsByDateUrl, RequestFactory.makeSearch([
        { key: "datesRange", value: datesRange }
      ])).pipe(retry(3)).toPromise();

      const data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const res = [];

      if (data != null) {
        if (data) data.forEach(val => {
            res.push({
              orderId: val.orderId, orderDate: val.orderDate, orderSpecId: val.orderSpecId,
              idProduct: val.idProduct, productName: val.productName, productImageUrl: val.productImageUrl,
              loTrackTicket: val.loTrackTicket, idQuotation: val.idQuotation
            });
          }
        );
      }
      return res;
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async calculateCart(promoCode: string, maxBonusCnt: number, usePromoBonus: boolean, creditProductId: number):
    Promise<{
      clOrderSpecProdId: number, promoCode: string, promoCodeDisc: number, bonusDisc: number, promoBonusDisc: number,
      earnedBonus: number, qty: number
    }[]> {
    try {
      const response: any = await this.http
        .post(calculateCartUrl, {
            promoCode: promoCode, maxBonusCnt: maxBonusCnt,
            usePromoBonus: usePromoBonus, creditProductId: creditProductId /*,
                                      cartContent: _dtoContent*/}
          , RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();
      const val = response.body;

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
      let _res = [];
      if (val) {
        val.forEach(i => {
          _res.push({
            clOrderSpecProdId: i.clOrderSpecProdId, promoCode: i.promoCode, promoCodeDisc: i.promoCodeDisc,
            bonusDisc: i.bonusDisc, promoBonusDisc: i.promoBonusDisc, earnedBonus: i.earnedBonus, qty: i.qty
          });
        });
      }
      return _res;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async generateShipments(): Promise<Shipment[]> {
    try {
      const response: any = await this.http.post(generateShipmentsUrl, null, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const arr: Shipment[] = [];
      if (data !== null) {
        if (data) data.forEach(val =>
          arr.push(
            new Shipment(val.id, val.idOrder, val.idSupplier, val.idLoEntity, val.loTrackTicket, val.loDeliveryCost,
              val.loDeliveryCompleted, val.loEstimatedDeliveryDate, val.loDeliveryCompletedDate, val.idStorePlace,
              val.idLoEntityOffice, val.idLoDeliveryType, this.getShipmentItemsFromJson(val.shipmentItems))
          )
        );
      }

      return arr;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async saveShipment(value: Shipment): Promise<Shipment> {
    try {
      const response: any = await this.http
        .put(shipmentUrl, value.dto, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();
      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        let res = new Shipment(
          data.id, data.idOrder, data.idSupplier, data.idLoEntity, data.loTrackTicket, data.loDeliveryCost,
          data.loDeliveryCompleted, data.loEstimatedDeliveryDate, data.loDeliveryCompletedDate, data.idStorePlace,
          data.idLoEntityOffice, data.idLoDeliveryType, this.getShipmentItemsFromJson(data.shipmentItems));
        return res;
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public getShipmentItemsFromJson(data: any): ShipmentItems[] {
    let arr = [];
    if (data) data.forEach(
      x => {
        let si = new ShipmentItems(x.id, x.idShipment, x.idOrderSpecProd, x.qty, x.errorMessage);
        arr.push(si);
      }
    );
    return arr;
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
