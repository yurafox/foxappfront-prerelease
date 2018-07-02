import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {LazyLoad, RefInjector} from '../core/app-core';
import {ShipmentItems} from './shipment-items';
import {Supplier} from './supplier';
import {LoEntity} from './lo-entity';
import {StorePlace} from './store-place';
import {LoEntityOffice} from './lo-entity-office';
import {LoDeliveryType} from './lo-delivery-type';

@LazyLoad([
  {options: { constructor: Supplier}, action: 'getSupplierById', params: ['idSupplier']},
  {options: {constructor: LoEntity}, action: 'getLoEntitiyById', params: ['idLoEntity']},
  {options: {constructor: StorePlace}, action: 'getStorePlaceById', params: ['idStorePlace']},
  {options: {constructor: LoEntityOffice }, action: 'getLoEntityOfficeById', params: ['idLoEntityOffice']},
  {options: {constructor: LoDeliveryType}, action: 'getLoDeliveryTypeById', params: ['idLoDeliveryType']},

])

export class Shipment {

  public _repo: AbstractDataRepository;

  get dto(): any {
    return  {id: this.id, idOrder: this.idOrder, idSupplier: this.idSupplier, idLoEntity: this.idLoEntity,
      loTrackTicket: this.loTrackTicket,
      loDeliveryCost: this.loDeliveryCost, loDeliveryCompleted: this.loDeliveryCompleted,
      loEstimatedDeliveryDate: this.loEstimatedDeliveryDate,
      loDeliveryCompletedDate: this.loDeliveryCompletedDate,
      idStorePlace: this.idStorePlace,
      idLoEntityOffice: this.idLoEntityOffice,
      idLoDeliveryType: this.idLoDeliveryType,
      shipmentItems: this.shipmentItems
    };
  }


  constructor(
    public id?: number,
    public idOrder?: number,
    public idSupplier?: number,
    public idLoEntity?: number,
    public loTrackTicket?: string,
    public loDeliveryCost?: number,
    public loDeliveryCompleted?: boolean,
    public loEstimatedDeliveryDate?: Date,
    public loDeliveryCompletedDate?: Date,
    public idStorePlace?: number,
    public idLoEntityOffice?: number,
    public idLoDeliveryType?: number,
    public shipmentItems?: ShipmentItems[]
  ){this._repo = RefInjector.pull(AbstractDataRepository);}
}
