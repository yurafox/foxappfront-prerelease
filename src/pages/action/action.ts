import {ChangeDetectorRef, Component, OnInit, DoCheck, OnDestroy, ViewChild, NgZone} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import 'rxjs/add/operator/takeWhile';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {ComponentBase} from '../../components/component-extension/component-base';
import {SearchService} from '../../app/service/search-service';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {Subscription} from 'rxjs/Subscription';
import {Action} from '../../app/model/action';
import {Product} from '../../app/model/product';
import {QuotationProduct} from '../../app/model/quotation-product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@IonicPage()
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
})
export class ActionPage extends ComponentBase implements OnInit,OnDestroy,DoCheck {
  @ViewChild('cont') cont;
  @ViewChild('header') header;
  @ViewChild(Content) mainContent: Content;
  scrollHeight: number;
  scrOrientationSub: Subscription;
  contentSub: Subscription;

  public actionId:number;
  public content:string='';
  public action:Action;
  public actionProducts:Array<Product>=[];
  public quotationProduct:Array<QuotationProduct>=[];
  public expire:{days?:number,hours?:number,minutes?:number,seconds?:number};
  private alive:boolean;
  private monitor:{};
  private me:any;
  private divsHeight:number;

  public position;
  public top;
  public offsetTop;
  public scrolledEnough: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _repo:AbstractDataRepository, private srch: SearchService,
              private screenOrientation: ScreenOrientation,private changeDet: ChangeDetectorRef,
              private zone: NgZone) {
    super();
    this.actionId = this.navParams.data.id;
    this.action = this.navParams.data.action;
    this.alive = true;
    this.expire = {};
    this.me = this;
    this.divsHeight = 0;
    this.scrolledEnough = false;
  }

  ngDoCheck() {}

  async ngOnInit() {
    super.ngOnInit();
    if(!this.action)
     this.action = await this._repo.getAction(this.actionId);

    // get dynamic content
    if (this.action) this.content = this.action.action_content;
    this.srch.hostPage = this.me;

    if(!Monitor.isMustWait()){
      Monitor.enter();
      await this.srch.searchByAction(this.actionId);
      this.scrOrientationSub = this.screenOrientation.onChange().subscribe(() => {
        this.changeDet.detectChanges();
      });
      Monitor.exit();
    }
    this.actionExpire(); // for design display
    // timer action time
    IntervalObservable.create(1000)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.actionExpire();
    });

    this.updateScrollHeight();
  }

  ionViewDidEnter() {}

  ngOnDestroy():void {
    super.ngOnDestroy();
    this.alive= false;
    if (this.scrOrientationSub) this.scrOrientationSub.unsubscribe();
    if (this.contentSub) this.contentSub.unsubscribe();
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

  public updateScrollHeight() {
    const hdrH = (this.me.header) ? this.me.header.nativeElement.scrollHeight : 0;
    this.scrollHeight = (window.screen.height) - hdrH;
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
