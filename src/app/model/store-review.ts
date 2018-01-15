import {ReviewAnswer} from "./review-answer";

export class StoreReview {
  constructor (
    public id: number,
    public idStore: number,
    public user: string,
    public reviewDate: Date,
    public reviewText: string,
    public rating: number,
    public advantages?: string,
    public disadvantages?: string,
    public upvotes?: number,
    public downvotes?: number,
    public reviewAnswers?: ReviewAnswer[]
  ) {}
}
