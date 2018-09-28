import {ClientOrderProductBase} from './client-order-product-base';
import {LazyLoad, RefInjector} from '../core/app-core';
import {QuotationProduct} from './quotation-product';
import {StorePlace} from './store-place';
import {LoEntity} from './lo-entity';
import {AbstractQuotationProductRepository} from "../service/repository/abstract/abstract-quotation-product-repository";
import {AbstractStorePlaceRepository} from "../service/repository/abstract/abstract-store-place-repository";
import {AbstractLoRepository} from "../service/repository/abstract/abstract-lo-repository";


@LazyLoad([
  { options: {constructor: QuotationProduct}, action: 'getQuotationProductById', params: ['idQuotationProduct']},
  { options: {constructor: StorePlace}, action: 'getStorePlaceById', params: ['idStorePlace']},
  { options: {constructor: LoEntity}, action: 'getLoEntitiyById', params: ['idLoEntity']}
])

export class ClientOrderProductHist extends ClientOrderProductBase {
  public _quotProdRepo: AbstractQuotationProductRepository;
  public _storePlaceRepo: AbstractStorePlaceRepository;
  public _loRepo: AbstractLoRepository;

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
    this._quotProdRepo = RefInjector.pull(AbstractQuotationProductRepository);
    this._storePlaceRepo = RefInjector.pull(AbstractStorePlaceRepository);
    this._loRepo = RefInjector.pull(AbstractLoRepository);
  }
}
