import {Component, Input, OnInit} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {Product} from '../../app/model/product';

@Component({
  selector: 'item-props',
  templateUrl: 'item-props.html'
})
export class ItemPropsComponent extends ComponentBase implements OnInit {

  @Input()
  product: Product;

  // Сколько свойств отображать в гриде. Если значение -1 - то все
  @Input()
  displayPropCount: number;

  showPeriod = false;

  constructor() {
    super();

    }

    ngOnInit () {
      this.showPeriod = (!(this.displayPropCount == -1) && (this.product.Props.length > this.displayPropCount));
    }
}
