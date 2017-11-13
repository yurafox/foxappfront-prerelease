import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../app/model/product';
import {ComponentBase} from '../component-extension/component-base';
import {NavController, NavParams} from "ionic-angular";
import {ItemDetailPage} from "../../pages/item-detail/item-detail";


@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent extends ComponentBase implements OnInit {

  @Input() product: Product;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  openItemDetails(data: Product): void {
    this.navCtrl.push(ItemDetailPage, this.product);
    //console.log(data.name);
  }

}
