import { Manufacturer } from './manufacturer';
import { ProductPropValue } from './product-prop-value';

export class Product {
  constructor(public id?: number,
              public name?: string,
              public price?: number,
              public manufacturer?: Manufacturer,
              public Props?: ProductPropValue[],
              public imageUrl?: string,
              public rating: number = 0,
              public recall: number = 0,
              public supplOffers: number = 1
  ) {}
}
