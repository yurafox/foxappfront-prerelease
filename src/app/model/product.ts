import { ProductPropValue } from './product-prop-value';
import {RefInjector, LazyLoad} from '../core/app-core';
import {Manufacturer} from './manufacturer';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';

@LazyLoad([
  { options:{constructor: Manufacturer}, action: 'getManufacturerById', params: ['manufacturerId']}
])

export class Product {
  private _repo: AbstractDataRepository;
  constructor(public id?: number,
              public name?: string,
              public price?: number,
              public oldPrice?: number,
              public bonuses?: number,
              public manufacturerId?: number,
              public props?: ProductPropValue[],
              public imageUrl?: string,
              public rating: number = 0,
              public recall: number = 0,
              public supplOffers: number = 1,
              public description?: string,
              public slideImageUrls?: string[],
              public barcode?: string,
              public valueQP?: number,
              public status?: number
  )  { this._repo = RefInjector.pull(AbstractDataRepository);}
}
