import {Component, Input} from '@angular/core';
import {Product} from '../../app/model/product';
import {ComponentBase} from '../component-extension/component-base';

@Component({
  selector: 'items-list',
  templateUrl: 'items-list.html'
})

export class ItemsListComponent extends ComponentBase {

  @Input() products: Product[];

  constructor() {
    super();
  }

}
