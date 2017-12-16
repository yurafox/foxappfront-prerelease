import { ActionPage } from './../../pages/action/action';
import { Component, Input } from '@angular/core';
import {NavController} from "ionic-angular";
import { AbstractDataRepository } from '../../app/service/index';

@Component({
  selector: 'action-sketch',
  templateUrl: 'action-sketch.html'
})
export class ActionSketchComponent {
  @Input()
  public innerId:number;
  public content:string='';

  constructor(public navCtrl: NavController, private _repo:AbstractDataRepository) {
  }

  async ngOnInit() {
    this.content = await this._repo.getAction(this.innerId);
  }

  public openAction() {
    this.navCtrl.push(ActionPage, this.innerId);
  }

}
