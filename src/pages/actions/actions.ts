import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Action} from '../../app/model/action';
import {AbstractActionRepository} from '../../app/service/repository/abstract/abstract-action-repository';

@IonicPage()
@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
})
export class ActionsPage extends ComponentBase {
  public actions:Action[];

  constructor(public _actionRepo: AbstractActionRepository ) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.actions = await this._actionRepo.getActions();
  }

}
