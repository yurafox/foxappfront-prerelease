import {Product} from '../../../model/product';

export abstract class AbstractProductCompareRepository {
  public async abstract getSimilarProducts(productId: number): Promise<Product[]>;
  public async abstract getPopularAccessories(productId: number): Promise<Product[]>
}
