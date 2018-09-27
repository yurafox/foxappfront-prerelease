import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Poll } from '../../../model/poll';
import { ClientPollAnswer } from '../../../model/client-poll-answer';
import { PollQuestion } from '../../../model/poll-question';
import { PollQuestionAnswer } from '../../../model/poll-question-answer';
import {AbstractPollRepository} from "../abstract/abstract-poll-repository";

// <editor-fold desc="url const">
const pollsUrl= `${AppConstants.BASE_URL}/poll`;
const clientPollAnswersUrl = `${AppConstants.BASE_URL}/poll/ClientPollAnswer`;
const pollQuestionUrl= `${AppConstants.BASE_URL}/poll/pollQuestions`;
const pollQuestionAnswerUrl = `${AppConstants.BASE_URL}/poll/pollAnswers`;
// </editor-fold

@Injectable()
export class PollRepository extends AbstractPollRepository {
  constructor(public http: Http, public connServ: ConnectivityService) {
    super();
  }

  public async getPollById(id: number): Promise<Poll> {
    try {
      const response = await this.http
        .get(`${pollsUrl}/${id}`, RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let poll: Poll = null;
      if (data != null) {
        poll = new Poll(
          data.id,
          new Date(data.dateStart),
          new Date(data.dateEnd),
          data.urlBanner,
          data.bannerText
        );
      }
      return poll;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPollQuestionsByPollId(pollId: number): Promise<PollQuestion[]> {
    try {
      const response = await this.http
        .get(`${pollQuestionUrl}/${pollId}`, RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const pollQuestions = new Array<PollQuestion>();
      if (data != null) {
        if (data) data.forEach(val =>
          pollQuestions.push(
            new PollQuestion(val.id, val.idPoll, val.order, val.question, val.answerType)
          )
        );
      }
      return pollQuestions.sort((a: PollQuestion, b: PollQuestion): number => {
        return b.order - a.order;
      });
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getPollAnswersByQuestionId(idPollQuestion: number): Promise<PollQuestionAnswer[]> {
    try {
      const response = await this.http
        .get(`${pollQuestionAnswerUrl}/${idPollQuestion}`, RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const pollQuestionAnswers: PollQuestionAnswer[] = new Array<PollQuestion>();
      if (data != null) {
        if (data) data.forEach(val =>
          pollQuestionAnswers.push(
            new PollQuestionAnswer(val.id, val.idPollQuestions, val.answer)
          )
        );
      }
      return pollQuestionAnswers;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postClientPollAnswers(pollAnswers: any): Promise<ClientPollAnswer> {
    try {
      const response = await this.http
        .post(pollsUrl/*clientPollAnswersUrl*/, pollAnswers, RequestFactory.makeAuthHeader())
        .toPromise();
      const data = response.json();

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const clientPollLast: ClientPollAnswer = new ClientPollAnswer
      (data.id, data.idClient, data.idPoll, data.idPollQuestions, data.clientAnswer);

      return clientPollLast;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getClientPollAnswersForUserByPollId(pollId: number): Promise<ClientPollAnswer[]> {
    try {
      const response = await this.http
        .get(`${clientPollAnswersUrl}/${pollId}`, RequestFactory.makeAuthHeader())
        .toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const clientPollAnswer: ClientPollAnswer[] = new Array<ClientPollAnswer>();
      if (data != null) {
        if (data) data.forEach(val =>
          clientPollAnswer.push(
            new ClientPollAnswer(val.id, val.idClient, val.idPoll, val.idPollQuestions, val.clientAnswer)
          )
        );
      }
      return clientPollAnswer;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  // <editor-fold desc="error handler"
  public handleError(error?: Error): any {
    if (this.connServ.counter < 1) {
      this.connServ.handleNoConnection(error);
    }
  }
  // </editor-fold>
}
