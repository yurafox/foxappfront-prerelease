import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ProductReview} from '../../app/model/product-review';
import {Product} from '../../app/model/product';
import {AbstractReviewRepository} from '../../app/service/repository/abstract/abstract-review-repository';
import {StoreReview} from "../../app/model/store-review";
import {Store} from '../../app/model/store';

@IonicPage()
@Component({
  selector: 'page-item-reviews',
  templateUrl: 'item-reviews.html',
})
export class ItemReviewsPage extends ComponentBase implements OnInit {

  reviews: ProductReview[] | StoreReview[];
  reviewsToShow: ProductReview[] | StoreReview[];
  reviewsObj: {reviews: ProductReview[] | StoreReview[], idClient: number};
  product: Product;
  store: Store;
  item: Product | Store;
  clientId: number = 0;
  cantShow: boolean;
  dataLoaded: boolean;
  slicingIndx = 20;
  infiniteScroll: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public reviewRepo: AbstractReviewRepository,
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
        this.reviewsToShow = this.navParams.data.page.reviews.slice(0,this.slicingIndx);
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
      this.reviewsToShow = this.navParams.data.reviews.slice(0,this.slicingIndx);
    }
    if (this.navParams.data.cantShow) {
      this.cantShow = this.navParams.data.cantShow;
    }

    if (!this.reviews && (this.navParams.data.product || this.navParams.data.store)) {
      if (this.navParams.data.product) {
        this.reviewsObj = await this.reviewRepo.getProductReviewsByProductId(this.product.id);
      } else if (this.navParams.data.store) {
        this.reviewsObj = await this.reviewRepo.getStoreReviewsByStoreId(this.store.id);
      }
    }
    if (this.reviewsObj) {
      this.reviews = this.reviewsObj.reviews;
      this.reviewsToShow = this.reviewsObj.reviews.slice(0,this.slicingIndx);
      this.clientId = this.reviewsObj.idClient;
    }

    this.cantShow = this.hasClientReview();

    this.dataLoaded = true;
    await loading.dismiss();
  }

  async ionViewDidEnter() {
    if (this.product) {
      let hasClientReviews = await this.reviewRepo.getHasClientProductReview(this.product.id);
      if (hasClientReviews && hasClientReviews != null && hasClientReviews.hasReview) {
        this.cantShow = hasClientReviews.hasReview;
      }
    }
    if (this.store) {
      let hasClientReviews = await this.reviewRepo.getHasClientStoreReview(this.store.id);
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

  onScroll(infiniteScroll) {
    if (this.scroll() === false) {
      infiniteScroll.enable(false);
      if (this.infiniteScroll && this.infiniteScroll !== null) this.infiniteScroll = null;
      return;
    }
    this.infiniteScroll = infiniteScroll;

    let difference = this.reviews.slice(this.reviewsToShow.length, this.reviewsToShow.length + this.slicingIndx);
    for (let i = this.reviewsToShow.length, j = 0; i < this.reviewsToShow.length + difference.length, j < difference.length; i++ , j++) {
      this.reviewsToShow[i] = difference[j];
    }

    if (this.infiniteScroll && this.infiniteScroll !== null) this.infiniteScroll.complete();
  }

  scroll():boolean {
    return (this.reviews.length !== this.reviewsToShow.length);
  }
}
