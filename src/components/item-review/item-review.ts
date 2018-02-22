import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {ProductReview} from '../../app/model/product-review';
import {StoreReview} from "../../app/model/store-review";

@Component({
  selector: 'item-review',
  templateUrl: 'item-review.html'
})
export class ItemReviewComponent extends ComponentBase {

  @Input() review: ProductReview | StoreReview;
  @Input() displayTextLength: number;
  @Input() collapsibleMode = false;
  helpfulClicked: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onHelpfulClick() {
    console.log('"Helpful" clicked');
    this.helpfulClicked = true;
    this.changeDetector.detectChanges();

  }
  onNotHelpfulClick() {
    console.log('"Not Helpful" clicked');
    this.helpfulClicked = true;
    this.changeDetector.detectChanges();
  }
}
