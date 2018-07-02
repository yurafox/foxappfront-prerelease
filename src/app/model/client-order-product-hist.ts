import {ClientOrderProductBase} from './client-order-product-base';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {LazyLoad, RefInjector} from '../core/app-core';
import {QuotationProduct} from './quotation-product';
import {StorePlace} from './store-place';
import {LoEntity} from './lo-entity';


@LazyLoad([
  { options: {constructor: QuotationProduct}, action: 'getQuotationProductById', params: ['idQuotationProduct']},
  { options: {constructor: StorePlace}, action: 'getStorePlaceById', params: ['idStorePlace']},
  { options: {constructor: LoEntity}, action: 'getLoEntitiyById', params: ['idLoEntity']}
])

export class ClientOrderProductHist extends ClientOrderProductBase {
  public _repo: AbstractDataRepository;

  constructor(
    public id?: number,
    public idOrder?: number,
    public idQuotationProduct?: number,
    public price?: number,
    public qty?: number,
    public idStorePlace?: number,
    public earnedBonusCnt?: number,

    public idLoEntity?: number,
    public loTrackTicket?: string,
    public loDeliveryCost?: number,
    public loDeliveryCompleted?: boolean,
    public loEstimatedDeliveryDate?: Date,
    public loDeliveryCompletedDate?: Date
  ){
    super(id, idOrder, idQuotationProduct, price, qty, idStorePlace, earnedBonusCnt);
    this._repo = RefInjector.pull(AbstractDataRepository);
  }
}
