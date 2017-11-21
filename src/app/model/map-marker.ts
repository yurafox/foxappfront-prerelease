export class MapMarker {
  constructor(
    public id?: number,
    public position?: {
      lat: number,
      lng: number
    },
    public title?: string
  ) {}
}
