import {ProductStorePlace} from '../../../model/product-store-place';
import {StorePlace} from '../../../model/store-place';

export abstract class AbstractStorePlaceRepository {
  public async abstract getProductStorePlacesByQuotId(quotId: number): Promise<ProductStorePlace[]>;
  public async abstract loadStorePlaceCache();
  public async abstract getStorePlaceById(id: number): Promise<StorePlace>;
}
