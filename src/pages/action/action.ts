import { ActionOffer, QuotationProduct, Product } from './../../app/model/index';
import {System} from '../../app/core/app-core';
import { Component,OnInit,OnDestroy} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbstractDataRepository } from '../../app/service/index';
import { Action } from './../../app/model/index';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/takeWhile';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { ComponentBase } from '../../components/component-extension/component-base';


@IonicPage()
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
})
export class ActionPage extends ComponentBase implements OnInit,OnDestroy {
  public actionId:number;
  public content:string='';
  public action:Action;
  public actionProducts:Array<Product>=[];
  public quotationProduct:Array<QuotationProduct>=[];
  public expire:{days?:number,hours?:number,minutes?:number,seconds?:number};
  private alive:boolean;
  private monitor:{};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _repo:AbstractDataRepository) {
    super();
    this.actionId = this.navParams.data.id;
    this.action = this.navParams.data.action;
    this.alive = true;
    this.expire = {};
  }

  async ngOnInit() {
    super.ngOnInit();
    if(!this.action)
     this.action = await this._repo.getAction(this.actionId);

    // get dynamic content
    this.content = this.action.action_content;
    this.actionExpire(); // for design display

    // timer action time
    IntervalObservable.create(1000)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.actionExpire();
    });
    
    if(!Monitor.isMustWait()){
      Monitor.enter();
      this.actionProducts = await this._repo.getProductsByActionId(this.actionId);
      Monitor.exit();
    }
      
  }

  ngOnDestroy():void {
    super.ngOnDestroy();
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
    let timespan:number = Math.abs(this.dateEnd.getTime() - new Date().getTime());
    this.expire.days = Math.floor(timespan / (1000*3600*24));
    timespan -=  this.expire.days * (1000 * 60 * 60 * 24);

    this.expire.hours = Math.floor(timespan / (1000*3600));
    timespan -=  this.expire.hours * (1000 * 3600);

    this.expire.minutes = Math.floor(timespan / (1000*60));
    timespan -= this.expire.minutes * (1000 * 60);

    this.expire.seconds = Math.floor(timespan / 1000);
    timespan -= this.expire.seconds * 1000;
  }
}

class Monitor {
  private static isLock:boolean=false;
  public static enter():void {
    Monitor.isLock=true;
  }

  public static exit():void {
    Monitor.isLock=false;
  }

  public static isMustWait():boolean{
    return Monitor.isLock;
  }
}
