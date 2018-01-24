import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
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
  pmtMethods = [];
  dataLoaded = false;

  public partsPmtArray: Array<{value: number, displayValue: string}> = [];
  public credProdArray: Array<{id: number, name: string}> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository, public cart: CartService,
              private cdRef:ChangeDetectorRef, public loadingCtrl: LoadingController) {
    super();
    this.getPmtMethods();
  }

  async initPartsPmt() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    await this.cart.getCreditInfo();
    let hBound = 0;
    if (this.cart.pmtMethod.id === 3)
      hBound = this.cart.maxPartPaymentSizeInfo.partsPmtCnt;
    if (this.cart.pmtMethod.id === 4)
      hBound = this.cart.maxPartPaymentSizeInfo.creditSize;
    this.partsPmtArray = [];
    for (let i = 2; i <= hBound; i++) {
      this.partsPmtArray.push({value: i, displayValue: i.toString()});
    }

    loading.dismiss();
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
    if (!this.cart.pmtMethod)
      return false;

    switch (this.cart.pmtMethod.id) {
      case 5: {
        return (this.isAnyOptionSelected() && this.personInfoValid() && (this.cart.creditProduct.sId));
      }
      case 3: {
        return (this.isAnyOptionSelected() && (this.cart.selectedPartsPmtCount.value));
      }
      case 4: {
        return (this.isAnyOptionSelected() && (this.cart.selectedPartsPmtCount.value));
      }
      default: {
        return this.isAnyOptionSelected();
      }
    }
  }

  onSelectOptionClick(option) {
    if (option.method === this.cart.pmtMethod)
      return;

    for (let i of this.pmtMethods) {
      i.isChecked = (i === option);
      this.cdRef.detectChanges();
      this.cart.pmtMethod = option.method;
      if ( (i === option) && ((option.method.id === 3 ) || (option.method.id === 4 ) || (option.method.id === 5) ) && (option.isChecked) )
        this.initPartsPmt();
      if  ( (i === option) && !((option.method.id === 3 ) || (option.method.id === 4 )) && (option.isChecked) ) {
        this.cart.selectedPartsPmtCount = {value: null, displayValue: null};
      };
      if  ( (i === option) && !(option.method.id === 5) && (option.isChecked) ) {
        this.cart.creditProduct = {sId: null, sName: null};
      };

    };
  }

  onContinueClick() {
    this.navCtrl.push('CheckoutPage');
  }

  onApplyPromoCodeClick() {
    console.log('ApplyPromoCode click.. ');
  }
}
