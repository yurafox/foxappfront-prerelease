export class ProductReview {
  constructor (
    public id: number,
    public idProduct: number,
    public user: string,
    public reviewDate: Date,
    public reviewText: string,
    public rating: number
  ) {}
}
