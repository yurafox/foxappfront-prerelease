import {LazyLoad, RefInjector} from '../core/app-core';
import {LoDeliveryType} from './lo-delivery-type';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';

@LazyLoad([
  {options:{constructor: LoDeliveryType}, action: 'getLoEntityDeliveryTypes', params: ['id']}
])

export class LoEntity {
  public _repo: AbstractDataRepository;
  constructor (
    public id?: number,
    public name?: string,
    public loDeliveryTypes?: LoDeliveryType[]
    
  ){this._repo = RefInjector.pull(AbstractDataRepository);}
}
