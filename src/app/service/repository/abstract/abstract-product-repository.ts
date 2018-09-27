import {Product} from '../../../model/product';

export abstract class AbstractProductRepository {
  public async abstract searchProducts(srchString: string): Promise<Product[]>;
  public abstract getProductFromResponse(data: any): Product;
  public async abstract getProductById(productId: number): Promise<Product>;
  public async abstract getProductDescription(id: number): Promise<string>;
  public async abstract getProductImages(id: number): Promise<string[]>;
  public async abstract getProductsByActionId(actionId: number):  Promise<Product[]>;
  public async abstract notifyOnProductArrival(email: string, productId: number);
  public async abstract getProducts(urlQuery: string, cacheForce: boolean): Promise<Product[]>;
}
