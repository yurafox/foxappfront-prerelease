import {ClientOrderProducts} from './client-order-products';

export class ClientOrder {
  constructor(
    public id: number,
    public orderDate: Date,
    public idCur: number,
    public idClient: number,
    public total: number = 0,
    public idPaymentMethod?: number,
    public idPaymentStatus?: number,
    public idStatus?: number,
    public orderProducts?: ClientOrderProducts[],
    public loIdClientAddress?: number
  ){}
}
