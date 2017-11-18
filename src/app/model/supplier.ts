export class Supplier {
  constructor(
    public id?: number,
    public name?: string,
    public paymentMethodId?: number,
    public rating?: number,
    public positiveFeedbackPct?: number,
    public refsCount?: number
  ) {}
}
