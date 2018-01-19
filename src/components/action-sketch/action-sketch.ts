import { Component, Input } from '@angular/core';
import {NavController} from "ionic-angular";
import { AbstractDataRepository } from '../../app/service/index';
import {Action} from '../../app/model/index';
import {fadeInAnimation} from '../../app/core/animation-core';

@Component({
  selector: 'action-sketch',
  templateUrl: 'action-sketch.html',
  animations: [fadeInAnimation]
})
export class ActionSketchComponent {
  @Input()
  public innerId:number;
  public content:string='';
  @Input()
  public action:Action;

  constructor(public navCtrl: NavController, private _repo:AbstractDataRepository) {
  }

  async ngOnInit() {
    if(!this.action) {
      this.action = await this._repo.getAction(this.innerId);
    }
    this.content=this.action.sketch_content;
  }

  public openAction() {
    this.navCtrl.push('ActionPage', {id:this.innerId || this.action.id, action:this.action}).catch(
      err => {
        console.log(`Error navigating to ActionPage: ${err}`);
      }
    );
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
     return (this.dateEnd) ? this.dateEnd.getDate()-new Date().getDate()
                           : this.dateEnd;
  }
}
