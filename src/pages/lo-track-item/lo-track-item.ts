import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage()
@Component({
  selector: 'page-lo-track-item',
  templateUrl: 'lo-track-item.html',
})
export class LoTrackItemPage extends ComponentBase {

  trackArr= [];
  dataLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                private repo: AbstractDataRepository) {
    super();
    this.initData(this.navParams.data.id);
  }

  async initData(id: number) {
    this.trackArr = await this.repo.getLoTrackLogByOrderSpecId(id);
    this.dataLoaded = true;
  }

}
