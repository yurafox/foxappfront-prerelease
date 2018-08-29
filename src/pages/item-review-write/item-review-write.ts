import {Component, ChangeDetectorRef} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";
import {Product} from '../../app/model/product';
import {Store} from '../../app/model/store';
import {StoreReview} from '../../app/model/store-review';
import {ProductReview} from '../../app/model/product-review';


@IonicPage()
@Component({
  selector: 'page-item-review-write',
  templateUrl: 'item-review-write.html',
})

export class ItemReviewWritePage extends ComponentBase {
  product: Product;
  store: Store;
  rating: number;
  reviewText: string;
  advantages: string;
  disadvantages: string;
  submitted: boolean;
  grid: HTMLElement;
  keyboardHeight = 400;

  constructor(public navCtrl: NavController, public navParams: NavParams, public changeDetector: ChangeDetectorRef,
              public repo: AbstractDataRepository, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    super();
    this.initLocalization();
    this.rating = 0;
    this.submitted = false;
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
    if (this.product) {
      let hasClientReviews = await this.repo.getHasClientProductReview(this.product.id);
      this.showAlertAndPop(hasClientReviews);
    } else if (this.store) {
      let hasClientReviews = await this.repo.getHasClientStoreReview(this.store.id);
      this.showAlertAndPop(hasClientReviews);
    }
  }

  showAlertAndPop(hasClientReviews) {
    if (hasClientReviews && hasClientReviews != null && hasClientReviews.hasReview && hasClientReviews.hasReview === true) {
      let message = this.locale['AlertMessage'] ? this.locale['AlertMessage'] : 'Вы уже оставляли отзыв';
      let alert = this.alertCtrl.create({
        message: message,
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      alert.present().then(()=>this.navCtrl.pop()).catch((err)=>console.error(err));
    }
  }

  /**
   * function to adjust the height of the message textarea
   * @param {any} event - the event, which is provided by the textarea input
   * @return {void}
   */
  protected adjustTextarea(event: any): void {
    let textarea: any		= event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height 	= 'auto';
    textarea.style.height 	= textarea.scrollHeight + 'px';
    return;
  }

  async onSubmitClick() {
    this.submitted = true;
    let { reviewText, advantages, disadvantages } = this.checkForEmptyStrings();
    if (this.store && this.reviewText && this.reviewText.trim().length > 0) {
      let storeReview = new StoreReview();
      storeReview.idStore = this.store.id;
      storeReview.reviewDate = new Date(Date.now());
      storeReview.reviewText = reviewText;
      storeReview.rating = this.rating;
      storeReview.advantages = advantages;
      storeReview.disadvantages = disadvantages;
      await this.repo.postStoreReview(storeReview).then(() => {
        this.showToast();
      });
    } else if (this.product && this.reviewText && this.reviewText.trim().length > 0) {
      let productReview = new ProductReview();
      productReview.idProduct = this.product.id;
      productReview.reviewDate = new Date(Date.now());
      productReview.reviewText = reviewText;
      productReview.rating = this.rating;
      productReview.advantages = advantages;
      productReview.disadvantages = disadvantages;
      await this.repo.postProductReview(productReview).then(() => {
        this.showToast();
      });
    }
  }

  checkForEmptyStrings() {
    let reviewText = (this.reviewText && this.reviewText.length) > 0 ? this.reviewText.trim() : this.reviewText;
    let advantages = (this.advantages && this.advantages.length) > 0 ? this.advantages.trim() : this.advantages;
    let disadvantages = (this.disadvantages && this.disadvantages.length) > 0 ? this.disadvantages.trim() : this.disadvantages;
    return { reviewText, advantages, disadvantages };
  }

  showToast() {
    this.reviewText = '';
    this.advantages = '';
    this.disadvantages = '';
    this.submitted = false;
    let message = this.locale['ToastMessage'];
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present().then(() => {
      this.navCtrl.pop().then(() => {
        if (this.navParams.data.page && this.navParams.data.page.cantShow) {
          this.navParams.data.page.cantShow = true;
        }
      })
    });
  }

  ionViewDidLoad() {
    if (document.readyState === 'complete') {
      if (document.getElementById('rating') && document.getElementById('rating')!==null) {
        document.getElementById('rating').addEventListener('click', () => {
          this.changeDetector.detectChanges();
        });
      }
    }
    
    this.grid = document.getElementById("grid");
  }

  addPaddingBottom() {
    let height = window.innerHeight/2;
    console.log(height);
    if (this.grid) this.grid.style.paddingBottom = `${height}px`;
  }

  removePaddingBottom() {
    if (this.grid) this.grid.style.paddingBottom = `0px`;
  }

}
