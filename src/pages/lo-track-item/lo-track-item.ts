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
                public repo: AbstractDataRepository) {
    super();
    this.initData(this.navParams.data);
  }

  async initData(data: any) {
    this.trackArr = await this.repo.getLoTrackLogByOrderSpecId(data.orderSpecId);
    this.dataLoaded = true;
  }

}
