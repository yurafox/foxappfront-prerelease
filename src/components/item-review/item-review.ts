import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {ProductReview} from '../../app/model/product-review';
import {StoreReview} from "../../app/model/store-review";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";
import {ToastController, NavController} from "ionic-angular";

@Component({
  selector: 'item-review',
  templateUrl: 'item-review.html'
})
export class ItemReviewComponent extends ComponentBase {

  @Input() review: ProductReview | StoreReview;
  @Input() displayTextLength: number;
  @Input() collapsibleMode = false;
  helpfulClicked: boolean;
  answerText: string;
  answered: boolean = false;
  answerClicked: boolean = false;
  isAuth: boolean;

  constructor(private changeDetector: ChangeDetectorRef, private repo: AbstractDataRepository,
              private toastCtrl: ToastController, private navCtrl: NavController) {
    super();
    this.isAuth = this.userService.isAuth;
  }

  ngOnInit() {
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

  async onHelpfulClick() {
    this.review.vote = 1; // 1 -- like
    this.helpfulClicked = true;
    if (this.review && (<any>this.review).idStore) {
      let storeReview = this.review;
      let rev = await this.repo.updateStoreReview(storeReview);
      this.updateCurrentReview(rev);
    } else if (this.review && (<any>this.review).idProduct) {
      let productReview = this.review;
      let rev = await this.repo.updateProductReview(productReview);
      this.updateCurrentReview(rev);
    }
    this.changeDetector.detectChanges();

  }

  async onNotHelpfulClick() {
    this.review.vote = 2; // 2 -- dislike
    this.helpfulClicked = true;
    if (this.review && (<any>this.review).idStore) {
      let storeReview = this.review;
      let rev = await this.repo.updateStoreReview(storeReview);
      this.updateCurrentReview(rev);
    } else if (this.review && (<any>this.review).idProduct) {
      let productReview = this.review;
      let rev = await this.repo.updateProductReview(productReview);
      this.updateCurrentReview(rev);
    }
    this.changeDetector.detectChanges();
  }

  async sendAnswer() {
    this.answered = true;
    if (this.review && (<any>this.review).idStore && this.answerText && this.answerText.length > 0) {
      let storeReview = new StoreReview();
      storeReview.idStore = (<any>this.review).idStore;
      storeReview.reviewDate = new Date(Date.now());
      storeReview.reviewText = this.answerText;
      storeReview.idReview = this.review.id;
      await this.repo.postStoreReview(storeReview).then(() => {
        this.showToast();
      });
    } else if (this.review && (<any>this.review).idProduct && this.answerText && this.answerText.length > 0) {
      let productReview = new ProductReview();
      productReview.idProduct = (<any>this.review).idProduct;
      productReview.reviewDate = new Date(Date.now());
      productReview.reviewText = this.answerText;
      productReview.idReview = this.review.id;
      await this.repo.postProductReview(productReview).then(() => {
        this.showToast();
      });
    }
  }

  private showToast() {
    this.answerText = '';
    this.answered = false;
    this.answerClicked = false;
    let message = this.locale['ToastMessage'];
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  onShowReviewClick(data: any): void {
    this.navCtrl.push('ItemReviewPage', data).catch(err => {
      console.log(`Error navigating to ItemReviewPage: ${err}`);
    });
  }

  private updateCurrentReview(rev: ProductReview) {
    if (this.review) {
      this.review.upvotes = rev.upvotes;
      this.review.downvotes = rev.downvotes;
      this.review.vote = rev.vote;
    }
  }
}
