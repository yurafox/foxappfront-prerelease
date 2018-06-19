import {AbstractControl} from '@angular/forms';
import {Injector} from '@angular/core';
import {Product, Supplier, Currency} from '../model/index';
import {Manufacturer} from "../model/manufacturer";
import {City} from '../model/city';
import {StorePlace} from '../model/store-place';
import {Lang} from "../model/lang";
import {MeasureUnit} from '../model/measure-unit';
import { RequestOptionsArgs,Headers,URLSearchParams} from '@angular/http';
import {Quotation} from '../model/quotation';
import {LoEntity} from '../model/lo-entity';
import {Country} from '../model/country';
import {EnumPaymentMethod} from '../model/enum-payment-method';
import {Region} from '../model/region';
import {Store} from "../model/store";
import { AppConstants } from '../app-constants';
import {AppParam} from '../model/app-param';
import {LoDeliveryType} from '../model/lo-delivery-type';
import {LoEntityOffice} from '../model/lo-entity-office';


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
  public static compare(matchControlName:string){
    return (control: AbstractControl): { [k: string]: any } =>{
      const data = control.value;
      let dataPrimary = control.root.get(matchControlName);
      dataPrimary = (!dataPrimary) ? '' : dataPrimary.value;
      return (data !== dataPrimary) ? {'compare': data} : null;
    };
  }
}

export class RefInjector {
  public static injector: Injector;

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

    HasNotValidCachedValue(key:string):boolean;

    HasNotValidCachedRange():boolean;
  }

  export class CacheItems<T> implements IKeyedCollection<T> {
    public items: { [index: string]: T } = {};
    public count: number = 0;

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
      var val = this.items[key];
      delete this.items[key];
      this.count--;
      return val;
    }

    public Item(key: string): T {
      return this.items[key];
    }

    public Keys(): string[] {
      var keySet: string[] = [];

      for (var prop in this.items) {
        if (this.items.hasOwnProperty(prop)) {
          keySet.push(prop);
        }
      }

      return keySet;
    }

    public Values(): any[] {
      var values: any[] = [];

      for (var prop in this.items) {
        if (this.items.hasOwnProperty(prop)) {
          values.push((<any>this.items[prop]).item);
        }
      }

      return values;
    }

    public MaxSize(): number {
      return this.maxSize;
    }

    public HasNotValidCachedValue(key:string):boolean {
       let entity:T = this.Item(key);
       if(!entity) return true;

       let currentExpire = (<any>entity).expire;
       if(!currentExpire) return true;

       return currentExpire < Date.now();
    }

    public HasNotValidCachedRange():boolean {
      if(this.Count()===0)
       return true;

      const firstValue:any = this.items[Object.keys(this.items)[0]];
      return firstValue.expire < Date.now();
    }
  }

  // data model for CacheProvider collection
  export interface CacheDataContainer<T> {
     item:T;
     expire:number;
  }

  export class CacheProvider {
    public _cacheProduct: IKeyedCollection<CacheDataContainer<Product>> = null;
    public _cacheSupplier: IKeyedCollection<CacheDataContainer<Supplier>> = null;
    public _cacheCurrency: IKeyedCollection<CacheDataContainer<Currency>> = null;
    public _cacheLang: IKeyedCollection<CacheDataContainer<Lang>> = null;
    public _cacheManufacturer: IKeyedCollection<CacheDataContainer<Manufacturer>> = null;
    public _cacheCity: IKeyedCollection<CacheDataContainer<City>> = null;
    public _cacheCityWithStore: IKeyedCollection<CacheDataContainer<City>> = null;
    public _cacheStorePlace: IKeyedCollection<CacheDataContainer<StorePlace>> = null;
    public _cacheStore: IKeyedCollection<CacheDataContainer<{id:number, stores: Store[]}>> = null;
    public _cacheMeasureUnit: IKeyedCollection<CacheDataContainer<MeasureUnit>> = null;

    public _cacheQuotation: IKeyedCollection<CacheDataContainer<Quotation>> = null;
    public _cacheLoEntity: IKeyedCollection<CacheDataContainer<LoEntity>> = null;
    public _cacheCountry: IKeyedCollection<CacheDataContainer<Country>> = null;
    public _cacheEnumPaymentMethod: IKeyedCollection<CacheDataContainer<EnumPaymentMethod>> = null;
    public _cacheRegion: IKeyedCollection<CacheDataContainer<Region>> = null;
    public _cacheAppParams: IKeyedCollection<CacheDataContainer<AppParam>> = null;
    public _cacheDeliveryType: IKeyedCollection<CacheDataContainer<LoDeliveryType>> = null;
    public _cacheLoEntityOffice: IKeyedCollection<CacheDataContainer<LoEntityOffice>> = null;

    public static Settings:any;

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

    public get Store(): IKeyedCollection<CacheDataContainer<{id:number, stores: Store[]}>> {
      if (this._cacheStore == null)
        this._cacheStore = new CacheItems<CacheDataContainer<{id:number, stores: Store[]}>>();

      return this._cacheStore;
    }

    public get MeasureUnit(): IKeyedCollection<CacheDataContainer<MeasureUnit>> {
      if (this._cacheMeasureUnit == null)
        this._cacheMeasureUnit = new CacheItems<CacheDataContainer<MeasureUnit>>();

      return this._cacheMeasureUnit;
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
      if (this._cacheLoEntityOffice  == null)
        this._cacheLoEntityOffice = new CacheItems<CacheDataContainer<LoEntityOffice>>();
      return this._cacheLoEntityOffice;
    }


  }
}

// <editor-fold desc="Attributes">
export function LazyLoad(options: Array<{ options:ILazyOption,
                                          action: string, params: string[] }>): any
{
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
                if(paramsConvertedList.length!==0) {
                  this[navProp] = await repo[fnName].apply(repo, paramsConvertedList);
                }

                this[loadingProp] = false;
              })();
            }
            return this[navProp];
          }
        });
        Object.defineProperty(this, baseName+'_p', {
          configurable: false,
          get: () => {
            const repo = this['_repo'];
            var paramsConvertedList = lazyParamToValue(this, value.params);
            if(paramsConvertedList.length!==0) {
              this[navProp+'_p'] = repo[fnName].apply(repo, paramsConvertedList);

            } else {
              this[navProp+'_p'] = Promise.resolve(null);
            }

            return this[navProp+'_p'];
          }
        });
      });

      // create resolved predicate
      Object.defineProperty(this, 'resolved', {
        configurable: false,
        get: () => {
          for (let i = 0; i < navPropNames.length; i++) {
            if (this[navPropNames[i]]==null) {
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
    Object.defineProperty(OverCtor, 'name', {value: target.name, writable: false});
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
  public static _scn: number = 0;

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
   public static makeSearch(params: Array<{ key: string; value: string }>):RequestOptionsArgs {

    let searchParams = new URLSearchParams();
    params.forEach(val => {searchParams.set(val.key, val.value);});

    // add user headers
    const headers = RequestFactory.makeAuthHeader().headers;
    return {search: searchParams, headers:headers};
   }
   /** only auth headers (token,uid)
   * example in http.get(apiUrl, RequestFactory.makeAuthHeader()).toPromise();
   **/
   public static makeAuthHeader(): RequestOptionsArgs{
    const h = new Headers();
    h.set('Authorization', `Bearer ${localStorage.getItem('token') || ''}`);
    h.set('X-Currency',localStorage.getItem('currency') || `${AppConstants.CURRENCY_DEFAULT_VALUE}`);
    h.set('X-Lang',localStorage.getItem('lang') || `${AppConstants.LOCALE_DEFAULT_VALUE}`);
    h.set('X-APP',`${AppConstants.ID_APP}`);
    h.set('X-SCN', SCN.value.toString());

    return {headers:h}
   }
   /** both search and auth param
    * example in http.get(apiUrl,
    *                      RequestFactory.makeSearchAndAuth([{ key: "idAction", value: idAction.toString()}]
                          ).toPromise();
  **/
   public static makeSearchAndAuth(params: Array<{ key: string; value: string }>): RequestOptionsArgs {
     const search = RequestFactory.makeSearch(params).search;
     const headers = RequestFactory.makeAuthHeader().headers;

     return {search:search, headers:headers};
   }
}
// #endregion

// <editor-fold desc="core object methods">
export function Activator<T>(type:{new():T}):T {
  return new type();
}
// </editor-fold>

// core system type
export namespace System {
  export interface IRange {
    min:number;
    max:number;
  }
  // custome number
  export class FoxNumber {
    public value:number;
    public _range:IRange;
    constructor(value: number = 1) {
         this.value = value;
         this._range = {min:1,max:30};
    }

    public get range(): IRange {
      return this._range;
    }
  }

  export function customConcat<T>(source:Array<T>,target:Array<T>): void {
    for(let i=0;i < target.length; i++) {
       source.push(target[i]);
    }
 }

  export class PushContainer {
    public static pushStore:IDictionary<any> = {};
  }



}
