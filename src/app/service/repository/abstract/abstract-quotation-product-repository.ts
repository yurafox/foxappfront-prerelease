import {QuotationProduct} from '../../../model/quotation-product';

export abstract class AbstractQuotationProductRepository {
  public async abstract getQuotationProductById(qpId: number): Promise<QuotationProduct>;
  public async abstract getByItAgainQP(originalQP: QuotationProduct): Promise<QuotationProduct>;
  public async abstract getValueQuotByProduct(id: number): Promise<QuotationProduct>;
  public async abstract getQuotationProductsByProductId(productId: number): Promise<QuotationProduct[]>;
  public async abstract getQuotationProductsByQuotationId(quotationId:number) : Promise<QuotationProduct[]>;
}
