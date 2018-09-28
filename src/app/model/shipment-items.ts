export class ShipmentItems {

  constructor(
    public id?: number,
    public idShipment?: number,
    public idOrderSpecProd?: number,
    public qty?: number,
    public errorMessage?: string
  ){}

}
