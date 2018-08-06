import { Component } from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';

@Component({
  selector: 'section-loading',
  templateUrl: 'section-loading.html'
})
export class SectionLoadingComponent extends ComponentBase {

  constructor() {
    super();
  }

}
