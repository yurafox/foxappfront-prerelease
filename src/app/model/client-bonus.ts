export class ClientBonus {
  constructor(
    public id: number,
    public clientId: number,
    public bonus: number,
    public dueDate: Date
  ) { }
}
