import {CreditProduct} from '../../../model/credit-product';

export abstract class AbstractCreditRepository {
  public async abstract getCreditProducts(): Promise<CreditProduct[]>;
  public async abstract getProductCreditSize(idProduct: number, isSupplier: number): Promise<any>;
}
