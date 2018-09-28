import {Component, OnInit} from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product} from '../../app/model/product';

@IonicPage()
@Component({
  selector: 'page-item-props',
  templateUrl: 'item-props.html',
})
export class ItemPropsPage extends ComponentBase implements OnInit {

  product: Product;

  constructor(public navParams: NavParams) {
    super();
    this.product = this.navParams.data;
  }

  async ngOnInit() {
    super.ngOnInit();
  }
}
