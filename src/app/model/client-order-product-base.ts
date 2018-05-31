export class ClientOrderProductBase {
  constructor (
    public id?: number,
    public idOrder?: number,
    public idQuotationProduct?: number,
    public price?: number,
    public qty?: number,
    public idStorePlace?: number,
    public earnedBonusCnt?: number
  ){}
}
