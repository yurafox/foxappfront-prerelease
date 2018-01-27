import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {ProductReview} from '../../app/model/product-review';
import {ItemBase} from '../../components/component-extension/item-base';
import {CartService} from '../../app/service/cart-service';
import {CustomPopupComponent} from '../../components/custom-popup/custom-popup';
import {StorePlace} from '../../app/model/store-place';
import {System} from '../../app/core/app-core';
import {CreditCalcPage} from '../credit-calc/credit-calc';
import {AppConstants} from '../../app/app-constants';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage extends ItemBase implements OnInit {

  qty = new System.FoxNumber();
  selectedStorePlace: StorePlace;
  reviews = new Array<ProductReview>();
  minLoanAmt = AppConstants.MIN_LOAN_AMT;
  maxLoanAmt = AppConstants.MAX_LOAN_AMT;



  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository, public cart: CartService,
              private toastCtrl: ToastController, public modalCtrl: ModalController) {
    super(navCtrl, navParams, repo);
    this.product = this.navParams.data;
    this.qty.value = 1;
  }

  async ngOnInit() {
    super.ngOnInit();
    this.reviews = await this.repo.getProductReviewsByProductId(this.product.id);

  }

  onShowProductDescription(): void {
    this.navCtrl.push('ItemDescriptionPage', this.product.description);
  }

  onShowProductProps(): void {
    this.navCtrl.push('ItemPropsPage', this.product);
  }

  onShowReviewClick(data: any): void {
    this.navCtrl.push('ItemReviewPage', data);
  }

  onShowReviewsClick(data: any): void {
    this.navCtrl.push('ItemReviewsPage', data);
  }

  onWriteReview(data: any): void {
    this.navCtrl.push('ItemReviewWritePage', this.product);
  }

  onShowMoreQuotesClick(): void {
    this.navCtrl.push('ItemQuotesPage', this.product);
  }

  onAddToCart() {
    this.cart.addItem(this.valueQuot, this.qty.value, this.product.price, this.selectedStorePlace);
    this.showAddToCartConfirmToast();
  }

  onGetForLoan() {
    let calcModal = this.modalCtrl.create(CreditCalcPage,
      {quotProduct: this.valueQuot,
            storePlace: this.selectedStorePlace,
            qty: this.qty.value,
            price: this.product.price,
            itemPage: this});
    calcModal.present();
  }

  showAddToCartConfirmToast() {
    let toast = this.toastCtrl.create({
      message: 'Item added to cart',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-message'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  showLocationPopover() {
    let modal = this.modalCtrl.create(CustomPopupComponent, {itemPage: this}, {showBackdrop:true, enableBackdropDismiss:true});
    modal.present({});
  }

}
