import {Component, Input} from '@angular/core';
import {Product} from '../../app/model/product';

@Component({
  selector: 'product-rating',
  templateUrl: 'product-rating.html'
})
export class ProductRatingComponent {

  @Input() product: Product;

  constructor() {
  }

  openReviews(event: Event, data: Product): void {
    event.stopPropagation();
    console.log('Review for product: '+ data.id );
  }


}
