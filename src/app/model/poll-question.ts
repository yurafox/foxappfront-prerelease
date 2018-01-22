export class PollQuestion{
  constructor(
    public id?: number,
    public idPoll?: number,
    public order?: Date,
    public question?: string,
    public answerType?: string // List, Text
  ){ }
}
