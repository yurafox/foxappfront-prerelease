import {AbstractControl} from '@angular/forms';
import {Injector} from '@angular/core';
import {Product, Supplier, Currency} from '../model/index';
import {Manufacturer} from "../model/manufacturer";
import {City} from '../model/city';
import {StorePlace} from '../model/store-place';
import {Lang} from "../model/lang";

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
  public static compare(control: AbstractControl): { [k: string]: any } {
    const data = control.value;
    let dataPrimary = control.root.get('password');
    dataPrimary = (!dataPrimary) ? '' : dataPrimary.value;
    return (data !== dataPrimary) ? {'compare': data} : null;
  };
}

export class RefInjector {
  private static injector: Injector;

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

    Values(): T[];

    MaxSize(): number;
  }

  export class CacheItems<T> implements IKeyedCollection<T> {
    private items: { [index: string]: T } = {};
    private count: number = 0;

    public constructor(private maxSize: number = 100) {
    }

    public ContainsKey(key: string): boolean {
      return this.items.hasOwnProperty(key);
    }

    public Count(): number {
      return this.count;
    }

    public Add(key: string, value: T) {
      if (!this.items.hasOwnProperty(key))
        this.count++;

      this.items[key] = value;
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

    public Values(): T[] {
      var values: T[] = [];

      for (var prop in this.items) {
        if (this.items.hasOwnProperty(prop)) {
          values.push(this.items[prop]);
        }
      }

      return values;
    }

    public MaxSize(): number {
      return this.maxSize;
    }
  }

  export class CacheProvider {
    private _cacheProduct: IKeyedCollection<Product> = null;
    private _cacheSupplier: IKeyedCollection<Supplier> = null;
    private _cacheCurrency: IKeyedCollection<Currency> = null;
    private _cacheLang: IKeyedCollection<Lang> = null;
    private _cacheManufacturer: IKeyedCollection<Manufacturer> = null;
    private _cacheCity: IKeyedCollection<City> = null;
    private _cacheStorePlace: IKeyedCollection<StorePlace> = null;

    public get Products(): IKeyedCollection<Product> {
      if (this._cacheProduct == null)
        this._cacheProduct = new CacheItems<Product>(1500);

      return this._cacheProduct;
    }

    public get Suppliers(): IKeyedCollection<Supplier> {
      if (this._cacheSupplier == null)
        this._cacheSupplier = new CacheItems<Supplier>(200);

      return this._cacheSupplier;
    }

    public get Currency(): IKeyedCollection<Currency> {
      if (this._cacheCurrency == null)
        this._cacheCurrency = new CacheItems<Currency>(10);

      return this._cacheCurrency;
    }

    public get Lang(): IKeyedCollection<Lang> {
      if (this._cacheLang == null)
        this._cacheLang = new CacheItems<Lang>();

      return this._cacheLang;
    }

    public get Manufacturer(): IKeyedCollection<Manufacturer> {
      if (this._cacheManufacturer == null)
        this._cacheManufacturer = new CacheItems<Manufacturer>(500);

      return this._cacheManufacturer;
    }

    public get City(): IKeyedCollection<City> {
      if (this._cacheCity == null)
        this._cacheCity = new CacheItems<City>(300);

      return this._cacheCity;
    }

    public get StorePlace(): IKeyedCollection<StorePlace> {
      if (this._cacheStorePlace == null)
        this._cacheStorePlace = new CacheItems<StorePlace>(300);

      return this._cacheStorePlace;
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
                this[navProp] = await repo[fnName].apply(repo, lazyParamToValue(this, value.params));
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
            this[navProp+'_p'] = repo[fnName].apply(repo, lazyParamToValue(this, value.params));
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
  if (!params || params.length === 0) {
    return resultArr;
  }

  params.forEach((value) => resultArr.push(pointer[value]));
  return resultArr;
}

// </editor-fold>

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
    private _range:IRange; 
    constructor(value: number = 1) {
         this.value = value;
         this._range = {min:1,max:30};
    }
    
    public get range(): IRange {
      return this._range;
    } 
  }
}
