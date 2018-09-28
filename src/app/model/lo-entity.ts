import {LazyLoad, RefInjector} from '../core/app-core';
import {LoDeliveryType} from './lo-delivery-type';
import {AbstractLoRepository} from "../service/repository/abstract/abstract-lo-repository";

@LazyLoad([
  {options:{constructor: LoDeliveryType}, action: 'getLoEntityDeliveryTypes', params: ['id']}
])

export class LoEntity {
  public _loRepo: AbstractLoRepository;
  constructor (
    public id?: number,
    public name?: string,
    public loDeliveryTypes?: LoDeliveryType[]
    
  ){this._loRepo = RefInjector.pull(AbstractLoRepository);}
}
