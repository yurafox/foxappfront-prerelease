import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import { Action } from '../../app/model/index';
import { AbstractDataRepository } from '../../app/service/index';

@IonicPage()
@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
})
export class ActionsPage extends ComponentBase {
  public actions:Action[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _repo: AbstractDataRepository ) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.actions = await this._repo.getActions();
  }

}
