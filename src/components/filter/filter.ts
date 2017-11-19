import {Component, Input} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {Product} from '../../app/model/product';
import {PopoverController} from 'ionic-angular';
import {FilterPopoverPage} from '../../pages/filter-popover/filter-popover';

@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class FilterComponent extends  ComponentBase {

  @Input()
  filteredProducts = new Array<Product>();

  constructor(public popoverCtrl: PopoverController) {
    super();
  }

  showFilter(event) {
    let filter = this.popoverCtrl.create(FilterPopoverPage);
    filter.present({
      ev: event
    });
  }

}
