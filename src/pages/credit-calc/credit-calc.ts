import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavParams, ViewController} from 'ionic-angular';
import {CartService} from '../../app/service/cart-service';
import {QuotationProduct} from '../../app/model/quotation-product';
import {UserService} from '../../app/service/bll/user-service';
import {CreditProduct} from '../../app/model/credit-product';
import {CreditCalc} from '../../app/model/credit-calc';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractCreditRepository} from '../../app/service/repository/abstract/abstract-credit-repository';
import {AbstractQuotationProductRepository} from "../../app/service/repository/abstract/abstract-quotation-product-repository";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";

@IonicPage()
@Component({
  selector: 'page-credit-calc',
  templateUrl: 'credit-calc.html',
})
export class CreditCalcPage extends ComponentBase {

  creditsLoaded: boolean;
  quotProduct: QuotationProduct = null;
  lastQp: number = null;
  credits: Array<CreditCalc> = [];
  _cProd: {isChecked: boolean, creditProduct: CreditProduct} = null;
  public dArray: Array<{value: number, displayValue: string}> = [];


  constructor(public navParams: NavParams, public viewCtrl: ViewController, public cart: CartService,
              public userService: UserService, public loadingCtrl: LoadingController,
              public creditRepo: AbstractCreditRepository, public quotProductRepo: AbstractQuotationProductRepository,
              public dataRepo: AbstractDataRepository) {
    super();
    this.initLocalization();
    this.quotProduct = this.navParams.data.quotProduct;
  }

  async ngOnInit() {
    this.initCreditCalcData().catch(console.error);
  }

  async initCreditCalcData() {
    let _qp =
      (this.quotProduct ? this.quotProduct.id : this.cart.mostExpensiveItem.idQuotationProduct);

    if (this.lastQp === _qp)
      return;

    let content = this.locale['LoadingContent'];
    let loading = this.loadingCtrl.create({
      content:  content
    });
    loading.present().catch(console.error);
    try {
      this.creditsLoaded = false;
      let qp: QuotationProduct = (this.quotProduct ? this.quotProduct : await this.quotProductRepo.getQuotationProductById(_qp));
      const quot = await (<any>qp).quotation_p;
      const suppl = await (<any>quot).supplier_p;
      let pInfo = await this.creditRepo.getProductCreditSize(qp.idProduct, suppl.id);

      if (!pInfo)
        pInfo = {partsPmtCnt: 0, creditSize: 0};

      const arr: CreditProduct[] = await this.creditRepo.getCreditProducts();
      this.credits = [];
      let _cpOplataChastyami = new CreditProduct();
      _cpOplataChastyami.sId = -2;
      _cpOplataChastyami.sName = await this.locale['PrivatInstallments'];
      _cpOplataChastyami.firstPay = 0;
      _cpOplataChastyami.maxTerm = (pInfo.partsPmtCnt) ? pInfo.partsPmtCnt : parseInt(await this.dataRepo.getAppParam('MIN_LOAN_TERM'));
      _cpOplataChastyami.monthCommissionPct = 0;
      _cpOplataChastyami.maxAmt = null;
      _cpOplataChastyami.minAmt = parseInt(await this.dataRepo.getAppParam('MIN_LOAN_AMT'));
      _cpOplataChastyami.minTerm = 2;
      this.credits.push(new CreditCalc(false, _cpOplataChastyami));

      let _cpMgnovCredit = new CreditProduct();
      _cpMgnovCredit.sId = -1;
      _cpMgnovCredit.sName = await this.locale['PrivatInstant'];
      _cpMgnovCredit.firstPay = 0;
      _cpMgnovCredit.maxTerm = pInfo.creditSize;
      _cpMgnovCredit.monthCommissionPct = parseInt(await this.dataRepo.getAppParam('PRIVAT_MGNOV_CREDIT_PCT*10'))/10;
      _cpMgnovCredit.maxAmt = null;
      _cpOplataChastyami.minAmt = parseInt(await this.dataRepo.getAppParam('MIN_LOAN_AMT'));
      _cpMgnovCredit.minTerm = 2;
      if (_cpMgnovCredit.maxTerm>0)
        this.credits.push(new CreditCalc(false, _cpMgnovCredit));

      //Сортируем по макс грейсу
      arr.sort((a,b) => {
        return (b.sGracePeriod - a.sGracePeriod);
      });

      arr.forEach(i => {
        if ((i.kpcPct < pInfo.creditSize)
          && (i.sPartPay === 0) && (i.sDefProdId)) {
            if (i.minTerm)
            this.credits.push(new CreditCalc(false, i));
        }
      });
      this.lastQp = _qp;
    }
    finally {
      this.creditsLoaded = true;
      loading.dismiss().catch(console.error);
    }
  }

  initCombo() {
    this.dArray = [];
    for (let i = 2; i <= this._cProd.creditProduct.maxTerm; i++) {
      this.dArray.push({value: i, displayValue: i.toString()});
    }
  }

  public get loanAmount(): number {
    if (this.quotProduct)
      return this.quotProduct.price;
    else
      return this.cart.cartGrandTotal;
  }

  public get selectedLoan(): CreditCalc {
    let res: any = null;
    for (let i of this.credits) {
      if (i.isChecked) {
        res = i;
        break;
      }
    }
    return res;
  }

  async onContinueClick() {
    let data = null;

    if (this.userService.isAuth) {
      this.cart.loan = this.selectedLoan;
      await this.cart.saveOrder(true);
    }

    if(this.navParams.data.itemPage) {
/*
      if (this.cart.pmtMethod)
        this.cart.pmtMethod.id = 3;
      else {
        let _p = new EnumPaymentMethod(3, null);
        this.cart.pmtMethod = _p;
      }
*/

      this.navParams.data.itemPage.onAddToCart().catch(console.error);

      if (!this.userService.isAuth) {
        data = {nextPage: 'LoginPage', params: {continuePage: 'SelectShipAddressPage'}};
      }
      else {
        data = {nextPage: 'SelectShipAddressPage', params: {fromCart: 1}};
      }
    }
    this.viewCtrl.dismiss(data).catch(console.error);

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
    }
    return res;
  }

  validatePage(): boolean {
    return  ((this.isAnyItemSelected()) && (this.selectedLoan) && (this.selectedLoan.clMonths>0));
  }
}
