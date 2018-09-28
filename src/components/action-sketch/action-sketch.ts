import { Component, Input } from '@angular/core';
import {NavController} from 'ionic-angular';
import {fadeInAnimation} from '../../app/core/animation-core';
import {ComponentBase} from '../component-extension/component-base';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {Action} from '../../app/model/action';
import {AbstractActionRepository} from '../../app/service/repository/abstract/abstract-action-repository';

@Component({
  selector: 'action-sketch',
  templateUrl: 'action-sketch.html',
  animations: [fadeInAnimation]
})
export class ActionSketchComponent extends ComponentBase {
  @Input()
  public innerId:number;
  public content:boolean;
  @Input()
  public action:Action;
  @Input()
  public isOnLanding:boolean;

  public alive:boolean;
  public expire:{days?:number,hours?:number,minutes?:number,seconds?:number};

  constructor(public navCtrl: NavController, public _actionRepo: AbstractActionRepository) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.alive = true;
    this.expire = {};
    await this.InitActionOpt();
  }

  ngOnDestroy():void {
    super.ngOnDestroy();
    this.alive= false;
  }

  public async openAction() {
    if (!this.action) {
      this.action = await this._actionRepo.getAction(this.innerId);
      if (this.action) {
        this.pushActionPage();
      }
    } else {
      this.pushActionPage();
    }
  }

  private pushActionPage() {
    this.navCtrl.push('ActionPage', { id: this.innerId || this.action.id, action: this.action }).catch(err => {
      console.log(`Error navigating to ActionPage: ${err.message}`);
    });
  }

  private async InitActionOpt() {
    this.action = this.action || await this._actionRepo.getAction(this.innerId);
    this.content = this.action && this.dateEnd > new Date();
   
    this.evServ.events['actionPushEvent'].emit(this);
    this.actionExpire(); // for design display

    // timer action time
    IntervalObservable.create(1000)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.actionExpire();
      });
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

  public get actionActiveRange():any {
    if(this.dateEnd < new Date())
         return 0;


    let timespan:number = Math.abs(this.dateEnd.getTime() - new Date().getTime());
    let diffDays:number = Math.ceil(timespan / (1000*3600*24));

     return diffDays;
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
