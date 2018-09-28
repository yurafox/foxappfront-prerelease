import {Injectable} from '@angular/core';
import {AlertController, App, LoadingController} from 'ionic-angular';
import {ClientOrder} from '../model/client-order';
import {ClientOrderProducts} from '../model/client-order-products';
import {QuotationProduct} from '../model/quotation-product';
import {StorePlace} from '../model/store-place';
import {UserService} from './bll/user-service';
import {EventService} from './event-service';
import {PersonInfo} from '../model/person';
import {CreditCalc} from '../model/credit-calc';
import {AbstractLocalizationRepository} from './repository/abstract/abstract-localization-repository';
import {IDictionary, SCN} from '../core/app-core';
import {ComplectItem} from '../../components/complect/complect';
import {ItemDetailPage} from '../../pages/item-detail/item-detail';
import {Shipment} from '../model/shipment';
import {LoDeliveryType} from '../model/lo-delivery-type';
import {LoEntityOffice} from '../model/lo-entity-office';
import {AppConstants} from '../app-constants';
import {AbstractStorePlaceRepository} from "./repository/abstract/abstract-store-place-repository";
import {AbstractGeoRepository} from "./repository/abstract/abstract-geo-repository";
import {AbstractCartRepository} from "./repository/abstract/abstract-cart-repository";
import {AbstractClientRepository} from "./repository/abstract/abstract-client-repository";
import {AbstractDataRepository} from "./repository/abstract/abstract-data-repository";

export class LoShipmentDeliveryOption {
  public shipment?: Shipment;
  public itemIdx?: number;
  public loEntityId?: number;
  public deliveryDate?: Date;
  public deliveryCost?: number;
  public loName?: string;
  public isChecked?: boolean;
  public pickupLocationName?: string;
  public deliveryType?: LoDeliveryType;
  public loEntityOfficeId?: number;
  public loEntityOfficesList?: LoEntityOffice[];

  constructor(){};
}


@Injectable()
export class CartService {

  public lastItemCreditCalc: ClientOrderProducts = null;
  public cKey = 'cartItems';
  //public _inCartInit = false;
  public _httpCallInProgress = false;
  public order: ClientOrder = null;
  public orderProducts: Array<ClientOrderProducts> = [];

  displayOrderProducts: Array<{orderProduct: ClientOrderProducts, prevComplect: string}> = [];

  public loShipments: Array<Shipment>=[];

  public loShipmentDeliveryOptions: Array<LoShipmentDeliveryOption>=[];

  min_loan_amt = 0;
  max_loan_amt = 0;

  public _loan: CreditCalc = null;

  public bonus: number = null;
  public _payByPromoBonus = false;

  public _promoCode: string;
  public promocodeInvalid = false;

  //Текущие доступные бонусы клиента
  public availBonus: number;
  public availPromoBonus: number;

  public cartValidationNeeded = false;
  public person = new PersonInfo();

  public localization: IDictionary<string> = {};

  constructor(public userService: UserService, public storePlaceRepo: AbstractStorePlaceRepository,
              public geoRepo: AbstractGeoRepository, public cartRepo: AbstractCartRepository,
              public dataRepo: AbstractDataRepository, public clientRepo: AbstractClientRepository,
              public evServ: EventService, public app: App, public locRepo: AbstractLocalizationRepository,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController) {


    this.evServ.events['logonEvent'].subscribe(() => {
        this.initCart().then (() => {
            //this.initBonusData();
        }
        ).catch(console.error);
      }
    );

    this.evServ.events['logOffEvent'].subscribe(() => {
      this.orderProducts = [];
      this.initCart().catch(console.error);
      }
    );

    this.evServ.events['cartUpdateEvent'].subscribe(() => {
        this.calculateCart().then(() =>
          this.updateDisplayOrderProducts()
        ).catch(console.error);

      }
    );

    locRepo.setLocalization().then(()=> this.initCart());
    storePlaceRepo.loadStorePlaceCache().catch(console.error);
    geoRepo.loadCityCache().catch(console.error);

    /*
    repo.loadPmtMethodsCache();
    repo.loadRegionsCache();
    repo.loadStorePlaceCache();
    repo.loadSuppliersCache();
    repo.loadCityCache();
    repo.loadMeasureUnitCache();
    repo.getCountries(); //<--- this loads countries cache
    repo.getManufacturers(true); //<--- this loads manufacturers cache


    this.currStoreService.initCurrencyRate();
    */
  }

  get checkIsPickupOnly(): boolean {
    if (!this.orderProducts) return false;
    const pickupProdsCnt = this.orderProducts.filter(x => x.idStorePlace !== null).length;
    return ((pickupProdsCnt === this.orderProducts.length) &&  (this.orderProducts.length>0));
  }

  public set loan(value: CreditCalc) {
    this._loan = value;
    if (this.order) {
      if (value) this.order.idPaymentMethod = 3;
      this.order.idCreditProduct = value ? value.creditProduct.sId : null;
      this.order.creditPeriod = value ? value.clMonths : null;
      this.order.creditMonthlyPmt = value ? value.clMonthAmt : null;
    }
  }

  public get loan(): CreditCalc {
    return this._loan;
  }

  getCartOrderProductById(id: number): ClientOrderProducts {
    const idx =  this.orderProducts.findIndex(x => x.id  === id);
    return (idx != -1 ) ? this.orderProducts[idx] : null;
  }

  updateDisplayOrderProducts() {
    let tmpArr = this.orderProducts
            .sort((a,b) => (a.id - b.id))
            .map(x => {return {orderProduct: x, prevComplect: null};});

    let prevCompl: string = null;
    tmpArr.forEach(z => {
        z.prevComplect = prevCompl;
        prevCompl = z.orderProduct.complect;
      }
    );

    this.displayOrderProducts = tmpArr;
  }

  public async calculateCart(){
    if (!this.userService.isAuth)
      return;

    try {
      this._httpCallInProgress = true;
      let calcRes = await this.cartRepo.calculateCart(
        this.promoCode, this.bonus, this.payByPromoBonus,
        ((this.loan) && (this.loan.creditProduct) && (this.order.idPaymentMethod === 3)) ? this.loan.creditProduct.sId : null /*,
                    this.orderProducts*/);

      for (let i of calcRes) {
        let _found = false;
        let _prod: ClientOrderProducts = null;

        for (let _p of this.orderProducts) {
          if (_p.id === i.clOrderSpecProdId) {
            _prod = _p;
            _found = true;
            break;
          }
        }
        if (_found) {
          _prod.payPromoCode = i.promoCode;
          _prod.payBonusCnt = i.bonusDisc;
          _prod.payPromoCodeDiscount = i.promoCodeDisc;
          _prod.payPromoBonusCnt = i.promoBonusDisc;
          _prod.earnedBonusCnt = i.earnedBonus;
          _prod.qty = i.qty;
        }

      }
      this.orderProducts = this.orderProducts.splice(0, this.orderProducts.length);
      this.calcLoan().catch(console.error);
    }
    finally {
      this._httpCallInProgress = false;
    }
  }


  public get promoCode(): string {
    return this._promoCode;
  }

  public set promoCode (val: string)  {
    this._promoCode = val;
    if (!val)
      this.evServ.events['cartUpdateEvent'].emit();
  }

  public get payByPromoBonus(): boolean {
    return this._payByPromoBonus;
  }

  public set payByPromoBonus(val: boolean) {
    this._payByPromoBonus = val;
    this.evServ.events['cartUpdateEvent'].emit();
  }

  async calcLoan() {
    if ((this.order.idPaymentMethod === 3) && (this.loan)) {
      let cObj = this.loan;

      cObj.clMonthAmt = this.calculateLoan(this.cartGrandTotal, cObj.clMonths,
        cObj.creditProduct.monthCommissionPct, cObj.creditProduct.sGracePeriod);
      this.loan = cObj;
      await this.saveOrder(false);
    }
  }

  public get itemsBonusDisc(): number {
    let _res = 0;
    this.orderProducts.forEach(i => {
      _res += i.payBonusCnt*i.qty;
    });
    if (this.order)
      this.order.bonusTotal = _res;
    return _res;
  }

  public async saveOrder(showLoading: boolean) {
    const content = this.localization['LoadingContent'];
    const loading = this.loadingCtrl.create({
      content: content,
      duration:60000
    });

    if (showLoading)
      await loading.present();

    try {
      this._httpCallInProgress = true;
      const before_scn = SCN.value;
      let order = await this.cartRepo.saveClientDraftOrder(this.order);
      const after_scn = SCN.value;
      if ((order) && (before_scn != after_scn)) // check if order has not been submitted from another device
        this.order = order;
      else {
        this.gotoCartPageIfDataChanged().catch(console.error);
        return;
      }

    }
    finally {
      this._httpCallInProgress = false;
      if (showLoading)
        await loading.dismiss();
    }


  }

  public get promoCodeDiscount(): number {
    let _res = 0;
    this.orderProducts.forEach(i => {
      _res += i.payPromoCodeDiscount*i.qty;
    });
    if (this.order)
      this.order.promoCodeDiscTotal = _res;
    return _res;
  }

  public get itemsPromoBonusDisc(): number {
    let _res = 0;
    this.orderProducts.forEach(i => {
      _res += i.payPromoBonusCnt*i.qty;
    });
    if (this.order)
      this.order.promoBonusTotal = _res;
    return _res;
  }

  public get shippingCost(): number {
    let res = 0;
    this.loShipments.forEach(i => {
        res += i.loDeliveryCost;
      }
    );
    if (this.order)
      this.order.shippingTotal = res;
    return res;
  }

  public get itemsTotal(): number {
    let _s = 0;
    if (this.orderProducts) {
      this.orderProducts.forEach(item => {
        _s += item.price*item.qty
      });
    }
    if (this.order)
      this.order.itemsTotal = _s;
    return _s;
  }

  public get cartGrandTotal(): number {
    return +(this.orderTotal - this.promoCodeDiscount
              - this.itemsBonusDisc - this.itemsPromoBonusDisc).toFixed(2);
  }

  public async initBonusData() {
    let bonusData = await this.userService.bonusInfo;
    if (bonusData) {
      this.availBonus = (bonusData.bonusLimit) ? bonusData.bonusLimit : 0;
      this.availPromoBonus = (bonusData.actionBonusLimit) ? bonusData.actionBonusLimit : 0;
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

  get loanValid(): boolean {
    return this.validateLoan(this.cartGrandTotal).isValid;
  }

  validateLoan (loanAmt: number): {isValid:boolean, validationErrors:string[]} {
    let maxLoan = this.localization['MaxLoan'] ? this.localization['MaxLoan'] : 'Максимальный лимит кредита перевышен';
    let minLoan = this.localization['MinLoan'] ? this.localization['MinLoan'] : 'Сумма кредита ниже лимита';
    let errs = [];

    let mes = (loanAmt > this.max_loan_amt) ? maxLoan : null;
    if (mes)
      errs.push(mes);
    mes = (loanAmt < this.min_loan_amt) ? minLoan : null;
    if (mes)
      errs.push(mes);
    return {isValid: !(errs.length > 0), validationErrors: errs};
  }

  public getLocalStorageItems(): ClientOrderProducts[] {
    const stor = JSON.parse(localStorage.getItem(this.cKey));
    const ar = [];
    if (stor) {
      stor.forEach((val) => {
        let spec = new ClientOrderProducts();
        spec.idQuotationProduct = val.idQuotationProduct;
        spec.price = val.price;
        spec.qty = val.qty;
        spec.idStorePlace = val.idStorePlace;
        spec.complect = val.complect;
        spec.idAction = val.idAction;
        spec.actionTitle = val.actionTitle;
        ar.push(spec);
      });
    }
    return ar;
  }

  async initCart() {
    try {
      this.lastItemCreditCalc = null;
      this.loan = null;
      this.bonus  = null;
      this._payByPromoBonus = false;
      this._promoCode = null;
      this.promocodeInvalid = false;
      this.availBonus = null;
      this.availPromoBonus = null;
      this.cartValidationNeeded = false;

      this.min_loan_amt = parseInt(await this.dataRepo.getAppParam('MIN_LOAN_AMT'));
      this.max_loan_amt = parseInt(await this.dataRepo.getAppParam('MAX_LOAN_AMT'));


      if (this.userService.isAuth)
      {
        this.order = await this.cartRepo.getClientDraftOrder();
        if (this.order && this.order.idPerson) {
          this.person = await this.clientRepo.getPersonById(this.order.idPerson);
        }

        await this.initBonusData();

        // Add local storage items
        let lsAr = this.getLocalStorageItems();
        for (let i of lsAr) {
          await this.cartRepo.insertCartProduct(i);
          //let itm = await this.cartRepo.insertCartProduct(i);
          //op.push(itm);
        }

        let op = await this.cartRepo.getCartProducts();

        //переключаем корзину на результирующую
        this.orderProducts = op;
        this.updateDisplayOrderProducts();

        // после переноса содержимого локальной корзины в бекенд - затираем локальную корзину
        localStorage.setItem(this.cKey, null);
      }
      else
      {
        this.order = null;
        this.orderProducts = this.getLocalStorageItems();
        this.updateDisplayOrderProducts();
      }
      await this.localeCartService();
    }
    finally {
      //this._inCartInit = false;
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

  async addComplect(item: ComplectItem, qty: number, page: any, showLoading: boolean) {
    const content = this.localization['LoadingContent'];
    const loading = this.loadingCtrl.create({
      content: content
    });

    if (showLoading)
      await loading.present();

    try {

      const vrnt = item.variants[item.selIndex];

      let firstItem = new ClientOrderProducts();
      firstItem.idQuotationProduct = vrnt.mainProductQP;
      if (item.actionType === 4) {
        firstItem.price = vrnt.mainProductActionPrice;
      } else if (item.actionType === 5) {
        firstItem.price = vrnt.mainProductRegularPrice - vrnt.secondProductRegularPrice; //  ActionPrice;
      }

      firstItem.qty = qty;
      firstItem.idAction = vrnt.idAction;
      firstItem.complect = vrnt.complect;
      firstItem.actionTitle = vrnt.title;

      let secondItem = new ClientOrderProducts();
      secondItem.idQuotationProduct = vrnt.secondProductQP;
      if (item.actionType === 4) {
        secondItem.price = vrnt.secondProductActionPrice
      } else if (item.actionType === 5) {
        secondItem.price = vrnt.secondProductRegularPrice
      }
      secondItem.qty = qty;
      secondItem.idAction = vrnt.idAction;
      secondItem.complect = vrnt.complect;
      secondItem.actionTitle = vrnt.title;

      if (this.userService.isAuth) {

        const before_scn = SCN.value;
        firstItem = await this.cartRepo.insertCartProduct(firstItem);
        const after_scn = SCN.value;

        if (before_scn === after_scn) {
          this.gotoCartPageIfDataChanged().catch(console.error);
          return;
        }


        const before_scn1 = SCN.value;
        secondItem = await this.cartRepo.insertCartProduct(secondItem);
        const after_scn1 = SCN.value;

        if (before_scn1 === after_scn1) {
          this.gotoCartPageIfDataChanged().catch(console.error);
          return;
        }

        this.showAddedItemToast(page);
        this.orderProducts = [];
        await this.initCart();
      }
      else
      {
        this.orderProducts.push(firstItem);
        this.orderProducts.push(secondItem);
        this.showAddedItemToast(page);
      }
      this.saveToLocalStorage();

    }
    finally {
      if (showLoading)
        await loading.dismiss();
    }
  }

  showAddedItemToast(page: any) {
    this.evServ.events['cartUpdateEvent'].emit();

    const message = this.localization['AddedToCart'] ? this.localization['AddedToCart'] : 'Товар добавлен в корзину';
    let toast = (<ItemDetailPage>page).toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-message'
    });
    toast.present().catch(console.error);
  }

  async addItem(item: QuotationProduct, qty: number, price: number, storePlace: StorePlace, page: any, showLoading: boolean) {
    const content = this.localization['LoadingContent'];
    const loading = this.loadingCtrl.create({
      content: content,
      duration: 60000
    });

    if (showLoading)
     await loading.present();

    try {
      if (item && qty && price) {
        const sp = (storePlace) ? storePlace.id : null;
        const _f = this.orderProducts.filter(i => {return ((i.idQuotationProduct === item.id) && (!i.complect)
          && (i.idStorePlace === sp));});
        let foundQuot: ClientOrderProducts = (_f) ? _f[0] : null;
        if (foundQuot)
        {
          foundQuot.qty += qty;
          foundQuot.price = price;

          await this.updateItem(foundQuot, false);

        }
        else
        {
          let orderItem = new ClientOrderProducts();
          orderItem.idQuotationProduct = item.id;
          orderItem.price = price;
          orderItem.qty = qty;
          orderItem.idStorePlace = (storePlace ? storePlace.id : null);

          if (this.userService.isAuth) {

            const before_scn = SCN.value;
            orderItem = await this.cartRepo.insertCartProduct(orderItem);
            const after_scn = SCN.value;

            if (before_scn === after_scn) {
              this.gotoCartPageIfDataChanged().catch(console.error);
              return;
            }

          }
          this.orderProducts.push(orderItem);
        }
        this.saveToLocalStorage();
        this.lastItemCreditCalc = null;
        this.showAddedItemToast(page);
      }
    }
    finally {
      if (showLoading)
        await loading.dismiss();
    }
  }


  saveToLocalStorage() {
    if (!this.userService.isAuth) {

      let saveArr = [];
      this.orderProducts.forEach(i => {
          saveArr.push(i.dto);
        }
      );
      localStorage.setItem(this.cKey, JSON.stringify(saveArr));
    }
  }

  async gotoCartPageIfDataChanged() {
    let alert = this.alertCtrl.create({
      title: this.localization['Information'] ? this.localization['Information'] : 'Информация',
      message: this.localization['Message'] ? this.localization['Message'] : 'Товар был удален либо заказ отправлен с другого устройства',
      buttons: [
        {
          text: this.localization['BtnText'] ? this.localization['BtnText'] : 'Перейти в корзину',
          role: 'cancel',
          handler: () => {
            //this.emptyCart();
            this.initCart().then(() => {
                this.app.getActiveNav().setRoot('CartPage').then(() => {
                    return true;
                  }
                );
              }
            );
          }
        }
      ]
    });
    alert.present().catch(console.error);
  }


  async updateItem(item: ClientOrderProducts, showLoading: boolean) {
    const content = this.localization['LoadingContent'];
    const loading = this.loadingCtrl.create({
      content: content
    });

    if (showLoading)
      await loading.present();

    try {
      if (item.complect) {
        let cmplArr = this.orderProducts.filter(x => (x.complect === item.complect) && (x.id !== item.id));

        for (let i of cmplArr) {
          i.qty = item.qty;
          i = await this.cartRepo.saveCartProduct(i);
        }
      }

      if (this.userService.isAuth) {
        const before_scn = SCN.value;
        item = await this.cartRepo.saveCartProduct(item);
        const after_scn = SCN.value;
          if ((!item) || (before_scn === after_scn)) {
            this.gotoCartPageIfDataChanged().catch(console.error);
            return;
          }
      }
      else
        this.saveToLocalStorage();
    }
    finally {
      if (showLoading)
        await loading.dismiss();
    }
  }

  async removeItem(itemIndex: number, showLoading: boolean) {
    const content = this.localization['LoadingContent'];
    const loading = this.loadingCtrl.create({
      content: content
    });

    if (showLoading)
      await loading.present();
    try {
      const cmpl: string = this.orderProducts[itemIndex].complect;

      if (this.userService.isAuth) {
        const before_scn = SCN.value;
        await this.cartRepo.deleteCartProduct(this.orderProducts[itemIndex]);
        const after_scn = SCN.value;
        if ((before_scn === after_scn)) {
          this.gotoCartPageIfDataChanged().catch(console.error);
          return;
        }

      }
      this.orderProducts.splice(itemIndex, 1);
      if (cmpl) {
        let fnd = this.orderProducts.findIndex(x => x.complect === cmpl);
        if (fnd !== -1)
          this.orderProducts.splice(fnd, 1);
      }

      this.saveToLocalStorage();
      this.lastItemCreditCalc = null;
      this.evServ.events['cartUpdateEvent'].emit();
    }
    finally {
      if (showLoading)
        await loading.dismiss();
    }

  }

  public get cartErrors(): Array<{idQuotProduct: number, errorMessage: string}> {
    let arr = [];
    for (let i of this.orderProducts) {
      if (i.errorMessage) {
        arr.push({idQuotProduct: i.idQuotationProduct, errorMessage: i.errorMessage});
      }
    }
    return (arr.length === 0) ? null : arr;
  }

  // making localization for cart service
  public async localeCartService() {
    const lng = localStorage.getItem('lang');
    let loc = await this.locRepo.getLocalization(
      {
              componentName: (<any> this).constructor.name,
              lang: lng ? +lng : AppConstants.LOCALE_DEFAULT_VALUE
            }
    );
    if (loc && (Object.keys(loc).length !== 0)) {
      this.localization = loc;
    }
  }
}
