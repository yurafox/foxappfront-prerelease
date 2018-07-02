import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {Keyboard} from '@ionic-native/keyboard';


@Component({
  selector: 'bonus-pay',
  templateUrl: 'bonus-pay.html'
})
export class BonusPayComponent extends ComponentBase {

  bonusInputStream$ = new Subject<string>();

  constructor(public cart: CartService, private keyBoard: Keyboard) {
    super();

    this.bonusInputStream$.debounceTime(500)
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

  keyUpHandle(keyCode) {
    if (this.cart.bonus && this.cart.bonus !== null && this.cart.bonus > 0 && (keyCode === 9 || keyCode === 13)) {
      this.keyBoard.close();
    }
  }
}
