import {Component} from '@angular/core';
import {Product} from '../../app/model/product';
import {NavController, NavParams, ToastController} from "ionic-angular";
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {ItemBase} from '../component-extension/item-base';
import {EventService} from '../../app/service/event-service';


@Component({
  selector: 'item',
  templateUrl: 'item.html'
})

export class ItemComponent extends ItemBase {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository) {
    super(navCtrl, navParams, repo);
  }


  openItemDetails(data: Product): void {
    this.navCtrl.push('ItemDetailPage', {prod: this.product, loadQuotes: true});
  }

}
