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
          ActionOffer,
          ClientAddress,
          Country,
          ClientOrder,
          ClientOrderProducts,
          StoreReview,
          LoEntity,
          Novelty,
          NoveltyDetails,
          DeviceData,
          LoSupplEntity,
          EnumPaymentMethod,
          Poll,PollQuestion,PollQuestionAnswer,
          ClientPollAnswer
       } from '../../../model/index';

import {CreditProduct} from '../../../model/credit-product';

export abstract class AbstractDataRepository {
  public async abstract getProductReviewsByProductId(productId: number): Promise<ProductReview[]>;
  public async abstract getProducts(urlQuery: string, cacheForce: boolean): Promise<Product[]>;
  public async abstract searchProducts(srchString: string): Promise<Product[]>;

  public async abstract getSuppliers(cacheForce: boolean): Promise<Supplier[]>;
  public async abstract getCurrencies(cacheForce: boolean): Promise<Currency[]>;
  public async abstract getLocale(cacheForce: boolean): Promise<Lang[]>;

  public async abstract getQuotationProductById(qpId: number): Promise<QuotationProduct>
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

  public async abstract getLoEntitiesForSupplier(supplierId: number):Promise<LoSupplEntity[]>;
  public async abstract getLoEntitiyById(entityId: number):Promise<LoEntity>;
  public async abstract getDeliveryDate(order: ClientOrderProducts, loEntityId: number): Promise<Date>;
  public async abstract getDeliveryCost(order: ClientOrderProducts, loEntityId: number): Promise<number>;
  public async abstract getProductCreditSize(idProduct: number, isSupplier: number): Promise<any>;

  public async abstract getClientDraftOrder(): Promise<ClientOrder>;
  public async abstract getClientOrders(): Promise<ClientOrder[]>;
  public async abstract getClientOrdersAll(): Promise<ClientOrder[]>;
  public async abstract getClientOrderById(id: number): Promise<ClientOrder>;

  public async abstract getCartProducts(): Promise<ClientOrderProducts[]>;
  public async abstract saveCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts>;
  public async abstract updateCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts>;
  public async abstract deleteCartProduct(prod: ClientOrderProducts);
  public async abstract getBonusesInfoForCheckout(): Promise<{bonusLimit: number, actionBonusLimit: number}>;
  public async abstract calculateCart(promoCode: string,
                                      maxBonusCnt: number,
                                      usePromoBonus: boolean,
                                      cartContent: ClientOrderProducts[])
                                                              : Promise<{clOrderSpecProdId: number,
                                                                          promoCodeDisc: number, BonusDisc: number,
                                                                          promoBonusDisc: number}[]>;


  public async abstract getClientDraftOrderSpecProductsById(id: number): Promise<ClientOrderProducts>;
  public async abstract getClientDraftOrderSpecProducts(): Promise<Array<ClientOrderProducts>>;
  public async abstract getClientOrderSpecProductsByClientId(clientId: number): Promise<Array<ClientOrderProducts>>;

  public async abstract getCountryById(id: number): Promise<Country>;
  public async abstract getCountries(): Promise<Country[]>;
  public async abstract getClientByUserId (id: number): Promise<Client>;
  public async abstract getClientById(id: number): Promise<Client>;
  public async abstract getClientByEmail(email: string): Promise<Client>;
  public async abstract getClientAddressesByClientId(id: number): Promise<ClientAddress[]>;
  public async abstract getClientAddressById(id: number): Promise<ClientAddress>;

  public async abstract getCities(): Promise<City[]>;
  public async abstract getStores(): Promise<Array<{id: number, stores: Store[]}>>;
  public async abstract getStoreById(id: number): Promise<Store>;
  public async abstract getStoreReviewsByStoreId(storeId: number): Promise<StoreReview[]>;
  public async abstract getCityById(id: number): Promise<City>;
  public async abstract getPageContent(id:number):Promise<string>;
  public async abstract getAction(id:number):Promise<Action>;
  public async abstract getActions():Promise<Action[]>;
  public async abstract getActionOffersByActionId(id:number):Promise<ActionOffer[]>;
  public async abstract getPmtMethods(): Promise<EnumPaymentMethod[]>;
  public async abstract getPmtMethodById(id: number): Promise<EnumPaymentMethod>;
  public async abstract getCreditProducts(): Promise<CreditProduct[]>;
  public async abstract getDiscountByPromocode(promoCode: string): Promise<number>;

  public async abstract getNovelty(id: number): Promise<Novelty>;
  public async abstract getNovelties(): Promise<Novelty[]>;
  public async abstract getPollById(id:number): Promise<Poll>;
  public async abstract getPollQuestionsByPollId(pollId:number):Promise<PollQuestion[]>;
  public async abstract getPollAnswersByQuestionId(idPollQuestion:number):Promise<PollQuestionAnswer[]>;
  public async abstract postClientPoolAnswers(pollAnswers:any):Promise<ClientPollAnswer>;
  public async abstract getClientPoolAnswersForUserByPollId(pollId:number):Promise<ClientPollAnswer[]>;
  public async abstract getNoveltyDetailsByNoveltyId(id: number): Promise<NoveltyDetails[]>;
  public async abstract sendDeviceData(deviceData: DeviceData): Promise<DeviceData>
}
