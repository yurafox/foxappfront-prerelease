import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ProductReview} from '../../app/model/product-review';
import {Product} from '../../app/model/product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {StoreReview} from "../../app/model/store-review";
import {Store} from "../../app/model";

@IonicPage()
@Component({
  selector: 'page-item-reviews',
  templateUrl: 'item-reviews.html',
})
export class ItemReviewsPage extends ComponentBase implements OnInit {

  reviews: ProductReview[] | StoreReview[];
  product: Product;
  store: Store;
  item: Product | Store;

  constructor(public navCtrl: NavController, public navParams: NavParams, public repo: AbstractDataRepository) {
    super();
    if (navParams.data.product) {
      this.product = navParams.data.product;
      this.item = this.product;
    } else if (navParams.data.store) {
      this.store = navParams.data.store;
      this.item = this.store;
    }
    if (this.navParams.data.reviews) {
      this.reviews = navParams.data.reviews;
    }
  }

  async ngOnInit () {
    if (!(this.navParams.data.reviews))
      if (this.navParams.data.product) {
        this.reviews = await this.repo.getProductReviewsByProductId(this.product.id);
      } else if (this.navParams.data.store) {
        this.reviews = await this.repo.getStoreReviewsByStoreId(this.store.id);
      }
  }

  onWriteReviewClick(): void {
    if (this.product) {
      if (!this.userService.isAuth) {
        this.navCtrl.push('LoginPage', {continuePage: 'ItemReviewWritePage', params:this.product}).catch((err) => {
          console.log(`Couldn't navigate to LoginPage: ${err}`);
        });
      } else {
        this.navCtrl.push('ItemReviewWritePage', this.product).catch(err => {
          console.log(`Error navigating to ItemReviewWritePage: ${err}`);
        });
      }
    } else if (this.store) {
      if (!this.userService.isAuth) {
        this.navCtrl.push('LoginPage', {continuePage: 'ItemReviewWritePage', params:this.store}).catch((err) => {
          console.log(`Couldn't navigate to LoginPage: ${err}`);
        });
      } else {
        this.navCtrl.push('ItemReviewWritePage', this.store).catch(err => {
          console.log(`Error navigating to ItemReviewWritePage: ${err}`);
        });
      }
    }
  }

  onShowReviewClick(data: any): void {
    this.navCtrl.push('ItemReviewPage', data).catch(err => {
      console.log(`Error navigating to ItemReviewPage: ${err}`);
    });
  }
}
