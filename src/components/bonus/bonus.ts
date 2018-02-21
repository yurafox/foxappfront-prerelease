import {Component, Input} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';

@Component({
  selector: 'bonus',
  templateUrl: 'bonus.html'
})
export class BonusComponent extends ComponentBase {

  @Input()
  public bonusCnt: number = 0;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
