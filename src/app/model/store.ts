export class Store {
  constructor(
    public id: number,
    public position: {
      lat: number,
      lng: number
    },
    public address: string,
    public openTime?: string,
    public closeTime?: string,
    public rating?: number,
    public feedbacks?: Array<string>,
    public isPrimary?: boolean
  ) {}
}
