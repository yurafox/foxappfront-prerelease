import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@IonicPage()
@Component({
  selector: 'page-lo-track-item',
  templateUrl: 'lo-track-item.html',
})
export class LoTrackItemPage {

  trackArr= [];
  dataLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                private repo: AbstractDataRepository) {

    this.initData(this.navParams.data.id);
  }

  async initData(id: number) {
    this.trackArr = await this.repo.getLoTrackLogByOrderSpecId(id);
    this.dataLoaded = true;
  }

}
