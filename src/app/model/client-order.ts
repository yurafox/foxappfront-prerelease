import {ClientOrderProducts} from './client-order-products';
import {LazyLoad, RefInjector} from '../core/app-core';
import {ClientAddress} from './client-address';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';

@LazyLoad([
  { options: {constructor: ClientAddress}, action: 'getClientAddressById', params: ['loIdClientAddress']}
])

export class ClientOrder {

  private _repo: AbstractDataRepository;

  constructor(
    public id: number,
    public orderDate: Date,
    public idCur: number,
    public idClient: number,
    public total: number = 0,
    public idPaymentMethod?: number,
    public idPaymentStatus?: number,
    public idStatus?: number,
    public orderProducts?: ClientOrderProducts[],
    public loIdEntity?: number,
    public loIdClientAddress?: number
  ){this._repo = RefInjector.pull(AbstractDataRepository);}
}
