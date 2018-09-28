import { Component, Input } from '@angular/core';
import {NavController} from 'ionic-angular';
import { ComponentBase } from '../component-extension/component-base';
import {fadeInAnimation} from '../../app/core/animation-core';
import {Poll} from '../../app/model/poll';
import {ClientPollAnswer} from '../../app/model/client-poll-answer';
import {AbstractPollRepository} from "../../app/service/repository/abstract/abstract-poll-repository";

@Component({
  selector: 'poll-banner',
  templateUrl: 'poll-banner.html',
  animations:[fadeInAnimation]
})
export class PollBannerComponent extends ComponentBase{
  @Input()
  innerId?:number;
  currentPoll:Poll;
  clientAnswers:ClientPollAnswer[]=[];
  canView = false;

  constructor(public navCtrl: NavController,
              public _pollRepo: AbstractPollRepository) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    if (this.userService.isAuth) {
      [this.currentPoll,this.clientAnswers] = await Promise.all([this._pollRepo.getPollById(this.innerId || 1),
        this._pollRepo.getClientPollAnswersForUserByPollId(this.innerId)]);

      this.canView = new Date() <= this.currentPoll.dateEnd
                        && this.clientAnswers.length===0;

      if(!this.canView)
        this.removeVariableBlock();
    }
    else {
      this.canView = false;
      this.removeVariableBlock();
    }
  }

  public openItem():void {
    this.navCtrl.push('PollPage', {id:this.innerId || 1}).catch(
      err => {
        console.log(`Error navigating to PollPage: ${err}`);
      }
    );
  }

  public removeVariableBlock():void {
    let dynamicHtml = document.getElementsByTagName('dynamic-html')[0];
    let poll=document.getElementsByTagName('poll-banner')[0].parentElement;
    dynamicHtml.removeChild(poll);
  }
}
