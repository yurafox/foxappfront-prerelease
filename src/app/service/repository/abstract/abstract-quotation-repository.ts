import {Quotation} from '../../../model/quotation';

export abstract class AbstractQuotationRepository {
  public async abstract getQuotationById(quotationId: number): Promise<Quotation>;
}
