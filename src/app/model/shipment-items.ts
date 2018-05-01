import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {RefInjector} from '../core/app-core';

export class ShipmentItems {

  constructor(
    public id?: number,
    public idShipment?: number,
    public idOrderSpecProd?: number,
    public qty?: number,
    public errorMessage?: string
  ){}

}
