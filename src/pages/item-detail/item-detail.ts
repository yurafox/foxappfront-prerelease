import {Component, Input, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product} from '../../app/model/product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {ProductReview} from "../../app/model/product-review";

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage extends ComponentBase implements OnInit {

  product: Product;
  qty = 1;
  reviews = new Array<ProductReview>() ;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository) {
    super();
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

}
