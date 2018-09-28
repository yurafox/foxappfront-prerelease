import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product} from '../../app/model/product';
import {QuotationProduct} from '../../app/model/quotation-product';
import {AbstractQuotationProductRepository} from '../../app/service/repository/abstract/abstract-quotation-product-repository';
import {CartService} from '../../app/service/cart-service';

@IonicPage()
@Component({
  selector: 'page-item-quotes',
  templateUrl: 'item-quotes.html',
})

export class ItemQuotesPage extends ComponentBase {

  product: Product;

  quotes: QuotationProduct[];

  constructor(public navParams: NavParams,
              public quotProductRepo: AbstractQuotationProductRepository,
              public cart: CartService) {
    super();
    this.product = this.navParams.data.prod;
    this.quotes = this.navParams.data.quotesArr;
  }

  async ngOnInit() {
    super.ngOnInit();
    this.quotes = (await this.quotProductRepo.getQuotationProductsByProductId(this.product.id))
                    .filter((i) => {return (i.stockQuant>0);});
  }

  async onAddToCart(quote: QuotationProduct, price: number) {
    await this.cart.addItem(quote, 1, price, null, this, true);
  }

}
