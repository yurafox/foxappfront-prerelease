import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {LazyLoad, RefInjector} from '../core/app-core';
import {ShipmentItems} from './shipment-items';
import {Supplier} from './supplier';
import {LoEntity} from './lo-entity';
import {StorePlace} from './store-place';

@LazyLoad([
  {options: { constructor: Supplier}, action: 'getSupplierById', params: ['idSupplier']},
  {options: {constructor: LoEntity}, action: 'getLoEntitiyById', params: ['idLoEntity']},
  {options: {constructor: StorePlace}, action: 'getStorePlaceById', params: ['idStorePlace']}
])

export class Shipment {

  private _repo: AbstractDataRepository;

  get dto(): any {
    return  {id: this.id, idOrder: this.idOrder, idSupplier: this.idSupplier, idLoEntity: this.idLoEntity,
      loTrackTicket: this.loTrackTicket,
      loDeliveryCost: this.loDeliveryCost, loDeliveryCompleted: this.loDeliveryCompleted,
      loEstimatedDeliveryDate: this.loEstimatedDeliveryDate,
      loDeliveryCompletedDate: this.loDeliveryCompletedDate,
      idStorePlace: this.idStorePlace,
      idLoEntityOffice: this.idLoEntityOffice,
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
    public shipmentItems?: ShipmentItems[]
  ){this._repo = RefInjector.pull(AbstractDataRepository);}
}
