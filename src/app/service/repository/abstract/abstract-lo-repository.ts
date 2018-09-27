import {LoSupplEntity} from '../../../model/lo-suppl-entity';
import {LoEntity} from '../../../model/lo-entity';
import {LoTrackLog} from '../../../model/lo-track-log';
import {Shipment} from '../../../model/shipment';
import {LoDeliveryType} from '../../../model/lo-delivery-type';
import {LoEntityOffice} from '../../../model/lo-entity-office';
import {LoDeliveryTypeAttr} from '../../../model/lo-delivery-type-attr';

export abstract class AbstractLoRepository {
  public async abstract getLoEntitiesForSupplier(supplierId: number):Promise<LoSupplEntity[]>;
  public async abstract getLoEntitiyById(entityId: number):Promise<LoEntity>;
  public async abstract getLoTrackLogByOrderSpecId(id: number): Promise<LoTrackLog[]>;
  public async abstract getDeliveryDateByShipment(shpmt: Shipment, loEntityId: number, loIdClientAddress: number, delivTypeId: number): Promise<Date>;
  public async abstract getDeliveryCostByShipment(shpmt: Shipment, loEntityId: number, loIdClientAddress: number, delivTypeId: number): Promise<number>;
  public async abstract getLoDeliveryTypeById(id: number): Promise<LoDeliveryType>;
  public async abstract getLoEntityOfficeById(id: number): Promise<LoEntityOffice>;
  public async abstract getLoEntityDeliveryTypes(idLoEntity: number): Promise<LoDeliveryType[]>;
  public async abstract getLoOfficesByLoEntityAndCity(idLoEntity: number, idCity: number): Promise<LoEntityOffice[]>;
  public async abstract getLoEntityDeliveryTypesAttr(shpmt: Shipment, loIdClientAddress: number): Promise<LoDeliveryTypeAttr[]>;
  public async abstract getAllowTakeOnCreditByStatus(status: number): Promise<boolean>;
}
