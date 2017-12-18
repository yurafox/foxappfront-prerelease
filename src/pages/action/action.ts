import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbstractDataRepository } from '../../app/service/index';
import { Action } from './../../app/model/index';

@IonicPage()
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
})
export class ActionPage {
  public actionId:number;
  public content:string='';
  public action:Action;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _repo:AbstractDataRepository) {
    this.actionId = this.navParams.data.id;
    this.action = this.navParams.data.action;
  }

  async ngOnInit() {
    if(!this.action)
     this.action = await this._repo.getAction(this.actionId);

    this.content = this.action.action_content;
  }

  public get id ():number {
    return this.action.id;
  }

  public get name ():string {
    return this.action.name;
  }

  public get dateStart ():Date {
    return this.action.dateStart;
  }

  public get dateEnd ():Date {
    return this.action.dateEnd;
  }

  public get img_url ():string {
    return this.action.img_url;
  }

  public get priority ():number {
    return this.action.priority;
  }

  public get sketch_content ():string {
    return this.action.sketch_content;
  }

  public get action_content ():string {
    return this.action.action_content;
  }
}
