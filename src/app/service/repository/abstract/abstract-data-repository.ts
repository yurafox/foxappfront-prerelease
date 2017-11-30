import { QuotationProduct,
         Product,
         Quotation,
         Supplier,
         Currency,
         Manufacturer,
         City,
         MapMarker,
         StorePlace,
         ProductReview,
         ProductStorePlace,
         Lang,
         Client
       } from '../../../model/index';
import {ClientAddress} from '../../../model/client-address';

export abstract class AbstractDataRepository {
  public async abstract getProductReviewsByProductId(productId: number): Promise<ProductReview[]>;
  public async abstract getProducts(urlQuery: string, cacheForce: boolean): Promise<Product[]>;
  public async abstract searchProducts(srchString: string): Promise<Product[]>;

  public async abstract getSuppliers(cacheForce: boolean): Promise<Supplier[]>;
  public async abstract getCurrencies(cacheForce: boolean): Promise<Currency[]>;
  public async abstract getLocale(cacheForce: boolean): Promise<Lang[]>;

  public async abstract getQuotationProductsByProductId(productId: number): Promise<QuotationProduct[]>;
  public async abstract getProductStorePlacesByQuotId(quotId: number): Promise<ProductStorePlace[]>;
  public async abstract getStorePlaceById(id: number): Promise<StorePlace>;
  public async abstract getProductById(productId: number): Promise<Product>;
  public async abstract getQuotationById(quotationId: number): Promise<Quotation>;
  public async abstract getSupplierById(supplierId: number): Promise<Supplier>;
  public async abstract getCurrencyById(currencyId: number): Promise<Currency>;
  public async abstract getManufacturerById(manufacturerId: number): Promise<Manufacturer>;
  public async abstract getManufacturers(cacheForce: boolean): Promise<Manufacturer[]>;

  public async abstract getClientById(id: number): Promise<Client>;
  public async abstract getClientByEmail(email: string): Promise<Client>;
  public async abstract getClientAddressesByClientId(id: number): Promise<ClientAddress[]>;

  public async abstract getCities(): Promise<City[]>;
  public async abstract getFoxMapMarkers(): Promise<Array<{id: number, markers: MapMarker[]}>>;
  public async abstract getCityById(id: number): Promise<City>;

}
