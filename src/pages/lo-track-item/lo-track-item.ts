import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {AbstractLoRepository} from '../../app/service/repository/abstract/abstract-lo-repository';
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage()
@Component({
  selector: 'page-lo-track-item',
  templateUrl: 'lo-track-item.html',
})
export class LoTrackItemPage extends ComponentBase {

  trackArr= [];
  dataLoaded = false;

  constructor(public navParams: NavParams,
              public loRepo: AbstractLoRepository) {
    super();
    this.initData(this.navParams.data).catch(console.error);
  }

  async initData(data: any) {
    this.trackArr = await this.loRepo.getLoTrackLogByOrderSpecId(data.orderSpecId);
    this.dataLoaded = true;
  }

}
