import {Input, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from './component-base';
import {Product, ProductStorePlace, QuotationProduct} from '../../app/model/index';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';


export class ItemBase extends ComponentBase implements OnInit {

  @Input() product: Product;

  quotes: QuotationProduct[];
  valueQuot: QuotationProduct;
  productStorePlaces: ProductStorePlace[];

  noOfQuotes = 0;
  resolved = false;

  public get Price(): number {
    if (this.valueQuot)
      return this.valueQuot.price;
    else
      return this.product.price;
  }

  public get OnStock(): boolean {
    return !(this.valueQuot == null);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository) {
    super();

  }

  async ngOnInit() {
    super.ngOnInit();

    this.quotes = await this.repo.getQuotationProductsByProductId(this.product.id);
    this.noOfQuotes = this.quotes.filter((i) => {return (i.stockQuant>0);}).length;
    this.valueQuot = await this.repo.getValueQuotByProduct(this.product.id);

    /*

        // Определяем самое дешевое предложение и сохраняем его в св-во valueQuot
        this.quotes.forEach(val => {
          if ((val.price < this.Price) || !(this.valueQuot)) {
              this.valueQuot = val;
          }
        });

    */
    if (this.valueQuot) {
      this.productStorePlaces = await this.repo.getProductStorePlacesByQuotId(this.valueQuot.id);
    }

    this.resolved = true;
  }

}
