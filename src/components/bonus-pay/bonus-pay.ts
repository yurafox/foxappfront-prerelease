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

  bonusInputStream$ = new Subject<string>();

  constructor(public cart: CartService) {
    super();

    this.bonusInputStream$.debounceTime(1500)
      .distinctUntilChanged()
      .subscribe(inputValue =>
        {
          const _intval: number = parseFloat(inputValue);
          this.cart.bonus = isNaN(_intval)? null : _intval;
          this.evServ.events['cartUpdateEvent'].emit();
        }
      );

  }

  ngOnInit() {
    super.ngOnInit();
  }

}
