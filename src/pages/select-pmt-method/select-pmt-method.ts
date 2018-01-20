import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {EnumPaymentMethod} from '../../app/model/enum-payment-method';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {CartService} from '../../app/service/cart-service';


@IonicPage()
@Component({
  selector: 'page-select-pmt-method',
  templateUrl: 'select-pmt-method.html',
})

export class SelectPmtMethodPage extends ComponentBase {

  //pmtMethods = new Array<EnumPaymentMethod>();
  pmtMethods = new Array <{isChecked: boolean, method: EnumPaymentMethod}>();
  dataLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository, public cart: CartService) {
    super();
    this.getPmtMethods();
  }

  async getPmtMethods () {
    let pmt = await this.repo.getPmtMethods();
    pmt.forEach(i => {
        this.pmtMethods.push({isChecked: false, method: i});
      }
    );
    this.dataLoaded = true;
  }

  isAnyOptionSelected(): boolean {
    let res = false;
    for (let item of this.pmtMethods) {
        if (item.isChecked){
          res = true;
          break;
        }
    }
    return res;
  }

  onSelectOptionClick(option) {
    this.pmtMethods.forEach(i => {
        i.isChecked = (i === option);
        this.cart.pmtMethod = option.method;
      }
    );
  }

  onContinueClick() {
    this.navCtrl.push('CheckoutPage');
  }

  onApplyPromoCodeClick() {
    console.log('ApplyPromoCode click.. ');
  }
}
