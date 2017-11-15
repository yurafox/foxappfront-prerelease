import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product} from '../../app/model/product';


@IonicPage()
@Component({
  selector: 'page-item-review-write',
  templateUrl: 'item-review-write.html',
})

export class ItemReviewWritePage extends ComponentBase {

  product: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    this.product = navParams.data;
  }

  onSubmitClick(): void {
    console.log('Submit review click');
  }


}
