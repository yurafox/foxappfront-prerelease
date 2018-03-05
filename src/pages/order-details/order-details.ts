import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {ClientOrder} from '../../app/model/client-order';
import {UserService} from '../../app/service/bll/user-service';
import {ComponentBase} from "../../components/component-extension/component-base";


@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage extends ComponentBase {

  order: ClientOrder;
  dataLoaded: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository, public userService: UserService) {
    super();
    this.order = this.navParams.data.order;
  }


}
