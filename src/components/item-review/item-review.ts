import {Component, Input} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {Product} from '../../app/model/product';
import {ProductReview} from '../../app/model/product-review';

@Component({
  selector: 'item-review',
  templateUrl: 'item-review.html'
})
export class ItemReviewComponent extends ComponentBase {

  @Input() review: ProductReview;
  @Input() displayTextLength: number;
  @Input() fullMode = true;

  constructor() {
    super();
  }

}
