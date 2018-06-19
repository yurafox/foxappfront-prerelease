import {ClientOrderProductBase} from './client-order-product-base';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {RefInjector, LazyLoad, IDTO, System} from '../core/app-core';
import {QuotationProduct} from './quotation-product';
import {StorePlace} from './store-place';


@LazyLoad([
  { options: {constructor: QuotationProduct}, action: 'getQuotationProductById', params: ['idQuotationProduct']},
  { options: {constructor: StorePlace}, action: 'getStorePlaceById', params: ['idStorePlace']}
])

export class ClientOrderProducts extends ClientOrderProductBase implements IDTO {
  public _repo: AbstractDataRepository;

  get dto(): any {
    return  {id: this.id, idOrder: this.idOrder, idQuotationProduct: this.idQuotationProduct, qty: this.qty, price: this.price,
      idStorePlace: this.idStorePlace, /*idLoEntity: this.idLoEntity, loTrackTicket: this.loTrackTicket,
      loDeliveryCost: this.loDeliveryCost, loDeliveryCompleted: this.loDeliveryCompleted,
      loEstimatedDeliveryDate: this.loEstimatedDeliveryDate, loDeliveryCompletedDate: this.loDeliveryCompletedDate,*/
      errorMessage: this.errorMessage, warningMessage: this.warningMessage,  payPromoCode: this.payPromoCode,
      payPromoCodeDiscount: this.payPromoCodeDiscount, payBonusCnt: this.payBonusCnt, payPromoBonusCnt: this.payPromoBonusCnt,
      earnedBonusCnt: this.earnedBonusCnt, warningRead: this.warningRead, complect: this.complect, idAction: this.idAction,
      actionTitle: this.actionTitle};
  }

  constructor (
    public id?: number,
    public idOrder?: number,
    public idQuotationProduct?: number,
    public price?: number,
    public qty?: number,
    public idStorePlace?: number,
    public earnedBonusCnt?: number,

    public errorMessage?: string,
    public warningMessage?: string,
    public payPromoCode?: string,
    public payPromoCodeDiscount?: number,
    public payBonusCnt?: number,
    public payPromoBonusCnt?: number,
    public warningRead?: boolean,
    public complect?: string,
    public idAction?: number,
    public actionList?: number,
    public actionTitle?: string
  )
  {
    super(id, idOrder, idQuotationProduct, price, qty, idStorePlace, earnedBonusCnt);
    this._repo = RefInjector.pull(AbstractDataRepository)
  }


}
