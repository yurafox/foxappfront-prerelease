import {Injectable, Injector, OnDestroy} from '@angular/core';
import {ClientOrder} from '../model/client-order';
import {ClientOrderProducts} from '../model/client-order-products';
import {QuotationProduct} from '../model/quotation-product';
import {StorePlace} from '../model/store-place';
import {UserService} from './bll/user-service';
import {AbstractDataRepository} from './repository/abstract/abstract-data-repository';
import {EventService} from './event-service';
import {EnumPaymentMethod} from '../model/enum-payment-method';
import {App, LoadingController, NavController} from 'ionic-angular';
import {PersonInfo} from '../model/person';
import {CreditProduct} from '../model/credit-product';
import {CreditCalc} from '../model/credit-calc';


export class LoDeliveryOption {
  public idClientOrderProduct?: number;
  public itemIdx?: number;
  public loEntityId?: number;
  public deliveryDate?: Date;
  public deliveryCost?: number;
  public loName?: string;
  public isChecked?: boolean

  constructor(){};
}

@Injectable()
export class CartService  {

  public lastItemCreditCalc: ClientOrderProducts = null;
  private cKey = 'cartItems';
  public order: ClientOrder = null;
  public orderProducts: Array<ClientOrderProducts> = [];
  public loDeliveryOptions: Array<LoDeliveryOption>=[];
  public loResultDeliveryOptions: Array<LoDeliveryOption>=[];
  public pmtMethod: EnumPaymentMethod = null;

  public loan: CreditCalc = null;

  public promoCode: string;
  public cartValidationNeeded = false;
  public person = new PersonInfo();

  private navCtrl: NavController;

  constructor(private userService: UserService, public repo: AbstractDataRepository,
              private evServ: EventService, private app: App, public loadingCtrl: LoadingController) {
    this.navCtrl = app.getActiveNav();

    this.evServ.events['logonEvent'].subscribe(() => {
        console.log('logonEvent');
        this.initCart().then (() => {
            if ((this.cartValidationNeeded) && (this.cartErrors)) {
              const startIndex = this.navCtrl.getActive().index - 1;
              this.navCtrl.remove(startIndex, 2);
            };
            this.cartValidationNeeded = false;
          }
        );
      }
    );

    this.evServ.events['logOffEvent'].subscribe(() => {
      console.log('logoffEvent');
      this.orderProducts = [];
      this.initCart();
      }
    );

    this.initCart();
  };

  public get mostExpensiveItem(): ClientOrderProducts {
    if (this.orderProducts.length === 0)
      return null;
    let item: ClientOrderProducts = this.orderProducts[0];
    this.orderProducts.forEach(i => {
        if (i.price > item.price)
          item = i;
      }
    );
    return item;
  }

  calculateLoan(amount: number, months: number, monthsCommissPct: number, grace: number): number {
    let _gr = (grace) ? grace : 0;
    let _am = (amount) ? amount : 0;
    let _com = (monthsCommissPct) ? monthsCommissPct : 0;
    return Math.ceil((_am + (_am * _com / 100 * (months - _gr))) / months);
  }

/*
  public async getCreditInfo() {
    this.selectedPartsPmtCount = {value: null, displayValue: null};
    this.selectedImmLoanCount = {value: null, displayValue: null};
    this.selectedLoanCount = {value: null, displayValue: null};

    const exItem = this.mostExpensiveItem;
    if (!(exItem) /!*&& !(is4 || is3 || is5)*!/)
      return;

    if (this.lastItemCreditCalc === exItem)
      return;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    try {
      this.creditsLoaded = false;
      const qp = await (<any>exItem).quotationproduct_p;
      const quot = await (<any>qp).quotation_p;
      const suppl = await (<any>quot).supplier_p;
      let pInfo = await this.repo.getProductCreditSize(qp.idProduct, suppl.id);
      if (!pInfo)
        pInfo = {partsPmtCnt: 0, creditSize: 0};
      this.maxPartPaymentSizeInfo =  pInfo;

      const arr: CreditProduct[] = await this.repo.getCreditProducts();
      this.credits = [];
      arr.forEach(i => {
        if ((i.kpcPct < pInfo.creditSize)
              && (i.sPartPay === 0) && (i.sDefProdId))
          this.credits.push({isChecked: false, creditProduct: i});
      });
      this.lastItemCreditCalc = exItem;
    }
    finally {
      this.creditsLoaded = true;
      loading.dismiss();
    }
  }
*/

  async initCart() {
    console.log('CartInit call. Is auth: '+ this.userService.isAuth);
    if (this.userService.isAuth) {
      this.order = await this.repo.getClientDraftOrder();

      let op = await this.repo.getCartProducts();
      for (let i of this.orderProducts) {
        await this.repo.saveCartProduct(i);
        op.push(i);
      };

      //переключаем корзину на результирующую
      this.orderProducts = op;

      // после переноса содержимого локальной корзины в бекенд - затираем локальную корзину
      localStorage.setItem(this.cKey, null);
    }
    else {
      this.order = null;
      const stor = JSON.parse(localStorage.getItem(this.cKey));
      if (stor) {
        stor.forEach((val) => {
          let spec = new ClientOrderProducts();
          spec.idQuotationProduct = val.idQuotationProduct;
          spec.price = val.price;
          spec.qty = val.qty;
          spec.idStorePlace = val.storePlace;
          this.orderProducts.push(spec);
        });
      };
    }
  }

  public get cartItemsCount(): number {
      let _q = 0;
      if (this.orderProducts)
        this.orderProducts.forEach(item => {
          _q += item.qty;
        });
      return _q;
  }

  public get orderTotal(): number {
    return this.itemsTotal + this.shippingCost;
  }

  public get shippingCost(): number {
    let res = 0;
    this.loResultDeliveryOptions.forEach(i => {
        res += i.deliveryCost;
      }
    );
    return res;
  }

  public get itemsTotal(): number {
    let _s = 0;
    if (this.orderProducts) {
      this.orderProducts.forEach(item => {
        _s += item.price*item.qty;
      });
    };
    return _s;
  }

  async addItem(item: QuotationProduct, qty: number, price: number, storePlace: StorePlace) {
    let orderItem = new ClientOrderProducts();
    orderItem.idQuotationProduct = item.id;
    orderItem.price = price;
    orderItem.qty = qty;
    orderItem.idStorePlace = (storePlace ? storePlace.id : null);

    if (this.userService.isAuth) {
      orderItem = await this.repo.saveCartProduct(orderItem);
    }

    this.orderProducts.push(orderItem);
    this.saveToLocalStorage();
    this.lastItemCreditCalc = null;
  }

  saveToLocalStorage() {
    if (!this.userService.isAuth) {

      let saveArr = new Array<any>();
      this.orderProducts.forEach(i => {
          saveArr.push(i.dto);
        }
      );
      localStorage.setItem(this.cKey, JSON.stringify(saveArr));
    }
  }

  async updateItem(itemIndex: number) {
    //TODO implement update method

  }

  async removeItem(itemIndex: number) {
    if (this.userService.isAuth)
      this.repo.deleteCartProduct(this.orderProducts[itemIndex]);
    this.orderProducts.splice(itemIndex, 1);
    this.saveToLocalStorage();
    this.lastItemCreditCalc = null;
  }

  emptyCart() {
    //TODO implement emptyCart method
    console.log('Empty cart');
  }

  public get cartErrors(): Array<{idQuotProduct: number, errorMessage: string}> {
    let arr = new Array<any>();
    for (let i of this.orderProducts) {
      if (i.errorMessage) {
        arr.push({idQuotProduct: i.idQuotationProduct, errorMessage: i.errorMessage});
      }
    };
    return (arr.length === 0) ? null : arr;
  }

}
