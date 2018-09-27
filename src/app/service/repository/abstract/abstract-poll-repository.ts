import {Poll} from '../../../model/poll';
import {PollQuestion} from '../../../model/poll-question';
import {PollQuestionAnswer} from '../../../model/poll-question-answer';
import {ClientPollAnswer} from '../../../model/client-poll-answer';

export abstract class AbstractPollRepository {
  public async abstract getPollById(id:number): Promise<Poll>;
  public async abstract getPollQuestionsByPollId(pollId:number):Promise<PollQuestion[]>;
  public async abstract getPollAnswersByQuestionId(idPollQuestion:number):Promise<PollQuestionAnswer[]>;
  public async abstract postClientPollAnswers(pollAnswers:any):Promise<ClientPollAnswer>;
  public async abstract getClientPollAnswersForUserByPollId(pollId:number):Promise<ClientPollAnswer[]>;
}
