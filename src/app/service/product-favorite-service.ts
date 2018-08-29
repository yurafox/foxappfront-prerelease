import { Injectable } from '@angular/core';
import { AbstractDataRepository } from '../../app/service/repository/abstract/abstract-data-repository';
import { Product } from './../../app/model/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class ProductFavoriteService {
  private cKey = 'favoriteItems';
  favoriteProductsId = new Array<number>();
  products: any;

  eventChange$: Observable<number>;
  private _observer: Observer<number>;

  constructor(private _repo: AbstractDataRepository) {
    this.eventChange$ = new Observable<number>(observer =>
      this._observer = observer).share();

    this.favoriteProductsId = this.getLocalStorageItems();
  }

  changeCountFavorites() {
    this._observer.next(this.favoriteProductsId.length);
  }

  public getFavoriteProducts(): Array<number> {
    return this.favoriteProductsId;
  }

  public addFavoriteProduct(id: number) {
    if (!this.favoriteProductsId.find((x) => { return x === id })) {
      this.favoriteProductsId.push(id);
      this.saveToLocalStorage();
      this.changeCountFavorites();
    }
  }

  public removeFavoriteProduct(id: number) {
    let index = this.favoriteProductsId.indexOf(id);
    if (index !== -1) {
      this.favoriteProductsId.splice(index, 1);
      this.saveToLocalStorage();
      this.changeCountFavorites();
    }
  }

  public findFavoriteProduct(id: number): number {
    return this.favoriteProductsId.find((x) => { return x === id });
  }

  saveToLocalStorage() {
    let saveArr = new Array<any>();
    this.favoriteProductsId.forEach(i => {
      saveArr.push(i);
    }
    );
    localStorage.setItem(this.cKey, JSON.stringify(saveArr));
  }

  public getLocalStorageItems(): number[] {
    const stor = JSON.parse(localStorage.getItem(this.cKey));
    const ar = [];
    if (stor) {
      stor.forEach((val) => {
        ar.push(val);
      });
    }
    return ar;
  }

  public async getProducts(): Promise<Product[]> {
    let resultArr = new Array<Product>();

    for (let productId of this.favoriteProductsId) {
      let product = await this._repo.getProductById(productId);
      resultArr.push(product);
    }

    return resultArr;
  }

}