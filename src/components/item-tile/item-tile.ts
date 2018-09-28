import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ItemBase} from '../component-extension/item-base';
import {NavController, NavParams} from 'ionic-angular';
import {Product} from '../../app/model/product';
import {AbstractQuotationProductRepository} from "../../app/service/repository/abstract/abstract-quotation-product-repository";
import {AbstractStorePlaceRepository} from "../../app/service/repository/abstract/abstract-store-place-repository";

@Component({
  selector: 'item-tile',
  templateUrl: 'item-tile.html'
})
export class ItemTileComponent extends ItemBase {
  @Input()
  displayPrice: boolean = true;
  @Input()
  displayRating: boolean = true;
  @Input()
  displayCloseButton: boolean = false;
  @Input()
  hideProductCompare: boolean = false;
  @Output("closeProductClick")
  closeButtonEvent = new EventEmitter<Product>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public quotProductRepo: AbstractQuotationProductRepository,
              public storePlaceRepo: AbstractStorePlaceRepository) {
    super(navCtrl, navParams, quotProductRepo, storePlaceRepo);
  }

  openItemDetails(data: Product): void {
    this.navCtrl.push('ItemDetailPage',
      {prod: this.product, loadQuotes: true, hideProductCompare: this.hideProductCompare}).catch(console.error);
  }

  closeButtonClick(data: Product): void {
    this.closeButtonEvent.emit(data);
  }

}
