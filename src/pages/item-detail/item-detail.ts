import {Component, Input, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {ProductReview} from "../../app/model/product-review";
import {ItemDescriptionPage} from '../item-description/item-description';
import {ItemPropsPage} from '../item-props/item-props';
import {ItemReviewPage} from '../item-review/item-review';
import {ItemReviewsPage} from '../item-reviews/item-reviews';
import {ItemReviewWritePage} from '../item-review-write/item-review-write';
import {ItemBase} from '../../components/component-extension/item-base';
import {ItemQuotesPage} from '../item-quotes/item-quotes';
import {CartService} from '../../app/service/cart-service';
import {QuotationProduct} from '../../app/model/quotation-product';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage extends ItemBase implements OnInit { //ComponentBase implements OnInit {

  qty = 1;
  reviews = new Array<ProductReview>() ;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository, public cart: CartService) {
    super(navCtrl, navParams, repo);
    this.product = this.navParams.data;
    console.log(this.product.name);
  }

  async ngOnInit() {
    super.ngOnInit();
    this.reviews = await this.repo.getProductReviewsByProductId(this.product.id);
  }

  incQty(): void {
    this.qty++;
  }

  decQty(): void {
    if (this.qty >= 2)
      this.qty--;
  }

  onShowProductDescription(): void {
    this.navCtrl.push(ItemDescriptionPage, this.product.description);
  }

  onShowProductProps(): void {
    this.navCtrl.push(ItemPropsPage, this.product);
  }

  onShowReviewClick(data: any): void {
    this.navCtrl.push(ItemReviewPage, data);
  }

  onShowReviewsClick(data: any): void {
    this.navCtrl.push(ItemReviewsPage, data);
  }

  onWriteReview(data: any): void {
    this.navCtrl.push(ItemReviewWritePage, this.product);
  }

  onShowMoreQuotesClick(): void {
    this.navCtrl.push(ItemQuotesPage, this.product);
  }

  onAddToCart() {
    this.cart.addItem(this.valueQuot, this.qty, this.product.price);
  }
}
