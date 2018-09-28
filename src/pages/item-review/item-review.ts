import {Component, Input} from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ProductReview} from '../../app/model/product-review';
import {StoreReview} from "../../app/model/store-review";

@IonicPage()
@Component({
  selector: 'page-item-review',
  templateUrl: 'item-review.html',
})

export class ItemReviewPage extends ComponentBase {

  @Input() rev: ProductReview | StoreReview;


  constructor(public navParams: NavParams) {
    super();
    if (this.navParams.data) {
      this.rev = navParams.data;
    } else if (this.navParams.data.reviews) {
      this.rev = navParams.data.reviews;
    }
  }

}
