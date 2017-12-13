import { ActionPage } from './../../pages/action/action';
import { Component, Input } from '@angular/core';
import {NavController} from "ionic-angular";

@Component({
  selector: 'action-sketch',
  templateUrl: 'action-sketch.html'
})
export class ActionSketchComponent {
  @Input()
  public innerId:number
  constructor(public navCtrl: NavController) {
  }

  public openAction() {
    this.navCtrl.push(ActionPage, this.innerId);
  }

}
