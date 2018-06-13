export class News {
  constructor(public id?: number,
              public previewImgUrl?: string,
              public caption?: string,
              public description?: string,
              public publicDate ?: Date,
              public sort ?: number
  ) {}
}
