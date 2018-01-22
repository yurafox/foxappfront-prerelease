export class ClientPollAnswer{
  constructor(
    public id?: number,
    public userId?:number,
    public idPollQuestions?: number,
    public clientAnswer?: string
  ){ }
}
