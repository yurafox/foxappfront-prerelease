import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ProductReview} from '../../app/model/product-review';
import {Product} from '../../app/model/product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@IonicPage()
@Component({
  selector: 'page-item-reviews',
  templateUrl: 'item-reviews.html',
})
export class ItemReviewsPage extends ComponentBase implements OnInit {

  reviews: ProductReview[];
  product: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams, public repo: AbstractDataRepository) {
    super();
    this.product = navParams.data.product;
    this.reviews = navParams.data.reviews;
  }

  async ngOnInit () {
    if (!(this.navParams.data.reviews))
      this.reviews = await this.repo.getProductReviewsByProductId(this.product.id);
  }

}
