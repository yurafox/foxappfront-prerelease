import {Component, ChangeDetectorRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product} from '../../app/model/product';
import {Store} from "../../app/model";


@IonicPage()
@Component({
  selector: 'page-item-review-write',
  templateUrl: 'item-review-write.html',
})

export class ItemReviewWritePage extends ComponentBase {
  product: Product;
  store: Store;
  rating: number;
  reviewText: string ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private changeDetector: ChangeDetectorRef) {
    super();
    this.rating = 0;
    if (navParams.data instanceof Product) {
      this.product = navParams.data;
    } else if (navParams.data instanceof Store) {
      this.store = navParams.data;
    } else if (navParams.data.product instanceof Product) {
      this.product = navParams.data.product;
    } else if (navParams.data.store instanceof Store) {
      this.store = navParams.data.store;
    }
  }

  async ngOnInit() {
    super.ngOnInit();
  }

  onSubmitClick(): void {
    console.log(`Submitted review: "${this.reviewText}"\n With rating: ${this.rating}`);
  }

  ionViewDidLoad() {
    if (document.readyState === 'complete') {
      if (document.getElementById('rating') && document.getElementById('rating')!==null) {
        document.getElementById('rating').addEventListener('click', () => {
          this.changeDetector.detectChanges();
        });
      }
    }
  }

}
