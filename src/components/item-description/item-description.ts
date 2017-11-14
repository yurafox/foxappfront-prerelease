import {Component, Input} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';


@Component({
  selector: 'item-description',
  templateUrl: 'item-description.html'
})
export class ItemDescriptionComponent extends ComponentBase {

  @Input() description: string;
  @Input() displayTextLength: number;

  constructor() {
    super();
  }


}
