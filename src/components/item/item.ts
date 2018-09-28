import {Component} from '@angular/core';
import {Product} from '../../app/model/product';
import {NavController, NavParams} from "ionic-angular";
import {AbstractQuotationProductRepository} from "../../app/service/repository/abstract/abstract-quotation-product-repository";
import {AbstractStorePlaceRepository} from "../../app/service/repository/abstract/abstract-store-place-repository";
import {ItemBase} from '../component-extension/item-base';


@Component({
  selector: 'item',
  templateUrl: 'item.html'
})

export class ItemComponent extends ItemBase {


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public quotProductRepo: AbstractQuotationProductRepository,
              public storePlaceRepo: AbstractStorePlaceRepository) {
    super(navCtrl, navParams, quotProductRepo, storePlaceRepo);
  }

  async ngOnInit() {
    super.ngOnInit().catch(console.error);
  }

  openItemDetails(data: Product): void {
    this.navCtrl.push('ItemDetailPage', {prod: this.product, loadQuotes: true}).catch(console.error);
  }

}
