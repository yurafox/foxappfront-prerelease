import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponentBase } from '../../components/component-extension/component-base';

@IonicPage()
@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html',
})
export class PollPage extends ComponentBase{
  pollId:number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    this.pollId = this.navParams.data.id;
  }
}
