import {ComponentBase} from './component-base';
import {Product} from '../../app/model/product';
import {Input, OnInit} from '@angular/core';
import {QuotationProduct} from '../../app/model/quotation-product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {NavController, NavParams} from 'ionic-angular';

export class ItemBase extends ComponentBase implements OnInit {

  @Input() product: Product;
  private _minPrice = -1;

  quotes: QuotationProduct[];
  valueQuot: QuotationProduct;

  noOfQuotes = 0;
  resolved = false;

  public get Price(): number {
    if (this.valueQuot)
      return this.valueQuot.price
    else
      return this.product.price;
  }

  public get OnStock(): boolean {
    return !(this.valueQuot == null);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public repo: AbstractDataRepository) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.quotes = await this.repo.getQuotationProductsByProductId(this.product.id);
    this.noOfQuotes = this.quotes.length;

    // Определяем самое дешевое предложение и сохраняем его в св-во valueQuot
    this.quotes.forEach(val => {
      if ((val.price < this.Price) || !(this.valueQuot))
          this.valueQuot = val;
    });
    this.resolved = true;
  }

}
