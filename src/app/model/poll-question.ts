export class PollQuestion{
  constructor(
    public id?: number,
    public idPoll?: number,
    public order?: number,
    public question?: string,
    public answerType?: AnswerType // List, Text ,ListText
  ){ }
}

export enum AnswerType {
   List = 0,
   Text = 1,
   ListText = 2
}
