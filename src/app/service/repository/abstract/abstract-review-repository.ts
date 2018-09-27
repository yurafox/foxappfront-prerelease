import {ProductReview} from '../../../model/product-review';
import {StoreReview} from '../../../model/store-review';

export abstract class AbstractReviewRepository {
  public async abstract getProductReviewsByProductId(productId: number): Promise<{reviews:ProductReview[], idClient:number}>;
  public async abstract getHasClientProductReview(productId: number): Promise<{hasReview: boolean, idClient:number}>;
  public async abstract getStoreReviews(): Promise<{reviews: StoreReview[], idClient:number}>;
  public async abstract getHasClientStoreReview(storeId: number): Promise<{hasReview: boolean, idClient:number}>;
  public async abstract getStoreReviewsByStoreId(storeId: number): Promise<{reviews: StoreReview[], idClient:number}>;
  public async abstract postProductReview(review: ProductReview): Promise<ProductReview>;
  public async abstract postStoreReview(review: StoreReview): Promise<StoreReview>;
  public async abstract updateProductReview(review: ProductReview): Promise<ProductReview>;
  public async abstract updateStoreReview(review: StoreReview): Promise<StoreReview>;
}
