import {Component, Input} from '@angular/core';
import {Product} from '../../app/model/product';
import {NavController} from 'ionic-angular';
import {ItemReviewsPage} from '../../pages/item-reviews/item-reviews';

@Component({
  selector: 'product-rating',
  templateUrl: 'product-rating.html'
})
export class ProductRatingComponent {

  @Input() product: Product;

  constructor(public navCtrl: NavController) {
  }

  openReviews(event: Event, data: Product): void {
    event.stopPropagation();
    this.navCtrl.push(ItemReviewsPage, {product:this.product});
  }


}
