import {Injectable, Injector, OnDestroy} from '@angular/core';
import {ClientOrder} from '../model/client-order';
import {ClientOrderProducts} from '../model/client-order-products';
import {QuotationProduct} from '../model/quotation-product';
import {StorePlace} from '../model/store-place';
import {UserService} from './bll/user-service';
import {AbstractDataRepository} from './repository/abstract/abstract-data-repository';
import {EventService} from './event-service';
import {EnumPaymentMethod} from '../model/enum-payment-method';
import {App, LoadingController, NavController, ToastController} from 'ionic-angular';
import {PersonInfo} from '../model/person';
import {CreditCalc} from '../model/credit-calc';
import {AppConstants} from '../app-constants';


export class LoDeliveryOption {
  public idClientOrderProduct?: number;
  public itemIdx?: number;
  public loEntityId?: number;
  public deliveryDate?: Date;
  public deliveryCost?: number;
  public loName?: string;
  public isChecked?: boolean;

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

  public bonus: number;
  public payByPromoBonus: boolean;

  public promoCode: string;
  public cartValidationNeeded = false;
  public person = new PersonInfo();

  private navCtrl: NavController;

  constructor(private userService: UserService, public repo: AbstractDataRepository,
              private evServ: EventService, private app: App) {
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

    this.evServ.events['cartUpdateEvent'].subscribe(() => {
        this.calLoan();
      }
    );

    this.initCart();
  };

  calLoan() {
    if ((this.pmtMethod) && (this.pmtMethod.id === 3) && (this.loan)) {
      let cObj = this.loan;

      cObj.clMonthAmt = this.calculateLoan(this.orderTotal, cObj.clMonths,
        cObj.creditProduct.monthCommissionPct, cObj.creditProduct.sGracePeriod);
    }
  }

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

  validateLoan (loanAmt: number): {isValid:boolean, validationErrors:string[]} {
    let errs = [];
    let mes = (loanAmt > AppConstants.MAX_LOAN_AMT) ? "Max loan limit exceeded" : null;
    if (mes)
      errs.push(mes);
    mes = (loanAmt < AppConstants.MIN_LOAN_AMT) ? "The loan amount is below limit" : null;
    if (mes)
      errs.push(mes);
    return {isValid: !(errs.length > 0), validationErrors: errs};
  }

  async initCart() {
    console.log('CartInit call. Is auth: '+ this.userService.isAuth);
    if (this.userService.isAuth) {
      this.order = await this.repo.getClientDraftOrder();

      let op = await this.repo.getCartProducts();
      for (let i of this.orderProducts) {
        await this.repo.saveCartProduct(i);
        op.push(i);
      }

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
        _s += item.price*item.qty
      });
    };
    return _s;
  }

  async addItem(item: QuotationProduct, qty: number, price: number, storePlace: StorePlace, page: any) {
    let foundQuot: ClientOrderProducts = null;
    let foundIndex = 0;
    for (let i of this.orderProducts) {
      if (i.idQuotationProduct === item.id) {
        foundQuot = i;
        break;
      }
      foundIndex ++;
    };

    if (foundQuot) {
      foundQuot.qty += qty;
      foundQuot.price = price;
      this.updateItem(foundIndex);
    } else {
      let orderItem = new ClientOrderProducts();
      orderItem.idQuotationProduct = item.id;
      orderItem.price = price;
      orderItem.qty = qty;
      orderItem.idStorePlace = (storePlace ? storePlace.id : null);

      if (this.userService.isAuth) {
        orderItem = await this.repo.saveCartProduct(orderItem);
      }
      this.orderProducts.push(orderItem);
    };

    this.saveToLocalStorage();
    this.lastItemCreditCalc = null;

    this.evServ.events['cartUpdateEvent'].emit();

    let toast = page.toastCtrl.create({
      message: 'Item added to cart',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-message'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
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
    this.evServ.events['cartUpdateEvent'].emit();
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
