import { QuotationProduct,
         Product,
         Quotation,
         Supplier,
         Currency,
         Manufacturer,
         City,
         Store,
         StorePlace,
         ProductReview,
         ProductStorePlace,
         Lang,
         Client,
         Action,
         ActionOffer
       } from '../../../model/index';
import {ClientAddress} from '../../../model/client-address';
import {Country} from '../../../model/country';
import {ClientOrder} from '../../../model/client-order';
import {ClientOrderProducts} from '../../../model/client-order-products';

export abstract class AbstractDataRepository {
  public async abstract getProductReviewsByProductId(productId: number): Promise<ProductReview[]>;
  public async abstract getProducts(urlQuery: string, cacheForce: boolean): Promise<Product[]>;
  public async abstract searchProducts(srchString: string): Promise<Product[]>;

  public async abstract getSuppliers(cacheForce: boolean): Promise<Supplier[]>;
  public async abstract getCurrencies(cacheForce: boolean): Promise<Currency[]>;
  public async abstract getLocale(cacheForce: boolean): Promise<Lang[]>;

  public async abstract getQuotationProductsByProductId(productId: number): Promise<QuotationProduct[]>;
  public async abstract getQuotationProductsByQuotationId(quotationId:number) : Promise<QuotationProduct[]>;
  public async abstract getProductStorePlacesByQuotId(quotId: number): Promise<ProductStorePlace[]>;
  public async abstract getStorePlaceById(id: number): Promise<StorePlace>;
  public async abstract getProductById(productId: number): Promise<Product>;
  public async abstract getQuotationById(quotationId: number): Promise<Quotation>;
  public async abstract getSupplierById(supplierId: number): Promise<Supplier>;
  public async abstract getCurrencyById(currencyId: number): Promise<Currency>;
  public async abstract getManufacturerById(manufacturerId: number): Promise<Manufacturer>;
  public async abstract getManufacturers(cacheForce: boolean): Promise<Manufacturer[]>;

  public async abstract getClientDraftOrder(): Promise<ClientOrder>;
  public async abstract getClientOrders(): Promise<ClientOrder[]>;
  public async abstract getClientOrderById(id: number): Promise<ClientOrder>;

  public async abstract getCartProducts(): Promise<ClientOrderProducts[]>;
  public async abstract saveCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts>;
  public async abstract updateCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts>;
  public async abstract deleteCartProduct(prod: ClientOrderProducts);

  public async abstract getClientDraftOrderSpecProductsById(id: number): Promise<ClientOrderProducts>;

  public async abstract getCountryById(id: number): Promise<Country>;
  public async abstract getCountries(): Promise<Country[]>;
  public async abstract getClientByUserId (id: number): Promise<Client>;
  public async abstract getClientById(id: number): Promise<Client>;
  public async abstract getClientByEmail(email: string): Promise<Client>;
  public async abstract getClientAddressesByClientId(id: number): Promise<ClientAddress[]>;

  public async abstract getCities(): Promise<City[]>;
  public async abstract getFoxStores(): Promise<Array<{id: number, stores: Store[]}>>;
  public async abstract getFoxStoreById(id: number): Promise<Store>;
  public async abstract getCityById(id: number): Promise<City>;
  public async abstract getPageContent(id:number):Promise<string>;
  public async abstract getAction(id:number):Promise<Action>;
  public async abstract getActionOffersByActionId(id:number):Promise<ActionOffer[]>;
}
