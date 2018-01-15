export class ReviewAnswer {
  constructor (
    public id: number,
    public idReview: number,
    public user: string,
    public answerDate: Date,
    public answerText: string
  ) {}
}
