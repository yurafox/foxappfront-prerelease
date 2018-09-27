import {ClientOrderProductHist} from '../../../model/client-order-product-hist';
import {Shipment} from '../../../model/shipment';
import {ClientOrder} from '../../../model/client-order';
import {ClientOrderProducts} from '../../../model/client-order-products';

export abstract class AbstractCartRepository {
  public async abstract getCartProducts(): Promise<ClientOrderProducts[]>;
  public async abstract saveCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts>;
  public async abstract insertCartProduct(prod: ClientOrderProducts): Promise<ClientOrderProducts>;
  public async abstract deleteCartProduct(prod: ClientOrderProducts);
  public async abstract postOrder(order: ClientOrder): Promise<{isSuccess: boolean, errorMessage: string}>;
  public async abstract getClientDraftOrder(): Promise<ClientOrder>;
  public async abstract saveClientDraftOrder(order: ClientOrder): Promise<ClientOrder>;
  public async abstract getClientHistOrderById(orderId: number): Promise<ClientOrder>;
  public async abstract getClientOrderProductsByOrderId(orderId: number): Promise<ClientOrderProducts[]>;
  public async abstract getClientHistOrderProductsByOrderId(orderId: number): Promise<ClientOrderProductHist[]>;
  public async abstract getClientOrderProductsByDate(datesRange: string):
    Promise<{orderId: string, orderDate: Date, orderSpecId: number, idProduct: number,
      productName: string, productImageUrl: string, loTrackTicket: string,
      idQuotation: number}[]>;
  public async abstract calculateCart(promoCode: string,
                                      maxBonusCnt: number,
                                      usePromoBonus: boolean,
                                      creditProductId: number /*,
                                      cartContent: ClientOrderProducts[]*/)
    : Promise<{clOrderSpecProdId: number,
    promoCode: string,
    promoCodeDisc: number, bonusDisc: number,
    promoBonusDisc: number, earnedBonus: number,
    qty: number}[]>;
  public async abstract generateShipments(): Promise<Shipment[]>;
  public async abstract saveShipment(value: Shipment): Promise<Shipment>;

  /*
  public async abstract getClientOrders(): Promise<ClientOrder[]>;
  public async abstract getClientOrderById(orderId: number): Promise<ClientOrder>;
*/
}
