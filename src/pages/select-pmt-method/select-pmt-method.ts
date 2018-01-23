import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {EnumPaymentMethod} from '../../app/model/enum-payment-method';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {CartService} from '../../app/service/cart-service';
import {PersonInfo} from '../../app/model/person';
import {NgForm} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-select-pmt-method',
  templateUrl: 'select-pmt-method.html',
})
export class SelectPmtMethodPage extends ComponentBase {

  @ViewChild('f') personInfoEditForm: NgForm;
  pmtMethods = new Array <{isChecked: boolean, method: EnumPaymentMethod}>();
  dataLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository, public cart: CartService,
              private cdRef:ChangeDetectorRef) {
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

  personInfoValid(): boolean {
    return !((this.personInfoEditForm) && (!this.personInfoEditForm.valid));
  }

  validatePage() : boolean {
    return (this.isAnyOptionSelected() && this.personInfoValid());
  }

  onSelectOptionClick(option) {
    this.pmtMethods.forEach(i => {
        i.isChecked = (i === option);
        this.cdRef.detectChanges();
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
