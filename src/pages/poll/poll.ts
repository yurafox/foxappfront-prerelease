import { IDictionary } from './../../app/core/app-core';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ComponentBase } from '../../components/component-extension/component-base';
import {AnswerType, PollQuestion} from '../../app/model/poll-question';
import {PollQuestionAnswer} from '../../app/model/poll-question-answer';
import {ClientPollAnswer} from '../../app/model/client-poll-answer';
import {AbstractPollRepository} from '../../app/service/repository/abstract/abstract-poll-repository';

interface IPollResult {
  questionId:number,
  answerValue:string
}
interface IQuestionContainer {
  questionObj:PollQuestion,
  answers:PollQuestionAnswer[],
  showOpt:boolean,
  usrOptVal:string
}

@IonicPage()
@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html',
})
export class PollPage extends ComponentBase{
  public pollId:number;
  public pollQuestions:Array<PollQuestion>=[];
  public pollresults:{pollId:number, pollResult:IDictionary<IPollResult>};
  public displayContentResult:boolean= false;

  public pollQuestAns:IQuestionContainer[]=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _pollRepo: AbstractPollRepository,
              public alertCtrl:AlertController) {
    super();
    this.pollId = this.navParams.data.id;
    this.pollresults = {pollId:this.pollId,pollResult:{}};
  }

  async ngOnInit(){
    super.ngOnInit();
    this.pollQuestions = await this._pollRepo.getPollQuestionsByPollId(this.pollId);

    for(let question of this.pollQuestions) {
      let answers: PollQuestionAnswer[] = await this._pollRepo.getPollAnswersByQuestionId(question.id);
      this.pollQuestAns.push({questionObj:question, answers:answers, showOpt:false, usrOptVal:''});
    }
    this.displayContentResult=true;
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

  public get canView():boolean {
    return this.displayContentResult;
  }

  public onSelectionChange(qAnswer:IQuestionContainer,answerValue:string):void {
    this.setUsrOptConfig(qAnswer,answerValue,false);
  }

  public onSelectionOwnerChange(qAnswer:IQuestionContainer):void {
    let answer:string = qAnswer.usrOptVal;
    this.setUsrOptConfig(qAnswer,answer,true);
  }

  public async sendAnswers() {
    const clientAnswer:ClientPollAnswer = await this._pollRepo.postClientPollAnswers(this.pollresults);
    if(clientAnswer) {
      let message = this.locale['AlertMessage'];
      let alert = this.alertCtrl.create({
        message: message,
        buttons:[
          {
            text: 'OK',
            handler: () => {
              this.navCtrl.setRoot('HomePage').then(() => {
                const startIndex = this.navCtrl.getActive().index - 1;
                this.navCtrl.remove(startIndex, 2).catch(console.error);
              });
            }
          }
        ]
      });
      alert.present().catch(console.error);
    }
  }

  public getSenderBtnVisible():boolean {
    if(!this.pollresults.pollResult) {
      return false;
    }
    let answersCount=Object.keys(this.pollresults.pollResult).length;
    return answersCount===this.pollQuestions.length;
  }

  setUsrOptConfig(qAnswer:IQuestionContainer, answerValue:string, isShowOpt:boolean):void {
    qAnswer.showOpt = isShowOpt;
    if(answerValue) {
      this.pollresults.pollResult[`${qAnswer.questionObj.id}`] = {questionId:qAnswer.questionObj.id,answerValue:`${answerValue}`};
    }
    else {
      delete this.pollresults.pollResult[`${qAnswer.questionObj.id}`];
    }
  }
}
