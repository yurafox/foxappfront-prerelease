import {ClientOrderProducts} from './client-order-products';
import {LazyLoad, RefInjector} from '../core/app-core';
import {ClientAddress} from './client-address';
import {EnumPaymentMethod} from './enum-payment-method';
import {PersonInfo} from './person';
import {LoEntity} from './lo-entity';
import {AbstractClientRepository} from "../service/repository/abstract/abstract-client-repository";
import {AbstractCartRepository} from "../service/repository/abstract/abstract-cart-repository";
import {AbstractFinRepository} from "../service/repository/abstract/abstract-fin-repository";
import {AbstractLoRepository} from "../service/repository/abstract/abstract-lo-repository";

@LazyLoad([
  { options: {constructor: ClientAddress}, action: 'getClientAddressById', params: ['loIdClientAddress']},
  { options: {constructor: ClientOrderProducts}, action: 'getClientOrderProductsByOrderId', params: ['id']},
  { options: {constructor: EnumPaymentMethod}, action: 'getPmtMethodById', params: ['idPaymentMethod']},
  { options: {constructor: PersonInfo}, action: 'getPersonById', params: ['idPerson']},
  { options: {constructor: LoEntity}, action: 'getLoEntitiyById', params: ['loIdEntity']}

])

export class ClientOrder {

  public _clientRepo: AbstractClientRepository;
  public _cartRepo: AbstractCartRepository;
  public _finRepo: AbstractFinRepository;
  public _loRepo: AbstractLoRepository;

  get dto(): any {
    return  {id: this.id, orderDate: this.orderDate, idCur: this.idCur, idClient: this.idClient, total: this.total,
      idPaymentMethod: this.idPaymentMethod, idPaymentStatus: this.idPaymentStatus, idStatus: this.idStatus,
      loIdClientAddress: this.loIdClientAddress,
      itemsTotal: this.itemsTotal, shippingTotal: this.shippingTotal,
      bonusTotal: this.bonusTotal, promoBonusTotal: this.promoBonusTotal, bonusEarned: this.bonusEarned,
      promoCodeDiscTotal: this.promoCodeDiscTotal, idPerson: this.idPerson, idCreditProduct: this.idCreditProduct,
      creditPeriod: this.creditPeriod, creditMonthlyPmt: this.creditMonthlyPmt, idApp: this.idApp, scn: this.scn
    };
  }

  constructor(
    public id?: number,
    public orderDate?: Date,
    public idCur?: number,
    public idClient?: number,
    public total?: number,
    public idPaymentMethod?: number,
    public idPaymentStatus?: number,
    public idStatus?: number,
    public orderProducts?: any[],
    public loIdClientAddress?: number,
    public itemsTotal?: number,
    public shippingTotal?: number,
    public bonusTotal?: number,
    public promoBonusTotal?: number,
    public bonusEarned?: number,
    public promoCodeDiscTotal?: number,
    public idPerson?: number,
    public clientHistFIO?: string,
    public clientHistAddress?: string,
    public idCreditProduct?: number,
    public creditPeriod?: number,
    public creditMonthlyPmt?: number,
    public idApp?: number,
    public scn?: number
  ){
    this._clientRepo = RefInjector.pull(AbstractClientRepository);
    this._cartRepo = RefInjector.pull(AbstractCartRepository);
    this._finRepo = RefInjector.pull(AbstractFinRepository);
    this._loRepo = RefInjector.pull(AbstractLoRepository);
  }
}
