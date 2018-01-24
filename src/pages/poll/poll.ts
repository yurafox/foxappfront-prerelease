import { IDictionary } from './../../app/core/app-core';
import { PollQuestion, PollQuestionAnswer, AnswerType } from './../../app/model/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponentBase } from '../../components/component-extension/component-base';
import { AbstractDataRepository } from '../../app/service/index';

interface IPollResult {
  questionId:number,
  answerValue:string
}

@IonicPage()
@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html',
})
export class PollPage extends ComponentBase{
  private pollId:number;
  private pollQuestions:Array<PollQuestion>=[];
  private pollresults:{pollId:number, pollResult:IDictionary<IPollResult>};

  public pollQuestAns:Array<{questionObj:PollQuestion, answers:PollQuestionAnswer[]}>=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _repo:AbstractDataRepository) {
    super();
    this.pollId = this.navParams.data.id;
    this.pollresults = {pollId:this.pollId,pollResult:{}};
  }

  async ngOnInit(){
    super.ngOnInit();
    this.pollQuestions = await this._repo.getPollQuestionsByPollId(this.pollId);

    for(let question of this.pollQuestions) {
      let answers: PollQuestionAnswer[] = await this._repo.getPollAnswersByQuestionId(question.id);
      this.pollQuestAns.push({questionObj:question,answers:answers});
    }
  }

  public get listType():AnswerType {
    return AnswerType.List;
  }

  public get textType():AnswerType {
    return AnswerType.Text;
  }

  public get listTextType():AnswerType {
    return AnswerType.ListText;
  }

  public onSelectionChange(questionId,answerValue):void {
    this.pollresults.pollResult[`${questionId}`] = {questionId:questionId,answerValue:`${answerValue}`};
  }

  public onSelectionOwnerChange(questionId):void {
     console.log(questionId);
  }
}
