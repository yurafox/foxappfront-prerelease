import {Input, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from './component-base';
import {AppConstants} from '../../app/app-constants';
import {Product} from '../../app/model/product';
import {QuotationProduct} from '../../app/model/quotation-product';
import {ProductStorePlace} from '../../app/model/product-store-place';
import {AbstractQuotationProductRepository} from "../../app/service/repository/abstract/abstract-quotation-product-repository";
import {AbstractStorePlaceRepository} from "../../app/service/repository/abstract/abstract-store-place-repository";


export class ItemBase extends ComponentBase implements OnInit {

  @Input() product: Product;
  @Input() preloadQuotes: boolean = false;

  quotes: QuotationProduct[];
  valueQuot: QuotationProduct;
  productStorePlaces: ProductStorePlace[];
  mPlaceFeaturesEnabled = AppConstants.ENABLE_MARKETPLACE_FEATURES;
  _noOfQuotes = 0;
  resolved = false;

  public get Price(): number {
    if (this.valueQuot)
      return this.valueQuot.price;
    else
      return this.product.price;
  }

  public get OnStock(): boolean {
    if (this.preloadQuotes)
      return !(this.valueQuot == null);
    else
      return !(this.product.valueQP == null);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public quotProductRepo: AbstractQuotationProductRepository,
              public storePlaceRepo: AbstractStorePlaceRepository) {
    super();

  }

  public get noOfQuotes(): number {
    if ((this.preloadQuotes) && this.quotes) {
      return this.quotes.filter((i) => {return (i.stockQuant>0);}).length;
    } else {
      return this.product.supplOffers;
    }
  }

  async ngOnInit() {
    super.ngOnInit();
    if (this.preloadQuotes) {
      if (this.product && this.product.id) {
        this.quotes = await this.quotProductRepo.getQuotationProductsByProductId(this.product.id);
        this._noOfQuotes = this.quotes.filter(i => {
          return (i.stockQuant > 0);
        }).length;

        this.valueQuot = this.quotes.find(i => {return i.id === this.product.valueQP});
      }
    }
    if (this.valueQuot) {
      this.productStorePlaces = await this.storePlaceRepo.getProductStorePlacesByQuotId(this.valueQuot.id);
    }

    this.resolved = true;
  }

}
