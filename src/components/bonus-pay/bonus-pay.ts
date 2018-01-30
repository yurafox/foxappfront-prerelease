import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {CartService} from '../../app/service/cart-service';


@Component({
  selector: 'bonus-pay',
  templateUrl: 'bonus-pay.html'
})
export class BonusPayComponent extends ComponentBase {

  _bonusCnt: string;
  term$ = new Subject<string>();

  constructor(public cart: CartService) {
    super();

    this.term$.debounceTime(800)
      .distinctUntilChanged()
      .subscribe(term => this.bonusCnt = term);

  }

  public set bonusCnt (val: string) {
    this._bonusCnt = val;
    console.log(val);
  }

}
