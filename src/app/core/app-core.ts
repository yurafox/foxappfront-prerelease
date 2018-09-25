import { AbstractControl } from '@angular/forms';
import { Injector } from '@angular/core';
import { RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';
import { Manufacturer } from "../model/manufacturer";
import { City } from '../model/city';
import { StorePlace } from '../model/store-place';
import { Lang } from '../model/lang';
import { MeasureUnit } from '../model/measure-unit';
import { Quotation } from '../model/quotation';
import { LoEntity } from '../model/lo-entity';
import { Country } from '../model/country';
import { EnumPaymentMethod } from '../model/enum-payment-method';
import { Region } from '../model/region';
import { Store } from "../model/store";
import { AppConstants } from '../app-constants';
import { AppParam } from '../model/app-param';
import { LoDeliveryType } from '../model/lo-delivery-type';
import { LoEntityOffice } from '../model/lo-entity-office';
import { Product } from '../model/product';
import { Supplier } from '../model/supplier';
import { Currency } from '../model/currency';
import { Action } from "../model/action";
import { Novelty } from "../model/novelty";

export class EmailValidator {

  static isValid(text: string): boolean {

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
  }

}

export interface IDictionary<T> {
  [k: string]: T;
}

// friendly interface for developers in lazy load options
interface ILazyOption {
  constructor: any;
  navName?: string;
}

export interface IDTO {
  dto: any;
}

export class CustomValidators {
  public static compare(matchControlName: string) {
    return (control: AbstractControl): { [k: string]: any } => {
      const data = control.value;
      let dataPrimary = control.root.get(matchControlName);
      dataPrimary = (!dataPrimary) ? '' : dataPrimary.value;
      return (data !== dataPrimary) ? { 'compare': data } : null;
    };
  }
}

export class RefInjector {
  static injector: Injector;

  public static push(value: Injector) {
    RefInjector.injector = value;
  }

  public static pull(injector: any): any {
    return RefInjector.injector.get(injector);
  }


}

export namespace Providers {
  export interface IKeyedCollection<T> {
    Add(key: string, value: T);

    ContainsKey(key: string): boolean;

    Count(): number;

    Item(key: string): T;

    Keys(): string[];

    Remove(key: string): T;

    Values(): any[];

    MaxSize(): number;

    HasNotValidCachedValue(key: string): boolean;

    HasNotValidCachedRange(): boolean;
  }

  export class CacheItems<T> implements IKeyedCollection<T> {
    items: { [index: string]: T } = {};
    count: number = 0;

    public constructor(public maxSize: number = 0) {
    }

    public ContainsKey(key: string): boolean {
      return this.items.hasOwnProperty(key);
    }

    public Count(): number {
      return this.count;
    }

    public Add(key: string, value: T) {
      if (key && value) {
        if (!this.items.hasOwnProperty(key))
          this.count++;

        this.items[key] = value;
      }
    }

    public Remove(key: string): T {
      let val = this.items[key];
      delete this.items[key];
      this.count--;
      return val;
    }

    public Item(key: string): T {
      return this.items[key];
    }

    public Keys(): string[] {
      let keySet: string[] = [];

      for (let prop in this.items) {
        if (this.items.hasOwnProperty(prop)) {
          keySet.push(prop);
        }
      }

      return keySet;
    }

    public Values(): any[] {
      let values: any[] = [];

      for (let prop in this.items) {
        if (this.items.hasOwnProperty(prop) && this.items[prop]) {
          values.push((<any>this.items[prop]).item);
        }
      }

      return values;
    }

    public MaxSize(): number {
      return this.maxSize;
    }

    public HasNotValidCachedValue(key: string): boolean {
      let entity: T = this.Item(key);
      if (!entity) return true;

      let currentExpire = (<any>entity).expire;
      if (!currentExpire) return true;

      return currentExpire < Date.now();
    }

    public HasNotValidCachedRange(): boolean {
      if (this.Count() === 0)
        return true;

      const firstValue: any = this.items[Object.keys(this.items)[0]];
      return firstValue.expire < Date.now();
    }
  }

  // data model for CacheProvider collection
  export interface CacheDataContainer<T> {
    item: T;
    expire: number;
  }

  export class CacheProvider {
    _cacheProduct: IKeyedCollection<CacheDataContainer<Product>> = null;
    _cacheSupplier: IKeyedCollection<CacheDataContainer<Supplier>> = null;
    _cacheCurrency: IKeyedCollection<CacheDataContainer<Currency>> = null;
    _cacheLang: IKeyedCollection<CacheDataContainer<Lang>> = null;
    _cacheManufacturer: IKeyedCollection<CacheDataContainer<Manufacturer>> = null;
    _cacheCity: IKeyedCollection<CacheDataContainer<City>> = null;
    _cacheCityWithStore: IKeyedCollection<CacheDataContainer<City>> = null;
    _cacheStorePlace: IKeyedCollection<CacheDataContainer<StorePlace>> = null;
    _cacheStore: IKeyedCollection<CacheDataContainer<{ id: number, stores: Store[] }>> = null;
    _cacheMeasureUnit: IKeyedCollection<CacheDataContainer<MeasureUnit>> = null;
    _cacheNovelty: IKeyedCollection<CacheDataContainer<Novelty>> = null;
    _cacheAction: IKeyedCollection<CacheDataContainer<Action>> = null;

    _cacheQuotation: IKeyedCollection<CacheDataContainer<Quotation>> = null;
    _cacheLoEntity: IKeyedCollection<CacheDataContainer<LoEntity>> = null;
    _cacheCountry: IKeyedCollection<CacheDataContainer<Country>> = null;
    _cacheEnumPaymentMethod: IKeyedCollection<CacheDataContainer<EnumPaymentMethod>> = null;
    _cacheRegion: IKeyedCollection<CacheDataContainer<Region>> = null;
    _cacheAppParams: IKeyedCollection<CacheDataContainer<AppParam>> = null;
    _cacheDeliveryType: IKeyedCollection<CacheDataContainer<LoDeliveryType>> = null;
    _cacheLoEntityOffice: IKeyedCollection<CacheDataContainer<LoEntityOffice>> = null;

    _cachePageOptions: IKeyedCollection<CacheDataContainer<any>> = null;

    static initSettingsIfDataWillBeAbsent() {
      return {
        "product": { "maxsize": 500, "expire": 1800000 },
        "supplier": { "maxsize": 10, "expire": 172800000 }, 
        "currency": { "maxsize": 10, "expire": 172800000 }, 
        "lang": { "maxsize": 10, "expire": 172800000 }, 
        "manufacturer": { "maxsize": 50, "expire": 600000 }, 
        "city": { "maxsize": 300, "expire": 10000000000 },  
        "storeplace": { "maxsize": 500, "expire": 10000000000 }, 
        "store": { "maxsize": 300, "expire": 10000000000 },
        "novelty": { "maxsize": 10, "expire": 600000 },
        "action": { "maxsize": 10, "expire": 600000 },
        "measureunit": { "maxsize": 50, "expire": 10000000000 }, 
        "quotation": { "maxsize": 50, "expire": 1000000 }, 
        "loentity": { "maxsize": 10, "expire": 100000000 }, 
        "country": { "maxsize": 10, "expire": 510000000 }, 
        "enumpaymentmethod": { "maxsize": 10, "expire": 1728000000 }, 
        "region": { "maxsize": 29, "expire": 500000000 }, 
        "appparam": { "maxsize": 15, "expire": 1000000 }, 
        "lodeliverytype": { "maxsize": 10, "expire": 120000000 }, 
        "loentityoffice": { "maxsize": 50, "expire": 120000000 },
        "pageoptions": { "maxsize": 10, "expire": 600000 }
      };
    }

    public static Settings: any = CacheProvider.initSettingsIfDataWillBeAbsent();

    public get Products(): IKeyedCollection<CacheDataContainer<Product>> {
      if (this._cacheProduct == null)
        this._cacheProduct = new CacheItems<CacheDataContainer<Product>>();

      return this._cacheProduct;
    }

    public get Suppliers(): IKeyedCollection<CacheDataContainer<Supplier>> {
      if (this._cacheSupplier == null)
        this._cacheSupplier = new CacheItems<CacheDataContainer<Supplier>>();

      return this._cacheSupplier;
    }

    public get Currency(): IKeyedCollection<CacheDataContainer<Currency>> {
      if (this._cacheCurrency == null)
        this._cacheCurrency = new CacheItems<CacheDataContainer<Currency>>();

      return this._cacheCurrency;
    }

    public get Lang(): IKeyedCollection<CacheDataContainer<Lang>> {
      if (this._cacheLang == null)
        this._cacheLang = new CacheItems<CacheDataContainer<Lang>>();

      return this._cacheLang;
    }

    public get Manufacturer(): IKeyedCollection<CacheDataContainer<Manufacturer>> {
      if (this._cacheManufacturer == null)
        this._cacheManufacturer = new CacheItems<CacheDataContainer<Manufacturer>>();

      return this._cacheManufacturer;
    }

    public get City(): IKeyedCollection<CacheDataContainer<City>> {
      if (this._cacheCity == null)
        this._cacheCity = new CacheItems<CacheDataContainer<City>>();

      return this._cacheCity;
    }

    public get CityWithStore(): IKeyedCollection<CacheDataContainer<City>> {
      if (this._cacheCityWithStore == null)
        this._cacheCityWithStore = new CacheItems<CacheDataContainer<City>>();

      return this._cacheCityWithStore;
    }

    public get StorePlace(): IKeyedCollection<CacheDataContainer<StorePlace>> {
      if (this._cacheStorePlace == null)
        this._cacheStorePlace = new CacheItems<CacheDataContainer<StorePlace>>();

      return this._cacheStorePlace;
    }

    public get Store(): IKeyedCollection<CacheDataContainer<{ id: number, stores: Store[] }>> {
      if (this._cacheStore == null)
        this._cacheStore = new CacheItems<CacheDataContainer<{ id: number, stores: Store[] }>>();

      return this._cacheStore;
    }

    public get MeasureUnit(): IKeyedCollection<CacheDataContainer<MeasureUnit>> {
      if (this._cacheMeasureUnit == null)
        this._cacheMeasureUnit = new CacheItems<CacheDataContainer<MeasureUnit>>();

      return this._cacheMeasureUnit;
    }

    public get Novelty(): IKeyedCollection<CacheDataContainer<Novelty>> {
      if (this._cacheNovelty == null)
        this._cacheNovelty = new CacheItems<CacheDataContainer<Novelty>>();

      return this._cacheNovelty;
    }

    public get Action(): IKeyedCollection<CacheDataContainer<Action>> {
      if (this._cacheAction == null)
        this._cacheAction = new CacheItems<CacheDataContainer<Action>>();

      return this._cacheAction;
    }

    public get Quotation(): IKeyedCollection<CacheDataContainer<Quotation>> {
      if (this._cacheQuotation == null)
        this._cacheQuotation = new CacheItems<CacheDataContainer<Quotation>>();

      return this._cacheQuotation;
    }

    public get LoEntity(): IKeyedCollection<CacheDataContainer<LoEntity>> {
      if (this._cacheLoEntity == null)
        this._cacheLoEntity = new CacheItems<CacheDataContainer<LoEntity>>();

      return this._cacheLoEntity;
    }

    public get Country(): IKeyedCollection<CacheDataContainer<Country>> {
      if (this._cacheCountry == null)
        this._cacheCountry = new CacheItems<CacheDataContainer<Country>>();

      return this._cacheCountry;
    }

    public get EnumPaymentMethod(): IKeyedCollection<CacheDataContainer<EnumPaymentMethod>> {
      if (this._cacheEnumPaymentMethod == null)
        this._cacheEnumPaymentMethod = new CacheItems<CacheDataContainer<EnumPaymentMethod>>();

      return this._cacheEnumPaymentMethod;
    }

    public get Region(): IKeyedCollection<CacheDataContainer<Region>> {
      if (this._cacheRegion == null)
        this._cacheRegion = new CacheItems<CacheDataContainer<Region>>();

      return this._cacheRegion;
    }

    public get AppParams(): IKeyedCollection<CacheDataContainer<AppParam>> {
      if (this._cacheAppParams == null)
        this._cacheAppParams = new CacheItems<CacheDataContainer<AppParam>>();

      return this._cacheAppParams;
    }

    public get LoDeliveryType(): IKeyedCollection<CacheDataContainer<LoDeliveryType>> {
      if (this._cacheDeliveryType == null)
        this._cacheDeliveryType = new CacheItems<CacheDataContainer<LoDeliveryType>>();

      return this._cacheDeliveryType;
    }

    public get LoEntityOffice(): IKeyedCollection<CacheDataContainer<LoEntityOffice>> {
      if (this._cacheLoEntityOffice == null)
        this._cacheLoEntityOffice = new CacheItems<CacheDataContainer<LoEntityOffice>>();

      return this._cacheLoEntityOffice;
    }

    public get PageOptions(): IKeyedCollection<CacheDataContainer<any>> {
      if (this._cachePageOptions == null)
        this._cachePageOptions = new CacheItems<CacheDataContainer<any>>();
      
      return this._cachePageOptions;
    }


  }
}

// <editor-fold desc="Attributes">
export function LazyLoad(options: Array<{
  options: ILazyOption,
  action: string, params: string[]
}>): any {
  return function (target): any {
    // change function constructor
    const OverCtor: any = function () {
      const navPropNames: string[] = [];
      // call constructor
      target.apply(this, arguments);

      // <editor-fold desc="add in runtime">
      options.forEach((value) => {
        const baseName: string = (!value.options['navName']) ? value.options.constructor.name.toLowerCase()
          : value.options['navName'];


        const loadingProp = `is${baseName}Loading`;
        const navProp = `_${baseName}`;
        const fnName = value.action;

        this[loadingProp] = false;
        this[navProp] = null;

        // add to navigate prop for resolved getter
        navPropNames.push(navProp);
        // create getter
        Object.defineProperty(this, baseName, {
          configurable: false,
          get: () => {
            if (!this[navProp] && !this[loadingProp]) {
              this[loadingProp] = true;
              (async () => {
                const repo = this['_repo'];

                let paramsConvertedList = lazyParamToValue(this, value.params);
                if (paramsConvertedList.length !== 0) {
                  this[navProp] = await repo[fnName].apply(repo, paramsConvertedList);
                }

                this[loadingProp] = false;
              })();
            }
            return this[navProp];
          }
        });
        Object.defineProperty(this, baseName + '_p', {
          configurable: false,
          get: () => {
            const repo = this['_repo'];
            var paramsConvertedList = lazyParamToValue(this, value.params);
            if (paramsConvertedList.length !== 0) {
              this[navProp + '_p'] = repo[fnName].apply(repo, paramsConvertedList);

            } else {
              this[navProp + '_p'] = Promise.resolve(null);
            }

            return this[navProp + '_p'];
          }
        });
      });

      // create resolved predicate
      Object.defineProperty(this, 'resolved', {
        configurable: false,
        get: () => {
          for (let i = 0; i < navPropNames.length; i++) {
            if (this[navPropNames[i]] == null) {
              return false;
            }
          }
          return true;
        }
      });
      // </editor-fold>
    };
    // return function constructor name
    (<any>OverCtor).prototype = target.prototype;
    Object.defineProperty(OverCtor, 'name', { value: target.name, writable: false });
    return OverCtor;
  };
}
function lazyParamToValue(pointer: any, params: string[]): any[] {
  const resultArr: any[] = [];
  if (!params || params.length === 0 || !pointer[params[0]]) {
    return resultArr;
  }

  params.forEach((value) => resultArr.push(pointer[value]));
  return resultArr;
}
// </editor-fold>

export class SCN {
  static _scn: number = 0;

  public static get value(): number {
    return this._scn;
  }

  public static set value(_value: number) {
    this._scn = _value;
  }
}

// #region requestFactory
export class RequestFactory {
  /** only search param
   * example in http.get(apiUrl,
   *                     RequestFactory.makeSearch([{ key: "idAction", value: idAction.toString()}]))
   *                    ).toPromise();
  **/
  public static makeSearch(params: Array<{ key: string; value: string }>): RequestOptionsArgs {

    let searchParams = new URLSearchParams();
    params.forEach(val => { searchParams.set(val.key, val.value); });

    // add user headers
    const headers = RequestFactory.makeAuthHeader().headers;
    return { search: searchParams, headers: headers };
  }
  /** only auth headers (token,uid)
  * example in http.get(apiUrl, RequestFactory.makeAuthHeader()).toPromise();
  **/
  public static makeAuthHeader(): RequestOptionsArgs {
    const h = new Headers();
    h.set('Authorization', `Bearer ${localStorage.getItem('token') || ''}`);
    h.set('X-Currency', localStorage.getItem('currency') || `${AppConstants.CURRENCY_DEFAULT_VALUE}`);
    h.set('X-Lang', localStorage.getItem('lang') || `${AppConstants.LOCALE_DEFAULT_VALUE}`);
    h.set('X-APP', `${AppConstants.ID_APP}`);
    h.set('X-SCN', SCN.value.toString());

    return { headers: h }
  }
  /** both search and auth param
   * example in http.get(apiUrl,
   *                      RequestFactory.makeSearchAndAuth([{ key: "idAction", value: idAction.toString()}]
                         ).toPromise();
 **/
  public static makeSearchAndAuth(params: Array<{ key: string; value: string }>): RequestOptionsArgs {
    const search = RequestFactory.makeSearch(params).search;
    const headers = RequestFactory.makeAuthHeader().headers;

    return { search: search, headers: headers };
  }
}
// #endregion

// <editor-fold desc="core object methods">
export function Activator<T>(type: { new(): T }): T {
  return new type();
}
// </editor-fold>

// core system type
export namespace System {
  export interface IRange {
    min: number;
    max: number;
  }
  // custome number
  export class FoxNumber {
    public value: number;
    _range: IRange;
    constructor(value: number = 1) {
      this.value = value;
      this._range = { min: 1, max: 30 };
    }

    public get range(): IRange {
      return this._range;
    }
  }

  export function customConcat<T>(source: Array<T>, target: Array<T>): void {
    for (let i = 0; i < target.length; i++) {
      source.push(target[i]);
    }
  }

  export class PushContainer {
    public static pushStore: IDictionary<any> = {};
  }

  export class BlockControl {
    public static blockButtonControl(object: any) {
      this.setAttribute(object, true, 'BUTTON');
    }

    public static unblockButtonControl(object: any) {
      this.setAttribute(object, false, 'BUTTON');
    }

    private static setAttribute(object: any, value: boolean, className: string) {
      if (object.tagName == className)
        (value) ? object.setAttribute('disabled', value) : object.removeAttribute('disabled');
      else {
        let findedObject = this.findObject(object, className);
        if (findedObject)
          (value) ? findedObject.setAttribute('disabled', value) : findedObject.removeAttribute('disabled');
      }
    }

    private static findObject(item: any, className: string) {
      while ((item = item.parentElement) && !(item.tagName == className));
      return item;
    }
  }
}

export class Disposable {
  public static changeDismiss(view: any): void {
    let viewProto = view.prototype;

    if (viewProto['dismiss']) {
      viewProto.dismiss = (function () {
        const oldFn = viewProto.dismiss;
        return function () { oldFn.call(this); Disposable.dispose() };
      })();
    }
  }

  public static dispose(): void {
    const popOvers = Array.from(document.querySelectorAll('ion-popover,ion-loading,ion-toast,ion-alert'));
    if (popOvers && popOvers.length != 0)
      popOvers.forEach((el) => { el.parentNode.removeChild(el) });
  }
}
