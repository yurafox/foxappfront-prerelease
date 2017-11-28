export class ClientAddress {
  constructor (
    public id: number,
    public idClient: number,
    public idCity: number,
    public zip?: string,
    public street?: string,
    public lat?: number,
    public lng?: number,
    public isPrimary?: boolean,
    public idCountry?: number,
    public city?: string
  ) {}
}
