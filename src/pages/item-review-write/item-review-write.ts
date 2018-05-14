import {Component, ChangeDetectorRef} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product,Store,ProductReview,StoreReview} from '../../app/model/index';
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";


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
  submitted: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private changeDetector: ChangeDetectorRef,
              private repo: AbstractDataRepository, private toastCtrl: ToastController) {
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
    if (this.store && this.reviewText && this.reviewText.length > 0) {
      let storeReview = new StoreReview();
      storeReview.idStore = this.store.id;
      storeReview.reviewDate = new Date(Date.now());
      storeReview.reviewText = this.reviewText;
      storeReview.rating = this.rating;
      storeReview.advantages = this.advantages;
      storeReview.disadvantages = this.disadvantages;
      await this.repo.postStoreReview(storeReview).then(() => {
        this.showToast();
      });
    } else if (this.product && this.reviewText && this.reviewText.length > 0) {
      let productReview = new ProductReview();
      productReview.idProduct = this.product.id;
      productReview.reviewDate = new Date(Date.now());
      productReview.reviewText = this.reviewText;
      productReview.rating = this.rating;
      productReview.advantages = this.advantages;
      productReview.disadvantages = this.disadvantages;
      await this.repo.postProductReview(productReview).then(() => {
        this.showToast();
      });
    }
  }

  private showToast() {
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
        if (this.navParams.data.page) {
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
  }

}
