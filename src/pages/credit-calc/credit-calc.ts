import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {CartService} from '../../app/service/cart-service';
import {QuotationProduct} from '../../app/model/quotation-product';
import {UserService} from '../../app/service/bll/user-service';
import {CreditProduct} from '../../app/model/credit-product';
import {CreditCalc} from '../../app/model/credit-calc';

@IonicPage()
@Component({
  selector: 'page-credit-calc',
  templateUrl: 'credit-calc.html',
})
export class CreditCalcPage {

  creditsLoaded: boolean;
  quotProduct: QuotationProduct = null;
  lastQp: number = null;
  credits: Array<CreditCalc> = [];
  private _cProd: {isChecked: boolean, creditProduct: CreditProduct} = null;
  public dArray: Array<{value: number, displayValue: string}> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public cart: CartService,
              public userService: UserService, public loadingCtrl: LoadingController) {

    this.quotProduct = this.navParams.data.quotProduct;
    this.initCreditCalcData();
  }

  async initCreditCalcData() {
    let _qp =
      (this.quotProduct ? this.quotProduct.id : this.cart.mostExpensiveItem.idQuotationProduct);

    if (this.lastQp === _qp)
      return;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    try {
      this.creditsLoaded = false;
      let qp: QuotationProduct = (this.quotProduct ? this.quotProduct : await this.cart.repo.getQuotationProductById(_qp));
      const quot = await (<any>qp).quotation_p;
      const suppl = await (<any>quot).supplier_p;
      let pInfo = await this.cart.repo.getProductCreditSize(qp.idProduct, suppl.id);

      if (!pInfo)
        pInfo = {partsPmtCnt: 0, creditSize: 0};

      const arr: CreditProduct[] = await this.cart.repo.getCreditProducts();
      this.credits = [];
      let _cpOplataChastyami = new CreditProduct();
      _cpOplataChastyami.sId = -2;
      _cpOplataChastyami.sName = "Приват банк \"Оплата частями\"";
      _cpOplataChastyami.firstPay = 0;
      _cpOplataChastyami.maxTerm = pInfo.partsPmtCnt;
      _cpOplataChastyami.monthCommissionPct = 0;
      _cpOplataChastyami.maxAmt = null;
      _cpOplataChastyami.minTerm = 2;
      this.credits.push(new CreditCalc(false, _cpOplataChastyami));

      let _cpMgnovCredit = new CreditProduct();
      _cpMgnovCredit.sId = -1;
      _cpMgnovCredit.sName = "Приват банк \"Мгновенная рассрочка\"";
      _cpMgnovCredit.firstPay = 0;
      _cpMgnovCredit.maxTerm = pInfo.creditSize;
      _cpMgnovCredit.monthCommissionPct = 2.9;
      _cpMgnovCredit.maxAmt = null;
      _cpMgnovCredit.minTerm = 2;
      this.credits.push(new CreditCalc(false, _cpMgnovCredit));

      //Сортируем по макс грейсу
      arr.sort((a,b) => {
        return (b.sGracePeriod - a.sGracePeriod);
      });

      arr.forEach(i => {
        if ((i.kpcPct < pInfo.creditSize)
          && (i.sPartPay === 0) && (i.sDefProdId))
          this.credits.push(new CreditCalc(false, i));
      });
      this.lastQp = _qp;
    }
    finally {
      this.creditsLoaded = true;
      loading.dismiss();
    }
  }

  initCombo() {
    this.dArray = [];
    for (let i = 2; i <= this._cProd.creditProduct.maxTerm; i++) {
      this.dArray.push({value: i, displayValue: i.toString()});
    };
  }

  public get loanAmount(): number {
    if (this.quotProduct)
      return this.quotProduct.price
    else
      return this.cart.orderTotal;
  }

  public get selectedLoan(): CreditCalc {
    let res: any = null;
    for (let i of this.credits) {
      if (i.isChecked) {
        res = i;
        break;
      };
    };
    return res;
  }

  onContinueClick() {
    this.cart.loan = this.selectedLoan;
    this.viewCtrl.dismiss();
  }

  onSelectItem(cProd) {
    this.credits.forEach(i => {
        i.isChecked = (cProd == i);
      }
    );
    this._cProd = cProd;
    this.initCombo();
  }

  isAnyItemSelected(): boolean {
    let res = false;
    for (let i of this.credits) {
      if (i.isChecked) {
        res = true;
        break;
      }
    };
    return res;
  }

  validatePage(): boolean {
    return this.isAnyItemSelected();
  }
}
