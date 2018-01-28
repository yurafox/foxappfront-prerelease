import {Component, Input, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product} from '../../app/model/product';
import {QuotationProduct} from '../../app/model/quotation-product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {CartService} from '../../app/service/cart-service';

@IonicPage()
@Component({
  selector: 'page-item-quotes',
  templateUrl: 'item-quotes.html',
})

export class ItemQuotesPage extends ComponentBase implements OnInit {

  product: Product;

  quotes: QuotationProduct[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public repo: AbstractDataRepository, public cart: CartService, public toastCtrl: ToastController) {
    super();
    this.product = this.navParams.data;
  }

  async ngOnInit() {
    this.quotes = await this.repo.getQuotationProductsByProductId(this.product.id);
  }

  onAddToCart(quote: QuotationProduct, price: number) {
    this.cart.addItem(quote, 1, price, null, this);
  }

}
