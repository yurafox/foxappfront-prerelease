import {IDTO} from '../../core/app-core';

export class ClientOrderProductsDTO implements IDTO {

  get dto(): any {
    return  {id: this.id, idOrder: this.idOrder, idQuotationProduct: this.idQuotationProduct, price: this.price,
      idStorePlace: this.idStorePlace, idLoEntity: this.idLoEntity, loTrackTicket: this.loTrackTicket,
      loDeliveryCost: this.loDeliveryCost, loDeliveryCompleted: this.loDeliveryCompleted,
      loEstimatedDeliveryDate: this.loEstimatedDeliveryDate, loDeliveryCompletedDate: this.loDeliveryCompletedDate,
      errorMessage: this.errorMessage};
  }

  constructor (
    public id?: number,
    public idOrder?: number,
    public idQuotationProduct?: number,
    public price?: number,
    public qty?: number,
    public idStorePlace?: number,
    public idLoEntity?: number,
    public loTrackTicket?: string,
    public loDeliveryCost?: number,
    public loDeliveryCompleted?: boolean,
    public loEstimatedDeliveryDate?: Date,
    public loDeliveryCompletedDate?: Date,
    public errorMessage?: string
  ){}

}
