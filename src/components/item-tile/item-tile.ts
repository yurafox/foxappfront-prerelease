import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ItemBase} from '../component-extension/item-base';
import {NavController, NavParams} from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {Product} from '../../app/model/product';

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
              public repo: AbstractDataRepository) {
    super(navCtrl, navParams, repo);
  }

  openItemDetails(data: Product): void {
    this.navCtrl.push('ItemDetailPage', {prod: this.product, loadQuotes: true, hideProductCompare: this.hideProductCompare});
  }

  closeButtonClick(data: Product): void {
    this.closeButtonEvent.emit(data);
  }

}
