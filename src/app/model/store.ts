export class Store {
  constructor(
    public id: number,
    public idCity: number,
    public address: string,
    public position: {
      lat: number,
      lng: number
    },
    public openTime?: string,
    public closeTime?: string,
    public rating?: number,
    public idFeedbacks?: number,
    public isPrimary?: boolean
  ) {}
}
