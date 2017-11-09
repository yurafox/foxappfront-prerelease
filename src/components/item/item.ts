import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../app/model/product';
import {ComponentBase} from '../component-extension/component-base';

@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent extends ComponentBase implements OnInit {

  @Input() product: Product;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
