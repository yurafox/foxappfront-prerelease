import { Component } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {ComponentBase} from '../component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {assertNotNull} from '@angular/compiler/src/output/output_ast';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'bonus-pay',
  templateUrl: 'bonus-pay.html'
})
export class BonusPayComponent extends ComponentBase {

/*
  _bonusCnt: number;
  public s: string;
  term$ = new Subject<string>();
*/

  constructor(public cart: CartService) {
    super();
  }
/*
    this.term$
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(term => Observable.interval(term.te));   super();


  }
*/

}
