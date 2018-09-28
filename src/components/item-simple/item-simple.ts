import {Component, Input} from '@angular/core';
import {ItemBase} from "../component-extension/item-base";
import {NavController, NavParams} from "ionic-angular";
import {Product} from "../../app/model/product";
import {AbstractQuotationProductRepository} from "../../app/service/repository/abstract/abstract-quotation-product-repository";
import {AbstractStorePlaceRepository} from "../../app/service/repository/abstract/abstract-store-place-repository";

@Component({
  selector: 'item-simple',
  templateUrl: 'item-simple.html'
})
export class ItemSimpleComponent extends ItemBase {

  /**
   * Set the simplicity of the item to display:
   * 3 - image, manufacturer, name, rating, price, bonuses(if available)
   * 2 - image, manufacturer, name, price
   * 1 - image, manufacturer, name
   * 0 - image, name
   */
  @Input() public simplicity: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public quotProductRepo: AbstractQuotationProductRepository,
              public storePlaceRepo: AbstractStorePlaceRepository) {
    super(navCtrl, navParams, quotProductRepo, storePlaceRepo);
  }

  async ngOnInit() {
    super.ngOnInit().catch(console.error);
  }

  openItemDetails(data: Product): void {
    this.navCtrl.push('ItemDetailPage', this.product).catch(console.error);
  }

}
