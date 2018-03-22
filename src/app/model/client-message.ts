export class ClientMessage {
  constructor(
    public id?: number,
    public idClient?: number,
    public messageDate?: Date,
    public messageText?: string,
    public isAnswered?: number
  ) {}
}
