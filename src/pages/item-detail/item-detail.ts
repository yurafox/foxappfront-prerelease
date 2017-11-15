import {Component, Input, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product} from '../../app/model/product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {ProductReview} from "../../app/model/product-review";
import {ItemDescriptionPage} from '../item-description/item-description';
import {ItemPropsPage} from '../item-props/item-props';
import {ItemReviewPage} from '../item-review/item-review';
import {ItemReviewsPage} from '../item-reviews/item-reviews';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage extends ComponentBase implements OnInit {

  product: Product;
  qty = 1;
  reviews = new Array<ProductReview>() ;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository) {
    super();
    this.product = this.navParams.data;
    console.log(this.product.name);
  }

  async ngOnInit() {
    super.ngOnInit();
    this.reviews = await this.repo.getProductReviewsByProductId(this.product.id);
  }

  incQty(): void {
    this.qty++;
  }

  decQty(): void {
    if (this.qty >= 2)
      this.qty--;
  }

  onShowProductDescription(): void {
    this.navCtrl.push(ItemDescriptionPage, this.product.description);
  }

  onShowProductProps(): void {
    this.navCtrl.push(ItemPropsPage, this.product);
  }

  onShowReviewClick(data: any): void {
    this.navCtrl.push(ItemReviewPage, data);
  }

  onShowReviewsClick(data: any): void {
    this.navCtrl.push(ItemReviewsPage, data);
  }
}
