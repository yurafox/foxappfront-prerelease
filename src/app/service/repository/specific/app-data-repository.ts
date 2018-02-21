import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { Injectable } from "@angular/core";
import { Http, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/toPromise";
import CacheProvider = Providers.CacheProvider;
import {
  QuotationProduct,
  Product,
  Manufacturer,
  ProductPropValue,
  Prop,
  PropEnumList,
  Quotation,
  Supplier,
  Currency,
  ProductReview,
  City,
  Store,
  ProductStorePlace,
  StorePlace,
  Lang,
  Action,
  ActionOffer,
  Client,
  ClientAddress,
  Country,
  ClientOrder,
  ClientOrderProducts,
  StoreReview,
  LoEntity,
  LoSupplEntity,
  EnumPaymentMethod,
  Novelty,
  NoveltyDetails,
  DeviceData,
  ReviewAnswer,
  Poll,PollQuestion,PollQuestionAnswer,
  ClientPollAnswer, CreditProduct, ClientBonus, PersonInfo,
  LoTrackLog,
  Category,
  MeasureUnit
} from '../../../model/index';

import { AbstractDataRepository } from '../../index';
import { Providers, System } from "../../../core/app-core";

// <editor-fold desc="url const">
//PRODUCTION URLS
const productsUrl = "https://localhost:44374/api/product";
const currenciesUrl = "https://localhost:44374/api/currency";
const manufacturersUrl = "https://localhost:44374/api/manufacturer";
const quotationProductsUrl = "https://localhost:44374/api/quotationproduct";
const suppliersUrl = "https://localhost:44374/api/supplier";

//DEV URLS
//const currenciesUrl = "/api/mcurrencies";
//const productsUrl = "/api/mproducts";
//const manufacturersUrl = "/api/manufacturers";
//const quotationProductsUrl = "/api/mquotationProducts";
//const suppliersUrl = "/api/msuppliers";
const quotationsUrl = "/api/mquotation";
const productReviewsUrl = "/api/mproductReviews";
const citiesUrl = "/api/mcities";
const storesUrl = "/api/mstores";
const storePlacesUrl = "/api/mstorePlaces";
const productStorePlacesUrl = "/api/mproductStorePlaces";
const LangUrl = "/api/mlocalization";
const clientsUrl = "/api/mclients";
const clientAddressesUrl = "/api/mclientAddresses";
const countriesUrl = "/api/mcountries";
const clientOrdersUrl = "/api/mclientOrders";
const clientOrderSpecProductsUrl = "/api/mclientOrderSpecProducts";
const clientOrderSpecProductsOfClientUrl = "/api/mclientOrderSpecProductsOfClient";
const cartProductsUrl = "/api/mcartProducts";
const pagesDynamicUrl = "/api/mpages";
const actionDynamicUrl = "/api/mactions";
const actionOffersUrl = "/api/mactionOffers";
const storeReviewsUrl = "/api/mstoreReviews";
const loEntitiesUrl = "/api/mloEntities";
const loSupplEntitiesUrl = "/api/mloSupplEntities";
const getDeliveryCostUrl = "/api/mgetDeliveryCost";
const getBonusesInfoForCheckoutUrl = "/api/mgetBonusesInfoForCheckout";
const getDeliveryDateUrl = "/api/mgetDeliveryDate";
const getPaymentMethodsUrl = "/api/mpaymentMethods";
const clientDraftOrderUrl = "/api/mclientDraftOrder";
const productSupplCreditGradesUrl = "/api/mproductSupplCreditGrades";
const creditProductsUrl = "/api/mcreditProducts";
const getPromocodeDiscountUrl = "/api/mgetPromocodeDiscount";
const calculateCartUrl = "/api/mcalculateCart";
const getClientBonuses = "/api/mclientBonuses";
const personsUrl = "/api/mpersons";
const postProductViewUrl = "/api/mpostProductView";

const pollsUrl='/api/mpolls';
const pollQuestionUrl='/api/mpollQuestion';
const pollQuestionAnswerUrl = '/api/mpollQuestionAnswer';
const clientPollAnswersUrl = '/api/mclientPollAnswers';
const noveltyDynamicUrl = "/api/mnovelties";
const noveltyDetailsDynamicUrl = "/api/mnoveltyDetails";
const deviceDataUrl = "/api/mdeviceData";
const redirectToPaymasterUrl = "/api/mredirectToPaymaster";
const specLOTrackingLogUrl = '/api/mspecLOTrackingLog';
const measureUnitUrl = '/api/mmeasureUnits';

const categoriesUrl = AppConstants.USE_PRODUCTION ? `${AppConstants.BASE_URL}/api/catalog`:"/api/mcategories";
// </editor-fold

@Injectable()
export class AppDataRepository extends AbstractDataRepository {
  private cache: CacheProvider = new CacheProvider();

  constructor(private http: Http) {
    super();
  }

  public async getClientBonuses(clientId: number): Promise <ClientBonus[]> {
    try {
      const response = await this.http
        .get(getClientBonuses, {
          search: this.createSearchParams([
            {key: "clientId", value: clientId.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const arr = new Array<ClientBonus>();
      if (data != null) {
        data.forEach(val =>
          arr.push(new ClientBonus(val.id,val.clientId, val.bonus, val.dueDate))
          );
      }
      return arr;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postProductView(idProduct: number, params: string) {
    try {
      const response = await this.http
        .post(postProductViewUrl, {idProduct: idProduct.toString(), params: params}).toPromise();
      const val = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }


  public async getDiscountByPromocode(promoCode: string): Promise<number> {
    try {
      const response = await this.http
        .post(getPromocodeDiscountUrl, {promoCode: promoCode}).toPromise();
      const val = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
      return val.discount;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async calculateCart(promoCode: string, maxBonusCnt: number, usePromoBonus: boolean,
                             cartContent: ClientOrderProducts[]):
      Promise<{clOrderSpecProdId: number, promoCodeDisc: number, bonusDisc: number, promoBonusDisc: number}[]>
  {
    try {
      let _dtoContent = [];
      cartContent.forEach(i => {
          _dtoContent.push(i.dto);
        }
      );

      const response = await this.http
        .post(calculateCartUrl, {promoCode: promoCode, maxBonusCnt: maxBonusCnt,
                                        usePromoBonus: usePromoBonus, cartContent: _dtoContent})
        .toPromise();
      const val = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
      let _res = [];
      if (val) {
        val.forEach(i => {
          _res.push({clOrderSpecProdId: i.clOrderSpecProdId, promoCodeDisc: i.promoCodeDisc,
            bonusDisc: i.bonusDisc, promoBonusDisc: i.promoBonusDisc});
        });
      }
      return _res;
    } catch (err) {
      return await this.handleError(err);
    }
  }


  public async getBonusesInfoForCheckout(): Promise<{ bonusLimit: number, actionBonusLimit: number }> {
    try {
      const response = await this.http
        .get(getBonusesInfoForCheckoutUrl).toPromise();
      const val = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
      return val.BonusInfo;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCreditProducts(): Promise<CreditProduct[]> {
    try {
      const response = await this.http.get(creditProductsUrl).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cItems = new Array<CreditProduct>();
      if (data != null) {
        data.forEach(val => {
          let cp = new CreditProduct();
          cp.sId = val.sId;
          cp.sName = val.sName;
          cp.sDefProdId = val.sDefProdId;
          cp.sPartPay = val.sPartPay;
          cp.sGracePeriod = val.sGracePeriod;
          cp.maxTerm = val.maxTerm;
          cp.firstPay = val.firstPay;
          cp.monthCommissionPct = val.monthCommissionPct;
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


  public async getPmtMethods(): Promise<EnumPaymentMethod[]> {
    try {
      const response = await this.http.get(getPaymentMethodsUrl).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cItems = new Array<EnumPaymentMethod>();
      if (data != null) {
        data.forEach(val => {
          cItems.push(new EnumPaymentMethod(val.id, val.name));
        });
      }
      return cItems;
    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getPmtMethodById(id: number): Promise<EnumPaymentMethod> {
    try {
      let _id = id.toString();
      const response = await this.http
        .get(getPaymentMethodsUrl + `/${_id}`)
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data)
        return new EnumPaymentMethod(
          data.id,
          data.name
        )
      else
        return null;
    } catch (err) {
      return await this.handleError(err);
    }
  }


  public async getDeliveryDate(order: ClientOrderProducts, loEntityId: number): Promise<Date> {
    try {
      const response = await this.http
        .post(getDeliveryDateUrl, {order: order, loEntity: loEntityId})
        .toPromise();
      const val = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
      return val.DeliveryDate;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getDeliveryCost(order: ClientOrderProducts, loEntityId: number): Promise<number> {
    try {
      //console.log('orderSpecId: '+ orderSpecId + ', loEntityId: ' + loEntityId);
      const response = await this.http
        .post(getDeliveryCostUrl, {order: order, loEntity: loEntityId})
        .toPromise();
      const val = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
      return val.AssessedCost;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductCreditSize(idProduct: number, isSupplier: number): Promise<any> {
    try {
      const response = await this.http
        .get(productSupplCreditGradesUrl, {
          search: this.createSearchParams([
            {key: "idProduct", value: idProduct.toString()},
            {key: "idSupplier", value: isSupplier.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data[0])
        return {partsPmtCnt: data[0].partsPmtCnt, creditSize: data[0].creditSize}
      else
        return null;

    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getLoEntitiyById(entityId: number): Promise<LoEntity> {
    try {
      const response = await this.http
        .get(loEntitiesUrl + `/${entityId}`)
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data)
        return new LoEntity(
          data.id,
          data.name
        );
    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getLoTrackLogByOrderSpecId(id: number): Promise<LoTrackLog[]> {
    try {
      const response = await this.http
        .get(specLOTrackingLogUrl, {
          search: this.createSearchParams([
            {key: "idOrderSpecProd", value: id.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const arr = new Array<LoTrackLog>();
      if (data != null) {
        data.forEach(val =>
          arr.push(
            new LoTrackLog(
              val.id,
              val.idOrderSpecProd,
              val.trackDate,
              val.trackString
            )
          )
        );

        arr.sort((x,y) => {
            return (+new Date(y.trackDate) - +new Date(x.trackDate));
          }
        );
      }

      return arr;
    } catch (err) {
      return await this.handleError(err);
    }

  }

  public async getLoEntitiesForSupplier(supplierId: number): Promise<LoSupplEntity[]> {
    try {
      const response = await this.http
        .get(loSupplEntitiesUrl, {
          search: this.createSearchParams([
            {key: "idSupplier", value: supplierId.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cloSupplEntArr = new Array<LoSupplEntity>();
      if (data != null) {
        data.forEach(val =>
          cloSupplEntArr.push(
            new LoSupplEntity(
              val.id,
              val.idSupplier,
              val.idLoEntity
            )
          )
        );
      }
      return cloSupplEntArr;
    } catch (err) {
      return await this.handleError(err);
    }

  }

  // Метод должен возвращать 1 обїект - черновой заказ, которьій для каждого клиента может бьіть только в единсвенном єкземпляре.
  // Если чернового заказа в базе нет - то создавать и возвращать его
  public async getClientDraftOrder(): Promise<ClientOrder> {
    try {
      const response = await this.http
        .get(clientDraftOrderUrl).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        let cClientOrder = new ClientOrder(
          data[0].id,
          data[0].orderDate,
          data[0].idCur,
          data[0].idClient,
          data[0].total,
          data[0].idPaymentMethod,
          data[0].idPaymentStatus,
          data[0].idStatus,
          null,
          data[0].loIdEntity,
          data[0].loIdClientAddress,
          data[0].itemsTotal,
          data[0].shippingTotal,
          data[0].bonusTotal,
          data[0].promoBonusTotal,
          data[0].bonusEarned,
          data[0].promoCodeDiscTotal,
          data[0].idPerson
        );
        return cClientOrder;
      }
      ;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientOrders(): Promise<ClientOrder[]> {
    try {

      const response = await this.http
        .get(clientOrdersUrl, {
          //TODO в реальном бекенде входящие параметры игнорить и возвращать все заказы клиента в статусе > 0
          search: this.createSearchParams([
            {key: "idClient", value: "100"},
            {key: "idStatus", value: "1"}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cClientOrders = new Array<ClientOrder>();
      if (data != null) {
        data.forEach(val =>
          cClientOrders.push(
            new ClientOrder(
              val.id,
              val.orderDate,
              val.idCur,
              val.idClient,
              val.total,
              val.idPaymentMethod,
              val.idPaymentStatus,
              val.idStatus,
              null,
              val.loIdEntity,
              val.loIdClientAddress,
              val.itemsTotal,
              val.shippingTotal,
              val.bonusTotal,
              val.promoBonusTotal,
              val.bonusEarned,
              val.promoCodeDiscTotal,
              val.idPerson
            )
          )
        );
      };
      return cClientOrders;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientOrderById(id: number): Promise<ClientOrder> {
    try {
      const response = await this.http
        .get(clientOrdersUrl, {
          search: this.createSearchParams([
            {key: "idStatus", value: id.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
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
        data.loIdEntity,
        data.loIdClientAddress,
        data.itemsTotal,
        data.shippingTotal,
        data.bonusTotal,
        data.promoBonusTotal,
        data.bonusEarned,
        data.promoCodeDiscTotal,
        data.idPerson
      );
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async updateCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts> {
    //TODO
    return null;
  }

  public async saveCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts> {
    try {
      const response = await this.http
        .post(clientOrderSpecProductsUrl, prod.dto /*obj*/)
        .toPromise();
      const val = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
      let p = new ClientOrderProducts();
      p.id = val.id;
      p.idOrder = val.idOrder;
      p.idQuotationProduct = val.idQuotationProduct;
      p.price = val.price;
      p.qty = val.qty;
      p.idStorePlace = val.idStorePlace;
      p.idLoEntity = val.idLoEntity;
      p.loTrackTicket = val.loTrackTicket;
      p.loDeliveryCost = val.loDeliveryCost;
      p.loDeliveryCompleted = val.loDeliveryCompleted;
      p.loEstimatedDeliveryDate = val.loEstimatedDeliveryDate;
      p.loDeliveryCompletedDate = val.loDeliveryCompletedDate;
      p.errorMessage = val.errorMessage;
      p.warningMessage = val.warningMessage;
      p.warningRead = val.warningRead;
      return p;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async deleteCartProduct(prod: ClientOrderProducts) {
    try {
      const response = await this.http
        .delete(clientOrderSpecProductsUrl + `/${prod.id}`)
        .toPromise();
      if (response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getCartProducts(): Promise<ClientOrderProducts[]> {
    try {
      const response = await this.http.get(cartProductsUrl).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cClientOrderProducts = new Array<ClientOrderProducts>();
      if (data != null) {
        data.forEach(val => {
          let p = new ClientOrderProducts();
          p.id = val.id;
          p.idOrder = val.idOrder;
          p.idQuotationProduct = val.idQuotationProduct;
          p.price = val.price;
          p.qty = val.qty;
          p.idStorePlace = val.idStorePlace;
          p.idLoEntity = val.idLoEntity;
          p.loTrackTicket = val.loTrackTicket;
          p.loDeliveryCost = val.loDeliveryCost;
          p.loDeliveryCompleted = val.loDeliveryCompleted;
          p.loEstimatedDeliveryDate = val.loEstimatedDeliveryDate;
          p.loDeliveryCompletedDate = val.loDeliveryCompletedDate;
          p.errorMessage = val.errorMessage;
          p.warningMessage = val.warningMessage;
          p.payPromoCode = val.payPromoCode;
          p.payPromoCodeDiscount = val.payPromoCodeDiscount;
          p.payBonusCnt = val.payBonusCnt;
          p.payPromoBonusCnt = val.payPromoBonusCnt;
          p.earnedBonusCnt = val.earnedBonusCnt;
          p.warningRead = val.warningRead;

          cClientOrderProducts.push(p);
        });
      }
      return cClientOrderProducts;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientOrderProductsByOrderId(orderId: number): Promise<ClientOrderProducts[]> {
    try {
      const response = await this.http
        .get(clientOrderSpecProductsUrl, {
          search: this.createSearchParams([
            {key: "idOrder", value: orderId.toString()}
          ])
        })
        .toPromise();

      let orderProducts = [];
      const val = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      val.forEach(i => {
        let p = new ClientOrderProducts();
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
        p.errorMessage = i.errorMessage;
        p.payPromoCode = i.payPromoCode;
        p.payPromoCodeDiscount = i.payPromoCodeDiscount;
        p.payBonusCnt = i.payBonusCnt;
        p.payPromoBonusCnt = i.payPromoBonusCnt;
        p.earnedBonusCnt = i.earnedBonusCnt;
        p.warningRead = i.warningRead;
        orderProducts.push(p);
      });
      return orderProducts;
    } catch (err) {
      return await this.handleError(err);
    }

  }


  public async getClientDraftOrderSpecProductsById(id: number): Promise<ClientOrderProducts> {
    try {
      const _id = id.toString();
      const response = await this.http
        .get(clientOrderSpecProductsUrl + `/${_id}`)
        .toPromise();

      const val = response.json();
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
      p.idLoEntity = val.idLoEntity;
      p.loTrackTicket = val.loTrackTicket;
      p.loDeliveryCost = val.loDeliveryCost;
      p.loDeliveryCompleted = val.loDeliveryCompleted;
      p.loEstimatedDeliveryDate = val.loEstimatedDeliveryDate;
      p.loDeliveryCompletedDate = val.loDeliveryCompletedDate;
      p.errorMessage = val.errorMessage;
      p.warningMessage = val.warningMessage;
      p.payPromoCode = val.payPromoCode;
      p.payPromoCodeDiscount = val.payPromoCodeDiscount;
      p.payBonusCnt = val.payBonusCnt;
      p.payPromoBonusCnt = val.payPromoBonusCnt;
      p.earnedBonusCnt = val.earnedBonusCnt;
      p.warningRead = val.warningRead;
      return p;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientDraftOrderSpecProducts(): Promise<Array<ClientOrderProducts>> {
    try {
      let orderProducts = [];
      const response = await this.http
        .get(clientOrderSpecProductsUrl + '')
        .toPromise();

      const val = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      val.forEach(product => {
        let p = new ClientOrderProducts();
        p.id = product.id;
        p.idOrder = product.idOrder;
        p.idQuotationProduct = product.idQuotationProduct;
        p.price = product.price;
        p.qty = product.qty;
        p.idStorePlace = product.idStorePlace;
        p.idLoEntity = product.idLoEntity;
        p.loTrackTicket = product.loTrackTicket;
        p.loDeliveryCost = product.loDeliveryCost;
        p.loDeliveryCompleted = product.loDeliveryCompleted;
        p.loEstimatedDeliveryDate = product.loEstimatedDeliveryDate;
        p.loDeliveryCompletedDate = product.loDeliveryCompletedDate;
        p.errorMessage = product.errorMessage;
        p.payPromoCode = product.payPromoCode;
        p.payPromoCodeDiscount = product.payPromoCodeDiscount;
        p.payBonusCnt = product.payBonusCnt;
        p.payPromoBonusCnt = product.payPromoBonusCnt;
        p.earnedBonusCnt = product.earnedBonusCnt;
        p.warningRead = product.warningRead;

        orderProducts.push(p);
      });
      return orderProducts;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientOrderSpecProductsByClientId(clientId: number): Promise<Array<ClientOrderProducts>> {
    try {
      let orderProducts = [];
      const response = await this.http
        .get(clientOrderSpecProductsOfClientUrl, {
          search: this.createSearchParams([
            {key: "idClient", value: clientId.toString()}
          ])
        })
        .toPromise();

      const val = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      val.forEach(product => {
        let p = new ClientOrderProducts();
        p.id = product.id;
        p.idOrder = product.idOrder;
        p.idQuotationProduct = product.idQuotationProduct;
        p.price = product.price;
        p.qty = product.qty;
        p.idStorePlace = product.idStorePlace;
        p.idLoEntity = product.idLoEntity;
        p.loTrackTicket = product.loTrackTicket;
        p.loDeliveryCost = product.loDeliveryCost;
        p.loDeliveryCompleted = product.loDeliveryCompleted;
        p.loEstimatedDeliveryDate = product.loEstimatedDeliveryDate;
        p.loDeliveryCompletedDate = product.loDeliveryCompletedDate;
        p.errorMessage = product.errorMessage;
        p.payPromoCode = product.payPromoCode;
        p.payPromoCodeDiscount = product.payPromoCodeDiscount;
        p.payBonusCnt = product.payBonusCnt;
        p.payPromoBonusCnt = product.payPromoBonusCnt;
        p.earnedBonusCnt = product.earnedBonusCnt;
        p.warningRead = product.warningRead;
        orderProducts.push(p);
      });
      return orderProducts;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductReviewsByProductId(productId: number): Promise<ProductReview[]> {
    try {
      const response = await this.http
        .get(productReviewsUrl, {
          search: this.createSearchParams([
            {key: "idProduct", value: productId.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const qProductsRevs = new Array<ProductReview>();
      if (data != null) {
        data.forEach(val => {
          let answers: ReviewAnswer[] = [];
          if (val.reviewAnswers) {
            val.reviewAnswers.forEach(answer => {
              answers.push(
                new ReviewAnswer(
                  answer.id,
                  answer.idReview,
                  answer.user,
                  answer.answerDate,
                  answer.answerText
                )
              );
            });
          }
          qProductsRevs.push(
            new ProductReview(
              val.id,
              val.idProduct,
              val.user,
              val.reviewDate,
              val.reviewText,
              val.rating,
              val.advantages,
              val.disadvantages,
              val.upvotes,
              val.downvotes,
              answers
            )
          )
        });
      }
      return qProductsRevs;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductStorePlacesByQuotId(quotId: number): Promise<ProductStorePlace[]> {
    try {
      const response = await this.http
        .get(productStorePlacesUrl, {
          search: this.createSearchParams([
            {key: "idQuotationProduct", value: quotId.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const qProductsStorePlaces = new Array<ProductStorePlace>();
      if (data != null) {
        for (let val of data) {
          let psp = new ProductStorePlace(
            val.id,
            val.idQuotationProduct,
            val.idStorePlace,
            val.qty
          );

          let sp = await (<any>psp).storeplace_p;
          if (sp.type == 1)
          //select only storeplaces with type of store
            qProductsStorePlaces.push(psp);
        }
      }
      /*
      return qProductsStorePlaces.sort((a, b) =>
        {return ( (<any>a).idStorePlace.storeplace.city.name - (<any>b).idStorePlace.storeplace.city.name)});
*/
      return qProductsStorePlaces;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCountries(): Promise<Country[]> {
    try {
      const response = await this.http.get(countriesUrl).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cCountries = new Array<Country>();
      if (data != null) {
        data.forEach(val => {
          let p = new Country();
          p.id = val.id;
          p.name = val.name;

          cCountries.push(p);
        });
      }
      return cCountries;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCountryById(id: number): Promise<Country> {
    if (!id) return null;
    try {
      const _id = id.toString();
      let country = new Country();
      const response = await this.http
        .get(countriesUrl + `/${_id}`)
        .toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        country.id = data.id;
        country.name = data.name;
        return country;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientByUserId(id: number): Promise<Client> {
    try {
      const _id = id.toString();
      let client = new Client();
      const response = await this.http
        .get(clientsUrl, {
          search: this.createSearchParams([{key: "userId", value: _id}])
        })
        .toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        data = data[0];
        client.id = data.id;
        client.name = data.name;
        client.phone = data.phone;
        client.login = data.login;
        client.email = data.email;
        client.fname = data.fname;
        client.lname = data.lname;
        client.barcode = data.barcode;
        client.bonusBalance = data.bonusBalance;
        client.actionBonusBalance = data.actionBonusBalance;
        return client;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientById(id: number): Promise<Client> {
    try {
      const _id = id.toString();
      let client = new Client();
      const response = await this.http.get(clientsUrl + `/${_id}`).toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        client.id = data.id;
        client.name = data.name;
        client.phone = data.phone;
        client.login = data.login;
        client.email = data.email;
        client.fname = data.fname;
        client.lname = data.lname;
        client.barcode = data.barcode;
        return client;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientByEmail(email: string): Promise<Client> {
    try {
      let client = new Client();
      const response = await this.http
        .get(clientsUrl, {
          search: this.createSearchParams([{key: "email", value: email}])
        })
        .toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        data = data[0];
        client.id = data.id;
        client.name = data.name;
        client.phone = data.phone;
        client.login = data.login;
        client.email = email;
        client.fname = data.fname;
        client.lname = data.lname;
        return client;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientAddressById(id: number): Promise<ClientAddress> {
    if (!id)
      return Promise.resolve(null);
    try {
      let _id = id.toString();

      const response = await this.http
        .get(clientAddressesUrl + `/${_id}`).toPromise();

      let data: any = response.json();
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

      const response = await this.http
        .get(clientAddressesUrl, {
          search: this.createSearchParams([{key: "idClient", value: _id}])
        })
        .toPromise();

      let data: any = response.json();
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

  public async getStorePlaceById(id: number): Promise<StorePlace> {
    try {
      const _id: string = id.toString();
      let storeplace = new StorePlace();
      if (this.isEmpty(this.cache.StorePlace.Item(_id))) {
        // http request
        const response = await this.http
          .get(storePlacesUrl + `/${_id}`)
          .toPromise();

        // response data binding
        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          //storeplace = new StorePlace();
          storeplace.id = id;
          storeplace.name = data.name;
          storeplace.idSupplier = data.idSupplier;
          storeplace.idCity = data.idCity;
          storeplace.zip = data.zip;
          storeplace.address_line = data.address_line;
          storeplace.lat = data.lat;
          storeplace.lng = data.lng;
          storeplace.type = data.type;

          // add to cache
          this.cache.StorePlace.Add(_id, storeplace);
        }
        return storeplace;
      } else {
        // </editor-fold>
        return this.cache.StorePlace.Item(_id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCityById(id: number): Promise<City> {
    if (!id) return null;
    try {
      const city: City = new City();
      const _id: string = id.toString();
      //let city = null;
      if (this.isEmpty(this.cache.City.Item(_id))) {
        // http request
        const response = await this.http.get(citiesUrl + `/${_id}`).toPromise();

        // response data binding
        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          //city = new City();
          city.id = id;
          city.name = data.name;

          // add to cache
          this.cache.City.Add(_id, city);
        }
        return city;
      } else {
        // </editor-fold>
        return this.cache.City.Item(_id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  search(textToSearch: string, srchVal: string): boolean {
    if (textToSearch && srchVal) {
      let ar = srchVal.toLowerCase().split(" ");
      let i = 0;
      ar.forEach(str => {
        if (!(textToSearch.toLowerCase().indexOf(str) == -1)) {
          i++;
        }
      });
      if (i == ar.length) return true;
    } else return false;
    //return ((textToSearch) && !(textToSearch.toLowerCase().indexOf(srchVal.toLowerCase()) == -1));
  }

  public async searchProducts(srchString: string): Promise<Product[]> {
    //TODO This method should be implemented in back end in production mode!
    try {
      const response = await this.http.get(productsUrl).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const products = new Array<Product>();

      if (data != null) {
        for (let val of data) {
          let props = new Array<ProductPropValue>();
          if (val.props && val.props.length !== 0) {
            props = this.getPropValuefromProduct(val);
          }

          // create current product
          const productItem: Product = new Product(
            val.id,
            val.name,
            val.price,
            val.oldPrice,
            val.bonuses,
            val.manufacturerId,
            props,
            val.imageUrl,
            val.rating,
            val.recall,
            val.supplOffers,
            val.description,
            val.slideImageUrls,
            val.barcode
          );

          let mnf = await (<any>productItem).manufacturer_p;
          if (
            this.search(mnf.name, srchString) ||
            this.search(productItem.description, srchString) ||
            this.search(productItem.id.toString(), srchString) ||
            this.search(productItem.name, srchString) ||
            this.search(productItem.barcode, srchString)
          ) {
            products.push(productItem);
          }
        }
      }
      return products;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getProducts(urlQuery: string,
                           cacheForce: boolean): Promise<Product[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Products.Count() === 0 || cacheForce === true) {
        const response = await this.http
          .get(productsUrl, {
            search: this.createSearchParams([{key: "url", value: urlQuery}])
          })
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const products = new Array<Product>();
        if (data != null) {
          data.forEach(val => {
            let props = new Array<ProductPropValue>();
            if (val.props && val.props.length !== 0) {
              props = this.getPropValuefromProduct(val);
            }

            // create current product
            const productItem: Product = new Product(
              val.id,
              val.name,
              val.price,
              val.oldPrice,
              val.bonuses,
              val.manufacturerId,
              props,
              val.imageUrl,
              val.rating,
              val.recall,
              val.supplOffers,
              val.description,
              val.slideImageUrls,
              val.barcode
            );

            products.push(productItem);

            // add product to cashe
            this.cache.Products.Add(productItem.id.toString(), productItem);
          });
        }
        return products;
      } else {
        // </editor-fold>
        return this.cache.Products.Values();
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getQuotationProductById(qpId: number): Promise<QuotationProduct> {
    try {
      const response = await this.http
        .get(quotationProductsUrl + `/${qpId}`)
        .toPromise();

      const data = response.json();
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
    return _qps.sort((x,y) => {
      return (x.price - y.price);
    })
      .find((i) => {return (i.stockQuant > 0)});
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

  //TODO при реализации бекенда возвращать в этом методе только те QuotationProducts, по которым остаток > 0
  // и не закрытые (т.е. актуальные на сейчас предложения продавцов, а не позавчерашние)
  public async getQuotationProductsByProductId(productId: number): Promise<QuotationProduct[]> {
    try {
      const response = await this.http
        .get(quotationProductsUrl, {
          search: this.createSearchParams([
            {key: "idProduct", value: productId.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const qProducts = new Array<QuotationProduct>();
      if (data != null) {
        data.forEach(val =>
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


  public async getProductById(productId: number): Promise<Product> {
    try {
      const prod: Product = new Product();
      const id: string = productId.toString();
      // <editor-fold desc="id in cache is empty">
      if (this.isEmpty(this.cache.Products.Item(id))) {
        this.cache.Products.Add(id, prod);

        // http request
        const response = await this.http
          .get(productsUrl + `/${id}`)
          .toPromise();

        // response data binding
        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null && data.length !== 0) {
          //data = data[0]; // ---> single data make Array container
          let props = new Array<ProductPropValue>();
          if (data.props && data.props.length !== 0) {
            props = this.getPropValuefromProduct(data);
          }
          /*prod = new Product(data.id, data.name, data.price, new Manufacturer(data.manufacturer.id, data.manufacturer.name),
            props, data.imageUrl, data.rating, data.recall, data.supplOffers);*/

          // product insert
          prod.id = data.id;
          prod.name = data.name;
          prod.price = data.price;
          prod.manufacturerId = data.manufacturerId;
          prod.Props = props;
          prod.imageUrl = data.imageUrl;
          prod.rating = data.rating;
          prod.recall = data.recall;
          prod.supplOffers = data.supplOffers;
          prod.description = data.description;
          prod.slideImageUrls = data.slideImageUrls;
          prod.barcode = data.barcode;

          // add to cache
          this.cache.Products.Add(id, prod);
        }
        return prod;
      } else {
        // </editor-fold>
        return this.cache.Products.Item(id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getQuotationById(quotationId: number): Promise<Quotation> {
    try {
      const response = await this.http
        .get(quotationsUrl + `/${quotationId}`)
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let quotation: Quotation = null;
      if (data != null) {
        quotation = new Quotation(
          data.id,
          data.idSupplier,
          data.dateStart,
          data.dateEnd,
          data.currencyId
        );
      }
      return quotation;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPersonById(personId: number): Promise<PersonInfo> {
    try {
      const _id = personId.toString();
      let p = new PersonInfo();
      const response = await this.http.get(personsUrl + `/${_id}`).toPromise();
      let data: any = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      if (data != null) {
        p.firstName = data.firstName;
        p.lastName= data.lastName;
        p.middleName= data.middleName;
        p.passportSeries= data.passportSeries;
        p.passportNum= data.passportNum;
        p.issuedAuthority= data.issuedAuthority;
        p.taxNumber= data.taxNumber;
        p.birthDate= data.birthDate;
        return p;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }


  public async getSupplierById(supplierId: number): Promise<Supplier> {
    try {
      const suppl: Supplier = new Supplier();
      const id: string = supplierId.toString();

      // <editor-fold desc = "id in cache is empty"
      if (this.isEmpty(this.cache.Suppliers.Item(id))) {
        this.cache.Suppliers.Add(id, suppl);

        const response = await this.http
          .get(suppliersUrl + `/${id}`)
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          suppl.id = data.id;
          suppl.name = data.name;
          suppl.paymentMethodId = data.paymentMethodId;
          suppl.rating = data.rating;
          suppl.positiveFeedbackPct = data.positiveFeedbackPct;
          suppl.refsCount = data.refsCount;
          this.cache.Suppliers.Add(id, suppl);
        }
        return suppl;
      } else {
        // </editor-fold>

        return this.cache.Suppliers.Item(id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCurrencyById(currencyId: number): Promise<Currency> {
    try {
      const curr: Currency = new Currency();
      const id: string = currencyId.toString();

      // <editor-fold desc = "id in cache is empty"
      if (this.isEmpty(this.cache.Currency.Item(id))) {
        this.cache.Currency.Add(id, curr);
        const response = await this.http
          .get(currenciesUrl + `/${id}`)
          .toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          curr.id = data.id;
          curr.shortName = data.shortName;
          this.cache.Currency.Add(id, curr);
        }
        return curr;
      } else {
        // </editor-fold>

        return this.cache.Currency.Item(id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getSuppliers(cacheForce: boolean): Promise<Supplier[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Suppliers.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(suppliersUrl).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const suppliers = new Array<Supplier>();
        if (data != null) {
          data.forEach(val => {
            // create current supplier
            const supplierItem: Supplier = new Supplier(
              val.id,
              val.name,
              val.paymentMethodId,
              val.rating,
              val.positiveFeedbackPct,
              val.refsCount
            );

            suppliers.push(supplierItem);

            // add supplier to cashe
            this.cache.Suppliers.Add(supplierItem.id.toString(), supplierItem);
          });
        }
        return suppliers;
      } else {
        // </editor-fold>
        return this.cache.Suppliers.Values();
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCurrencies(cacheForce: boolean): Promise<Currency[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Currency.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(currenciesUrl).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const currencies = new Array<Currency>();
        if (data != null) {
          data.forEach(val => {
            // create current currency
            const currencyItem: Currency = new Currency(val.id, val.shortName);
            currencies.push(currencyItem);

            // add currency to cashe
            this.cache.Currency.Add(currencyItem.id.toString(), currencyItem);
          });
        }
        return currencies;
      } else {
        // </editor-fold>
        return this.cache.Currency.Values();
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getLocale(cacheForce: boolean): Promise<Lang[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Lang.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(LangUrl).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const languages = new Array<Lang>();
        if (data != null) {
          data.forEach(val => {
            // create current currency
            const langItem: Currency = new Lang(val.id, val.name);
            languages.push(langItem);

            // add currency to cashe
            this.cache.Currency.Add(langItem.id.toString(), langItem);
          });
        }
        return languages;
      } else {
        // </editor-fold>
        return this.cache.Lang.Values();
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getManufacturerById(manufacturerId: number): Promise<Manufacturer> {
    try {
      const manufacturer: Manufacturer = new Manufacturer();
      const id: string = manufacturerId.toString();
      // <editor-fold desc = "id in cache is empty"
      if (this.isEmpty(this.cache.Manufacturer.Item(id))) {
        this.cache.Manufacturer.Add(id, manufacturer);
        const response = await this.http
          .get(manufacturersUrl + `/${id}`)
          .toPromise();
        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          manufacturer.id = data.id;
          manufacturer.name = data.name;
          this.cache.Manufacturer.Add(id, manufacturer);
        }
        return manufacturer;
      } else {
        // </editor-fold>

        return this.cache.Manufacturer.Item(id);
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getManufacturers(cacheForce: boolean): Promise<Manufacturer[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Manufacturer.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(manufacturersUrl).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error("server side status error");
        }
        const manufacturers = new Array<Manufacturer>();
        if (data != null) {
          data.forEach(val => {
            // create current manufacturer
            const manufacturerItem: Manufacturer = new Manufacturer(
              val.id,
              val.name
            );

            manufacturers.push(manufacturerItem);

            // add manufacturer to cashe
            this.cache.Manufacturer.Add(
              manufacturerItem.id.toString(),
              manufacturerItem
            );
          });
        }
        return manufacturers;
      } else {
        // </editor-fold>
        return this.cache.Manufacturer.Values();
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  // <editor-fold desc="error handler"
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.messages || error);
  }

  // </editor-fold>
  // <editor-fold desc="url search factory">
  private createSearchParams(params: Array<{ key: string; value: string }>): URLSearchParams {
    const searchParams = new URLSearchParams();
    params.forEach(val => {
      searchParams.set(val.key, val.value);
    });

    return searchParams;
  }

  // </editor-fold>
  // <editor-fold desc="get product prop value from product"
  private getPropValuefromProduct(product: any): Array<ProductPropValue> {
    const props = new Array<ProductPropValue>();
    product.props.forEach(val => {
      let enumVal =
        val.prop_Value_Enum !== null
          ? new PropEnumList(
          val.prop_Value_Enum.id,
          this.getSingleProp(val.prop_Value_Enum.id_Prop),
          val.prop_Value_Enum.name,
          val.prop_Value_Enum.list_Index,
          val.prop_Value_Enum.bit_Index,
          val.prop_Value_Enum.url
          )
          : null;

      props.push(
        new ProductPropValue(
          val.id,
          val.id_Product,
          this.getSingleProp(val.id_Prop),
          val.prop_Value_Str,
          val.prop_Value_Number,
          val.prop_Value_Bool,
          enumVal,
          val.prop_Value_Long,
          val.id_Measure_Unit
        )
      );
    });

    return props;
  }

  // </editor-fold>
  // <editor-fold desc="get single prop from parent container"
  private getSingleProp(val: any): Prop {
    return new Prop(
      val.id,
      val.name,
      val.prop_type,
      val.is_Multi_Select,
      val.url,
      val.predestination
    );
  }

  // </editor-fold>
  // <editor-fold desc="inspect cache predicate"
  private isEmpty<T>(value: T) {
    return value === undefined;
  }

  // </editor-fold>

  public async getCities(): Promise<City[]> {
    try {
      const response = await this.http.get(citiesUrl).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const cities = new Array<City>();
      if (data != null) {
        data.forEach(val => {
          // create current city
          const cityItem: City = new City(val.id, val.name);
          cities.push(cityItem);
        });
      }
      return cities;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getStores(): Promise<Array<{ id: number; stores: Store[] }>> {
    try {
      const response = await this.http.get(storesUrl).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const stores = new Array<{ id: number; stores: Store[] }>();
      if (data != null) {
        data.forEach(val => {
          const storeArr = new Array<Store>();
          const arr: Store[] = val.stores;
          arr.forEach(store => {
            if (
              store.openTime !== null &&
              store.closeTime !== null &&
              store.rating === null
            ) {
              storeArr.push(
                new Store(
                  store.id,
                  store.position,
                  store.address,
                  store.openTime,
                  store.closeTime
                )
              );
            } else if (
              store.openTime !== null &&
              store.closeTime !== null &&
              store.rating !== null
            ) {
              storeArr.push(
                new Store(
                  store.id,
                  store.position,
                  store.address,
                  store.openTime,
                  store.closeTime,
                  store.rating
                )
              );
            } else {
              storeArr.push(new Store(store.id, store.position, store.address));
            }
          });
          stores.push({id: val.id, stores: storeArr});
        });
      }
      return stores;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getStoreById(id: number): Promise<Store> {
    try {
      const response = await this.http.get(storesUrl).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const stores = new Array<{ id: number; stores: Store[] }>();
      if (data != null) {
        data.forEach(val => {
          const storeArr = new Array<Store>();
          const arr: Store[] = val.stores;
          arr.forEach((store) => {
            if (store.openTime !== null && store.closeTime !== null && store.rating === null) {
              storeArr.push(new Store(store.id, store.position, store.address, store.openTime, store.closeTime));
            }
            else if (store.openTime !== null && store.closeTime !== null && store.rating !== null) {
              storeArr.push(new Store(store.id, store.position, store.address, store.openTime, store.closeTime,
                store.rating));
            }
            else {
              storeArr.push(new Store(store.id, store.position, store.address));
            }
          });
          stores.push({id: val.id, stores: storeArr});
        });
      }
      for (let i = 0; i < stores.length; i++) {
        for (let j = 0; j < stores[i].stores.length; j++) {
          if (stores[i].stores[j].id === id) {
            return stores[i].stores[j];
          }
        }
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getStoreReviewsByStoreId(storeId: number): Promise<StoreReview[]> {
    try {
      const response = await this.http
        .get(storeReviewsUrl, {
          search: this.createSearchParams([
            {key: "idStore", value: storeId.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const storesRevs = new Array<StoreReview>();
      if (data != null) {
        data.forEach(val => {
          let answers: ReviewAnswer[] = [];
          if (val.reviewAnswers) {
            val.reviewAnswers.forEach(answer => {
              answers.push(
                new ReviewAnswer(
                  answer.id,
                  answer.idReview,
                  answer.user,
                  answer.answerDate,
                  answer.answerText
                )
              );
            });
          }
          storesRevs.push(
            new StoreReview(
              val.id,
              val.idStore,
              val.user,
              val.reviewDate,
              val.reviewText,
              val.rating,
              val.advantages,
              val.disadvantages,
              val.upvotes,
              val.downvotes,
              answers
            )
          )
        });
      }
      return storesRevs;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPageContent(id: number): Promise<string> {
    try {
      const response = await this.http
        .get(`${pagesDynamicUrl}/${id}`)
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      return data["content"];
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getAction(id: number): Promise<Action> {
    try {
      const response = await this.http
        .get(`${actionDynamicUrl}/${id}`)
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
          data.action_content
        );
      }
      return action;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getActions(): Promise<Action[]> {
    try {
      const response = await this.http.get(actionDynamicUrl).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const actions = new Array<Action>();
      if (data != null) {
        data.forEach(val => {
          const actionItem: Action = new Action(
            val.id,
            val.name,
            new Date(val.dateStart),
            new Date(val.dateEnd),
            val.img_url,
            val.priority,
            val.sketch_content,
            val.action_content
          );

          actions.push(actionItem);
        });
      }
      return actions;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getActionOffersByActionId(idAction: number): Promise<ActionOffer[]> {
    try {
      const response = await this.http
        .get(actionOffersUrl, {
          search: this.createSearchParams([
            {key: "idAction", value: idAction.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const aOffers = new Array<ActionOffer>();
      if (data != null) {
        data.forEach(val =>
          aOffers.push(
            new ActionOffer(val.id, val.idAction, val.idQuotation, val.idCur)
          )
        );
      }
      return aOffers;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getQuotationProductsByQuotationId(quotationId: number): Promise<QuotationProduct[]> {
    try {
      const response = await this.http
        .get(quotationProductsUrl, {
          search: this.createSearchParams([
            {key: "idQuotation", value: quotationId.toString()}
          ])
        })
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const qProducts = new Array<QuotationProduct>();
      if (data != null) {
        data.forEach(val =>
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

  public async getNovelty(id: number): Promise<Novelty> {
    try {
      const response = await this.http
        .get(`${noveltyDynamicUrl}/${id}`)
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let novelty: Novelty = null;
      if (data != null) {
        novelty = new Novelty(
          data.id,
          data.productId,
          data.name,
          data.img_url,
          data.priority,
          data.sketch_content,
          data.novelty_content
        );
      }
      return novelty;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getNovelties(): Promise<Novelty[]> {
    try {
      const response = await this.http.get(noveltyDynamicUrl).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let novelties: Array<Novelty> = new Array<Novelty>();
      if (data != null) {
        data.forEach(val => {
          const novelty: Novelty = new Novelty(
            val.id,
            val.productId,
            val.name,
            val.img_url,
            val.priority,
            val.sketch_content,
            val.novelty_content
          );
          novelties.push(novelty);
        });
      }
      return novelties;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPollById(id: number): Promise<Poll> {
    try {
      const response = await this.http
        .get(`${pollsUrl}/${id}`, RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let poll: Poll = null;
      if (data != null) {
        poll = new Poll(
          data.id,
          new Date(data.dateStart),
          new Date(data.dateEnd),
          data.urlBanner,
          data.bannerText
        );
      }
      return poll;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPollQuestionsByPollId(pollId: number): Promise<PollQuestion[]> {
    try {
      const response = await this.http
        .get(pollQuestionUrl, RequestFactory
          .makeSearchAndAuth([{key: 'idPoll', value: pollId.toString()}]))
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const pollQuestions = new Array<PollQuestion>();
      if (data != null) {
        data.forEach(val =>
          pollQuestions.push(
            new PollQuestion(val.id, val.idPoll, val.order, val.question, val.answerType)
          )
        );
      }
      return pollQuestions.sort((a: PollQuestion, b: PollQuestion): number => {
        return b.order - a.order;
      });
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getNoveltyDetailsByNoveltyId(id: number): Promise<NoveltyDetails[]> {
    try {
      const response = await this.http.get(`${noveltyDetailsDynamicUrl}`, {
        search: this.createSearchParams([
          {key: "noveltyId", value: id.toString()}
        ])
      }).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      let noveltyDetails: NoveltyDetails[] = [];
      if (data != null) {
        data.forEach(val => {
          let detail: NoveltyDetails = new NoveltyDetails(
            val.id,
            val.noveltyId,
            val.idProduct
          );
          noveltyDetails.push(detail);
        });
      }
      return noveltyDetails;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPollAnswersByQuestionId(idPollQuestion: number): Promise<PollQuestionAnswer[]> {
    try {
      const response = await this.http
        .get(pollQuestionAnswerUrl, RequestFactory
          .makeSearchAndAuth([{key: 'idPollQuestions', value: idPollQuestion.toString()}]))
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const pollQuestionAnswers: PollQuestionAnswer[] = new Array<PollQuestion>();
      if (data != null) {
        data.forEach(val =>
          pollQuestionAnswers.push(
            new PollQuestionAnswer(val.id, val.idPollQuestions, val.answer)
          )
        );
      }
      return pollQuestionAnswers;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postClientPoolAnswers(pollAnswers: any): Promise<ClientPollAnswer> {
    try {
      const response = await this.http
        .post(clientPollAnswersUrl, pollAnswers, RequestFactory.makeAuthHeader())
        .toPromise();
      const data = response.json();

      if (response.status !== 201) {
        throw new Error("server side status error");
      }
      const clientPollLast: ClientPollAnswer = new ClientPollAnswer
      (data.id, data.userId, data.idPoll, data.idPollQuestions, data.clientAnswer);

      return clientPollLast;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientPoolAnswersForUserByPollId(pollId: number): Promise<ClientPollAnswer[]> {
    try {
      const response = await this.http
        .get(clientPollAnswersUrl, RequestFactory
          .makeSearchAndAuth([{key: 'idPoll', value: pollId.toString()}]))
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const clientPollAnswer: ClientPollAnswer[] = new Array<ClientPollAnswer>();
      if (data != null) {
        data.forEach(val =>
          clientPollAnswer.push(
            new ClientPollAnswer(val.id, val.userId, val.idPoll, val.idPollQuestions, val.clientAnswer)
          )
        );
      }
      return clientPollAnswer;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postDeviceData(deviceData: DeviceData): Promise<DeviceData> {
    try {
      const response = await this.http
        .post(deviceDataUrl, deviceData, RequestFactory.makeAuthHeader())
        .toPromise();
      const val = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }
      return val;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getDataForRedirectToPaymaster(orderID: number, cartTotal: number): Promise<any> {
    try {
      const response = await this.http
        .post(
          redirectToPaymasterUrl,
          {id: orderID, total: cartTotal},
          RequestFactory.makeAuthHeader()
        ).toPromise();
      const resp = response.json();

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("server side status error");
      }

      return resp;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCategories(): Promise<Category[]> {
    try {
      const response = await this.http
        .get(categoriesUrl).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const categories: Category[] = new Array<Category>();
      if (data != null) {
        data.forEach(val =>
          categories.push(
            new Category(val.id,val.name,val.parentId,val.idProductCat,val.prefix,
                         val.icon,val.isShow,val.priorityIndex,val.priorityShow)
          )
        );
      }
      return categories;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getMeasureUnitById(unitId: number): Promise<MeasureUnit> {
    try {
        const munit: MeasureUnit = new MeasureUnit();
        const id: string = unitId.toString();

        // <editor-fold desc = "id in cache is empty"
        if (this.isEmpty(this.cache.MeasureUnit.Item(id))) {
          this.cache.MeasureUnit.Add(id, munit);

          const response = await this.http
            .get(measureUnitUrl + `/${id}`)
            .toPromise();

          const data = response.json();
          if (response.status !== 200) {
            throw new Error("server side status error");
          }

          if (data != null) {
            munit.id = data.id;
            munit.name = data.name;

            this.cache.MeasureUnit.Add(id, munit);
          }
          return munit;
        } else {
          // </editor-fold>

          return this.cache.MeasureUnit.Item(id);
        }
    } catch (err) {
      return await this.handleError(err);
    }
  }


}
