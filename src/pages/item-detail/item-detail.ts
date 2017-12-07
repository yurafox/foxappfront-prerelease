import {Component, Input, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {ProductReview} from "../../app/model/product-review";
import {ItemBase} from '../../components/component-extension/item-base';
import {CartService} from '../../app/service/cart-service';
import {QuotationProduct} from '../../app/model/quotation-product';
import {CustomPopupComponent} from '../../components/custom-popup/custom-popup';
import {ProductStorePlace} from '../../app/model/product-store-place';
import {StorePlace} from '../../app/model/store-place';
import {System} from '../../app/core/app-core';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage extends ItemBase implements OnInit { //ComponentBase implements OnInit {

  qty = new System.FoxNumber();
  selectedStorePlace: StorePlace;
  reviews = new Array<ProductReview>();



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

  incQty(): void {
    this.qty.value++;
  }

  decQty(): void {
    if (this.qty.value >= 2)
      this.qty.value--;
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
    //console.log(this.valueQuot);

    this.cart.addItem(this.valueQuot, this.qty.value, this.product.price, this.selectedStorePlace);
    this.showAddToCartConfirmToast();
  }

  showAddToCartConfirmToast() {
    let toast = this.toastCtrl.create({
      message: 'Item added to cart',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-message'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }

  showLocationPopover() {
    let modal = this.modalCtrl.create(CustomPopupComponent, {itemPage: this}, {showBackdrop:true, enableBackdropDismiss:true});
    //(<any>modal).locations = this.productStorePlaces;
    modal.present({});
  }

}
