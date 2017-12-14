import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbstractDataRepository } from '../../app/service/index';

@IonicPage()
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
})
export class ActionPage {
  public actionId:number;
  public content:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _repo:AbstractDataRepository) {
    this.actionId = this.navParams.data;
  }

  async ngOnInit() {
    this.content = await this._repo.getFullAction();
  }

}
