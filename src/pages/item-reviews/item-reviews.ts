import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  reviewsObj: {reviews: ProductReview[] | StoreReview[], idClient: number};
  product: Product;
  store: Store;
  item: Product | Store;
  clientId: number = 0;
  cantShow: boolean;
  dataLoaded: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public repo: AbstractDataRepository,
              public loadingCtrl: LoadingController) {
    super();
    this.initLocalization();
    this.dataLoaded = false;
    if (this.navParams.data.page && this.navParams.data.page.cantShow){
      this.cantShow = this.navParams.data.page.cantShow;
    }
    if (this.navParams.data.cantShow){
      this.cantShow = this.navParams.data.cantShow;
    }
  }

  async ngOnInit () {
    let content = this.locale['LoadingContent'];
    let loading = this.loadingCtrl.create({
      content: content
    });

    await loading.present();

    if (this.navParams.data.page) {
      if (this.navParams.data.page.reviews) {
        this.reviews = this.navParams.data.page.reviews;
      }
      if (this.navParams.data.page.clientId) {
        this.clientId = this.navParams.data.page.clientId;
      }
    }

    if (this.navParams.data.product) {
      this.product = this.navParams.data.product;
      this.item = this.product;
    } else if (this.navParams.data.store) {
      this.store = this.navParams.data.store;
      this.item = this.store;
    }
    if (this.navParams.data.reviews) {
      this.reviews = this.navParams.data.reviews;
    }
    if (this.navParams.data.cantShow) {
      this.cantShow = this.navParams.data.cantShow;
    }

    if (!this.reviews && (this.navParams.data.product || this.navParams.data.store)) {
      if (this.navParams.data.product) {
        this.reviewsObj = await this.repo.getProductReviewsByProductId(this.product.id);
      } else if (this.navParams.data.store) {
        this.reviewsObj = await this.repo.getStoreReviewsByStoreId(this.store.id);
      }
    }
    if (this.reviewsObj) {
      this.reviews = this.reviewsObj.reviews;
      this.clientId = this.reviewsObj.idClient;
    }

    this.cantShow = this.hasClientReview();

    this.dataLoaded = true;
    await loading.dismiss();
  }

  async ionViewDidEnter() {
    if (this.product) {
      let hasClientReviews = await this.repo.getHasClientProductReview(this.product.id);
      if (hasClientReviews && hasClientReviews != null && hasClientReviews.hasReview) {
        this.cantShow = hasClientReviews.hasReview;
      }
    }
    if (this.store) {
      let hasClientReviews = await this.repo.getHasClientStoreReview(this.store.id);
      if (hasClientReviews && hasClientReviews != null && hasClientReviews.hasReview) {
        this.cantShow = hasClientReviews.hasReview;
      }
    }
  }

  onWriteReviewClick(): void {
    if (this.product) {
      if (!this.userService.isAuth) {
        this.navCtrl.push('LoginPage', {continuePage: 'ItemReviewWritePage', params: {product: this.product, page: this}}).catch((err) => {
          console.log(`Couldn't navigate to LoginPage: ${err}`);
        });
      } else {
        this.navCtrl.push('ItemReviewWritePage', {product: this.product, page: this}).catch(err => {
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

  onShowReviewClick(review: any): void {
    this.navCtrl.push('ItemReviewPage', review).catch(err => {
      console.log(`Error navigating to ItemReviewPage: ${err}`);
    });
  }

  hasClientReview(): boolean {
    let present = false;
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].idClient === this.clientId) present = true;
    }
    return present;
  }
}
