import { Component,OnInit,OnDestroy} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbstractDataRepository } from '../../app/service/index';
import { Action } from './../../app/model/index';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/takeWhile';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@IonicPage()
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
})
export class ActionPage implements OnInit,OnDestroy {
  public actionId:number;
  public content:string='';
  public action:Action;
  public expire:Date;
  private alive:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _repo:AbstractDataRepository) {
    this.actionId = this.navParams.data.id;
    this.action = this.navParams.data.action;
    this.alive = true;
  }

  async ngOnInit() {
    if(!this.action)
     this.action = await this._repo.getAction(this.actionId);

    this.content = this.action.action_content;
    this.actionExpire(); // for design display

    IntervalObservable.create(1000)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.actionExpire();
    });
  }

  ngOnDestroy():void {
    this.alive= false;
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

  public get actionActiveLine():string {
    return `с ${this.toDefaultDateStringFormat(this.dateStart)} по ${this.toDefaultDateStringFormat(this.dateEnd)}`
  }

  // date converter
  public toDefaultDateStringFormat(date:Date): string {
     return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }

  public  actionExpire(): void {
    this.expire = new Date(this.dateEnd.getTime() - new Date().getTime());
  }
}
