import { QuotationProduct,
         Product,
         Quotation,
         Supplier,
         Currency
       } from '../../../model/index';

export abstract class AbstractDataRepository {
  public async abstract getProducts(urlQuery: string, cacheForce: boolean): Promise<Product[]>;
  public async abstract getSuppliers(cacheForce: boolean): Promise<Supplier[]>;
  public async abstract getCurrencies(cacheForce: boolean): Promise<Currency[]>;

  public async abstract getQuotationProductsByProductId(productId: number): Promise<QuotationProduct[]>;
  public async abstract getProductById(productId: number): Promise<Product>;
  public async abstract getQuotationById(quotationId: number): Promise<Quotation>;
  public async abstract getSupplierById(supplierId: number): Promise<Supplier>;
  public async abstract getCurrencyById(currencyId: number): Promise<Currency>;

}
