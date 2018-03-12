export class ClientPollAnswer{
  constructor(
    public id?: number,
    public idClient?:number,
    public idPoll?:number,
    public idPollQuestions?: number,
    public clientAnswer?: string
  ){ }
}
