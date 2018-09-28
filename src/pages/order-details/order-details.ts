import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {ClientOrder} from '../../app/model/client-order';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AppConstants} from '../../app/app-constants';


@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage extends ComponentBase {

  order: ClientOrder;
  dataLoaded: boolean = true;
  mPlaceFeaturesEnabled = AppConstants.ENABLE_MARKETPLACE_FEATURES;

  constructor(public navParams: NavParams) {
    super();
    this.order = this.navParams.data.order;
  }


}
