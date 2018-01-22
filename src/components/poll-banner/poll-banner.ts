import { Component, Input, OnInit } from '@angular/core';
import {NavController} from "ionic-angular";
import { AbstractDataRepository } from '../../app/service/index';
import { ComponentBase } from '../component-extension/component-base';
import { Poll } from './../../app/model/index';
import {fadeInAnimation} from '../../app/core/animation-core';

@Component({
  selector: 'poll-banner',
  templateUrl: 'poll-banner.html',
  animations:[fadeInAnimation]
})
export class PollBannerComponent extends ComponentBase{
  @Input()
  innerId?:number;
  currentPoll:Poll;
  canView = false;

  constructor(public navCtrl: NavController,
              private _repo:AbstractDataRepository) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.currentPoll = await this._repo.getPollById(this.innerId || 1);
    this.canView = this.userService.isAuth && new Date() <= this.currentPoll.dateEnd;
  }

  public openItem():void {
    this.navCtrl.push('PollPage', {id:this.innerId || 1}).catch(
      err => {
        console.log(`Error navigating to PollPage: ${err}`);
      }
    );
  }
}
